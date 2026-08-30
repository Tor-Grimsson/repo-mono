import { useParams, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ShortcutsOverlay } from '@kolkrabbi/kol-shell'
import PrintsGrid from './prints/PrintsGrid'
import PrintDetailOverlay from './prints/PrintDetailOverlay'
import { prints, getPrintBySlug } from '../data/prints'
import { isTypingTarget, shuffle, rollKinds } from '../lib/keys'

/* THE ORDER LIVES HERE, not in the grid (2026-08-28). It was `useState` inside
 * PrintsGrid, which made it invisible to the overlay — so Shift+Arrow would have
 * stepped through the DATA order while the grid showed another, and `r` had
 * nothing it could re-roll. One list, both children read it.
 *
 * The keyboard set, all of it on this route:
 *   ← / →              step images inside the open print   (the overlay's, it owns the index)
 *   Shift+← / Shift+→  step prints, wrapping first↔last    (here)
 *   a / p              pin every card to artwork / to the print photo
 *   r                  re-roll the order + the flips, respecting any a/p pin
 *   s                  this sheet
 *
 * The sheet is kol-shell's `ShortcutsOverlay`, not a local one — it takes the
 * same `[{ section, items: [{ label, combo }] }]` array a settings page would
 * render, so the keymap is declared ONCE, right here beside the bindings. */

/* The keymap, in the shape ShortcutsOverlay reads. Bindings live in the effect
 * below and in the overlay — this array is the DISPLAY of them, so a key added
 * there has to be added here too; there is no way to derive one from the other
 * without binding strings, which the DS component deliberately does not do. */
const SHORTCUTS = [
  {
    section: 'Catalog',
    items: [
      { id: 'artwork', label: 'Pin to artwork (again to unpin)', combo: 'A' },
      { id: 'print', label: 'Pin to print photo (again to unpin)', combo: 'P' },
      { id: 'reroll', label: 'Re-roll — keeps whatever A / P pinned', combo: 'R' },
      { id: 'sheet', label: 'This sheet', combo: 'S' },
    ],
  },
  {
    section: 'Open print',
    items: [
      { id: 'img', label: 'Previous / next image', combo: '← →' },
      { id: 'print-step', label: 'Previous / next print', combo: '⇧ ← →' },
      { id: 'close', label: 'Close', combo: 'Esc' },
    ],
  },
]
export default function Prints() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [ordered, setOrdered] = useState(() => shuffle(prints))
  /* 'random' is the DEFAULT and the page's actual look: every card lands on its
   * artwork or its print photo by coin flip. `a` / `p` pin the whole wall to
   * one of them; `r` re-rolls the flips together with the order. */
  const [imageKind, setImageKind] = useState('random')
  const [rolls, setRolls] = useState(() => rollKinds(prints))
  const [showShortcuts, setShowShortcuts] = useState(false)

  const print = slug ? getPrintBySlug(slug) : null
  const isOverlayOpen = Boolean(print)

  const handleCardClick = useCallback((rect, printSlug) => {
    navigate(`/prints/${printSlug}`)
  }, [navigate])

  const handleClose = useCallback(() => {
    navigate('/prints')
  }, [navigate])

  /* step is +1 / -1 through the ORDER ON SCREEN, wrapping both ends. A print
   * that fell out of the current filter is not in `ordered`, so the index lands
   * at -1 and the wrap sends you to the first — deliberate: the alternative is
   * a dead key. */
  const stepPrint = useCallback((delta) => {
    if (!slug || ordered.length === 0) return
    const i = ordered.findIndex((p) => p.slug === slug)
    const next = ordered[(i + delta + ordered.length) % ordered.length]
    if (next) navigate(`/prints/${next.slug}`)
  }, [slug, ordered, navigate])

  useEffect(() => {
    const onKey = (e) => {
      if (isTypingTarget(e) || e.metaKey || e.ctrlKey || e.altKey) return

      if (e.shiftKey) {
        if (e.key === 'ArrowRight') { e.preventDefault(); stepPrint(1) }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); stepPrint(-1) }
        return
      }
      /* bare letters — the overlay's own ← / → are untouched by these */
      const k = e.key.toLowerCase()
      /* pressing the pin you are already on releases it — without that there is
       * no way back to the mixed wall short of a reload */
      if (k === 'a') { e.preventDefault(); setImageKind((v) => (v === 'artwork' ? 'random' : 'artwork')) }
      else if (k === 'p') { e.preventDefault(); setImageKind((v) => (v === 'print' ? 'random' : 'print')) }
      /* `r` RESPECTS THE PIN (user 2026-08-29): it always re-orders, and the
       * flips it re-rolls only show while nothing is pinned. After `a` you get
       * a fresh order of artwork; after `p`, of print photos. It is a re-roll
       * of what you are looking at, not a reset of it. */
      else if (k === 'r') {
        e.preventDefault()
        setOrdered(shuffle(prints))
        setRolls(rollKinds(prints))
      }
      /* toggle, not open — `s` twice should not need Escape */
      else if (k === 's') { e.preventDefault(); setShowShortcuts((v) => !v) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stepPrint])

  return (
    <>
      <PrintsGrid
        prints={ordered}
        imageKind={imageKind}
        rolls={rolls}
        onCardClick={handleCardClick}
        activeSlug={slug}
      />
      <AnimatePresence>
        {isOverlayOpen && (
          <PrintDetailOverlay
            key={slug}
            print={print}
            onClose={handleClose}
            keysEnabled={!showShortcuts}
          />
        )}
      </AnimatePresence>
      {showShortcuts && (
        <ShortcutsOverlay shortcuts={SHORTCUTS} onClose={() => setShowShortcuts(false)} />
      )}
    </>
  )
}
