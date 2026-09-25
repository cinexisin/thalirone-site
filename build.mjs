#!/usr/bin/env node
// Builds thalirone.com into ./docs (served by GitHub Pages). Zero dependencies.
//   node build.mjs            → build (fetches live EKANI prices, falls back if offline)
//   node build.mjs --offline  → skip the pricing fetch
import {
  mkdir,
  writeFile,
  copyFile,
  rm,
  readdir,
  readFile,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE,
  CATEGORIES,
  EKANI_PRICING_FALLBACK,
  UI,
  COPY,
  BUSINESS_INFO,
  POLICIES,
} from "./src/config.mjs";
import {
  ILLUSTRATIONS,
  ICONS,
  WA_ICON,
  TRACE,
  speakerLayout,
} from "./src/illustrations.mjs";

import { SCENES, livingScene, cinemaScene } from "./src/scenes.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "docs");
const YEAR = new Date().getFullYear();
const VERSION = createHash("sha256")
  .update(await readFile(join(ROOT, "src/assets/styles.css")))
  .update(await readFile(join(ROOT, "src/assets/main.js")))
  .digest("hex")
  .slice(0, 10);

// ---------- helpers ----------
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
const wa = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const WA_GENERAL = UI.generalEnquiry;
const waBtn = (text, label, cls = "") =>
  `<a class="btn ${cls}" href="${esc(wa(text))}" target="_blank" rel="noopener">${WA_ICON}<span>${esc(label)}</span></a>`;
const catUrl = (c) => `/${c.slug}/`;
const logo = (lazy = false) => `<picture>
  <source type="image/webp" srcset="/assets/img/logo-172.webp 172w, /assets/img/logo-344.webp 344w, /assets/img/logo-516.webp 516w" sizes="(max-width: 768px) 151px, 172px">
  <source type="image/avif" srcset="/assets/img/logo-172.avif 172w, /assets/img/logo-344.avif 344w, /assets/img/logo-516.avif 516w" sizes="(max-width: 768px) 151px, 172px">
  <img src="/assets/img/logo.png" alt="${esc(SITE.name)}" width="172" height="64" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'}>
</picture>`;
function mobileAction(current, path) {
  if (
    ["/terms/", "/refunds/", "/shipping/", "/privacy/", "/contact/"].includes(
      path,
    )
  )
    return `<aside class="mobile-action" aria-label="${esc(UI.contact)}">${waBtn(WA_GENERAL, UI.whatsapp)}<a class="mobile-secondary" href="mailto:${esc(SITE.email)}">${esc(BUSINESS_INFO.emailSupport)} ${ICONS.arrow}</a></aside>`;
  const c = CATEGORIES.find((c) => c.slug === current) || CATEGORIES[0];
  return `<aside class="mobile-action" aria-label="${esc(UI.contact)}">${waBtn(WA_GENERAL, UI.whatsapp)}<a class="mobile-secondary" href="${esc(wa(c.cta.wa))}" target="_blank" rel="noopener">${esc(c.cta.shortLabel || c.cta.label)} ${ICONS.arrow}</a></aside>`;
}
function heroDemo(u) {
  return `<div class="home-demo" data-demo>
    <div class="demo-top"><span class="eyebrow">${esc(UI.demoLabel)}</span><span class="example-tag">${esc(UI.example)}</span></div>
    <div class="demo-room">${livingScene(undefined, { layout: "wide", eager: true })}<div class="room-caption"><span>${esc(UI.room)}</span><span class="room-status" data-on="${esc(UI.roomState)}" data-off="${esc(UI.roomStateOff)}">${esc(UI.roomState)}</span></div></div>
    <div class="demo-conversation" role="group" aria-label="${esc(u.chatSub)}">
      <div class="demo-chat-title">${ICONS.chat}<strong>${esc(u.chatTitle)}</strong><span>${esc(u.chatSub)}</span></div>
      <div class="demo-messages">${u.chat
        .slice(0, 4)
        .map(
          ([who, t], i) =>
            `<div class="demo-slot"><p class="msg ${who}" data-message="${i}">${esc(t)}</p><span class="typing" aria-hidden="true"><i></i><i></i><i></i></span></div>`,
        )
        .join("")}</div>
    </div>
    <div class="demo-bottom"><p>${esc(u.chatNote)}</p><button class="replay" type="button" hidden>${esc(UI.replay)} ${ICONS.arrow}</button></div>
  </div>`;
}

