# Bring home control, cinema and EKANI to life with natural photographic concepts

The original site explained the services but hid the WhatsApp-control idea below a busy hero. This change puts the existing “Run your home from WhatsApp or Telegram” message first, illustrates a command and its confirming response, and gives phone visitors a persistent, page-specific route to enquire.

Natural photographic concepts connect the services to everyday life: a couple messaging from their living room, people watching a film, and business owners working with a phone and laptop. The home page pairs oversized typography with a panoramic photograph and layered chat, then introduces the three services through an image gallery. Category pages use large photographic compositions, with technical diagrams retained in the detail sections. Mobile crops preserve faces and give the messages their own readable space.

The original logo, green/gold palette and light backgrounds remain. Open capability groups, a numbered process, native FAQs and a distinct EKANI pricing section give the detailed content a clearer hierarchy. Every photographic placement is visibly labelled “AI-generated concept” and its alt text repeats that provenance. The fictional people and spaces are not represented as customers, employees, completed projects or EKANI screenshots. No stock photography, new business claims or testimonials were introduced.

**Scoped visual-rule exception:** the owner subsequently requested “natural looking images , not like cartoons, with real people kind of”. This latest direction supersedes the earlier illustration-only choice and AGENTS.md rule 7 for these labelled concept assets. All other hard rules remain in force. AGENTS.md itself is unchanged. The exact prompts, built-in generation mode and original PNGs are recorded in [image-generation evidence](https://github.com/cinexisin/thalirone-site/tree/codex/ui-modernization/evidence/image-generation).

## Implementation

- Three locally hosted photographic concepts emitted by `src/scenes.mjs`, with AVIF/WebP sources at 480/768/1200/1536px, explicit dimensions, prioritised hero loading and native lazy loading below the fold. No client image library, external media requests or extra runtime JavaScript. Config-driven category fallbacks remain supported. Optional image preparation uses Sharp outside the repository; production builds remain dependency-free.
- A fully visible server-rendered example plays once: typing → message → lights respond. Optional replay; reduced-motion and JS-off states remain complete and readable.
- Sticky mobile WhatsApp action with config-driven secondary enquiry; safe-area padding, footer clearance, no phone-call button.
- Keyboard-safe mobile menu: smooth opening/closing, focus containment, Escape restoration, close on navigation, `aria-expanded`, and native no-JS fallback. Skip link moves focus to the main content.
- Sticky category section navigation; all eight capability groups and their footnote preserved verbatim. Pricing reads only the existing `pricing` object, including live EKANI One “from” pricing.
- Local WOFF2 fonts with `font-display: swap`, original-aspect-ratio logo, lossless responsive WebP/AVIF derivatives, and stable content-hashed CSS/JS URLs. Original image bytes are unchanged.
- Device-only composer with name validation, relevant topic hints, one `noopener` WhatsApp handoff and a recoverable prepared-message link. It never submits to a server.
- Existing shared/illustration copy moved into `src/config.mjs`; generated `docs/` rebuilt. Zero site/build dependencies and no `package.json`. Optional review tools were installed outside the repository.

## Acceptance checklist

- [x] Branch `codex/ui-modernization`; PR into `main`; nothing pushed to `main`.
- [x] `node build.mjs --offline` and `node build.mjs` both succeed; `docs/` regenerated and committed; `docs/CNAME` = `thalirone.com`.
- [x] All 7 pages render with no console errors.
- [x] Every WhatsApp link targets `wa.me/919513636657` with the config text; the composer still requires a name and opens WhatsApp.
- [x] Adding a fourth category object to `CATEGORIES` still produces nav, home card, footer link, page and sitemap entry with no template edits (demonstrated with a throwaway local build; fixture not committed).
- [x] No horizontal scroll at 360/390/768/1024/1280/1440; tap targets ≥ 44 px; keyboard-only walkthrough done; reduced-motion checked; JS-off checked.
- [x] Lighthouse mobile scores recorded below; all requested targets met.
- [x] No text claims changed; all new/changed strings listed under “Copy changes” for owner review.
- [x] Only “Thalir Innovations” and “EKANI” introduced as site brands; existing manufacturer/integration names preserved; original logo files unchanged.
- [x] No third-party requests at runtime (fonts self-hosted); privacy page updated to match.
- [x] Before/after screenshots at 390 px and 1280 px for every page attached below.

## Lighthouse and validation

Measured on the generated site with Lighthouse 13.5.0, Chrome 153, native arm64 Node, default mobile simulated throttling, a fresh browser profile, and the uncompressed local Python static server. These are pre-merge local measurements; production was not modified.

| Page | Performance | Accessibility | Best Practices | SEO | CLS | Transfer excluding fonts |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 97 | 100 | 100 | 100 | 0 | 208,885 bytes |
| `/smart-home-cinema/` | 98 | 100 | 100 | 100 | 0 | 176,397 bytes |

Client JS: **2,183 bytes gzipped**, below 15 KB. All page transfers are below 350 KB excluding fonts. The full-scroll mobile audit, including all lazy images, measured at most **209,883 bytes** excluding fonts. Both required pages have CLS **0.000**.

- 42 page/viewport combinations passed; 14 axe WCAG 2.2 AA scans had zero violations.
- All 7 pages checked with JavaScript disabled at both 390px and 1280px.
- Keyboard walkthrough covers skip link, menu focus wrap, Escape, navigation, and FAQ operation.
- Interaction checks cover name/whitespace validation, error recovery, topic hints, exact encoded message, single popup with no opener, animation/replay/reduced-motion changes, animated FAQ, and mobile footer clearance.
- Composer navigation was intercepted locally for testing; no enquiry was sent.
- Original `SITE` and category data were compared against the baseline; only the optional short CTA labels differ. Original image bytes and generated asset parity checked. All 61 static WhatsApp links passed.
- The fourth category test ran in an automatically removed temporary copy.

[Lighthouse home report](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/lighthouse-home.report.html) · [Lighthouse smart-home report](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/lighthouse-smart-home.report.html) · [Lighthouse metrics JSON](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/lighthouse-summary.json) · [Browser evidence](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/audit.json) · [Network / console evidence](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/network-audit.json) · [Static verification](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/static-verification.json)

## Copy changes

**Owner approval requested as part of this PR review.** Existing service facts, capabilities, footnote, FAQs, enquiry text, contact details, state order, product features and price sources remain unchanged. The following are the complete new, shortened, restyled or newly placed interface strings; none adds a business capability or promise.

| Location | Exact string(s) / change |
| --- | --- |
| Home headline | “Run your home from WhatsApp or Telegram” promoted from the existing USP title; split visually into “Run your home from” and “WhatsApp or Telegram”. “Technology that grows with you.” remains the footer tagline. |
| Home introduction | “No new app to learn. Message your home the way you'd message a person.” — the existing opening shortened at the colon; the complete original explanation remains in the capability section. |
| Home supporting content | Existing home overview moved to the service section. “Everything you can do from a chat” becomes the home capability heading. “See everything your home can do” reused as the hero link. |
| Mobile / page navigation | “Close menu”, “Mobile navigation”, “On this page”, “Features”, “How it works”, “FAQ”, “Pricing”. “Menu”, “Main”, “Contact” and “WhatsApp us” are reused. |
| Short enquiry actions | “Site survey”, “Revival consultation”, “EKANI demo”. The full CTA labels and prefilled messages are unchanged. |
| Example visual | “WhatsApp / Telegram”, “Example”, “Living room”, “3 lights on”, “Lights off”, “Replay example”. Existing chat messages are reused verbatim. |
| Technical drawing labels | “Example floor plan”, “Example speaker layout”. |
| Photographic captions / alt text | “AI-generated concept”; “AI-generated concept: a couple using a phone together in a naturally lit living room”; “AI-generated concept: two people watching a film in a home cinema”; “AI-generated concept: two business owners working with a phone and laptop”. |
| Composer error | “Please enter your name to prepare your message.” |
| Composer handoff | “Your message is ready. Review it in WhatsApp, then press send.”; “Open prepared message”. |
| No-JS composer fallback | “To enquire without JavaScript, use the WhatsApp link. The message composer needs JavaScript.” |
| EKANI bundle formatting | Existing “EKANI One, every module: from ₹…/month” split into “Every module”, “EKANI One”, “from”, the live amount and “/month”. “Prices as listed on ekanicrm.com/pricing” and the yearly pricing sentence are retained. |
| EKANI flow section | Existing “How it works” and “Run your business from WhatsApp.” reused above the existing, labelled example workflow. |
| Privacy font sentence | “Fonts load from Google Fonts, which sees your IP address like any web request.” → “Fonts are hosted on this website; no font requests are sent to Google Fonts.” |

`COPY` and `DRAWING` centralize existing template and illustration wording without rewriting it; `ART_COPY` holds the photographic captions and accessible descriptions listed above. The original form field labels, “Name: ” / “Area: ” / “Interested in: ” prefixes, “Hi Thalir Innovations!” greeting, metadata and all other existing text retain their wording.

## Asks for Claude Code

- **TODO — review:** Check this PR against the claims rules and interface-copy list above, including the explicitly documented visual-rule exception from the owner’s latest direction. Keep generated people and spaces clearly labelled; they must not become testimonials or project evidence. Obtain owner approval before any merge.
- **TODO — after approval and merge:** Verify the production pages and live EKANI price presentation after the existing Pages deployment. This is a handoff only; no deployment or Pages settings were changed here.
- No backend, form endpoint, analytics, DNS, email, API, social media or hosting changes are needed for this implementation.

**Do not merge until the owner has approved. No merge or production deployment was performed.**

## Before / after screenshots

Baseline: commit `1afd7865b9b9af111af67660124cc7cb4a91cdb7`. After: this branch, live-pricing build. Screenshots are full-page PNGs at CSS viewport widths 390px (844px viewport height, device emulation) and 1280px (900px viewport height), DPR 1, reduced motion, fonts and all lazy images loaded. The fixed mobile action is captured at the viewport edge; it hides when the footer enters view during scrolling. There are **28 full-page screenshots**, committed outside `docs/`.

<details>
<summary>Home — before / after at 390px and 1280px</summary>

**390px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/home-390.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/home-390.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/home-390.png" width="250" alt="Home before at 390px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/home-390.png" width="250" alt="Home after at 390px"></td></tr></table>

**1280px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/home-1280.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/home-1280.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/home-1280.png" width="520" alt="Home before at 1280px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/home-1280.png" width="520" alt="Home after at 1280px"></td></tr></table>

</details>

<details>
<summary>Smart Home & Cinema — before / after at 390px and 1280px</summary>

**390px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/smart-home-cinema-390.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/smart-home-cinema-390.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/smart-home-cinema-390.png" width="250" alt="Smart Home & Cinema before at 390px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/smart-home-cinema-390.png" width="250" alt="Smart Home & Cinema after at 390px"></td></tr></table>

**1280px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/smart-home-cinema-1280.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/smart-home-cinema-1280.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/smart-home-cinema-1280.png" width="520" alt="Smart Home & Cinema before at 1280px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/smart-home-cinema-1280.png" width="520" alt="Smart Home & Cinema after at 1280px"></td></tr></table>

</details>

<details>
<summary>Cinema Revival — before / after at 390px and 1280px</summary>

**390px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/cinema-revival-390.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/cinema-revival-390.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/cinema-revival-390.png" width="250" alt="Cinema Revival before at 390px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/cinema-revival-390.png" width="250" alt="Cinema Revival after at 390px"></td></tr></table>

**1280px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/cinema-revival-1280.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/cinema-revival-1280.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/cinema-revival-1280.png" width="520" alt="Cinema Revival before at 1280px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/cinema-revival-1280.png" width="520" alt="Cinema Revival after at 1280px"></td></tr></table>

</details>

<details>
<summary>Business Software — before / after at 390px and 1280px</summary>

**390px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/business-software-390.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/business-software-390.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/business-software-390.png" width="250" alt="Business Software before at 390px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/business-software-390.png" width="250" alt="Business Software after at 390px"></td></tr></table>

**1280px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/business-software-1280.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/business-software-1280.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/business-software-1280.png" width="520" alt="Business Software before at 1280px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/business-software-1280.png" width="520" alt="Business Software after at 1280px"></td></tr></table>

</details>

<details>
<summary>Contact — before / after at 390px and 1280px</summary>

**390px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/contact-390.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/contact-390.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/contact-390.png" width="250" alt="Contact before at 390px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/contact-390.png" width="250" alt="Contact after at 390px"></td></tr></table>

**1280px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/contact-1280.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/contact-1280.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/contact-1280.png" width="520" alt="Contact before at 1280px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/contact-1280.png" width="520" alt="Contact after at 1280px"></td></tr></table>

</details>

<details>
<summary>Privacy — before / after at 390px and 1280px</summary>

**390px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/privacy-390.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/privacy-390.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/privacy-390.png" width="250" alt="Privacy before at 390px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/privacy-390.png" width="250" alt="Privacy after at 390px"></td></tr></table>

**1280px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/privacy-1280.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/privacy-1280.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/privacy-1280.png" width="520" alt="Privacy before at 1280px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/privacy-1280.png" width="520" alt="Privacy after at 1280px"></td></tr></table>

</details>

<details>
<summary>404 — before / after at 390px and 1280px</summary>

**390px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/404.html-390.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/404.html-390.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/404.html-390.png" width="250" alt="404 before at 390px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/404.html-390.png" width="250" alt="404 after at 390px"></td></tr></table>

**1280px** · [Before full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/before/404.html-1280.png) · [After full size](https://github.com/cinexisin/thalirone-site/blob/codex/ui-modernization/evidence/screenshots/after/404.html-1280.png)

<table><tr><th>Before</th><th>After</th></tr><tr><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/before/404.html-1280.png" width="520" alt="404 before at 1280px"></td><td><img src="https://raw.githubusercontent.com/cinexisin/thalirone-site/refs/heads/codex/ui-modernization/evidence/screenshots/after/404.html-1280.png" width="520" alt="404 after at 1280px"></td></tr></table>

</details>

