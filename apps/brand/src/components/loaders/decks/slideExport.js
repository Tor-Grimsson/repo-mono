import { SLIDE_W, SLIDE_H, resolveColor } from './slideDoc'
import { familyFor, googleFontFaces, isBrandFont } from './webFonts'

/**
 * slideExport — a slide document out as SVG, and SVG out as a PNG blob.
 *
 * The APPROACH is kol-fxr's (`compose/build.js`), on their advice to copy the
 * pattern rather than import it: build the picture from the DOCUMENT and then
 * rasterise, instead of screenshotting the DOM. Their builder speaks their layer
 * schema; ours speaks ours. What carries over is the shape and the two traps.
 *
 * TRAP 1 — FONTS. A standalone SVG rasterised through an `<img>` gets NO access
 * to the page's fonts, and no access to the network either: the browser treats it
 * as an isolated document, so a `url(/fonts/…)` inside it never loads and every
 * text layer silently falls back to a system face. fxr solves it by outlining
 * glyphs with opentype.js before the build. We do not, because both our families
 * are VARIABLE — one file covers every weight — so embedding the actual woff2 as
 * a base64 `@font-face` is three fetches and keeps the text as text. `loadFontCss`
 * must be awaited BEFORE the synchronous build, which is the same ordering rule
 * fxr's outlining has, for the same reason.
 *
 * TRAP 2 — `var()` DOES NOT RESOLVE. Every colour in the fourteen documents is a
 * `var(--grey-N)` token, injected by deckStyles into the page. Inside the isolated
 * SVG there is no such custom property and the fill comes out black-on-black.
 * `resolveColor` (slideDoc) maps the token to its hex, which is why that table is
 * shared rather than copied.
 *
 * KNOWN FIDELITY GAP, deliberate: `<text>` does not wrap. Our renderer is a flex
 * box with `white-space: pre-line`, so an explicit `\n` becomes a `<tspan>` here
 * and matches, but a line long enough to WRAP inside its box will wrap on the
 * stage and run on in the export. Every layer in the fourteen documents is either
 * single-line or explicitly broken, so nothing today is affected. The fix, when it
 * is needed, is measuring and breaking here — not switching to foreignObject,
 * which reintroduces trap 1.
 *
 * ponytail: no PDF. It exists nowhere in the estate (kol-fxr confirmed) and means
 * a new dependency, which is the user's call. `slideToSvg` per slide is the half
 * a PDF writer would need, and it is done.
 */

/* JetBrains Mono is variable — one file per style covers the whole weight range. Right Grotesk
   ships as STATIC cuts here (public/fonts/right-grotesk), so the weights a deck uses are listed
   one file each; a weight not listed falls back to the nearest the browser can synthesise. */
const FONT_FILES = [
  { family: 'Right Grotesk', style: 'normal', weight: '400', url: '/fonts/right-grotesk/PPRightGrotesk-Regular.woff2' },
  { family: 'Right Grotesk', style: 'normal', weight: '500', url: '/fonts/right-grotesk/PPRightGrotesk-Medium.woff2' },
  { family: 'Right Grotesk', style: 'normal', weight: '700', url: '/fonts/right-grotesk/PPRightGrotesk-Bold.woff2' },
  { family: 'Right Grotesk', style: 'normal', weight: '900', url: '/fonts/right-grotesk/PPRightGrotesk-Black.woff2' },
  { family: 'JetBrains Mono',      style: 'normal', weight: '100 800', url: '/fonts/jetbrains-mono/JetBrainsMono-Variable.woff2' },
  { family: 'JetBrains Mono',      style: 'italic', weight: '100 800', url: '/fonts/jetbrains-mono/JetBrainsMono-Italic-Variable.woff2' },
]



let fontCssPromise = null

