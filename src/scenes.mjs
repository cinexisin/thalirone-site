// Responsive, locally hosted concept imagery. Generation prompts and originals
// are kept in evidence/image-generation; no image represents a client project.
import { ART_COPY } from "./config.mjs";
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const sizes = {
  wide: "(min-width: 1400px) 1320px, calc(100vw - 40px)",
  hero: "(min-width: 1400px) 650px, (min-width: 851px) 50vw, calc(100vw - 40px)",
  card: "(min-width: 1400px) 420px, (min-width: 851px) 33vw, (min-width: 481px) 48vw, calc(100vw - 40px)",
  detail:
    "(min-width: 1400px) 620px, (min-width: 769px) 48vw, calc(100vw - 40px)",
};
const photo = (name, label, { layout = "card", eager = false } = {}) => {
  const srcset = (format) =>
    [480, 768, 1200, 1536]
      .map((w) => `/assets/media/${name}-concept-${w}.${format} ${w}w`)
      .join(", ");
  return `<div class="scene photo-scene scene-${name}">
    <picture><source type="image/avif" srcset="${srcset("avif")}" sizes="${sizes[layout]}">
    <img src="/assets/media/${name}-concept-768.webp" srcset="${srcset("webp")}" sizes="${sizes[layout]}" alt="${esc(label)}" width="1536" height="1024" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>
    ${layout === "wide" ? '<span class="photo-light room-light" aria-hidden="true"></span>' : ""}
    <span class="photo-credit">${esc(ART_COPY.concept)}</span>
  </div>`;
};
export const livingScene = (label = ART_COPY.homeAlt, options) =>
  photo("home", label, options);
export const cinemaScene = (label = ART_COPY.cinemaAlt, options) =>
  photo("cinema", label, options);
export const businessScene = (label = ART_COPY.businessAlt, options) =>
  photo("business", label, options);
export const SCENES = {
  floorplan: livingScene,
  revival: cinemaScene,
  speakers: cinemaScene,
  ekaniflow: businessScene,
};
