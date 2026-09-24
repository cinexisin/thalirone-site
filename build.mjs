#!/usr/bin/env node
// Builds thalirone.com into ./docs (served by GitHub Pages). Zero dependencies.
//   node build.mjs            → build (fetches live EKANI prices, falls back if offline)
//   node build.mjs --offline  → skip the pricing fetch
import { mkdir, writeFile, copyFile, rm, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, CATEGORIES, EKANI_PRICING_FALLBACK } from "./src/config.mjs";
import { ILLUSTRATIONS, ICONS, WA_ICON, TRACE, speakerLayout } from "./src/illustrations.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "docs");
const YEAR = new Date().getFullYear();
const VERSION = Date.now().toString(36);

// ---------- helpers ----------
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
const wa = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const WA_GENERAL = "Hi Thalir Innovations! I have an enquiry.";
const waBtn = (text, label, cls = "") => `<a class="btn ${cls}" href="${esc(wa(text))}" target="_blank" rel="noopener">${WA_ICON}<span>${esc(label)}</span></a>`;
const catUrl = (c) => `/${c.slug}/`;

// ---------- EKANI pricing (live feed → fallback) ----------
async function ekaniPricing() {
  if (process.argv.includes("--offline")) return { ...EKANI_PRICING_FALLBACK, live: false };
  try {
    const r = await fetch("https://api.ekanicrm.com/v1/public/pricing", { signal: AbortSignal.timeout(10000) });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const j = await r.json();
    // Business modules only: the personal "Money" products are never shown as business prices.
    const mods = (j.modules || []).filter((m) => m.active !== false && !/money/i.test(m.key + " " + m.label));
    if (!mods.length) throw new Error("no modules");
    const modules = mods.map((m) => [m.label, m.tagline, m.monthlyInr, m.originalMonthlyInr]);
    const bundleFrom = Math.min(...(j.bundle?.tiers || []).map((t) => t.monthlyInr));
    return { modules, moduleFrom: Math.min(...mods.map((m) => m.monthlyInr)), bundleFrom, live: true };
  } catch (e) {
    console.warn("! EKANI pricing feed unavailable (" + e.message + "), using fallback");
    return { ...EKANI_PRICING_FALLBACK, live: false };
  }
}

// ---------- layout ----------
function layout({ path, title, description, body, current }) {
  const full = path === "/" ? `${SITE.name}: smart homes, home cinema & EKANI CRM · Bengaluru` : `${title} · ${SITE.name}`;
  const nav = CATEGORIES.map((c) => `<a href="${catUrl(c)}"${current === c.slug ? ' aria-current="page"' : ""}>${esc(c.name)}</a>`).join("") +
    `<a href="/contact/"${current === "contact" ? ' aria-current="page"' : ""}>Contact</a>`;
  const ld = {
    "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url,
    logo: SITE.url + "/assets/img/icon-512.png", email: SITE.email,
    contactPoint: [{ "@type": "ContactPoint", telephone: "+91-95136-36657", contactType: "sales", areaServed: "IN" }],
    address: { "@type": "PostalAddress", addressLocality: SITE.city, addressRegion: "Karnataka", addressCountry: "IN" },
    sameAs: SITE.social.map(([, u]) => u),
  };
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE.url}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE.url}${path}">
<meta property="og:image" content="${SITE.url}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A452D">
<link rel="icon" href="/assets/favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="/assets/img/favicon-48.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap">
<link rel="stylesheet" href="/assets/styles.css?v=${VERSION}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
  <div class="wrap">
    <a class="brand" href="/" aria-label="${esc(SITE.name)} home"><img src="/assets/img/logo.png" alt="${esc(SITE.name)}" width="349" height="46"></a>
    <nav class="nav" aria-label="Main">${nav}${waBtn(WA_GENERAL, "WhatsApp us", "sm head-cta")}</nav>
    <details class="menu"><summary>Menu</summary><div class="menu-panel">${nav}${waBtn(WA_GENERAL, "WhatsApp us")}</div></details>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-foot">
  <div class="wrap">
    <div class="cols">
      <div style="display:grid;gap:14px;align-content:start">
        <img src="/assets/img/logo.png" alt="${esc(SITE.name)}" width="409" height="54" loading="lazy">
        <p class="muted">${esc(SITE.tagline)} ${esc(SITE.city)}, India.</p>
      </div>
      <div><h3>What we do</h3><ul>${CATEGORIES.map((c) => `<li><a href="${catUrl(c)}">${esc(c.name)}</a></li>`).join("")}<li><a href="/contact/">Contact</a></li></ul></div>
      <div><h3>Talk to us</h3><ul>
        <li><a href="${esc(wa(WA_GENERAL))}" target="_blank" rel="noopener">WhatsApp ${esc(SITE.whatsappDisplay)}</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li class="muted">${esc(SITE.hours)}</li>
        ${SITE.social.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("")}
      </ul></div>
    </div>
    <div class="legal"><span>© ${YEAR} ${esc(SITE.name)} · ${esc(SITE.city)}</span><a href="/privacy/">Privacy</a></div>
  </div>
