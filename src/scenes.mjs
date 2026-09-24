// Original vector artwork for the public site: illustrative concepts, never project photographs.
import { ART_COPY, DRAWING } from "./config.mjs";
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
let count = 0;
const svg = (kind, label, drawing) => {
  const id = `scene-${kind}-${++count}`;
  return `<svg class="scene scene-${kind}" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><title>${esc(label)}</title>${drawing(id)}</svg>`;
};
const leaf = (x, y, r, fill, angle = 0) =>
  `<ellipse cx="${x}" cy="${y}" rx="${r * 0.42}" ry="${r}" fill="${fill}" transform="rotate(${angle} ${x} ${y})"/>`;
const plant = (x, y, scale = 1) =>
  `<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cx="0" cy="21" rx="49" ry="13" fill="#183c2422"/><path d="M-32-24H32L25 23Q0 37-25 23Z" fill="#cbb991"/><ellipse cy="-24" rx="32" ry="10" fill="#e2d7bd"/><path d="M0-23V-138M0-75l-29-32M0-99l31-42" stroke="#476448" stroke-width="3" fill="none"/>${leaf(-21, -111, 29, "#577d4e", -40)}${leaf(17, -143, 32, "#759359", 24)}${leaf(-9, -161, 25, "#426746", -12)}${leaf(29, -102, 31, "#436c42", 47)}${leaf(-28, -68, 30, "#78975b", -66)}${leaf(14, -67, 26, "#93a575", 48)}</g>`;

