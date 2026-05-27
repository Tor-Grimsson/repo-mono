# Session: Phase 8 — Frame-level state

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Named-frame persistence — Save (overwrite or create) and Save as. New `frame-state.md` sub-doc covers schema + flows + deferred items. `LibraryProvider` gains `updateItem`; compose state tracks the loaded preset; `FrameHeaderPanel` runs the new save logic with `window.prompt` for naming.

**Roadmap complete: phases 1–8 all shipped.**

## Changes Made

### Sub-doc
- `docs/editor/frame-state.md` — phase 8 design. Schema (`name`, `updatedAt` added to `preset` items), flows (Save, Save as, Open, Clear), persistence note, deferred items (autosave/draft slot, cross-tab conflict resolution, discard-changes prompt, custom modal). Linked from `docs/editor/README.md`.

### Library — `editor/library/LibraryProvider.jsx`
- New action `updateItem(slot, id, spec)` — replaces an existing item's fields by id. Preserves `id` and `savedAt`; sets `updatedAt: Date.now()`. Exposed in value bag + no-context fallback.

### Compose state — `editor/compose/state.jsx`
- New state `currentPresetId` + `currentPresetName` (and their setters). Both default `null`.
- `loadPreset` (whole-frame intent) sets `currentPresetId`/`Name` from the loaded preset. Partial-chunk intent does NOT touch them — the host frame's loaded-preset claim survives drop-ins.
- `clearLayers` resets both to `null` so the next Save creates a fresh preset rather than overwriting the previously-loaded one.
- Value bag exposes the four new pieces.

### Frame header — `editor/shell/panels/FrameHeaderPanel.jsx`
- Header label now reads `Frame · <name>` or `Frame · Untitled` if no preset is loaded.
- Save: if `currentPresetId` set → `updateItem('preset', id, spec)` preserving the current name; else `window.prompt` for name → `addItem('preset', { ...spec, name })` and capture the new id into `currentPresetId`.
- New "Save as": always prompts (defaults to `currentPresetName`), always creates a new library item; `currentPresetId` updates to the copy.
- Clear button unchanged in behavior (drops layers + selection); compose state's `clearLayers` now also resets the preset tracking.
- Imports adjusted: `addItem`/`updateItem` (instead of `savePreset`); compose-state destructure adds `currentPresetId`, `currentPresetName`, `setCurrentPresetId`, `setCurrentPresetName`.

## Current state

### Working (self-verified via grep)
- Schema additions land defensively: existing v3 entries without `name`/`updatedAt` read as `null` at consume sites (header label falls back to "Untitled", etc.).
- Save semantics:
  - Loaded preset + edit + Save → overwrite (same id, same savedAt, fresh updatedAt).
  - No loaded preset + edit + Save → prompt for name, create new, claim it.
  - Save as → always prompt, always create, claim the copy.
- `loadPreset` from LibraryTab claims the loaded id (whole-frame). Clear releases it.

### Deferred (per the sub-doc)
- **Autosave / draft slot.** Page reloads still lose unsaved work. Out of phase 8.
- **Cross-tab conflict resolution.** Latest write wins; no warning. Documented limitation.
- **Discard-changes prompt on Open.** Loading replaces canvas; undo recovers.
- **Custom modal for Save / Save as.** `window.prompt` for v1; modal/inline input is polish.
- **Rename-in-place.** Edit name without re-saving. Out of scope; user does it via Save as.

## Roadmap status

All eight phases shipped:

- ✅ Phase 1 (1a / 1b / 1c) — Vocabulary migration, positioning promotion, group + multi-select.
- ✅ Phase 2 — `EditorShell` + panel registry.
- ✅ Phase 3 — Mode router (`/editor/:mode`).
- ✅ Phase 4 (4a / 4b / 4c / 4d) — Lift labs into shell; centralize state in `Editor.jsx`; redirect legacy routes.
- ✅ Phase 5 — Library panel in `left.body` of every mode.
- ✅ Phase 6 — Pattern flatten + edit-in-mode round-trip (text flatten via opentype.js deferred).
- ✅ Phase 7 — Backwards-dep cleanup (typography-cuts, LibraryProvider relocation).
- ✅ Phase 8 — Named-frame persistence.

## Outstanding cleanup (post-roadmap, opportunistic)

These were deferred during the roadmap and aren't blocking anything; pick them up when convenient:

- **Text flatten via opentype.js** (Phase 6 deferred) — async glyph-outline extraction; lands as `flattenText(layerId)` action, output as `group` of `shape{kind:'flatten'}` layers.
- **Social + Compositor fold into Compose with starter presets** — labs still standalone at `/generators/{social,compositor}`; folding gives Compose mode starter presets and removes those legacy routes.
- **Folder restructure** — `editor/labs/<lab>/` → `editor/modes/<mode>/` per `product-tree.md`. Mechanical.
- **Lobby page deletion** — `pages/Generators.jsx` (`/generators` index) + `editor/labs/lobby/Lobby.jsx`. Library tab in `left.body` (phase 5) supersedes; cleanup is mechanical.
- **Page wrappers thin-out** — `pages/generators/{ComboLab,PatternLab,TypeLab}.jsx` are 5-line wrappers around the lab components; can be inlined into `Editor.jsx` or absorbed into the labs themselves.
- **Drag-to-canvas in Compose** (Phase 5 deferred) — drag a library asset from `LibraryTab` onto the canvas to insert as a layer.
- **Autosave / draft slot** (Phase 8 deferred) — single transient slot for crash recovery.
- **Discard-changes prompt + custom Save modal** (Phase 8 polish) — replace `window.prompt`.
- **Old `kol-compose-grid` / `kol-compose-topbar` / `kol-compose-drawer` CSS** (Phase 2 deferred) — dead since the EditorShell rebuild; cleanup pass any time.
- **Mark slot leftovers in `aspects.js` and others** — minor.

## Next Steps

Roadmap complete. Future work either picks from the deferred-cleanup list or starts a new initiative.