</footer>
<script src="/assets/main.js?v=${VERSION}" defer></script>
</body>
</html>`;
}

// ---------- shared blocks ----------
function composer(preselect = "") {
  const hint = CATEGORIES.find((c) => c.slug === preselect)?.composerHint ?? CATEGORIES[0].composerHint ?? "";
  const opts = CATEGORIES.map((c) => `<option value="${esc(c.name)}"${preselect === c.slug ? " selected" : ""}>${esc(c.name)}</option>`).join("");
  return `<form class="composer" id="composer" data-wa="${SITE.whatsapp}" novalidate>
  <div class="row">
    <label for="c-name">Your name<input id="c-name" name="name" autocomplete="name" required></label>
    <label for="c-area">Area / city<input id="c-area" name="area" autocomplete="address-level2" placeholder="e.g. Whitefield, Bengaluru"></label>
  </div>
  <label for="c-topic">I'm interested in<select id="c-topic" name="topic">${opts}<option value="Something else">Something else</option></select></label>
  <label for="c-msg">Tell us a little<textarea id="c-msg" name="msg" placeholder="${esc(hint)}"></textarea></label>
  <button class="btn" type="submit">${WA_ICON}<span>Continue on WhatsApp</span></button>
  <p class="fine">This opens WhatsApp with your message ready to send to ${esc(SITE.whatsappDisplay)}. Nothing is sent until you press send.</p>
</form>`;
}
function reachBand(preselect) {
  return `<section class="reach band" id="contact" aria-labelledby="reach-h">
  <div class="wrap">
    <div class="copy">
      <span class="eyebrow">Talk to us</span>
      <h2 id="reach-h">Tell us what you're planning.</h2>
      <p>Message us on WhatsApp and our team replies. No call centre, no forms that vanish.</p>
      <dl>
        <dt>WhatsApp</dt><dd><a href="${esc(wa(WA_GENERAL))}" target="_blank" rel="noopener">${esc(SITE.whatsappDisplay)}</a></dd>
        <dt>Email</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd>
        <dt>Hours</dt><dd>${esc(SITE.hours)}</dd>
        <dt>Based in</dt><dd>${esc(SITE.city)}, Karnataka</dd>
      </dl>
    </div>
    ${composer(preselect)}
  </div>
</section>`;
}
const faqBlock = (items) => `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`;

// ---------- pages ----------
function home() {
  const bySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);
  const a = bySlug("smart-home-cinema") ?? CATEGORIES[0];
  const b = bySlug("business-software") ?? CATEGORIES[1];
  const rv = bySlug("cinema-revival");
  const cards = CATEGORIES.map((c) => `<article class="cat">
    <div class="cat-art">${ILLUSTRATIONS[c.illustration]?.() || ""}</div>
    <div class="cat-body">
      <span class="eyebrow">${esc(c.label)}</span>
      <h3 style="font-size:1.5rem">${esc(c.name)}</h3>
      <p class="muted">${esc(c.card.pitch)}</p>
      <ul class="ticks">${c.card.bullets.map((x) => `<li>${ICONS.check}<span>${esc(x)}</span></li>`).join("")}</ul>
      <div class="cat-foot">${waBtn(c.cta.wa, c.cta.label, "sm")}<a class="link-arrow" href="${catUrl(c)}">Explore ${esc(c.name)} ${ICONS.arrow}</a></div>
    </div>
  </article>`).join("");
  const sh = CATEGORIES.find((c) => c.slug === "smart-home-cinema");
  return `
