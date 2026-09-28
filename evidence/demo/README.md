# EKANI demonstration evidence

The owner requested a clean presentation platform with a link to EKANI CRM. This change adds `/demo/`, a public-facing illustrative walkthrough and presenter view. It is not an authenticated CRM sandbox. Baseline: `59aef6f68cb6bee1fc811a8c8fc5839cd018509a`.

## Screenshots

| Page | 390px | 1280px |
| --- | --- | --- |
| New demo page | [Demo](screenshots/demo-390.jpg) | [Demo](screenshots/demo-1280.jpg) |
| Business Software before | [Before](screenshots/business-before-390.jpg) | [Before](screenshots/business-before-1280.jpg) |
| Business Software after | [After](screenshots/business-after-390.jpg) | [After](screenshots/business-after-1280.jpg) |

[Presenter view at 1280px](screenshots/presenter-1280.jpg). The demo has no before page: the route is new. Existing-page changes are the Business Software walkthrough link and the shared footer's Demo link. Screenshots use the stated document content widths; the browser viewport includes a 15px scrollbar.

## Validation

Final Lighthouse mobile results are recorded with asset and HTML hashes in [lighthouse-summary.json](lighthouse-summary.json).

| Page | Performance | Accessibility | Best practices | SEO | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 97 | 100 | 100 | 100 | 0 |
| Business Software | 98 | 100 | 100 | 100 | 0 |
| Demo | 96 | 100 | 100 | 100 | 0 |

[Browser checks](browser-checks.json) cover all twelve steps, active states, previous/restart, keyboard navigation, presenter enter/exit, optional notes, valid and invalid fragments, browser back/forward, mobile navigation, and responsive overflow at 360/390/768/1024/1280/1440px. All twelve steps remain readable when a test-only Content-Security-Policy disables scripts. Normal demo usage produced no console warnings or errors.

The Copy link success state was verified, but the browser connector's clipboard reader did not expose the browser-written value. The print button calls the standard browser print API, and print CSS includes all twelve panels; the native print preview was not inspectable through the connector. These two limitations are not represented as end-to-end clipboard or printed-output verification.

Offline and live-price builds passed. `scripts/verify-design.mjs --strict-tracked` checks fourteen generated pages, navigation, exact demo copy and data, official CRM links, original assets, contacts, policies, generated assets, the JavaScript budget and existing guardrails. Independent source review found no actionable defects.

No authenticated CRM session was inspected or changed. The [presenter guide](../../handover/EKANI_DEMO_GUIDE.md) records the preparation still needed for a real product demo. All new copy is listed in the [copy ledger](../../handover/EKANI_DEMO_COPY_CHANGES.md).
