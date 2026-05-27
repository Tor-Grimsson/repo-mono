# Session: Phase 1b — Positioning promotion

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Second sub-phase. Pattern + photo layer types promoted from cover-only to positioned. Three files. Defensive defaults preserve cover-equivalent rendering for any data lacking bounds.

## Changes Made

### `editor/compose/state.jsx`
- `COVER_TYPES`: `['background', 'pattern', 'photo']` → `['background']`. Only `background` remains cover-only.
- `POSITIONED_TYPES`: `['shape', 'text']` → `['pattern', 'photo', 'shape', 'text']`.
- `layerDefaults` factory: pattern + photo use a new `fullCanvas` helper (`x:0, y:0, w:CANVAS_W, h:CANVAS_H`). New layers default to full-canvas bounds — same visual starting point as old cover behavior; user drags/resizes from there.

### `editor/compose/LayerRenderer.jsx`
- `PatternLayer` + `PhotoLayer` render at `layer.x/y/w/h`. Defensive fallback: if bounds are missing (`layer.w == null`), positioning falls back to `inset:0` (full-canvas) so pre-1b data still renders correctly.
- `data-layer-cover="true"` removed from both — they're not cover anymore.
- `cursor` changed `'pointer'` → `'move'` (consistent with other positioned layers).

### `editor/compose/build.js`
- `patternLayerSvg` + `photoLayerSvg` use `layer.x/y/w/h` for SVG rect / image positioning. Defensive defaults: `lx ?? 0`, `ly ?? 0`, `lw ?? canvas-w`, `lh ?? canvas-h`.

## What this enables (no extra code needed)
- `CanvasArea.jsx` already gates drag/resize on `!COVER_TYPES.includes(layer.type)` — pattern + photo become draggable / resizable automatically.
- `LayerInspector.jsx` already shows `PositionFields` for `!COVER_TYPES.includes(layer.type)` — pattern + photo get position fields in the inspector.
- `SelectionOverlay` works for any positioned layer with `x/y/w/h` — already correct.

## Current State

### Working
- Self-verified: COVER_TYPES consumers (CanvasArea, LayerInspector, LayerRenderer) all use `!COVER_TYPES.includes(type)` semantics, which correctly flips for pattern + photo with no extra updates.
- Greps clean.

### Known issues / deferred
- `CANVAS_H` constant is 1080 regardless of aspect. New pattern layers in non-1:1 aspects (e.g. 9:16 = 1080×1920) get factory bounds 1080×1080 which only covers the top portion. User drags/resizes to fit. Acceptable; future improvement would size factory bounds to current aspect.
- Pre-1b saved presets in localStorage that contain pattern/photo layers won't have `x/y/w/h` fields. Defensive renderer fallbacks handle this; phase 6 (preset round-trip) is when load-action would inject defaults explicitly if needed.
- `scale` field on pattern is the tile size (background-size). Pattern still tile-repeats inside layer bounds; "tile fits bounds" semantics deferred (would require reworking the tile-repeat model).

## Next Steps
1. **Phase 1c** — group layer + multi-select. Selection model changes from `selectedId: string` to `selectedIds: string[]` with shift-click semantics. New `group` layer type with recursive rendering + inspector. Flat groups only for v1 (no nested groups).