<section class="hero">
  <div class="wrap">
    <div class="hero-copy">
      <span class="eyebrow">Bengaluru · India</span>
      <h1>Technology that grows with you.</h1>
      <p class="lede">We design smart homes and home cinemas, bring existing home theatres back to their best, and build EKANI, the WhatsApp-first CRM for Indian businesses. One team, engineering for your home and your business.</p>
      <div class="btns">${waBtn(a.cta.wa, a.cta.label)}${waBtn(b.cta.wa, b.cta.label, "ghost")}</div>
      ${rv ? `<a class="link-arrow" href="${catUrl(rv)}">Already have a home theatre? ${esc(rv.name)} ${ICONS.arrow}</a>` : ""}
      <p class="contact-line"><span>WhatsApp <b>${esc(SITE.whatsappDisplay)}</b></span><span>${esc(SITE.hours)}</span></p>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="plate a">${ILLUSTRATIONS.floorplan()}</div>
      <div class="plate b">${ILLUSTRATIONS.ekaniflow()}</div>
    </div>
  </div>
</section>
<section class="band cream" aria-labelledby="cats-h">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">What we do</span><h2 id="cats-h">One standard of work, for your home and your business</h2></div>
    <div class="cats">${cards}</div>
  </div>
</section>
<section class="band" aria-labelledby="why-h">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">Why Thalir</span><h2 id="why-h">Engineered properly, explained plainly</h2></div>
    <div class="why">
      <div><h3>Programmed, not just installed</h3><p>We design and program KNX systems in ETS6, and we measure cinema rooms with REW before we tune them.</p></div>
      <div><h3>We build our own software</h3><p>EKANI is built by our team in Bengaluru, so you talk to the people who make it, not a reseller.</p></div>
      <div><h3>Reach us on WhatsApp</h3><p>Enquiries, quotes and support all happen where you already are, with no call-centre queue.</p></div>
    </div>
  </div>
</section>
${sh?.page.brands ? `<section class="band cream tight" aria-labelledby="brands-h"><div class="wrap"><div class="sec-head"><h2 id="brands-h" style="font-size:1.4rem">${esc(sh.page.brands.title)}</h2></div><div class="brand-groups">${sh.page.brands.groups.map(([k, list]) => `<div class="row"><span class="k">${esc(k)}</span>${list.map((n) => `<span class="brand-name">${esc(n)}</span>`).join("")}</div>`).join("")}</div></div></section>` : ""}
${reachBand()}`;
}

function categoryPage(c, pricing) {
  const p = c.page;
  const art = c.illustration === "ekaniflow" ? `<div class="plate a" style="width:100%">${ILLUSTRATIONS.ekaniflow()}</div>` : `<div class="plate a" style="width:100%">${ILLUSTRATIONS[c.illustration]()}</div>`;
  let s = `
<section class="hero page-hero">
  <div class="wrap">
    <div class="hero-copy">
      <span class="eyebrow">${esc(p.eyebrow)}</span>
      <h1>${esc(p.h1)}</h1>
      <p class="lede">${esc(p.lede)}</p>
      <div class="btns">${waBtn(c.cta.wa, c.cta.label)}${p.pricingUrl ? `<a class="btn ghost" href="${p.pricingUrl}" target="_blank" rel="noopener">See pricing</a>` : ""}</div>
      ${p.signInUrl ? `<p class="contact-line"><span>Already a customer? <a href="${p.signInUrl}" target="_blank" rel="noopener">Sign in to EKANI</a></span></p>` : `<p class="contact-line"><span>WhatsApp <b>${esc(SITE.whatsappDisplay)}</b></span><span>${esc(SITE.hours)}</span></p>`}
    </div>
    <div class="hero-art">${art}</div>
  </div>
</section>`;
  if (p.features) s += `
