/**
 * Slide document — a slide as DATA (2026-09-03, the editor scope).
 *
 * A slide is a 1920×1080 stage with a background and z-ordered layers, every
 * number in stage px (first layer = bottom). The model is kol-fxr's compose
 * editor cut to what a deck needs:
 *
 *   text   { text, x, y, w, h, font:'sans'|'mono', size, weight, italic,
 *            tracking, lineHeight, case:'upper'|'none', align, valign,
 *            color, stroke, rotate }
 *   image  { src, x, y, w, h, fit }
 *   rule   { x, y, w, h, color, stroke }   — a line, a box, a divider
 *
 * `SlideRenderer` draws one; `SlideThumb`, the stage, the overlay and the
 * presentation all render through it, so an edit shows everywhere at once.
 * Colours are the deck's own tokens (`--grey-*`, injected by deckStyles).
 *
 * THE FOURTEEN DOCS below are the credentials deck re-authored from
 * `SlideDeck.jsx` + `.s-*` in deckStyles.js — positions read off the CSS,
 * flex/grid centring resolved to numbers. ponytail: one style per layer, so
 * inline <em>/<b> runs inside a sentence are flattened to the sentence's
 * style; rich runs when the model grows spans. Vertical labels carry `rotate`;
 * the stage moves them but does not rotate its handles.
 */
export const SLIDE_W = 1920
export const SLIDE_H = 1080

