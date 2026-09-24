import { DRAWING } from "./config.mjs";
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
// Inline SVG / HTML illustrations. Drawn, not photographed: nothing here pretends
// to be a customer's home. Colours come from the Thalir logo.
const G = "#0A452D",
  L = "#66AB2E",
  Au = "#BD9329",
  M = "#56655C",
  W = "#FFFFFF";

const tag = (x, y, text, w) => `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="20" rx="10" fill="${W}" stroke="${Au}" stroke-width="1.2"/>
    <text x="${w / 2}" y="13.8" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="9.5" font-weight="600" fill="${G}">${text}</text>
  </g>`;
const bulb = (x, y) =>
  `<circle cx="${x}" cy="${y}" r="11" fill="${L}" opacity=".18"/><circle cx="${x}" cy="${y}" r="5" fill="${L}"/>`;
const keypad = (x, y) =>
  `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" rx="2.5" fill="${W}" stroke="${Au}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="1.8" fill="${Au}"/>`;
const ac = (x, y, w = 46) =>
  `<rect x="${x}" y="${y}" width="${w}" height="12" rx="3" fill="${W}" stroke="${G}" stroke-width="1.6"/><text x="${x + w / 2}" y="${y + 9.2}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="7.5" font-weight="700" fill="${G}">${esc(DRAWING.ac)}</text>`;
const curtain = (x1, x2, y) => {
  let d = `M${x1} ${y}`;
  for (let x = x1; x < x2; x += 8) d += ` q2 5 4 0 q2 -5 4 0`;
  return `<path d="${d}" fill="none" stroke="${L}" stroke-width="1.8"/>`;
};
const room = (x, y, t) =>
  `<text x="${x}" y="${y}" font-family="Montserrat, sans-serif" font-size="10" font-weight="700" letter-spacing="2" fill="${M}">${t}</text>`;

export function floorplan(title = DRAWING.floorplanTitle) {
  return `<svg class="illo" viewBox="0 0 560 380" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">
  <title>${esc(title)}</title>
  <rect x="20" y="20" width="520" height="340" rx="4" fill="${W}"/>
  <!-- KNX bus -->
  <path d="M58 318 H240 V252 M240 318 H316 V186 H352 M316 318 H470 V340 M58 318 V58 H92" fill="none" stroke="${Au}" stroke-width="1.6" stroke-dasharray="5 4"/>
  <!-- walls -->
  <g fill="none" stroke="${G}" stroke-width="6" stroke-linecap="square">
    <path d="M20 20 H540 V360 H20 Z"/>
    <path d="M300 20 V150 M300 190 V360"/>
    <path d="M300 200 H420 M462 200 H540"/>
    <path d="M20 232 H150 M196 232 H300"/>
  </g>
  <!-- windows with curtains -->
  <rect x="70" y="16" width="130" height="8" fill="${W}"/>${curtain(70, 198, 20)}
  <rect x="360" y="16" width="120" height="8" fill="${W}"/>${curtain(360, 478, 20)}
  ${room(36, 48, DRAWING.living)}${room(36, 256, DRAWING.kitchen)}${room(318, 48, DRAWING.bedroom)}${room(318, 226, DRAWING.cinema)}
  ${bulb(100, 110)}${bulb(170, 110)}${bulb(135, 170)}${bulb(90, 300)}${bulb(210, 300)}${bulb(380, 110)}${bulb(470, 110)}
  ${[350, 400, 450, 500].map((x) => `<circle cx="${x}" cy="262" r="3" fill="${L}"/>`).join("")}
  ${ac(210, 38)}${ac(470, 164)}
  <!-- theatre: screen, seats -->
  <path d="M340 336 H510" stroke="${G}" stroke-width="3"/>
  <rect x="370" y="286" width="110" height="20" rx="6" fill="none" stroke="${M}" stroke-width="1.5"/>
  ${keypad(92, 58)}${keypad(240, 252)}${keypad(352, 186)}${keypad(470, 340)}
  <rect x="36" y="306" width="30" height="22" rx="3" fill="${Au}"/>
  <text x="51" y="321" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="8" font-weight="800" fill="${W}">${esc(DRAWING.knx)}</text>
  ${tag(64, 128, DRAWING.livingLight, 118)}
  ${tag(150, 58, DRAWING.livingAC, 100)}
  ${tag(360, 60, DRAWING.bedroomCurtain, 128)}
  ${tag(372, 244, DRAWING.movie, 112)}
</svg>`;
}

