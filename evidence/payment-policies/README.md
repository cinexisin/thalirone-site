# Payment-policy review evidence

Status: the owner authorized publication on 25 September 2026 with the supplied seller name/address, all-service scope and current commercial terms, and confirmed that no grievance officer is appointed. The named contact remains an onboarding follow-up. See [the handover](../../handover/PAYMENT_POLICIES.md) and [PR #2](https://github.com/cinexisin/thalirone-site/pull/2) for release verification. The audit JSON files record the completed pre-release checks; their release-status wording reflects that earlier test stage.

## Checks

- Offline and live-feed builds succeed. Final generated output uses the live feed.
- 11 pages, six viewport widths (360 / 390 / 768 / 1024 / 1280 / 1440): 66 layout and 44-pixel target checks.
- 22 axe accessibility scans and 22 JavaScript-disabled checks; keyboard/menu/form/reduced-motion/footer tests pass.
- 268 internal links and anchors resolve; 81 WhatsApp links preserve the official number and prefilled messages.
- No console errors or third-party runtime requests observed during browser QA.
- Original images, logo and client JavaScript unchanged. No dependency or checkout integration added.
- The footer headings now use level 2 so the 404 page does not skip from H1 to H3.

## Mobile Lighthouse

Lighthouse 13.5.0, Chrome, native arm64 Node; default simulated mobile throttling against an uncompressed localhost server. Scores are lab measurements. CLS was 0 on every page. All 11 pages were rerun after adding the seller information and final policy wording.

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` | 97 | 100 | 100 | 100 |
| `/smart-home-cinema/` | 98 | 100 | 100 | 100 |
| `/cinema-revival/` | 98 | 100 | 100 | 100 |
| `/business-software/` | 98 | 100 | 100 | 100 |
| `/contact/` | 98 | 100 | 100 | 100 |
| `/privacy/` | 99 | 100 | 100 | 100 |
| `/about/` | 99 | 100 | 100 | 100 |
| `/terms/` | 99 | 100 | 100 | 100 |
| `/refunds/` | 98 | 100 | 100 | 100 |
| `/shipping/` | 99 | 100 | 100 | 100 |
| `/404.html` | 99 | 100 | 100 | 100 |

See [machine-readable Lighthouse results](lighthouse-summary.json), [browser results](audit.json) and [link results](static-audit.json).

## Screenshots

Baseline: deployed commit `c3772a8afbee33871d3a61d40b96f41302cd750e`. Full-page screenshots at 390 × 844 and 1280 × 900, DPR 1, reduced motion. Phone images use device emulation. No before page existed for the four new routes.

| Page | 390px before | 390px after | 1280px before | 1280px after |
| --- | --- | --- | --- | --- |
| home | [before](screenshots/before/home-390.png) | [after](screenshots/after/home-390.png) | [before](screenshots/before/home-1280.png) | [after](screenshots/after/home-1280.png) |
| smart-home-cinema | [before](screenshots/before/smart-home-cinema-390.png) | [after](screenshots/after/smart-home-cinema-390.png) | [before](screenshots/before/smart-home-cinema-1280.png) | [after](screenshots/after/smart-home-cinema-1280.png) |
| cinema-revival | [before](screenshots/before/cinema-revival-390.png) | [after](screenshots/after/cinema-revival-390.png) | [before](screenshots/before/cinema-revival-1280.png) | [after](screenshots/after/cinema-revival-1280.png) |
| business-software | [before](screenshots/before/business-software-390.png) | [after](screenshots/after/business-software-390.png) | [before](screenshots/before/business-software-1280.png) | [after](screenshots/after/business-software-1280.png) |
| contact | [before](screenshots/before/contact-390.png) | [after](screenshots/after/contact-390.png) | [before](screenshots/before/contact-1280.png) | [after](screenshots/after/contact-1280.png) |
| privacy | [before](screenshots/before/privacy-390.png) | [after](screenshots/after/privacy-390.png) | [before](screenshots/before/privacy-1280.png) | [after](screenshots/after/privacy-1280.png) |
| 404.html | [before](screenshots/before/404.html-390.png) | [after](screenshots/after/404.html-390.png) | [before](screenshots/before/404.html-1280.png) | [after](screenshots/after/404.html-1280.png) |
| about | New page | [after](screenshots/after/about-390.png) | New page | [after](screenshots/after/about-1280.png) |
| terms | New page | [after](screenshots/after/terms-390.png) | New page | [after](screenshots/after/terms-1280.png) |
| refunds | New page | [after](screenshots/after/refunds-390.png) | New page | [after](screenshots/after/refunds-1280.png) |
| shipping | New page | [after](screenshots/after/shipping-390.png) | New page | [after](screenshots/after/shipping-1280.png) |

## Reproduce

Optional QA dependencies live outside the site. The normal build remains dependency-free.

```bash
node build.mjs --offline
node build.mjs
python3 -m http.server 4610 --directory docs
# In another terminal:
THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules THALIR_QA_OUTPUT=evidence/payment-policies/audit.json node scripts/browser-qa.mjs
THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules THALIR_QA_OUTPUT=evidence/payment-policies/screenshots node scripts/capture.mjs after
node /tmp/thalirone-qa/node_modules/lighthouse/cli/index.js http://127.0.0.1:4610/refunds/ --chrome-flags="--headless=new" --output=json --output-path=/tmp/thalir-refunds-lighthouse.json
```

On this host, Chrome/Lighthouse used the bundled arm64 Node at `~/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`.
