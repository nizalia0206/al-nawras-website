// Banner photos for the PageHeader on /projects and /products.
// The blue wash / overlay is applied by PageHeader itself and never changes —
// only the photo behind it switches with the selected project category or brand.
import projectsDefault from "../assets/page-headers/projects.jpg";

import malls from "../assets/page-headers/projects/malls-and-shopping-centers.jpg";
import highRise from "../assets/page-headers/projects/residential-commercial-and-high-rise.jpg";
import hospitality from "../assets/page-headers/projects/hospitality.jpg";
import educational from "../assets/page-headers/projects/educational.jpg";
import industrial from "../assets/page-headers/projects/industrial-and-oil-and-gas.jpg";
import hydrant from "../assets/page-headers/projects/fire-hydrant-network.jpg";
import warehouse from "../assets/page-headers/projects/warehouse-and-logistics.jpg";
import smoke from "../assets/page-headers/projects/smoke-management-system.jpg";
import healthcare from "../assets/page-headers/projects/healthcare.jpg";
import elv from "../assets/page-headers/projects/elv-section.jpg";

import catalog from "../assets/page-headers/brands/catalog.jpg";
import honeywell from "../assets/page-headers/brands/honeywell.jpg";
import waterfall from "../assets/page-headers/brands/waterfall.jpg";
import teknoware from "../assets/page-headers/brands/teknoware.jpg";
import h3c from "../assets/page-headers/brands/h3c.jpg";
import uranus from "../assets/page-headers/brands/uranus.jpg";
import kdpipes from "../assets/page-headers/brands/kdpipes.jpg";

// keys match the `category` strings in data/projects.js
export const PROJECT_HEADER_IMAGES = {
  "Malls & Shopping Centers": malls,
  "Residential / Commercial & High-Rise": highRise,
  Hospitality: hospitality,
  Educational: educational,
  "Industrial & Oil and Gas": industrial,
  "Fire Hydrant Network": hydrant,
  "Warehouse & Logistics": warehouse,
  "Smoke Management System": smoke,
  Healthcare: healthcare,
  "ELV Section": elv,
};

// keys match the supplier ids in data/products.js
// "all" (no brand selected) uses the general Fire, Life Safety & ICT catalog banner
export const BRAND_HEADER_IMAGES = {
  honeywell,
  waterfall,
  teknoware,
  h3c,
  uranus,
  kdpipes,
};

export const projectHeaderImage = (category) => PROJECT_HEADER_IMAGES[category] || projectsDefault;
export const brandHeaderImage = (supplier) => BRAND_HEADER_IMAGES[supplier] || catalog;
