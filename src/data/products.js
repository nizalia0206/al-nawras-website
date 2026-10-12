/* ============================================================
   AL NAWRAS SAFETY & SECURITY SYSTEMS — PRODUCT CATALOG DATA
   Suppliers: H3C, Honeywell, Waterfall, Teknoware, Uranus Cable, KD Pipes
   ============================================================ */

export const CATEGORIES = [
  { id: "fire-alarm",     name: "Fire Alarm & Detection",   icon: "flame" },
  { id: "fire-pumps",     name: "Fire Pumps",                icon: "droplet" },
  { id: "emergency-light",name: "Emergency Lighting",        icon: "lightbulb" },
  { id: "networking",     name: "Networking & ICT",          icon: "network" },
  { id: "cables",         name: "Fire Resistant Cables",     icon: "cable" },
  { id: "pipes",          name: "Pipes & Fittings",          icon: "pipe" },
];

export const SUPPLIERS = {
  honeywell:  { name: "Honeywell",           blurb: "Global leader in fire detection, alarm and building safety technology." },
  waterfall:  { name: "Waterfall Fire Pumps",blurb: "UL/FM listed fire pump systems engineered for NFPA-20 compliance." },
  teknoware:  { name: "Teknoware",           blurb: "Finnish-engineered emergency and escape route lighting systems." },
  h3c:        { name: "H3C",                 blurb: "Enterprise-grade networking, security and ICT infrastructure." },
  uranus:     { name: "Uranus Cable (Rewire)",blurb: "Fire-resistant and fire-retardant power & data cabling." },
  kdpipes:    { name: "KD Pipes",            blurb: "Certified pipes and fittings for fire fighting network installations." },
};

import { PARTNER_PRODUCTS } from "./partnerProducts.js";

const P = "/assets/products/";

/* Helper to build a slug-safe id */
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

