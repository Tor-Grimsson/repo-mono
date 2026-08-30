# ShelfCardMotion — the shelf card's entrance + tilt into the DS shelf card

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ShelfCardMotion.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-content 0.12.0; remainder executed here 2026-08-27 (bumped, `renderCard` · `ShelfEnter` · `SHELF_HEIGHTS` · `tilt` · `className="work-shelf"` dropped, `.work-shelf` rule deleted)

## Why it went there

`/work`'s shelf renders the DS `ContentCard work` through a local `renderCard`
only to wrap it in the retired `WorkCard`'s entrance (`ShelfEnter`: perspective
settle, staggered by index, house ease) and to put `TiltCard variant="grounded"`
in the media slot. Both are shelf-only motion and belong on `ParallaxShelf`'s
default card. The caption is already the DS's (`kol-eyebrow text-fg-64`, kol-content
0.11.0) — the local rule stays only because the running server was stale.

## What stays here

`Work.jsx` `ShelfEnter` · `WorkContentCard`'s `tilt` prop · `SHELF_HEIGHTS` ·
the shelf `renderCard` · `className="work-shelf"`; `ui.css`
`.work-shelf p.kol-helper-12`.

## Remainder here once it ships

bump kol-content; drop `renderCard`, `ShelfEnter`, `SHELF_HEIGHTS`, the `tilt`
prop and `className="work-shelf"` (shelf passes `items` · `type` · `fromLeft` ·
`plugins` · `onNavigate` · `titleClass={WORK_TITLE_FACE}`); delete the
`.work-shelf p.kol-helper-12` rule; eyeball `/work` shelf entrance + tilt.

## ✅ RETURNED — 2026-08-27 · kol-content 0.12.0

ParallaxShelf's default card carries both: enter (default true) — the site's ShelfEnter verbatim, settled under reduced motion; tilt (default true) — TiltCard grounded in the media slot. Grid untouched. Verified in source only (no server run, by your rule).

**Remainder here:** bump kol-content 0.12.0; drop ShelfEnter, WorkContentCard tilt, SHELF_HEIGHTS and the shelf renderCard in Work.jsx — pass items + titleClass (+ onNavigate)

## ✅ RETURNED — 2026-08-27 · kol-content 0.12.0

ParallaxShelf's default card carries both: `enter` (default true) — the site's ShelfEnter verbatim, settled under reduced motion; `tilt` (default true) — TiltCard grounded in the media slot. Grid untouched. Verified in source only (no server run).

**Remainder here:** ✅ executed 2026-08-27 same session — kol-content ^0.12.0 (one DS copy, `pnpm why` clean); `Work.jsx` shelf passes `type` · `items` · `fromLeft` · `plugins` · `onNavigate` · `titleClass` only; `WorkContentCard` is grid-only (plain `<img>`); `ShelfEnter` · `SHELF_HEIGHTS` · `ENTER_EASE` · the `TiltCard` import gone; `ui.css` `.work-shelf p.kol-helper-12` deleted. Eyeball owed: `/work` shelf entrance + tilt on a restarted server.
