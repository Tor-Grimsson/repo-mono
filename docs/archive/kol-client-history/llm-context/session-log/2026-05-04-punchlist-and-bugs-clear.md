# Session: 11-item punch list + U1/U2 unresolved bugs cleared

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Worked the outstanding items from `2026-05-04-unresolved-and-punchlist.md` end-to-end. Both unresolved bugs (U1 cursor / U2 coord) addressed; 10 of 11 punch list items shipped or closed; item 1 (text alignment) confirmed already shipped, replaced with the user's text-input visibility fix.

## Phase 0 — Bugs

- **U1 cursor**: dropped the redundant inline `cursor:` style on the stage div (kept the wrapper-level one — cursor is an inherited CSS property, descendants pick it up). `ToolPalette` ToolButton + ShapeDropdown trigger + variant-pick now call `e.currentTarget.blur()` after `setTool` so focused-button state can't suppress the canvas cursor refresh.
- **U2 drag-create position**: `clientToVirtual` now reads scale fresh from `stageRef.getBoundingClientRect()` per call instead of a `scaleRef` cached via `ResizeObserver`. RO does not fire on CSS-transform changes, so the cached scale went stale on window resize. Drag move-handler also computes `s` fresh per pointermove.

## Phase 1 — Swatch consolidation (items 4 + 5)

- Rewrote `compose/SwatchRow.jsx` to render the swatch chip via the DS `ColorSwatch` atom; lock overlay sits in a sibling absolute span (group-hover pattern). Hex input switched to `variant="filled"`.
- `modes/palette/PaletteControls.jsx` dropped its near-duplicate local `SwatchRow` and imports the compose one. Single component, one visual treatment.
- `SwatchStack` / `FramedSwatch` (macOS-port hand-tuned) left intact per their `DO NOT refactor` header.

## Phase 2 — Shapes (items 6 + 7)

- New `shape-math.js` exports `regularPolygonPoints`, `starPoints`, `trianglePoints`. Both `LayerRenderer.ShapeLayer` and `build.js::shapeLayerSvg` import from it so DOM render and SVG export stay in sync.
- 4 new shape kinds: `triangle` · `line` · `polygon` (3-12 sides) · `star` (3-12 points + 0.2-0.9 inner ratio). Render branches added with stroke inset, dasharray/cap/join propagation. Build-export gets a `polygon`-style path for triangle/polygon/star with `transform="translate"`, plus a dedicated `<line>` branch.
- 4 new toolbar icons in `editor/icons/svg/`: `tool-{triangle,line,polygon,star}.svg` (24×24, currentColor stroke, matches existing `tool-rect`/`tool-ellipse` style).
- `tools.jsx::TOOL_META` + `TOOLS` extended; `ToolPalette::SHAPE_VARIANTS` lists all 6.
- `CanvasArea::commitCreateDrag` switch handles new tools with sensible defaults (line is stroke-only, polygon defaults sides=5, star defaults 5 points + 0.5 ratio).
- `LayerInspector` gained a "Kind" dropdown (8 options including `flatten`) so users can switch a shape layer's kind in place. Polygon adds a Sides slider (3-12); Star adds Points (3-12) + Inner ratio (0.2-0.9) sliders.
- `AddLayerButton` "Shape" entry now expands as a `MenuDropdownNest` listing all kinds with their tool icons. Picking creates the shape with the right defaults instead of always defaulting to Logo.

## Phase 3 — Selection + alignment (items 1†, 2, 3)

- **Item 1†** (text alignment): already shipped at `LayerInspector.jsx:512-514` (TextFields). User confirmed and surfaced a different bug — text inputs invisible at rest. Fix: `.kol-control--ghost` rest now has `background-color: var(--kol-fg-absolute-04)` so the input bounds are discoverable without hovering. Hover/focus still adds the border for affordance.
- **Item 2** (marquee): `CanvasArea` adds a `mode: 'marquee'` drag branch. Pointerdown on empty stage with the Select tool starts a rect; pointermove tracks bounds; pointerup runs an AABB intersection against every positioned layer and writes the result via the new `selectMany(ids, { additive })` action. Tiny drags (<4 vpx) fall through to the original click-deselect. Shift-marquee is additive.
- **Item 3** (multi-align): new `compose/AlignmentPanel.jsx` with 6 buttons rendered in `InspectorRail`'s multi-layer branch. New compose action `alignSelected(axis, mode)` computes the common bbox and writes new `x`/`y` per axis+mode (start/center/end). 6 new editor-scope SVGs `align-{h,v}-{start,center,end}.svg`. Bbox helper extracted to `compose/bbox.js`.

