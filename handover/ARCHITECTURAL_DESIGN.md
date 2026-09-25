# Architectural design handover

25 September 2026 · `codex/architectural-design`

This is the design follow-up after the original `codex/ui-modernization` pull request was merged. It gives the existing Thalir identity a clearer technical and architectural presentation while retaining the original logo, contact routes and static site architecture.

## Design rationale

The site now presents three connected areas of work: homes, commercial and institutional spaces, and business software. The owner confirmed the commercial scope: **audio, PA, acoustics and building automation**, including corporate offices, hospitals, colleges, auditoriums and marriage/event halls. The existing `/commercial-audio/` route is retained and presented as **Commercial Spaces**.

The visual language uses white space, restrained green accents, precise typography, editorial service rows and explanatory diagrams. Each service has an appropriate visual: residential concepts, a commercial system plan, or an EKANI workflow. The commercial section makes the broader practice visible near the start of the home page; clear enquiry actions lead into the existing WhatsApp flow.

The commercial plan says **“Example system plan”**. It explains audio, acoustic treatment and automation together; it is not a completed installation, project proposal or engineering specification.

## Images and manufacturer marks

- Existing, previously owner-authorized concept photographs are retained with visible **“AI-generated concept”** labels and descriptive alternative text. No new residential photographs were sourced for this follow-up. These images do not document customers or completed projects.
- No authentic EKANI application screenshots were supplied or found in the inspected public sources. The **“Example workflow”** explains enquiry → lead → GST quote → invoice → recorded payment using HTML. It does not imitate an unverified product interface. See [PRODUCT_ASSET_SOURCES.md](PRODUCT_ASSET_SOURCES.md).
- Twelve authentic manufacturer marks are stored locally: ABB, Theben, Zennio, MDT, Intesis, EAE, Blumotix, SATION, INSTA, Klipsch, Jamo and Pure Acoustics. Ekinex, Denon and Epson remain plain names pending the permission required by their published terms.
- The heading remains **“Brands used in our projects”**. No partnership, endorsement or authorized-dealer status is claimed. Official provenance is not blanket reuse permission; the specific sources, conditions and transformations are recorded in [BRAND_ASSET_SOURCES.md](BRAND_ASSET_SOURCES.md).

## Maintenance

Visitor-facing copy, category membership, brand groups and enquiry messages belong in `src/config.mjs`. The four categories generate navigation, home service rows, category pages, footer links, sitemap and structured data. A fifth-category build was checked in an isolated temporary copy; see [category-extension-check.json](../evidence/architectural-design/category-extension-check.json). That check verifies generation, not the responsive visual treatment of an arbitrary future category.

To add brands supplied by the owner:

1. Add the exact manufacturer name to the appropriate config group. Without a mapping, its name renders as plain text.
2. Verify its identity, official artwork source and usage conditions. Record the source URL, retrieval date and any permission in `BRAND_ASSET_SOURCES.md`.
3. Put approved artwork in `src/assets/brands/` and add an exact-name entry to `src/brands.mjs` with its local path and aspect-ratio dimensions. Preserve original colours, proportions, attribution and clear space; check SVGs for scripts and external references.
4. Rebuild and inspect desktop/mobile presentation. Do not hotlink assets or invent substitute wordmarks.

The generator remains zero-dependency Node.js: `node build.mjs` writes `docs/` and obtains the existing public EKANI pricing feed; `node build.mjs --offline` uses the existing fallback. Edit source, then rebuild—never hand-edit generated `docs/`. Fonts, photographs and manufacturer assets are local. Small JavaScript enhancements supplement native navigation, details and direct enquiry links. CSS/JS URLs use a content hash for cache invalidation.

The live style source is `src/assets/styles.css`; the diagram modules are `src/commercial-plan.mjs` and `src/product-workflow.mjs`. Browser, screenshot and Lighthouse evidence lives in `evidence/architectural-design/`.

## Copy changes

Home positioning, category labels, commercial service/sector descriptions and enquiry prompts now reflect the owner-confirmed scope. About and applicable policy references include commercial projects. Existing fulfilment and payment terms remain the basis for those pages; this design work does not create new backend capabilities or claim certifications, project results or customer endorsements.

## Asks for Claude Code

- No backend changes are required for this design follow-up.
- Before merge, review the service copy and its references in About, Terms, Refunds and Shipping against the confirmed scope and the fulfilment/payment terms from the prior merged work. Preserve compatibility qualifications and written-quote commitments.
- Add further manufacturer names only when the owner provides them, following the source and permission workflow above.
- Replace concept or example imagery only when verified project photographs or a current, sanitized EKANI demo-account capture are provided with appropriate permission and provenance. Keep descriptions accurate to the supplied evidence.
