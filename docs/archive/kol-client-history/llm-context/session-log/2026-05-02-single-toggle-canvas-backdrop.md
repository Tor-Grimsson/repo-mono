# Session: ViewToggle single variant + canvas backdrop

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Post-phase-8 polish. New `variant="single"` on ViewToggle for binary on/off (one button, current state's label). Palette mode's Logo / BG toggles switched to it. Canvas region got back its dark grid backdrop that the old `GeneratorLayout` wrapper used to provide.

## Changes Made

### `src/components/molecules/ViewToggle.jsx`
- Added `variant="single"` branch. One button, click flips between `options[0]` (off) and `options[1]` (on). Active state uses `kol-control--filled`; inactive is bare text. Replaces the segmented two-button look for binary toggles where width is tight.

### `src/editor/labs/combo-lab/PaletteControls.jsx`
- Logo + BG ViewToggles set `variant="single"`.
- Restored `grid-cols-4` with `col-span-3` (Aspect/Layout) + 1 (toggle) — the single-button toggle fits in the narrow column the segmented one couldn't.

### `src/components/framework/kol-framework.css`
- `.kol-editor-canvas` gets `background-color: #0E0E11` to match the dark backdrop the old `kol-grid-bg` wrapper used.

### `src/editor/EditorShell.jsx`
- `<main>` adds the `kol-grid-bg` class so the canvas region renders the dotted/major-line grid pattern that was lost when `GeneratorLayout` got replaced by `EditorShell`.

## Current State

### Working
- Single-button toggles in palette mode no longer overflow the rail's narrow column.
- Canvas backdrop is back across every mode (Compose, Palette, Pattern, Type) since they all mount through `EditorShell`.

### Known Issues
- None new.

## Next Steps
- Pick from the post-roadmap deferred list (text flatten via opentype.js, Social/Compositor fold-in, folder restructure, lobby cleanup, drag-to-canvas, autosave, custom Save modal, dead `kol-compose-*` CSS).
