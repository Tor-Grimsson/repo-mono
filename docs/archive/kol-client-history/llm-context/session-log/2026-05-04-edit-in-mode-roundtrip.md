# Session: Edit-in-mode round-trip + registry confirmation

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Closed items 2 + 4. Item 4 turned out to be already done — every mode (Compose/Palette/Pattern/Type) uses the EditorShell registry; the deferred-items inventory was inaccurate. Item 2 needed real work: live one-way binding from Pattern/Type lab modes back to the source compose layer.

## Changes Made

### Item 4 — already done
- Verified: `Compose.jsx`, `ComboLab.jsx`, `PatternLab.jsx`, `TypeLab.jsx` all wrap `<EditorShell registry={...}>`. No code change.

### Item 2 — Pattern mode round-trip
- `src/editor/modes/pattern/state.jsx` — added `boundLayerId` state. `loadPattern(item, { boundLayerId })` accepts a binding; passing it pins subsequent edits to that compose layer. New `unbindLayer()` action. `useEffect` watches every pattern field and fires `compose.updateLayer(boundLayerId, ...)` when bound; uses a `skipNextSyncRef` to suppress the first run after `loadPattern` (the values came from the layer itself — re-writing would just be history noise). Auto-clears the binding if the bound layer is deleted in compose. Provider now imports `useComposeState` + `findLayerDeep` from compose.
- `src/editor/compose/inspectors/LayerInspector.jsx` (`PatternFields.onEditInPatternMode`) — resolves `layer.color` / `layer.bg` palette refs to literal hex on entry (Pattern mode operates on hex; verbatim refs would break the renderer) and passes `{ boundLayerId: layer.id }` into `loadPattern`. Palette-ref binding on the source layer is intentionally dropped — same trade-off as the photoshop-paint adoption.
- `src/editor/modes/pattern/PatternControls.jsx` — added a "Linked → Compose layer" badge with Done (unbinds + navigates to /editor/compose) and Unlink (unbinds in place) buttons. Visible only when `boundLayerId` is set.

### Item 2 — Type mode round-trip
- `src/editor/modes/type/state.jsx` — added `boundLayerId` state. `loadType(item, { boundLayerId })` creates the new frame with `id: boundLayerId` so frame.id matches the compose layer.id — that's the natural binding lookup. `updateFrame(id, patch)` intercepts: when `id === boundLayerId`, mirrors only the text-layer-relevant fields (`TEXT_LAYER_FIELDS` allowlist) into compose. Auto-clears the binding if the bound layer is deleted. New `unbindLayer()` action.
- `src/editor/compose/inspectors/LayerInspector.jsx` (`TextFields.onEditInTypeMode`) — resolves `layer.color` palette ref on entry, passes `{ boundLayerId: layer.id }` into `loadType`. `TextFields` now also accepts `palette` as a prop so it can resolve.
- `src/editor/modes/type/TypeControlsPanel.jsx` — same Done/Unlink badge as Pattern mode.

## Current State

### Working
- Click "Edit in Pattern mode" on a compose pattern layer → lands in Pattern mode with the layer's params. Every change (shape / cols / rows / gap / colors / rules / etc.) flows live to the compose layer.
- Click "Edit in Type mode" on a compose text layer → lands in Type mode with a frame whose id matches the layer. Changes to that frame's text/typography flow live to the compose layer.
- Done button unbinds + navigates back to compose. Unlink button unbinds in place.
- Opening a different library item via MenuTop unbinds (loadPattern/loadType called without boundLayerId).
- Deleting the bound layer in compose auto-clears the binding on the next edit.

### Known Issues / Caveats
- **One-way only.** Edits in compose's inspector while a binding is active won't propagate back to Pattern/Type mode. Unusual flow (user is in lab mode while editing in compose), but documented limitation.
- **Palette refs lost on entry.** Layer's `color: 'palette:secondary'` becomes a literal hex when edited via lab modes. Trade-off: lab modes operate on hex; preserving refs would require a translation layer that tracks "edited" vs "untouched" per field.
- **Type mode binding requires the frame to retain its id.** If a future feature renames frame ids on load, the binding lookup breaks. The new `loadType` overrides id explicitly, but other id-mutation paths would need to preserve `boundLayerId` correspondence.
- **Multiple frames in Type mode.** Only the bound frame syncs. Other frames in the type session edit normally and don't affect compose. User can add free-standing frames alongside the bound one.

## Next Steps

1 inventory item remains:

- **Item 9** — Cross-mode `bgOn` semantics. Pattern mode's `bgOn` flag controls whether the tile renders a background; per-pattern-layer `bgOn` does the same but the two states are independent. Needs your call on whether they should sync (and if so, in which direction) or whether the per-layer flag should derive from `spec.bg != null` like the library code already does.

After that the inventory is empty — the editor would be at a clean checkpoint until new work surfaces.