// ---------- EKANI pricing (live feed → fallback) ----------
async function ekaniPricing() {
  if (process.argv.includes("--offline"))
    return { ...EKANI_PRICING_FALLBACK, live: false };
  try {
    const r = await fetch("https://api.ekanicrm.com/v1/public/pricing", {
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const j = await r.json();
    // Business modules only: the personal "Money" products are never shown as business prices.
    const mods = (j.modules || []).filter(
      (m) => m.active !== false && !/money/i.test(m.key + " " + m.label),
    );
    if (!mods.length) throw new Error("no modules");
    const modules = mods.map((m) => [
      m.label,
      m.tagline,
      m.monthlyInr,
      m.originalMonthlyInr,
    ]);
    const bundleFrom = Math.min(
      ...(j.bundle?.tiers || []).map((t) => t.monthlyInr),
    );
    return {
      modules,
      moduleFrom: Math.min(...mods.map((m) => m.monthlyInr)),
      bundleFrom,
      live: true,
    };
  } catch (e) {
    console.warn(
      "! EKANI pricing feed unavailable (" + e.message + "), using fallback",
    );
    return { ...EKANI_PRICING_FALLBACK, live: false };
  }
}

// ---------- layout ----------
function layout({ path, title, description, body, current }) {
  const full =
    path === "/"
      ? `${SITE.name}: ${COPY.homeMetaSuffix}`
      : `${title} · ${SITE.name}`;
  const nav =
    CATEGORIES.map(
      (c) =>
        `<a href="${catUrl(c)}"${current === c.slug ? ' aria-current="page"' : ""}>${esc(c.name)}</a>`,
    ).join("") +
    `<a href="/contact/"${current === "contact" ? ' aria-current="page"' : ""}>${esc(COPY.contact)}</a>`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE.url + "/#business",
    name: SITE.name,
    legalName: BUSINESS_INFO.registeredName,
    description: SITE.description,
    url: SITE.url,
    logo: SITE.url + "/assets/img/icon-512.png",
    image: SITE.url + "/assets/img/og.jpg",
    telephone: "+91-95136-36646",
    email: SITE.email,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:30",
        closes: "14:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: SITE.name,
      itemListElement: CATEGORIES.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        url: SITE.url + catUrl(c),
        itemListElement: (c.page.features
          ? c.page.features.map(([, h]) => h)
          : c.card.bullets
        ).map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      })),
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-95136-36646",
        contactType: "sales",
        areaServed: "IN",
      },
    ],
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_INFO.structuredAddress,
    },
    areaServed: SITE.states.map((name) => ({ "@type": "State", name })),
    sameAs: SITE.social.map(([, u]) => u),
  };
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
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
<link rel="preload" href="/assets/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/nunito-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css?v=${VERSION}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="${path === "/" ? "home-page" : current || "utility-page"}">
<a class="skip" href="#main">${esc(COPY.skip)}</a>
<header class="site-head">
  <div class="wrap">
    <a class="brand" href="/" aria-label="${esc(SITE.name)} home">${logo()}</a>
    <nav class="nav" aria-label="${esc(UI.mainNav)}">${nav}${waBtn(WA_GENERAL, UI.whatsapp, "sm head-cta")}</nav>
    <details class="menu"><summary aria-controls="mobile-panel" data-open-label="${esc(UI.menu)}" data-close-label="${esc(UI.closeMenu)}"><span>${esc(UI.menu)}</span><span class="menu-icon" aria-hidden="true"></span></summary><nav id="mobile-panel" class="menu-panel" aria-label="${esc(UI.mobileNav)}">${nav}${waBtn(WA_GENERAL, UI.whatsapp)}</nav></details>
  </div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="site-foot">
  <div class="wrap">
    <div class="cols">
      <div style="display:grid;gap:14px;align-content:start">
        ${logo(true)}
        <p class="muted">${esc(SITE.tagline)} ${esc(COPY.footerBased)} ${esc(SITE.city)}, ${esc(COPY.footerServing)} ${esc(SITE.serviceArea)}.</p>
      </div>
      <div><h2>${esc(COPY.whatWeDo)}</h2><ul>${CATEGORIES.map((c) => `<li><a href="${catUrl(c)}">${esc(c.name)}</a></li>`).join("")}<li><a href="/about/">${esc(BUSINESS_INFO.about)}</a></li><li><a href="/contact/">${esc(COPY.contact)}</a></li></ul></div>
      <div><h2>${esc(COPY.talk)}</h2><ul>
        <li><a href="${esc(wa(WA_GENERAL))}" target="_blank" rel="noopener">${esc(COPY.whatsapp)} ${esc(SITE.whatsappDisplay)}</a></li>
        <li><a href="tel:${esc(SITE.phone)}">${esc(COPY.call)} ${esc(SITE.phoneDisplay)}</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li class="muted">${esc(SITE.hours)}</li>
        ${SITE.social.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("")}
      </ul></div>
    </div>
    <div class="legal"><span>© ${YEAR} ${esc(SITE.name)} · ${esc(SITE.city)}</span><nav class="policy-links" aria-label="${esc(BUSINESS_INFO.nav)}">${policyLinks(path)}</nav></div>
  </div>
