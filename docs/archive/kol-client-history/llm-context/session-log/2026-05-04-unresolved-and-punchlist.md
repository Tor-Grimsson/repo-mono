# Session: Unresolved bugs + new punch list

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Honest checkpoint. Two bugs from the toolbar/cursor work remain UNRESOLVED after multiple iteration attempts; recording them so the next session doesn't lose track. User then surfaced 9 new items spanning text layer, selection, color consistency, shape options, icon audit, and eyedropper.

## Unresolved bugs (carried forward)

### U1 — Tool cursor doesn't reflect tool selection
**Symptom:** Selecting a tool from the toolbar (Text / Shape / Pattern) does not change the canvas cursor to the tool-appropriate glyph. Tool state itself updates correctly (button active state shows). User confirmed keyboard shortcuts (T/R/O/P) DO change the cursor; only toolbar-click path fails to translate.

**What I tried (none fixed it):**
- Added `data-tool` attribute on stage + CSS rule for layer cursor inheritance.
- Quoted SVG cursor URLs.
- Removed `<Tooltip>` wrapper from `ToolButton` and `ShapeDropdown`.
- Switched `CURSOR_FOR_TOOL` from custom SVG cursor URLs to plain system cursors (`crosshair` / `text` / `cell`).
- Lifted the cursor style from the stage div to CanvasArea's outer wrapper.
- Made `PanViewport` skip its `cursor: 'default'` override at rest.

**Status:** Cursor still doesn't reflect tool. Root cause not identified. The user's diagnostic (keymap works, click doesn't, even though both call the same `setTool`) wasn't followed up properly with a targeted instrumentation step.

**Files touched (in case revert needed):** `src/editor/compose/CanvasArea.jsx`, `src/editor/shell/Canvas.jsx`, `src/editor/shell/panels/ToolPalette.jsx`, `src/editor/styles/kol-editor.css`.

### U2 — Drawn-object position doesn't match cursor coordinate
**Symptom:** When drawing a shape with the create tool, the resulting layer doesn't appear at the cursor position.

**What I tried:** Nothing meaningful. Did not isolate the math, did not instrument `clientToVirtual`, did not reproduce.

**Status:** Unresolved. Likely candidates to investigate next: `clientToVirtual` in `CanvasArea.jsx` (uses `stageRef.current.getBoundingClientRect()` divided by `scaleRef.current`); coordinate handling when click originates outside the stage bounding rect; whether pan transforms or CanvasFrame's `transform: scale()` are throwing off the math.

## New punch list (raised this session, not yet started)

1. **Text layer — alignment options missing.** Text layer inspector should expose left / center / right alignment.
2. **Marquee selection.** Drag-select multiple layers with a marquee rectangle on the canvas.
3. **Alignment of selection.** Align tool for multi-layer selection (left / center / right / top / middle / bottom edges).
4. **Palette vs Swatches swatch style mismatch.** Swatches in the Palette panel render differently than swatches in the Swatches panel.
5. **Color panel swatch divergence across modes.** Color panels in Pattern mode and Type mode use yet other swatch styles. Three+ swatch implementations exist; should converge to one component.
6. **Shape layer insertion goes straight to Logo.** Adding a shape layer from the [+] menu should give a shape-kind picker (rect / ellipse / logo / …) rather than defaulting to logo.
7. **Shape tool variants too narrow.** Currently rect + ellipse only. More primitive shapes should be included.
8. **Icon audit.** Inventory every icon used in the editor (DS-loaded vs editor-loaded vs unused).
9. **Eyedropper tool doesn't work.** Wire it up.
10. **Snapping.** Drag/resize should snap to canvas edges, canvas center, and other layers' edges/centers (Figma-style alignment guides).
11. **Capitalization inconsistency.** Layer names (and labels throughout the app) are sometimes capitalised, sometimes not. Pick a convention and apply it consistently. Layer rows in particular show `text` / `pattern` lowercase next to `Canvas` / `Group` capitalised; pick one. Audit needed across inspector titles, toolbar labels, library item names, dropdown options.

## Current State

### Working
- Toolbar tool selection updates tool state correctly.
- Layer color swatch in row removed; type icon always renders.
- Color picker popover no longer deselects layer (PopoverPanel carries `data-editor-keep-selection`).
- HSL/RGB sliders use horizontal layout (no overlap with opacity slider).
- 6th palette slot (Background) exposed in Fill / Stroke popover.

### Known Issues / Caveats
- See U1 + U2 above.
- New punch list items 1–9 outstanding.

## Next Steps

User to direct. The honest order I'd propose:

1. Stop and instrument U1 + U2 properly before touching anything else (add a temporary `console.log` or visible debug overlay in `useTool`'s setter to confirm where the chain breaks). Either fix or escalate as known limitation.
2. Then tackle the new punch list — items 4 + 5 (color swatch consolidation) pair naturally; items 6 + 7 (shape options) pair; items 1 + 2 + 3 are independent text/selection work; item 8 is an audit; item 9 is a standalone bug.
