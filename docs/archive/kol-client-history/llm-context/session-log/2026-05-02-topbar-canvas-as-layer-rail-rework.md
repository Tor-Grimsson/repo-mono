# Session: Topbar Menu, Canvas-as-Layer, Layer Rail Rework

**Date:** 2026-05-02
**Agent:** Grim
**Summary:** Replaced rail-mounted FrameHeader / Aspect / LibraryTab with a `MenuTop` topbar (Mode / File / Canvas / Templates). Canvas became a selectable parent in the layer stack. Inspector + Layers stacked in the left rail. Layer rows redesigned per Figma: chevron outside the pill, lock/eye absolute-positioned, hover-only by default. Editor CSS extracted from `kol-framework.css` to its own file.

## Changes Made

### Files Modified
- `src/components/molecules/MenuItem.jsx` (new) — `MenuItem` (top-level entry: trigger button + popover panel) + `MenuDropdownItem` (action row inside) + `MenuDropdownDivider` + `MenuDropdownNest` (accordion-style sub-section). Replaces the earlier `MenuPopover.jsx` (still on disk, unused).
- `src/components/molecules/Dropdown.jsx` — chevron now uses Icon loader (`<Icon name="chevron-down">`), no inline SVG.
- `src/components/atoms/Button.jsx` — new `ghost` variant. Updated docstring.
- `src/components/atoms/Slider.jsx` — value readout is now an editable `Input` atom (commit on Enter / blur, Escape reverts).
- `src/components/molecules/ViewToggle.jsx` — `variant="single"` width-locked via stacked grid (both labels in same cell, one invisible) so the button doesn't reflow.
- `src/components/loaders/icons/svg/00-kol/check.svg` (new) — 24×24 stroke 2.5 currentColor checkmark, aligned with chevron-up/down style. Currently unused (the menu active marker switched to a small dot to match Dropdown's pattern, then back to a check via `shortcut={<Icon name="check"/>}`).
- `src/styles/kol-components-atoms.css` — new `.kol-btn-ghost` rule.
- `src/editor/shell/MenuTop.jsx` (new) — top bar above the editor grid. Title (preset name / "Untitled") + Mode / File / Canvas / Templates menus. Replaces `EditorTopbar.jsx` (still on disk, unused). All four panels share `w-[220px]` width.
- `src/editor/EditorShell.jsx` — wraps grid in `kol-editor-shell` flex column with `MenuTop` above the grid. Imports `./styles/kol-editor.css`. Rail rendering skips empty `rail-header` (no double border below now-empty left.header).
- `src/editor/styles/kol-editor.css` (new) — all `.kol-editor-*` + `.kol-compose-*` rules + `.kol-grid-bg` + `.kol-checker` moved here. Imported from `EditorShell.jsx`. Dropped dead rules: `.kol-compose-layer-btn`, `-actions`, `-sub`, `-item`, `.kol-compose-add-btn`.
- `src/components/framework/kol-framework.css` — editor / compose / grid-bg / checker rules removed. Stub comments left at the migration sites.
- `src/pages/Compose.jsx` — registry: `LayerStack` (top) + `ToolPropertiesPanel` (bottom) in `left.body`; `PalettePanel` only in `right.body`. Mode tabs / FrameHeader / LibraryTab dropped (now in topbar).
- `src/editor/modes/{palette,pattern,type}/{ComboLab,PatternLab,TypeLab}.jsx` — same registry trim (no `ModeTabsPanel`, no `LibraryTab`).
- `src/editor/compose/state.jsx` — added `view` ('single'|'social'), `canvasFill`, `canvasFillOpacity`, `canvasVisible`, `canvasLocked`, `selectCanvas` (selects 'canvas' + every top-level layer id), `toggleLayerLock`. Added `locked` field to layer shape. Autosave/restore include `canvas.fill` and `canvas.fillOpacity`. Dropped `'aspect'` as a frame-slot selection id (canvas as layer replaces it).
- `src/editor/compose/CanvasArea.jsx` — Social view renders 3 read-only frames at 1:1 / 4:5 / 9:16 side-by-side via `flex-1`. `bgColor` falls back to `canvasFill` (with opacity baked in via inline `hexWithAlpha` helper) instead of the legacy background layer. Dropped `kol-checker` (transparent areas reveal the grid). Locked layers ignore drag and resize. Document-level mousedown listener deselects on any click outside `.kol-compose-layer-row` (the pill itself).
- `src/editor/compose/LayerStack.jsx` — Canvas at the TOP of the layer list with its own chevron toggling visibility of all child layers. `<ul>` indent (`px-4`) aligns layer pills with the LAYERS rail-head text. Single `+` icon-only ghost button replaces the 3-col Add layer grid. Layer rows redesigned: chevron sibling outside the pill (`.kol-compose-layer-line`), pill is a flex container (`.kol-compose-layer-row`), main button has `flex: 1 1 auto` to fill clickable area. Lock/eye buttons absolute-positioned at right edge (`right-7` / `right-0`, `inset-y-0`, `w-7`), hover-only by default (`opacity-0 group-hover:opacity-100`), full opacity when locked / hidden. `min-h-[240px]` on the panel.
- `src/editor/compose/InspectorRail.jsx` — routes `selectedId === 'canvas'` to `CanvasInspector`. Dropped "nothing selected" body message — empty title + no body when nothing is selected.
- `src/editor/compose/inspectors/CanvasInspector.jsx` (new) — Fill (reuses `ColorField` exported from `LayerInspector`) + Fill opacity slider.
- `src/editor/library/starters.js` — comment updated to reference topbar Templates menu.
- `src/editor/modes/pattern/{PatternControls,PatternLab,PatternCanvas}.jsx` — Pattern Rules folded back into `PatternControls`; `PatternRulesPanel.jsx` deleted. Pattern canvas drops `kol-checker`. Stretch / Overflow / Bg toggles use `variant="single"`.
- `src/editor/modes/pattern/abstracts/*` (new) — copies of `abstract-{01,02,03,06}.svg` from `src/components/loaders/graphics/svg/abstract/` so `shapes.js` can glob them locally. Originals stay in place for the Reference asset table.
- `src/editor/modes/pattern/shapes.js` — glob path updated to `./abstracts/*.svg`.
- `src/editor/modes/pattern/RuleRow.jsx` — `ToggleChip` migrated to `<Button variant="outline"|"primary">`; re-randomize / remove icons migrated to `<Button variant="ghost" iconOnly />`.
- `src/editor/library/LibraryTab.jsx` — deleted (content now lives in `MenuTop`'s Templates menu).
- `src/editor/shell/panels/FrameHeaderPanel.jsx` — deleted (Save / Save-as / Clear / Export / Undo / Redo now in MenuTop's File menu).
- `src/editor/compose/inspectors/AspectInspector.jsx` — deleted (Aspect now in MenuTop's Canvas menu).
- `src/editor/shell/panels/ModeTabsPanel.jsx` — kept on disk but unmounted; Mode lives in MenuTop.
- `src/editor/shell/Canvas.jsx` — pan layer wraps the artboard PLUS an oversized grid backdrop (~5× viewport, offset `-200%/-200%`) so panning never reveals an edge. Default frame border is now `1px solid` at 24% opacity (was dashed at 40%).
- `docs/kol-components-sync.md` — running list of components / icons / styles edited this round that need syncing upstream to `kol-components`. Updated with everything above.

### Features Added/Removed
- **Topbar (`MenuTop`)** — Mode / File / Canvas / Templates as menus. Replaces FrameHeader, AspectInspector frame-slot, LibraryTab.
- **Canvas as a layer** — top of the layer stack, parent of all layers, has its own fill / opacity (replaces the `background` layer type for new presets). Selecting Canvas selects every top-level layer alongside (`selectCanvas`).
- **Social view** — `Canvas → View → Social` renders 1:1 / 4:5 / 9:16 frames side-by-side (read-only preview).
- **Click-away deselect** — clicking anywhere except inside `.kol-compose-layer-row` clears the selection.
- **Layer lock** — `layer.locked` blocks drag and resize on the canvas; selection still works so you can see what's locked.
- **Layer eye / lock UI** — absolute-positioned right-edge buttons, full-row-height (26px), hover-only when default, full opacity when locked / hidden.
- **Editor CSS file extracted** to `src/editor/styles/kol-editor.css`.
- **Removed**: dashed checker pattern from canvas (transparent now reveals the grid). Background as a layer type from `LAYER_TYPES`. The blending sub-panel under each row (visibility / opacity / blend now live in the inspector).

## Current State

### Working
- Topbar menus (Mode / File / Canvas / Templates) — all four 220px wide, chevron rotates, hover doesn't pin a bg, active item shows a check icon.
- Templates uses `MenuDropdownNest` (accordion) — sections expand inline below the row, indent + 1px left border for hierarchy.
- Canvas-as-layer with chevron toggle for child visibility, lock/eye icons (hover-only / state-shown).
- Selection: clicking the row pill selects the layer, clicking anywhere else deselects.
- Locked layers can't be dragged / resized.
- Click-away listener at document level filters by `.kol-compose-layer-row` ancestor.
- Layer panel min-height 240px.
- Editor CSS file isolated, framework CSS no longer carries editor rules.
- Compose registry: Layers (left.body, top), Inspector (left.body, bottom), Palette (right.body).

### Known Issues
- Old files left on disk but unreferenced: `src/editor/shell/EditorTopbar.jsx`, `src/components/molecules/MenuPopover.jsx`. Decided not to delete during edit round.
- `canvasVisible` / `canvasLocked` state captured but don't yet drive rendering (eye doesn't actually hide the canvas, lock doesn't prevent canvas-fill edits).
- Multi-aspect Social view is read-only — drag/select disabled in that mode.
- `src/components/loaders/icons/svg/00-kol/check.svg` shipped but the menus currently use it via `shortcut={<Icon name="check" />}` — earlier rounds tried a circle-dot indicator; check is the version that stuck.
- A bunch of CSS-vs-Tailwind back-and-forth this session left some cruft in `kol-editor.css` that could be inlined as Tailwind utilities on the JSX (per user direction "Tailwind first").
- `ModeTabsPanel.jsx` still on disk but no longer in any registry.

## Next Steps
1. Delete the unreferenced files (`EditorTopbar.jsx`, `MenuPopover.jsx`, `ModeTabsPanel.jsx`) once user signs off — held back since they wanted to review first.
2. Wire `canvasVisible` (hide all layers when off) and `canvasLocked` (block fill edits).
3. Multi-aspect canvas — make the Social view interactive (or explicitly mark it as preview-only and hide drag/resize handles entirely).
4. Trim `kol-editor.css` further — many of the row utilities are now Tailwind on the JSX; the CSS file should drop to just true cross-element / state / pseudo rules.
5. Migrate `background`-typed layers in saved presets on load (currently they still render via legacy fallback in CanvasArea).

