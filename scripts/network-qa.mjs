// Record uncached requests, console errors and page weight on every built page.
import { createRequire } from "node:module";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(
  join(process.env.THALIR_QA_MODULES, "../package.json"),
);
const { chromium } = require("playwright");
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const base = process.env.THALIR_QA_URL || "http://127.0.0.1:4610";
const b = await chromium.launch({ channel: "chrome" });
const rows = [];
for (const path of [
  "",
  "smart-home-cinema/",
  "cinema-revival/",
  "business-software/",
  "contact/",
  "privacy/",
  "404.html",
]) {
  const context = await b.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const errors = [],
    external = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  page.on("request", (r) => {
    if (!r.url().startsWith(base + "/")) external.push(r.url());
  });
  await page.goto(base + "/" + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Include media that loads further down the page in the transfer budget.
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((img) => {
        img.loading = "eager";
        return img.decode();
      }),
    ),
  );
  await page.waitForLoadState("networkidle");
  const weight = await page.evaluate(() => {
    const resources = [
      ...performance.getEntriesByType("navigation"),
      ...performance.getEntriesByType("resource"),
    ];
    return {
      totalBytes: resources.reduce((n, r) => n + r.transferSize, 0),
      bytesExcludingFonts: resources
        .filter((r) => !r.name.endsWith(".woff2"))
        .reduce((n, r) => n + r.transferSize, 0),
      requests: resources.map((r) => new URL(r.name).pathname),
    };
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  assert.ok(weight.bytesExcludingFonts <= 350000);
  rows.push({ page: path || "home", ...weight, errors, external });
  await context.close();
}
await b.close();
await writeFile(
  join(root, "evidence/network-audit.json"),
  JSON.stringify(rows, null, 2),
);
console.log(
  rows.map((r) => ({
    page: r.page,
    bytesExcludingFonts: r.bytesExcludingFonts,
    errors: r.errors.length,
    external: r.external.length,
  })),
);
