import { brands } from "./content";

// Catalog filter slug for each partner (same mapping the Brands section uses).
const SUPPLIER_SLUG = {
  honeywell: "honeywell",
  teknoware: "teknoware",
  waterfall: "waterfall",
  "kd-industries": "kdpipes",
  uranus: "uranus",
  h3c: "h3c",
};

// Display height (px, desktop) per logo so wide wordmarks and compact marks
// carry a similar visual weight in the strip.
const LOGO_HEIGHT = {
  honeywell: 30,
  teknoware: 34,
  waterfall: 52,
  "kd-industries": 50,
  uranus: 28,
  h3c: 50,
};

// Any logo dropped into src/assets/partners/ is picked up at build time.
// File name = brand id (e.g. honeywell.svg, kd-industries.png).
const files = import.meta.glob("../assets/partners/*.{svg,png,webp,jpg,jpeg}", {
  eager: true,
  query: "?url",
  import: "default",
});

function findLogo(id) {
  const key = Object.keys(files).find((path) => {
    const name = path.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase();
    return name === id;
  });
  return key ? files[key] : null;
}

export const partners = brands.map((b) => ({
  id: b.id,
  name: b.name,
  supplier: SUPPLIER_SLUG[b.id] || "",
  logo: findLogo(b.id), // null => text wordmark fallback
  height: LOGO_HEIGHT[b.id] || 40,
}));
