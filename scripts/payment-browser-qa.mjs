// Optional local QA only. All enabled payment/API requests are intercepted mocks.
// THALIR_QA_MODULES=<playwright node_modules> THALIR_AXE_MODULES=<axe node_modules> node scripts/payment-browser-qa.mjs
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { PAYMENT, BUSINESS_INFO, SITE } from "../src/config.mjs";
import { paymentPage } from "../src/payment-page.mjs";
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve("playwright", { paths: [process.env.THALIR_QA_MODULES] }));
const axePath = require.resolve("axe-core/axe.min.js", { paths: [process.env.THALIR_AXE_MODULES] });
const base = process.env.THALIR_QA_URL || "http://127.0.0.1:4672";
const url = base + "/payment-validation/";
const out = resolve("evidence/phonepe-validation");
await mkdir(out, { recursive: true });
const original = await readFile("docs/payment-validation/index.html", "utf8");
const cfg = { ...PAYMENT, enabled: true, apiBase: "https://payments.thalirone.test/validation", checkoutOrigins: ["https://checkout.phonepe.com"] };
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const active = original.replace(/<main id="main" tabindex="-1">[\s\S]*?<\/main>/,
  `<main id="main" tabindex="-1">${paymentPage({ copy: cfg.copy, business: BUSINESS_INFO, site: SITE, esc, enabled: true })}</main>`)
  .replace(/<script type="application\/json" id="payment-config">[\s\S]*?<\/script>/,
    `<script type="application/json" id="payment-config">${JSON.stringify(cfg).replace(/</g, "\\u003c")}</script>`);
