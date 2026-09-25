const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const paths = {
  enquiry:
    '<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-3 3V11.5A7.5 7.5 0 0 1 9.5 4h3A7.5 7.5 0 0 1 20 11.5Z"/><path d="M7 10h8M7 14h5"/>',
  lead: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/>',
  quote: '<path d="M7 3h8l4 4v14H5V3h2ZM15 3v5h4M8 12h8M8 16h5"/>',
  invoice: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3ZM8 8h8M8 12h8M8 16h3"/>',
  payment:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M7 15h3M14 14l2 2 3-3"/>',
};

const icon = (kind) =>
  `<svg class="product-workflow__icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[kind] || paths.quote}</svg>`;

/**
 * A diagram of the approved workflow, not a representation of the product UI.
 * All visitor-facing words belong in src/config.mjs and are passed as:
 * {
 *   brand: string,
 *   label: string, // explicitly identifies this as an example
 *   enquiry: { label: string, message: string },
 *   steps: Array<{ kind: "lead" | "quote" | "invoice" | "payment",
 *                  title: string, detail?: string }>,
 *   summary?: string
 * }
 * The enclosing template supplies its own page/section heading.
 */
export function productWorkflow(copy, { compact = false } = {}) {
  return `<figure class="product-workflow${compact ? " product-workflow--compact" : ""}">
    <figcaption class="product-workflow__heading">
      <span class="product-workflow__brand">${escapeHtml(copy.brand)}</span>
      <span class="product-workflow__label">${escapeHtml(copy.label)}</span>
    </figcaption>
    <ol class="product-workflow__stages" role="list">
      <li class="product-workflow__enquiry">
        <div class="product-workflow__stage-label">${icon("enquiry")}<strong>${escapeHtml(copy.enquiry.label)}</strong></div>
        <p class="product-workflow__message">${escapeHtml(copy.enquiry.message)}</p>
      </li>
      ${copy.steps
        .map(
          (step) => `<li class="product-workflow__step">
        ${icon(step.kind)}
        <strong class="product-workflow__step-title">${escapeHtml(step.title)}</strong>
        ${step.detail ? `<p class="product-workflow__detail">${escapeHtml(step.detail)}</p>` : ""}
      </li>`,
        )
        .join("")}
    </ol>
    ${copy.summary ? `<p class="product-workflow__summary">${escapeHtml(copy.summary)}</p>` : ""}
  </figure>`;
}
