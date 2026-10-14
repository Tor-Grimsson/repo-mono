import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageShell, ShortcutsOverlay } from '@kolkrabbi/kol-shell'
import { ActionButton, Button, FullscreenOverlay, ViewToggle } from '@kolkrabbi/kol-component'
import { Icon } from '@kolkrabbi/kol-icons'
import usePageTitle from '../components/hooks/usePageTitle'
import SlideThumb from '../components/loaders/decks/SlideThumb'
import SlideStage from '../components/loaders/decks/SlideStage'
import SlideInspector from '../components/loaders/decks/SlideInspector'
import { clone, newId } from '../components/loaders/decks/slideDoc'
import useDeckHistory from '../components/loaders/decks/useDeckHistory'
import { duplicateLayers, pasteLayers, applyDeckSettings, duplicateSlide } from '../components/loaders/decks/layerOps'
import { GREYS, ABSOLUTE_BLACK } from '../components/loaders/decks/slideDoc'
import DeckSettings from '../components/loaders/decks/DeckSettings'
import DeckFile from '../components/loaders/decks/DeckFile'
import { SLIDE_LAYOUTS } from '../data/templates'
import { getDeck } from '../data/decks'

/**
 * SlideDeckEdit — `/slide-deck/:slug/edit`, the deck editor (2026-09-03).
 *
 * The stage on top, the inspector rail beside it, the filmstrip under it.
 * A deck here is `{ slides: [{ id, doc }] }` — INSTANCES of slide documents,
 * so one layout can sit in a deck twice. The strip: click brings a slide up,
 * drag reorders, trash removes, the trailing tile opens the layout picker and
 * appends a fresh copy. Edit / lock top-left; play presents the deck from
 * the current slide (← → Esc); `s` opens the cheat sheet.
 *
 * PERSISTENCE (step 5): the deck autosaves to localStorage under
 * `kol.deck.<slug>` on every change, fxr's draft-key idiom — a reload keeps
 * the work. ponytail: localStorage, one browser; Sanity when the deck is
 * real, and the key is the seam to swap.
 *
 * The first open of a deck with no draft seeds from the fourteen layout
 * documents, which IS the credentials deck.
 */
/* the filmstrip rail's height: a 160-wide 16:9 tile (90) inside py-4 (32).
   The rail is fixed, so the page has to reserve this itself or the stage
   scrolls under it. */
const TILE_W = 160
const RAIL_H = Math.round((TILE_W * 9) / 16) + 32
const STAGE_GUTTER = 24   /* so the slide never sits flush on the rail's border */

const KEY = (slug) => `kol.deck.${slug}`
const seed = () => SLIDE_LAYOUTS.map((l) => ({ id: newId('slide'), doc: clone(l.doc) }))
const load = (slug) => { try { const s = localStorage.getItem(KEY(slug)); return s ? JSON.parse(s) : null } catch { return null } }

/* Grabber — the drag affordance, in two orientations (user 2026-09-03).
   kol-icons ships ONE grip glyph, `drag-handle`, and it is the vertical 2×3 dot
   grid; there is no horizontal cut in the v1 set. A 90° rotation turns 2 columns
   of 3 into 3 columns of 2, which IS the horizontal grabber — so this is a
   transform, not a second drawing, and it stays correct if the DS ever redraws
   the glyph. If a real `drag-handle-horizontal` is wanted in the set that is a
   ticket, not a local SVG. */
function Grabber({ orientation = 'vertical', size = 16 }) {
  return <Icon name="drag-handle" size={size} className={orientation === 'horizontal' ? 'rotate-90' : undefined} />
}

/* FloatingPanel — the inspector's home: a card detached from the stage, fixed
   to the viewport, dragged by its grip (user 2026-09-03: "just disconnect it,
   make it floating … in the end it will be draggable"). Starts at the top
   right; remembers where it was dropped for the session. */
