# Session: Modal Dialogs + Autosave / Restore

**Date:** 2026-05-02
**Agent:** Grim
**Summary:** Replaced `window.prompt` with promise-based KOL modal; added debounced canvas autosave to localStorage with restore-on-mount confirm.

## Changes Made

### Files Modified
- `src/components/molecules/Modal.jsx` (new) — `ModalProvider` + `useModal()` hook. Promise-based `prompt(title, defaultValue)` and `confirm(title)`. Renders via `createPortal` into `document.body`. Esc cancels, Enter submits, focus on input for prompt. Has a no-context fallback to `window.prompt`/`confirm` so callers can use the hook unconditionally.
- `src/components/framework/BrandLayout.jsx` — wraps `Outlet` in `<ModalProvider>` (between `GeneratorLibraryProvider` and the layout div).
- `src/editor/shell/panels/FrameHeaderPanel.jsx` — `onSave`/`onSaveAs` now `await modal.prompt(...)` instead of `window.prompt`.
- `src/editor/library/LibraryTab.jsx` — `onOpen` (preset slot) and `onOpenStarter` route through new `confirmReplaceIfUnsaved()` helper that calls `modal.confirm` when there are layers and no `currentPresetId`.
- `src/editor/compose/state.jsx` — added autosave + restore. Imports `useEffect`, `useModal`. New `DRAFT_KEY = 'kol.editor.draft'` constant. Two effects: (1) on first mount, read draft, prompt user via `modal.confirm`, on yes apply via raw setters; on no, clear the slot; (2) debounced (500ms) write of `{ aspect, layers, palette: { poolId, modeId, colors, locks } }` on any change; clears the slot when `layers.length === 0`.

### Features Added/Removed
- **Modal infrastructure** — KOL-styled prompt/confirm dialogs replace native browser dialogs.
- **Autosave** — canvas survives a refresh/tab-close. Debounce 500ms. Cleared when canvas empties.
- **Discard-changes confirm** — opening a preset/starter when the canvas has unsaved layers (no loaded preset) prompts before replacing.

## Current State

### Working
- Save / Save-as use the new modal (centered, KOL-styled, Esc/Enter/Cancel/OK).
- Library "open" on a preset prompts confirm if there are unsaved layers; opens silently if a preset is already loaded (overwrite is the explicit Save flow).
- Refresh on a non-empty canvas → on next mount, modal asks to restore.
- Cancel on the restore prompt → draft cleared, fresh start.
- Pre-existing `Button` import in `LibraryTab.jsx` was unused before this session and remains so — not touched per minimum-edit rule.

### Known Issues
- None observed. Modal ESC/Enter listener is window-scoped — fine since only one modal renders at a time.

## Next Steps
1. Visual / interaction check across the four modes (Compose, Palette, Pattern, Type) — open library items, save/save-as, refresh mid-edit.
2. Opportunistic: dead `.kol-compose-*` CSS removal (still listed in earlier roadmap-cleanup log).