</footer>
${mobileAction(current, path)}
<script src="/assets/main.js?v=${VERSION}" defer></script>
</body>
</html>`;
}

// ---------- shared blocks ----------
function composer(preselect = "") {
  const hint =
    CATEGORIES.find((c) => c.slug === preselect)?.composerHint ??
    CATEGORIES[0].composerHint ??
    "";
  const opts = CATEGORIES.map(
    (c) =>
      `<option value="${esc(c.name)}" data-hint="${esc(c.composerHint)}"${preselect === c.slug ? " selected" : ""}>${esc(c.name)}</option>`,
  ).join("");
  return `<noscript><p class="no-script">${esc(UI.noScript)} ${waBtn(WA_GENERAL, UI.whatsapp)}</p></noscript>
  <form class="composer" id="composer" data-wa="${SITE.whatsapp}" data-greeting="${esc(UI.formGreeting)}" data-name-prefix="${esc(UI.namePrefix)}" data-area-prefix="${esc(UI.areaPrefix)}" data-topic-prefix="${esc(UI.topicPrefix)}" hidden novalidate>
  <div class="row">
    <label for="c-name">${esc(UI.nameLabel)}<input id="c-name" name="name" autocomplete="name" maxlength="120" required aria-describedby="name-error"><span class="field-error" id="name-error" hidden>${esc(UI.nameError)}</span></label>
    <label for="c-area">${esc(UI.areaLabel)}<input id="c-area" name="area" autocomplete="address-level2" maxlength="200" placeholder="${esc(UI.areaPlaceholder)}"></label>
  </div>
  <label for="c-topic">${esc(UI.topicLabel)}<select id="c-topic" name="topic">${opts}<option value="${esc(UI.otherTopic)}">${esc(UI.otherTopic)}</option></select></label>
  <label for="c-msg">${esc(UI.messageLabel)}<textarea id="c-msg" name="msg" maxlength="3000" placeholder="${esc(hint)}"></textarea></label>
  <button class="btn" type="submit">${WA_ICON}<span>${esc(UI.continue)}</span></button>
  <p class="fine">${esc(UI.formNote)} ${esc(SITE.whatsappDisplay)}${esc(UI.formNoteEnd)}</p>
  <div class="form-result" hidden><p role="status">${esc(UI.handoff)}</p><a class="link-arrow" href="${esc(wa(WA_GENERAL))}" target="_blank" rel="noopener">${esc(UI.openMessage)} ${ICONS.arrow}</a></div>
</form>`;
}
function reachBand(preselect) {
  return `<section class="reach band" id="contact" aria-labelledby="reach-h">
  <div class="wrap">
    <div class="copy">
      <span class="eyebrow">${esc(COPY.talk)}</span>
      <h2 id="reach-h">${esc(COPY.reachTitle)}</h2>
      <p>${esc(COPY.reachIntro)}</p>
      <dl>
        <dt>${esc(COPY.whatsapp)}</dt><dd><a href="${esc(wa(WA_GENERAL))}" target="_blank" rel="noopener">${esc(SITE.whatsappDisplay)}</a></dd>
        <dt>${esc(COPY.call)}</dt><dd><a href="tel:${esc(SITE.phone)}">${esc(SITE.phoneDisplay)}</a></dd>
        <dt>${esc(COPY.email)}</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd>
        <dt>${esc(COPY.hours)}</dt><dd>${esc(SITE.hours)}</dd>
        <dt>${esc(COPY.cover)}</dt><dd>${esc(SITE.states.join(", "))}</dd>
        <dt>${esc(COPY.based)}</dt><dd>${esc(SITE.city)}, Karnataka</dd>
      </dl>
    </div>
    ${composer(preselect)}
  </div>
</section>`;
}
function uspBlock(u, { compact = false, link = null } = {}) {
  if (!u) return "";
  const chat = compact
    ? `<div class="usp-proof"><ul class="ticks">${u.points.map((x) => `<li>${ICONS.check}<span>${esc(x)}</span></li>`).join("")}</ul></div>`
    : `<div class="chatdemo" role="img" aria-label="${esc(u.chatLabel)}">
    <div class="chat-head">${WA_ICON}<span>${esc(u.chatTitle)}</span><span class="chat-sub">${esc(u.chatSub)}</span></div>
    <div class="chat-body">${u.chat.map(([who, t]) => `<p class="msg ${who === "me" ? "me" : "home"}">${esc(t)}</p>`).join("")}</div>
    <p class="flow-note">${esc(u.chatNote)}</p>
  </div>`;
  const groups = (compact ? u.groups.slice(0, 8) : u.groups)
    .map(
      ([h, items], i) =>
        `<div class="cap">${ICONS[["bulb", "snow", "curtain", "spark", "gate", "shield", "remote", "plan"][i]] || ICONS.check}<h3>${esc(h)}</h3><ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`,
    )
    .join("");
  return `<section class="band usp" id="chat-control" aria-labelledby="usp-h"><div class="wrap">
  <div class="usp-top">
    <div class="copy"><span class="eyebrow">${esc(u.eyebrow)}</span><h2 id="usp-h">${esc(compact ? u.groupsTitle : u.title)}</h2><p class="lede">${esc(u.lede)}</p>
      ${compact ? "" : `<ul class="ticks">${u.points.map((x) => `<li>${ICONS.check}<span>${esc(x)}</span></li>`).join("")}</ul>`}
      ${link ? `<a class="link-arrow" href="${link[0]}">${esc(link[1])} ${ICONS.arrow}</a>` : ""}
    </div>
    ${chat}
  </div>
  ${compact ? '<div class="caps-space"></div>' : `<div class="sec-head" style="margin-top:clamp(36px,5vw,56px)"><h3 class="caps-title">${esc(u.groupsTitle)}</h3></div>`}
  <div class="caps">${groups}</div>
  ${u.footnote ? `<p class="muted usp-foot">${esc(u.footnote)}</p>` : ""}
