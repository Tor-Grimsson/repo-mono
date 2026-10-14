/**
 * Branded asset specs — mm dimensions + print/digital production data.
 *
 * Frame is the outer mm box (bleed-box for printed assets, clearspace-
 * box for logos). Trim is the inner artwork. Rows feed AssetSpecTable.
 *
 * Source: docs/styleguide/branded-assets.md.
 */

/* The garment rows (hangtag · swing tag · edition card · neck / size / care labels · dust bag ·
 * garment bag · gift box) left 2026-10-14 with the Labels / Bags / Packaging sections — Another
 * Creation's product list, nothing of Kolkrabbi's. The five stationery rows remain. */
export const ASSET_SPECS = {
  // ── Stationery ─────────────────────────────────────────────────
  'business-card': {
    name: 'Business card',
    frame: [91, 61],
    trim:  [85, 55],
    bleed: 3,
    safe:  [79, 49],
    rows: [
      { property: 'Trim',  print: '85 × 55 mm',              digital: '1004 × 650 px @ 300 dpi' },
      { property: 'Bleed', print: '+3 mm → 91 × 61 mm',      digital: '—' },
      { property: 'Safe',  print: '79 × 49 mm',              digital: '932 × 578 px' },
      { property: 'Color', print: 'CMYK · FOGRA39',          digital: 'sRGB' },
      { property: 'Stock', print: '350 gsm uncoated, cream', digital: '—' },
    ],
  },
  'business-card-back': {
    name: 'Business card · back',
    frame: [91, 61],
    trim:  [85, 55],
    bleed: 3,
    safe:  [79, 49],
    rows: [
      { property: 'Trim',  print: '85 × 55 mm',         digital: '1004 × 650 px @ 300 dpi' },
      { property: 'Bleed', print: '+3 mm → 91 × 61 mm', digital: '—' },
    ],
  },
  envelope: {
    name: 'Envelope · DL',
    frame: [226, 116],
    trim:  [220, 110],
    bleed: 3,
    safe:  [210, 100],
    rows: [
      { property: 'Trim',  print: '220 × 110 mm (DL)',        digital: '2598 × 1299 px @ 300 dpi' },
      { property: 'Bleed', print: '+3 mm',                    digital: '—' },
      { property: 'Safe',  print: '5 mm inset',               digital: '—' },
      { property: 'Stock', print: '120 gsm uncoated cream',   digital: '—' },
      { property: 'Print', print: '1-color K · litho',        digital: '—' },
    ],
  },
  letterhead: {
    name: 'Letterhead · A4',
    frame: [216, 303],
    trim:  [210, 297],
    bleed: 3,
    safe:  [190, 277],
    rows: [
      { property: 'Trim',   print: '210 × 297 mm (A4)',         digital: '2480 × 3508 px @ 300 dpi' },
      { property: 'Bleed',  print: '+3 mm',                     digital: '—' },
      { property: 'Margin', print: '10 mm safe / 20 mm body',   digital: '—' },
      { property: 'Stock',  print: '100 gsm uncoated cream',    digital: '—' },
      { property: 'Print',  print: '1-color K (or digital)',    digital: 'PDF/A for archival' },
    ],
  },
  'email-signature': {
    name: 'Email signature',
    rows: [
      { property: 'Format', print: 'HTML <table>',            digital: 'Gmail · Outlook · Apple Mail safe' },
      { property: 'Width',  print: '600 px max',              digital: 'Mobile-safe' },
      { property: 'Mark',   print: 'PNG @ 2× · 128 × 128 px', digital: 'CDN-hosted, not inline base64' },
      { property: 'Type',   print: 'System fallback stack',   digital: 'No webfonts in email' },
      { property: 'Color',  print: 'sRGB',                    digital: '#5A0816 mark on #FBF7EE bg' },
    ],
  },

  /* The garment entries (hangtag · swing tag · edition card · neck / size / care labels · dust bag ·
   * garment bag · gift box) left 2026-10-14 with the Labels / Bags / Packaging sections — Another
   * Creation's product list, nothing of Kolkrabbi's. The five stationery entries remain. */
}
