/**
 * Editable website text.
 *
 * Every piece of page text goes through tx() (or t() for the shared
 * translations). The text written in the code is the default; anything
 * edited in the CMS (Admin → Website Text, table `site_text`) replaces it.
 *
 *   tx("pages.about.founder.title", lang, "Message from the Founder", ar.title)
 *
 * Overrides are loaded once by LanguageProvider, which re-renders the site
 * when they arrive.
 */
let OVERRIDES = {};

export function setTextOverrides(rows) {
  const map = {};
  for (const r of rows || []) map[r.key] = { en: r.en || "", ar: r.ar || "" };
  OVERRIDES = map;
}

export function getOverride(key) {
  return OVERRIDES[key];
}

export function tx(key, lang, en, ar) {
  const o = OVERRIDES[key];
  if (lang === "ar") return (o && o.ar) || ar || (o && o.en) || en;
  return (o && o.en) || en;
}

/**
 * Renders **bold** markers in editable paragraphs as <b>.
 * Used for long paragraphs that had bold phrases in the original design.
 */
export function rich(text, boldClass = "text-ink font-semibold") {
  const parts = String(text ?? "").split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => (i % 2 ? <b key={i} className={boldClass}>{p}</b> : p));
}