</div></section>`;
}

const faqBlock = (items) =>
  `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="faq-answer"><p>${esc(a)}</p></div></details>`).join("")}</div>`;

// ---------- pages ----------
function home() {
  const bySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);
  const a = bySlug("smart-home-cinema") ?? CATEGORIES[0];
  const rv = bySlug("cinema-revival");
  const cards = CATEGORIES.map(
    (
      c,
      i,
    ) => `<article class="cat"><span class="cat-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
    <div class="cat-art">${SCENES[c.illustration]?.() || ILLUSTRATIONS[c.illustration]?.() || ""}</div>
    <div class="cat-body">
      <span class="eyebrow">${esc(c.label)}</span>
      <h3 style="font-size:1.5rem">${esc(c.name)}</h3>
      <p class="muted">${esc(c.card.pitch)}</p>
      <ul class="ticks">${c.card.bullets.map((x) => `<li>${ICONS.check}<span>${esc(x)}</span></li>`).join("")}</ul>
      <div class="cat-foot">${waBtn(c.cta.wa, c.cta.label, "sm")}<a class="link-arrow" href="${catUrl(c)}">${esc(UI.explore)} ${esc(c.name)} ${ICONS.arrow}</a></div>
    </div>
  </article>`,
  ).join("");
  const sh = CATEGORIES.find((c) => c.slug === "smart-home-cinema");
  return `
<section class="hero visual-hero">
  <div class="wrap">
    <div class="hero-copy">
      <span class="eyebrow">${esc(UI.heroEyebrow)}</span>
      <h1>${esc(UI.heroTitle[0])} <span>${esc(UI.heroTitle[1])}</span></h1>
      <p class="lede">${esc(UI.heroLede)}</p>
      <div class="btns">${waBtn(a.cta.wa, a.cta.label)}<a class="link-arrow" href="#chat-control">${esc(UI.heroDetail)} ${ICONS.arrow}</a></div>
      ${rv ? `<a class="link-arrow" href="${catUrl(rv)}">${esc(COPY.alreadyTheatre)} ${esc(rv.name)} ${ICONS.arrow}</a>` : ""}
      <p class="contact-line"><span>${esc(COPY.whatsapp)} <b>${esc(SITE.whatsappDisplay)}</b></span><span>${esc(COPY.call)} <a href="tel:${esc(SITE.phone)}">${esc(SITE.phoneDisplay)}</a></span><span>${esc(SITE.hours)}</span></p>
    </div>
  </div>
  <div class="visual-stage wrap">${a.page.usp ? heroDemo(a.page.usp) : `<div class="hero-art">${ILLUSTRATIONS[a.illustration]?.() || ""}</div>`}</div>
</section>
<div class="service-strip"><div class="wrap"><p>${esc(SITE.serviceArea)}</p><div>${CATEGORIES.map((c) => `<a href="${catUrl(c)}">${esc(c.name)} ${ICONS.arrow}</a>`).join("")}</div></div></div>
<section class="band cream service-gallery" aria-labelledby="cats-h">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">${esc(COPY.whatWeDo)}</span><h2 id="cats-h">${esc(COPY.categoriesTitle)}</h2><p class="muted">${esc(UI.homeLede)}</p></div>
    <div class="cats${CATEGORIES.length % 3 === 1 ? " cats-even" : ""}">${cards}</div>
  </div>
</section>
${sh?.page.usp ? uspBlock(sh.page.usp, { compact: true, link: [catUrl(sh), UI.heroDetail] }) : ""}
<section class="band" aria-labelledby="why-h">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">${esc(COPY.why)}</span><h2 id="why-h">${esc(COPY.whyTitle)}</h2></div>
    <div class="why">
      <div><h3>${esc(COPY.why1)}</h3><p>${esc(COPY.why1Body)}</p></div>
      <div><h3>${esc(COPY.why2)}</h3><p>${esc(COPY.why2Body)}</p></div>
      <div><h3>${esc(COPY.why3)}</h3><p>${esc(COPY.why3Body)}</p></div>
    </div>
  </div>
</section>
${sh?.page.brands ? `<section class="band cream tight" aria-labelledby="brands-h"><div class="wrap"><div class="sec-head"><h2 id="brands-h" style="font-size:1.4rem">${esc(sh.page.brands.title)}</h2></div><div class="brand-groups">${sh.page.brands.groups.map(([k, list]) => `<div class="row"><span class="k">${esc(k)}</span>${list.map((n) => `<span class="brand-name">${esc(n)}</span>`).join("")}</div>`).join("")}</div></div></section>` : ""}
${reachBand()}`;
}

