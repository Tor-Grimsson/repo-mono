# Session: Popover molecule + Tooltip + color shortcuts + filled-control rollback + SwatchStack rewrite

**Date:** 2026-05-03
**Agent:** Grim
**Summary:** Rolled back fg-04 → surface-secondary on filled controls; built `Popover` molecule on `@floating-ui/react` with `Tooltip` variant; wired LayerStack `[+]` and one tool button as proof-of-concept; rebuilt Dropdown options on `MenuDropdownItem` with right-side check; added Color shortcuts (D / X / Shift+X / N); rewrote `SwatchStack` to use persistent fill/stroke identities + position+z-index swap.

## Changes Made

### Files Modified

#### Filled-control rollback (fg-04 → surface-secondary)
- `src/styles/kol-components-atoms.css` — `.kol-control--filled`, `.kol-btn-primary`, `.control-slider span`, `.control-slider-subtle` bg flipped from `var(--kol-fg-04)` (translucent) → `var(--kol-surface-secondary)` (opaque).
- `src/components/molecules/Dropdown.jsx` — open-panel inline `backgroundColor` `var(--kol-fg-04)` → `var(--kol-surface-secondary)`.
- `src/components/molecules/SegmentedToggle.jsx` — active cell `bg-fg-04` → `bg-surface-secondary`.
- `src/components/molecules/ViewToggle.jsx` — icon-variant inset container `bg-fg-04` → `bg-surface-secondary`.

#### Popover molecule (new)
- `src/components/molecules/Popover.jsx` (NEW) — `usePopover` hook (open/onOpenChange + placement + offset/flip/shift middleware + autoUpdate + click/hover/focus/dismiss/role interactions); `PopoverPanel` (FloatingPortal + FloatingFocusManager wrapper, `.kol-popover` chrome); `Tooltip` (hover-triggered convenience wrapper with `.kol-tooltip` chrome and kbd-style shortcut chip).
- `src/styles/kol-components-molecules.css` — `.kol-popover` (surface-secondary bg, fg-08 border, 6px radius, drop shadow, z-1000) and `.kol-tooltip` (no border, 6px radius, mono-11, with `.kol-tooltip-key` kbd chip).

#### Popover wire-up
- `src/editor/compose/LayerStack.jsx` — `AddLayerButton` rewritten from hand-rolled `getBoundingClientRect` + `createPortal` + scroll/resize/Esc/click-outside listeners to `usePopover` + `<PopoverPanel>`. ~75 lines → ~40. Auto-flips up + shifts in viewport for free via `flip()`/`shift()` middleware.
- `src/editor/shell/panels/ToolPalette.jsx` — wraps each Button in `<Tooltip label={meta.label} shortcut={meta.shortcut}>`. Replaces native `title=` for all 5 tool buttons.

