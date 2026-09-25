// Optional audit tooling; dependencies stay outside the zero-dependency site.
// THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules node scripts/lighthouse-design.mjs
// Audits the generated site served at THALIR_QA_URL (default localhost:4660).
// Full Lighthouse JSON stays in a temporary directory; the small summary is evidence.
// --refresh-changed reuses completed results only when URL, targets, HTML and CSS/JS match.
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { readFile, mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CATEGORIES, POLICIES } from "../src/config.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const modules =
  process.env.THALIR_QA_MODULES || "/tmp/thalirone-qa/node_modules";
const require = createRequire(join(modules, "../package.json"));
const { default: lighthouse } = await import(
  pathToFileURL(require.resolve("lighthouse"))
);
const { launch } = await import(
  pathToFileURL(require.resolve("chrome-launcher"))
);
const base = (process.env.THALIR_QA_URL || "http://127.0.0.1:4660").replace(
  /\/$/,
  "",
);
const evidenceDir = resolve(
  root,
  process.env.THALIR_LIGHTHOUSE_OUTPUT || "evidence/architectural-design",
);
const detailDir = await mkdtemp(join(tmpdir(), "thalirone-lighthouse-design-"));
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
const selected = process.env.THALIR_LIGHTHOUSE_PATHS?.split(",").map((path) =>
  path.trim(),
);
const requestedPaths = selected
  ? routes.filter((path) => selected.includes(path))
  : routes;
if (!requestedPaths.length)
  throw new Error("No configured routes selected for Lighthouse");
const targets = {
  performance: 95,
  accessibility: 100,
  "best-practices": 95,
  seo: 100,
};
const sha256 = (data) => createHash("sha256").update(data).digest("hex");
const assetFiles = [
  "styles.css",
  "main.js",
  ...(requestedPaths.includes("/shop/") ? ["shop.css"] : []),
];
const assetHash = async () =>
  sha256(
    Buffer.concat(
      await Promise.all(
        assetFiles.map((file) => readFile(join(root, "docs/assets", file))),
      ),
    ),
  );
const htmlPath = (path) =>
  join(
    root,
    "docs",
    path === "/"
      ? "index.html"
      : path.endsWith("/")
        ? `${path.slice(1)}index.html`
        : path.slice(1),
  );