function categoryPage(c, pricing) {
  const p = c.page;
  const art = `<div class="plate a scene-plate">${SCENES[c.illustration]?.(undefined, { layout: "hero", eager: true }) || ILLUSTRATIONS[c.illustration]?.() || ""}</div>`;
  const sections = [
    ...(p.features || c.slug === "business-software"
      ? [["features", UI.features]]
      : []),
    ...(c.slug === "business-software"
      ? [
          ["pricing", UI.pricing],
          ["how-it-works", UI.how],
        ]
      : p.process
        ? [["how-it-works", UI.how]]
        : []),
    ...(p.faq ? [["faq", UI.faq]] : []),
  ];
  let s = `
<section class="hero page-hero">
  <div class="wrap">
    <div class="hero-copy">
      <span class="eyebrow">${esc(p.eyebrow)}</span>
      <h1>${esc(p.h1)}</h1>
      <p class="lede">${esc(p.lede)}</p>
      <div class="btns">${waBtn(c.cta.wa, c.cta.label)}${p.pricingUrl ? `<a class="btn ghost" href="${p.pricingUrl}" target="_blank" rel="noopener">${esc(COPY.seePricing)}</a>` : ""}</div>
      ${p.signInUrl ? `<p class="contact-line"><span>${esc(COPY.alreadyCustomer)} <a href="${p.signInUrl}" target="_blank" rel="noopener">${esc(COPY.signIn)}</a></span></p>` : `<p class="contact-line"><span>${esc(COPY.whatsapp)} <b>${esc(SITE.whatsappDisplay)}</b></span><span>${esc(COPY.call)} <a href="tel:${esc(SITE.phone)}">${esc(SITE.phoneDisplay)}</a></span><span>${esc(SITE.hours)}</span><span>${esc(COPY.serving)} ${esc(SITE.serviceArea)}</span></p>`}
    </div>
    <div class="hero-art">${art}</div>
  </div>
</section>
<nav class="page-nav" aria-label="${esc(UI.pageNav)}"><div class="wrap">${sections.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join("")}<a class="page-nav-cta" href="${esc(wa(c.cta.wa))}" target="_blank" rel="noopener">${esc(c.cta.shortLabel || c.cta.label)} ${ICONS.arrow}</a></div></nav>`;
  if (c.illustration === "revival")
    s += `<section class="revival-detail band"><div class="wrap split"><div class="art">${speakerLayout()}</div>${ILLUSTRATIONS.revival()}</div></section>`;
  if (p.usp) s += uspBlock(p.usp);
  if (p.features)
    s += `
<section class="band cream" id="features" aria-labelledby="f-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">${esc(c.name)}</span><h2 id="f-h">${esc(p.featuresTitle)}</h2></div>
  <div class="features">${p.features.map(([ic, h, t]) => `<div class="feature">${ICONS[ic] || ""}<h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join("")}</div>
</div></section>`;
  if (c.slug === "business-software")
    s += `
<section class="band cream pricing" id="features" aria-labelledby="m-h"><div class="wrap">
  <div class="sec-head" id="pricing"><span class="eyebrow">${esc(UI.moduleEyebrow)}</span><h2 id="m-h">${esc(p.featuresTitle)}</h2><p class="muted">${esc(UI.moduleNote)}</p></div>
  <div class="bundle"><div>${ICONS.plan}<span class="eyebrow">${esc(UI.bundleNote)}</span><h3>${esc(UI.bundleTitle)}</h3></div><p class="bundle-price"><span>${esc(UI.from)}</span> ${inr(pricing.bundleFrom)}<small>${esc(UI.month)}</small></p>${waBtn(c.cta.wa, c.cta.label)}</div>
  <div class="modules">${pricing.modules.map(([n, t, price, orig], i) => `<div class="module">${ICONS[["chat", "globe", "plan", "spark", "dial", "gate", "curtain", "shield", "remote", "bulb"][i % 10]]}<h3>${esc(n)}</h3><p>${esc(t)}</p><span class="price">${inr(price)}<small>${esc(UI.month)}</small>${orig && orig > price ? `<s>${inr(orig)}</s>` : ""}</span></div>`).join("")}</div>
  <p class="price-note">${esc(UI.pricingSource)} <a href="${p.pricingUrl}" target="_blank" rel="noopener">${esc(UI.pricingSourceLabel)}</a>. ${esc(UI.annualNote)}</p>