#### Dropdown options → MenuDropdownItem
- `src/components/molecules/Dropdown.jsx` — option rendering rebuilt to use `<MenuDropdownItem>` from `MenuItem.jsx`. Active marked by `shortcut={<Icon name="check" size={11} />}` (right-side check, matches MenuTop's Mode/File/Canvas dropdowns). Dropped: bespoke option `<button>`, abs-positioned dot, 0.4-opacity inactive dim, mouse-enter/leave opacity tweens, bespoke padding. sm tier kept compact (paddingX:12, paddingY:4).

#### Palette gaps
- `src/editor/modes/palette/PaletteControls.jsx` — Aspect/Logo, Layout/BG, Pool/Mode rows: `gap-3` → `gap-2`.
- `src/editor/compose/inspectors/PaletteInspector.jsx` — Pool/Mode row `gap-3` → `gap-2`.

#### Color shortcuts
- `src/editor/state/keymap.js` — new "Color" section with 4 entries:
  - `paint-default` `D` — Default fill + stroke (white / black)
  - `paint-toggle` `X` — Toggle fill / stroke focus
  - `paint-swap` `Shift+X` — Swap fill and stroke colors
  - `paint-clear` `N` — Clear focused paint (none) — moved off `/` due to browser quickfind.
- `src/editor/compose/CanvasArea.jsx` — destructured `activePaint, setActivePaint` from `useComposeState`; added 4 cases to keymap switch:
  - `paint-default` → `updateLayer(id, { color: '#FFFFFF', stroke: '#000000' })`
  - `paint-toggle` → `setActivePaint(toggle)`
  - `paint-swap` → `updateLayer(id, { color: layer.stroke, stroke: layer.color })`
  - `paint-clear` → set `color` or `stroke` to null based on `activePaint`.
  - Added to deps array.

#### SwatchStack rewrite (final state)
- `src/editor/color/SwatchControls.jsx` — SwatchStack API changed from `(frontColor, backColor)` → `(fillColor, strokeColor, activePaint)`. Renders TWO persistent-identity circles (one always shows fillColor, the other strokeColor); `activePaint` decides which sits in the FRONT slot (left:15 top:16 z:2) vs BACK slot (left:5 top:6 z:1). Click either → `onSwap`. `FramedSwatch` extended to accept `onClick` (renders as button) and pass through `...rest` (e.g. `data-id`).
- `src/editor/color/ColourPanel.jsx` — `TopRow` reworked: reads raw `activePaint` directly from `useComposeState` (not via `useColorTarget`'s effective fallback), passes `fillColor`/`strokeColor`/`activePaint` to SwatchStack. `swap = () => setActivePaint(toggle)`. EyedropPick `sampleColor` derived from active paint's color.

### Memory
- `~/.claude/projects/.../memory/feedback_floating_ui_everywhere.md` (NEW) — all editor popovers/dropdowns/menus go through `@floating-ui/react`; no hand-rolled portal/position math.

## Current State

### Working
- All `.kol-control--filled` elements (Button primary, ToggleBracket, Stepper, ViewToggle text variant) sit on opaque `--kol-surface-secondary` again.
- `Dropdown` panel and slider chrome opaque.
- `SegmentedToggle` active cell + `ViewToggle` icon-variant container opaque.
- `Popover` molecule live: hook + Panel + Tooltip; `.kol-popover` and `.kol-tooltip` chrome.
- LayerStack `[+]` add-layer dropdown uses `Popover` (auto-flips, escapes overflow:hidden). All 5 ToolPalette buttons use `<Tooltip>`.
- Dropdown options use `MenuDropdownItem` — checkmark on the right matches MenuTop dropdowns.
- Pool/Mode dropdown gap tightened in both `PaletteControls` and `PaletteInspector`.
- Color shortcuts wired: D / X / Shift+X / N. Show in `S` overlay under "Color" section.
- SwatchStack: two persistent-identity circles. Click either OR press X → both physically reposition (front ↔ back, z-index 2 ↔ 1). Visual swap is unambiguous now.

### Known Issues
- Tooltip sweep paused mid-stride. Only ToolPalette converted — every other `title=` in the editor (LayerStack rows, InspectorRail Delete, AssetsBody cards, RuleRow toggle chips, TypeControlsPanel, SwatchControls eyedropper, etc.) still on native `title=`. Roughly 20+ sites still to convert.
- `Dropdown.jsx` still hand-rolls portal + `getBoundingClientRect` + scroll/resize listeners for its own panel. Should migrate to `usePopover` (one swap; flips every Dropdown consumer).
- `MenuItem.jsx` (top-bar Mode/File/Canvas/Templates menus) also still hand-rolls portal+position.
- Inspector ColorField popover unchanged — still uses its own popover pattern.

## Next Steps
1. **Resume Tooltip sweep** — convert remaining `title=` icon-button sites in the editor: LayerStack lock/eye/expand/group/delete buttons, InspectorRail Delete, AssetsBody asset cards, RuleRow toggle chips, TypeControlsPanel snapshot/download, SwatchControls eyedropper, PaletteControls swatch lock, compose/SwatchRow lock.
2. **Migrate Dropdown.jsx panel to `usePopover`** — kills the last `getBoundingClientRect`+scroll/resize block in molecules. Side benefit: `flip()` makes Pool/Mode and similar dropdowns auto-flip up when there's no room below.
3. **Migrate MenuItem.jsx top-bar menus to `usePopover`** — same pattern, removes another hand-rolled positioning block.
4. **Inspector ColorField popover** — fold into `Popover` for consistency.
5. **Active-paint pair in inspector** — the inspector still shows Fill + Stroke as side-by-side fields (W3.2). Consider whether the new SwatchStack-style fill/stroke pair UX should propagate there too.
