// Optional asset preparation only; the site build itself has zero dependencies.
// THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules node scripts/prepare-media.mjs
import { createRequire } from "node:module";
import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(
  join(process.env.THALIR_QA_MODULES, "../package.json"),
);
const sharp = require("sharp");
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, "src/assets/media");
await mkdir(out, { recursive: true });
for (const name of ["home", "cinema", "business"]) {
  const original = join(
    root,
    "evidence/image-generation",
    `${name}-concept.png`,
  );
  for (const width of [480, 768, 1200, 1536]) {
    for (const format of ["avif", "webp"]) {
      const path = join(out, `${name}-concept-${width}.${format}`);
      await sharp(original)
        .resize({ width })
        .toFormat(format, { quality: format === "avif" ? 48 : 76, effort: 6 })
        .toFile(path);
      console.log(name, width, format, (await stat(path)).size);
    }
  }
}
