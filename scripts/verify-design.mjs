// Read-only release checks for the static site; no build, network or dependencies.
// Run after building: node scripts/verify-design.mjs
// Before commit/release: node scripts/verify-design.mjs --strict-tracked
// This checks emitted contracts, not browser layout, accessibility or actual transfer.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";
import {
  SITE,
  CATEGORIES,
  UI,
  BUSINESS_INFO,
  POLICIES,
  DESIGN,
  SHOP,
} from "../src/config.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "docs");
const baselineRef = process.env.THALIR_VERIFY_BASE || "711ecd7";
const git = (...args) => execFileSync("git", args, { cwd: root });
const baselineCommit = git("rev-parse", baselineRef).toString().trim();
const baselineFiles = new Set(
  git("ls-tree", "-r", "--name-only", baselineCommit)
    .toString()
    .trim()
    .split("\n"),
);
const baseline = await import(
  `data:text/javascript;base64,${git("show", `${baselineCommit}:src/config.mjs`).toString("base64")}`
);
const read = (path) => readFile(join(root, path), "utf8");
const routeFile = (route) =>
  route.endsWith("/") ? `${route.slice(1)}index.html` : route.slice(1);
const routes = [
  "/",
  ...CATEGORIES.map((c) => `/${c.slug}/`),
  "/contact/",
  "/shop/",
  "/privacy/",
  "/about/",
  ...POLICIES.map((p) => `/${p.slug}/`),
  "/404.html",
];
const warnings = [];
const checks = [];
const decode = (value) =>
  value.replace(
    /&(?:amp|quot|apos|lt|gt);|&#(?:x[\da-f]+|\d+);/gi,
    (entity) => {
      const names = {
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'",
        "&lt;": "<",
        "&gt;": ">",
      };
      if (names[entity]) return names[entity];
      return String.fromCodePoint(
        entity[2].toLowerCase() === "x"
          ? parseInt(entity.slice(3, -1), 16)
          : parseInt(entity.slice(2, -1), 10),
      );
    },
  );
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, key, a, b]) => [key.toLowerCase(), decode(a ?? b)],
    ),
  );
const elements = (html) =>
  [
    ...html
      .replace(/<!--[\s\S]*?-->/g, "")
      .matchAll(/<([a-z][\w:-]*)\b(?:"[^"]*"|'[^']*'|[^'">])*>/gi),
  ].map(([raw, tag]) => ({ tag: tag.toLowerCase(), ...attrs(raw) }));
const textOnly = (html) =>
  decode(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]*>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await files(path)));
    else result.push(path);
  }
  return result;
}
const localPath = (url, parent = SITE.url + "/") => {
  const resolved = new URL(url, parent);
  if (resolved.origin !== SITE.url) return null;
  const path = resolve(output, `.${decodeURIComponent(resolved.pathname)}`);
  assert.ok(
    path.startsWith(output + "/") || path === output,
    `Path escapes docs: ${url}`,
  );
  return {
    url: resolved,
    path: resolved.pathname.endsWith("/") ? join(path, "index.html") : path,
  };
};
const exists = async (path, label) =>
  assert.ok(
    await stat(path).then(
      (s) => s.isFile(),
      () => false,
    ),
    `Missing ${label}: ${relative(root, path)}`,
  );

assert.notEqual(
  git("branch", "--show-current").toString().trim(),
  "main",
  "Work must stay on a feature branch",
);
for (const key of [
  "name",
  "domain",
  "url",
  "city",
  "states",
  "serviceArea",
  "whatsapp",
  "whatsappDisplay",
  "phone",
  "phoneDisplay",
  "email",
  "hours",
  "indexNowKey",
  "social",
]) {
  assert.deepEqual(
    SITE[key],
    baseline.SITE[key],
    `Approved business fact changed: SITE.${key}`,
  );
}
for (const key of [
  "registeredName",
  "postalAddress",
  "structuredAddress",
  "grievanceName",
]) {
  assert.deepEqual(
    BUSINESS_INFO[key],
    baseline.BUSINESS_INFO[key],
    `Approved seller detail changed: ${key}`,
  );
}
assert.equal(
  await read("docs/CNAME"),
  "thalirone.com\n",
  "Preserve the production domain",
);
assert.equal(
  await read(`docs/${SITE.indexNowKey}.txt`),
  SITE.indexNowKey,
  "Preserve IndexNow ownership key",
);
await exists(join(output, ".nojekyll"), "GitHub Pages marker");
const sitemap = [
  ...(await read("docs/sitemap.xml")).matchAll(/<loc>(.*?)<\/loc>/g),
].map(([, url]) => decode(url));
assert.deepEqual(
  [...sitemap].sort(),
  routes
    .filter((p) => p !== "/404.html")
    .map((p) => SITE.url + p)
    .sort(),
  "Sitemap must contain every public route exactly once",
);
const robots = await read("docs/robots.txt");
assert.ok(robots.includes(`Sitemap: ${SITE.url}/sitemap.xml`));
assert.ok(
  !/Disallow:\s*\/(?:\s|$)/i.test(robots),
  "Do not block production indexing",
);
const emittedHtml = (await files(output))
  .filter((p) => p.endsWith(".html"))
  .map((p) => relative(output, p))
  .sort();
