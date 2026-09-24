// Optional review tooling; packages live outside the zero-dependency site.
// THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules node scripts/browser-qa.mjs
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";
const require = createRequire(
  join(process.env.THALIR_QA_MODULES, "../package.json"),
);
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const base = process.env.THALIR_QA_URL || "http://127.0.0.1:4610";
const paths = [
  "",
  "smart-home-cinema/",
  "cinema-revival/",
  "business-software/",
  "contact/",
  "privacy/",
  "404.html",
];
const report = {
  widths: [],
  accessibility: [],
  errors: [],
  external: [],
  interactions: [],
  noJS: [],
};
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const width of process.env.THALIR_QA_INTERACTIONS_ONLY
  ? []
  : [360, 390, 768, 1024, 1280, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(e.message));
  page.on("request", (r) => {
    if (!r.url().startsWith(base + "/")) report.external.push(r.url());
  });
  for (const path of paths) {
    await page.goto(base + "/" + path);
    await page.evaluate(() => document.fonts.ready);
    const item = {
      path: path || "home",
      width,
      ...(await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        smallTargets: [
          ...document.querySelectorAll(
            "a,button,summary,input,select,textarea",
          ),
        ]
          .filter(
            (e) =>
              e.checkVisibility() &&
              e.getBoundingClientRect().width > 0 &&
              e.getBoundingClientRect().height > 0 &&
              !e.classList.contains("skip"),
          )
          .filter(
            (e) =>
              e.getBoundingClientRect().height < 44 ||
              e.getBoundingClientRect().width < 44,
          )
          .map((e) => ({
            text: e.textContent.trim().slice(0, 70),
            w: e.getBoundingClientRect().width,
            h: e.getBoundingClientRect().height,
          })),
      }))),
    };
    report.widths.push(item);
    assert.ok(item.scroll <= width, `Overflow at ${width}: ${path}`);
    assert.deepEqual(
      item.smallTargets,
      [],
      `Small targets at ${width}: ${path}`,
    );
    if (width === 390 || width === 1280) {
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      report.accessibility.push({
        path: path || "home",
        width,
        violations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      });
      assert.deepEqual(
        axe.violations,
        [],
        `Accessibility at ${width}: ${path}`,
      );
    }
    console.log("Layout / accessibility", width, path || "home");
  }
  await context.close();
}
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto(base + "/");
await page.keyboard.press("Tab");
assert.equal(
  await page.locator(".skip").evaluate((e) => e === document.activeElement),
  true,
);
await page.keyboard.press("Enter");
assert.equal(
  await page.locator("#main").evaluate((e) => e === document.activeElement),
  true,
);
await page.locator(".menu summary").focus();
await page.keyboard.press("Enter");
assert.equal(
  await page.locator(".menu summary").getAttribute("aria-expanded"),
  "true",
);
assert.equal(await page.locator("main").evaluate((e) => e.inert), true);
await page.keyboard.press("Shift+Tab");
assert.equal(
  await page
    .locator(".menu-panel a")
    .last()
    .evaluate((e) => e === document.activeElement),
  true,
);
await page.keyboard.press("Tab");
assert.equal(
  await page
    .locator(".menu summary")
    .evaluate((e) => e === document.activeElement),
  true,
);
await page.keyboard.press("Escape");
await page.waitForTimeout(20);
assert.equal(await page.locator(".menu").evaluate((e) => e.open), false);
assert.equal(
  await page
    .locator(".menu summary")
    .evaluate((e) => e === document.activeElement),
  true,
);
assert.equal(await page.locator("main").evaluate((e) => e.inert), false);
await page.locator(".menu summary").click();
await page.locator('.menu-panel a[href="/cinema-revival/"]').click();
await page.waitForURL("**/cinema-revival/");
assert.equal(await page.locator(".menu").evaluate((e) => e.open), false);
await page.locator('.page-nav a[href="#faq"]').click();
await page.locator(".faq summary").first().focus();
await page.keyboard.press("Enter");
assert.equal(
  await page
    .locator(".faq details")
    .first()
    .evaluate((e) => e.open),
  true,
);
await page.keyboard.press("Enter");
assert.equal(
  await page
    .locator(".faq details")
    .first()
    .evaluate((e) => e.open),
  false,
);
report.interactions.push(
  "Keyboard: skip link, mobile open, forward/backward focus wrap, Escape focus restoration, link navigation and native FAQ",
);
await page.goto(base + "/contact/");
await page.locator("#c-name").fill("   ");
await page.locator("#composer button").click();
assert.equal(
  await page.locator("#c-name").getAttribute("aria-invalid"),
  "true",
);
assert.equal(await page.locator("#name-error").isVisible(), true);
assert.equal(
  await page.locator("#c-name").evaluate((e) => e === document.activeElement),
  true,
);
await page.locator("#c-name").fill("Example Review");
await page.locator("#c-area").fill("Bengaluru");
await page.locator("#c-topic").selectOption("Cinema Revival");
assert.ok(
  (await page.locator("#c-msg").getAttribute("placeholder")).includes(
    "theatre",
  ),
);
await page.locator("#c-msg").fill("Example only — reviewing the composer.");
let outgoing;
await context.route("https://wa.me/**", (route) => {
  outgoing = route.request().url();
  return route.fulfill({
    status: 200,
    contentType: "text/html",
    body: "<!doctype html><title>Local test interception</title>",
  });
});
const pop = page.waitForEvent("popup");
await page.locator("#composer button").click();
const popup = await pop;
await popup.waitForLoadState();
const url = new URL(outgoing);
assert.equal(url.hostname, "wa.me");
assert.equal(url.pathname, "/919513636657");
assert.ok(url.searchParams.get("text").includes("Name: Example Review"));
assert.ok(
  url.searchParams.get("text").includes("Interested in: Cinema Revival"),
);
assert.equal(await page.locator(".form-result").isVisible(), true);
assert.equal(await popup.evaluate(() => window.opener), null);
await popup.close();
await page.bringToFront();
assert.equal(context.pages().length, 1);
report.interactions.push(
  "Composer: whitespace/name validation, error recovery, topic hint, encoded config message, one noopener handoff; external navigation intercepted, no enquiry sent",
);
await page.locator("footer").scrollIntoViewIfNeeded();
await page.waitForTimeout(100);
assert.equal(await page.locator(".mobile-action").isVisible(), false);
await page.evaluate(() => scrollTo(0, 0));
await page.waitForFunction(
  () => !document.querySelector(".mobile-action").hidden,
);
assert.equal(await page.locator(".mobile-action").isVisible(), true);
report.interactions.push("Mobile bar clears footer and returns at top");
await page.goto(base + "/");
await page.waitForTimeout(1300);
assert.equal(await page.locator(".demo-slot.is-pending").count(), 0);
assert.equal(await page.locator(".replay").isVisible(), false);
report.interactions.push(
  "Reduced motion: static complete example, no hidden messages or replay animation",
);
await context.close();
const motion = await browser.newContext({
  viewport: { width: 1280, height: 900 },
});
const mp = await motion.newPage();
await mp.goto(base + "/");
assert.equal(await mp.locator(".demo-slot.is-pending").count(), 0);
await mp.waitForTimeout(1200);
assert.ok((await mp.locator(".demo-slot.is-pending").count()) > 0);
await mp.waitForTimeout(3800);
assert.equal(await mp.locator(".demo-slot.is-pending").count(), 0);
assert.equal(await mp.locator(".room-status").textContent(), "3 lights on");
await mp.waitForTimeout(1500);
assert.equal(await mp.locator(".demo-slot.is-pending").count(), 0);
await mp.locator(".replay").click();
assert.ok((await mp.locator(".demo-slot.is-pending").count()) > 0);
await mp.emulateMedia({ reducedMotion: "reduce" });
await mp.waitForFunction(
  () => document.querySelectorAll(".demo-slot.is-pending").length === 0,
);
assert.equal(await mp.locator(".demo-slot.is-pending").count(), 0);
await mp.goto(base + "/cinema-revival/");
await mp.emulateMedia({ reducedMotion: "no-preference" });
await mp.locator(".faq summary").first().click();
await mp.waitForTimeout(250);
assert.equal(
  await mp
    .locator(".faq details")
    .first()
    .evaluate((e) => e.open),
  true,
);
await mp.locator(".faq summary").first().click();
await mp.waitForTimeout(200);
assert.equal(
  await mp
    .locator(".faq details")
    .first()
    .evaluate((e) => e.open),
  false,
);
report.interactions.push(
  "Motion: fully visible initial state, one sequence, room responds, explicit replay, live reduced-motion cancellation, animated FAQ open/close",
);
await motion.close();
for (const width of [390, 1280]) {
  const no = await browser.newContext({
    viewport: { width, height: 844 },
    javaScriptEnabled: false,
  });
  const np = await no.newPage();
  for (const path of paths) {
    await np.goto(base + "/" + path);
    assert.ok(await np.locator("h1").isVisible());
    assert.ok(
      (await np.locator('a[href^="https://wa.me/919513636657"]').count()) > 0,
    );
    if (width === 390) {
      await np.locator(".menu summary").click();
      assert.ok(await np.locator(".menu-panel").isVisible());
      await np.locator(".menu summary").click();
    }
    if (await np.locator("#composer").count()) {
      assert.equal(await np.locator("#composer").isVisible(), false);
      assert.equal(await np.locator(".no-script").isVisible(), true);
    }
    if (path === "")
      assert.equal(await np.locator(".demo-slot.is-pending").count(), 0);
    if (await np.locator(".faq summary").count()) {
      await np.locator(".faq summary").first().click();
      assert.equal(
        await np.locator(".faq details").first().getAttribute("open"),
        "",
      );
    }
    report.noJS.push({
      path: path || "home",
      width,
      readable: true,
      navigation: true,
      whatsapp: true,
    });
  }
  await no.close();
}
assert.deepEqual(report.errors, []);
assert.deepEqual(report.external, []);
if (!process.env.THALIR_QA_INTERACTIONS_ONLY)
  await writeFile(
    join(root, "evidence/audit.json"),
    JSON.stringify(report, null, 2),
  );
console.log(
  `PASS: ${report.widths.length} responsive pages; ${report.accessibility.length} axe scans; ${report.noJS.length} no-JS pages; menu, animation, form, accordion and footer interactions.`,
);
await browser.close();