const toBase64 = (buf) => {
  const bytes = new Uint8Array(buf)
  let s = ''
  /* chunked — String.fromCharCode(...bytes) blows the argument limit on a 200 kB
     font and throws RangeError rather than returning a wrong answer */
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(s)
}

/**
 * Fetch the woff2 files and return `@font-face` rules with the fonts inlined.
 * Cached for the session — three fonts is ~380 kB and a deck export is per-slide.
 * Await this before `slideToSvg`; a build without it renders in a system face.
 */
export function loadFontCss() {
  if (fontCssPromise) return fontCssPromise
  fontCssPromise = Promise.all(FONT_FILES.map(async (f) => {
    const res = await fetch(f.url)
    if (!res.ok) throw new Error(`font ${f.url} → ${res.status}`)
    const b64 = toBase64(await res.arrayBuffer())
    return `@font-face{font-family:"${f.family}";font-style:${f.style};font-weight:${f.weight};src:url(data:font/woff2;base64,${b64}) format("woff2");}`
  })).then((rules) => rules.join('')).catch((err) => {
    fontCssPromise = null   /* a failed fetch must not poison every later export */
    throw err
  })
  return fontCssPromise
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const ANCHOR = { left: 'start', center: 'middle', right: 'end' }

function textLayer(l) {
  const lines = String(l.text ?? '').split('\n')
  const size = l.size ?? 16
  const lh = (l.lineHeight ?? 1.2) * size
  const anchor = ANCHOR[l.align] ?? 'start'
  const x = l.align === 'center' ? l.x + l.w / 2 : l.align === 'right' ? l.x + l.w : l.x

  /* The renderer is a flex COLUMN: `justify-content` places the whole text block
     inside the box, then each line sits on its own baseline. Reproduce that as a
     block offset plus per-line advance. 0.78em over the cap is the usual
     first-baseline approximation for an uppercase-heavy deck. */
  const block = lines.length * lh
  const top = l.valign === 'center' ? l.y + (l.h - block) / 2
    : l.valign === 'end' ? l.y + l.h - block
    : l.y
  const first = top + size * 0.78

  const attrs = [
    `x="${x}"`, `y="${first}"`,
    `font-family="${familyFor(l.font)}, sans-serif"`,
    `font-size="${size}"`,
    `font-weight="${l.weight ?? 400}"`,
    l.italic ? 'font-style="italic"' : '',
    l.tracking ? `letter-spacing="${l.tracking}"` : '',
    `text-anchor="${anchor}"`,
    `fill="${resolveColor(l.color) ?? '#FFFFFF'}"`,
    /* `text-transform` is a CSS property, not an SVG attribute — an uppercase
       layer has to be uppercased in the STRING or it exports as typed. */
  ].filter(Boolean).join(' ')

  const body = lines.map((line, i) => {
    const t = l.case === 'upper' ? line.toLocaleUpperCase() : line
    return `<tspan x="${x}"${i ? ` dy="${lh}"` : ''}>${esc(t)}</tspan>`
  }).join('')

  /* `stroke` on a TEXT layer is a BOX, not an outline on the glyphs — the
     renderer applies it as a CSS `border` on the layer div, which is how the
     cover's boxed "O" mark is drawn. Without this the box vanishes from the
     export and only the letter survives. */
  const box = l.stroke
    ? `<rect x="${l.x}" y="${l.y}" width="${l.w}" height="${l.h}" fill="none" stroke="${resolveColor(l.stroke)}" stroke-width="1"/>`
    : ''

  return `${box}<text ${attrs}>${body}</text>`
}

function layerSvg(l) {
  if (l.visible === false) return ''
  const rot = typeof l.rotate === 'number' && l.rotate
    ? ` transform="rotate(${l.rotate} ${l.x + l.w / 2} ${l.y + l.h / 2})"` : ''
  if (l.type === 'rule') {
    const stroke = resolveColor(l.stroke)
    return `<rect x="${l.x}" y="${l.y}" width="${l.w}" height="${l.h}" fill="${resolveColor(l.color) ?? 'none'}"${stroke ? ` stroke="${stroke}"` : ''}${rot}/>`
  }
  if (l.type === 'image') {
    if (!l.src) return ''
    /* R2 answers `access-control-allow-origin: *`, so the rasterising canvas is
       not tainted by these. A future non-CORS host would need the bytes inlined. */
    const fit = l.fit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'
    return `<image href="${esc(l.src)}" x="${l.x}" y="${l.y}" width="${l.w}" height="${l.h}" preserveAspectRatio="${fit}"${rot}/>`
  }
  return rot ? `<g${rot}>${textLayer(l)}</g>` : textLayer(l)
}

/**
 * One slide document → an SVG string. Synchronous by design: pass the `fontCss`
 * from `loadFontCss()`, already awaited.
 */
export function slideToSvg(doc, fontCss = '') {
  const body = doc.layers.map(layerSvg).join('')
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${SLIDE_W}" height="${SLIDE_H}" viewBox="0 0 ${SLIDE_W} ${SLIDE_H}">`,
    fontCss ? `<defs><style type="text/css">${fontCss}</style></defs>` : '',
    `<rect width="${SLIDE_W}" height="${SLIDE_H}" fill="${resolveColor(doc.bg) ?? '#000000'}"/>`,
    body,
    '</svg>',
  ].join('')
}