export const PRODUCTS = [
  /* ---------------- WATERFALL — FIRE PUMPS ---------------- */
  {
    id: "waterfall-horizontal-split-case",
    name: "Waterfall Horizontal Split Case Fire Pump",
    supplier: "waterfall",
    category: "fire-pumps",
    price: 18500,
    images: [P+"waterfall/real/fire-pumps-waterfall-horizontal-split-case-fire-pump.jpg"],
    short: "UL/FM listed horizontal split case fire pump for high-demand systems.",
    description: "Built for large-scale fire protection systems, Waterfall's horizontal split case fire pumps deliver high flow rates with dependable performance. Listed to UL 448 and FM 1311, and designed to NFPA 20 requirements, they form the backbone of sprinkler and hydrant network water supply.",
    specs: [
      ["Type", "Horizontal split case"],
      ["Listings", "UL 448, FM 1311"],
      ["Standard", "NFPA 20"],
      ["Flow range", "500–5000 GPM (project dependent)"],
      ["Drive", "Electric motor / diesel engine options"],
    ],
    tags: ["fire pump", "split case", "NFPA 20"],
  },
  {
    id: "waterfall-fire-pump-house",
    name: "Waterfall Packaged Fire Pump House Unit",
    supplier: "waterfall",
    category: "fire-pumps",
    price: 32000,
    images: [P+"waterfall/real/fire-pumps-waterfall-packaged-fire-pump-house.jpg"],
    short: "Pre-engineered, skid-mounted fire pump house for rapid deployment.",
    description: "A fully packaged, factory-tested pump house solution including main and jockey pumps, controllers, piping and instrumentation — reducing on-site installation time for projects needing a complete, code-compliant fire water supply package.",
    specs: [
      ["Configuration", "Skid-mounted packaged unit"],
      ["Includes", "Main pump, jockey pump, controllers"],
      ["Standard", "NFPA 20 compliant assembly"],
      ["Testing", "Factory performance tested"],
    ],
    tags: ["pump house", "packaged system", "skid mounted"],
  },
  {
    id: "waterfall-cross-sectional",
    name: "Waterfall Vertical Turbine Fire Pump",
    supplier: "waterfall",
    category: "fire-pumps",
    price: 21500,
    images: [P+"waterfall/real/fire-pumps-waterfall-vertical-turbine-fire-pump.jpg"],
    short: "Vertical turbine pump for below-ground or open water source supply.",
    description: "Engineered for applications drawing from wet pits, reservoirs, or below-grade water sources, Waterfall's vertical turbine fire pumps provide dependable suction lift performance while meeting the same UL/FM listing standards as the horizontal range.",
    specs: [
      ["Type", "Vertical turbine"],
      ["Application", "Wet pit / underground source"],
      ["Listings", "UL 448, FM 1311"],
      ["Standard", "NFPA 20"],
    ],
    tags: ["fire pump", "vertical turbine"],
  },
  /* ---------------- H3C — NETWORKING & ICT (selected representative products) ---------------- */
  {
    id: "h3c-s6520x-ei",
    name: "H3C S6520X-EI Series Switch",
    supplier: "h3c",
    category: "networking",
    price: 2450,
    images: [P+"h3c/real/h3c-switches-s6520x-ei.jpg"],
    short: "10GbE Layer 3 access/aggregation switch series.",
    description: "The S6520X-EI series delivers high-density 10GbE access with Layer 3 routing, purpose-built for enterprise campus aggregation and data center top-of-rack deployments requiring wire-speed performance.",
    specs: [
      ["Switching layer", "Layer 3"],
      ["Port speed", "10GbE downlink / 40-100GbE uplink options"],
      ["Form factor", "1U rack-mount"],
      ["Redundancy", "Hot-swappable PSU & fans"],
    ],
    tags: ["switch", "layer 3", "10GbE"],
  },
  {
    id: "h3c-s5130s-ei",
    name: "H3C S5130S-EI Series Switch",
    supplier: "h3c",
    category: "networking",
    price: 890,
    images: [P+"h3c/real/h3c-switches-s5130s-ei.jpg"],
    short: "Gigabit Layer 3 access switch series.",
    description: "A cost-effective Layer 3 gigabit access switch built for enterprise wiring closets, offering solid throughput, PoE+ options and simplified management for mid-size networks.",
    specs: [
      ["Switching layer", "Layer 3"],
      ["Port speed", "Gigabit Ethernet"],
      ["PoE", "PoE+ variants available"],
      ["Form factor", "1U rack-mount"],
    ],
    tags: ["switch", "gigabit", "access switch"],
  },
  {
    id: "h3c-msr3610-i",
    name: "H3C MSR3610-I Router",
    supplier: "h3c",
    category: "networking",
    price: 1350,
    images: [P+"h3c/real/h3c-routers-msr3610-i.jpg"],
    short: "Modular multi-service enterprise router.",
    description: "The MSR3610-I is a modular, multi-service router combining routing, security and WAN optimization in a single platform — suited to branch office and campus edge deployments needing flexible interface options.",
    specs: [
      ["Type", "Modular multi-service router"],
      ["Throughput", "Multi-Gbps forwarding"],
      ["Interfaces", "Modular WAN/LAN slots"],
      ["Security", "Integrated firewall / VPN"],
    ],
    tags: ["router", "modular", "branch router"],
  },
  {
    id: "h3c-wa6320",
    name: "H3C WA6320 Wireless Access Point",
    supplier: "h3c",
    category: "networking",
    price: 340,
    images: [P+"h3c/real/h3c-wlan-products-wa6320.jpg"],
    short: "Wi-Fi 6 indoor access point for enterprise deployments.",
    description: "The WA6320 delivers Wi-Fi 6 performance for dense enterprise environments, with high concurrent client capacity, MU-MIMO and OFDMA support for consistent throughput even under heavy load.",
    specs: [
      ["Wi-Fi standard", "Wi-Fi 6 (802.11ax)"],
      ["MIMO", "MU-MIMO, OFDMA"],
      ["Power", "802.3at PoE+"],
      ["Mounting", "Ceiling / wall mount"],
    ],
    tags: ["access point", "wifi 6", "wireless"],
  },
  {
    id: "h3c-ngfw-f1000",
    name: "H3C NGFW F1000 Series Firewall",
    supplier: "h3c",
    category: "networking",
    price: 6200,
    images: [P+"h3c/real/h3c-security-ngfw.jpg"],
    short: "Next-generation firewall for enterprise perimeter security.",
    description: "The F1000 series next-generation firewall combines deep packet inspection, intrusion prevention and application-aware policy control, protecting enterprise networks against evolving threats while maintaining high throughput.",
    specs: [
      ["Type", "Next-generation firewall"],
      ["Inspection", "Deep packet inspection, IPS"],
      ["Throughput", "Multi-Gbps firewall throughput"],
      ["Management", "Centralized security management platform"],
    ],
    tags: ["firewall", "NGFW", "network security"],
  },
  {
    id: "h3c-r4900-g5",
    name: "H3C UniServer R4900 G5 Rack Server",
    supplier: "h3c",
    category: "networking",
    price: 4800,
    images: [P+"h3c/real/h3c-intelligent-computing-uniserver.jpg"],
    short: "2U dual-socket rack server for enterprise workloads.",
    description: "The R4900 G5 is a versatile 2U rack server supporting dual-socket configurations, extensive storage bays and flexible I/O, suited to virtualization, database and general enterprise compute workloads.",
    specs: [
      ["Form factor", "2U rack server"],
      ["Sockets", "Dual-socket"],
      ["Storage", "Multiple hot-swap bays"],
      ["Use case", "Virtualization, database, general compute"],
    ],
    tags: ["server", "rack server", "compute"],
  },
  /* ---------------- KD PIPES — PIPES & FITTINGS ---------------- */
  {
    id: "kdpipes-fire-network-pipe",
    name: "KD Pipes Fire Fighting Network Pipe",
    supplier: "kdpipes",
    category: "pipes",
    price: 11.5,
    priceUnit: "per meter",
    images: [P+"kdpipes/real/applications-steel-sprinkler-fire-pipes.jpg"],
    short: "Certified steel pipe for fire fighting distribution networks.",
    description: "KD Pipes' fire fighting network pipe range is manufactured to meet the pressure and durability demands of sprinkler and hydrant distribution systems, with certified wall thickness and jointing compatibility for fast, code-compliant installation.",
    specs: [
      ["Material", "Certified steel pipe"],
      ["Application", "Sprinkler / hydrant distribution network"],
      ["Sizes", "Multiple diameters available"],
      ["Jointing", "Grooved / threaded / welded options"],
    ],
    tags: ["pipe", "sprinkler pipe", "fire network"],
  },
  {
    id: "kdpipes-fittings-set",
    name: "KD Pipes Fire Network Fittings Set",
    supplier: "kdpipes",
    category: "pipes",
    price: 28,
    images: [P+"kdpipes/real/applications-steel-pipe-fabrication-factory.jpg"],
    short: "Elbows, tees and couplings for fire network pipe assembly.",
    description: "A complete fittings range — elbows, tees, reducers and couplings — engineered to match KD Pipes' fire network pipework, ensuring pressure-rated, leak-free connections throughout the distribution system.",
    specs: [
      ["Includes", "Elbows, tees, reducers, couplings"],
      ["Material", "Certified steel / ductile iron"],
      ["Rating", "Matched to network pipe pressure class"],
    ],
    tags: ["fittings", "elbow", "coupling"],
  },
];

