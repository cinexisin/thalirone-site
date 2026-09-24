// THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules node scripts/capture.mjs after
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";
const require = createRequire(
  join(process.env.THALIR_QA_MODULES, "../package.json"),
);
const { chromium } = require("playwright");
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const stage = process.argv[2] || "after";
if (!["before", "after"].includes(stage)) throw Error("Use before or after");
const base = process.env.THALIR_QA_URL || "http://127.0.0.1:4610";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const pages = [
  "",
  "smart-home-cinema/",
  "cinema-revival/",
  "business-software/",
  "contact/",
  "privacy/",
  "404.html",
];
await mkdir(join(root, "evidence/screenshots", stage), { recursive: true });
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
    await page.screenshot({
      path: join(
        root,
        "evidence/screenshots",
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
