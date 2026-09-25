# AGENTS.md — thalirone.com

Instructions for coding agents (Codex and others) working in this repository.
The current task brief is **`handover/UI_MODERNIZATION.md`**. Read it fully before changing anything.

## What this repo is
The public website of **Thalir Innovations** at https://thalirone.com. It is a static site built by a
zero-dependency Node script and served by **GitHub Pages from the `docs/` folder of `main`**.

| Path | Role |
|---|---|
| `src/config.mjs` | **All visitor-facing words**: site facts, categories, page copy, FAQs. Single source of truth. |
| `build.mjs` | Templates and page assembly (layout, home, category pages, contact, privacy, 404), sitemap, robots, CNAME. |
| `src/illustrations.mjs` | Inline SVG/HTML drawings (KNX floor plan, 7.2.4 speaker layout, EKANI flow, revival checklist) and line icons. |
| `src/assets/styles.css` | All styling. Tokens at the top. |
| `src/assets/main.js` | The only script: turns the contact form into a ready-to-send WhatsApp message. |
| `src/assets/img/` | The **original** Thalir Innovations logo cuts, favicons and share image. |
| `docs/` | **Generated build output, served live.** Never edit by hand; always rebuild. |

## Commands
```bash
node build.mjs            # build into docs/ (fetches live EKANI prices; falls back to config if offline)
node build.mjs --offline  # build without the pricing fetch
python3 -m http.server 4610 --directory docs   # preview at http://localhost:4610
```
Node 20+ is enough. There is no package.json and no dependencies; keep it that way unless the brief allows otherwise.

## Hard rules
1. **Never push to `main`.** `main` is production (Pages deploys it within a minute). Work on a branch and open a pull request.
2. **Never hand-edit `docs/`.** Change `src/` or `build.mjs`, then run the build and commit the regenerated `docs/`.
3. **`docs/CNAME` must always contain `thalirone.com`** (the build writes it). Losing it takes the site offline.
4. **Logo:** use only the existing files in `src/assets/img/` (`thalir-logo-full.png`, `thalir-mark.png`, and the sizes made from them). Never redraw, recolour, restyle or replace the logo or its mark.
5. **Names:** the only brand names allowed on the site are **Thalir Innovations** and **EKANI**. Do not introduce any other brand, company or product name (manufacturer names in the existing "Brands used in our projects" lists are fine).
6. **Truthful content only.** Do not add or strengthen claims. The allowed and forbidden claims are in the brief (§ Content rules). If a design needs new words, write them in the PR's "Copy changes" section for the owner to approve.
7. **No photos pretending to be real work.** No stock photos, no AI-generated images of homes, cinemas, people or installations. Visuals are drawn (SVG/HTML/CSS) and any example data is labelled "Example".
8. **Light theme only.** The logo's dark-green wordmark is designed for light grounds.
9. **No trackers, analytics, cookies, chat widgets or third-party scripts.** The privacy page promises this.
10. **Every WhatsApp call to action** must keep pointing to `https://wa.me/919513636657` with the prefilled text from `src/config.mjs`.
11. **Calls** go to `SITE.phone` (+91 95136 36646). WhatsApp stays 95136 36657. No other phone number may appear on the site.

## Asks for Claude Code
Anything outside the static front end is handled by Claude Code, not by you: form submissions to a server,
analytics, DNS, email, GitHub Pages settings, the EKANI API, social media. If your work needs one of these,
list it under **"Asks for Claude Code"** in the PR description and leave a clearly marked TODO. Do not build it.
