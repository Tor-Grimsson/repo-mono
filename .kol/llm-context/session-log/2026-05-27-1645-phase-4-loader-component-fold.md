# Session Log: Phase 4 — `@kol/loader` (icons) + middle-layer fold into `@kol/component`

**Date:** 2026-05-27
**Status:** Shipped + build green (5/5 forced, ×3 gates). Brand is canonical — lift-and-move, brand wins.

## Summary

Phase 4 of the brand→monorepo migration. **Directive (user, emphatic): `apps/brand` is the complete, most-recent canonical DS — packages are the destination, brand wins every overlap.** So extraction is a lift-and-move, not a reconciliation. Two slices landed:

1. **`@kol/loader`** — `apps/brand/src/components/loaders/icons/` (Icon + 367 SVGs + registry) → `packages/loader`. Added `SVG_ENTRIES` export (the `import.meta.glob` done inside the package) so the gallery pages (`Icons.jsx`, `IconsVariants.jsx`) enumerate icons without a cross-package glob. `import.meta.glob` survives the package move.
2. **Middle-layer fold → `@kol/component`** — brand's `atoms` (6) + `molecules` (7) + `primitives` (7) + `organisms/Table` (1) + `hooks` (2, useReveal/useScrollSpy) moved into `packages/component/src/{atoms,molecules,primitives,organisms,hooks}/`. Exported from the `@kol/component` barrel. ~30 brand consumers repointed (default→named imports) via throwaway node scripts. `@kol/component` gained deps: `@kol/loader` + `embla-carousel-react` (Carousel).

## Stayed in brand (app-specific — need brand data, can't go in a package)
- `molecules/TypeBlockToolbar.jsx` → imports `data/typography-cuts`
- `hooks/usePageTitle.js` → imports `brand/config`
(Their imports of moved siblings repointed to `@kol/component`.)

## Gotchas hit + fixed (fix-forward via build gate)
- Relative sibling imports the first repoint missed (`../icons/Icon` in DeckShell; `../primitives/X`, `../molecules/X` in framework/styleguide/graphics) — caught by build, broadened the repoint regex.
- **`Section`** — 4 editor mode files (`RuleRow`, `PatternControls`, `PaletteControls`, `TypeControls`) import `{ Section }` but it's defined NOWHERE in the repo (only a different local `Section({title,items})` in `ShortcutsOverlay`). A dangling ref in the editor's own WIP ("Phase 6f"). Recreated the minimal wrapper (`<Section label>…</Section>`, label + children) at `packages/component/src/Section.jsx` + exported. Couldn't recover the original (git blocked by rule).
- `MenuPopover` re-exports its own `MenuItem`/`MenuDivider` which clash with `MenuItem.jsx` — barrel exports only `{ MenuPopover }` to avoid the dup symbol.

## Verified
- `pnpm exec turbo run build --force` → **5/5 green** (web, studio, brand, chess-data, fontviewer).
- `apps/brand/src/components/` now: `framework`, `loaders` (decks+graphics), `styleguide`, `sections`, `tools` + the 2 stay-behind files. All DS primitives/atoms/molecules/icons are packages.

## Open (remaining Phase 4 — genuinely editor-coupled / app-specific)
- **`framework`** (BrandLayout → `editor/library/LibraryProvider`) — blocked on editor (Phase 5) or a BrandLayout split.
- **`loaders/decks`** → `editor/modes/palette/palettes` — Phase 5 coupling.
- **`loaders/graphics`** — imported `primitives/AssetPlaceholder` (now `@kol/component`), so may be extractable now — re-check.
- **`styleguide`** — depends on `framework` + brand `data/info`/`logos`/`typography-cuts` — extract generic parts, leave brand data app-side.
- **`sections/ColorRamp`, `tools/Gallery`** — likely app-specific, not DS.
- **`Icon` dual-home** — `@kol/component/icons/` (web's set) + `@kol/loader` (brand's 367). Canonically Icon → `@kol/loader`, `@kol/component` imports it; touches web's ~30 Icon sites. Separate reconciliation.
