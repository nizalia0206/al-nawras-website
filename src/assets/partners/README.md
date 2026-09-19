# Brand partner logos

These logos feed the sliding "Brand Partners" strip in the footer (every page).
A logo is picked up automatically by file name — no code changes needed.

| Partner       | File               | Source                                              |
| ------------- | ------------------ | --------------------------------------------------- |
| Honeywell     | honeywell.png      | Pre-Qualification PDF (Honeywell page)              |
| Teknoware     | teknoware.png      | Pre-Qualification PDF (Teknoware Middle East FZCO)  |
| Waterfall     | waterfall.png      | Pre-Qualification PDF (Waterfall section header)    |
| KD Industries | kd-industries.png  | Pre-Qualification PDF (KD Pipes) — see note below   |
| Uranus        | uranus.png         | Pre-Qualification PDF (Rewire International sheet)  |
| H3C           | h3c.png            | Pre-Qualification PDF (H3C brochure cover)          |

Note: the K.D. Industries mark only exists as white-on-dark in the source, so it
is recoloured to the site's dark navy so it reads on the white strip. Replace it
with the official colour logo if the brand supplies one.

To replace a logo, overwrite the file (SVG, or a transparent PNG/WebP/JPG, works;
tight crop, roughly 2:1 to 6:1 landscape). Each logo's display height is set in
`LOGO_HEIGHT` in `src/data/partnerLogos.js`.

To add a partner, add it to `brands` in `src/data/content.js`, drop its logo here
named after the brand id, and add a height (and a catalog slug if it has one) in
`src/data/partnerLogos.js`.
