# Session: Phase 1a — Vocabulary migration

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** First sub-phase of the editor implementation roadmap. Renamed library slot keys and layer-type strings to the new vocabulary; dropped `layout` as a frame slot; localStorage v2→v3 migration with `_backup` snapshot.

## Changes Made

### Library — `editor/labs/sharedState.jsx`
- `SLOT_KEYS`: `[palette, pattern, type, mark, layout, composition]` → `[palette, pattern, type, preset]`
- `STORAGE_KEY`: `kol.generator.library.v2` → `kol.editor.library.v3`
- `migrate()` split into `migrateV1toV2` + `migrateV2toV3`. v2→v3 collapses `layout` + `composition` slots into `preset`, drops `mark` slot, renames layer-type strings inside saved-composition layer arrays (`bg`→`background`, `image`→`photo`, `mark`→`shape` with `kind: 'logo'` added).
- `loadFromStorage` checks v3 → v2 → v1 in order. v2 entry is snapshot-copied to `kol.generator.library.v2._backup` before overwrite (rollback safety).
- Save helpers: dropped `saveMark`, `saveLayout`, `saveComposition`; added `savePreset`. Kept `savePalette`, `savePattern`, `saveType`.

### Layer types — `editor/compose/state.jsx`
- Type strings renamed: `bg`→`background`, `image`→`photo`, `mark`→`shape` (factory adds `kind: 'logo'`).
- `LAYER_TYPES`, `layerDefaults`, `COVER_TYPES`, `POSITIONED_TYPES` updated. Positioning promotion of pattern/photo deferred to phase 1b.
- Dropped `layoutId` state, `setLayoutId`, `explodeLayout()`. Frame slots are now `aspect | palette` (was `aspect | palette | layout`).
- `SLIDE_TEMPLATES` import removed — only consumer was `explodeLayout`.

### Compose internals — rename + drop layout-slot
- `LayerRenderer.jsx` — switch cases renamed; `BgLayer`/`MarkLayer`/`ImageLayer` → `BackgroundLayer`/`ShapeLayer`/`PhotoLayer`. ShapeLayer notes phase 1a is logo-only.
- `LayerStack.jsx` — `COMPOSITION` → `FRAME_SLOTS` (drops layout entry); `TYPE_ICONS` keys renamed; `CompositionRow` → `FrameSlotRow`; rail head label `Composition` → `Frame`.
- `inspectors/LayerInspector.jsx` — type checks renamed; `MARK_VARIANTS` → `SHAPE_LOGO_VARIANTS`.
- `inspectors/LayoutInspector.jsx` — DELETED.
- `InspectorRail.jsx` — drops 'layout' selection routing case + LayoutInspector import.
- `inspectors/PaletteInspector.jsx` — drops `layoutId` destructure + `LAYOUTS` import + dead `usesByLayout` calc; SwatchRow now always passes `unused={false}`.
- `CanvasArea.jsx` — drops `layoutId`, `LayoutBackdrop`, `LAYOUT_COMPONENTS` import + cover-suppression logic; `bg` type check → `background`.
- `ComposeTopbar.jsx` — `saveComposition` → `savePreset({ intent: 'whole', ... })`.
- `build.js` — switch cases renamed; `bgLayerSvg`/`markLayerSvg`/`imageLayerSvg` → `backgroundLayerSvg`/`shapeLayerSvg`/`photoLayerSvg`; `MARK_RAW` → `LOGO_RAW`; dropped unused `COVER_TYPES` import.

### External consumers
- `loaders/decks/slideTemplates.js` — `'bg'` → `'background'` in 3 slide templates; doc comment updated to drop "Explode to layers" framing.
- `editor/labs/social/SocialLab.jsx` — `saveLayout` → `savePreset({ intent: 'whole', ... })`.
- `editor/labs/compositor/Compositor.jsx` — drops `library.layout` + `library.mark` reads (default aspect '1:1', empty markVariant); `saveMark` removed (button gone); `useEffect` syncing from `library.mark` removed; unused `useEffect` import dropped. Will get folded into Compose entirely in phase 4.
- `editor/labs/lobby/Lobby.jsx` — `SLOT_CONFIG` drops `mark`, renames `layout` → `preset`; `MarkPreview` deleted, `LayoutPreview` → `PresetPreview` (now shows layer count when whole-frame); `KolLogo` import removed.
- `editor/labs/lobby/demoSeed.js` — drops `MARK_DEMOS`; `LAYOUT_DEMOS` → `PRESET_DEMOS` (with `intent: 'whole'`); `buildDemoLibrary` returns the 4 surviving slots.

## Current State

### Working
- Vocabulary migration complete. App should render with new names. Existing localStorage data migrates on load (v3 marker written; v2 backed up to `_backup` key).
- Slide templates load with new `'background'` type strings.
- Grep checks for stale strings (`'bg'`/`'image'`/`'mark'`/`'composition'`/`'layout'` as layer types or slot keys) return clean inside `src/editor/`.

### Known Issues
- Not visually verified yet — pure code edits, no live test in browser this session.
- Compositor still reads `library.layout`-driven aspect pre-population — replaced with default '1:1'. Slight UX regression; cleaned up properly when Compositor folds into Compose (phase 4).
- Lobby `PageSection` title still says "compositor lobby" — left as-is; library port comes in phase 5.

## Next Steps
1. **Visual verification.** Click through `/compose`, `/generators/*`, `/slide-deck`. Watch console. Confirm migration ran on first load, library items survived, slides render.
2. **Phase 1b** — promote `pattern` and `photo` from cover-only to positioned (`x/y/w/h` with full-canvas defaults to preserve cover behavior on existing data). Migration injects defaults into stale layer entries.
3. **Phase 1c** — add `group` layer type + multi-select (`selectedIds[]` with shift-click semantics, flat groups only).
