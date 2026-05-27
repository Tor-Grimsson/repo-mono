# Session: Editor extraction — `src/editor/` roof

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Extracted compose + labs (formerly `/generators/`) out of `src/components/` into a new top-level `src/editor/` roof, peer to `src/brand/` and `src/components/`. Slide deck stays in `loaders/decks/` (shared between compose and `/slide-deck`). 50 import sites rewritten. Surfaced a backward layer dependency: DS molecule + styleguide + framework all import from the editor — flagged for follow-up.

## Changes Made

### Moves
- `src/components/compose/` → `src/editor/compose/` (10 files + `inspectors/`)
- `src/components/generators/` → `src/editor/labs/` (5 lab folders + `GeneratorLayout` / `Canvas` / `sharedState` / `aspects` / `lobby`)
- `src/styles/kol-typography-fonts-full.css` → `src/editor/styles/kol-typography-fonts-full.css` (Type Lab opentype.js plumbing — was already flagged as not-DS)

### Imports rewired (50 sites across 25 files)
- compose internals → labs (`../generators/` → `../labs/`)
- compose + labs → DS (`../X/` → `../../components/X/` where X is one of atoms / molecules / organisms / loaders / sections / styleguide / framework). Compose and labs are now one level deeper relative to `components/`.
- type-lab fonts CSS — `../../../styles/…` → `../../styles/…` (one level shallower since it moved into `editor/styles/`)
- pages → editor (`../components/compose/` → `../editor/compose/`, `../../components/generators/X/` → `../../editor/labs/X/`)
- slide deck → labs (`../../generators/…` → `../../../editor/labs/…`)
- 3 orphans in DS/framework that reached *back* into the editor via relative paths (`../generators/…`) — fixed pointing into the new location:
  - `src/components/framework/BrandLayout.jsx` → `GeneratorLibraryProvider`
  - `src/components/molecules/TypeBlockToolbar.jsx` → `WEIGHTS`
  - `src/components/styleguide/TypeBlock.jsx` → `familyFor`, `applyCase`

### Stays put
- `src/components/loaders/decks/` — slide deck is shared; `SlideDeck.jsx` consumes `editor/labs/combo-lab/palettes` for the 3 palette-aware slides
- `src/pages/Compose.jsx`, `Generators.jsx`, `pages/generators/*` — page wrappers stayed in `pages/`, just rewired to import from `editor/`
- `public/fonts/Right-Grotesk-ttf/` — public asset, CSS references it by URL
- Brand-side relative imports from compose/labs were unchanged because the move preserved depth-from-`src/` (e.g. `../../brand/…` from compose, `../../../brand/…` from labs sublabs — both still resolve to `src/brand/`)

## Current State

### Working
- New layout in place. Vite HMR resolves end-to-end after the orphan cleanup.

### Known Issues
- **Backwards layer dependency:** DS molecule (`TypeBlockToolbar`), styleguide content (`TypeBlock`), and framework (`BrandLayout`) all import from `editor/labs/`. The DS / framework shouldn't depend on the editor. Specific dependencies:
  - `WEIGHTS` const + `familyFor` / `applyCase` helpers from `editor/labs/type-lab/cuts.js`
  - `GeneratorLibraryProvider` from `editor/labs/sharedState.jsx`

## Next Steps
1. Lift `WEIGHTS`, `familyFor`, `applyCase` out of `editor/labs/type-lab/cuts.js` into the DS (or a shared `data/` module). They are token + helper-level — not editor-specific.
2. Decide where `GeneratorLibraryProvider` belongs. `BrandLayout` is the only consumer outside the editor — pulling the provider into framework or scoping it to compose-only routes both seem reasonable.
