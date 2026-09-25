# Architectural redesign evidence

This directory records the architectural review snapshot committed as `e92478c`. The subsequent shop addition has its own [evidence](../shop/) and [handover](../../handover/SHOP.md). HTML hashes and screenshots below refer to the architectural snapshot before the shared footer gained a Shop link.

25 September 2026. Feature branch: `codex/architectural-design`. Baseline: `304468eaee19ce063b0d7f5cdf3e1b128902dc69` (main at the start of this follow-up). The original `codex/ui-modernization` work was already merged; this change remains a separate reviewable pull request into main.

## Acceptance checklist

- [x] Feature branch; no direct push to main; no merge performed.
- [x] Offline and live builds succeeded; generated output committed; `docs/CNAME` remains `thalirone.com`. See [offline log](build-offline.txt) and [live log](build-live.txt).
- [x] All 12 current pages rendered and audited. Lighthouse reports no failed or external requests; browser error log was empty on final review.
- [x] Static checks verify every WhatsApp destination and configured message, calls, metadata, sitemap, IndexNow key, runtime assets and original Thalir logo files. Browser checks cover name validation and enquiry selection. No message was sent.
- [x] Fifth-category regression passed 22 checks in an isolated copy, with no production source/output mutation. [Evidence](category-extension-check.json).
- [x] All 12 pages pass overflow and visible 44px target checks at 360, 390, 768, 1024, 1280 and 1440 content pixels. Mobile menu focus wrapping, Escape, link navigation, form validation, native FAQs and footer-bar hiding were exercised.
- [x] Reduced-motion CSS and existing JS preference guard reviewed; OS-level reduced-motion emulation was not available in this browser. Script-blocked fallback was tested across all 12 pages at two browser widths using `Content-Security-Policy: script-src 'none'`; native navigation and direct WhatsApp links remain available. This is a script-blocked test, not a claim that the browser's global JavaScript setting was toggled.
- [x] Mobile Lighthouse targets passed on all 12 pages, including home and Smart Home & Cinema. Scores below.
- [x] Owner-confirmed commercial scope incorporated. Every new/changed visitor string is recorded in [Copy changes](../../handover/ARCHITECTURAL_COPY_CHANGES.md).
- [x] Original Thalir logo assets unchanged. Only existing manufacturer names are used; 12 locally hosted marks have [source records](../../handover/BRAND_ASSET_SOURCES.md), three remain text. Existing visibly labelled concept imagery retained; no new claimed customer work, partnerships or certifications.
- [x] Static, zero-dependency build; no runtime third-party resources, tracking, cookies or server submission. Existing self-hosted fonts and privacy commitments preserved.
- [x] 48 full-page screenshots: before and after, 390px and 1280px, every page.

## Mobile Lighthouse

Lighthouse 13.5.0, default mobile simulation (412 CSS px, DPR 1.75, simulated 4× CPU slowdown), local static server. Each result records its HTML and CSS/JS hashes; all match the final output. [Machine-readable results](lighthouse-summary.json). Scores are one local audit per artifact revision, not a field-data guarantee.

| Page | Performance | Accessibility | Best practices | SEO | CLS |
|---|---:|---:|---:|---:|---:|
| Home | 97 | 100 | 100 | 100 | 0 |
| Smart Home & Cinema | 97 | 100 | 100 | 100 | 0 |
| Cinema Revival | 98 | 100 | 100 | 100 | 0 |
| Commercial Spaces | 98 | 100 | 100 | 100 | 0 |
| Business Software | 98 | 100 | 100 | 100 | 0 |
| Contact | 98 | 100 | 100 | 100 | 0 |
| Privacy | 99 | 100 | 100 | 100 | 0 |
| About | 98 | 100 | 100 | 100 | 0 |
| Terms | 98 | 100 | 100 | 100 | 0 |
| Refunds | 98 | 100 | 100 | 100 | 0 |
| Shipping | 98 | 100 | 100 | 100 | 0 |
| 404 | 99 | 100 | 100 | 100 | 0 |

The maximum initial-audit non-font transfer was **215,375 bytes**, with CLS **0** on every page. This navigation measurement does not include all below-the-fold lazy images.