export const livingScene = (label = ART_COPY.homeAlt) =>
  svg(
    "home",
    label,
    (id) => `
<defs>
 <linearGradient id="${id}-wall" x2="0" y2="1"><stop stop-color="#ede8da"/><stop offset="1" stop-color="#d9d2ba"/></linearGradient>
 <linearGradient id="${id}-floor" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5efdd"/><stop offset="1" stop-color="#cabb95"/></linearGradient>
 <linearGradient id="${id}-glass" x2="1" y2="1"><stop stop-color="#dce7d6"/><stop offset=".6" stop-color="#e9eedf"/><stop offset="1" stop-color="#c4d4ba"/></linearGradient>
 <linearGradient id="${id}-sofa" x2="0" y2="1"><stop stop-color="#91a587"/><stop offset="1" stop-color="#5e795d"/></linearGradient>
 <linearGradient id="${id}-curtain" x2="1"><stop stop-color="#faf6e8"/><stop offset=".55" stop-color="#d6cfb5"/><stop offset="1" stop-color="#eee7d3"/></linearGradient>
 <linearGradient id="${id}-console" x2="0" y2="1"><stop stop-color="#ae8f59"/><stop offset="1" stop-color="#856737"/></linearGradient>
 <radialGradient id="${id}-glow"><stop stop-color="#fff6c6" stop-opacity=".85"/><stop offset="1" stop-color="#fff6c6" stop-opacity="0"/></radialGradient>
 <pattern id="${id}-slats" width="15" height="300" patternUnits="userSpaceOnUse"><rect width="15" height="300" fill="#56715a"/><rect width="3" height="300" fill="#3e5e48" opacity=".7"/><rect x="4" width="1" height="300" fill="#96a07a" opacity=".6"/></pattern>
</defs>
<!-- Warm limestone architecture; receding floor and a planted courtyard. -->
<rect width="1200" height="760" fill="#e9e5d6"/>
<path d="M0 0H1200L943 170H275Z" fill="#f7f3e7"/>
<path d="M0 0 275 170V503L0 760Z" fill="#e0dccb"/>
<path d="M275 170H943V503H275Z" fill="url(#${id}-wall)"/>
<path d="M943 170 1200 0V760L943 503Z" fill="#d8d7c6"/>
<path d="M275 503H943L1200 760H0Z" fill="url(#${id}-floor)"/>
<g stroke="#b9ab85" stroke-width="1" opacity=".4"><path d="M325 503 93 760M465 503 350 760M608 503 605 760M745 503 861 760M886 503 1114 760"/><path d="M238 539H980M174 600H1040M91 678H1127"/></g>
<path d="M23 126 245 223V473L23 649Z" fill="url(#${id}-glass)"/>
<path d="M29 551 70 528 82 339 106 339 130 524 151 500 163 315 180 315 203 463 240 435V480L29 645Z" fill="#b8c9a5"/>
<g fill="#73916a" opacity=".72"><ellipse cx="92" cy="350" rx="56" ry="104"/><ellipse cx="171" cy="306" rx="49" ry="78"/><ellipse cx="52" cy="440" rx="32" ry="78"/></g>
<path d="M23 126 245 223V473L23 649Z" fill="none" stroke="#48644c" stroke-width="6"/>
<g stroke="#48644c" stroke-width="5"><path d="M95 158V592M175 193V529"/></g>
<path d="M30 173 81 195V577L30 618ZM102 206 164 233V515L102 562Z" fill="#f9fff4" opacity=".16"/>
<!-- Drawn curtains, with visibly illustrated folds. -->
<path d="M242 205 289 219V512L241 532Z" fill="url(#${id}-curtain)"/>
<g stroke="#bfb69a" stroke-width="2" opacity=".65"><path d="M250 210V526M263 214V521M276 218V516"/></g>
<path d="M14 112 249 211" stroke="#776d50" stroke-width="5"/>
<!-- Paneled feature wall and a quiet abstract canvas. -->
<rect x="697" y="202" width="246" height="301" fill="url(#${id}-slats)"/>
<rect x="363" y="229" width="222" height="185" fill="#ded3b8" stroke="#b19e72" stroke-width="6"/>
<rect x="373" y="239" width="202" height="165" fill="#f8f1dc"/>
<path d="M373 358Q438 234 512 333T575 311V404H373Z" fill="#bbad7b"/><path d="M373 380Q451 292 513 383T575 345V404H373Z" fill="#6d8a65"/><circle cx="514" cy="280" r="25" fill="#d7b255"/>
<rect x="563" y="185" width="145" height="29" rx="7" fill="#f8f7ee" stroke="#d2cdbb"/><path d="M574 206H697" stroke="#9ca28b" stroke-width="2"/><circle cx="692" cy="195" r="2" fill="#668551"/>
<!-- Floating timber console and small ceramics. -->
<path d="M690 457 947 457 989 498H722Z" fill="#ccb17b"/>
<path d="M722 498H989V548H722Z" fill="url(#${id}-console)"/>
<path d="M690 457 722 498V548L690 506Z" fill="#aa8956"/>
<g stroke="#765a31"><path d="M802 498V548M893 498V548"/></g>
<path d="M805 430Q796 451 810 458H829Q842 450 832 430Z" fill="#e6ddc4"/><ellipse cx="818" cy="430" rx="13" ry="5" fill="#c7bda2"/><rect x="861" y="442" width="52" height="8" fill="#e4d5aa"/><rect x="869" y="433" width="44" height="9" fill="#f6efdd"/>
<!-- Recessed lighting and three visible pools of warm light. -->
<path d="M265 163H949" stroke="#fff5c6" stroke-width="5" class="room-light"/>
<g class="room-light"><ellipse cx="408" cy="147" rx="23" ry="5" fill="#fff9d8"/><ellipse cx="749" cy="146" rx="23" ry="5" fill="#fff9d8"/><ellipse cx="581" cy="538" rx="205" ry="64" fill="url(#${id}-glow)"/></g>
<!-- Woven rug, upholstered modular sofa and cushions. -->
<path d="M278 544 703 527 934 711 367 746 158 629Z" fill="#f3efe2" stroke="#d5caae" stroke-width="2"/>
<g stroke="#d8ceb6" stroke-width="1" opacity=".6">${Array.from({ length: 12 }, (_, i) => `<path d="M${189 + i * 14} ${617 + i * 9} ${699 + i * 17} ${538 + i * 14}"/>`).join("")}</g>
<ellipse cx="408" cy="652" rx="245" ry="56" fill="#2f48361a"/>
<path d="M126 453Q126 427 153 428L415 479Q441 484 442 512L461 623 187 604 126 551Z" fill="#738c6d"/>
<path d="M134 450 178 459 187 565 147 553Z" fill="#9bab8e"/>
<path d="M173 465 384 505Q403 509 405 530L405 579 192 551Z" fill="url(#${id}-sofa)"/>
<path d="M185 550 405 579 482 626 247 629 184 607Z" fill="#b1bda0"/>
<path d="M247 629 482 626V676L247 678Z" fill="#708867"/>
<path d="M184 607 247 629V678L177 650 150 594Z" fill="#607b5b"/>
<path d="M404 574 446 572Q457 574 464 595L499 635Q505 652 491 660L473 661 440 618Z" fill="#7e9774"/>
<path d="M157 550 185 548 250 600 242 640 208 640 156 596Q140 581 144 565Z" fill="#8fa584"/>
<path d="M258 494 317 506 335 561 276 553Z" fill="#e6dfc8"/><path d="M274 500 280 549" stroke="#c4b99b" stroke-width="2"/>
<path d="M340 511 386 520 396 575 349 566Z" fill="#c3a766"/>
<path d="M268 677V690M464 675V684M180 650V666" stroke="#46553b" stroke-width="7"/>
<!-- Two sculptural coffee tables. -->
<ellipse cx="608" cy="633" rx="105" ry="41" fill="#73634819"/>
<path d="M530 579 535 631Q606 661 679 628L686 579Z" fill="#a8905c"/>
<ellipse cx="608" cy="579" rx="78" ry="31" fill="#d6c49b"/><ellipse cx="608" cy="575" rx="78" ry="29" fill="#ede3c6"/>
<path d="M646 641V684M715 638V678" stroke="#746749" stroke-width="9"/>
<ellipse cx="680" cy="636" rx="64" ry="24" fill="#8b7953"/><ellipse cx="680" cy="631" rx="64" ry="24" fill="#bbab7e"/>
<path d="M572 568 606 560 632 568 598 577Z" fill="#52765d"/><path d="M572 568v6l26 9 34-9v-6l-34 9Z" fill="#d5ceb6"/>
<path d="M633 545Q625 568 635 575H655Q665 569 655 545Z" fill="#eee8d8"/>
<!-- Floor lamp, side chair and plants provide depth. -->
<ellipse cx="1009" cy="622" rx="66" ry="19" fill="#536c481a"/>
<path d="M969 485Q969 457 996 462L1062 492Q1080 500 1078 528L1067 591 994 557Z" fill="#d6c6a2"/>
<path d="M992 553 1067 583 1032 627 958 590Z" fill="#e4d7b9"/><path d="M958 590v24l74 32 0-19Z" fill="#baaa85"/>
<path d="M977 620 969 653M1050 613l2 28" stroke="#596349" stroke-width="8"/>
<path d="M857 362V505" stroke="#a18746" stroke-width="5"/><ellipse cx="857" cy="511" rx="29" ry="8" fill="#a18746"/>
<path d="M828 318H880L899 367H810Z" fill="#efe5c9"/><ellipse cx="855" cy="366" rx="45" ry="10" fill="#fcf0ba" class="room-light"/>
${plant(1073, 464, 0.8)}${plant(328, 505, 0.65)}
<!-- Fine architectural framing, not a photograph. -->
<path d="M0 0H1200V760H0Z" fill="none" stroke="#e5dfcc" stroke-width="2"/>
`,
  );

