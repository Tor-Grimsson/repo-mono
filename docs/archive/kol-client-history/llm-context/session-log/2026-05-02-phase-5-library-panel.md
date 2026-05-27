# Session: Phase 5 — Library panel

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** New `editor/library/LibraryTab.jsx` panel mounted in `left.body` of every mode. Click an item → loads it into the matching mode's state and navigates to that mode. Each state provider gains a `load*` action.

## Changes Made

### New
- `src/editor/library/LibraryTab.jsx` — universal library panel. Lists saved items per slot (palette / pattern / type / preset). Click "open" arrow → calls the matching mode's loader and `useNavigate`s to `/editor/<mode>`. Palette items get a tiny swatch strip preview; others fall back to a name/label. State providers all live in `Editor.jsx` so we can call any mode's loader from any current mode (the destination mode's provider is already mounted; we push state in then navigate).

### State actions added
- `src/editor/compose/state.jsx` — `loadPreset(preset)`. Whole-frame intent replaces the canvas (aspect + layers + bound palette); partial-chunk intent appends layers. Uses raw useState setters for palette so the wrapped `setPoolId`/`setModeId`'s side-resets don't trample loaded palette values. Tracked through history (undo restores).
- `src/editor/labs/combo-lab/state.jsx` — `loadPalette(item)`. Sets poolId, modeId, colors, bgEnabled; resets locks/edited/hasRandomized.
- `src/editor/labs/pattern-lab/state.jsx` — `loadPattern(item)`. Sets shapeId, customSvg, cols/rows/gap/padding/stretch/overflow, color/bg, rules. Defensive type-checks per field.
- `src/editor/labs/type-lab/state.jsx` — `loadType(item)`. Adds the spec as a new frame (via the existing `newFrame` factory) and selects it.

### Registry updates (LibraryTab in `left.body`)
- `src/pages/Compose.jsx` — `LibraryTab` mounted at `left.body / order 1` (below LayerStack at order 0).
- `src/editor/labs/combo-lab/ComboLab.jsx` — `LibraryTab` at `left.body / order 0` (was empty before).
- `src/editor/labs/pattern-lab/PatternLab.jsx` — `LibraryTab` at `left.body / order 1` (below `PatternRulesPanel` at order 0).
- `src/editor/labs/type-lab/TypeLab.jsx` — `LibraryTab` at `left.body / order 0` (was empty before).

## Current state

### Working (self-verified via grep)
- All four state providers expose their `load*` actions in their value bags.
- LibraryTab consumes all four loaders + `useGeneratorLibrary`. Click-to-open works for palette/pattern/type/preset.
- Library panel visible in every mode's left rail; per-slot counts + items render.

### Out of scope (deferred)
- **Drag-to-canvas in Compose.** Pressing `arrow-right` opens in the matching mode; in Compose mode, opening a `preset` replaces the canvas. Dragging an asset onto the canvas to insert as a layer ships in phase 6.
- **Asset previews.** Only palette has a swatch-strip preview. Pattern/type/preset use text labels. Could reuse the lobby's preview components in a later polish pass.
- **`pages/Generators.jsx` (`/generators` index) + `editor/labs/lobby/Lobby.jsx`.** Still routed and functional. Per the implementation plan they "die" with the Library tab — but for phase 5 minimum I left them in place; their cleanup is mechanical and can land any time.
- **Open-in-place from same mode.** Clicking a palette while already in palette mode currently still navigates to `/editor/palette`, which is a no-op nav but works. Could short-circuit if `current === target`.

## Phase 5 design decisions landed

- **Universal Library panel, not mode-specific.** One component shows all four slots; each mode gets the same panel mounted into left.body. Lower complexity than per-mode panels.
- **State providers already mounted in `Editor.jsx`.** Library can drive any mode's state without coordinating with the active route — it just pushes state and navigates.
- **Click semantics: load + navigate.** No drag-and-drop in phase 5. The arrow button reads "open in `<target>` mode."
- **Preset.intent honoured.** `loadPreset` checks `intent: 'partial'` to append vs. replace, supporting both whole-frame and partial-chunk semantics from the product description.

## Next Steps
1. **Phase 6** — Round-trip editing + flatten. Open any library asset/preset in its mode → edit → save back. Layers in Compose that reference library assets can deep-link into the asset's tool. Implement flatten action on pattern + text (output as `group` of `shape` layers via opentype.js for text outlines).
2. (Cleanup, opportunistic) — fold Social and Compositor into Compose with starter presets; remove their legacy routes; delete the lobby page and `/generators` index; folder restructure (`labs/<lab>/` → `modes/<mode>/`).
