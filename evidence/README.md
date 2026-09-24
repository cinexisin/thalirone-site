# UI modernization evidence

Baseline: `1afd7865b9b9af111af67660124cc7cb4a91cdb7`. All evidence is outside the deployed `docs/` tree.

- `screenshots/before/` and `screenshots/after/`: all seven pages, full page at 390 × 844 and 1280 × 900 CSS viewports, DPR 1, reduced motion; mobile screenshots use device emulation. Fourteen images per state.
- `lighthouse-*.report.html` / `.json`: full mobile Lighthouse 13.5.0 reports, Chrome 153 on native arm64 Node; default simulated mobile throttling, fresh profile, uncompressed Python server at localhost. Home: **97 Performance**; Smart Home & Cinema: **98 Performance**. Both: **100 Accessibility / 100 Best Practices / 100 SEO; CLS 0**.
- `lighthouse-summary.json`: scores, timestamps, LCP, transferred bytes and font exclusion.
- `image-generation/`: original photographic concepts, exact prompt set, built-in generation mode and the scoped exception to the earlier illustration-only direction.
- `audit.json`: 42 layout/target checks, 14 axe scans, 14 JS-off page checks, keyboard/menu/form/motion/footer interactions. No automated WCAG 2.2 AA violations found. This does not substitute for future testing with users of assistive technology.
- `network-audit.json`: uncached page sizes including images loaded after a full-page scroll, console/resource errors and external requests for all seven pages.
- `static-verification.json`: original content and image checks, WhatsApp destinations, generated assets and disposable fourth-category proof.
- `build-offline.txt`, `build-live.txt`: successful builds; the final committed output uses the live pricing feed.

The composer test intercepted navigation locally: no message was sent. The original PNG logo files have not been modified; Their WebP and AVIF logo derivatives are lossless resized copies. Photographic derivatives are compressed from separate concept originals. Fonts are locally served SIL-licensed Latin WOFF2 subsets.

See [the PR handover](../handover/UI_MODERNIZATION_PR.md) for rationale, checklist, complete copy changes, Claude Code handoff, and all before/after image pairs. Reproduction commands are in the repository README.
