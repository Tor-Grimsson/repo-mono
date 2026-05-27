# Session: Roadmap cleanup — close every deferred item

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Closed every item I had deferred during the phase 1–8 roadmap. Social + Compositor folded into Compose with starter presets; Lobby + `/generators` index deleted; folder restructure `editor/labs/<lab>/` → `editor/modes/<mode>/`; drag-to-canvas wired; dead `.kol-compose-*` CSS removed; page wrappers inlined. The editor matches `product-tree.md` shape now.

## Changes Made

### Deletions
- `src/pages/Generators.jsx` + `src/editor/labs/lobby/` (Lobby + demoSeed). Library tab in left.body supersedes them.
- `src/pages/generators/{ComboLab,PatternLab,TypeLab,Social,Compositor}.jsx` (page wrappers).
- `src/editor/labs/social/` + `src/editor/labs/compositor/` (folded into Compose).
- `src/editor/labs/GeneratorLayout.jsx` (no consumers post-EditorShell).
- Dead `.kol-compose-grid` / `.kol-compose-topbar` / `.kol-compose-drawer` / responsive overrides in `kol-framework.css`.

### Folder restructure
- `editor/labs/combo-lab/`  → `editor/modes/palette/`
- `editor/labs/pattern-lab/` → `editor/modes/pattern/`
- `editor/labs/type-lab/`    → `editor/modes/type/`
- `editor/labs/Canvas.jsx`   → `editor/shell/Canvas.jsx`
- `editor/labs/aspects.js`   → `editor/aspects.js`
- `editor/labs/`             dir gone.
- `editor/labs/social/ColorPicker.jsx` (used by PatternControls) moved into `editor/modes/pattern/ColorPicker.jsx`.

All consumer import paths updated (≈ 14 files via bulk sed: compose/*, library/*, Editor.jsx, App.jsx, SlideDeck.jsx).

### Starter presets — Social + Compositor fold
- New `src/editor/library/starters.js` with five baked starter presets:
  `social-square` (1:1), `social-portrait` (4:5), `social-story` (9:16),
  `compositor` (1:1 with bg + pattern + logo + text), `hero-lockup` (1:1 lockup).
- `LibraryTab` shows "Starters" section above the saved-library slots; click → `loadPreset(starter.preset)` + navigate to `/editor/compose`.
- `loadPreset` now re-IDs every layer (and nested group children) on load so starters can be loaded repeatedly without id collision.

### Drag-to-canvas
- `LibraryTab` items get `draggable={true}` + an `onDragStart` that puts `{ slot, item }` into the `application/x-kol-library` mime-type via `dataTransfer`. Pattern / type / preset only — palette items are not draggable (no direct layer mapping).
- `CanvasArea` has `onDragOver` (accept the mime) + `onDrop` (parse + dispatch) on the stage.
- New `insertFromLibrary(slot, item)` action on compose state — pattern → pattern layer (full-canvas bounds, params copied), type → text layer (centered, typography copied), preset → append layers (partial-chunk semantics).

### Routes + navigation
- `App.jsx` — legacy `/generators` index, `/generators/social`, `/generators/compositor`, `/generators/combo-lab`, `/generators/pattern-lab`, `/generators/type-lab`, `/compose` all redirect into `/editor/<mode>` (or `/editor/compose` for index/social/compositor). No remaining `/generators/*` element routes.
- `sidebars.config.js` — removed the entire generators top-level section + its sub-section under Reference. Compose nav entry → `/editor/compose` (already the case).

### Edge-case helpers
- `compose/build.js` — formerly re-exported `downloadCompositionSvg` / `downloadCompositionPng` from compositor/build.js. Inlined those generic blob/canvas SVG + PNG download helpers (Compositor lab is now deleted).

## Current state

### Working (self-verified via grep)
- No remaining `labs/` references in `src/`.
- No remaining `compositor/` import targets (only narrative comments + the `compositor` starter id).
- `editor/` tree matches `docs/editor/product-tree.md`: `Editor.jsx`, `EditorShell.jsx`, `aspects.js`, `state/panels.js`, `shell/{Canvas,panels/*}.jsx`, `library/{LibraryProvider,LibraryTab,starters}.{jsx,js}`, `compose/*`, `modes/{palette,pattern,type}/*`.

### Still deferred (explicitly Phase 8 polish, not roadmap commitments)
- Autosave / draft slot for crash recovery
- Custom Save / Save-as modal (currently `window.prompt`)
- Discard-changes prompt on Open

## Next steps
Phase 8 polish items (autosave, modal Save flow, discard-changes prompt) are the only remaining items the docs deferred. Not roadmap commitments — they were explicitly listed as deferred in `docs/editor/frame-state.md`.