assert.deepEqual(
  emittedHtml,
  routes.map(routeFile).sort(),
  "Generated pages differ from configured categories/policies",
);
checks.push(
  "All configured pages, canonical domain, CNAME, sitemap, robots, .nojekyll and IndexNow file",
);

const pages = new Map();
const allowedMessages = new Set([
  UI.generalEnquiry,
  DESIGN.projectMessage,
  SHOP.bundleMessage,
  ...SHOP.services.map((s) => s.wa),
  ...[
    ...(await read("docs/shop/index.html"))
      .match(/<ul class="shop-modules">([\s\S]*?)<\/ul>/)[1]
      .matchAll(/<h3>(.*?)<\/h3>/g),
  ].map(([, name]) => SHOP.softwareMessage.replace("{product}", decode(name))),
  ...CATEGORIES.map((c) => c.cta.wa),
]);
let whatsappLinks = 0,
  internalLinks = 0,
  localResources = 0;
const clientFiles = new Set();
const cssFiles = new Set();
const usedAssets = new Set();
const riskyClaims =
  /\b(?:(?:authori[sz]ed|certified|official)\s+(?:partner|dealer|installer|reseller)|trusted by|award[- ]winning|industry[- ]leading|market[- ]leading|leading provider|\d[\d,.+]*\s*(?:(?:happy|satisfied)\s+)?(?:customers|clients|projects completed|years of experience|years in business))\b/gi;
