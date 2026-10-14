import { useEffect, useRef, useState } from 'react'
import SlideRenderer from './SlideRenderer'

/**
 * SlideThumb — one 1920×1080 slide rendered live inside a 16:9 box.
 *
 * The layouts catalogue shows the layout, not a word for it, so the card's
 * media IS the slide. Same mechanic as `DeckShell`'s inline mode: measure the
 * box, `zoom` the stage by `width / 1920`. `zoom` rather than `transform`
 * because zoom affects layout, so the stage occupies the space it draws in.
 *
 * Two sources, one box: a `doc` (a slide document, drawn by `SlideRenderer`)
 * or a `slide` component (the hand-authored sections, until each is
 * re-authored as a document). The slide sections are `position: absolute;
 * inset: 0` when standalone (deckStyles.js), which is why the stage is
 * explicitly sized and relative. The CSS auto-injects on module load, so
 * nothing has to wrap this in `.runway-deck-stage`.
 */
export default function SlideThumb({ doc, slide: Slide, ...props }) {
  const boxRef = useRef(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width
      if (w > 0) setScale(w / 1920)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={boxRef} className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
      {/* scale 0 until measured — rendering the stage at 1:1 for one frame
          would flash a 1920px slide inside a 380px card */}
      {scale > 0 && (
        <div className="relative" style={{ width: 1920, height: 1080, zoom: scale }} aria-hidden="true">
          {doc ? <SlideRenderer doc={doc} /> : <Slide {...props} />}
        </div>
      )}
    </div>
  )
}