export function speakerLayout(title = DRAWING.speakersTitle) {
  const spk = (x, y, t) =>
    `<g><rect x="${x - 11}" y="${y - 8}" width="22" height="16" rx="4" fill="${G}"/><text x="${x}" y="${y + 3.4}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="7.5" font-weight="700" fill="${W}">${t}</text></g>`;
  const top = (x, y, t) =>
    `<g><circle cx="${x}" cy="${y}" r="13" fill="none" stroke="${L}" stroke-width="2" stroke-dasharray="3 3"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="7" font-weight="700" fill="${L}">${t}</text></g>`;
  const sub = (x, y) =>
    `<g><rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="3" fill="${Au}"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="7" font-weight="800" fill="${W}">${esc(DRAWING.sub)}</text></g>`;
  return `<svg class="illo" viewBox="0 0 420 380" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">
  <title>${esc(title)}</title>
  <rect x="30" y="30" width="360" height="320" rx="6" fill="${W}" stroke="${G}" stroke-width="5"/>
  <path d="M110 48 H310" stroke="${G}" stroke-width="4" stroke-linecap="round"/>
  <text x="210" y="66" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="9" font-weight="700" letter-spacing="2" fill="${M}">${esc(DRAWING.screen)}</text>
  ${[1, 2, 3].map((i) => `<circle cx="210" cy="222" r="${i * 26}" fill="none" stroke="${Au}" stroke-width="1" opacity="${0.55 - i * 0.12}"/>`).join("")}
  <rect x="140" y="206" width="140" height="30" rx="9" fill="${W}" stroke="${M}" stroke-width="1.6"/>
  <rect x="140" y="270" width="140" height="30" rx="9" fill="${W}" stroke="${M}" stroke-width="1.6"/>
  <circle cx="210" cy="221" r="4" fill="${Au}"/>
  ${spk(120, 80, "L")}${spk(210, 84, "C")}${spk(300, 80, "R")}
  ${spk(52, 222, "SL")}${spk(368, 222, "SR")}
  ${spk(130, 328, "SBL")}${spk(290, 328, "SBR")}
  ${sub(64, 64)}${sub(356, 64)}
  ${top(150, 150, "TFL")}${top(270, 150, "TFR")}${top(150, 262, "TRL")}${top(270, 262, "TRR")}
  <text x="210" y="372" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="10" font-weight="700" fill="${G}">${esc(DRAWING.speakerLegend)}</text>
</svg>`;
}

export function ekaniFlow() {
  return `<div class="flow" role="img" aria-label="${esc(DRAWING.flowLabel)}">
  <div class="flow-step chat"><span class="flow-k">${esc(DRAWING.flowChat)}</span><p class="bubble">${esc(DRAWING.flowEnquiry)}</p></div>
  <div class="flow-step"><span class="flow-k">${esc(DRAWING.flowLead)}</span><p><b>${esc(DRAWING.flowName)}</b> · ${esc(DRAWING.flowArea)}<br><span>${esc(DRAWING.flowSource)}</span></p></div>
  <div class="flow-step"><span class="flow-k">${esc(DRAWING.flowQuote)}</span><p class="nums"><span>${esc(DRAWING.flowItem)}</span><span>${esc(DRAWING.flowSubtotal)} <b>${esc(DRAWING.flowSubtotalAmount)}</b></span><span>${esc(DRAWING.flowTax)}</span><span>${esc(DRAWING.flowTotal)} <b>${esc(DRAWING.flowTotalAmount)}</b></span></p></div>
  <div class="flow-step"><span class="flow-k">${esc(DRAWING.flowInvoice)}</span><p>${esc(DRAWING.flowInvoiceSent)}<br><span>${esc(DRAWING.flowUPI)}</span></p></div>
  <div class="flow-step paid"><span class="flow-k">${esc(DRAWING.flowPaid)}</span><p><b>${esc(DRAWING.flowTotalAmount)}</b> ${esc(DRAWING.flowReceived)}<br><span>${esc(DRAWING.flowRecorded)}</span></p></div>
  <p class="flow-note">${esc(DRAWING.flowNote)}</p>
</div>`;
}

export function revivalSheet() {
  const rows = DRAWING.revivalRows;
  return `<div class="sheet" role="img" aria-label="${esc(DRAWING.revivalLabel)}">
  <div class="sheet-head"><span class="flow-k">${esc(DRAWING.revivalTitle)}</span><span class="sheet-no">${esc(DRAWING.example)}</span></div>
  <ol>${rows.map(([k, v]) => `<li><span class="box" aria-hidden="true"></span><div><b>${esc(k)}</b><span>${esc(v)}</span></div></li>`).join("")}</ol>
  <p class="flow-note">${esc(DRAWING.revivalNote)}</p>
</div>`;
}

export const ILLUSTRATIONS = {
  floorplan,
  ekaniflow: ekaniFlow,
  speakers: speakerLayout,
  revival: revivalSheet,
};