for (const route of routes) {
  const html = await read(`docs/${routeFile(route)}`);
  const tags = elements(html);
  const ids = tags.filter((t) => t.id).map((t) => t.id);
  assert.equal(
    new Set(ids).size,
    ids.length,
    `${route}: duplicate HTML/SVG IDs`,
  );
  pages.set(route, { html, tags, ids: new Set(ids) });
  assert.equal(
    tags.filter((t) => t.tag === "h1").length,
    1,
    `${route}: exactly one h1`,
  );
  assert.equal(
    tags.filter((t) => t.tag === "main").length,
    1,
    `${route}: exactly one main landmark`,
  );
  assert.ok(/<title>[^<]+<\/title>/.test(html), `${route}: nonempty title`);
  assert.ok(
    tags.some(
      (t) => t.tag === "meta" && t.name === "description" && t.content?.trim(),
    ),
    `${route}: meta description`,
  );
  assert.deepEqual(
    tags
      .filter((t) => t.tag === "link" && t.rel === "canonical")
      .map((t) => t.href),
    [SITE.url + route],
    `${route}: canonical`,
  );
  assert.ok(
    tags.some((t) => t.property === "og:url" && t.content === SITE.url + route),
    `${route}: Open Graph URL`,
  );
  assert.ok(
    tags.some(
      (t) =>
        t.property === "og:image" &&
        t.content?.startsWith(SITE.url + "/assets/"),
    ),
    `${route}: local Open Graph image`,
  );
  assert.ok(
    tags.some((t) => t.tag === "html" && t.lang === "en-IN"),
    `${route}: language`,
  );
  for (const fragment of [
    html.match(/<header\b[\s\S]*?<\/header>/)?.[0],
    html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0],
  ]) {
    assert.ok(fragment, `${route}: header and footer required`);
    for (const c of CATEGORIES)
      assert.ok(
        elements(fragment).some(
          (t) => t.tag === "a" && t.href === `/${c.slug}/`,
        ),
        `${route}: category ${c.slug} missing in navigation/footer`,
      );
  }
  const structured = [
    ...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g),
  ]
    .filter(
      ([, attributes]) => attrs(attributes).type === "application/ld+json",
    )
    .map(([, , body]) => JSON.parse(body));
  const entities = structured.flatMap((item) => item["@graph"] || [item]);
  const business = entities.find(
    (item) => item["@id"] === SITE.url + "/#business",
  );
  assert.ok(business, `${route}: business JSON-LD`);
  assert.equal(business["@type"], "LocalBusiness");
  assert.equal(business.name, SITE.name);
  assert.equal(business.legalName, BUSINESS_INFO.registeredName);
  assert.equal(
    business.telephone.replace(/\D/g, ""),
    SITE.phone.replace(/\D/g, ""),
  );
  assert.equal(business.email, SITE.email);
  assert.deepEqual(business.address, {
    "@type": "PostalAddress",
    ...BUSINESS_INFO.structuredAddress,
  });
  assert.deepEqual(
    business.areaServed.map((area) => area.name),
    SITE.states,
  );
  assert.deepEqual(
    business.sameAs,
    SITE.social.map(([, url]) => url),
  );
  assert.deepEqual(
    business.openingHoursSpecification.map(({ dayOfWeek, opens, closes }) => ({
      dayOfWeek,
      opens,
      closes,
    })),
    [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "18:30",
      },
      { dayOfWeek: "Saturday", opens: "09:30", closes: "14:00" },
    ],
    `${route}: approved opening hours`,
  );
  assert.deepEqual(
    business.hasOfferCatalog.itemListElement.map((item) => item.url),
    CATEGORIES.map((c) => SITE.url + `/${c.slug}/`),
    `${route}: current service catalogue`,
  );
  assert.ok(
    !/"(?:aggregateRating|review|award)"\s*:/.test(JSON.stringify(structured)),
    `${route}: unverified reputation schema`,
  );
  const visible = textOnly(html);
  assert.ok(visible.includes(SITE.hours), `${route}: current visible hours`);
  assert.ok(
    visible.includes(SITE.phoneDisplay) &&
      visible.includes(SITE.whatsappDisplay),
    `${route}: correct distinct contact numbers`,
  );
  assert.ok(
    !/\b(?:undefined|NaN)\b/.test(visible),
    `${route}: missing rendered data`,
  );
  const oldPath = `docs/${routeFile(route)}`;
  const oldVisible = baselineFiles.has(oldPath)
    ? textOnly(git("show", `${baselineCommit}:${oldPath}`).toString())
    : "";
  for (const match of visible.matchAll(riskyClaims))
    assert.ok(
      oldVisible.includes(match[0]),
      `${route}: new trust claim requires substantiation: ${match[0]}`,
    );
  if (html.includes("/assets/media/") && /-concept-\d+\./.test(html))
    assert.ok(
      visible.includes("AI-generated concept"),
      `${route}: concept imagery must remain visibly labelled`,
    );
  for (const tag of tags) {
    assert.ok(
      !["iframe", "object", "embed"].includes(tag.tag),
      `${route}: embedded external/runtime surface`,
    );
    assert.ok(
      !Object.keys(tag).some((key) => /^on[a-z]+$/.test(key)),
      `${route}: unexpected inline handler`,
    );
    if (tag.tag === "script" && !tag.src)
      assert.equal(
        tag.type,
        "application/ld+json",
        `${route}: unexpected inline client script`,
      );
    if (tag.tag === "img") {
      assert.ok(
        Object.hasOwn(tag, "alt"),
        `${route}: image needs alt (empty for decoration)`,
      );
      assert.ok(
        Number(tag.width) > 0 && Number(tag.height) > 0,
        `${route}: explicit image dimensions`,
      );
    }
    if (tag.tag === "form")
      assert.ok(
        !tag.action && !tag.method,
        `${route}: contact form must not submit to a server`,
      );
    if (tag.tag === "a" && tag.href?.startsWith("tel:"))
      assert.equal(
        tag.href,
        "tel:" + SITE.phone,
        `${route}: telephone destination`,
      );
    if (
      tag.tag === "a" &&
      /(?:wa\.me|api\.whatsapp\.com)/i.test(tag.href || "")
    ) {
      const url = new URL(tag.href);
      assert.equal(
        url.origin + url.pathname,
        `https://wa.me/${SITE.whatsapp}`,
        `${route}: official WhatsApp endpoint`,
      );
      assert.ok(
        allowedMessages.has(url.searchParams.get("text")),
        `${route}: WhatsApp text not from category/general config`,
      );
      whatsappLinks++;
    }
    const resources = [];
    if (tag.src) resources.push(tag.src);
    if (tag.poster) resources.push(tag.poster);
    if (tag.srcset)
      resources.push(
        ...tag.srcset
          .split(",")
          .map((candidate) => candidate.trim().split(/\s+/)[0]),
      );
    if (
      tag.tag === "link" &&
      /(?:stylesheet|icon|preload|modulepreload|preconnect|dns-prefetch)/.test(
        tag.rel || "",
      )
    )
      resources.push(tag.href);
    if (["use", "image"].includes(tag.tag))
      resources.push(tag.href || tag["xlink:href"]);
    if (tag.style)
      resources.push(
        ...[...tag.style.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)].map(
          ([, url]) => url,
        ),
      );
    for (const resource of resources.filter(Boolean)) {
      const local = localPath(resource, SITE.url + route);
      assert.ok(local, `${route}: nonlocal runtime resource ${resource}`);
      if (resource.startsWith("#")) continue;
      await exists(local.path, "runtime resource");
      localResources++;
      if (local.url.pathname.startsWith("/assets/")) usedAssets.add(local.path);
      if (tag.tag === "script") clientFiles.add(local.path);
      if (tag.tag === "link" && tag.rel === "stylesheet")
        cssFiles.add(local.path);
    }
  }
}
for (const [route, page] of pages)
  for (const tag of page.tags.filter((tag) => tag.tag === "a" && tag.href)) {
    const local = localPath(tag.href, SITE.url + route);
    if (!local) continue;
    await exists(local.path, "internal link");
    internalLinks++;
    if (local.url.hash) {
      const target =
        pages.get(local.url.pathname) ||
        pages.get(local.url.pathname.replace(/index\.html$/, ""));
      assert.ok(
        target?.ids.has(decodeURIComponent(local.url.hash.slice(1))),
        `${route}: missing anchor ${tag.href}`,
      );
    }
  }
