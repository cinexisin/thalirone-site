// Inline SVG / HTML illustrations. Drawn, not photographed: nothing here pretends
// to be a customer's home. Colours come from the Thalir logo.
const G = "#0A452D", L = "#66AB2E", Au = "#BD9329", M = "#56655C", W = "#FFFFFF";

const tag = (x, y, text, w) => `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="20" rx="10" fill="${W}" stroke="${Au}" stroke-width="1.2"/>
    <text x="${w / 2}" y="13.8" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="9.5" font-weight="600" fill="${G}">${text}</text>
  </g>`;
const bulb = (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="${L}" opacity=".18"/><circle cx="${x}" cy="${y}" r="5" fill="${L}"/>`;
const keypad = (x, y) => `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" rx="2.5" fill="${W}" stroke="${Au}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="1.8" fill="${Au}"/>`;
const ac = (x, y, w = 46) => `<rect x="${x}" y="${y}" width="${w}" height="12" rx="3" fill="${W}" stroke="${G}" stroke-width="1.6"/><text x="${x + w / 2}" y="${y + 9.2}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="7.5" font-weight="700" fill="${G}">AC</text>`;
const curtain = (x1, x2, y) => {
  let d = `M${x1} ${y}`;
  for (let x = x1; x < x2; x += 8) d += ` q2 5 4 0 q2 -5 4 0`;
  return `<path d="${d}" fill="none" stroke="${L}" stroke-width="1.8"/>`;
};
const room = (x, y, t) => `<text x="${x}" y="${y}" font-family="Montserrat, sans-serif" font-size="10" font-weight="700" letter-spacing="2" fill="${M}">${t}</text>`;

export function floorplan(title = "Example floor plan with KNX devices and group addresses") {
  return `<svg class="illo" viewBox="0 0 560 380" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg">
  <title>${title}</title>
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
  ${room(36, 48, "LIVING")}${room(36, 256, "KITCHEN · DINING")}${room(318, 48, "BEDROOM")}${room(318, 226, "HOME THEATRE")}
  ${bulb(100, 110)}${bulb(170, 110)}${bulb(135, 170)}${bulb(90, 300)}${bulb(210, 300)}${bulb(380, 110)}${bulb(470, 110)}
  ${[350, 400, 450, 500].map(x => `<circle cx="${x}" cy="262" r="3" fill="${L}"/>`).join("")}
  ${ac(210, 38)}${ac(470, 164)}
  <!-- theatre: screen, seats -->
  <path d="M340 336 H510" stroke="${G}" stroke-width="3"/>
  <rect x="370" y="286" width="110" height="20" rx="6" fill="none" stroke="${M}" stroke-width="1.5"/>
  ${keypad(92, 58)}${keypad(240, 252)}${keypad(352, 186)}${keypad(470, 340)}
  <rect x="36" y="306" width="30" height="22" rx="3" fill="${Au}"/>
  <text x="51" y="321" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="8" font-weight="800" fill="${W}">KNX</text>
  ${tag(64, 128, "1/0/1 · Living ceiling", 118)}
  ${tag(150, 58, "2/0/1 · Living AC", 100)}
  ${tag(360, 60, "3/1/0 · Bedroom curtain", 128)}
  ${tag(372, 244, "0/0/4 · Scene: Movie", 112)}
</svg>`;
}

export function speakerLayout(title = "Top view of a 7.2.4 home cinema speaker layout") {
  const spk = (x, y, t) => `<g><rect x="${x - 11}" y="${y - 8}" width="22" height="16" rx="4" fill="${G}"/><text x="${x}" y="${y + 3.4}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="7.5" font-weight="700" fill="${W}">${t}</text></g>`;
  const top = (x, y, t) => `<g><circle cx="${x}" cy="${y}" r="13" fill="none" stroke="${L}" stroke-width="2" stroke-dasharray="3 3"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="7" font-weight="700" fill="${L}">${t}</text></g>`;
  const sub = (x, y) => `<g><rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="3" fill="${Au}"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="7" font-weight="800" fill="${W}">SUB</text></g>`;
  return `<svg class="illo" viewBox="0 0 420 380" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg">
  <title>${title}</title>
  <rect x="30" y="30" width="360" height="320" rx="6" fill="${W}" stroke="${G}" stroke-width="5"/>
  <path d="M110 48 H310" stroke="${G}" stroke-width="4" stroke-linecap="round"/>
  <text x="210" y="66" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="9" font-weight="700" letter-spacing="2" fill="${M}">SCREEN</text>
  ${[1, 2, 3].map(i => `<circle cx="210" cy="222" r="${i * 26}" fill="none" stroke="${Au}" stroke-width="1" opacity="${0.55 - i * 0.12}"/>`).join("")}
  <rect x="140" y="206" width="140" height="30" rx="9" fill="${W}" stroke="${M}" stroke-width="1.6"/>
  <rect x="140" y="270" width="140" height="30" rx="9" fill="${W}" stroke="${M}" stroke-width="1.6"/>
  <circle cx="210" cy="221" r="4" fill="${Au}"/>
  ${spk(120, 80, "L")}${spk(210, 84, "C")}${spk(300, 80, "R")}
  ${spk(52, 222, "SL")}${spk(368, 222, "SR")}
  ${spk(130, 328, "SBL")}${spk(290, 328, "SBR")}
  ${sub(64, 64)}${sub(356, 64)}
  ${top(150, 150, "TFL")}${top(270, 150, "TFR")}${top(150, 262, "TRL")}${top(270, 262, "TRR")}
  <text x="210" y="372" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="10" font-weight="700" fill="${G}">7.2.4 · seven ear-level, two subs, four heights</text>
</svg>`;
}

export function ekaniFlow() {
  return `<div class="flow" role="img" aria-label="Example: a WhatsApp enquiry becomes a lead, a GST quote, an invoice and a recorded payment in EKANI">
  <div class="flow-step chat"><span class="flow-k">WhatsApp</span><p class="bubble">Hi, need a quote for 3 split ACs in Whitefield</p></div>
  <div class="flow-step"><span class="flow-k">Lead created</span><p><b>Priya S.</b> · Whitefield<br><span>Source: WhatsApp · follow up today</span></p></div>
  <div class="flow-step"><span class="flow-k">GST quote</span><p class="nums"><span>3 × split AC installation</span><span>Subtotal <b>₹42,000</b></span><span>CGST 9% ₹3,780 · SGST 9% ₹3,780</span><span>Total <b>₹49,560</b></span></p></div>
  <div class="flow-step"><span class="flow-k">Invoice</span><p>INV-0142 sent on WhatsApp<br><span>with a UPI QR to pay</span></p></div>
  <div class="flow-step paid"><span class="flow-k">Paid</span><p><b>₹49,560</b> received by UPI<br><span>recorded against the job</span></p></div>
  <p class="flow-note">Example only: the name and amounts are made up.</p>
</div>`;
}

export const ILLUSTRATIONS = { floorplan, ekaniflow: ekaniFlow, speakers: speakerLayout };

// 24×24 line icons
const I = (d) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
export const ICONS = {
  bulb: I('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3Z"/>'),
  snow: I('<path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5 4.9 17.5M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"/>'),
  curtain: I('<path d="M3 3h18M5 3v18M19 3v18M5 21c3-4 3-12 0-18M19 21c-3-4-3-12 0-18"/>'),
  spark: I('<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>'),
  globe: I('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>'),
  gate: I('<path d="M3 21V7l4-3 4 3v14M13 21V7l4-3 4 3v14M3 11h8M13 11h8M3 16h8M13 16h8"/>'),
  check: I('<path d="m5 12 4.5 4.5L19 7"/>'),
  arrow: I('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  shield: I('<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/>'),
};
export const WA_ICON = `<svg class="wa" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.7-1.2A9.4 9.4 0 1 0 12 2.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.7 7.7c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .5-.1.7l-.6.7c-.1.2-.1.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.1.6 0l.7-.6c.2-.2.5-.2.7-.1l1.9.8c.3.1.4.3.4.5v.6c0 .3 0 .6-.6.9-.6.3-1.9.6-3.6-.2-1.6-.8-3.1-2.3-3.9-3.9-.8-1.7-.5-3-.2-3.6Z" fill="currentColor"/></svg>`;

// The logo's circuit traces, reused as a divider (ring terminals + gold lines).
export const TRACE = `<svg class="trace" viewBox="0 0 320 36" aria-hidden="true"><g fill="none" stroke="${Au}" stroke-width="1.6"><path d="M10 18h90l12-12h40M310 18h-90l-12 12h-40"/><circle cx="6" cy="18" r="4"/><circle cx="314" cy="18" r="4"/><circle cx="156" cy="6" r="4"/><circle cx="164" cy="30" r="4"/></g></svg>`;