// 24×24 line icons
const I = (d) =>
  `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
export const ICONS = {
  bulb: I(
    '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3Z"/>',
  ),
  snow: I(
    '<path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5 4.9 17.5M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"/>',
  ),
  curtain: I(
    '<path d="M3 3h18M5 3v18M19 3v18M5 21c3-4 3-12 0-18M19 21c-3-4-3-12 0-18"/>',
  ),
  spark: I(
    '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
  ),
  globe: I(
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>',
  ),
  gate: I(
    '<path d="M3 21V7l4-3 4 3v14M13 21V7l4-3 4 3v14M3 11h8M13 11h8M3 16h8M13 16h8"/>',
  ),
  check: I('<path d="m5 12 4.5 4.5L19 7"/>'),
  chat: I('<path d="M4 5h16v10H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/>'),
  dial: I(
    '<circle cx="12" cy="12" r="8"/><path d="M12 12l4-3M12 4v2M20 12h-2M12 20v-2M4 12h2"/>',
  ),
  air: I('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),
  remote: I(
    '<rect x="8" y="2.5" width="8" height="19" rx="2.5"/><circle cx="12" cy="7" r="1.6"/><path d="M10.5 12h3M10.5 15h3M10.5 18h3"/>',
  ),
  plan: I('<path d="M4 4h16v16H4z"/><path d="M4 12h7V4M11 12v8M15 12h5"/>'),
  arrow: I('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  shield: I(
    '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
  ),
};
export const WA_ICON = `<svg class="wa" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.7-1.2A9.4 9.4 0 1 0 12 2.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.7 7.7c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .5-.1.7l-.6.7c-.1.2-.1.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.1.6 0l.7-.6c.2-.2.5-.2.7-.1l1.9.8c.3.1.4.3.4.5v.6c0 .3 0 .6-.6.9-.6.3-1.9.6-3.6-.2-1.6-.8-3.1-2.3-3.9-3.9-.8-1.7-.5-3-.2-3.6Z" fill="currentColor"/></svg>`;

// The logo's circuit traces, reused as a divider (ring terminals + gold lines).
export const TRACE = `<svg class="trace" viewBox="0 0 320 36" aria-hidden="true"><g fill="none" stroke="${Au}" stroke-width="1.6"><path d="M10 18h90l12-12h40M310 18h-90l-12 12h-40"/><circle cx="6" cy="18" r="4"/><circle cx="314" cy="18" r="4"/><circle cx="156" cy="6" r="4"/><circle cx="164" cy="30" r="4"/></g></svg>`;

// A schematic, never a photograph of an installation. All labels come from config.
export function chatRoom(label) {
  return `<svg class="room-drawing" viewBox="0 0 480 250" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 175 230 228 444 164 252 113Z" fill="#F6F5EE" stroke="#BD9329" stroke-width="1.5"/>
    <path d="M40 175V56L252 15v98L230 228Z" fill="#FFFFFF"/>
    <path d="M252 15 444 65v99l-192-51Z" fill="#F0F2E9"/>
    <g stroke="#0A452D" stroke-width="1.8" fill="none" stroke-linejoin="round">
      <path d="M40 175V56L252 15 444 65v99M252 15v98M40 175l190 53 214-64"/>
      <path d="m72 69 91-18v57l-91 19Z" fill="#F6F5EE"/><path d="m117 60 0 57M72 98l91-17"/>
      <path d="m317 52 87 23v19l-87-23Z" fill="#fff"/><path d="m325 65 70 18"/>
      <path d="m77 145 25-10 110 31v29l-135-36Z" fill="#DDE5D5"/>
      <path d="m77 145 0 29 132 37 24-11v-29l-21-5M98 154l1 25 110 32M143 169v21M189 181v22"/>
      <path d="m252 168 46-15 50 14-47 17Z" fill="#fff"/><path d="m252 168v12l49 15 47-17v-11M301 184v11"/>
      <path d="m391 135 0 38m-13 5 26-8"/>
      <path d="m379 112-12 30 50-14-21-20Z" fill="#fff"/>
    </g>
    <g class="room-light" fill="#EFD68A"><ellipse cx="119" cy="141" rx="36" ry="11" opacity=".35"/><ellipse cx="217" cy="161" rx="32" ry="11" opacity=".35"/><ellipse cx="388" cy="161" rx="29" ry="10" opacity=".35"/></g>
    <g stroke="#86660F" stroke-width="1.5"><path d="M119 55v29M217 37v54" fill="none"/><path d="m107 97 12-13 12 13Z" class="room-light" fill="#EFD68A"/><path d="m205 104 12-13 12 13Z" class="room-light" fill="#EFD68A"/></g>
    <g fill="none" stroke="#BD9329" stroke-width="1.3"><path d="M15 195h40l19 17h32M327 218h42l25-20h52"/><circle cx="11" cy="195" r="4"/><circle cx="111" cy="212" r="4"/><circle cx="450" cy="198" r="4"/></g>
  </svg>`;
}
