# Payment verification frontend evidence

30 September 2026. Prepared on `codex/phonepe-validation-checkout` from `origin/main` `fad4c4d`. This is a new `/payment-validation/` route; no prior payment page exists. All existing generated pages remain byte-for-byte unchanged after the live build. No merchant credentials were retrieved, no backend was deployed and no real payment API was called.

## Screenshots

- [Disabled / 390px](disabled-390.png) · [Disabled / 1280px](disabled-1280.png): the actual checked-in build, unable to accept payment.
- [Mock ready / 390px](mock-ready-390.png) · [Mock ready / 1280px](mock-ready-1280.png): intercepted synthetic backend responses, not a live checkout.
- [Mock completed / 1280px](mock-completed-1280.png): synthetic references only; not proof of payment.

## Checks

- Both `node build.mjs --offline` and `node build.mjs` passed. Final generated docs use the live pricing build.
- `node --test scripts/payment-unit.test.mjs`: five tests passed, covering configuration, destination validation, amount/merchant/environment/currency matching and complete verified payment records.
- [Browser QA](browser-qa.json): six viewport widths (360–1440), disabled/no-network mode, consent, duplicate clicks, return/session restoration, verified success, pending/failure/expiry, invalid references/amount/merchant, unavailable storage, unauthorized access, connection failures, hostile redirects, stale READY reads and JavaScript-off fallback.
- All enabled payment requests and provider navigation were intercepted locally. No production readiness is claimed from these mocked tests.
- Axe WCAG 2/2.1/2.2 A/AA: no violations on disabled/ready at 390/1280px and completed at 1280px. Audits use the page-at-top view to avoid fixed-header occlusion after focus-driven form scrolling.
- [Static QA](static-qa.json): all 14 HTML files, internal links/anchors, 121 WhatsApp links, generated asset parity, CNAME preservation, no external scripts, and excluded/noindex validation route.
- [Lighthouse mobile](lighthouse-summary.json): Performance 97, Accessibility 100, Best Practices 100, SEO 69. The only failing binary audit is crawlability: `noindex` is intentional for this restricted verification page. CLS 0; TBT 0ms.
- Original logo, existing source assets, public page HTML and sitemap unchanged. `git diff --check` passed.

## Reproduce browser checks

Use external test dependencies, not dependencies in the static site:

```sh
python3 -m http.server 4672 --bind 127.0.0.1 --directory docs
THALIR_QA_MODULES=/path/to/playwright/node_modules THALIR_AXE_MODULES=/path/to/axe/node_modules node scripts/payment-browser-qa.mjs
```

Activation remains blocked on the [Claude Code backend handoff](../../handover/PHONEPE_VALIDATION_BACKEND.md). Keep the draft disabled until that contract, credentials, production access and server verification are deployed and checked.
