# Session: Editor product docs — target architecture + roadmap

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Wrote target architecture for the editor surface in new `docs/editor/`. Five docs: README index, product-description, product-ui, roadmap, product-tree. No code changes; pure design-doc work.

## Changes Made

### Files Modified
- `docs/editor/README.md` — new; index
- `docs/editor/product-description.md` — new; vision, concepts, anatomy, panel model, mode switching, modes, frames/presets, layer types, library, open questions
- `docs/editor/product-ui.md` — new; default panel arrangement diagram + table, layer z-stack, group containment, cover vs positioned, selection wireframe
- `docs/editor/roadmap.md` — new; 8-phase build plan + per-phase implementation decisions
- `docs/editor/product-tree.md` — new; target `src/editor/` file structure
- Memory: `project_editor_accretion_history.md` — new (lab-vs-compose history; "composition" is a Compositor leftover, not architecture)

### Architecture decisions landed (target, not yet built)
- **Single editor shell.** Hosts 4 modes: Compose, Palette, Pattern, Type. Mark mode dropped — logos are now a shape variant. Social and Compositor fold into Compose with starter presets.
- **6 layer types:** `background` (cover-only, pinned to back), `pattern`, `photo`, `shape`, `text`, `group`. All non-background are positioned with `x/y/w/h` + transform wireframe (consistent direct manipulation across types).
- **4 library slots:** `palette`, `pattern`, `type`, `preset`. `composition` and `mark` slots dropped. `layout` renamed to `preset` and broadened to cover whole-frame *or* partial-chunk saves (same data shape; saver picks intent).
- **No "composition" concept.** The thing being edited is a frame (implicit, in-memory); the persistent form is a preset (library slot). "Composition" was a Compositor leftover.
- **Two-rail shell.** `header` (fixed) + `body` (panel stack) per rail. No topbar, no bottom drawer, no footer slot.
- **Panel model.** Panels declare default slot, state can override. v1 ships fixed defaults; drag-to-rearrange is v2 — architecture supports it from day one.
- **Tool Properties** is one panel slot whose content swaps by mode: Compose → Inspector, Palette → palette controls, Pattern → pattern controls, Type → type controls.
- **Palette** is a persistent panel in `right.body` (top, above Tool Properties). Active palette swatches + active color + hex always reachable; clicking applies to current selection.
- **Mode switching:** explicit via tabs in `right.header`; implicit via library-item clicks (open palette → Palette mode, etc.). State persists per mode in memory across switches.
- **Flatten action** on pattern/text → `group` of `shape` layers (one-way).

## Current State

### Working
- Five docs in `docs/editor/` describe target architecture and an 8-phase roadmap to reach it. Today's runtime unchanged.

### Known Issues
- None from this session — pure docs.

## Next Steps
1. Implementation plan (`docs/editor/implementation-plan.md`) — concrete phase-by-phase work breakdown. User flagged as next.
2. Roadmap Phase 1 (vocabulary migration) — single `localStorage` migration: drop `composition`/`mark` slots, rename `layout`→`preset`, rename layer types (`bg`→`background`, `image`→`photo`, `mark`→`shape` with variants), promote `pattern`/`photo` to positioned, add `group` layer type.
