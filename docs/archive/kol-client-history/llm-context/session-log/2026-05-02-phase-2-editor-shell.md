# Session: Phase 2 — Unify the shell

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** EditorShell + panel registry + per-mode mounting. Compose now mounts as a registry rather than a hardcoded grid. Palette lifted into a persistent always-visible panel; ComposeTopbar collapsed into a compact left-rail FrameHeaderPanel. Mode switching machinery (phase 3) not wired yet — single registry for now.

## Changes Made

### New files
- `src/editor/state/panels.js` — registry helpers. Exports `SLOTS` constant + `panelsForSlot(panels, slot)`.
- `src/editor/EditorShell.jsx` — two-rail + canvas host. Inline `Rail` subcomponent renders header + body slots; takes a `registry = { canvas, panels }` prop.
- `src/editor/shell/panels/FrameHeaderPanel.jsx` — left.header content. Compact column layout with frame label + undo/redo + save + clear + export buttons. Replaces the deleted ComposeTopbar.
- `src/editor/shell/panels/PalettePanel.jsx` — right.body (top). Wraps PaletteInspector with a `kol-compose-rail` + rail-head titled "Palette". Always visible.
- `src/editor/shell/panels/ToolPropertiesPanel.jsx` — right.body (below Palette). Thin wrapper over `InspectorRail`.

### Deleted
- `src/editor/compose/ComposeTopbar.jsx` — replaced by FrameHeaderPanel.

### Modified
- `src/components/framework/kol-framework.css` — added `.kol-editor-grid` + `.kol-editor-left/right/canvas` + `.kol-editor-rail-header/body` block. Override `.kol-editor-rail-body .kol-compose-rail { height: auto }` so nested compose-rails don't force full-height when stacked. Old `.kol-compose-grid` / `kol-compose-topbar` / `kol-compose-drawer` CSS retained for now (unused; cleanup later).
- `src/pages/Compose.jsx` — replaced inline grid with `<EditorShell registry={COMPOSE_REGISTRY} />`. Registry mounts CanvasArea + 4 panels (FrameHeaderPanel @ left.header, LayerStack @ left.body, PalettePanel + ToolPropertiesPanel @ right.body).
- `src/editor/compose/state.jsx` — initial `selectedIds: []` (was `['palette']`); palette is no longer a selectable frame slot. `removeLayer` no longer falls back to `['palette']` (clears to `[]`). `clearLayers` → `[]`. `toggleSelection` drops 'palette' guard. Doc comment updated.
- `src/editor/compose/LayerStack.jsx` — `FRAME_SLOTS` drops the `'palette'` row; only `'aspect'` remains. `layerSelectionCount` filter drops the `'palette'` exclusion.
- `src/editor/compose/InspectorRail.jsx` — drops `'palette'` routing case + `PaletteInspector` import. Only `'aspect'` is routed; everything else is layer / multi-select / empty. Doc comment updated.

## Current state

### Working (self-verified via grep)
- All `selectedId === 'palette'` references gone from `src/editor/`.
- All `ComposeTopbar` references in code gone (only doc-comment narrative refs in sharedState + FrameHeaderPanel remain).
- New shell file tree per `docs/editor/product-tree.md` (modulo `LeftRail.jsx`/`RightRail.jsx` inlined into `EditorShell.jsx` for v1 simplicity — cosmetic deviation from product tree, easy to split later if needed).
- Compose-mode default arrangement matches `docs/editor/product-description.md`: FrameHeaderPanel @ left.header, LayerStack @ left.body, Palette + Tool Properties @ right.body. `right.header` stays empty until phase 3 mounts mode tabs.

### Known issues / deferred
- **Old `.kol-compose-grid` CSS dead.** The grid + topbar + drawer + responsive-block CSS at lines 203-244 + 466-486 in `kol-framework.css` is no longer rendered. Cleanup pass — phase 4 or a small separate sweep.
- **No mode tabs.** `right.header` is empty. Phase 3 fills it.
- **Library panel deferred.** `left.body` only has Layers in Compose. Library panel ships in phase 5.
- **Drag-to-rearrange.** Architecture supports it (panels declare default slot, state could override) but no UI yet. v2 feature.
- **Product description doc says palette is a frame slot.** Code now contradicts (palette is a persistent panel, not a selectable frame slot). Doc cleanup follow-up.

## Phase 2 design decisions landed

- **Registry-driven shell** — `EditorShell` accepts a `registry = { canvas, panels }` prop. Each panel declares `{ slot, order, Component }`. Lean from the implementation plan.
- **Config object panels** (vs. hook-based registration). Lean from the implementation plan.
- **Inline `Rail` subcomponent in EditorShell.jsx** — separate `LeftRail.jsx` / `RightRail.jsx` would be near-duplicates. Kept inline for v1; split if a real difference emerges.
- **Palette as persistent panel** — not a selectable frame slot. Aspect remains selectable (it has its own inspector that hooks into Tool Properties).

## Next Steps
1. **Phase 3** — mode router. Replace `/generators/*` and `/compose` routes with one editor route + mode state (or `/editor/:mode`). `EditorShell` registry becomes per-mode (Compose / Palette / Pattern / Type); state-driven mode switching via tabs in `right.header`. State persists per mode in memory across switches.
