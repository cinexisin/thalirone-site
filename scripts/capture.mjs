// THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules node scripts/capture.mjs after
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";
import { CATEGORIES, POLICIES } from "../src/config.mjs";
const require = createRequire(
  join(process.env.THALIR_QA_MODULES, "../package.json"),
);
const { chromium } = require("playwright");
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const stage = process.argv[2] || "after";
if (!["before", "after"].includes(stage)) throw Error("Use before or after");
const base = process.env.THALIR_QA_URL || "http://127.0.0.1:4610";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const pages = process.env.THALIR_QA_PATHS
  ? JSON.parse(process.env.THALIR_QA_PATHS)
  : [
      "",
      ...CATEGORIES.map((c) => `${c.slug}/`),
      "contact/",
      "privacy/",
      "about/",
      ...POLICIES.map((p) => `${p.slug}/`),
      "404.html",
    ];
const output = process.env.THALIR_QA_OUTPUT || "evidence/screenshots";
await mkdir(join(root, output, stage), { recursive: true });
for (const width of [390, 1280]) {
  const context = await browser.newContext({
    viewport: { width, height: width === 390 ? 844 : 900 },
    deviceScaleFactor: 1,
    isMobile: width === 390,
    hasTouch: width === 390,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(base + "/" + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Visit the whole page so native lazy images are included in full-page evidence.
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
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(150);
    await page.screenshot({
      path: join(
        root,
        output,
        stage,
        `${path.replaceAll("/", "") || "home"}-${width}.png`,
      ),
      fullPage: true,
    });
    console.log(stage, path || "home", width);
  }
  await context.close();
}
await browser.close();