</div></section>
<section class="band workflow" id="how-it-works" aria-labelledby="workflow-h"><div class="wrap"><div class="sec-head"><span class="eyebrow">${esc(UI.how)}</span><h2 id="workflow-h">${esc(p.h1)}</h2></div>${ILLUSTRATIONS.ekaniflow()}</div></section>
<section class="band" aria-labelledby="who-h"><div class="wrap split">
  <div class="copy"><span class="eyebrow">${esc(COPY.builtFor)}</span><h2 id="who-h">${esc(COPY.audienceTitle)}</h2><p class="muted">${esc(COPY.audienceBody)}</p><div class="pill-row">${p.audience.map((x) => `<span class="pill">${esc(x)}</span>`).join("")}</div></div>
  <div class="copy"><span class="eyebrow">${esc(COPY.languages)}</span><h3>${esc(COPY.languagesTitle)}</h3><div class="pill-row">${p.languages.map((x) => `<span class="pill">${esc(x)}</span>`).join("")}</div><p class="muted" style="font-size:.92rem">${esc(COPY.webLanguage)}</p></div>
</div></section>
<section class="band cream tight" aria-labelledby="t-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">${esc(COPY.data)}</span><h2 id="t-h">${esc(COPY.dataTitle)}</h2></div>
  <ul class="ticks" style="max-width:46rem">${p.trust.map(([x]) => `<li>${ICONS.shield}<span>${esc(x)}</span></li>`).join("")}</ul>
</div></section>`;
  if (p.spotlight)
    s += `
<section class="band" aria-labelledby="sp-h"><div class="wrap split">
  <div class="copy"><span class="eyebrow">${esc(p.spotlight.eyebrow)}</span><h2 id="sp-h">${esc(p.spotlight.title)}</h2>${p.spotlight.body.map((x) => `<p class="muted">${esc(x)}</p>`).join("")}</div>
  <div class="art">${ILLUSTRATIONS.floorplan()}</div>
</div></section>`;
  if (p.cinema)
    s += `
<section class="band cream" aria-labelledby="cin-h"><div class="wrap split">
  <div class="cinema-art"><div class="scene-plate">${cinemaScene(undefined, { layout: "detail" })}</div><details class="diagram-detail"><summary>${esc(UI.exampleCinema)}</summary>${speakerLayout()}</details></div>
  <div class="copy"><span class="eyebrow">${esc(p.cinema.eyebrow)}</span><h2 id="cin-h">${esc(p.cinema.title)}</h2><p class="muted">${esc(p.cinema.body)}</p><ul class="ticks">${p.cinema.points.map((x) => `<li>${ICONS.check}<span>${esc(x)}</span></li>`).join("")}</ul>${p.cinema.link ? `<a class="link-arrow" href="${p.cinema.link[0]}">${esc(p.cinema.link[1])} ${ICONS.arrow}</a>` : ""}</div>
</div></section>`;
  if (p.process)
    s += `
<section class="band process" id="how-it-works" aria-labelledby="pr-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">${esc(COPY.how)}</span><h2 id="pr-h">${esc(p.processTitle || COPY.processTitle)}</h2></div>
  <ol class="steps">${p.process.map(([h, t]) => `<li><h3>${esc(h)}</h3><p>${esc(t)}</p></li>`).join("")}</ol>
</div></section>`;
  if (p.brands)
    s += `
<section class="band cream tight" aria-labelledby="br-h"><div class="wrap">
  <div class="sec-head"><h2 id="br-h" style="font-size:1.4rem">${esc(p.brands.title)}</h2></div>
  <div class="brand-groups">${p.brands.groups.map(([k, list]) => `<div class="row"><span class="k">${esc(k)}</span>${list.map((n) => `<span class="brand-name">${esc(n)}</span>`).join("")}</div>`).join("")}</div>
</div></section>`;
  if (p.faq)
    s += `
<section class="band faq-section" id="faq" aria-labelledby="faq-h"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">${esc(COPY.questions)}</span><h2 id="faq-h">${esc(COPY.questionsTitle)}</h2></div>
  ${faqBlock(p.faq)}
</div></section>`;
  return s + reachBand(c.slug);
}

function contactPage() {
  return `
<section class="hero page-hero" style="padding-bottom:24px"><div class="wrap" style="grid-template-columns:1fr">
  <div class="hero-copy"><span class="eyebrow">${esc(COPY.contact)}</span><h1>${esc(COPY.contactTitle)}</h1><p class="lede">${esc(COPY.contactIntro)}</p></div>
