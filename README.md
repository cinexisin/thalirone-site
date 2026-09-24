# thalirone.com

Static website for Thalir Innovations. Built with a zero-dependency Node script and served by GitHub Pages from `docs/`.

## Update the site
1. Edit `src/config.mjs` (all visitor-facing text, categories, contact details).
2. `node build.mjs` (pulls live EKANI prices; `--offline` to skip).
3. Commit and push; GitHub Pages publishes `docs/` in about a minute.

## Add a business category
Append one object to `CATEGORIES` in `src/config.mjs` (copy an existing one). The nav, home page card, footer, sitemap and its own page are generated from it. Optional page sections (features, spotlight, process, brands, faq) appear only when present.

## Rules
- Only the original Thalir Innovations logo (`src/assets/img/`).
- Every claim must be true and verifiable; no invented numbers, customers or certifications.