export const cinemaScene = (label = ART_COPY.cinemaAlt) =>
  svg(
    "cinema",
    label,
    (id) => `
<defs>
 <linearGradient id="${id}-wall" x2="0" y2="1"><stop stop-color="#ece5d4"/><stop offset="1" stop-color="#b5af94"/></linearGradient>
 <linearGradient id="${id}-floor" x2="0" y2="1"><stop stop-color="#a0a787"/><stop offset="1" stop-color="#d7cfb6"/></linearGradient>
 <linearGradient id="${id}-seat" x2="0" y2="1"><stop stop-color="#667f63"/><stop offset=".45" stop-color="#385c46"/><stop offset="1" stop-color="#244735"/></linearGradient>
 <linearGradient id="${id}-screen" x2="1" y2="1"><stop stop-color="#d6e0c6"/><stop offset="1" stop-color="#f3e6bb"/></linearGradient>
 <radialGradient id="${id}-beam"><stop stop-color="#fff8d0" stop-opacity=".3"/><stop offset="1" stop-color="#fff8d0" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="760" fill="#e9e2d0"/>
<path d="M0 0H1200L936 147H264Z" fill="#f3edde"/>
<path d="M264 147H936V488H264Z" fill="url(#${id}-wall)"/>
<path d="M0 0 264 147V488L0 760Z" fill="#c6c9b0"/>
<path d="M936 147 1200 0V760L936 488Z" fill="#bbc3a8"/>
<path d="M264 488H936L1200 760H0Z" fill="url(#${id}-floor)"/>
<!-- Absorber panels and restrained cove lighting. -->
${[0, 1, 2].map((i) => `<path d="M${28 + i * 76} ${114 + i * 41} ${76 + i * 64} ${141 + i * 33}V${560 - i * 42}L${28 + i * 76} ${612 - i * 39}Z" fill="${i % 2 ? "#698167" : "#849579"}"/><path d="M${1172 - i * 76} ${114 + i * 41} ${1124 - i * 64} ${141 + i * 33}V${560 - i * 42}L${1172 - i * 76} ${612 - i * 39}Z" fill="${i % 2 ? "#698167" : "#849579"}"/>`).join("")}
<path d="M22 34 272 166H928L1178 34" fill="none" stroke="#eee1a7" stroke-width="5"/>
<path d="M262 478H938" stroke="#e6d399" stroke-width="5"/>
<!-- The abstract image on the screen is deliberately drawn. -->
<rect x="322" y="196" width="556" height="245" rx="3" fill="#284232"/>
<rect x="334" y="208" width="532" height="221" fill="url(#${id}-screen)"/>
<circle cx="704" cy="274" r="44" fill="#d7b866"/>
<path d="M334 378 428 268 494 345 576 291 678 394 748 316 866 396V429H334Z" fill="#829776"/><path d="M334 418 470 345 594 407 690 366 866 412V429H334Z" fill="#526f55"/>
<path d="M560 0 318 440H886L640 0Z" fill="url(#${id}-beam)"/>
<rect x="538" y="83" width="124" height="38" rx="8" fill="#ddd6bf"/><rect x="569" y="95" width="69" height="20" rx="5" fill="#455b42"/><circle cx="610" cy="105" r="7" fill="#94a58b"/>
<!-- Speakers: repeated architectural objects, no invented measurement data. -->
${[281, 891].map((x) => `<rect x="${x}" y="307" width="29" height="150" rx="4" fill="#244431"/><circle cx="${x + 14.5}" cy="333" r="7" fill="#75826b"/><circle cx="${x + 14.5}" cy="373" r="10" fill="#4e6950"/><circle cx="${x + 14.5}" cy="417" r="10" fill="#4e6950"/>`).join("")}
<rect x="527" y="458" width="146" height="24" rx="5" fill="#284633"/>
<rect x="325" y="467" width="52" height="49" rx="5" fill="#425e43"/><circle cx="351" cy="491" r="16" fill="#253f2d"/>
<rect x="823" y="467" width="52" height="49" rx="5" fill="#425e43"/><circle cx="849" cy="491" r="16" fill="#253f2d"/>
<!-- Tiered seating: plush, dimensional forms rendered entirely in vectors. -->
<path d="M174 642H1026L1110 717H88Z" fill="#a4ad8c"/><path d="M88 717H1110V741H88Z" fill="#879776"/>
${[0, 1]
  .map((row) =>
    [0, 1, 2]
      .map((col) => {
        let x = 340 + col * 193 - row * 45,
          y = 480 + row * 123,
          k = row ? 1.22 : 1;
        return `<g transform="translate(${x} ${y}) scale(${k})"><ellipse cx="65" cy="112" rx="93" ry="20" fill="#203e2c22"/><rect x="1" y="4" width="129" height="95" rx="24" fill="url(#${id}-seat)"/><rect x="10" y="11" width="111" height="57" rx="18" fill="#71886a"/><path d="M19 69H112L126 105Q70 124 4 105Z" fill="#8b9b79"/><path d="M4 105Q69 125 126 105V129H4Z" fill="#3c6047"/><rect x="-13" y="56" width="29" height="71" rx="12" fill="#567550"/><rect x="116" y="56" width="29" height="71" rx="12" fill="#567550"/><ellipse cx="130" cy="66" rx="7" ry="4" fill="#2d4831"/><path d="M6 128V137M122 128V137" stroke="#355236" stroke-width="6"/></g>`;
      })
      .join(""),
  )
  .join("")}
<!-- Linear aisle illumination and a small calibration microphone silhouette. -->
<path d="M205 536 61 698M996 536 1141 698" stroke="#efdda7" stroke-width="4"/>
<path d="M847 484V568M847 545l-22 31M847 545l23 31" stroke="#4e6548" stroke-width="4"/><path d="M833 482h29" stroke="#263e2d" stroke-width="5" stroke-linecap="round"/>
`,
  );

export const businessScene = (label = ART_COPY.businessAlt) =>
  svg(
    "business",
    label,
    (id) => `
<defs><linearGradient id="${id}-bg" x2="1" y2="1"><stop stop-color="#e9eddf"/><stop offset="1" stop-color="#d5e0c6"/></linearGradient><linearGradient id="${id}-base" x2="0" y2="1"><stop stop-color="#eee9d9"/><stop offset="1" stop-color="#c6c1ab"/></linearGradient></defs>
<rect width="1200" height="760" fill="url(#${id}-bg)"/>
<circle cx="780" cy="240" r="218" fill="#f9f8eb" opacity=".65"/><circle cx="183" cy="668" r="263" fill="#becfae" opacity=".35"/>
<g fill="none" stroke="#a1b28b" stroke-width="2"><path d="M80 179h196l38 38h140M882 131h149v88M871 598h188v-43M131 501v-61h119"/><circle cx="75" cy="179" r="6"/><circle cx="1031" cy="225" r="6"/><circle cx="1059" cy="549" r="6"/><circle cx="131" cy="507" r="6"/></g>
<!-- A diagram on a device, explicitly an example rather than a product screenshot. -->
<ellipse cx="611" cy="653" rx="449" ry="47" fill="#667d5620"/>
<rect x="274" y="143" width="709" height="430" rx="24" fill="#5d7357"/>
<rect x="287" y="157" width="683" height="401" rx="14" fill="#faf9f0"/>
<rect x="287" y="157" width="151" height="401" rx="14" fill="#e7ecdd"/>
<rect x="425" y="157" width="13" height="401" fill="#e7ecdd"/>
<text x="314" y="199" font-family="Montserrat,sans-serif" font-size="24" font-weight="700" fill="#0a452d">${esc(ART_COPY.ekani)}</text>
${[DRAWING.flowLead, DRAWING.flowQuote, DRAWING.flowInvoice, DRAWING.flowPaid].map((t, i) => `<rect x="307" y="${237 + i * 58}" width="111" height="37" rx="5" fill="${i === 0 ? "#cadab8" : "#e7ecdd"}"/><circle cx="320" cy="${255 + i * 58}" r="4" fill="#779359"/><text x="332" y="${260 + i * 58}" font-family="Nunito Sans,sans-serif" font-size="12" font-weight="650" fill="#34513a">${esc(t)}</text>`).join("")}
<text x="465" y="199" font-family="Montserrat,sans-serif" font-size="16" font-weight="600" fill="#0a452d">${esc(ART_COPY.workflow)}</text>
<rect x="866" y="177" width="78" height="28" rx="14" fill="#edf1e4"/><text x="905" y="196" text-anchor="middle" font-family="Nunito Sans,sans-serif" font-size="12" fill="#56655c">${esc(ART_COPY.example)}</text>
<rect x="460" y="236" width="223" height="130" rx="11" fill="#fff" stroke="#e1e3d3"/><rect x="704" y="236" width="239" height="130" rx="11" fill="#fff" stroke="#e1e3d3"/>
<text x="478" y="265" font-family="Montserrat,sans-serif" font-size="12" font-weight="700" fill="#86660f">${esc(DRAWING.flowLead)}</text><text x="478" y="299" font-family="Nunito Sans,sans-serif" font-size="23" font-weight="700" fill="#0a452d">${esc(DRAWING.flowName)}</text><text x="478" y="327" font-family="Nunito Sans,sans-serif" font-size="14" fill="#56655c">${esc(DRAWING.flowArea)}</text>
<text x="722" y="265" font-family="Montserrat,sans-serif" font-size="12" font-weight="700" fill="#86660f">${esc(DRAWING.flowQuote)}</text><text x="722" y="299" font-family="Nunito Sans,sans-serif" font-size="23" font-weight="700" fill="#0a452d">${esc(DRAWING.flowTotalAmount)}</text><text x="722" y="327" font-family="Nunito Sans,sans-serif" font-size="13" fill="#56655c">${esc(DRAWING.flowItem)}</text>
<rect x="460" y="389" width="483" height="135" rx="11" fill="#eef3e5"/>
<path d="M501 452H890" stroke="#b4c3a0" stroke-width="2"/>
${[DRAWING.flowLead, DRAWING.flowQuote, DRAWING.flowInvoice, DRAWING.flowPaid].map((t, i) => `<circle cx="${501 + i * 130}" cy="452" r="18" fill="${i === 3 ? "#0a452d" : "#d2dfbf"}"/><path d="m${494 + i * 130} 452 5 5 9-10" fill="none" stroke="${i === 3 ? "#fff" : "#4b6b47"}" stroke-width="2"/><text x="${501 + i * 130}" y="491" text-anchor="middle" font-family="Nunito Sans,sans-serif" font-size="12" font-weight="650" fill="#34513a">${esc(t)}</text>`).join("")}
<path d="M274 567H983L1117 632Q1127 644 1105 648H184Q162 644 174 632Z" fill="url(#${id}-base)"/><path d="M174 639H1117L1106 650H184Z" fill="#b5b39d"/><path d="M538 576H735L759 599H514Z" fill="#bcbfa9"/>
<!-- Chat phone, visually connected to the enquiry workflow. -->
<g transform="translate(111 288) rotate(-7 125 175)"><rect width="241" height="360" rx="30" fill="#405a42"/><rect x="10" y="11" width="221" height="338" rx="23" fill="#f8f6ec"/><rect x="67" y="11" width="108" height="15" rx="7" fill="#405a42"/><rect x="10" y="37" width="221" height="49" fill="#e4ebd9"/><text x="29" y="68" font-family="Montserrat,sans-serif" font-size="15" font-weight="650" fill="#0a452d">${esc(DRAWING.flowChat)}</text><rect x="33" y="110" width="179" height="104" rx="12" fill="#dae8c8"/><text x="48" y="137" font-family="Nunito Sans,sans-serif" font-size="16" fill="#244432"><tspan x="48">${esc(ART_COPY.enquiryLines[0])}</tspan><tspan x="48" dy="24">${esc(ART_COPY.enquiryLines[1])}</tspan><tspan x="48" dy="24">${esc(ART_COPY.enquiryLines[2])}</tspan></text><rect x="26" y="237" width="165" height="58" rx="12" fill="#fff" stroke="#dddcca"/><circle cx="48" cy="267" r="10" fill="#d6e3c4"/><path d="m43 267 4 4 7-8" fill="none" stroke="#476940" stroke-width="2"/><text x="66" y="272" font-family="Nunito Sans,sans-serif" font-size="15" font-weight="700" fill="#0a452d">${esc(DRAWING.flowLead)}</text></g>
${plant(1050, 497, 0.6)}
`,
  );

export const SCENES = {
  floorplan: livingScene,
  revival: cinemaScene,
  speakers: cinemaScene,
  ekaniflow: businessScene,
};