</div></section>
${reachBand()}
<section class="band tight" aria-labelledby="payment-support"><div class="wrap prose">
  <span class="eyebrow">${esc(BUSINESS_INFO.policies)}</span>
  <h2 id="payment-support">${esc(BUSINESS_INFO.paymentTitle)}</h2>
  <p>${esc(BUSINESS_INFO.paymentBody)}</p>
  ${businessDetails()}
  ${supportBlock()}
  <nav class="policy-links" aria-label="${esc(BUSINESS_INFO.nav)}">${policyLinks()}</nav>
  ${grievanceBlock()}
</div></section>`;
}

function policyLinks(current = "") {
  return [
    ...POLICIES.map((p) => [`/${p.slug}/`, p.title]),
    ["/privacy/", COPY.privacy],
  ]
    .map(
      ([url, label]) =>
        `<a href="${url}"${current === url ? ' aria-current="page"' : ""}>${esc(label)}</a>`,
    )
    .join("");
}

function businessDetails() {
  if (!BUSINESS_INFO.registeredName || !BUSINESS_INFO.postalAddress.length)
    return "";
  return `<dl class="business-details"><dt>${esc(BUSINESS_INFO.seller)}</dt><dd>${esc(BUSINESS_INFO.registeredName)}</dd><dt>${esc(BUSINESS_INFO.address)}</dt><dd><address>${BUSINESS_INFO.postalAddress.map(esc).join("<br>")}</address></dd></dl>`;
}

function supportBlock() {
  return `<aside class="policy-support" aria-label="${esc(BUSINESS_INFO.helpTitle)}"><h2>${esc(BUSINESS_INFO.helpTitle)}</h2><p>${esc(BUSINESS_INFO.helpBody)}</p><div class="support-links"><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a><a href="${esc(wa(WA_GENERAL))}" target="_blank" rel="noopener">${esc(COPY.whatsapp)} ${esc(SITE.whatsappDisplay)}</a><a href="tel:${esc(SITE.phone)}">${esc(COPY.call)} ${esc(SITE.phoneDisplay)}</a></div><p class="fine">${esc(SITE.hours)}</p></aside>`;
}

function grievanceBlock() {
  return `<section class="policy-support" aria-labelledby="grievance"><h2 id="grievance">${esc(BUSINESS_INFO.grievanceTitle)}</h2>${BUSINESS_INFO.grievanceName ? `<p><strong>${esc(BUSINESS_INFO.grievanceName)}</strong> · ${esc(BUSINESS_INFO.grievanceRole)}</p>` : ""}<p>${esc(BUSINESS_INFO.grievanceBody)}</p><a href="mailto:${esc(SITE.email)}">${esc(BUSINESS_INFO.emailLabel)}</a><p>${esc(BUSINESS_INFO.grievanceEscalation)}</p><a href="https://consumerhelpline.gov.in/" target="_blank" rel="noopener">${esc(BUSINESS_INFO.grievanceLink)}</a></section>`;
}

function aboutPage() {
  return `<section class="band about-page"><div class="wrap">
    <header class="policy-heading"><span class="eyebrow">${esc(BUSINESS_INFO.about)}</span><h1>${esc(SITE.name)}</h1><p class="lede">${esc(BUSINESS_INFO.aboutIntro)}</p></header>
    <div class="about-services">${CATEGORIES.map((c) => `<article><span class="eyebrow">${esc(c.label)}</span><h2><a href="${catUrl(c)}">${esc(c.name)}</a></h2><p>${esc(c.card.pitch)}</p></article>`).join("")}</div>
    <div class="about-details"><div><h2>${esc(BUSINESS_INFO.aboutProcessTitle)}</h2><p>${esc(BUSINESS_INFO.aboutProcess)}</p><h2>${esc(BUSINESS_INFO.aboutLocationTitle)}</h2><p>${esc(BUSINESS_INFO.aboutLocation)}</p>${businessDetails()}</div>${supportBlock()}</div>
  </div></section>`;
}

function policyPage(p) {
  return `<section class="band policy-page"><div class="wrap">
    <header class="policy-heading"><span class="eyebrow">${esc(BUSINESS_INFO.policies)}</span><h1>${esc(p.title)}</h1><p class="lede">${esc(p.intro)}</p><p class="fine">${esc(COPY.lastUpdated)} <time datetime="${BUSINESS_INFO.updated}">${esc(BUSINESS_INFO.updatedLabel)}</time></p></header>
    <div class="policy-layout">
      <nav class="policy-toc" aria-label="${esc(BUSINESS_INFO.onPage)}"><span class="eyebrow">${esc(BUSINESS_INFO.onPage)}</span><ol>${p.sections.map((s) => `<li><a href="#${esc(s.id)}">${esc(s.title)}</a></li>`).join("")}</ol></nav>
      <div class="policy-body">${businessDetails()}${p.sections.map((s) => `<section aria-labelledby="${esc(s.id)}"><h2 id="${esc(s.id)}">${esc(s.title)}</h2>${s.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}${s.links ? `<ul class="policy-related">${s.links.map(([url, label]) => `<li><a href="${esc(url)}">${esc(label)}</a></li>`).join("")}</ul>` : ""}</section>`).join("")}${supportBlock()}</div>
    </div>
  </div></section>`;
}

function privacyPage() {
  return `<section class="band privacy"><div class="wrap prose">
  <span class="eyebrow">${esc(COPY.privacy)}</span>
  <h1 style="font-size:2.2rem">${esc(COPY.privacyTitle)}</h1>
  <p class="muted">${esc(COPY.lastUpdated)} <time datetime="${BUSINESS_INFO.updated}">${esc(BUSINESS_INFO.updatedLabel)}</time></p>
  <h2>${esc(COPY.privacySite)}</h2>
  <p>${esc(UI.privacyWebsite)}</p>
  <h2>${esc(COPY.privacyMessage)}</h2>
  <p>${esc(COPY.privacyMessagePrefix)} ${esc(SITE.whatsappDisplay)} ${esc(COPY.privacyMessageBody)}</p>
  <h2>${esc(COPY.privacyShare)}</h2>
  <p>${esc(COPY.privacySharing)}</p>
  <h2>${esc(BUSINESS_INFO.privacyPaymentsTitle)}</h2>
  <p>${esc(BUSINESS_INFO.privacyPaymentsBody)}</p>
  <h2>${esc(BUSINESS_INFO.privacyExternalTitle)}</h2>
  <p>${esc(BUSINESS_INFO.privacyExternalBody)}</p>
  <h2>${esc(COPY.privacyChoices)}</h2>
  <p>${esc(COPY.privacyChoicesPrefix)} <a href="mailto:${SITE.email}">${SITE.email}</a> ${esc(COPY.privacyChoicesBody)}</p>
  <h2>${esc(COPY.contact)}</h2>
  <p>${esc(SITE.name)}, ${esc(SITE.city)}, ${esc(COPY.location)} · <a href="mailto:${SITE.email}">${SITE.email}</a></p>
  ${businessDetails()}
