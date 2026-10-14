import { SLIDE_W, SLIDE_H } from './slideDoc'
import { ensureFont } from './webFonts'

/**
 * SlideRenderer — draws a slide document at 1920×1080, nothing scaled here.
 * Whoever holds it (SlideThumb, SlideStage) sets the zoom. Every layer carries
 * `data-layer-id`, which is what the stage's pointer router reads — the
 * renderer is the same in the editor and out of it, so what you drag is what
 * you present.
 */
/* `font` used to be the enum 'sans'|'mono'. It now also carries a Google family
   NAME (webFonts.js), so the map is a fallback rather than the whole story: a
   value that is not one of the two brand keys is used as the family itself. */
const FONT = {
  sans: "var(--kol-font-family-sans), 'Right Grotesk', system-ui, sans-serif",
  mono: 'var(--kol-font-family-mono)',
}
const fontFamilyFor = (v) => FONT[v] ?? `'${v}', ${FONT.sans}`
const JUSTIFY = { start: 'flex-start', center: 'center', end: 'flex-end' }

function Layer({ l }) {
  const box = { position: 'absolute', left: l.x, top: l.y, width: l.w, height: l.h, transform: l.rotate ? `rotate(${l.rotate}deg)` : undefined }
  if (l.type === 'image') {
    /* A fresh image layer has `src: ''` until one is picked, and `<img src="">`
       makes the browser re-request the PAGE — React warns about exactly this.
       Draw the empty box instead, which also gives the layer something to
       select and drag before it has a picture. */
    if (!l.src) {
      return <div data-layer-id={l.id} style={{ ...box, outline: '1px dashed var(--grey-500)', outlineOffset: -1 }} />
    }
    return <img data-layer-id={l.id} src={l.src} alt="" draggable={false} style={{ ...box, objectFit: l.fit, userSelect: 'none' }} />
  }
  if (l.type === 'rule') {
    return <div data-layer-id={l.id} style={{ ...box, background: l.color, border: l.stroke ? `1px solid ${l.stroke}` : undefined, boxSizing: 'border-box' }} />
  }
  return (
    <div
      data-layer-id={l.id}
      style={{
        ...box,
        display: 'flex', flexDirection: 'column', justifyContent: JUSTIFY[l.valign] ?? 'flex-start',
        fontFamily: fontFamilyFor(l.font),
        fontSize: l.size, fontWeight: l.weight, fontStyle: l.italic ? 'italic' : 'normal',
        letterSpacing: l.tracking, lineHeight: l.lineHeight,
        textTransform: l.case === 'upper' ? 'uppercase' : 'none',
        textAlign: l.align, color: l.color,
        border: l.stroke ? `1px solid ${l.stroke}` : undefined,
        whiteSpace: 'pre-line', userSelect: 'none',
      }}
    >
      {l.text}
    </div>
  )
}

export default function SlideRenderer({ doc, children }) {
  /* Ask for every non-brand family the document uses. `ensureFont` is
     idempotent and a no-op for the two local ones, so calling it on each render
     costs a Set lookup and nothing else. */
  doc.layers.forEach((l) => { if (l.type === 'text') ensureFont(l.font) })

  return (
    <div style={{ position: 'relative', width: SLIDE_W, height: SLIDE_H, overflow: 'hidden', background: doc.bg }}>
      {doc.layers.filter((l) => l.visible !== false).map((l) => <Layer key={l.id} l={l} />)}
      {/* the stage's chrome — selection, handles, guides — rides in the same
          coordinate space, so it is handed in rather than layered outside */}
      {children}
    </div>
  )
}
