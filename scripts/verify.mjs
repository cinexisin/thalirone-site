// Zero-dependency checks. Run after node build.mjs (live or offline).
import assert from "node:assert/strict";
import {
  readFile,
  readdir,
  mkdtemp,
  cp,
  appendFile,
  rm,
} from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { SITE, CATEGORIES, UI } from "../src/config.mjs";
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (p) => readFile(join(root, p), "utf8");
const git = (...args) => execFileSync("git", args, { cwd: root });
const baseline = await import(
  `data:text/javascript;base64,${git("show", "origin/main:src/config.mjs").toString("base64")}`
);
assert.deepEqual(SITE, baseline.SITE, "Site facts must remain unchanged");
assert.deepEqual(
  CATEGORIES.map((c) => {
    const copy = structuredClone(c);
    delete copy.cta.shortLabel;
    return copy;
  }),
  baseline.CATEGORIES,
  "Category claims and enquiry messages must remain unchanged",
);
assert.equal(await read("docs/CNAME"), "thalirone.com\n");
assert.equal(
  git("branch", "--show-current").toString().trim(),
  "codex/ui-modernization",
);
assert.equal(
  gzipSync(await read("src/assets/main.js")).length < 15360,
  true,
  "Client JS budget",
);
const paths = [
  "index.html",
  ...CATEGORIES.map((c) => `${c.slug}/index.html`),
  "contact/index.html",
  "privacy/index.html",
  "404.html",
];
const allowedMessages = new Set([
  UI.generalEnquiry,
  ...CATEGORIES.map((c) => c.cta.wa),
]);
let waCount = 0;
for (const p of paths) {
  const html = await read("docs/" + p);
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    p + " must have one h1",
  );
  assert.ok(html.includes('rel="canonical"'), p + " canonical");
  assert.ok(html.includes('property="og:image"'), p + " OG");
  assert.ok(
    html.includes('"areaServed":[{"@type":"State","name":"Karnataka"}'),
    p + " Organization",
  );
  assert.equal(
    /(?:src|href)="https:\/\/(?:fonts\.|.*\.js)/.test(html),
    false,
    "No remote fonts/scripts",
  );
  for (const [, href] of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)) {
    const url = new URL(href.replaceAll("&amp;", "&"));
    assert.equal(url.pathname, "/919513636657");
    assert.ok(allowedMessages.has(url.searchParams.get("text")));
    waCount++;
  }
  for (const c of CATEGORIES) assert.ok(html.includes(`href="/${c.slug}/"`));
}
for (const file of git(
  "ls-tree",
  "-r",
  "--name-only",
  "origin/main",
  "src/assets/img",
)
  .toString()
  .trim()
  .split("\n")) {
  assert.deepEqual(
    await readFile(join(root, file)),
    git("show", `origin/main:${file}`),
    "Original image changed: " + file,
  );
}
async function assetCheck(src, dst) {
  for (const item of await readdir(src, { withFileTypes: true })) {
    if (item.isDirectory())
      await assetCheck(join(src, item.name), join(dst, item.name));
    else
      assert.deepEqual(
        await readFile(join(src, item.name)),
        await readFile(join(dst, item.name)),
        "Generated asset mismatch",
      );
  }
}
await assetCheck(join(root, "src/assets"), join(root, "docs/assets"));
// Demonstrate a fourth category in a separate, disposable copy, with no template edits.
const temp = await mkdtemp(join(tmpdir(), "thalir-category-"));
try {
  await cp(join(root, "src"), join(temp, "src"), { recursive: true });
  await cp(join(root, "build.mjs"), join(temp, "build.mjs"));
  await appendFile(
    join(temp, "src/config.mjs"),
    '\nCATEGORIES.push({...structuredClone(CATEGORIES[0]),slug:"example-category",name:"Example category"});\n',
  );
  execFileSync(process.execPath, [join(temp, "build.mjs"), "--offline"], {
    stdio: "pipe",
  });
  const home = await readFile(join(temp, "docs/index.html"), "utf8");
  assert.ok(home.includes("Example category"));
  assert.ok(home.includes('href="/example-category/"'));
  assert.ok(/<nav[\s\S]*?href="\/example-category\/"/.test(home));
  assert.ok(/<article class="cat">[\s\S]*?Example category/.test(home));
  assert.ok(/<footer[\s\S]*?href="\/example-category\/"/.test(home));
  assert.ok(
    (
      await readFile(join(temp, "docs/example-category/index.html"), "utf8")
    ).includes("<h1>"),
  );
  assert.ok(
    (await readFile(join(temp, "docs/sitemap.xml"), "utf8")).includes(
      "/example-category/",
    ),
  );
} finally {
  await rm(temp, { recursive: true, force: true });
}
console.log(
  JSON.stringify(
    {
      pages: paths.length,
      whatsappLinks: waCount,
      originalClaims: "unchanged",
      originalImages: "unchanged",
      clientGzipBytes: gzipSync(await read("src/assets/main.js")).length,
      fourthCategory:
        "nav, card, footer, page and sitemap passed in throwaway build",
      generatedAssets: "match source",
    },
    null,
    2,
  ),
);