</div></section>`;
}

function notFound() {
  return `<section class="band not-found"><div class="wrap" style="display:grid;gap:18px;justify-items:start">${TRACE}
  <span class="eyebrow">${esc(COPY.notFoundNumber)}</span><h1>${esc(COPY.notFoundTitle)}</h1>
  <p class="lede">${esc(COPY.notFoundBody)}</p>
  <div class="btns"><a class="btn" href="/">${esc(COPY.home)}</a>${CATEGORIES.map((c) => `<a class="btn ghost" href="${catUrl(c)}">${esc(c.name)}</a>`).join("")}</div>
</div></section>`;
}

// ---------- write ----------
async function page(path, file, args) {
  const dest = join(OUT, file);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, layout({ path, ...args }).replace(/[ \t]+$/gm, ""));
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
console.log(
  `EKANI pricing: ${pricing.live ? "live feed" : "fallback"} · modules from ${inr(pricing.moduleFrom)} · One from ${inr(pricing.bundleFrom)}`,
);
await rm(OUT, { recursive: true, force: true });
await copyDir(join(ROOT, "src/assets"), join(OUT, "assets"));
await page("/", "index.html", {
  title: SITE.name,
  description: SITE.description,
  body: home(),
});
for (const c of CATEGORIES) {
  await page(catUrl(c), `${c.slug}/index.html`, {
    title: c.page.title,
    description: c.page.metaDescription,
    body: categoryPage(c, pricing),
    current: c.slug,
  });
}
await page("/contact/", "contact/index.html", {
  title: COPY.contact,
  description: `WhatsApp ${SITE.whatsappDisplay}, call ${SITE.phoneDisplay} or email ${SITE.email}. ${SITE.name}, ${SITE.city}.`,
  body: contactPage(),
  current: "contact",
});
await page("/privacy/", "privacy/index.html", {
  title: COPY.privacy,
  description: `How ${SITE.name} handles your information.`,
  body: privacyPage(),
});
await page("/about/", "about/index.html", {
  title: BUSINESS_INFO.about,
  description: SITE.description,
  body: aboutPage(),
});
for (const p of POLICIES) {
  await page(`/${p.slug}/`, `${p.slug}/index.html`, {
    title: p.title,
    description: p.description,
    body: policyPage(p),
  });
}
await page("/404.html", "404.html", {
  title: COPY.notFoundMeta,
  description: SITE.description,
  body: notFound(),
});

const urls = [
  "/",
  ...CATEGORIES.map(catUrl),
  "/contact/",
  "/privacy/",
  "/about/",
  ...POLICIES.map((p) => `/${p.slug}/`),
];
await writeFile(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE.url}${u}</loc></url>`).join("\n")}\n</urlset>\n`,
);
await writeFile(
  join(OUT, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`,
);
await writeFile(join(OUT, "CNAME"), SITE.domain + "\n");
await writeFile(join(OUT, ".nojekyll"), "");
console.log("built → docs/");