const assetSha256AtStart = await assetHash();
const htmlSha256AtStart = Object.fromEntries(
  await Promise.all(
    requestedPaths.map(async (path) => [
      path,
      sha256(await readFile(htmlPath(path))),
    ]),
  ),
);
const retainedResults = [];
if (process.argv.includes("--refresh-changed")) {
  const previous = JSON.parse(
    await readFile(join(evidenceDir, "lighthouse-summary.json"), "utf8"),
  );
  if (!previous.finishedAt)
    throw new Error(
      "Previous audit is incomplete; do not overwrite a running summary",
    );
  const compatible =
    previous.baseUrl === base &&
    Object.entries(targets).every(
      ([key, value]) => previous.targets[key] === value,
    );
  if (compatible)
    retainedResults.push(
      ...previous.results.filter(
        (result) =>
          requestedPaths.includes(result.path) &&
          !result.error &&
          result.assetSha256 === assetSha256AtStart &&
          result.htmlSha256 === htmlSha256AtStart[result.path],
      ),
    );
}
const paths = requestedPaths.filter(
  (path) => !retainedResults.some((result) => result.path === path),
);
const report = {
  startedAt: new Date().toISOString(),
  baseUrl: base,
  runtime: {
    node: process.version,
    platform: process.platform,
    architecture: process.arch,
  },
  methodology:
    "Lighthouse default mobile preset with simulated throttling, one new headless Chrome profile per route. Local static server; no custom scoring or throttling settings.",
  networkScope:
    "Only requests observed during the Lighthouse navigation audit. Lazy images below the viewport may be absent. This is not a full-page transfer audit or an estimate of CDN compression.",
  fullReportDirectory: detailDir,
  targets: {
    ...targets,
    clsMaximumExclusive: 0.05,
    nonFontTransferMaximumBytes: 350000,
  },
  configuredRouteCount: routes.length,
  auditedRouteCount: requestedPaths.length,
  executedRouteCount: paths.length,
  reusedRoutes: retainedResults.map((result) => result.path),
  assetSha256AtStart,
  assetFiles,
  results: retainedResults,
};
await mkdir(evidenceDir, { recursive: true });
const save = () =>
  writeFile(
    join(evidenceDir, "lighthouse-summary.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
await save();
for (const path of paths) {
  let chrome;
  const startedAt = new Date().toISOString();
  const routeHtmlSha256 = sha256(await readFile(htmlPath(path)));
  const routeAssetSha256 = await assetHash();
  try {
    chrome = await launch({
      chromePath:
        process.env.THALIR_CHROME_PATH ||
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      chromeFlags: ["--headless=new"],
    });
    const { lhr } = await lighthouse(base + path, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
    });
    const name =
      path === "/"
        ? "home"
        : path.replace(/^\/+|\/+$/g, "").replaceAll("/", "-");
    const fullReport = join(detailDir, name + ".json");
    await writeFile(fullReport, JSON.stringify(lhr));
    if (lhr.runtimeError) throw new Error(JSON.stringify(lhr.runtimeError));
    const scores = Object.fromEntries(
      Object.entries(lhr.categories).map(([id, category]) => [
        id,
        Math.round(category.score * 100),
      ]),
    );
    const thresholdFailures = Object.entries(targets)
      .filter(([id, minimum]) => lhr.categories[id].score * 100 < minimum)
      .map(([id, minimum]) => `${id}: ${scores[id]} < ${minimum}`);
    const cls = lhr.audits["cumulative-layout-shift"].numericValue;
    if (!(cls < 0.05)) thresholdFailures.push(`CLS: ${cls} >= 0.05`);
    const requests = lhr.audits["network-requests"].details.items.map(
      (request) => ({
        url: request.url,
        resourceType: request.resourceType,
        statusCode: request.statusCode,
        transferSize: request.transferSize || 0,
        resourceSize: request.resourceSize || 0,
        isFont:
          request.resourceType === "Font" ||
          /\.(?:woff2?|ttf|otf)(?:[?#]|$)/i.test(request.url),
      }),
    );
    const network = {
      requestCount: requests.length,
      transferBytes: requests.reduce(
        (sum, request) => sum + request.transferSize,
        0,
      ),
      nonFontTransferBytes: requests
        .filter((request) => !request.isFont)
        .reduce((sum, request) => sum + request.transferSize, 0),
      nonFontResourceBytes: requests
        .filter((request) => !request.isFont)
        .reduce((sum, request) => sum + request.resourceSize, 0),
      externalRequests: requests
        .filter(
          (request) => new URL(request.url).origin !== new URL(base).origin,
        )
        .map((request) => request.url),
      failedRequests: requests.filter((request) => request.statusCode >= 400),
      requests,
    };
    if (network.nonFontTransferBytes > 350000)
      thresholdFailures.push(
        `Audit-observed non-font transfer: ${network.nonFontTransferBytes} > 350000`,
      );
    if (network.externalRequests.length)
      thresholdFailures.push("External runtime requests observed");
    if (network.failedRequests.length)
      thresholdFailures.push("Failed runtime requests observed");
    const reviewAudits = Object.values(lhr.audits)
      .filter((audit) => audit.score !== null && audit.score < 1)
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        score: audit.score,
        displayValue: audit.displayValue,
        ...(audit.score === 0 && audit.details?.items?.length
          ? { details: audit.details.items.slice(0, 8) }
          : {}),
      }));
    report.results.push({
      path,
      startedAt,
      fetchedAt: lhr.fetchTime,
      lighthouseVersion: lhr.lighthouseVersion,
      userAgent: lhr.userAgent,
      settings: {
        formFactor: lhr.configSettings.formFactor,
        throttlingMethod: lhr.configSettings.throttlingMethod,
        throttling: lhr.configSettings.throttling,
        screenEmulation: lhr.configSettings.screenEmulation,
      },
      htmlSha256: routeHtmlSha256,
      assetSha256: routeAssetSha256,
      scores,
      cls,
      lcpMs: lhr.audits["largest-contentful-paint"].numericValue,
      fcpMs: lhr.audits["first-contentful-paint"].numericValue,
      totalBlockingTimeMs: lhr.audits["total-blocking-time"].numericValue,
      network,
      thresholdFailures,
      reviewAudits,
      runWarnings: lhr.runWarnings,
      fullReport,
    });
    console.log(
      JSON.stringify({
        path,
        scores,
        cls,
        nonFontTransferBytes: network.nonFontTransferBytes,
        thresholdFailures,
      }),
    );
  } catch (error) {
    report.results.push({
      path,
      startedAt,
      htmlSha256: routeHtmlSha256,
      assetSha256: routeAssetSha256,
      error: error.message,
      thresholdFailures: ["Audit failed to complete"],
    });
    console.error(JSON.stringify({ path, error: error.message }));
  } finally {
    if (chrome) await chrome.kill();
    await save();
  }
}
report.finishedAt = new Date().toISOString();
report.assetSha256AtEnd = await assetHash();
report.assetsChangedDuringAudit =
  report.assetSha256AtStart !== report.assetSha256AtEnd ||
  report.results.some(
    (result) => result.assetSha256 !== report.assetSha256AtStart,
  );
report.htmlChangedDuringAudit = (
  await Promise.all(
    requestedPaths.map(async (path) => ({
      path,
      sha256: sha256(await readFile(htmlPath(path))),
    })),
  )
)
  .filter(
    ({ path, sha256 }) =>
      sha256 !== htmlSha256AtStart[path] ||
      report.results.find((result) => result.path === path)?.htmlSha256 !==
        sha256,
  )
  .map(({ path }) => path);
report.results.sort(
  (a, b) => requestedPaths.indexOf(a.path) - requestedPaths.indexOf(b.path),
);
report.allTargetsPassed =
  !report.assetsChangedDuringAudit &&
  !report.htmlChangedDuringAudit.length &&
  report.results.length === requestedPaths.length &&
  report.results.every((result) => !result.thresholdFailures.length);
await save();
console.log(
  JSON.stringify({
    summary: join(evidenceDir, "lighthouse-summary.json"),
    fullReports: detailDir,
    allTargetsPassed: report.allTargetsPassed,
    assetsChangedDuringAudit: report.assetsChangedDuringAudit,
    htmlChangedDuringAudit: report.htmlChangedDuringAudit,
  }),
);
if (!report.allTargetsPassed) process.exitCode = 1;
