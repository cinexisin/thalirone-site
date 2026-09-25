const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const seat = (x, y) =>
  `<path d="M${x} ${y + 12}v-8q0-4 4-4h10q4 0 4 4v8M${x - 2} ${y + 8}v9h22v-9M${x + 2} ${y + 17}v3M${x + 16} ${y + 17}v3"/>`;

const speaker = (x, y) =>
  `<g transform="translate(${x} ${y})"><rect x="-8" y="-12" width="16" height="24" rx="2"/><circle r="4"/></g>`;

const controlNode = (x, y) =>
  `<g transform="translate(${x} ${y})"><rect x="-8" y="-8" width="16" height="16" rx="2"/><circle r="2.5"/></g>`;

const label = (value, x, y, className = "", anchor = "start") => {
  const lines = Array.isArray(value) ? value : [value];
  return `<text class="commercial-plan__text ${className}" x="${x}" y="${y}" text-anchor="${anchor}">${lines
    .map(
      (line, index) =>
        `<tspan x="${x}" dy="${index === 0 ? 0 : 33}">${escapeHtml(line)}</tspan>`,
    )
    .join("")}</text>`;
};

/**
 * Illustrative architecture, not a proposed installation or coverage model.
 * Required copy (all words are supplied by src/config.mjs):
 * { label, alt, mainHall, stage, foyer, adjoiningRoom, control,
 *   legend: { audio, acoustics, automation } }
 * adjoiningRoom and control may be two-line string arrays for concise labels.
 * Optional markers: a three-element array of short reference marks.
 */
export function commercialPlan(copy, { compact = false } = {}) {
  const seats = [174, 215, 256, 297, 338]
    .flatMap((y) => [88, 120, 152, 257, 289, 321].map((x) => seat(x, y)))
    .join("");
  const markers = copy.markers || [];
  const marker = (index, x, y) =>
    markers[index]
      ? `<text class="commercial-plan__marker" x="${x}" y="${y}">${escapeHtml(markers[index])}</text>`
      : "";

  return `<figure class="commercial-plan${compact ? " commercial-plan--compact" : ""}">
    <figcaption class="commercial-plan__caption">${escapeHtml(copy.label)}</figcaption>
    <svg class="commercial-plan__drawing" viewBox="0 0 680 520" width="680" height="520" role="img" aria-label="${escapeHtml(copy.alt)}" xmlns="http://www.w3.org/2000/svg">
      <title>${escapeHtml(copy.alt)}</title>
      <g class="commercial-plan__room-fill">
        <path d="M36 38h376v370H36Z"/>
        <path d="M36 408h376v80H36Z"/>
        <path d="M454 38h190v233H454Z"/>
      </g>
      <g class="commercial-plan__walls">
        <path d="M36 408V38h376v370M36 408h156m50 0h170M36 408v80h376v-80M454 38h190v233H454V174m0-44V38"/>
      </g>
      <g class="commercial-plan__door">
        <path d="M192 408v-50a50 50 0 0 1 50 50M454 130h44a44 44 0 0 1-44 44"/>
      </g>
      <path class="commercial-plan__stage" d="M84 103h280v41H84Z"/>
      ${label(copy.mainHall, 60, 80)}
      ${label(copy.stage, 224, 132, "commercial-plan__text--secondary", "middle")}
      ${label(copy.foyer, 60, 463)}
      ${label(copy.adjoiningRoom, 549, 86, "", "middle")}
      <g class="commercial-plan__seats">${seats}</g>
      <g class="commercial-plan__furniture">
        <rect x="493" y="166" width="112" height="60" rx="3"/>
        <path d="M510 158h24m27 0h24M510 234h24m27 0h24"/>
      </g>
      <g class="commercial-plan__treatment">
        <path d="M46 176v42m0 29v42m0 29v42M402 176v42m0 29v42m0 29v42M477 48h42m21 0h42"/>
      </g>
      <g class="commercial-plan__audio">
        ${speaker(62, 118)}${speaker(386, 118)}${speaker(62, 273)}${speaker(386, 273)}${speaker(379, 449)}${speaker(623, 145)}
      </g>
      <g class="commercial-plan__control-path">
        <path d="M538 366H434V250h-47M434 250V198h38M434 366v82h-95"/>
      </g>
      <g class="commercial-plan__control-nodes">
        ${controlNode(387, 250)}${controlNode(472, 198)}${controlNode(339, 448)}
      </g>
      <g class="commercial-plan__controller">
        <rect x="526" y="334" width="46" height="62" rx="3"/>
        <path d="M536 346h26m-26 10h26m-26 10h26"/>
        <circle cx="550" cy="384" r="2.5"/>
      </g>
      ${label(copy.control, 549, 434, "commercial-plan__text--secondary", "middle")}
      ${marker(0, 366, 79)}${marker(1, 600, 258)}${marker(2, 366, 480)}
    </svg>
    <ul class="commercial-plan__legend" role="list">
      <li><span class="commercial-plan__key commercial-plan__key--audio" aria-hidden="true"></span>${escapeHtml(copy.legend.audio)}</li>
      <li><span class="commercial-plan__key commercial-plan__key--acoustics" aria-hidden="true"></span>${escapeHtml(copy.legend.acoustics)}</li>
      <li><span class="commercial-plan__key commercial-plan__key--automation" aria-hidden="true"></span>${escapeHtml(copy.legend.automation)}</li>
    </ul>
  </figure>`;
}