checks.push(
  "Business identity, hours, full route navigation, WhatsApp messages, internal links/anchors, metadata and reputation-claim regression checks",
);

let clientGzipBytes = 0,
  cssGzipBytes = 0;
for (const path of clientFiles) {
  const js = await readFile(path, "utf8");
  clientGzipBytes += gzipSync(js).length;
  assert.ok(
    !/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(|\bimport\s*\(|document\.cookie\s*=/.test(
      js,
    ),
    `Unexpected client network/storage behavior: ${relative(root, path)}`,
  );
}
assert.ok(
  clientGzipBytes <= 15 * 1024,
  `Client JS exceeds 15KiB gzip: ${clientGzipBytes}`,
);
for (const path of cssFiles) {
  const css = await readFile(path, "utf8");
  cssGzipBytes += gzipSync(css).length;
  assert.ok(
    !/@import\b/.test(css),
    "Stylesheets must not import external styles",
  );
  for (const [, raw] of css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)) {
    if (raw.startsWith("#")) continue;
    const local = localPath(raw, SITE.url + "/" + relative(output, path));
    assert.ok(local, `Nonlocal CSS resource: ${raw}`);
    await exists(local.path, "CSS resource");
    usedAssets.add(local.path);
  }
  if (path.endsWith("styles.css") || /\b(?:animation|transition)\s*:/.test(css))
    assert.ok(
      css.includes("prefers-reduced-motion"),
      "Preserve reduced-motion handling in stylesheets that introduce motion",
    );
}
checks.push(
  "Local static resource graph, no runtime network APIs, 15KiB gzipped client-JS ceiling",
);

const originalImages = git(
  "ls-tree",
  "-r",
  "--name-only",
  baselineCommit,
  "src/assets/img",
)
  .toString()
  .trim()
  .split("\n");
for (const path of originalImages)
  assert.deepEqual(
    await readFile(join(root, path)),
    git("show", `${baselineCommit}:${path}`),
    `Original Thalir logo/image changed: ${path}`,
  );
const sourceAssets = await files(join(root, "src/assets"));
const generatedAssets = await files(join(output, "assets"));
assert.deepEqual(
  generatedAssets.map((p) => relative(join(output, "assets"), p)).sort(),
  sourceAssets.map((p) => relative(join(root, "src/assets"), p)).sort(),
  "Source/generated asset inventory differs",
);
const tracked = new Set(git("ls-files", "-z").toString().split("\0"));
const untrackedAssets = [];
for (const source of sourceAssets) {
  const destination = join(
    output,
    "assets",
    relative(join(root, "src/assets"), source),
  );
  assert.deepEqual(
    await readFile(source),
    await readFile(destination),
    `Stale generated asset: ${relative(root, source)}`,
  );
  for (const path of [source, destination])
    if (!tracked.has(relative(root, path)))
      untrackedAssets.push(relative(root, path));
  if (extname(source).toLowerCase() !== ".svg") continue;
  const svg = await readFile(source, "utf8");
  assert.ok(/<svg\b/.test(svg), `Invalid SVG: ${source}`);
  assert.ok(
    !/<!DOCTYPE|<!ENTITY|<\s*(?:script|foreignObject|iframe|object|embed|animate|set)\b|\son[a-z]+\s*=/i.test(
      svg,
    ),
    `Unsafe SVG markup: ${source}`,
  );
  for (const [, url] of svg.matchAll(
    /(?:xlink:)?href\s*=\s*["']([^"']*)["']/gi,
  ))
    assert.ok(url.startsWith("#"), `External/data reference in SVG: ${source}`);
  for (const [, url] of svg.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/gi))
    assert.ok(url.startsWith("#"), `External SVG style reference: ${source}`);
  assert.ok(!/@import\b/i.test(svg), `Imported SVG style: ${source}`);
}
if (untrackedAssets.length) {
  if (process.argv.includes("--strict-tracked"))
    assert.deepEqual(
      untrackedAssets,
      [],
      "Stage new source/generated assets before release",
    );
  warnings.push(
    `${untrackedAssets.length} new asset files need git add; rerun --strict-tracked before committing.`,
  );
}
let brandCount = 0;
const manifestPath = join(root, "src/brands.mjs");
if (
  await stat(manifestPath).then(
    (s) => s.isFile(),
    () => false,
  )
) {
  const { BRAND_ASSETS } = await import(pathToFileURL(manifestPath));
  const allowedBrands = new Set(
    CATEGORIES.flatMap(
      (c) => c.page.brands?.groups.flatMap(([, names]) => names) || [],
    ),
  );
  const provenance = await read("handover/BRAND_ASSET_SOURCES.md");
  for (const [name, asset] of Object.entries(BRAND_ASSETS)) {
    assert.ok(allowedBrands.has(name), `Unconfirmed manufacturer: ${name}`);
    assert.ok(
      asset.src.startsWith("/assets/brands/"),
      `${name}: locally hosted brand asset`,
    );
    assert.ok(
      asset.width > 0 && asset.height > 0,
      `${name}: explicit logo dimensions`,
    );
    const path = localPath(asset.src).path;
    await exists(path, `${name} logo`);
    assert.ok(
      provenance.includes(name) && /https:\/\//.test(provenance),
      `${name}: source evidence missing`,
    );
    brandCount++;
  }
} else
  warnings.push(
    "No manufacturer-logo manifest exists yet; brand checks skipped.",
  );