/** An SVG string → a PNG blob at `scale`× the 1920×1080 stage. */
export function svgToPngBlob(svg, scale = 1) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(SLIDE_W * scale)
      canvas.height = Math.round(SLIDE_H * scale)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('canvas produced no blob'))), 'image/png')
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('the SVG did not decode')) }
    img.src = url
  })
}

/**
 * Every `@font-face` this document needs: the two brand families always, plus
 * any Google family a text layer names. Without the second half a deck set in
 * a web font looks right on screen and exports in a system fallback — the same
 * silent failure as trap 1, arriving from the other direction.
 */
export async function fontCssForDoc(doc) {
  const families = [...new Set(doc.layers.filter((l) => l.type === 'text').map((l) => l.font))]
    .filter((f) => f && !isBrandFont(f))
  const extra = await Promise.all(families.map(googleFontFaces))
  return (await loadFontCss()) + extra.join('')
}

/** The whole path for one slide: fonts, build, rasterise. */
export async function slideToPngBlob(doc, scale = 1) {
  return svgToPngBlob(slideToSvg(doc, await fontCssForDoc(doc)), scale)
}

/**
 * The whole deck as one multi-page PDF.
 *
 * Pages are the slide's NATIVE 1920x1080, so the geometry is the design's and
 * nothing is re-laid-out. Each page is the rasterised slide rather than vector
 * text: the SVG path already solves fonts by embedding them, and re-solving
 * that for PDF would mean shipping glyph outlines, which is the opentype.js
 * dependency kol-fxr carries and we do not.
 *
 * `pdf-lib` is imported DYNAMICALLY — it is ~19 MB unpacked and a deck editor
 * that never exports a PDF should not pay for it in the entry chunk.
 *
 * Sequential, like the all-slides PNG path, for the same reason: each page
 * rasterises a full-size canvas.
 */
export async function deckToPdfBlob(slides, { scale = 1, onProgress } = {}) {
  const { PDFDocument } = await import('pdf-lib')
  const pdf = await PDFDocument.create()

  for (let i = 0; i < slides.length; i += 1) {
    onProgress?.(i, slides.length)
    const blob = await slideToPngBlob(slides[i].doc, scale)
    const png = await pdf.embedPng(await blob.arrayBuffer())
    const page = pdf.addPage([SLIDE_W, SLIDE_H])
    page.drawImage(png, { x: 0, y: 0, width: SLIDE_W, height: SLIDE_H })
  }

  return new Blob([await pdf.save()], { type: 'application/pdf' })
}
