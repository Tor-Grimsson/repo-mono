# Session: Phase 1c — Group layer + multi-select

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Third sub-phase. New `group` layer type with recursive rendering. Selection model upgraded from `selectedId: string` to `selectedIds: string[]` with back-compat single-id getter. Shift-click in LayerStack toggles multi-select; "Group N" button appears when 2+ layers are selected; group inspector exposes Ungroup. Flat groups only for v1.

## Changes Made

### `editor/compose/state.jsx`
- Selection model: `selectedId: string` → `selectedIds: string[]`. Initial `['palette']`. Exposed both: `selectedId` is a derived getter (`selectedIds[0] ?? null`) for back-compat, `selectedIds` for multi-aware consumers.
- New action `select(id | null)` — single-select; replaces array (`setSelectedIds([id])` or `[]`).
- New action `toggleSelection(id)` — adds/removes from array. Frame slots ('aspect', 'palette') are not multi-selectable; toggling them resets to single. Falls back to `['palette']` if every selection is removed.
- New action `groupLayers(ids)` — refuses if fewer than 2 layers passed or if any is itself a group (flat groups only). Computes union bounds; rewrites children to group-relative coords; new `group` layer goes to top of stack; selects the new group.
- New action `ungroupLayer(id)` — replaces a group layer with its children at canvas-absolute coords (children's x/y get group's x/y added back); selects the freed children.
- `addLayer` / `removeLayer` / `clearLayers` updated to call `setSelectedIds(...)` directly.
- Layer-types doc comment includes `group { children, x, y, w, h }`. `layerDefaults` switch does NOT include group — groups are created via `groupLayers`, not `addLayer`.

### `editor/compose/LayerRenderer.jsx`
- New `GroupLayer` component: positioned `<div>` at `layer.x/y/w/h`, children rendered recursively via `<LayerRenderer>` (children store group-relative coords; the parent div's translate restores canvas-absolute rendering).
- Switch case added for `'group'`.

### `editor/compose/LayerStack.jsx`
- Destructure adds `selectedIds`, `toggleSelection`, `groupLayers`.
- Layer row `active` flag flips to `selectedIds.includes(layer.id)` (multi-aware).
- Layer row `onSelect` becomes `(e) => e?.shiftKey ? toggleSelection(id) : select(id)` — shift-click toggles, plain click sets single.
- Frame slot rows still use single-select behavior (they read `selectedId === c.id`).
- Group rows render as `group · N` with the `component` icon.
- `TYPE_ICONS.group = 'component'`.
- New "Group N" button surfaces above the "Add layer" grid when `≥2` layers (excluding frame slots) are in `selectedIds`. Calls `groupLayers(layerSelectionIds)`.

### `editor/compose/inspectors/LayerInspector.jsx`
- Destructure adds `ungroupLayer`.
- New `GroupFields` sub-component shown when `layer.type === 'group'` — child count + Ungroup button.

### `editor/compose/InspectorRail.jsx`
- Destructure adds `selectedIds`, `groupLayers`.
- New routing: `2+ layer ids selected` → multi-select inspector (count + Group button). Single-select / frame-slot routing unchanged.
- Imports `Button` from atoms.

### `editor/compose/build.js`
- New `groupLayerSvg(layer, palette, w, h, idx, defs)` — recursive, emits `<g transform="translate(gx gy)">` containing children's wrapped bodies. Pattern defs from nested children push into the same `defs` array (uses `${idx}-${i}` for nested idx).
- New `layerToSvg(...)` — extracted per-layer dispatch + opacity/blend wrap. The forEach in `buildLayersSvg` now delegates to `layerToSvg`.
- Switch gains `case 'group':` calling `groupLayerSvg`.

## Current State

### Working
- Self-verified: `selectedId` back-compat getter means single-select consumers (CanvasArea drag, LayerRenderer text-edit focus, frame-slot rows) still work without changes.
- Greps clean (no stale `setSelectedId`).
- Group recursion through LayerRenderer compiles (function-declaration hoisting).

### Out of scope for 1c (deferred)
- **Multi-select drag on canvas.** Click on canvas still single-selects via `select(id)` (clears multi). Once grouped, the group drags as a single layer. To multi-select, use shift-click in LayerStack.
- **Marquee select.** Drag-on-empty-stage to multi-select. Future.
- **Multi-select bounds wireframe.** SelectionOverlay still draws around the single back-compat-selected layer; for a multi-select the user sees just the first selected layer's wireframe. Acceptable v1; group-then-transform is the intended workflow.
- **Nested groups.** Group action refuses if a selected layer is itself a group.
- **Group children resize-on-resize.** Resizing the group's bounds doesn't auto-scale child layers (their group-relative coords stay; bounds change). Acceptable; user can ungroup, resize, regroup.

## Phase 1 (1a + 1b + 1c) — overall summary

Vocabulary migration, positioning promotion, group + multi-select all shipped. Library localStorage migrated v2→v3 with `_backup`. The roadmap's first phase is now complete; the editor target architecture's vocabulary and selection model are in place.

## Next Steps
1. **Phase 2** — unify the shell. Lift `/compose`'s grid into a generic `EditorShell` with `header`/`body` slots per rail; build the panel model from day one. Compose mode becomes the first occupant. `Inspector` content goes into the Tool Properties slot; `Palette` becomes its own panel above. Mode tabs land in `right.header`.