## Phase 4 — Snapping (item 10)

- New `compose/snap.js` exports `computeSnapTargets(layers, excludeId, w, h)` and `findSnap(rect, targets)`. Threshold = 6 vpx. Snap targets per axis include canvas edges + center plus every non-active layer's left/center-x/right (h) and top/middle-y/bottom (v).
- Wired into `CanvasArea`'s `mode === 'move'` branch — applies `snap.dx/dy` to the candidate position before committing. Magenta guide lines render across the canvas while a snap is engaged; cleared on pointerup.
- Resize-snap not implemented (move-only for v1).

## Phase 5 — Eyedropper (item 9)

- `EyeDropper` API path was already correct in principle. Tightened the catch block to surface real errors in dev (anything other than `AbortError` — the cancellation type) via `console.warn`. Cancellation stays silent. Disabled-state on unsupported browsers was already in place.

## Phase 6 — Sweep work (items 8 + 11)

- **11 (capitalization)**: new `compose/labels.js` is the single source for `TYPE_LABELS`, `SHAPE_KIND_LABELS`, `labelForLayer` (verbose, e.g. `Shape · Rectangle`), and `rowLabelForLayer` (compact — text shows content, shape shows kind). `LayerStack` row labels now use it; `InspectorRail` imports `labelForLayer` from there. Drops the `<group>` lowercase row label and the `layer.content || 'Text'` bug (field is `text`, not `content`).
- **8 (icon audit)**: new `docs/editor/reference/icons.md` enumerates every editor-scope SVG (26 icons across tool / cursor / layer / align categories), the lookup maps that consume them, and DS icon references found in editor code. Notes the known stale `rack` registry entry.

## Files touched (high-level)

- `editor/compose/CanvasArea.jsx` — cursor cleanup, fresh-scale math, marquee mode, snap-on-move + guide rendering.
- `editor/compose/LayerRenderer.jsx` — 4 new shape render branches + helper extraction.
- `editor/compose/build.js` — export branches for triangle/line/polygon/star.
- `editor/compose/state.jsx` — `selectMany`, `alignSelected` actions; both exposed.
- `editor/compose/LayerStack.jsx` — row labels via `rowLabelForLayer`, AddLayerButton shape-kind nest.
- `editor/compose/InspectorRail.jsx` — drops local label maps, mounts `AlignmentPanel` in multi-select branch.
- `editor/compose/inspectors/LayerInspector.jsx` — Kind dropdown, polygon Sides slider, star Points + InnerRatio sliders.
- `editor/compose/SwatchRow.jsx` — full rewrite onto `ColorSwatch`.
- `editor/compose/labels.js` (new), `bbox.js` (new), `snap.js` (new), `shape-math.js` (new), `AlignmentPanel.jsx` (new).
- `editor/modes/palette/PaletteControls.jsx` — drop local SwatchRow, import compose one.
- `editor/state/tools.jsx` — 4 new tool ids (triangle/line/polygon/star).
- `editor/shell/panels/ToolPalette.jsx` — 4 new shape variants in dropdown; blur-on-click.
- `editor/color/ColourPanel.jsx` — eyedropper catch logs real errors in dev.
- `styles/kol-components-atoms.css` — `.kol-control--ghost` rest bg = `fg-absolute-04`.
- `editor/icons/svg/` — 4 tool icons + 6 alignment icons (10 new SVGs).
- `docs/editor/reference/icons.md` (new).

## Follow-up — second pass (same day)

Three follow-ups after the user reviewed the first pass:

