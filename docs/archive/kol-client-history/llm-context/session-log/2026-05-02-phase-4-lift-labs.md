# Session: Phase 4 — Lift labs into the shell

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Combo Lab, Pattern Lab, Type Lab all refactored from `GeneratorLayout` (stage + 320 aside) to per-mode registries mounted in `EditorShell`. State providers lifted to `Editor.jsx` so cross-mode switching preserves state. Legacy `/compose` and three `/generators/*` routes redirect to `/editor/:mode`.

## Sub-phases

### 4a — ComboLab → Palette mode
- New `editor/labs/combo-lab/state.jsx` — `PaletteStateProvider` + `usePaletteState`. Lifted ComboLab's local-useState pile (aspect, layoutId, logoId, bgOn, poolId, modeId, colors, locks, etc.) into context. Action functions (toggleBg, changePool, changeMode, randomize, reset, etc.) included.
- New `editor/labs/combo-lab/PaletteCanvas.jsx` — canvas content. Mounts `<Canvas>` + active layout component with live `displayPalette` + logo.
- New `editor/labs/combo-lab/PaletteControls.jsx` — Tool Properties content. Full palette generator control surface (aspect / layout / pool / mode / swatches / randomize / save).
- `editor/labs/combo-lab/ComboLab.jsx` — now mounts `<EditorShell registry={PALETTE_REGISTRY}>`. Registry: PaletteCanvas (canvas), ModeTabsPanel (right.header), PaletteControls (right.body).

### 4b — PatternLab → Pattern mode
- New `editor/labs/pattern-lab/state.jsx` — `PatternStateProvider` + `usePatternState`. Lifted shapeId, customSvg, cols, rows, gap, padding, stretch, overflow, bgOn, colors, rules, plus actions and the `svgString` memo.
- New `editor/labs/pattern-lab/PatternCanvas.jsx` — canvas content (live tile SVG render).
- New `editor/labs/pattern-lab/PatternControls.jsx` — Tool Properties content (shape / grid params / color / save).
- New `editor/labs/pattern-lab/PatternRulesPanel.jsx` — **left.body** content, per the product description's pattern arrangement. Per-cell rule list extracted from the controls aside.
- `editor/labs/pattern-lab/PatternLab.jsx` — mounts `<EditorShell registry={PATTERN_REGISTRY}>`. Registry: PatternCanvas, ModeTabsPanel @ right.header, PatternControls @ right.body, PatternRulesPanel @ left.body.

### 4c — TypeLab → Type mode
- New `editor/labs/type-lab/state.jsx` — `TypeStateProvider` + `useTypeState`. Lifted multi-frame state (`{ aspect, bgColor, frames[], selectedId }`) + factory + actions (set, addFrame, updateFrame, deleteFrame, selectFrame, explodeFrame, reset).
- New `editor/labs/type-lab/TypeCanvasPanel.jsx` — canvas wrapper. Mounts `<Canvas>` and forwards state/actions to existing `TypeCanvas` (inner frame rendering).
- New `editor/labs/type-lab/TypeControlsPanel.jsx` — Tool Properties wrapper. Wraps existing `TypeControls` and adds Save / Save SVG / Download SVG buttons (all moved from TypeLab.jsx's footer).
- `editor/labs/type-lab/TypeLab.jsx` — mounts `<EditorShell registry={TYPE_REGISTRY}>`. Registry: TypeCanvasPanel, ModeTabsPanel @ right.header, TypeControlsPanel @ right.body.

### 4d — State preservation + legacy route cleanup
- `src/editor/Editor.jsx` — wraps **all four** state providers (`ComposeStateProvider`, `PaletteStateProvider`, `PatternStateProvider`, `TypeStateProvider`) once around an `<ActiveMode />` dispatcher. Providers stay mounted as the user switches `:mode`, so each mode's state preserves across switches in-session.
- `src/pages/Compose.jsx` — drops `<ComposeStateProvider>` wrap (now provided by Editor.jsx).
- `src/editor/labs/{combo-lab/ComboLab, pattern-lab/PatternLab, type-lab/TypeLab}.jsx` — drop their respective state-provider wraps for the same reason.
- `src/App.jsx` — legacy routes redirect:
  - `/compose`               → `/editor/compose`
  - `/generators/combo-lab`  → `/editor/palette`
  - `/generators/pattern-lab`→ `/editor/pattern`
  - `/generators/type-lab`   → `/editor/type`
  - `/generators/social`     → unchanged (SocialLab still standalone until folded into Compose)
  - `/generators/compositor` → unchanged (Compositor still standalone)
- App.jsx imports cleaned: `Compose`, `GeneratorsComboLab`, `GeneratorsPatternLab`, `GeneratorsTypeLab` no longer imported at the route level (they're imported by `Editor.jsx` which mounts them via mode dispatch).

## Current state

### Working (self-verified via grep)
- State providers only mount in `Editor.jsx` + their respective `state.jsx` definitions. No double-mounting.
- All four modes route through `/editor/:mode`. Mode tabs in every mode's `right.header` switch via URL navigation.
- Pattern mode's left.body shows the Rules panel as designed.
- Legacy URLs redirect cleanly.
- ComposeStateProvider, PaletteStateProvider, PatternStateProvider, TypeStateProvider stay mounted while inside the editor — state preserves across mode switches in-session.

### Out of scope for phase 4 (deferred)
- **Social and Compositor folded into Compose.** Per product target they should fold in as starter presets, not be separate modes/routes. Still reachable via legacy `/generators/social` and `/generators/compositor` until that work lands. They keep their own GeneratorLayout-based UI for now.
- **Folder restructure (`labs/<lab>/` → `modes/<mode>/`).** Mechanical move; deferred to a separate cleanup pass to keep this phase's diff focused on behavior, not paths. Tracked in `docs/editor/product-tree.md`.
- **Page wrappers (`pages/generators/{ComboLab,PatternLab,TypeLab}.jsx`).** Now only mounted via Editor.jsx — they could be inlined; left in place for now.
- **Saved-asset round-trip + library tab.** Phase 5 (Library panel) and phase 6 (round-trip + flatten) cover this.

## Phase 4 design decisions landed

- **Per-lab state context, not a single mega-context.** Each lab keeps its own provider (`Pattern`, `Palette`, `Type`, `Compose`); Editor.jsx composes them. Avoids one giant state blob; each context evolves independently.
- **Children inline in groups, group-relative coords.** (Already shipped in 1c — relevant here only because Pattern's rules panel and others now coexist inside the same shell.)
- **Pattern Rules in `left.body`.** Per the product description's per-mode arrangement table. Other modes can register additional left.body panels in their registries when needed.
- **Save/export buttons in Tool Properties (right.body).** Could move into `left.header` (FrameHeaderPanel-style) later for consistency with Compose; for now the lab-specific actions stay near their controls.

## Next Steps
1. **Phase 5** — Library panel. Port the lobby UI into `editor/library/LibraryTab.jsx` and mount as a left.body panel in every mode. Drag-to-canvas in compose; click-to-open-in-mode for assets and presets.
2. **Phase 6** — Round-trip editing + flatten. Open any library asset/preset in its mode → edit → save back. Implement flatten action on pattern + text (output as `group` of `shape` layers).
3. (Eventually, deferred) — fold Social and Compositor into Compose with starter presets; remove their legacy routes; folder restructure to `modes/<mode>/`.