A separate full-page asset model includes all lazy imagery, all manufacturer logos and declared icons: at 390px/DPR2, Home is **311,991 bytes** and Smart Home & Cinema **299,764 bytes**, excluding fonts and protocol overhead, before text compression. All pages fit 350KB in that model. Higher-density raw payloads can exceed 350KB; their modeled text-compressed totals pass, while the deliberately extreme largest-candidate bound does not. These are file-body calculations, not measured production CDN transfers. [Payload method, hashes and scenarios](payload-budget.json).

Client JavaScript is **2,181 bytes gzipped**; CSS is **11,573 bytes gzipped**. No build or runtime package was added. [Static release checks](static-checks.json).

## Screenshots

Captured through the in-app browser from the immutable baseline on port 4661 and the final build on port 4660. Every page was scrolled through to load lazy images and returned to scroll position zero before full-page capture. The browser reserves a 15px scrollbar gutter, so outer viewport overrides were 405px/1295px to produce exact **390px/1280px content and image widths**. Heights were 844px/900px. Captures are JPEG, without image editing. Homepage captures use the readable resting chat state. [Capture and interaction results](browser-audit.json); [file hashes](screenshot-manifest.json).

| Page | Before 390 | After 390 | Before 1280 | After 1280 |
|---|---|---|---|---|
| Home | [View](screenshots/before/home-390.jpg) | [View](screenshots/after/home-390.jpg) | [View](screenshots/before/home-1280.jpg) | [View](screenshots/after/home-1280.jpg) |
| Smart Home & Cinema | [View](screenshots/before/smart-home-cinema-390.jpg) | [View](screenshots/after/smart-home-cinema-390.jpg) | [View](screenshots/before/smart-home-cinema-1280.jpg) | [View](screenshots/after/smart-home-cinema-1280.jpg) |
| Cinema Revival | [View](screenshots/before/cinema-revival-390.jpg) | [View](screenshots/after/cinema-revival-390.jpg) | [View](screenshots/before/cinema-revival-1280.jpg) | [View](screenshots/after/cinema-revival-1280.jpg) |
| Commercial Spaces | [View](screenshots/before/commercial-audio-390.jpg) | [View](screenshots/after/commercial-audio-390.jpg) | [View](screenshots/before/commercial-audio-1280.jpg) | [View](screenshots/after/commercial-audio-1280.jpg) |
| Business Software | [View](screenshots/before/business-software-390.jpg) | [View](screenshots/after/business-software-390.jpg) | [View](screenshots/before/business-software-1280.jpg) | [View](screenshots/after/business-software-1280.jpg) |
| Contact | [View](screenshots/before/contact-390.jpg) | [View](screenshots/after/contact-390.jpg) | [View](screenshots/before/contact-1280.jpg) | [View](screenshots/after/contact-1280.jpg) |
| Privacy | [View](screenshots/before/privacy-390.jpg) | [View](screenshots/after/privacy-390.jpg) | [View](screenshots/before/privacy-1280.jpg) | [View](screenshots/after/privacy-1280.jpg) |
| About | [View](screenshots/before/about-390.jpg) | [View](screenshots/after/about-390.jpg) | [View](screenshots/before/about-1280.jpg) | [View](screenshots/after/about-1280.jpg) |
| Terms | [View](screenshots/before/terms-390.jpg) | [View](screenshots/after/terms-390.jpg) | [View](screenshots/before/terms-1280.jpg) | [View](screenshots/after/terms-1280.jpg) |
| Refunds | [View](screenshots/before/refunds-390.jpg) | [View](screenshots/after/refunds-390.jpg) | [View](screenshots/before/refunds-1280.jpg) | [View](screenshots/after/refunds-1280.jpg) |
| Shipping | [View](screenshots/before/shipping-390.jpg) | [View](screenshots/after/shipping-390.jpg) | [View](screenshots/before/shipping-1280.jpg) | [View](screenshots/after/shipping-1280.jpg) |
| 404 | [View](screenshots/before/404.html-390.jpg) | [View](screenshots/after/404.html-390.jpg) | [View](screenshots/before/404.html-1280.jpg) | [View](screenshots/after/404.html-1280.jpg) |

## Review and maintenance

See [design rationale and maintenance](../../handover/ARCHITECTURAL_DESIGN.md), [manufacturer provenance](../../handover/BRAND_ASSET_SOURCES.md), [product visual provenance](../../handover/PRODUCT_ASSET_SOURCES.md) and the complete [copy ledger](../../handover/ARCHITECTURAL_COPY_CHANGES.md). No backend, payment gateway, DNS, email, Pages configuration or EKANI API change is required by this redesign.
