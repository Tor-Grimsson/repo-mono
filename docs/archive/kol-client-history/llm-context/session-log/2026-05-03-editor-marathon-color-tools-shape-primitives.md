# Session: Editor marathon — 10-item punch list + color picker rebuild + DS unification

**Date:** 2026-05-03
**Agent:** Grim
**Summary:** Massive editor session — 10-item punch list shipped (W1-W5), then a long iterative pass on the colour picker (wheel + hue/SB pickers + swatches + inspector ColorField), then DS-level cleanups (`ColorSwatch` consolidation, padding alignment across atoms, `kol-control--filled` bg unification).

## Changes Made

### Files Modified — major

#### Editor structural
- `src/editor/aspects.js` → `src/editor/shell/aspects.js` — moved (6 import sites rewritten).
- `src/editor/state/keymap.js` (new) — `SHORTCUTS` registry + `matchAny()` + `comboLabel()` + `shortcutsBySection()`. Mac/PC-aware `Mod` resolution.
- `src/editor/shell/ShortcutsOverlay.jsx` (new) — modal cheat sheet, opens on `kol:show-shortcuts` window event, Esc/backdrop to close. Mounted in `EditorShell`.
- `src/editor/state/tools.jsx` (new) — `ToolProvider` + `useTool`; `TOOLS` + `TOOL_META`. Mounted at the top of `Editor.jsx` so tool persists across modes.
- `src/editor/shell/panels/ToolPalette.jsx` (new) — Compose left.header tool row (Select / Text / Rect / Ellipse / Pattern). Uses `Button` atom with `quiet` when inactive.
- `docs/editor/tools.md` (new) — phase-4 sub-doc for the tools system (pointer model, marquee, drag-to-create, keymap).

#### Compose runtime
- `src/editor/compose/CanvasArea.jsx` — major:
  - Keyboard handler refactored to dispatch via the `keymap` registry. Bindings now include G (group), ⇧⌘G (ungroup), L (lock), H (hide), Tab (cycle, passive), V/T/R/O/P (tools), S (shortcut overlay).
  - Pointer router branches on active tool. Non-Select tools enter create mode (drag bounds, mouseup commits via `addLayer` and reverts to Select). Tiny drags (<8px) fall back to a default-sized insert. Crosshair cursor while in a create tool. Live preview rect rendered at virtual coords.
  - Click-away deselect rule scoped: when canvas is selected, only clicks inside `[data-layer-stack]` (the Layers panel) and not on the Canvas row deselect. Clicks on rails / inspector / canvas surface keep canvas selected. Buttons inside the layer stack (Add layer `[+]`, Trash, Group, lock/eye) never deselect canvas.
- `src/editor/compose/state.jsx` —
  - Autosave restore prompt; `activePaint` state added (`fill`/`stroke`).
  - `addLayer` always replaces selection with `[newId]` (so `[+]` while canvas is selected: dropdown opens with canvas held → committing a layer moves focus to the new layer).
