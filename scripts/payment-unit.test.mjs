import { test } from "node:test";
import assert from "node:assert/strict";
import { PAYMENT } from "../src/config.mjs";
import { configurationReady, validateCheckoutUrl, validateSession } from "../src/assets/payment.mjs";

// Synthetic origins only; these checks never contact a payment provider.
const config = { ...PAYMENT, enabled: true, apiBase: "https://payments.thalirone.test/validation", checkoutOrigins: ["https://checkout.phonepe.com"] };
const pending = { environment: "production", merchant: config.merchant, amountPaise: 100000, currency: "INR", state: "PENDING", orderReference: "TEST_ORDER_1" };
test("checked-in configuration points only at the verified production API and checkout", () => {
  assert.equal(PAYMENT.enabled, true);
  assert.equal(PAYMENT.apiBase, "https://api.ekanicrm.com/v1/public/payment-validation");
  assert.deepEqual(PAYMENT.checkoutOrigins, ["https://mercury-t2.phonepe.com"]);
  assert.equal(PAYMENT.amountPaise, 100000);
  assert.equal(configurationReady(PAYMENT), true);
  assert.equal(configurationReady({ ...PAYMENT, enabled: false }), false);
  assert.equal(configurationReady(config), true);
});
test("configuration rejects incomplete, insecure or non-production destinations", () => {
  for (const patch of [{ apiBase: "http://example.test" }, { apiBase: "https://u:p@example.test" },
    { apiBase: "https://example.test/?key=a" }, { amountPaise: 1000 }, { currency: "USD" },
    { checkoutOrigins: [] }, { checkoutOrigins: ["https://phonepe.com.evil.test"] },
    { checkoutOrigins: ["https://mercury-uat.phonepe.com"] }, { checkoutOrigins: ["http://checkout.phonepe.com"] }]) {
    assert.equal(configurationReady({ ...config, ...patch }), false, JSON.stringify(patch));
  }
});
test("checkout rejects host spoofing, credentials, alternate ports and URL schemes", () => {
  for (const url of ["https://phonepe.com.evil.test/pay", "https://checkout.phonepe.com.evil.test/pay",
    "javascript:alert(1)", "//checkout.phonepe.com/pay", "http://checkout.phonepe.com/pay",
    "https://checkout.phonepe.com:444/pay", "https://user:pass@checkout.phonepe.com/pay",
    "https://checkout.phonepe.com/pay#fragment", "https://mercury-uat.phonepe.com/pay"]) {
    assert.throws(() => validateCheckoutUrl(url, config), url);
  }
  assert.equal(validateCheckoutUrl("https://checkout.phonepe.com/pay?token=synthetic", config), "https://checkout.phonepe.com/pay?token=synthetic");
});
test("payment data must match the expected amount, merchant, currency and environment", () => {
  assert.equal(validateSession(pending, config), pending);
  for (const patch of [{ amountPaise: 1000 }, { amountPaise: "100000" }, { merchant: "OTHER" },
    { environment: "sandbox" }, { currency: "USD" }, { state: "SUCCESS" }, { orderReference: null },
    { orderReference: ["TEST_ORDER_1"] }, { transactionReference: 12345 }]) {
    assert.throws(() => validateSession({ ...pending, ...patch }, config), JSON.stringify(patch));
  }
});
test("completed requires a complete server-verified record", () => {
  const complete = { ...pending, state: "COMPLETED", transactionReference: "TEST_TX_1", verifiedAt: "2026-09-30T10:00:00Z" };
  assert.equal(validateSession(complete, config), complete);
  for (const patch of [{ verifiedAt: null }, { verifiedAt: "invalid" }, { transactionReference: null }, { orderReference: "" }]) {
    assert.throws(() => validateSession({ ...complete, ...patch }, config));
  }
});
