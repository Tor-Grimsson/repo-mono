/**
 * webFonts — families beyond the two the brand ships, via Google Fonts.
 *
 * The user asked, 2026-09-03: *"Font could allow goole api acces??"*.
 *
 * THE SHAPE THIS TAKES, and why not the whole catalogue. A deck built in the
 * brand app is brand material, and a free-text field over 1,800 families is an
 * invitation to set a client deck in something off-system. So the picker offers
 * the two BRAND families first and a short curated list after them — enough to
 * cover a co-branded deck or a client's own typeface without turning the deck
 * into a type sampler. The list is data; lengthening it is one line.
 *
 * TWO PLACES A FAMILY HAS TO ARRIVE, and the second is the one that bites:
 *   1. the SCREEN — a stylesheet link, which `ensureFont` injects once.
 *   2. the EXPORT — a standalone SVG has no network, so the exporter must inline
 *      the actual woff2 as base64 (slideExport, trap 1). `googleFontFaces`
 *      fetches Google's CSS, pulls the woff2 URLs out of it and inlines them.
 *
 * Getting 1 without 2 is the silent failure: the deck looks right on screen and
 * every export falls back to a system face. That is the same trap kol-fxr warned
 * about for outlined glyphs, arriving by a different route.
 *
 * `fonts.gstatic.com` serves the font files with `access-control-allow-origin:
 * *`, which is what makes the base64 step possible at all.
 */

/* The two the brand actually ships, then a curated set. `local: true` means the
   file is already served from /fonts and needs no network at all. */
export const FONT_OPTIONS = [
  { value: 'sans', label: 'Right Grotesk', family: 'Right Grotesk', local: true },
  { value: 'mono', label: 'JetBrains Mono', family: 'JetBrains Mono', local: true },
  { value: 'Inter', label: 'Inter', family: 'Inter' },
  { value: 'Instrument Serif', label: 'Instrument Serif', family: 'Instrument Serif' },
  { value: 'DM Sans', label: 'DM Sans', family: 'DM Sans' },
  { value: 'Space Grotesk', label: 'Space Grotesk', family: 'Space Grotesk' },
  { value: 'Archivo', label: 'Archivo', family: 'Archivo' },
  { value: 'Fraunces', label: 'Fraunces', family: 'Fraunces' },
]

const BRAND = new Set(['sans', 'mono'])
export const isBrandFont = (v) => BRAND.has(v)

/** The CSS font-family string for a layer's `font` value. */
export function familyFor(value) {
  if (value === 'mono') return 'JetBrains Mono'
  if (value === 'sans' || !value) return 'Right Grotesk'
  return value
}

const cssUrl = (family) =>
  `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}:ital,wght@0,200..800;1,200..800&display=swap`

const injected = new Set()

/** Put a Google family on the PAGE. Idempotent; brand families are a no-op. */
export function ensureFont(value) {
  if (!value || isBrandFont(value) || injected.has(value)) return
  injected.add(value)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = cssUrl(value)
  link.dataset.deckFont = value
  document.head.appendChild(link)
}

const faceCache = new Map()

/**
 * `@font-face` rules with the woff2 INLINED, for the export path.
 * Returns '' for brand families — slideExport already embeds those from /fonts.
 */
export async function googleFontFaces(value) {
  if (!value || isBrandFont(value)) return ''
  if (faceCache.has(value)) return faceCache.get(value)

  const p = (async () => {
    /* Google serves woff2 only to browser-looking UAs; a plain fetch from the
       page gets the modern CSS because the browser sends its own UA. */
    const css = await (await fetch(cssUrl(value))).text()

    /* REWRITE WHOLE @font-face BLOCKS, do not harvest bare URLs.
       Google splits a family into SUBSETS — latin, latin-ext, cyrillic, greek,
       vietnamese — one `@font-face` each, distinguished ONLY by `unicode-range`.
       The first version took `urls.slice(0, 2)` and emitted its own rule with no
       unicode-range, which silently picked whichever subset happened to come
       first (usually cyrillic) and rendered nothing: an export test showed
       IDENTICAL ink with and without the embedded face. Keeping each block whole
       and swapping only its `src` preserves the range that makes it apply. */
    const blocks = [...css.matchAll(/@font-face\s*{[^}]*}/g)].map((m) => m[0])
    /* Latin covers a deck; the other subsets are megabytes nobody set. */
    const latin = blocks.filter((b) => /U\+0000-00FF|U\+0100-02[0-9A-F]{2}/i.test(b))
    const wanted = (latin.length ? latin : blocks).slice(0, 2)

    const faces = await Promise.all(wanted.map(async (block) => {
      const url = block.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/)?.[1]
      if (!url) return ''
      const buf = await (await fetch(url)).arrayBuffer()
      const bytes = new Uint8Array(buf)
      let bin = ''
      for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
      return block.replace(/src:\s*url\([^)]+\)\s*format\([^)]+\)/,
        `src:url(data:font/woff2;base64,${btoa(bin)}) format("woff2")`)
    }))
    return faces.filter(Boolean).join('')
  })().catch(() => '')   /* a font that will not load must not fail the export */

  faceCache.set(value, p)
  return p
}
