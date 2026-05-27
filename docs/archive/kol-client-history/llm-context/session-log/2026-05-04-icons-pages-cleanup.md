# Session: /icons + /icons/variants cleanup

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Both icon pages rewritten. `/icons` is now loader-backed only (no manifest). `/icons/variants` is a focused solid · stroke · stroke-on-grid compare gallery, scoped to icons that exist in the loader and have a pool solid pair. Both pages use `ContentFilters` for search + folder chips. Keyline grid colors adapt to BG.

## Changes

### `/icons` (Icons.jsx)
- Source = `import.meta.glob('../components/loaders/icons/svg/**/*.svg')`. Dropped `_pool.json` dependency.
- Sections per loader folder (`00-kol`, `01-navigation`, …), sorted by count desc.
- `ContentFilters` wrap: search across name + folder, folder filter chips, **grid/list view-mode toggle** (built into ContentFilters' `viewModeOptions`).
- New `ListRow` component for list view (icon cell + name + folder).
- Tile cell scales with size now (`cell = size + 16`, no `Math.max(72, …)` floor) — visual size differences are real across the SIZE toggle.
- Grid column min also scales: `repeat(auto-fill, minmax(${Math.max(64, size + 28)}px, 1fr))`.
- Display controls (BG / SIZE / GRID) sit above ContentFilters. SIZE goes 16 → 64.
- Body footer = primary button (`kol-btn kol-btn-primary kol-btn-md`) linking to `/icons/variants`.

### `/icons/variants` (IconsVariants.jsx)
- Walks loader strokes (00-kol overlays others, matching `Icon.jsx`'s resolution), name-matches pool solids, picks best origin (`claude-jsx > library > live`). Skips rows without a solid pair.
- Compare-card layout adapted from `_tmp/icons` Claude design (no CSS imported): 220px auto-fill grid; each card is solid · stroke · stroke-on-grid (3 cells with `aspect-ratio: 1`), an uppercase column-label strip, then a name + folder footer.
- ContentFilters wrap: search + folder chips. SIZE 16 → **64**.
- Removed: mark-for-delete clicks, export JSON, reset, hide-partial / hide-marked toggles, localStorage decisions.

### Keyline grid (shared)
- `KEYLINE_BG` constant → `KeylineBg({ bgLight })` component.
- Opacity 0.7 → **1**.
- Cyan diagonals (`#0A8DA4`) on both backgrounds.
- Magenta keylines (`#CA3ABC`) on light BG; **yellow keylines (`#F2D24B`)** on dark BG for contrast.

## Files Touched
- `src/pages/Icons.jsx` — full rewrite.
- `src/pages/IconsVariants.jsx` — full rewrite.

## Next Steps
- Pool data still sources solid variants from `_staging/icons/_pool/` and `_pool.json`. Eventually the canonical solid set should move into the loader (e.g. `00-kol/solid/`) and `/variants` should drop the manifest dep, mirroring `/icons`.
- Tweaks panel (live stroke-width / caps / joins) deferred — would require icons authored as JSX path data instead of static SVG.