- **Snap on/off in File menu** — `compose/state.jsx` gains a session-only `snapEnabled` flag (default true) + `toggleSnap` action. `MenuTop` File dropdown adds a `Snap to guides` item with a check icon when on. `CanvasArea` move-handler bypasses snap when disabled.
- **Line as pen tool** — drag-create gone for line. `CanvasArea` `tool === 'line'` now does click-click placement: first click sets `linePlacement = {x1, y1}` and starts a dashed preview line tracking the cursor; second click commits a shape layer with `kind: 'line'`, bbox derived from the two points, and a `slope` field (`'\\'` or `'/'`) encoding which bbox diagonal to render (preserves direction across move/resize). Esc cancels, switching tool cancels. `LayerRenderer` + `build.js` line branches read `slope` to pick endpoints. Inspector gets a Slope ViewToggle (↘ / ↗) for line layers. `LayerStack`'s shape-kind add menu drops Line (pen-tool only — switching kind in the inspector still works as a default-diagonal fallback).
- **Canvas-internal eyedropper** — replaces the native `EyeDropper` API. New `editor/color/canvasEyedropper.js::pickFromCanvas` builds the canvas SVG via `build.js`, draws the canvas fill + SVG image to an offscreen `<canvas>` at virtual-pixel resolution, then waits for one click on the stage, samples `getImageData(vx, vy, 1, 1)`, returns the hex. Esc cancels. `ColourPanel.onPickEyedrop` wires it. `EyedropPick`'s `disabled={!supported}` gate is dropped — works in every browser now.

## Editor owns its icons (third-pass refactor)

Audit found 15 icons referenced by editor code that still resolved through KOL `Icon` (directly via `<Icon name=...>`) or KOL `Button` (via `iconLeft="plus"` etc., where Button internally renders `<Icon>`). Migrated end-to-end:

- Copied 15 SVGs into `src/editor/icons/svg/` — chevron-down, close, eyedrop, swap, component, check, plus, trash, upload, refresh, maximize, lock, unlock, eye-on, eye-off. Same content as the KOL copies; editor's `EditorIcon` glob picks them up. Two registries, deliberately parallel — KOL serves shared atoms, editor serves itself.
- New `src/editor/components/EditorButton.jsx` mirrors the KOL `Button` API (variant / size / iconLeft / iconRight / iconOnly / iconLeftHover / iconRightHover / iconOnlyHover / quiet / animateIcon / iconSize / disabled / onClick / type / className / style + arbitrary aria/data props). Drops the `<a href>` link branch (editor never needs it). Uses `EditorIcon` internally. Shares the same `kol-btn-*` CSS classes (those are in `kol-components-atoms.css`, upstream-shared) so the look stays consistent.
- Swept every editor file: `<Icon>` → `<EditorIcon>`, `<Button>` → `<EditorButton>`, import paths flipped accordingly. Files touched: `compose/LayerStack`, `compose/SwatchRow`, `compose/InspectorRail`, `compose/inspectors/{LayerInspector,PaletteInspector}`, `color/{PanelTabs,SwatchControls}`, `shell/{MenuTop,ShortcutsOverlay}`, `modes/pattern/{ColorPicker,PatternControls,RuleRow}`, `modes/type/{TypeControls,TypeControlsPanel}`, `modes/palette/PaletteControls`. Editor now contains zero references to KOL `Icon` or KOL `Button`.
- `src/components/atoms/Button.jsx` left untouched — earlier exploratory edit (adding string-OR-node icon support) reverted to keep the upstream atom clean of editor-flavored code paths.
- `docs/editor/reference/icons.md` rewritten to document the new structure.

## Known limitations (post follow-up)

- Snap engages on move only; resize-snap deferred.
- Drag-creating a polygon/star uses default sides=5 / points=5; users tweak via the inspector after creation.
- Eyedropper rasterizes via SVG-as-image. `foreignObject` text content sometimes renders blank in canvas drawImage (browser security on SVG data URLs); text-layer pixels may sample as the canvas fill rather than the text color.
- KOL Button updates won't auto-propagate to EditorButton — manual sync needed when new variants/behaviors land.