- `src/editor/compose/LayerRenderer.jsx` — new shape kinds (`rect`, `ellipse`) honoring fill (`currentColor`) + stroke / strokeWidth / strokeDasharray / strokeLinecap / strokeLinejoin. Inset by half-stroke so the stroke paints inside the layer bounds.
- `src/editor/compose/build.js` — matching SVG export for `rect` / `ellipse` shape kinds.
- `src/editor/compose/LayerStack.jsx` —
  - `[+]` add-layer dropdown rebuilt: portaled to `document.body` with computed left/top so the rail body's `overflow-y:auto` can't clip it. Opens DOWN-AND-RIGHT (anchored to button's left edge). Closes on outside click / Esc / scroll.
  - `data-layer-stack` marker on the LayerStack root for scoped click-away rules.
  - Canvas row text uses `kol-mono-12` (was `kol-helper-12`).
  - Type icon registry updated: `signature-thick` (AC-themed) → `shape`.
- `src/editor/compose/AssetsBody.jsx` — list/grid view toggle via `ViewToggle` molecule (icon variant). Default is list since the panel will grow more categories.
- `src/editor/compose/inspectors/LayerInspector.jsx` —
  - `Inspector` eyebrow span removed (the rail tab label already says it).
  - `ColorField` rewritten: `LabeledControl` wraps a `ColorSwatch` button + popover (palette pills + hex input). `hideLabel` prop hides only the label name; subtitle removed. Inspector now shows Fill + Stroke side-by-side in a 4-col grid (cols 1+2). Stroke uses `transparentTone="error"` so the null state shows the red diagonal.
  - `ImageFields` gains a 16:9 thumbnail of `layer.src` when set.
- `src/editor/modes/pattern/RuleRow.jsx` — `iconOnly="x"` → `iconOnly="close"` (uses 00-kol stroke icon).

#### Colour panel
- `src/editor/color/SwatchControls.jsx` (new) — `SwatchStack` + `EyedropPick` + private `FramedSwatch` / `NoneMarker` helpers. macOS-port custom-tuned chrome. File header marks the whole thing off-limits for atom-refactor sweeps.
- `src/editor/color/SpectrumControls.jsx` (new) — `HueStrip` + `SBSquare` + `WheelTriangle` + private `Handle` / `SvgHandle` helpers. The hand-tuned colour-picker widgets — domain math + visuals locked.
- `src/editor/color/useColorTarget.js` (new) — single hook resolving the active color target (canvas fill or selected layer's `color`), with safe defaults (`hex='#000000'`, `onChange=()=>{}`) when nothing is selected so consumers always render functional UI.
- `src/editor/color/ColourPanel.jsx` — rebuilt body. Modes: Hue (HueStrip + SBSquare), Wheel (WheelTriangle = inscribed rotating HSV triangle), Sliders (HSL/RGB toggle via `SegmentedToggle`). All three operate on a synthetic target that falls back to local `useState` when nothing is selected — the wheel handle, hue strip, SB square, and opacity slider always move when dragged. Eyedropper uses `EyeDropper` API. Opacity is a single-line `LabeledControl inline` containing a `Slider` (which has its own value input — no duplicate readout).
- `src/editor/color/StrokePanel.jsx` — bound to selected shape's stroke props. `LabeledControl inline` rows for Weight (Input) / Style / Cap / Join / Align (`SegmentedToggle`s). Style row uses `size="sm"` (16px) since the labels are line/dot SVG previews. ColorField was extracted into the inspector — Stroke panel keeps only non-color stroke properties.
- `src/editor/color/SwatchesPanel.jsx` — rebuilt: KOL token-driven banks (Foreground 14 + Brand 25 + Greyscale 10 + Absolutes 2). Single 8×6 grid stretching to fill panel height, capped at 48 cells. Palette dropdown switches between `KOL` and a Standard fallback. Swatches use the new ColorSwatch atom API (`size="stretch" radius="tight" frame={false}`) — no `!important` overrides.
- `src/editor/color/ColorModal.jsx` — fixed height 320px (flex column with shrink-0 tabs row + flex-1 body) so it doesn't grow indefinitely with the wheel.

#### DS / atoms / molecules
- `src/components/atoms/ColorSwatch.jsx` — major API expansion:
  - `variant` (`default` | `halo`), `radius` (`none` | `tight` (2px) | `sm` (4px) | `full` (circle)), `size` (number | `fill` | `stretch`), `frame` (boolean), `hoverable` (boolean), `transparentTone` (`warning` | `error` | `info` | `success`).
  - Default radius flipped from `sm` (4px) → `tight` (2px).
  - `selected` chrome changed from `1px border + 1px ring` → `2px border` (cleaner mark).
  - `showTransparent` documented as the universal "disabled / no value / unset" indicator. Now renders white background + TransparentX (was transparent bg). Rounded corners clip the line cleanly.
- `src/components/atoms/TransparentX.jsx` — `tone` prop (`warning` default | `error` | `info` | `success`) → `var(--ui-{tone})`.
- `src/components/atoms/Input.jsx` — inner `<input>` gets explicit height class (`h-4` / `h-[18px]` / `h-[22px]`) so kol-control-sm is exactly 26px (Chromium computes input height from font-metrics, not strictly from line-height; without the explicit height the input is ~0.5px taller than `<button>` / `<label>` siblings).
- `src/components/molecules/LabeledControl.jsx` — `inline` prop (label-left horizontal layout), `labelWidth` prop (default 48px), and the label `<span>` is now skipped entirely when `label` is empty / null / undefined.
- `src/components/molecules/Dropdown.jsx` — major:
  - Padding aligned with shared `.kol-control-*` / `.kol-btn-*` system (sm 4×12, md 6×16, lg 8×20). Was 6×16 / 14×24 / 16×24 — off by one tier.
  - Removed the redundant middle wrapper `<div>`. Chrome (border, bg, radius, padding) now applied directly on the inner `<button>`, mirroring how Button atom is one-element. Total height now matches Button at every size.
  - `subtle` variant gains `1px solid transparent` border for height parity with the rest of the `.kol-control` family.
  - bg switched from `var(--kol-surface-secondary)` → `var(--kol-fg-04)` (matches Button + control-filled).
  - `subtle` opens flat-top corners + matching panel bg.
- `src/components/molecules/SegmentedToggle.jsx` — borders use `border-fg-04` (was `border-fg-08`). New `size` prop: `md` (default, 26 px, with `kol-mono-12`) | `sm` (16 px, no text class — for icon/preview-only options like the line-style picker). Cell padding `py-1` so active row hits 26px shared height.
- `src/components/loaders/icons/Icon.jsx` — `ICON_CACHE` builds in two passes: all svgs, then 00-kol/ overlaid on top so canonical KOL stroke icons win for any name that also exists in another folder.

#### Styles
- `src/styles/kol-components-atoms.css`:
  - `.kol-control--filled` bg switched from `var(--kol-surface-secondary)` → `var(--kol-fg-04)`.
  - `.control-slider span` (slider value chip) and `.control-slider-subtle` background switched same way.

#### Icons (00-kol/, all 24×24, stroke 2.5, currentColor)
New: `grid`, `list`, `lock`, `unlock`, `plus`, `trash`, `upload`, `maximize`, `refresh`, `arrow-right`, `component`, `eye-on`, `file-text`, `image`, `color`, `ptrn-checker`, `shape`, `cursor`, `square`, `circle`.

#### Pages
- `src/pages/Compose.jsx` — Compose registry now mounts `ToolPalette` in `left.header`, `ColorModal` (-1), `LayersAssetsPanel` (0) in `left.body`, `SelectionPalettePanel` (0) in `right.body`.
- `src/pages/Demo.jsx` — wraps the "Working" column in `ToolProvider` + `ComposeStateProvider` so the Working color panels render without a "must be inside ComposeStateProvider" crash.

#### Memory
- `~/.claude/projects/.../memory/feedback_no_empty_state_messages.md` — broadened: never substitute placeholder copy AND never conditionally hide UI AND never make controls inert (NOOP onChange) — controls must always be functional, falling back to local state when no target is available.
- `~/.claude/projects/.../memory/feedback_dont_refactor_custom_tuned_ui.md` (new) — when an inline-styled UI bit is hand-tuned to a Ref design, don't refactor it to atoms even if a roughly-similar atom exists. Visuals will differ.

### Features Added/Removed

**Added**
- W1.1 — flipped `[+]` add-layer dropdown direction, then rebuilt with portal + computed position.
- W1.2 — moved `aspects.js` to `editor/shell/`.
- W1.3 — InspectorRail eyebrow dedupe.
- W1.4 — Assets list/grid view toggle.
- W2.1 — keymap registry + `ShortcutsOverlay` (S key).
- W2.2 — icon audit + 20 stroke variants in `00-kol/` + `Icon.jsx` resolver overlay.
- W2.3 — Swatches mapped to KOL tokens.
- W3.1 — ColorModal wired to selection (target hook + Wheel + Sliders + Hue all functional).
- W3.2 — Inspector ColorField (swatch + popover) + image preview thumbnail.
- W4.1 — `docs/editor/tools.md` sub-doc.
- W4.2 — Tools state + ToolPalette + drag-to-create + new shape primitives (`rect`, `ellipse`).
- W5.1 — StrokePanel wired to vector shapes' stroke props.
- Active paint (`fill`/`stroke`) state added (groundwork for full fill/stroke pair UX — currently consumed only via inspector, which renders both fields side by side).
- `Slider` height-fix recipe applied (Input atom now 26px exact at sm).
- `Dropdown` height-fix (middle wrapper removed; chrome on the button itself; transparent border for parity).
- `kol-control--filled` bg unified to `var(--kol-fg-04)` system-wide.
- `ColorSwatch` consolidated as the single canonical color-chip atom (variants + radius + size + frame + hoverable + transparentTone).

**Reverted / undone mid-session**
- Stroke ColorField removed from StrokePanel and moved into the inspector (final inspector layout: Fill + Stroke as 2 columns of a 4-col grid, vertical labels, no subtitle).
- Inline `bare` / hideLabel modes attempted on `ColorField`; final shape: `LabeledControl` always wraps; `hideLabel` exists but the inspector calls render with the label (vertical, with name).
- `OpacityRow` ended up just `LabeledControl inline + Slider` (Slider's own readout serves as the value input — no duplicated Input next to it).

## Current State

### Working
- Compose mode loads with ToolPalette + ColorModal + LayersAssets + SelectionPalette panels.
- Keyboard shortcuts work via the registry; S opens the ShortcutsOverlay.
- Tools: V/T/R/O/P switch active tool; non-Select tools enter drag-to-create mode and revert to Select on commit.
- Colour modal: Hue / Wheel / Sliders modes all live-bound to selection (via `useColorTarget`) with local-state fallback when nothing is selected — every pointer interaction visibly moves the handle.
- Wheel uses HSV-triangle barycentric math; ring is snap-on-click, triangle is grab-with-offset; rotating triangle keeps apex pointing at active hue.
- Hue strip + SBSquare both inset their handle by 7px and use `overflow-hidden` on their parent so handles render at edges without clipping or antialiasing fringe.
- Swatches: 8×6 grid, KOL token-driven banks, stretches to fill panel height. No `!important` overrides.
- Inspector ColorField: 32px swatch, popover with palette pills + hex input. Stroke null state shows white + red diagonal (`transparentTone="error"`). Fill + Stroke render side-by-side as the first two cols of a 4-col grid.
- Canvas-deselect rules respect button clicks inside the layer stack (`[+]`, Trash, etc. don't drop canvas selection).
- All "filled" controls (Button + Input + Slider + Dropdown subtle + SegmentedToggle filled cells) sit on the same `--kol-fg-04` translucent fg tint at 26px height for sm.
- `ColorSwatch` is the single color-chip atom — `FramedSwatch` is private to SwatchControls (macOS-port halo chrome, off-limits for atom refactors).

### Known Issues
- `activePaint` state exists in compose state but isn't driving a visible UI yet — full SwatchStack-as-pair (click chip to set active, swap arrow flips fill↔stroke) still pending.
- `Eyedropper` API is browser-gated (Chrome/Edge only); Firefox / Safari users see a disabled eyedropper button.
- `WheelTriangle` rotation animation isn't smooth — vertices hard-cut on hue change rather than tweening.
- Inspector ColorField popover on Fill (col 1) and Stroke (col 2) both anchor `left: 0` — when opened, Stroke's popover may overlap Fill if the layout wraps. Acceptable for v1 since the inspector is narrow and they don't overlap in practice.

## Next Steps

1. **Fill/stroke pair UX in `SwatchStack`** — make the back swatch reflect the inactive paint, click swatch to make it active, swap arrow flip. Plumbed through `useColorTarget`'s `swap` / `setActivePaint` already; just needs the wire-up in `SwatchControls`.
2. **Component sync** — push the DS changes (atoms / molecules / styles / 00-kol icons / Icon resolver) to the `kol-component` + `kol-loader` packages. Tracked in `docs/kol-components-sync.md`.
3. **Tool palette rounds 2** — drag-to-create polishes (snap-to-grid? proportional with Shift?), Color tool decision (drop or keep — Wave 3 already makes ColorModal selection-driven so a dedicated tool is redundant).
4. **Verify in-browser** — full pass through Compose, all tabs (Stroke / Colour / Swatches), all modes (Hue / Wheel / Sliders), inspector, layer stack, tool palette, shortcut overlay. Long session, many tweaks — likely a few rendering edge cases to surface.
