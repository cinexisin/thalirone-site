# Photographic concept imagery

The owner's latest direction on 24 September 2026 was: “i want natural looking images , not like cartoons, with real people kind of”. This supersedes the earlier illustration-only choice for this task. It is a scoped exception to AGENTS.md rule 7 and the brief's drawing-only requirement; all other hard rules remain in force. AGENTS.md itself has not been rewritten.

The built-in `image_gen` tool produced these three fictional photographic concepts. They do not depict actual customers, employees or completed Thalir projects. No testimonial or product screenshot is implied. Every placement visibly says **AI-generated concept**, and image alt text repeats that provenance.

- `home-concept.png`: a couple using a phone in a naturally lit living room.
- `cinema-concept.png`: two people watching a film in a private cinema.
- `business-concept.png`: two people working with a phone and laptop.
- `prompts.json`: exact final prompt set and generation mode.

Original PNGs are retained here, outside the deployed site. Responsive AVIF and WebP derivatives live in `src/assets/media/`, at 480, 768, 1200 and 1536 pixels wide. `src/scenes.mjs` emits semantic picture elements with explicit dimensions, responsive sizes, priority hero loading, native lazy loading for later sections and visible provenance. Existing technical SVG diagrams remain in `src/illustrations.mjs`.

Optional regeneration of web derivatives (Sharp installed outside the repository):

```sh
THALIR_QA_MODULES=/tmp/thalirone-qa/node_modules node scripts/prepare-media.mjs
node build.mjs
```

Image preparation is separate from the zero-dependency site build. No image-generation service is called at runtime.