<section class="band cream" aria-labelledby="f-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">${esc(c.name)}</span><h2 id="f-h">${esc(p.featuresTitle)}</h2></div>
  <div class="features">${p.features.map(([ic, h, t]) => `<div class="feature">${ICONS[ic] || ""}<h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join("")}</div>
</div></section>`;
  if (c.slug === "business-software") s += `
<section class="band cream" aria-labelledby="m-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">EKANI modules</span><h2 id="m-h">${esc(p.featuresTitle)}</h2><p class="muted">Each module includes up to 3 users. Or get every module with EKANI One.</p></div>
  <div class="modules">${pricing.modules.map(([n, t, price, orig]) => `<div class="module"><h3>${esc(n)}</h3><p>${esc(t)}</p><span class="price">${inr(price)}/month${orig && orig > price ? `<s>${inr(orig)}</s>` : ""}</span></div>`).join("")}</div>
  <div class="price-note"><span class="big">EKANI One, every module: from ${inr(pricing.bundleFrom)}/month</span><span class="muted">Prices as listed on <a href="${p.pricingUrl}" target="_blank" rel="noopener">ekanicrm.com/pricing</a>. Yearly plans cost 10× the monthly price.</span></div>
</div></section>
<section class="band" aria-labelledby="who-h"><div class="wrap split">
  <div class="copy"><span class="eyebrow">Built for</span><h2 id="who-h">Businesses that sell on WhatsApp</h2><p class="muted">Trades and service businesses that quote, install and maintain, with a team in the field.</p><div class="pill-row">${p.audience.map((x) => `<span class="pill">${esc(x)}</span>`).join("")}</div></div>
  <div class="copy"><span class="eyebrow">Languages</span><h3>The bot, reminders and voice notes work in ten languages</h3><div class="pill-row">${p.languages.map((x) => `<span class="pill">${esc(x)}</span>`).join("")}</div><p class="muted" style="font-size:.92rem">Web screens are in English.</p></div>
</div></section>
<section class="band cream tight" aria-labelledby="t-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Your data</span><h2 id="t-h">Kept separate and protected</h2></div>
  <ul class="ticks" style="max-width:46rem">${p.trust.map(([x]) => `<li>${ICONS.shield}<span>${esc(x)}</span></li>`).join("")}</ul>
</div></section>`;
  if (p.spotlight) s += `
<section class="band" aria-labelledby="sp-h"><div class="wrap split">
  <div class="copy"><span class="eyebrow">${esc(p.spotlight.eyebrow)}</span><h2 id="sp-h">${esc(p.spotlight.title)}</h2>${p.spotlight.body.map((x) => `<p class="muted">${esc(x)}</p>`).join("")}</div>
  <div class="art">${ILLUSTRATIONS.floorplan()}</div>
</div></section>`;
  if (p.cinema) s += `
<section class="band cream" aria-labelledby="cin-h"><div class="wrap split">
  <div class="art">${speakerLayout()}</div>
  <div class="copy"><span class="eyebrow">${esc(p.cinema.eyebrow)}</span><h2 id="cin-h">${esc(p.cinema.title)}</h2><p class="muted">${esc(p.cinema.body)}</p><ul class="ticks">${p.cinema.points.map((x) => `<li>${ICONS.check}<span>${esc(x)}</span></li>`).join("")}</ul>${p.cinema.link ? `<a class="link-arrow" href="${p.cinema.link[0]}">${esc(p.cinema.link[1])} ${ICONS.arrow}</a>` : ""}</div>
</div></section>`;
  if (p.process) s += `
<section class="band" aria-labelledby="pr-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">How it works</span><h2 id="pr-h">${esc(p.processTitle || "From first visit to handover")}</h2></div>
  <ol class="steps">${p.process.map(([h, t]) => `<li><h3>${esc(h)}</h3><p>${esc(t)}</p></li>`).join("")}</ol>
</div></section>`;
  if (p.brands) s += `
<section class="band cream tight" aria-labelledby="br-h"><div class="wrap">
  <div class="sec-head"><h2 id="br-h" style="font-size:1.4rem">${esc(p.brands.title)}</h2></div>
  <div class="brand-groups">${p.brands.groups.map(([k, list]) => `<div class="row"><span class="k">${esc(k)}</span>${list.map((n) => `<span class="brand-name">${esc(n)}</span>`).join("")}</div>`).join("")}</div>
</div></section>`;
  if (p.faq) s += `
<section class="band" aria-labelledby="faq-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Questions</span><h2 id="faq-h">What people ask us</h2></div>
  ${faqBlock(p.faq)}
</div></section>`;
  return s + reachBand(c.slug);
}

function contactPage() {
  return `
<section class="hero page-hero" style="padding-bottom:24px"><div class="wrap" style="grid-template-columns:1fr">
  <div class="hero-copy"><span class="eyebrow">Contact</span><h1>Let's talk.</h1><p class="lede">The fastest way to reach us is WhatsApp. Tell us a little about your home or business and we'll take it from there.</p></div>
</div></section>
${reachBand()}`;
}

function privacyPage() {
  return `<section class="band"><div class="wrap prose">
  <span class="eyebrow">Privacy</span>
  <h1 style="font-size:2.2rem">How we handle your information</h1>
  <p class="muted">Last updated ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
  <h2>This website</h2>
  <p>thalirone.com doesn't use cookies, analytics or advertising trackers. Fonts load from Google Fonts, which sees your IP address like any web request. The contact form doesn't send anything to us by itself. It prepares a WhatsApp message on your device, and nothing is sent unless you press send in WhatsApp.</p>
  <h2>When you message us</h2>
  <p>Messages you send to ${esc(SITE.whatsappDisplay)} reach us through WhatsApp (Meta) and our messaging provider, and are recorded in our customer system so our team can reply and follow up. We use your name, number, area and what you tell us only to answer your enquiry, prepare quotes and serve you as a customer.</p>
  <h2>Sharing</h2>
  <p>We don't sell your information. We share it only with the service providers we need to run our business, such as WhatsApp and our messaging provider, or when the law requires it.</p>
  <h2>Your choices</h2>
  <p>To see, correct or delete what we hold about you, email <a href="mailto:${SITE.email}">${SITE.email}</a> or message us on WhatsApp. If you ask us to stop messaging you, we will.</p>
  <h2>Contact</h2>
  <p>${esc(SITE.name)}, ${esc(SITE.city)}, Karnataka, India · <a href="mailto:${SITE.email}">${SITE.email}</a></p>
</div></section>`;
}

function notFound() {
  return `<section class="band"><div class="wrap" style="display:grid;gap:18px;justify-items:start">
  <span class="eyebrow">404</span><h1>This page isn't here.</h1>
  <p class="lede">The link may be old. Here's where to go instead:</p>
  <div class="btns"><a class="btn" href="/">Home</a>${CATEGORIES.map((c) => `<a class="btn ghost" href="${catUrl(c)}">${esc(c.name)}</a>`).join("")}</div>
</div></section>`;
}

// ---------- write ----------
async function page(path, file, args) {
  const dest = join(OUT, file);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, layout({ path, ...args }));
  console.log("  " + file);
}
async function copyDir(src, dst) {
  await mkdir(dst, { recursive: true });
  for (const e of await readdir(src, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    if (e.isDirectory()) await copyDir(join(src, e.name), join(dst, e.name));
    else await copyFile(join(src, e.name), join(dst, e.name));
  }
}

const pricing = await ekaniPricing();
console.log(`EKANI pricing: ${pricing.live ? "live feed" : "fallback"} · modules from ${inr(pricing.moduleFrom)} · One from ${inr(pricing.bundleFrom)}`);
await rm(OUT, { recursive: true, force: true });
await copyDir(join(ROOT, "src/assets"), join(OUT, "assets"));
await page("/", "index.html", { title: SITE.name, description: SITE.description, body: home() });
for (const c of CATEGORIES) {
  await page(catUrl(c), `${c.slug}/index.html`, { title: c.page.title, description: c.page.metaDescription, body: categoryPage(c, pricing), current: c.slug });
}
await page("/contact/", "contact/index.html", { title: "Contact", description: `WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}. ${SITE.name}, ${SITE.city}.`, body: contactPage(), current: "contact" });
await page("/privacy/", "privacy/index.html", { title: "Privacy", description: `How ${SITE.name} handles your information.`, body: privacyPage() });
await page("/404.html", "404.html", { title: "Page not found", description: SITE.description, body: notFound() });

const urls = ["/", ...CATEGORIES.map(catUrl), "/contact/", "/privacy/"];
await writeFile(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE.url}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
await writeFile(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
await writeFile(join(OUT, "CNAME"), SITE.domain + "\n");
await writeFile(join(OUT, ".nojekyll"), "");
console.log("built → docs/");