const SUPPLIER_META = {"h3c": ["H3C", "part of H3C's enterprise infrastructure range, supplied and supported in the UAE by Al Nawras Safety & Security Systems LLC. Contact our ICT team for full datasheets, licensing options and project pricing.", "Networking & ICT infrastructure"], "honeywell": ["Honeywell", "part of the Honeywell fire, life-safety and emergency communication range, supplied and installed in the UAE by Al Nawras. Full datasheets and compliance documentation available on request.", "Fire alarm & detection"], "teknoware": ["Teknoware", "part of Teknoware's Finnish-engineered emergency and escape route lighting range, supplied and commissioned in the UAE by Al Nawras.", "Emergency lighting"], "waterfall": ["Waterfall", "a UL/FM listed fire pump solution from Waterfall, supplied, installed and commissioned by Al Nawras in line with NFPA-20.", "Fire pump systems"], "uranus": ["Uranus Cable (Rewire)", "a fire-resistant / fire-retardant cable solution supplied by Al Nawras for critical life-safety and data circuits.", "Fire resistant cabling"], "kdpipes": ["KD Pipes", "part of the KD Pipes range used across Al Nawras fire fighting network installations.", "Pipes & fittings"]};

/* ============================================================
   REAL PRODUCT PHOTOGRAPHY — bulk catalogue additions
   Generated from supplier-provided studio photography (2026).
   ============================================================ */
