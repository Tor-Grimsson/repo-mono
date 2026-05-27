# Session: Phase 6f pattern self-contained + compose UX defaults

**Date:** 2026-05-01
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Phase 6f mirrors 6d (type/text merge) for patterns — compose's pattern layer carries the full Pattern Lab control surface, no round-trip needed. Plus three small compose UX defaults: sidenav auto-collapses on `/compose` entry, the canvas opens empty, and a "Clear" button in the topbar resets layers.

## Changes Made

### Files Modified

**Phase 6f — pattern layer self-contained**
- `src/components/generators/pattern-lab/RuleRow.jsx` — **new**. Extracted from PatternLab.jsx — `RuleRow` default export + named exports `newRule`, `randomRule`, `SELECT_OPTIONS`, `ROTATE_OPTIONS`. Owns the rule-row dropdown / N+offset / GroupW/H / rotate / flip / hide / opacity controls + per-rule re-roll + remove
- `src/components/generators/pattern-lab/PatternLab.jsx` — 410 → 211 lines. Drops inline `RuleRow` + helpers; imports from `./RuleRow`
- `src/components/compose/state.jsx` — `PATTERN_DEFAULTS` constant added (mirrors PatternLab initial state, `bgOn: false` for compose context). Pattern layer state expands from `{ spec, color, scale }` → full Pattern Lab params (shapeId, customSvg, cols, rows, gap, padding, stretch, overflow, bgOn, bg, color, rules, scale). `layerDefaults('pattern')` returns the merged shape
- `src/components/compose/LayerRenderer.jsx` — `PatternLayer` builds tile SVG via `buildPatternSvg(layer)` per render, memoized by serialized params. Adds `useMemo` import + `buildPatternSvg` / `getShapeSvg` imports. No more `layer.spec.svg` read
- `src/components/compose/build.js` — `patternLayerSvg` calls `buildPatternSvg` from layer params; same memoization shape applies (computed once per export). Adds `buildPatternSvg` + `getShapeSvg` imports
- `src/components/compose/inspectors/LayerInspector.jsx` — `PatternFields` rewritten as the full Pattern Lab control surface: Apply-saved-pattern Dropdown (reads `library.pattern`, copies params on pick), Shape Dropdown + custom SVG Textarea, Cols/Rows/Gap/Padding sliders, Stretch/Overflow/Tile-bg ViewToggles, Tile-bg ColorField (when bgOn), Tile size slider, dynamic Rules list with Add/Randomize/Save-to-library buttons. `ColorField` accepts a `label` prop (default `'Color'`) so the bg slot reads "Tile bg color"

**Compose UX defaults**
- `src/components/navigation/SideNav.jsx` — `useEffect` on `pathname === '/compose'` sets `collapsed = true`. User can re-expand via the chevron toggle; preference sticks via the existing localStorage write
- `src/components/compose/state.jsx` — `DEFAULT_LAYERS = []`. Compose opens empty (canvas frame visible, no content). Removed unused `BRAND` import. Added `clearLayers` callback (drops all layers, selects palette slot, tracks through history). Exposed `clearLayers` in the context value
- `src/components/compose/ComposeTopbar.jsx` — new `Clear` button (variant `secondary`, `iconLeft="trash"`) wired to `clearLayers`. Disabled when `layers.length === 0`

### Features Added/Removed

**Added**
- Compose authors patterns directly via the Layer Inspector — shape, grid, rules, colors all in-rail. Round-trip through Pattern Lab no longer required
- `Apply saved pattern` picker copies Pattern Lab specs into compose layers; symmetric `Save to library` button writes back to the shared `library.pattern` slot
- Compose opens empty by default — clean canvas, no defaults to delete
- `/compose` auto-collapses the SideNav so the editor has the wider canvas viewport
- Topbar `Clear` button resets layers to empty (undo-restorable)

**Removed**
- The `layer.spec` snapshot field on pattern layers — pattern is now self-contained
- Default `bg-default` / `mark-default` / `text-default` / `pattern-default` / `image-default` layers in compose initial state

## Current State

### Working
- Patterns render in compose from layer params (`buildPatternSvg` per render); SVG export via `compose/build.js` follows the same path
- Pattern inspector full surface — visual rules editor, shape picker, grid sliders, bg color, save / random buttons
- Compose entry collapses sidenav (`/compose` only); user can manually re-expand
- Canvas opens with no layers; user starts fresh by adding via the rail or exploding a slide layout
- Clear button drops layers; Cmd-Z restores
- Pattern Lab itself unchanged in behavior — RuleRow extraction is invisible to its UI

### Known Issues
- 11 deck-only slide types (Phase 6e §10) still not templatable in compose. Roadmap deferred
- Drift unchanged — TypeBlock + TypeBlockToolbar + compose/build.js + compose/LayerRenderer + compose/state.jsx + LayerInspector all import from `generators/{type-lab,pattern-lab}/...`. Phase 7 cleanup target — extract typography + pattern helpers to `src/data/system/...`
- Compose pattern layer rules-list inside the 320px aside is vertically tall when several rules are stacked; works but could benefit from collapse / accordion grouping later
- Slide templates remain 1:1-tuned (1080×1080 coords) — non-square aspects need post-explode position tweaks

## Next Steps
1. Visual verification — open `/compose`, confirm sidenav collapses, canvas opens empty, add a Pattern layer, drive the full inspector (shape picker, rules add/remove/random, bg toggle, save), pick a saved Pattern Lab spec, click Clear, undo. Same drill on a slide-explode flow
2. UI audit (next user task) — the asks were stacked in this turn
3. Phase 7 user-decision items still outstanding — Acyr keep/rewrite/delete, Styleguide editorial chapters, kol-site.css unblock, `_tmp/` delete
