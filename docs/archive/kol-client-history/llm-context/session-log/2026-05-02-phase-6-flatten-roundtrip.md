# Session: Phase 6 — Flatten + round-trip editing

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Pattern flatten action lands. PatternFields and TextFields gain "Edit in `<mode>` mode" buttons that load the layer's params into the destination mode and navigate. Shape layer + SVG-export gain a `kind: 'flatten'` branch. Text flatten via opentype.js outline extraction explicitly deferred (significantly larger lift).

## Changes Made

### Compose state — `editor/compose/state.jsx`
- New `flattenPattern(layerId)` action. Renders the pattern via `buildPatternSvg` against the current palette (resolving `palette:*` refs to hex), wraps the result in a `shape{kind:'flatten', svg}` layer, then wraps that in a `group` so the flattened result occupies one slot in the layer stack (matches the implementation-plan's "group of shape layers" framing). Replaces the original pattern layer in place. Tracked through history; undo restores.
- Added imports: `getShapeSvg` (already had `DEFAULT_SHAPE_ID`), `buildPatternSvg`. Exposed `flattenPattern` in the value bag.

### Layer renderer — `editor/compose/LayerRenderer.jsx`
- `ShapeLayer` switched from logo-only to kind-aware:
  - `kind: 'logo'` (default for legacy data) — unchanged; renders via `KolLogo`.
  - `kind: 'flatten'` — inlines `layer.svg` via `dangerouslySetInnerHTML` inside a positioned `<div>` sized to layer bounds.

### SVG export — `editor/compose/build.js`
- `shapeLayerSvg` switched from logo-only to kind-aware. For `kind: 'flatten'`, emits a nested `<svg>` element at the layer's bounds with `preserveAspectRatio="none"` so the flattened content fills the bounds exactly (matches DOM render). Reuses `parseSvg` to extract viewBox + body from the stored SVG.

### Layer inspector — `editor/compose/inspectors/LayerInspector.jsx`
- `PatternFields` gains:
  - `onEditInPatternMode` — calls `loadPattern({ ...layer params, bg: bgOn ? bg : null })` (Pattern-mode loader from `usePatternState`), then `navigate('/editor/pattern')`. Layer's own params become Pattern mode's loaded state.
  - `onFlatten` — calls `flattenPattern(layer.id)`.
  - New button row at bottom: "Edit in Pattern mode" (secondary) + "Flatten" (secondary). Border-top divider above.
- `TextFields` gains:
  - `onEditInTypeMode` — calls `loadType({ ...typography fields })` (Type-mode loader from `useTypeState`), then `navigate('/editor/type')`. Layer's spec becomes a new frame in Type mode.
  - New button at bottom: "Edit in Type mode" (secondary).
- Imports added: `useNavigate`, `usePatternState`, `useTypeState`.

## Current state

### Working (self-verified via grep)
- `flattenPattern` reachable from `useComposeState` and consumed by `PatternFields`.
- Shape `kind: 'flatten'` rendered both in the canvas (DOM) and in SVG export (foreignObject-free; nested `<svg>`).
- Edit-in-mode round-trip: clicking the button on a Compose pattern/text layer copies the layer's params into the destination mode's state (via the loaders shipped in phase 5) and navigates.

### Out of scope for phase 6 minimum (deferred)
- **Text flatten via opentype.js.** Significantly bigger lift — requires async glyph-outline extraction per font cut. Existing `buildTypeSvg.js` does this for full type compositions; reusing it for a single-text-layer flatten is feasible but adds async-action machinery to compose state. Deferred. When implemented: `flattenText(layerId)` action shaped like `flattenPattern` but awaiting the SVG build; output as `group` of `shape{kind:'flatten'}` layers.
- **Round-trip with source-id tracking.** Today's edit-in-mode button copies the layer's *current* params, not a reference to the original library item. If a user picked a saved pattern → modified the layer → clicked Edit, they get the modified state, not the saved one. That's what the user wants in nearly all cases. True source-link round-trip (with a `sourceId` field) is a future feature when source-of-truth ambiguity becomes a real problem.
- **Shape variant: primitive / customSvg.** `kind: 'flatten'` lands; `'primitive'` (rect/ellipse/polygon) and `'customSvg'` ship when needed. ShapeLayer + shapeLayerSvg are now extension-ready.

## Phase 6 design decisions landed

- **Flatten output = group containing shape.** Single shape inside a group, even though it could be a bare shape. Preserves the implementation-plan invariant (flatten = group) so future multi-piece flatten outputs (text-glyph-per-shape, exploded patterns) drop in without changing the contract.
- **No source-id tracking.** Edit-in-mode is "open this layer's params for richer editing" rather than "edit the original library item." Simpler mental model; works without library round-trip semantics.
- **Pattern flatten resolves palette refs.** Layer.color may be `palette:primary`; the saved SVG bakes in the resolved hex. Future palette changes don't touch flattened content (intentional — flatten is a one-way snapshot).

## Next Steps
1. **Phase 7** — backwards-dependency cleanup. Lift `WEIGHTS`, `familyFor`, `applyCase` out of `editor/labs/type-lab/cuts.js` into KOL or `src/data/typography.js`. Move `GeneratorLibraryProvider` to `editor/library/`. Tracked in `AGENT-CONTEXT.md` known-gotchas.
2. **Phase 8** — frame-level state. Persistence schema for named frames as presets, autosave behavior, conflict resolution if you reopen a preset that's been edited elsewhere. Wants its own sub-doc before code per the roadmap.
3. (Cleanup, opportunistic) — text flatten via opentype.js; Social/Compositor fold into Compose; folder restructure (`labs/<lab>/` → `modes/<mode>/`); delete the lobby page + `/generators` index.