function FloatingPanel({ title, children }) {
  const [pos, setPos] = useState(() => ({ x: Math.max(16, window.innerWidth - 336), y: 120 }))

  /* The listeners go on at MOUSEDOWN, not in an effect.
     THIS PANEL HAD NEVER DRAGGED. The previous version kept the drag origin in a
     ref and attached the window listeners from a `useEffect` with no dependency
     array, guarded by `if (!drag.current) return`. Writing a ref does not
     re-render, so after mousedown the effect never ran again — it had already
     bailed on the render where the ref was still null, and the listeners were
     never attached. Silent, because the cursor still changed to `grabbing` and
     the panel looked interactive. Found when the grabber went on and the drag
     was tested for the first time. */
  const onGrab = (e) => {
    e.preventDefault()
    const start = { x: pos.x, y: pos.y, sx: e.clientX, sy: e.clientY }
    const onMove = (ev) => setPos({ x: start.x + ev.clientX - start.sx, y: start.y + ev.clientY - start.sy })
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
  /* THE GRABBER IS ABSOLUTELY CENTRED (user 2026-09-04: "it should be CENTER
     absolute position"). Both of his instructions hold at once: no banner of its
     own, so it lives in the first section's header row — and CENTRED in that
     row rather than packed to the left, which is what I got wrong twice. The row
     is `relative`, the grabber `absolute left-1/2 -translate-x-1/2`, so it is
     centred on the PANEL and not pushed around by the label or the buttons
     either side of it. */
  const grab = {
    grabber: (
      <span className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-fg-32">
        <Grabber orientation="horizontal" />
      </span>
    ),
    handleProps: {
      onMouseDown: onGrab,
      role: 'button',
      'aria-label': `Move ${title}`,
      title,
      className: 'relative cursor-grab active:cursor-grabbing select-none',
    },
  }

  return (
    /* tone SECONDARY, not sunken (user 2026-09-03) — `kol-tone-secondary` paints
       the page-surface ground rather than a well, so the panel reads as a plate
       lifted off the stage instead of a hole cut into it. */
    <div className="kol-tone-secondary fixed w-80 max-h-[80vh] flex flex-col bg-surface-primary border border-oq-04 rounded-[var(--kol-radius-sm)]"
      style={{ left: pos.x, top: pos.y, zIndex: 'var(--kol-z-sticky, 20)' }}>
      <div className="p-3 overflow-y-auto">{children(grab)}</div>
    </div>
  )
}

export default function SlideDeckEdit() {
  const { slug } = useParams()
  const deck = getDeck(slug)
  usePageTitle(deck ? `Edit — ${deck.name}` : 'Edit')

  /* ONE undoable value, not three states. Selection and the active slide ride
     with the documents so an undo restores what was selected too — without that
     an undo of a delete puts the layer back with nothing selected and the next
     undo looks like a no-op. See useDeckHistory. */
  const history = useDeckHistory(() => ({ slides: load(slug) ?? seed(), active: 0, selectedIds: [] }))
  const { slides, active, selectedIds } = history.value
  /* the stage still drives ONE box at a time; the array is the stack's contract */
  const selectedId = selectedIds[selectedIds.length - 1] ?? null
  const setSelectedId = (id) => history.set((v) => ({ ...v, selectedIds: id ? [id] : [] }))
  /* shift-click in the layer stack — add or remove without losing the rest */
  const toggleSelected = (id) => history.set((v) => ({
    ...v,
    selectedIds: v.selectedIds.includes(id) ? v.selectedIds.filter((x) => x !== id) : [...v.selectedIds, id],
  }))
  const [locked, setLocked] = useState(false)
  const [shortcuts, setShortcuts] = useState(false)
  const [picker, setPicker] = useState(false)
  const [present, setPresent] = useState(null)   /* index while presenting, else null */
  const [dragI, setDragI] = useState(null)       /* filmstrip drag source */
  /* Clipboard is a REF, not state: pasting should not re-render on copy, and it
     must not enter the history snapshot — undo restores documents, not what you
     happened to have copied. Session-scoped and deliberately not the OS
     clipboard, so copying a layer cannot clobber whatever text you had. */
  const clipboard = useRef([])
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [fileOpen, setFileOpen] = useState(false)
  /* OFF by default and on a shortcut, per the user 2026-09-04. A layout grid
     that is on by default is chrome you have to dismiss before you can look at
     the work, which is backwards for a deck. */
  const [showGrid, setShowGrid] = useState(false)

  /* An import REPLACES the deck and is undoable like anything else. */
  const importSlides = (next) => history.set((v) => ({ ...v, slides: next, active: 0, selectedIds: [] }))

  /* One pass over the whole deck, one history entry — the point of the feature
     is that you set the date and the ground ONCE rather than opening fourteen
     slides. Writes through layer `role`, never by matching text. */
  const applySettings = (next) => history.set((v) => ({ ...v, slides: applyDeckSettings(v.slides, next) }))
  /* duplicate a slide from the filmstrip; the copy lands right after it and
     becomes active, which is what makes it immediately editable */
  const duplicateSlideAt = (i) => history.set((v) => ({
    ...v, slides: duplicateSlide(v.slides, i), active: i + 1, selectedIds: [],
  }))

  /* Duplicate and paste both land as ONE history entry and select the copies,
     which is what makes a duplicate immediately draggable. */
  const duplicateSelection = useCallback(() => history.set((v) => {
    const slide = v.slides[v.active]
    if (!slide || !v.selectedIds.length) return v
    const [doc, ids] = duplicateLayers(slide.doc, v.selectedIds)
    return { ...v, slides: v.slides.map((s, i) => (i === v.active ? { ...s, doc } : s)), selectedIds: ids }
  }), [history])
  const copySelection = useCallback(() => {
    const s = slides[active]
    if (!s) return
    clipboard.current = s.doc.layers.filter((l) => selectedIds.includes(l.id)).map((l) => ({ ...l }))
  }, [slides, active, selectedIds])
  const pasteClipboard = useCallback(() => history.set((v) => {
    const slide = v.slides[v.active]
    if (!slide || !clipboard.current.length) return v
    const [doc, ids] = pasteLayers(slide.doc, clipboard.current)
    return { ...v, slides: v.slides.map((s, i) => (i === v.active ? { ...s, doc } : s)), selectedIds: ids }
  }), [history])

  /* How far down the page the stage box starts — the masthead, the shell's own
     padding and the toolbar row, whatever they add up to today. MEASURED rather
     than written as a constant: the number is the sum of three things this file
     does not own, and a hardcoded one goes stale silently the first time any of
     them changes height. Feeds the stage's width cap below; it never feeds the
     box's own top, so there is no measure → layout → measure loop. */
  const stageRef = useRef(null)
  const [stageTop, setStageTop] = useState(0)
  useEffect(() => {
    const el = stageRef.current
    if (!el) return undefined
    const measure = () => setStageTop(el.getBoundingClientRect().top + window.scrollY)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => { try { localStorage.setItem(KEY(slug), JSON.stringify(slides)) } catch {} }, [slug, slides])

  const slide = slides[active] ?? null
  const setDoc = (doc) => history.set((v) => ({ ...v, slides: v.slides.map((x, i) => (i === v.active ? { ...x, doc } : x)) }))
  /* changing slide is undoable too, and it clears the selection in the SAME
     entry — two `set` calls would put a bare selection change on the stack */
  const go = (i) => history.set((v) => ({ ...v, active: i, selectedIds: [] }))
  const remove = (i) => history.set((v) => {
    const next = v.slides.filter((_, j) => j !== i)
    const active = v.active >= i && v.active > 0 ? v.active - 1 : Math.min(v.active, next.length - 1)
    return { slides: next, active: Math.max(0, active), selectedIds: [] }
  })
  const addFrom = (layout) => {
    history.set((v) => ({ slides: [...v.slides, { id: newId('slide'), doc: clone(layout.doc) }], active: v.slides.length, selectedIds: [] }))
    setPicker(false)
  }
  const reorder = (from, to) => {
    if (from === to) return
    history.set((v) => {
      const n = [...v.slides]; const [m] = n.splice(from, 1); n.splice(to, 0, m)
      return { slides: n, active: to, selectedIds: [] }
    })
  }

  /* keys: `s` the sheet anywhere; ← → while presenting */
  useEffect(() => {
    const onKey = (e) => {
      if (present != null) {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); setPresent((p) => Math.min(p + 1, slides.length - 1)) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); setPresent((p) => Math.max(p - 1, 0)) }
        return
      }
      const typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable
      /* ⌘Z / ⌘⇧Z — allowed while typing would fight the field's own undo, so
         the guard covers these too. */
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (typing) return
        e.preventDefault()
        if (e.shiftKey) history.redo(); else history.undo()
        return
      }
      /* ⌘D / ⌘C / ⌘V — all guarded by `typing` so they never take a keystroke
         away from a field that has its own meaning for them. */
      if ((e.metaKey || e.ctrlKey) && !typing) {
        const k = e.key.toLowerCase()
        if (k === 'd') { e.preventDefault(); duplicateSelection(); return }
        if (k === 'c') { e.preventDefault(); copySelection(); return }
        if (k === 'v') { e.preventDefault(); pasteClipboard(); return }
      }
      if (e.metaKey || e.ctrlKey || e.altKey || typing) return
      if (e.key === 'g' || e.key === 'G') { setShowGrid((v) => !v); return }
      if (e.key !== 's') return
      setShortcuts((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    /* The three clipboard handlers are in the deps ON PURPOSE. `copySelection`
       reads `slides[active]` and `selectedIds` from the RENDER closure, so an
       effect that only re-ran on `present`/`slides.length` would copy from a
       stale slide the moment you changed selection without changing either.
       Re-subscribing a keydown listener per render is cheap; a silent stale
       copy is not. (duplicate/paste read through the history ref and would have
       been safe either way — they are here so the rule stays honest.) */
  }, [present, slides.length, history, duplicateSelection, copySelection, pasteClipboard])

  return (
    <PageShell width="capped">
      <div className="pt-6 flex justify-between">
        <ViewToggle variant="icon" tone="sunken" viewMode={locked ? 'lock' : 'edit'} onViewChange={(v) => setLocked(v === 'lock')}
          options={[{ value: 'edit', label: 'Edit', icon: 'pen-nib' }, { value: 'lock', label: 'Lock', icon: 'lock' }]} />
        {/* play presents from the current slide; the file glyph is the save —
            inert, the deck autosaves, kept so the well reads as the pair */}
        <div className="flex items-center gap-2">
          {/* `iconLeft`, not `icon`, and Button has no `loading` — the busy state
              is the disabled flag plus the label. Passing `loading` leaked it to
              the DOM as a non-boolean attribute and React warned. */}
          <Button size="sm" variant="ghost" iconOnly="settings-01" aria-label="Deck settings" title="Deck settings" onClick={() => setSettingsOpen(true)} />
          {/* one File entry point, not a naked download (user 2026-09-03) */}
          <Button size="sm" variant="ghost" iconLeft="file" onClick={() => setFileOpen(true)}>File</Button>
          <ViewToggle variant="icon" tone="sunken" viewMode="save" onViewChange={(v) => { if (v === 'present') setPresent(active) }}
            options={[{ value: 'present', label: 'Present', icon: 'play' }, { value: 'save', label: 'Save', icon: 'file' }]} />
        </div>
      </div>

      {/* the stage keeps the full column; the inspector is a floating card,
          not a sibling and not a sidebar into the view (user 2026-09-03).

          The height cap arrives as a MAX-WIDTH, because the stage inside measures
          its box's width and derives the zoom from that — `max-height` on a 16:9
          box shortens it without narrowing it, and the stage keeps drawing at the
          old width. Without the cap the 16:9 of a capped 920 column is 517 tall
          and the last 120px of the slide sat behind the rail. What it must clear
          is everything above it (measured) plus the rail and a gutter. */}
      <div ref={stageRef} className="mt-4 mx-auto w-full"
        style={{ maxWidth: `calc((100vh - ${stageTop + RAIL_H + STAGE_GUTTER}px) * 16 / 9)` }}>
        {slide && (locked
          ? <SlideThumb doc={slide.doc} />
          : <SlideStage doc={slide.doc} onChange={setDoc} selectedId={selectedId} selectedIds={selectedIds} onSelect={setSelectedId}
              onEditStart={history.begin} onEditEnd={history.end} showGrid={showGrid} />)}
      </div>
      {slide && !locked && (
        <FloatingPanel title="Inspector">
          {(grab) => <SlideInspector doc={slide.doc} selectedIds={selectedIds} onChange={setDoc} onSelect={setSelectedId} onToggleSelect={toggleSelected} onDuplicate={duplicateSelection} deckSlug={slug} grab={grab} />}
        </FloatingPanel>
      )}

      {/* the filmstrip — a fixed rail on the floor, so the stage keeps the whole
          column instead of sharing it with the strip. `left` is the sidenav's own
          width variable, not a number, so a dragged sidebar carries the rail with
          it; the row still runs to the window edge, which is what the in-column
          version used `overflow-visible` to fake. The page reserves RAIL_H below.

          Both controls ride ON the tile now: the number bottom-left, the trash
          top-right on hover. Under the tile they sat in a row justified to both
          edges, which read as belonging to the gap between slides.
          `text-ab-white` and not an `fg-*` rung — a slide's ground is
          `--kol-color-absolute-black` in either theme, so its pair is absolute
          too and does not flip out from under the label in light mode. */}
      <div className="fixed bottom-0 right-0 bg-oq-04 border-t border-oq-08"
        style={{ left: 'var(--kol-sidenav-w)', zIndex: 'var(--kol-z-sticky, 20)' }}>
        <div className="flex items-stretch gap-3 overflow-x-auto px-6 py-4">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`group relative shrink-0 ${dragI === i ? 'opacity-30' : ''}`}
              style={{ width: TILE_W }}
              draggable
              onDragStart={() => setDragI(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (dragI != null) reorder(dragI, i); setDragI(null) }}
              onDragEnd={() => setDragI(null)}
            >
              <button type="button" onClick={() => go(i)} aria-label={`Slide ${i + 1}`} aria-current={i === active}
                className={`block w-full overflow-hidden rounded-[var(--kol-radius-sm)] transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-48 hover:opacity-80'}`}>
                <SlideThumb doc={s.doc} />
              </button>
              {/* the shadow is not decoration — most slides are the deck's black
                  ground, but a few (the light manifesto) are near-white, and a
                  plain white number disappeared on those. An absolute-black
                  shadow under an absolute-white label reads on both, and neither
                  flips when the APP theme does; a `fg-*` rung would. */}
              <span className="pointer-events-none absolute bottom-1.5 left-2 kol-helper-12 uppercase text-ab-white"
                style={{ textShadow: '0 1px 3px var(--kol-color-absolute-black)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute top-1 right-1 flex opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <ActionButton chrome="inline" size="sm" icon="copy" label="Duplicate slide" onAction={() => duplicateSlideAt(i)} />
                <ActionButton chrome="inline" size="sm" icon="trash" confirmIcon="check" label="Remove" confirmLabel="Removed" onAction={() => remove(i)} />
              </span>
            </div>
          ))}
          <button type="button" onClick={() => setPicker(true)} aria-label="Add slide"
            className="shrink-0 flex items-center justify-center rounded-[var(--kol-radius-sm)] border border-dashed border-fg-16 text-fg-48 hover:text-fg-96 hover:border-fg-48"
            style={{ width: TILE_W, aspectRatio: '16 / 9' }}>
            <span className="kol-helper-12 uppercase">+ Add</span>
          </button>
        </div>
      </div>

      <DeckFile
        open={fileOpen}
        onClose={() => setFileOpen(false)}
        slug={slug}
        slides={slides}
        active={active}
        onImport={importSlides}
      />

      <DeckSettings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        slides={slides}
        greys={GREYS}
        absoluteBlack={ABSOLUTE_BLACK}
        onApply={(next) => { applySettings(next); setSettingsOpen(false) }}
      />

      {/* the layout picker — the Slides view's fourteen, pick one to append */}
      <FullscreenOverlay open={picker} onClose={() => setPicker(false)}>
        <div className="grid grid-cols-4 gap-4 p-6 w-[80vw] max-w-[1400px]">
          {SLIDE_LAYOUTS.map((l) => (
            <button key={l.slug} type="button" onClick={() => addFrom(l)} className="text-left group">
              <div className="overflow-hidden rounded-[var(--kol-radius-sm)] opacity-64 group-hover:opacity-100 transition-opacity"><SlideThumb doc={l.doc} /></div>
              <div className="mt-2 kol-helper-12 uppercase text-fg-48 group-hover:text-fg-96">{l.name}</div>
            </button>
          ))}
        </div>
      </FullscreenOverlay>

      {/* presenting — the DS overlay, the slide at the viewport, ← → to move */}
      <FullscreenOverlay open={present != null} onClose={() => setPresent(null)}>
        <div className="w-[92vw] max-w-[1800px] pt-[50px] pr-[38px]">
          {present != null && slides[present] && <SlideThumb doc={slides[present].doc} />}
          <div className="mt-3 text-right kol-helper-12 uppercase text-fg-48">{String((present ?? 0) + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
        </div>
      </FullscreenOverlay>

      {shortcuts && (
        <ShortcutsOverlay onClose={() => setShortcuts(false)} shortcuts={[
          { section: 'Stage', items: [
            { label: 'Select layer', combo: 'Click' }, { label: 'Move', combo: 'Drag' }, { label: 'Resize', combo: 'Drag handle' },
            { label: 'Nudge', combo: '← ↑ → ↓' }, { label: 'Nudge ×10', combo: '⇧ + arrows' }, { label: 'Delete layer', combo: '⌫' }, { label: 'Deselect', combo: 'Esc' },
          ] },
          { section: 'Deck', items: [
            { label: 'Reorder slide', combo: 'Drag thumb' }, { label: 'Next / previous', combo: '→ ←  (presenting)' }, { label: 'Leave presentation', combo: 'Esc' },
          ] },
          { section: 'Page', items: [
            { label: 'Undo', combo: '\u2318 Z' }, { label: 'Redo', combo: '\u2318 \u21e7 Z' },
            { label: 'Duplicate', combo: '\u2318 D' }, { label: 'Copy', combo: '\u2318 C' }, { label: 'Paste', combo: '\u2318 V' },
            { label: 'Layout grid', combo: 'G' },
            { label: 'Shortcuts', combo: 'S' },
          ] },
        ]} />
      )}
    </PageShell>
  )
}
