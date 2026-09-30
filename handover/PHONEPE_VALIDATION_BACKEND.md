# PhonePe live validation — backend handoff

Prepared 30 September 2026 for Claude Code. The owner requested a real, one-time **₹1,000** transaction through the thalirone.com API checkout for PhonePe verification and authorized proceeding. Production credentials are available **only in the PhonePe dashboard**; they have not been retrieved or copied into this repository.

## Current status and responsibility

The static `/payment-validation/` page and client are prepared. **Payments remain disabled:** `PAYMENT.enabled` is `false`, `apiBase` is empty, and `checkoutOrigins` is empty in `src/config.mjs`. There is no payment backend in this change, and no live payment has been initiated.

`AGENTS.md` assigns everything outside the static frontend to Claude Code. **TODO — Claude Code:** implement, deploy and verify the backend described below, securely configure production credentials, and provide the deployed API base and verified production checkout origins. Do not put merchant credentials or temporary payer access codes in source, generated `docs/`, chat, screenshots, logs or PRs.

This is an isolated gateway validation payment. It does not buy a service, start a subscription, activate EKANI, or authorize automated fulfilment or refunds. Preserve existing Razorpay billing, subscriptions, customer balances and entitlements. Use a separate order namespace and explicit server-side feature flag.

## Exact frontend contract

This is **our backend contract**, not PhonePe's API. `src/assets/payment.mjs` is the client implementation. Configure a fixed HTTPS `PAYMENT.apiBase`; the client appends `/session` or `/checkout`. No URL, merchant, price or gateway environment is accepted from the payer.

Both requests include `Accept: application/json` and `Authorization: Bearer <temporary-access-code>`. The code must be a server-minted, high-entropy, owner-only capability of **32–256 base64url characters**, matching `^[A-Za-z0-9_-]{32,256}$`. It is not a PhonePe credential, PIN or OTP. Give it a bounded expiry, store its hash server-side, deliver it privately to the invited payer, and scope it to this validation session and its single order. Rate-limit verification attempts and requests.

| Request | Semantics |
| --- | --- |
| `GET {apiBase}/session` | Read/reconcile the authorized session. **Never creates a gateway order.** No order ID in the URL; the code determines the session and order. |
| `POST {apiBase}/checkout` | Create or return the session's existing order, under an atomic server-side lock. Headers additionally include `Content-Type: application/json` and `Idempotency-Key: <browser-generated-UUID>`. Body is exactly `{}`; never trust client-supplied amounts. |

Return HTTP 200/201 with `Content-Type: application/json` for supported states. Return 401/403 for invalid, expired or unauthorized access; the client clears local access. Other non-2xx responses, malformed JSON, timeouts and unexpected fields needed for verification are treated as **unconfirmed**, never payment failure or success. Use `Cache-Control: no-store`; do not redirect API requests. The client aborts a request after 10 seconds, which does **not** establish that the server stopped processing it.

CORS must allow exactly `https://thalirone.com`, GET/POST/OPTIONS, and request headers `Authorization`, `Content-Type`, `Idempotency-Key`. Authenticate actual requests; CORS and an unlisted/noindex page are not authorization. The client sends no cookies (`credentials: omit`).

Every successful JSON response has these common fields:

| Field | Type and meaning |
| --- | --- |
| `environment` | String, exactly `production`. Never relabel sandbox results. |
| `merchant` | String, exactly `THALIR INNOVATIONS`; validated against the configured merchant account. |
| `amountPaise` | Integer, exactly `100000` (the total ₹1,000 payment). |
| `currency` | String, exactly `INR`, normalized from the stored order. |
| `state` | Exactly `READY`, `PENDING`, `COMPLETED`, `FAILED`, or `EXPIRED`. |
| `orderReference` | Required nonempty string for PENDING/COMPLETED; otherwise optional/null. If present, `^[A-Za-z0-9_-]{1,128}$`. Prefer the merchant order reference, with a stored mapping to PhonePe's order ID. |
| `transactionReference` | Required nonempty string for COMPLETED; otherwise optional/null, with the same reference pattern. Use the verified gateway transaction reference. |
| `verifiedAt` | Required parseable ISO timestamp string for COMPLETED; otherwise optional/null. Set only after trusted verification. |
| `checkoutUrl` | Required only for a PENDING **POST /checkout** response. The exact URL returned by PhonePe's create-payment API. Never return it from GET /session. |

Examples below are synthetic. The `.invalid` URL is deliberately unusable; do not copy it into configuration.

GET response before any payment request:

```json
{
  "environment": "production",
  "merchant": "THALIR INNOVATIONS",
  "amountPaise": 100000,
  "currency": "INR",
  "state": "READY",
  "orderReference": null,
  "transactionReference": null,
  "verifiedAt": null
}
```

POST response after creation:

```json
{
  "environment": "production",
  "merchant": "THALIR INNOVATIONS",
  "amountPaise": 100000,
  "currency": "INR",
  "state": "PENDING",
  "orderReference": "VALIDATION_EXAMPLE_001",
  "transactionReference": null,
  "verifiedAt": null,
  "checkoutUrl": "https://example.invalid/REPLACE_WITH_EXACT_PHONEPE_API_REDIRECT_URL"
}
```

GET response after trusted payment verification:

```json
{
  "environment": "production",
  "merchant": "THALIR INNOVATIONS",
  "amountPaise": 100000,
  "currency": "INR",
  "state": "COMPLETED",
  "orderReference": "VALIDATION_EXAMPLE_001",
  "transactionReference": "TRANSACTION_EXAMPLE_001",
  "verifiedAt": "2026-09-30T10:00:00.000Z"
}
```