checks.push(
  "Original Thalir image bytes unchanged; deployed assets match source; added SVGs have no active/external references; manufacturer manifest and source evidence",
);

const pageBudgets = [...pages].map(([route, { html }]) => ({
  route,
  htmlGzipBytes: gzipSync(html).length,
  textTransferFloorBytes:
    gzipSync(html).length + clientGzipBytes + cssGzipBytes,
}));
for (const page of pageBudgets)
  assert.ok(
    page.textTransferFloorBytes <= 350000,
    `${page.route}: HTML/CSS/JS alone exceed the 350KB transfer limit`,
  );
console.log(
  JSON.stringify(
    {
      baselineCommit,
      pages: pages.size,
      categories: CATEGORIES.map((c) => c.slug),
      policies: POLICIES.map((p) => p.slug),
      internalLinks,
      whatsappLinks,
      localResourceReferences: localResources,
      localAssetsReferenced: usedAssets.size,
      clientGzipBytes,
      cssGzipBytes,
      originalImagesChecked: originalImages.length,
      manufacturerLogosChecked: brandCount,
      assetFilesChecked: sourceAssets.length,
      untrackedAssets,
      pageBudgets,
      checks,
      warnings,
      limitations: [
        "This static check is not a runtime network, responsive-layout, accessibility or Lighthouse test.",
        "textTransferFloorBytes excludes fonts, images and protocol overhead; use a browser network audit for the full 350KB page budget.",
        "SVG sanitization and source records do not establish trademark permission or manufacturer affiliation.",
        "Claim patterns are regression guardrails, not an exhaustive editorial or legal review.",
      ],
    },
    null,
    2,
  ),
);
