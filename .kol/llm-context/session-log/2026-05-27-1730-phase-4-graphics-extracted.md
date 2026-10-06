# Session Log: Phase 4 — `loaders/graphics` extracted into `@kol/component`

**Date:** 2026-05-27
**Status:** Shipped + build green (5/5 forced). Brand is canonical — lift-and-move.

## Summary

Re-checked `apps/brand/src/components/loaders/graphics` (open Phase-4 item) and confirmed it was extractable now that its only cross-boundary dep (`AssetPlaceholder`) lives in `@kol/component`. Moved the whole module into the package.

## What moved
- `apps/brand/.../loaders/graphics/` → `packages/component/src/graphics/` (`Graphic.jsx` + 47 SVGs across abstract/diagrams/patterns/social/structure).
- `Graphic.jsx`: `AssetPlaceholder` import `@kol/component` → relative `../primitives/AssetPlaceholder.jsx`.
- Added **`GRAPHIC_RAW`** export (category→name→raw-SVG map; same object as internal `GRAPHIC_CACHE`) — mirrors icons' `SVG_ENTRIES` so gallery/table consumers read raw markup without a cross-package glob.
- Barrel (`@kol/component`): `export { default as Graphic, GRAPHICS, GRAPHIC_RAW }`.
- Deleted dead `graphics/index.js` (barrel points at `Graphic.jsx`; consumers go through the package barrel now).

## Consumers repointed (3 — one was hidden)
- `styleguide/AssetTable.jsx` — import → `@kol/component`; **dropped its 2 broken graphics globs** (`graphicUrlModules`/`graphicRawModules`) + the derived `GRAPHIC_URLS`/local `GRAPHIC_RAW`; now imports `GRAPHIC_RAW` from package. Removed dead `url` field from `graphicRows` (table only reads `raw`). Logo (`MARK_*`) globs untouched — logos stay in brand.
- `pages/Styleguide.jsx` — import → `@kol/component`.
- `styleguide/ClearspaceDiagram.jsx` — **the hidden one**: globbed `structure/diagram-*-*.svg` directly. Rebuilt `DIAGRAMS` from `GRAPHIC_RAW.structure` (regex `^diagram-([^-]+)-(.+)$` — no `.svg` suffix since `GRAPHIC_RAW` keys are extensionless names).
- 3 stale path strings in body copy (`Reference.jsx` ×2, `Styleguide.jsx` ×1) `src/components/loaders/graphics/svg/...` → `packages/component/src/graphics/svg/...`.

## Verified
- `pnpm exec turbo run build --force` → **5/5 green** (web, studio, brand, chess-data, fontviewer), 23.88s.

## Open (remaining Phase 4 — editor-coupled, unchanged)
- `framework` (BrandLayout → editor) — Phase 5.
- `loaders/decks` → editor palettes — Phase 5.
- `styleguide` — extract generic parts, leave brand data app-side.
- Icon dual-home — `@kol/component/icons` vs `@kol/loader`; canonical = `@kol/loader`, touches web's ~30 Icon sites.
- `apps/brand/src/components/loaders/` now holds only `decks`.
