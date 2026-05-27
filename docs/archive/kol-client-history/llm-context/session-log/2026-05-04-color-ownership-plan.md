# Session: Color ownership re-architecture plan (Photoshop-style app-level paint)

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** User surfaced that yesterday's color consolidation still gates writes by selection support — X focuses stroke on a non-strokeable layer, hue ramp drags do nothing because `setStroke` is NOOP. Reframed the model: SwatchStack is canonical app-level paint state (PS / Affinity), all writes always work, selection adopts paint when applicable. Plan written, awaiting execution.

## Changes Made

### Files Modified
- `/Users/biskup/.claude/plans/mellow-exploring-crab.md` — full implementation plan for app-level paint state.

### No code changes this session
Pre-execution session. Captured the design before touching code.

### Bug surfaced
On any layer that isn't a `shape{kind:'rect'|'ellipse'}`:
- D (`paint-default`) writes fill but `setStroke('#000000')` no-ops (gated by `colorTarget.supportsStroke`).
- Shift+X (`paint-swap`) — early-returns on `if (!colorTarget.supportsStroke)`. Doesn't swap at all.
- Hue ramp drag with stroke focused — `target.onChange` routes to `setStroke`, which is NOOP. SwatchStack appears unresponsive.
- X works because it only flips activePaint state; doesn't touch layer.

Root cause: `useColorTarget.setStroke = supportsStroke ? (v) => updateLayer(...) : NOOP` and the same `supportsStroke` flag gates Shift+X / D / hue routing in CanvasArea. The flag is doing two jobs (write-gate + render-gate) and conflating them.

## Current State

### Working (carried over from 2026-05-03 consolidation)
- Build green.
- `useColorTarget` is the single owner for layer color writes (inspector, picker, keymap all funnel through it).
- `null` clears resolve to `fill="none"` in renderer (rect/ellipse).
- `findLayerDeep` consolidated to one helper.
- `useLayerEdit({ history })` coordinator hook foundation.
- `deleteSelected` coordinator (multi-delete = one undo entry).
- Selection bundled into history snapshot.
- Aspect + palette gen state lifted from palette mode into compose.
- Drag-to-canvas honors drop position.
- `useGlobalShortcuts` mounted in Editor.jsx — undo / redo / deselect work in every mode.

### Known issue blocking the user
- All four "no gates" complaints above. Plan addresses every one.

## Plan executed (same session)

All 6 implementation steps shipped:

1. ✓ `paintFill` / `paintStroke` state added to compose (defaults white / black). Exported.
2. ✓ Selection-sync `useEffect` — when a color-supporting layer or canvas becomes selected, app-level paint snaps to its resolved color. Refs hold latest layers/palette/canvasFill so the effect doesn't re-run on every layer mutation.
3. ✓ `useColorTarget` rewritten. Reads always from `paintFill`/`paintStroke`. `setFill` writes app-level + (if color layer) `layer.color` + (if canvas) `canvasFill`. `setStroke` writes app-level + (if color layer) `layer.stroke`. Dropped `hasTarget` / `supportsFill` / `supportsStroke` / `NOOP`.
4. ✓ CanvasArea paint shortcuts — all gates stripped. D / Shift+X / N always fire. Paint-default writes both fill+stroke unconditionally.
5. ✓ LayerInspector — `supportsStroke` hide removed. Both Fill and Stroke ColorFields render together for any color layer (background / pattern / shape / text).
6. ✓ ColourPanel `localHex` fallback removed — `useColorTarget` always returns working setters now, no "no target" branch needed. Also cleaned `ColorModal.onPickSwatch` (`if (target.hasTarget)` guard) and the stale comment in `LayerInspector`.

Bonus: `COLOR_LAYER_TYPES` set lifted into `compose/state.jsx` as a single export; `useColorTarget` imports from there (was duplicated literal).

### Files actually modified
- `src/editor/compose/state.jsx` — added `COLOR_LAYER_TYPES` export, `paintFill`/`paintStroke` state, selection-sync `useEffect` with refs to avoid re-running on layer mutations, exposed on context.
- `src/editor/color/useColorTarget.js` — full rewrite per plan.
- `src/editor/compose/CanvasArea.jsx` — stripped gates from `paint-default`/`paint-swap`/`paint-clear`.
- `src/editor/compose/inspectors/LayerInspector.jsx` — replaced `target.supportsFill`/`target.supportsStroke` gates with layer-type check; both Fill+Stroke render together.
- `src/editor/color/ColourPanel.jsx` — dropped `localHex` fallback in `ColourBody`.
- `src/editor/color/ColorModal.jsx` — dropped `target.hasTarget` guard from `onPickSwatch`.

### Build
✓ `npx vite build` green.

## Next Steps (post-execution verification — user runs)

The 7 manual checks from the plan:
1. No selection — D works (SwatchStack: white front, black back).
2. No selection — X+hue works (drag updates focused chip).
3. No selection — Shift+X works (swaps chips).
4. Selection sync — clicking layer snaps SwatchStack to its color.
5. Selection write — drag hue with text layer selected → text changes.
6. N clears — front chip shows slash; rect renders `fill="none"`.
7. Inspector parity — Fill + Stroke fields both visible for every color layer.

Out of scope (deferred per plan): new-layer defaults adopting app-level fill, stroke rendering on text/logo/pattern, app-level paint persistence, multi-selection paint apply.
