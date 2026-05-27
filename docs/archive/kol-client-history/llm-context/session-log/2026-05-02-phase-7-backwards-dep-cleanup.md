# Session: Phase 7 — Backwards-dependency cleanup

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** `WEIGHTS`, `familyFor`, `applyCase` lifted out of `editor/labs/type-lab/cuts.js` into a new `src/data/typography-cuts.js`. `GeneratorLibraryProvider` moved from `editor/labs/sharedState.jsx` to `editor/library/LibraryProvider.jsx`. All consumers (15 files total) updated.

## Changes Made

### New
- `src/data/typography-cuts.js` — owns the three load-bearing cut helpers shared between Type Lab and DS / styleguide. Lifted out of editor so DS + framework no longer reach into `editor/labs/` for these.
- `src/editor/library/LibraryProvider.jsx` — verbatim copy of the prior `sharedState.jsx`. Provider now lives in the library subfolder per the product tree.

### Deleted
- `src/editor/labs/sharedState.jsx` — content moved to `library/LibraryProvider.jsx`.

### Updated — DS + framework (formerly reached into editor)
- `src/components/molecules/TypeBlockToolbar.jsx` — `WEIGHTS` now imported from `../../data/typography-cuts`.
- `src/components/styleguide/TypeBlock.jsx` — `familyFor`, `applyCase` now imported from `../../data/typography-cuts`.
- `src/components/framework/BrandLayout.jsx` — `GeneratorLibraryProvider` now imported from `../../editor/library/LibraryProvider`.

### Updated — type-lab cuts module
- `src/editor/labs/type-lab/cuts.js` — re-exports `WEIGHTS`, `familyFor`, `applyCase` from `src/data/typography-cuts.js`. Single source of truth; type-lab consumers (TypeControls, TypeLab, build.js, LayerInspector) need no changes — same import path, same exports. `WIDTHS`, `CASES`, `PALETTE`, `cssFor` stay local.

### Updated — internal library consumers (path swap, no behavior change)
- `src/editor/compose/inspectors/PaletteInspector.jsx`
- `src/editor/compose/inspectors/LayerInspector.jsx`
- `src/editor/library/LibraryTab.jsx`
- `src/editor/shell/panels/FrameHeaderPanel.jsx`
- `src/editor/labs/social/SocialLab.jsx`
- `src/editor/labs/compositor/Compositor.jsx`
- `src/editor/labs/lobby/Lobby.jsx`
- `src/editor/labs/pattern-lab/PatternControls.jsx`
- `src/editor/labs/combo-lab/PaletteControls.jsx`
- `src/editor/labs/type-lab/TypeControlsPanel.jsx`

All 10 swap `'../sharedState'` (or its absolute equivalent) for `'../../library/LibraryProvider'` (relative depth varies; the pattern is always `editor/library/LibraryProvider`).

## Current state

### Working (self-verified via grep)
- No remaining `labs/sharedState` imports.
- No remaining DS / framework imports of `editor/labs/type-lab/cuts.js`.
- The single grep hit for `editor/labs/type-lab/cuts.js` is a narrative reference in `typography-cuts.js`'s doc comment.

### Cleanup not yet addressed
- **`pages/Generators.jsx` (`/generators` index) + `editor/labs/lobby/Lobby.jsx`** still routed and functional. Phase 5's library tab covers the panel side; the lobby page is now redundant for navigation but still works. Cleanup pass any time.
- **Folder restructure (`labs/<lab>/` → `modes/<mode>/`)** mechanical, deferred.
- **Page wrappers (`pages/generators/{ComboLab,PatternLab,TypeLab}.jsx`)** thin and only mounted via `Editor.jsx` — could be inlined.
- **Social / Compositor folded into Compose with starter presets** still pending; they keep their own GeneratorLayout + standalone `/generators/{social,compositor}` routes.

## Phase 7 design decisions landed

- **typography-cuts as the single source of truth.** `cuts.js` re-exports rather than redefining, so type-lab edits to weights/family logic always flow through one definition.
- **LibraryProvider relocation, not concept change.** The library is still a single global provider mounted in `BrandLayout` (so `/generators` lobby and the editor share the same instance). Moving it to `editor/library/` is a file-organization fix; `BrandLayout` still imports from editor — that boundary is acceptable because library is editor-domain state and `BrandLayout` is the only viable mount point above both `/editor/*` and `/generators` routes.

## Next Steps
1. **Phase 8** — frame-level state. Persistence schema for named frames, autosave behavior, conflict resolution. Per the roadmap, this wants its own sub-doc before code. I'll draft a sub-doc as the first 8.0 task.
2. (Cleanup, opportunistic) — text flatten via opentype.js; Social/Compositor fold into Compose; folder restructure (`labs/<lab>/` → `modes/<mode>/`); delete the lobby page and `/generators` index.