READY means that the authorized session is eligible and has no existing or uncertain creation attempt. PENDING means the stored order is awaiting verified resolution. FAILED requires a verified failed order; EXPIRED is an application state for a reconciled, non-payable session/order. Do not infer failure/expiry from a network error, closed checkout or missing webhook. Never allow a late event to downgrade COMPLETED. Keep status access available long enough for reconciliation; after authorization expires, an operator can provide replacement read access to the same order without reopening creation.

## Server-side creation and verification

Persist the session/order association **globally across all tabs, devices, cleared browser storage and fresh idempotency keys**. Atomically reserve a single merchant order ID before calling PhonePe. Repeated POSTs return the existing order/result; a timed-out create call is reconciled by that ID before any further action. The browser's saved `attempted` flag and UUID are safeguards, not the duplicate-payment boundary. The current UI never automatically retries POST, and a pending GET intentionally does not reopen checkout; ambiguous attempts require status reconciliation/operator assistance, not a new payment.

Set amount `100000` on the server, currency INR in the stored order, the production merchant association, a unique PhonePe-compatible merchant order ID (at most 63 characters, alphanumeric/underscore/hyphen), and a fixed return URL of `https://thalirone.com/payment-validation/`. Use `paymentFlow.type: PG_CHECKOUT`. Do not accept return URLs or amounts from request fields. A gateway order is not a completed payment. [Create Payment](https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/api-reference/create-payment/initiate-payment)

Validate the returned checkout URL on the server and client: HTTPS, no username/password, alternate port or fragment, and an **explicitly verified production PhonePe origin allowlist**. Add only exact origins returned by the actual production integration and confirmed with PhonePe; do not guess from UAT examples or use substring matching. Keep the returned signed URL unchanged and redact its token from logs. The frontend navigates directly to that URL; it adds no third-party checkout script.

On return, the browser only requests status. The server checks PhonePe's Order Status API and correlates the stored merchant order and gateway order IDs, production merchant context, root order state, and exact amount. Validate returned currency where present; several official response examples omit currency, so normalize INR from the stored INR order rather than requiring a field that may be absent. A browser redirect, query parameter, checkout close event or payment attempt alone must never produce COMPLETED. Return only minimal references/status, not payer account/card/VPA data. [Order Status](https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/api-reference/order-status)

Configure an HTTPS webhook endpoint in PhonePe's production dashboard. Current docs support HMAC payload authentication or SHA-256 of configured username/password. Prefer the supported HMAC verifier; confirm the precise algorithm/encoding with the current official implementation rather than guessing. Verify the raw payload and configured key ID, merchant/order/amount; authenticate before processing, persist and deduplicate events, and acknowledge within 3–5 seconds. Use `event` and root `payload.state`, tolerate additive fields, and reconcile uncertain/missing events through the status API. [Webhook Handling](https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/api-reference/webhook)

## Credentials and activation checklist

PhonePe documents API credentials under **Business Dashboard → Developer Settings**. Production mode has Test Mode off. The owner should copy `client_id`, `client_version` and `client_secret` directly into the backend deployment's secret store. The backend obtains and caches its access token, refreshing before `expires_at` (epoch seconds). Keep webhook secrets there too; never expose them through the frontend contract. [Authorization](https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/api-reference/authorization)

- [ ] Confirm this merchant's production API access and the requested real-payment procedure with PhonePe; dashboard credentials alone do not verify our integration. Complete their UAT/sign-off requirements. [Go-live process](https://developer.phonepe.com/payment-gateway/uat-testing-go-live/go-live)
- [ ] Deploy secure server configuration, owner-scoped capability minting, durable single-order binding/idempotency, status reconciliation and authenticated webhooks. Keep validation creation disabled until ready.
- [ ] Test in isolated mocks/UAT: forged completed status/redirect/webhook, wrong amount/merchant/currency, missing/string-invalid references, duplicate clicks/webhooks, different tabs and idempotency keys, cleared storage, timeout after server acceptance, stale READY reads, unauthorized access, and pending/failed/expired outcomes. Assert no false success and no duplicate order. Never use real production credentials in fixtures or label UAT responses production to bypass client checks.
- [ ] Supply the exact deployed API base, production checkout origins, and evidence of server checks. Set them in `PAYMENT`, then enable it only after backend readiness. Rebuild generated docs and run focused browser/link/build checks through a branch and PR; never push directly to main.
- [ ] Review enabled privacy/terms copy: config conditionally describes temporary session storage and the restricted API payment. The page stays unlisted and `noindex, nofollow`, with `no-referrer`; none of these substitutes for backend authorization. Preserve existing enquiry-shop prices and policies.
- [ ] Owner enters the privately supplied temporary access code on the deployed page, reviews the ₹1,000 total, and personally completes PhonePe checkout. Do not initiate the live payment for the owner or collect their PIN/OTP.
- [ ] Verify COMPLETED server-side and in the merchant dashboard. Give the owner the website URL, merchant order reference, gateway transaction reference, ₹1,000 INR amount and verified timestamp to share with PhonePe. Redact capabilities, checkout tokens and payer details from evidence.
- [ ] Disable further validation order creation after COMPLETED while preserving authorized status lookup. Disable the frontend entry when verification is finished and rebuild via PR. Do not automatically refund, fulfil, activate software or change existing billing; handle any later request separately.

Additional primary references: [Integration sequence](https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/integration-steps), [UAT sandbox](https://developer.phonepe.com/payment-gateway/uat-testing-go-live/uat-sandbox), [checkout callback semantics](https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/api-reference/invoke-iframe-paypage). This document records implementation requirements; it does not claim the backend is deployed or that a payment succeeded.