const REAL_BULK = [
  { name: "H3C UniServer R6900 G3 Rack Server", supplier: "h3c", category: "networking", file: "h3c/real/h3c-cloud-solution-portfolio-h3c.jpg", price: 5400 },
  { name: "H3C UniStor", supplier: "h3c", category: "networking", file: "h3c/real/h3c-intelligent-computing-unistor.jpg", price: 42050 },
  { name: "H3C Magic BS218F-HP PoE Switch", supplier: "h3c", category: "networking", file: "h3c/real/h3c-magic-networking-devices-h3c.jpg", price: 49650 },
  { name: "H3C CPE", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-cpe.jpg", price: 69550 },
  { name: "H3C CR16000-F", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-cr16000-f.jpg", price: 54200 },
  { name: "H3C CR16000-M", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-cr16000-m.jpg", price: 41250 },
  { name: "H3C CR16K-F", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-cr16k-f.jpg", price: 8000 },
  { name: "H3C CR16K-M", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-cr16k-m.jpg", price: 37200 },
  { name: "H3C CR19000", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-cr19000.jpg", price: 67700 },
  { name: "H3C MSR3610-I", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-msr3610-i.jpg", price: 60700 },
  { name: "H3C MSR6602-I", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-msr6602-i.jpg", price: 10050 },
  { name: "H3C MSR800", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-msr800.jpg", price: 21800 },
  { name: "H3C P", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-p.jpg", price: 48050 },
  { name: "H3C SR3610-IE", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-sr3610-ie.jpg", price: 38850 },
  { name: "H3C SR6600", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-sr6600.jpg", price: 45850 },
  { name: "H3C SR6602-IE", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-sr6602-ie.jpg", price: 14150 },
  { name: "H3C UCPE", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-ucpe.jpg", price: 53400 },
  { name: "H3C VCPE", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-vcpe.jpg", price: 17700 },
  { name: "H3C VSR", supplier: "h3c", category: "networking", file: "h3c/real/h3c-routers-vsr.jpg", price: 51700 },
  { name: "H3C F100-C-A1", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-f100-c-a1.jpg", price: 35300 },
  { name: "H3C F100-C-A2", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-f100-c-a2.jpg", price: 68000 },
  { name: "H3C MSR610", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-msr610.jpg", price: 39550 },
  { name: "H3C S1850V2-10P-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s1850v2-10p-ei.jpg", price: 45100 },
  { name: "H3C S1850V2-28P-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s1850v2-28p-ei.jpg", price: 7050 },
  { name: "H3C S1850V2-28P-HPWR-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s1850v2-28p-hpwr-ei.jpg", price: 41750 },
  { name: "H3C S1850V2-28X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s1850v2-28x.jpg", price: 67000 },
  { name: "H3C S1850V2-52P-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s1850v2-52p-ei.jpg", price: 35300 },
  { name: "H3C S1850V2-52X-PWR", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s1850v2-52x-pwr.jpg", price: 32600 },
  { name: "H3C S1850V2-52X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s1850v2-52x.jpg", price: 62900 },
  { name: "H3C S5120V3-10P-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-10p-li.jpg", price: 63300 },
  { name: "H3C S5120V3-10P-PWR-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-10p-pwr-li.jpg", price: 55500 },
  { name: "H3C S5120V3-20P-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-20p-li.jpg", price: 38500 },
  { name: "H3C S5120V3-28P-HPWR-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-28p-hpwr-li.jpg", price: 46900 },
  { name: "H3C S5120V3-28P-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-28p-li.jpg", price: 57500 },
  { name: "H3C S5120V3-28P-PWR-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-28p-pwr-li.jpg", price: 5400 },
  { name: "H3C S5120V3-28S-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-28s-li.jpg", price: 48000 },
  { name: "H3C S5120V3-28S-PWR-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-28s-pwr-li.jpg", price: 51350 },
  { name: "H3C S5120V3-52P-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-52p-li.jpg", price: 40400 },
  { name: "H3C S5120V3-52P-PWR-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-52p-pwr-li.jpg", price: 62800 },
  { name: "H3C S5120V3-52S-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-52s-li.jpg", price: 2250 },
  { name: "H3C S5120V3-52S-PWR-LI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-s5120v3-52s-pwr-li.jpg", price: 48800 },
  { name: "H3C WA6120", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-wa6120.jpg", price: 37500 },
  { name: "H3C WA6120H", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-wa6120h.jpg", price: 50800 },
  { name: "H3C WA6126X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-wa6126x.jpg", price: 36600 },
  { name: "H3C WSG1812X-PWR", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-wsg1812x-pwr.jpg", price: 23650 },
  { name: "H3C WSG1840X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-smb-products-wsg1840x.jpg", price: 65350 },
  { name: "H3C NGLB", supplier: "h3c", category: "networking", file: "h3c/real/h3c-security-nglb.jpg", price: 14250 },
  { name: "H3C Sandbox", supplier: "h3c", category: "networking", file: "h3c/real/h3c-security-sandbox.jpg", price: 25700 },
  { name: "H3C IE4300", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-ie4300.jpg", price: 64200 },
  { name: "H3C IE4320", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-ie4320.jpg", price: 67900 },
  { name: "H3C S10500X-G", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s10500x-g.jpg", price: 10650 },
  { name: "H3C S10500X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s10500x.jpg", price: 66900 },
  { name: "H3C S12500G-AF", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s12500g-af.jpg", price: 60350 },
  { name: "H3C S12500X-AF", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s12500x-af.jpg", price: 20300 },
  { name: "H3C S5000V5", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s5000v5.jpg", price: 62200 },
  { name: "H3C S5130S-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s5130s-ei.jpg", price: 68450 },
  { name: "H3C S5170-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s5170-ei.jpg", price: 41400 },
  { name: "H3C S5560X-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s5560x-ei.jpg", price: 48800 },
  { name: "H3C S5570S-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s5570s-ei.jpg", price: 60300 },
  { name: "H3C S5590-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s5590-ei.jpg", price: 66650 },
  { name: "H3C S6520X-EI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6520x-ei.jpg", price: 42150 },
  { name: "H3C S6520X-HI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6520x-hi.jpg", price: 21600 },
  { name: "H3C S6520X-SI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6520x-si.jpg", price: 7950 },
  { name: "H3C S6530X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6530x.jpg", price: 37300 },
  { name: "H3C S6550X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6550x.jpg", price: 43550 },
  { name: "H3C S6805", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6805.jpg", price: 65800 },
  { name: "H3C S681X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s681x.jpg", price: 9250 },
  { name: "H3C S6825", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6825.jpg", price: 60350 },
  { name: "H3C S6850", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6850.jpg", price: 54100 },
  { name: "H3C S6860", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6860.jpg", price: 9650 },
  { name: "H3C S6890", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s6890.jpg", price: 45850 },
  { name: "H3C S7500X-G", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s7500x-g.jpg", price: 5950 },
  { name: "H3C S7500X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s7500x.jpg", price: 3000 },
  { name: "H3C S9820", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s9820.jpg", price: 64150 },
  { name: "H3C S9850", supplier: "h3c", category: "networking", file: "h3c/real/h3c-switches-s9850.jpg", price: 17700 },
  { name: "H3C AC", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-ac.jpg", price: 4350 },
  { name: "H3C WA530", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa530.jpg", price: 33750 },
  { name: "H3C WA6320H-HI", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6320h-hi.jpg", price: 4950 },
  { name: "H3C WA6320H", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6320h.jpg", price: 11750 },
  { name: "H3C WA6330", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6330.jpg", price: 47050 },
  { name: "H3C WA6520", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6520.jpg", price: 41200 },
  { name: "H3C WA6520H", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6520h.jpg", price: 27150 },
  { name: "H3C WA6526", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6526.jpg", price: 67700 },
  { name: "H3C WA6526E", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6526e.jpg", price: 41750 },
  { name: "H3C WA6528X-E", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6528x-e.jpg", price: 46750 },
  { name: "H3C WA6528i", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6528i.jpg", price: 48850 },
  { name: "H3C WA6620X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6620x.jpg", price: 18450 },
  { name: "H3C WA6622", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6622.jpg", price: 62550 },
  { name: "H3C WA6628", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6628.jpg", price: 14350 },
  { name: "H3C WA6628X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6628x.jpg", price: 23650 },
  { name: "H3C WA6630X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6630x.jpg", price: 54350 },
  { name: "H3C WA6636", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa6636.jpg", price: 63750 },
  { name: "H3C WA7538", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa7538.jpg", price: 35150 },
  { name: "H3C WA7539", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa7539.jpg", price: 40750 },
  { name: "H3C WA7638", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wa7638.jpg", price: 56100 },
  { name: "H3C WBC", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wbc.jpg", price: 50450 },
  { name: "H3C WX1804H-PWR", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wx1804h-pwr.jpg", price: 28850 },
  { name: "H3C WX2812X-PWR", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wx2812x-pwr.jpg", price: 27250 },
  { name: "H3C WX2860X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wx2860x.jpg", price: 42150 },
  { name: "H3C WX2880X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wx2880x.jpg", price: 50300 },
  { name: "H3C WX3820X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wx3820x.jpg", price: 7900 },
  { name: "H3C WX3840X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wx3840x.jpg", price: 22900 },
  { name: "H3C WX5860X", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-wx5860x.jpg", price: 25350 },
  { name: "H3C VAC", supplier: "h3c", category: "networking", file: "h3c/real/h3c-wlan-products-vac.jpg", price: 55700 },
  { name: "KD Pipes Steel Furniture Manufacturing", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-furniture-manufacturing.jpg", price: 30 },
  { name: "KD Pipes Steel Handrail Pipes", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-handrail-pipes.jpg", price: 115 },
  { name: "KD Pipes Steel Parking Shade Structure", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-parking-shade-structure.jpg", price: 25 },
  { name: "KD Pipes Steel Pipe Boring Equipment", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-pipe-boring-equipment.jpg", price: 75 },
  { name: "KD Pipes Steel Pipe Fencing Manufacturing", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-pipe-fencing-manufacturing.jpg", price: 110 },
  { name: "KD Pipes Steel Pipes Irrigation Agriculture", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-pipes-irrigation-agriculture.jpg", price: 50 },
  { name: "KD Pipes Steel Pipes Oil And Gas Industry", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-pipes-oil-and-gas-industry.jpg", price: 145 },
  { name: "KD Pipes Steel Scaffolding Pipes Construction", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-scaffolding-pipes-construction.jpg", price: 115 },
  { name: "KD Pipes Steel Structure Engineering Fabrication", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-structure-engineering-fabrication.jpg", price: 40 },
  { name: "KD Pipes Steel Water Line Pipes", supplier: "kdpipes", category: "pipes", file: "kdpipes/real/applications-steel-water-line-pipes.jpg", price: 100 },
  { name: "Waterfall End Suction Fire Pump", supplier: "waterfall", category: "fire-pumps", file: "waterfall/real/fire-pumps-waterfall-end-suction-fire-pump.jpg", price: 61000 },
  { name: "Waterfall Horizontal Split Case Fire Pump", supplier: "waterfall", category: "fire-pumps", file: "waterfall/real/fire-pumps-waterfall-horizontal-split-case-fire-pump.jpg", price: 16400 },
  { name: "Waterfall Packaged Fire Pump House", supplier: "waterfall", category: "fire-pumps", file: "waterfall/real/fire-pumps-waterfall-packaged-fire-pump-house.jpg", price: 57300 },
  { name: "Waterfall Vertical Turbine Fire Pump", supplier: "waterfall", category: "fire-pumps", file: "waterfall/real/fire-pumps-waterfall-vertical-turbine-fire-pump.jpg", price: 66200 },
  { name: "Waterfall Diesel Engine Fire Pump", supplier: "waterfall", category: "fire-pumps", file: "waterfall/real/fire-pumps-diesel-engine-fire-pump.jpg", price: 21900 },
  { name: "Waterfall Electric Jockey Pump Fire System", supplier: "waterfall", category: "fire-pumps", file: "waterfall/real/fire-pumps-electric-jockey-pump-fire-system.jpg", price: 35250 },
  { name: "Waterfall Fire Pump Controller Panel", supplier: "waterfall", category: "fire-pumps", file: "waterfall/real/fire-pumps-fire-pump-controller-panel.jpg", price: 71400 },
];


REAL_BULK.forEach((r) => {
  const meta = SUPPLIER_META[r.supplier];
  PRODUCTS.push({
    id: slug(r.supplier + "-" + r.name) + "-" + r.file.split("/").pop().replace(/\.[a-z]+$/,"").slice(-4),
    name: r.name,
    supplier: r.supplier,
    category: r.category,
    price: r.price,
    priceUnit: (r.category === "cables" || r.category === "pipes") ? "/ meter" : undefined,
    images: [P + r.file],
    short: `Genuine ${SUPPLIERS[r.supplier].name} product, supplied and supported in the UAE by Al Nawras.`,
    description: `${r.name} is ${meta[1]}`,
    specs: [
      ["Brand", meta[0]],
      ["Category", meta[2]],
      ["Support", "Supplied with local warranty & support via Al Nawras"],
    ],
    tags: [r.supplier, r.category, "real-photo"],
  });
});

/* Honeywell, Teknoware & Uranus products from the official partner datasheets */
PRODUCTS.push(...PARTNER_PRODUCTS);

/* Utility functions used across pages */
export const CatalogAPI = {
  all() { return PRODUCTS; },
  byId(id) { return PRODUCTS.find(p => p.id === id); },
  byCategory(cat) { return PRODUCTS.filter(p => cat === "all" ? true : p.category === cat); },
  bySupplier(sup) { return PRODUCTS.filter(p => p.supplier === sup); },
  search(q) {
    q = (q || "").toLowerCase().trim();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.short.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      SUPPLIERS[p.supplier].name.toLowerCase().includes(q)
    );
  },
  suggestions(product, count = 4) {
    const sameCat = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category);
    const sameSup = PRODUCTS.filter(p => p.id !== product.id && p.supplier === product.supplier && p.category !== product.category);
    const pool = [...sameCat, ...sameSup];
    const seen = new Set();
    const out = [];
    for (const p of pool) {
      if (!seen.has(p.id)) { seen.add(p.id); out.push(p); }
      if (out.length >= count) break;
    }
    return out;
  },
  formatPrice(p) {
    if (!p.price) return "Price on request";
    const val = "AED " + p.price.toLocaleString("en-US", { minimumFractionDigits: p.price % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 });
    return p.priceUnit ? val + " " + p.priceUnit : val;
  },
};