/* 8 random base36 chars — fxr's minting, with its collision lesson */
export const newId = (type) => `${type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

/* the deck's voices as layer presets — the `.s-*` CSS restated as data */
export const CHROME  = { font: 'mono', size: 16, weight: 500, tracking: '0.06em', lineHeight: 1, case: 'upper', color: 'var(--grey-400)' }
export const DISPLAY = { font: 'sans', weight: 800, tracking: '-0.035em', lineHeight: 0.84, case: 'upper', color: 'var(--grey-50)' }

export const text  = (p) => ({ id: newId('text'),  type: 'text',  align: 'left', valign: 'start', italic: false, visible: true, ...p })
export const image = (p) => ({ id: newId('image'), type: 'image', fit: 'cover', visible: true, ...p })
export const rule  = (p) => ({ id: newId('rule'),  type: 'rule',  visible: true, ...p })

/* a fresh copy — new ids, so two instances of one layout are two slides */
export const clone = (doc) => ({ ...doc, layers: doc.layers.map((l) => ({ ...l, id: newId(l.type) })) })

const BG = 'var(--kol-color-absolute-black)'
const G = (n) => `var(--grey-${n})`

/* THE DECK'S RAMP, token → hex. The documents only ever carry the TOKEN, which
   is what lets a slide be re-themed by `--slide-fg`; the hex exists for the two
   consumers that cannot resolve a CSS variable — the inspector's swatches, which
   have to paint something, and the SVG exporter, which rasterises outside any
   CSS context where `var()` means anything. Values read off the running stage,
   not retyped. */
export const GREYS = Object.fromEntries(
  [['50', '#FCFBFB'], ['100', '#EBEBEB'], ['200', '#DBDBDB'], ['300', '#A3A3A4'], ['400', '#5B5B5D'],
   ['500', '#363639'], ['600', '#2E2E30'], ['700', '#242427'], ['800', '#1B1B1E'], ['900', '#131316']]
    .map(([n, hex]) => [`var(--grey-${n})`, hex]),
)
export const ABSOLUTE_BLACK = '#000000'

/** Resolve a document colour to something a standalone SVG can paint. */
export const resolveColor = (c) => {
  if (!c) return undefined
  if (c === BG || c === 'var(--kol-color-absolute-black)') return ABSOLUTE_BLACK
  return GREYS[c] ?? c
}

/* LAYER ROLES — the seam deck-wide settings write through.
   A settings pass ("set the date and the deck name once, before editing any
   slide") cannot target layers by matching their TEXT: two slides say
   'Kolkrabbi' for different reasons, and a renamed deck stops matching
   itself. So the well-known slots carry a `role`, and because every one of them
   is minted by the two helpers below, tagging them is a change in ONE place
   rather than across fourteen documents. Anything without a role is ordinary
   copy that settings must not touch. */
export const ROLE = { NAME: 'deck-name', DATE: 'deck-date', NUMBER: 'slide-number' }

/* .eyebrow — top 60, 80 in, grey-300 · .foot — bottom 50, 80 in, grey-500 */
const eyebrow = (l, r) => [
  text({ ...CHROME, text: l, x: 80, y: 60, w: 900, h: 16, color: G(300) }),
  text({ ...CHROME, text: r, x: 940, y: 60, w: 900, h: 16, color: G(300), align: 'right' }),
]
const foot = (n) => [
  text({ ...CHROME, role: ROLE.NAME, text: 'Kolkrabbi', x: 80, y: 1014, w: 900, h: 16, color: G(500) }),
  text({ ...CHROME, role: ROLE.NUMBER, text: `${String(n).padStart(2, '0')} / 14`, x: 940, y: 1014, w: 900, h: 16, color: G(500), align: 'right' }),
]
const hr = (x, y, w, color = G(800)) => rule({ x, y, w, h: 1, color })
const vr = (x, y, h, color = G(800)) => rule({ x, y, w: 1, h, color })

export const COVER_DOC = { bg: BG, layers: [
  text({ ...CHROME, role: ROLE.NAME, text: 'Kolkrabbi', x: 80, y: 80, w: 400, h: 40, valign: 'center' }),
  text({ ...CHROME, text: 'K', x: 940, y: 80, w: 40, h: 40, tracking: '0', align: 'center', valign: 'center', color: G(200), stroke: G(500) }),
  text({ ...CHROME, role: ROLE.DATE, text: 'Reykjavík · 2026', x: 1440, y: 80, w: 400, h: 40, align: 'right', valign: 'center' }),
  /* THE STACK — the CSS deck's `.s-cover .stack`, which grid-centres three
     display lines with -10 / -20 margins between them. Frozen to numbers here.
     `Productions` is 316, not the CSS's 380: 380 measures 2292px in Bricolage
     Grotesque and the 1920 stage clipped 372px of it (the CSS original was
     drawn against Right Grotesk TIGHT, a condensed face). 316 lands at 1906 —
     the full bleed the `x:0 w:1920` box encodes, with a hair of margin.
     The three `y` follow from that: the smaller line is 54px shorter, so the
     tops re-derive to hold the same two overlaps AND keep the block centred
     (stack 605.8 tall → top (1080-605.8)/2 = 237). Change the size and these
     move with it — 237 · +175 · +246. */
  text({ ...DISPLAY, text: 'Kolkrabbi', x: 360, y: 237, w: 1200, h: 185, size: 220, align: 'center', color: G(100) }),
  text({ ...DISPLAY, text: 'Vinnustofa', x: 0, y: 412, w: 1920, h: 266, size: 316, align: 'center' }),
  text({ ...DISPLAY, text: 'credentials', x: 260, y: 658, w: 1400, h: 185, size: 220, italic: true, weight: 500, align: 'center', color: G(300) }),
  text({ ...CHROME, text: 'Full-Service\nProduction', x: 80, y: 949, w: 400, h: 51, lineHeight: 1.6 }),
  text({ ...CHROME, text: 'New York · Los Angeles · Miami\nLondon · Paris · Iceland', x: 1140, y: 949, w: 700, h: 51, lineHeight: 1.6, align: 'right' }),
] }

export const WIDE_STAMP_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter I · The Position', 'Est. New York'),
  text({ ...DISPLAY, text: 'CALM', x: 80, y: 387, w: 1760, h: 306, size: 360, lineHeight: 0.85, align: 'center' }),
  text({ font: 'mono', text: '— is how the hard part gets done.', x: 0, y: 760, w: 1920, h: 60, size: 44, weight: 400, italic: true, tracking: '-0.005em', lineHeight: 1, case: 'none', align: 'center', color: G(300) }),
  text({ ...CHROME, text: 'A Production Company', x: -112, y: 532, w: 400, h: 16, align: 'center', rotate: -90 }),
  text({ ...CHROME, text: 'Six Cities · One Crew', x: 1632, y: 532, w: 400, h: 16, align: 'center', rotate: 90 }),
  ...foot(2),
] }

const LEDGER = [
  ['Founded by', 'Bríet Ólína Kristinsdóttir'], ['Based in', 'New York, NY'], ['Produces', 'Commercial & branded content'],
  ['Formats', 'Film · Stills · Lookbook'], ['Crew', 'Trusted collaborators, worldwide'], ['Per project', 'One producer, start to finish'],
]
export const NUMBER_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter II · The Footprint', 'Six Cities'),
  text({ ...CHROME, text: 'Cities', x: 80, y: 100, w: 900, h: 16 }),
  text({ ...DISPLAY, text: '6', x: 80, y: 260, w: 900, h: 468, size: 600, weight: 700, lineHeight: 0.78, tracking: '-0.05em' }),
  text({ font: 'sans', text: 'New York, Los Angeles, Miami, London, Paris, Iceland. One producer on every call.', x: 80, y: 890, w: 600, h: 100, size: 22, weight: 400, tracking: '0.04em', lineHeight: 1.4, case: 'upper', color: G(200) }),
  vr(1060, 100, 890, G(700)),
  ...LEDGER.flatMap(([k, v], i) => [
    text({ ...CHROME, text: k, x: 1140, y: 271 + i * 96 + 18, w: 110, h: 16 }),
    text({ font: 'sans', text: v, x: 1274, y: 271 + i * 96, w: 566, h: 46, size: 38, weight: 500, tracking: '-0.005em', lineHeight: 1.2, case: 'none', color: G(50) }),
    hr(1140, 271 + i * 96 + 68, 700),
  ]),
  ...foot(3),
] }

const TALL = { font: 'sans', size: 180, weight: 800, tracking: '-0.025em', lineHeight: 0.86, case: 'upper', align: 'center', x: 0, w: 1920, h: 155 }
export const TALL_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter III · The Question', 'Why So Loud?'),
  text({ font: 'sans', text: '02', x: 120, y: 150, w: 300, h: 150, size: 180, weight: 200, tracking: '-0.05em', lineHeight: 0.8, case: 'none', color: G(800) }),
  text({ ...TALL, text: 'Why so', y: 153, color: G(100) }),
  text({ ...TALL, text: 'much', y: 308, color: G(50) }),
  text({ ...TALL, text: 'so loud,', y: 463, italic: true, weight: 400, color: G(300) }),
  text({ ...TALL, text: 'when the work', y: 618, weight: 200, color: G(200) }),
  text({ ...TALL, text: 'speaks.', y: 773, color: G(50) }),
  text({ ...CHROME, text: 'Tall · Mixed Weights', x: 1632, y: 532, w: 400, h: 16, align: 'center', rotate: 90 }),
  ...foot(4),
] }

export const MANIFESTO_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter IV · A Position', 'What We Do'),
  text({ font: 'sans', text: 'We partner with creative teams, agencies, and brands to produce commercial and branded content with precision, skill, and calm efficiency.', x: 160, y: 200, w: 1600, h: 680, size: 132, weight: 400, tracking: '-0.025em', lineHeight: 1, case: 'none', valign: 'center', color: G(50) }),
  ...foot(5),
] }

export const SPATIAL_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter V · The Word', 'Hold This One'),
  text({ ...DISPLAY, text: 'calm.', x: 0, y: 372, w: 1920, h: 336, size: 420, lineHeight: 0.8, tracking: '-0.06em', align: 'center' }),
  text({ ...CHROME, text: 'Adjective · Method · Promise', x: 0, y: 964, w: 1920, h: 16, align: 'center', italic: true, color: G(500) }),
  ...foot(6),
] }

const corner = (x, y) => rule({ x, y, w: 18, h: 18, color: BG, stroke: G(500) })
export const LOOK_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter VI · The Mark', 'The O'),
  rule({ x: 240, y: 140, w: 1440, h: 820, stroke: G(800) }),
  text({ ...DISPLAY, text: 'O', x: 240, y: 140, w: 1440, h: 820, size: 660, lineHeight: 0.85, tracking: '-0.06em', align: 'center', valign: 'center' }),
  corner(232, 132), corner(1670, 132), corner(232, 930), corner(1670, 930),
  text({ ...CHROME, text: 'The O mark, drawn from the wordmark, 2026', x: 80, y: 1014, w: 900, h: 16 }),
  text({ ...CHROME, text: '07 / 14', x: 940, y: 1014, w: 900, h: 16, align: 'right' }),
] }

export const QUOTE_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter VII · From the Founder', 'Note · 2026'),
  text({ font: 'sans', text: '"', x: 100, y: 100, w: 200, h: 200, size: 280, weight: 700, lineHeight: 0.7, tracking: '0', case: 'none', color: G(800) }),
  text({ font: 'sans', text: 'Whether the idea is fully formed or still unfolding, we guide it into reality with clarity and care.', x: 200, y: 372, w: 1520, h: 280, size: 88, weight: 400, tracking: '-0.012em', lineHeight: 1.05, case: 'none', color: G(50) }),
  hr(200, 740, 80, G(500)),
  text({ ...CHROME, text: 'Bríet Ólína Kristinsdóttir · Founder & Executive Producer', x: 308, y: 732, w: 1200, h: 16, color: G(300) }),
  ...foot(8),
] }

const INDEX_ROWS = [
  ['01', 'Dolce & Gabbana — The One ft. Madonna', 'Dolce & Gabbana', 'New York', 'Advertisement'],
  ['02', 'Kate Spade — New York', 'Kate Spade', 'New York', 'Advertisement'],
  ['03', 'Jimmy Choo × Timberland', 'Jimmy Choo', 'New York', 'Advertisement'],
  ['04', 'The North Face — Location', 'The North Face', 'Iceland', 'Advertisement'],
  ['05', 'Office Magazine Cover ft. Solange', 'Office Magazine', 'New York', 'Cover'],
  ['06', 'Zara Kids — Iceland', 'Zara Kids', 'Iceland', 'Lookbook'],
]
const COLS = [80, 160, 924, 1229, 1534]
const COLW = [80, 764, 305, 305, 305]
const DIM = { font: 'mono', size: 24, weight: 400, tracking: '0', lineHeight: 1, case: 'none', color: G(400) }
export const INDEX_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter VIII · Selected Work', 'Six of Twenty-Six'),
  text({ font: 'sans', text: 'The Work.', x: 80, y: 130, w: 800, h: 90, size: 88, weight: 700, tracking: '-0.025em', lineHeight: 1, case: 'none', color: G(50) }),
  text({ ...CHROME, text: 'Six Projects · Full Index at kolkrabbi.io', x: 1040, y: 130, w: 800, h: 90, align: 'right', valign: 'end', case: 'none' }),
  ...['No.', 'Title', 'Client', 'Location', 'Format'].map((h, c) => text({ ...CHROME, text: h, x: COLS[c], y: 298, w: COLW[c], h: 16 })),
  hr(80, 332, 1760, G(700)),
  ...INDEX_ROWS.flatMap((r, i) => {
    const top = 332 + i * 88
    return [
      text({ font: 'sans', text: r[0], x: COLS[0], y: top + 26, w: COLW[0], h: 36, size: 30, weight: 500, tracking: '-0.01em', lineHeight: 1, case: 'none', color: G(300) }),
      text({ font: 'sans', text: r[1], x: COLS[1], y: top + 26, w: COLW[1], h: 36, size: 36, weight: 500, tracking: '-0.015em', lineHeight: 1, case: 'none', color: G(50) }),
      text({ ...DIM, text: r[2], x: COLS[2], y: top + 26, w: COLW[2], h: 36, valign: 'center' }),
      text({ ...DIM, text: r[3], x: COLS[3], y: top + 26, w: COLW[3], h: 36, valign: 'center' }),
      text({ ...DIM, text: r[4], x: COLS[4], y: top + 26, w: COLW[4], h: 36, valign: 'center' }),
      hr(80, top + 88, 1760),
    ]
  }),
  ...foot(9),
] }

const DESC = { font: 'sans', size: 26, weight: 300, tracking: '0', lineHeight: 1.45, case: 'none', color: G(300), w: 600, h: 113, y: 867 }
export const DUO_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter IX · Two Formats', 'Film · Stills'),
  text({ ...CHROME, text: 'Primary · 01', x: 140, y: 170, w: 760, h: 16 }),
  text({ ...DISPLAY, text: 'film', x: 140, y: 460, w: 760, h: 190, size: 220, lineHeight: 0.86, tracking: '-0.025em' }),
  text({ ...DESC, text: 'Commercials, branded content, loops. From treatment to delivery, one producer on set and on every call in between.', x: 140 }),
  vr(960, 130, 850, G(700)),
  text({ ...CHROME, text: 'Counterweight · 02', x: 1020, y: 170, w: 760, h: 16 }),
  text({ ...DISPLAY, text: 'stills.', x: 1020, y: 460, w: 760, h: 190, size: 200, weight: 200, italic: true, lineHeight: 0.86, tracking: '-0.02em', color: G(200) }),
  text({ ...DESC, text: 'Campaigns, editorial, lookbooks. The same crew, the same calm, a different camera — and the same care for the frame.', x: 1020 }),
  ...foot(10),
] }

const SPEC = [
  ['Display · Narrow', 'KOLKRABBI', { font: 'sans', size: 96, weight: 800, tracking: '-0.03em', color: G(50) }],
  ['Editorial · Tight', 'female run · full service', { font: 'mono', size: 96, weight: 200, italic: true, tracking: '-0.015em', color: G(300) }],
  ['Title · Wide', 'NY · LA · MIA · LDN · PAR · ISL', { font: 'sans', size: 88, weight: 600, tracking: '-0.025em', color: G(50) }],
  ['Headline · Tall', 'calm is a method', { font: 'sans', size: 96, weight: 500, tracking: '-0.02em', color: G(200) }],
  ['Display · Spatial', 'calm.', { font: 'sans', size: 96, weight: 700, tracking: '-0.04em', color: G(50) }],
]
export const SPECIMEN_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter X · The Alphabet', 'One Family · Five Voices'),
  text({ font: 'sans', text: 'A House Voice.', x: 80, y: 130, w: 1000, h: 90, size: 88, weight: 700, tracking: '-0.025em', lineHeight: 1, case: 'none', color: G(50) }),
  ...SPEC.flatMap(([k, v, s], i) => {
    const top = 280 + i * 138
    return [
      hr(80, top, 1760),
      text({ ...CHROME, text: k, x: 80, y: top, w: 200, h: 138, valign: 'center' }),
      text({ lineHeight: 1, case: 'none', ...s, text: v, x: 320, y: top, w: 1520, h: 138, valign: 'center' }),
    ]
  }),
  hr(80, 970, 1760),
  ...foot(11),
] }

const SIG = [
  ['Listen', 'We listen closely and move deliberately — the brief is heard before it is answered.'],
  ['Handle', 'We handle the details so you can stay focused on the bigger picture.'],
  ['Deliver', 'On time, on budget, on brand. And on the day, on set.'],
]
export const CONTRAST_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter XI · The Promise', 'What We Stand For'),
  text({ font: 'sans', text: "Great production feels effortless,\neven when it isn't.", x: 80, y: 160, w: 1760, h: 290, size: 150, weight: 200, tracking: '-0.02em', lineHeight: 0.95, case: 'none', color: G(50) }),
  hr(80, 758, 1760),
  ...SIG.flatMap(([k, v], i) => [
    text({ ...CHROME, text: k, x: 80 + i * 607, y: 798, w: 547, h: 16 }),
    text({ font: 'sans', text: v, x: 80 + i * 607, y: 828, w: 547, h: 122, size: 30, weight: 400, tracking: '-0.005em', lineHeight: 1.35, case: 'none', color: G(100) }),
  ]),
  ...foot(12),
] }

const CREDITS = [
  ['Studio', [['Bríet Ólína Kristinsdóttir', 'Founder · Executive Producer'], ['Production', 'New York, NY'], ['Collaborators', 'Trusted crews, worldwide']]],
  ['Offices', [['New York · Los Angeles', 'United States'], ['Miami', 'United States'], ['London · Paris · Iceland', 'Europe']]],
  ['Contact', [['hello@kolkrabbi.io', "Let's talk"], ['@kolkrabbi_', 'Instagram'], ['kolkrabbi.io', 'The work']]],
]
export const CREDITS_DOC = { bg: BG, layers: [
  ...eyebrow('Chapter XII · The Colophon', 'Who & Where'),
  text({ font: 'sans', text: 'A Small House.', x: 120, y: 150, w: 1200, h: 120, size: 120, weight: 700, tracking: '-0.025em', lineHeight: 0.95, case: 'none', color: G(50) }),
  ...CREDITS.flatMap(([h, items], c) => {
    const x = 120 + c * 580
    return [
      text({ ...CHROME, text: h, x, y: 320, w: 520, h: 16 }),
      hr(x, 354, 520),
      ...items.flatMap(([main, small], i) => [
        text({ font: 'sans', text: main, x, y: 382 + i * 73, w: 520, h: 37, size: 32, weight: 500, tracking: '-0.005em', lineHeight: 1.15, case: 'none', color: G(100) }),
        text({ ...CHROME, text: small, x, y: 382 + i * 73 + 41, w: 520, h: 16, color: G(500) }),
      ]),
    ]
  }),
  ...foot(13),
] }

export const END_DOC = { bg: BG, layers: [
  ...eyebrow('End · Thank You', 'Reykjavík · 2026'),
  text({ ...CHROME, text: 'Full Service · Female Run', x: 0, y: 260, w: 1920, h: 16, align: 'center', color: G(300) }),
  text({ ...DISPLAY, text: 'O', x: 0, y: 336, w: 1920, h: 368, size: 460, lineHeight: 0.8, tracking: '-0.05em', align: 'center' }),
  hr(840, 744, 240, G(500)),
  text({ ...CHROME, text: 'kolkrabbi · io', x: 0, y: 805, w: 1920, h: 16, align: 'center', color: G(500) }),
  ...foot(14),
] }
