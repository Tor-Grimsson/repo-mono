# Session: `/work` shelf card motion → DS round-trip (ShelfCardMotion)

**Date:** 2026-08-27 (night)
**Agent:** Grim
**Summary:** The last local piece of `/work` unloaded. `ShelfCardMotion` filed to kol-ds-ui (the shelf card's staggered perspective entrance + `TiltCard grounded` in the media slot onto `ParallaxShelf`'s default card; caption noted as already 0.11.0's), returned the same hour as **kol-content 0.12.0** (`enter` + `tilt`, both default true, the site's `ShelfEnter` verbatim, settled under reduced motion), remainder executed. `Work.jsx` carries no shelf card code; `ui.css` no `.work-shelf` rule.

## Changes Made

### Files Modified
- `apps/web/package.json` — kol-content `^0.12.0` (`pnpm why` → one copy of component + content)
- `routes/Work.jsx` — shelf passes `type · items · fromLeft · plugins · onNavigate · titleClass` only; `ShelfEnter` · `ENTER_EASE` · `SHELF_HEIGHTS` · the shelf `renderCard` · `className="work-shelf"` · `WorkContentCard`'s `tilt` prop · the `TiltCard` import gone; grid card unchanged (plain `<img>`); esbuild parse ok
- `styles/ui.css` — `.work-shelf p.kol-helper-12` rule + its comment deleted
- Lobby: `outbox/ShelfCardMotion.md` (🔵 → 🟢, remainder executed) · `lobby/INDEX.md` row + two history lines · DS side: `inbox/ShelfCardMotion.md` (now `done/`), its ledger row + history line

### Features Added/Removed
- **Added (DS):** `ParallaxShelf` `enter` + `tilt` props, default true
- **Removed here:** every shelf-card-specific line in `Work.jsx`; the last `.work-*` rule beyond the two display faces

## Current State

### Working
- `/work` LIST · GRID · shelf entirely on DS components; the page contributes content, its title face and the wheel plugin
- Every outbox receipt 🟢 (67); nothing open from this repo in the DS queue

### Known Issues
- Not eyeballed — verified in source + esbuild parse only; the user's dev server needs a restart for 0.12.0
- `pb-[100vh]` under the last shelf still unseen by the user

## Next Steps
1. User restarts the server, eyeballs `/work` (shelf entrance, tilt, CTA, the 100vh gap)
2. Brand: `/icons/:set` and `/slide-deck` onto the content family; `/library` via the DS's own `MediaLibrary` swap
