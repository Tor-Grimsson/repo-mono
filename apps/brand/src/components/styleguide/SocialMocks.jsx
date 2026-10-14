import KolLogo from '../../brand/logos/KolLogo'

/* KOLKRABBI's palette (brand pass 2026-10-14) — was Another Creation's champagne / burgundy. The
 * hues are @kolkrabbi/kol-brand's ramps: cream 300, yellow 300 (the accent anchor), grey 50 / 900. */
const PAL = {
  cream:   '#F5EBD8',
  yellow:  '#FFCF33',
  paper:   '#FCFBFB',
  ink:     '#131316',
}

const MONO    = "'Right Grotesk Mono', monospace"
const NARROW  = "'Right Grotesk Narrow', 'Right Grotesk', sans-serif"

const monoCaps = { fontFamily: MONO, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }

const photoBg = '#363639'
/* the studio's own photography (brand/images/kol-photoshoot) */
const PHOTO = '/images/kol-photoshoot/thg-01.jpg'
const PHOTO_TALL = '/images/kol-photoshoot/thg-03.jpg'

// ─── IG post — photo + mark (1:1) ─────────────────────────────────

export function PostPhoto() {
  return (
    <div
      className="aspect-square relative rounded-sm overflow-hidden"
      style={{ background: `${photoBg} url(${PHOTO}) center / cover`, color: PAL.paper }}
    >
      <KolLogo variant="logomark" className="absolute bottom-4 right-4 w-1/4" />
    </div>
  )
}

// ─── IG post — type-driven quote (1:1) ────────────────────────────

export function PostType() {
  return (
    <div
      className="aspect-square relative flex items-center justify-center p-8 rounded-sm"
      style={{ background: PAL.cream, color: PAL.ink }}
    >
      <p style={{ fontFamily: NARROW, fontSize: 20, fontWeight: 500, lineHeight: 1.15, textAlign: 'center', letterSpacing: '-0.01em' }}>
        Typefaces &<br/>design systems.
      </p>
      <KolLogo variant="logomark" className="absolute bottom-4 left-4 w-1/5" />
    </div>
  )
}

// ─── IG post — product flat (1:1) ─────────────────────────────────

export function PostProduct() {
  return (
    <div
      className="aspect-square relative flex flex-col p-6 rounded-sm"
      style={{ background: PAL.paper, color: PAL.ink }}
    >
      <div
        className="flex-1 flex items-center justify-center rounded-sm"
        style={{ background: PAL.cream }}
      >
        <span style={{ ...monoCaps, fontSize: 8, opacity: 0.35 }}>specimen</span>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p style={{ ...monoCaps, fontSize: 7, opacity: 0.5 }}>Typeface</p>
          <p style={{ fontFamily: NARROW, fontSize: 14, fontWeight: 500 }}>Málrómur</p>
        </div>
        <KolLogo variant="logomark" className="w-1/6" />
      </div>
    </div>
  )
}

// ─── IG post — editorial split (1:1) ──────────────────────────────

export function PostEditorial() {
  return (
    <div className="aspect-square grid grid-cols-2 rounded-sm overflow-hidden">
      <div style={{ background: photoBg }} />
      <div
        className="relative flex flex-col justify-between p-5"
        style={{ background: PAL.cream, color: PAL.ink }}
      >
        <p style={{ ...monoCaps, fontSize: 7, opacity: 0.5 }}>2026</p>
        <div>
          <p style={{ fontFamily: NARROW, fontSize: 16, fontWeight: 500, lineHeight: 1.1 }}>
            Kolkrabbi<br/>Vinnustofa
          </p>
          <KolLogo variant="logomark" className="w-1/3 mt-3" />
        </div>
      </div>
    </div>
  )
}

// ─── IG story — photo full-bleed (9:16) ───────────────────────────

export function StoryPhoto() {
  return (
    <div
      className="aspect-[9/16] relative rounded-sm overflow-hidden"
      style={{ background: `#363639 url(${PHOTO_TALL}) center / cover`, color: PAL.paper }}
    >
      <KolLogo variant="logomark" className="absolute bottom-6 left-6 w-1/3" />
    </div>
  )
}

// ─── IG story — type-driven (9:16) ────────────────────────────────

export function StoryType() {
  return (
    <div
      className="aspect-[9/16] relative flex items-center justify-center p-8 rounded-sm"
      style={{ background: PAL.ink, color: PAL.paper }}
    >
      <p style={{ fontFamily: NARROW, fontSize: 18, fontWeight: 500, lineHeight: 1.2, textAlign: 'center', letterSpacing: '-0.01em' }}>
        Kolkrabbi<br/>Vinnustofa
      </p>
      <KolLogo variant="logomark" className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1/3" />
    </div>
  )
}

// ─── Profile avatar (1:1, round) ──────────────────────────────────

export function Avatar({ bg = PAL.paper, polarity = 'dark' }) {
  return (
    <div
      className="aspect-square rounded-full flex items-center justify-center overflow-hidden"
      style={{ background: bg, color: polarity === 'light' ? PAL.paper : PAL.ink }}
    >
      <KolLogo variant="logomark" className="w-1/2" />
    </div>
  )
}
