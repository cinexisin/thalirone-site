# thalirone.com

> Coding agents: read `AGENTS.md`, then the current brief in `handover/UI_MODERNIZATION.md`.

Static website for Thalir Innovations. Built with a zero-dependency Node script and served by GitHub Pages from `docs/`.

## Update the site
1. Edit `src/config.mjs` (all visitor-facing text, categories, contact details).
2. `node build.mjs` (pulls live EKANI prices; `--offline` to skip).
3. Commit on a feature branch and open a PR into `main`; merge only after owner approval. GitHub Pages publishes `docs/` from `main`.

## Add a business category
Append one object to `CATEGORIES` in `src/config.mjs` (copy an existing one). The nav, home page card, footer, sitemap and its own page are generated from it. Optional page sections (features, spotlight, process, brands, faq) appear only when present.

## Rules
- Only the original Thalir Innovations logo (`src/assets/img/`).
- Every claim must be true and verifiable; no invented numbers, customers or certifications.

## Review and verification

Always work on a feature branch and open a pull request into `main`. **Do not push to `main`; merging deploys the site.** The modernization review is documented in `handover/UI_MODERNIZATION_PR.md` and `evidence/README.md`.

```sh
node build.mjs --offline
node build.mjs
node scripts/verify.mjs
python3 -m http.server 4610 --bind 127.0.0.1 --directory docs
```

`verify.mjs` checks original claims and image bytes against `origin/main`, generated assets, all WhatsApp links, metadata, the JS budget, and a fourth category in a disposable copy. It is specific to the modernization branch and baseline.

Optional browser review tools are installed **outside** the repository; the site and its build remain dependency-free:

```sh
npm install --prefix /tmp/thalirone-qa playwright @axe-core/playwright lighthouse
THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules node scripts/browser-qa.mjs
THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules node scripts/capture.mjs after
```

Use a native arm64 Node on Apple Silicon for Lighthouse. `THALIR_QA_URL` can point the review scripts at another local server. Before screenshots were captured from commit `1afd786`; only use `capture.mjs before` against an isolated checkout of that baseline.

## Assets and interface copy

- `UI`, `COPY`, `DRAWING`, and `ART_COPY` in `src/config.mjs` hold interface labels and shared/illustrative copy. Category facts and enquiry messages remain in `CATEGORIES`.
- `src/scenes.mjs` renders responsive, locally hosted photographic concepts from `src/assets/media/`. Every placement is labelled “AI-generated concept”; technical diagrams remain in `src/illustrations.mjs`. No image represents an actual customer, employee, completed project or EKANI product screenshot. The owner's latest photographic direction supersedes the earlier drawing-only choice for this task; the scoped exception, originals and exact prompts are recorded in `evidence/image-generation/`.
- Images use AVIF with WebP fallbacks at 480/768/1200/1536px. `scripts/prepare-media.mjs` is an optional asset preparation tool using Sharp installed outside the repo. Site builds use only the prepared files and have no dependencies.
- `cta.shortLabel` is optional; a new category falls back to its full `cta.label` in the mobile action bar and page navigation.
- Latin variable WOFF2 subsets of Montserrat and Nunito Sans are self-hosted. Their SIL Open Font License files are included in `src/assets/fonts/`. No font service is contacted by a visitor's browser.
- Lossless WebP and AVIF derivatives at 172/344/516px were resized from the unchanged `thalir-logo-full.png`. WebP is preferred because these lossless logo files are smaller. The original PNG remains the fallback. Regeneration is an optional offline asset preparation step, not part of the build.
- The home example is fully visible in HTML. Its short animation runs once, can be replayed, stops when the page is hidden or reduced motion is requested, and never controls actual devices.