const token = "QA".repeat(24);
const ready = { environment: "production", merchant: cfg.merchant, amountPaise: 100000, currency: "INR", state: "READY" };
const pending = { ...ready, state: "PENDING", orderReference: "EXAMPLE_ORDER_1" };
const complete = { ...pending, state: "COMPLETED", transactionReference: "EXAMPLE_TRANSACTION_1", verifiedAt: new Date().toISOString() };
const report = { viewportChecks: [], accessibility: [], scenarios: [], errors: [], unexpectedRequests: [] };
const browser = await chromium.launch({ channel: "chrome", headless: true });
async function setup({ enabled = true, width = 1280, js = true, status = () => ready, checkout = () => ({ ...pending, checkoutUrl: "https://checkout.phonepe.com/pay?token=synthetic" }), postAbort = false, unauthorized = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 950 }, javaScriptEnabled: js, reducedMotion: "reduce" });
  const page = await context.newPage();
  const requests = [];
  page.on("pageerror", error => report.errors.push(error.message));
  await page.route("**/*", async route => {
    const request = route.request();
    const target = new URL(request.url());
    if (target.origin === new URL(base).origin) {
      if (target.pathname === "/payment-validation/") return route.fulfill({ contentType: "text/html", body: enabled ? active : original });
      return route.continue();
    }
    if (target.origin === "https://payments.thalirone.test") {
      requests.push({ method: request.method(), path: target.pathname, body: request.postData() });
      assert.equal(request.headers().authorization, "Bearer " + token);
      if (request.method() === "POST") {
        assert.equal(request.postData(), "{}");
        assert.match(request.headers()["idempotency-key"], /^[a-f0-9-]{36}$/);
        if (postAbort) return route.abort("failed");
      }
      return route.fulfill({ status: unauthorized ? 401 : 200, contentType: "application/json", body: JSON.stringify(request.method() === "POST" ? checkout() : status()) });
    }
    if (target.origin === "https://checkout.phonepe.com") {
      requests.push({ method: "NAVIGATION", path: target.pathname });
      return route.fulfill({ contentType: "text/html", body: "<title>Intercepted QA checkout</title><p>Simulated checkout. No transaction.</p>" });
    }
    report.unexpectedRequests.push(request.url());
    return route.abort();
  });
  await page.goto(url + "?state=COMPLETED&amount=100000");
  await page.evaluate(() => document.fonts.ready);
  return { context, page, requests };
}
async function access(page) {
  await page.locator("#payment-access-code").fill(token);
  await page.locator("#payment-access-submit").click();
  await page.waitForFunction(() => !document.querySelector("#payment-access-submit").disabled);
}
async function state(page, expected) {
  await page.waitForFunction(s => document.querySelector("#payment-status").dataset.state === s, expected);
}
async function audit(page, label) {
  // Focus-driven form scrolling can leave a link under the fixed site header.
  // Audit the intended page-at-top presentation, not a partially obscured target.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.addScriptTag({ path: axePath });
  const result = await page.evaluate(() => axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } }));
  const issues = result.violations.map(v => ({ id: v.id, impact: v.impact, targets: v.nodes.map(n => n.target) }));
  report.accessibility.push({ label, issues });
  assert.deepEqual(issues, [], label);
}
try {
  for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    const { context, page, requests } = await setup({ enabled: false, width });
    assert.equal(await page.locator("#payment-submit").isDisabled(), true);
    assert.equal(await page.locator("[data-payment-title]").textContent(), cfg.copy.disabledTitle);
    assert.equal(await page.evaluate(() => sessionStorage.length), 0);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(scrollWidth <= width, `overflow at ${width}`);
    assert.deepEqual(requests, []);
    report.viewportChecks.push({ width, scrollWidth });
    if ([390, 1280].includes(width)) {
      await page.screenshot({ path: join(out, `disabled-${width}.png`), fullPage: true });
      await audit(page, `disabled-${width}`);
    }
    await context.close();
  }
  report.scenarios.push("Disabled build: no API calls/storage, no payment, query-string success ignored; six widths");
  for (const width of [390, 1280]) {
    const { context, page, requests } = await setup({ width });
    assert.equal(requests.length, 0);
    await access(page); await state(page, "ready");
    assert.equal(await page.locator("#payment-submit").isDisabled(), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await audit(page, `mock-ready-${width}`);
    await page.screenshot({ path: join(out, `mock-ready-${width}.png`), fullPage: true });
    await page.locator("#payment-consent").check();
    await page.evaluate(() => { const b = document.getElementById("payment-submit"); b.click(); b.click(); });
    await page.waitForURL("https://checkout.phonepe.com/**");
    assert.equal(requests.filter(r => r.method === "POST").length, 1);
    await context.close();
  }
  report.scenarios.push("Mock READY: consent required; double click creates one POST; provider navigation fully intercepted");
  {
    let response = ready;
    const { context, page, requests } = await setup({ status: () => response });
    await access(page); await state(page, "ready");
    await page.locator("#payment-consent").check(); await page.locator("#payment-submit").click();
    await page.waitForURL("https://checkout.phonepe.com/**");
    response = complete;
    await page.goto(url); await state(page, "completed");
    assert.equal(await page.locator("#payment-reference").textContent(), complete.transactionReference);
    assert.equal(requests.filter(r => r.method === "POST").length, 1);
    await audit(page, "mock-completed");
    await page.screenshot({ path: join(out, "mock-completed-1280.png"), fullPage: true });
    await page.locator("#payment-forget").click();
    assert.equal(await page.evaluate(() => sessionStorage.length), 0);
    await context.close();
  }
  report.scenarios.push("Return restores tab session and shows success only after verified backend response; clear removes session");
  for (const response of [pending, { ...pending, state: "FAILED" }, { ...ready, state: "EXPIRED" },
    { ...complete, amountPaise: 1000 }, { ...complete, merchant: "WRONG" },
    { ...complete, transactionReference: null }, { ...pending, orderReference: null }]) {
    const { context, page, requests } = await setup({ status: () => response });
    await access(page);
    const valid = [pending, "FAILED", "EXPIRED"].includes(response) || ["FAILED", "EXPIRED"].includes(response.state);
    await state(page, valid ? response.state.toLowerCase() : "unknown");
    assert.equal(await page.locator("#payment-submit").isDisabled(), true);
    assert.equal(requests.filter(r => r.method === "POST").length, 0);
    await context.close();
  }
  report.scenarios.push("Pending/failed/expired and wrong amount/merchant/malformed reference never show success or allow new payment");
  for (const mode of ["abort", "unsafe-url", "unauthorized", "storage"]) {
    const { context, page, requests } = await setup({ postAbort: mode === "abort", unauthorized: mode === "unauthorized",
      checkout: () => ({ ...pending, checkoutUrl: "https://evil.test/pay" }) });
    if (mode === "storage") await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error("Blocked"); }; });
    await access(page);
    if (["unauthorized", "storage"].includes(mode)) {
      await state(page, mode === "unauthorized" ? "accessError" : "storage");
      assert.equal(requests.filter(r => r.method === "POST").length, 0);
    } else {
      await state(page, "ready");
      await page.locator("#payment-consent").check(); await page.locator("#payment-submit").click();
      await state(page, "unknown");
      await page.locator("#payment-refresh").click(); await state(page, "unknown");
      await page.reload(); await state(page, "unknown");
      assert.equal(requests.filter(r => r.method === "POST").length, 1);
      assert.equal(await page.locator("#payment-submit").isDisabled(), true);
      assert.equal(new URL(page.url()).origin, new URL(base).origin);
    }
    await context.close();
  }
  report.scenarios.push("Creation network failure/stale READY reload never retries; hostile redirect blocked; access/storage failures cannot create payment");
  {
    const { context, page, requests } = await setup({ js: false });
    assert.equal(await page.locator("#payment-submit").isDisabled(), true);
    assert.equal(await page.locator("#payment-access-submit").isDisabled(), true);
    assert.equal(await page.locator("noscript").isVisible(), true);
    assert.equal(requests.length, 0); await context.close();
  }
  report.scenarios.push("JavaScript off: disabled controls and readable fallback");
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.unexpectedRequests, []);
  report.result = "PASS — mocks only; no live payment API called";
} finally {
  await writeFile(join(out, "browser-qa.json"), JSON.stringify(report, null, 2) + "\n");
  await browser.close();
}
console.log(report.result);
