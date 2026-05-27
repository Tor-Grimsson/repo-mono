# Session: bgOn derivation (item 9)

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Closed the last inventory item. Pattern mode's `bgOn` flag now derives from whether `item.bg` is non-null on every load, instead of only ever flipping on. Brings pattern mode in line with the library's existing rule (`bgOn = spec.bg != null`) and fixes a bug where the round-trip binding could write a bg the source layer never had.

## Changes Made

- `src/editor/modes/pattern/state.jsx` — in `loadPattern`, `if (item.bg != null) setBgOn(true)` → `if (item.bg !== undefined) setBgOn(item.bg != null)`. Loading a no-bg pattern now explicitly turns `bgOn` off instead of leaving the previous session's value.

## Current State

### Working
- "Edit in Pattern mode" on a layer with `bgOn=false` correctly shows pattern mode with bg-off, even if a prior pattern-mode session had bg-on.
- Loading a saved no-bg pattern via Templates explicitly turns the bg toggle off.
- Manual ViewToggle (the user-facing bg-on/off switch in PatternControls) still works — `setBgOn(false)` flips the flag without touching `colors.background`.

### Known Issues / Caveats
- Compose pattern layers still store `bgOn` as a separate boolean rather than deriving from `bg`. Could be tightened further (drop the field, derive everywhere) but that's a wider refactor — current state is consistent enough now that the live round-trip works correctly.

## Inventory complete

All 13 items from the 2026-05-04 deferred-items inventory are closed. The editor is at a clean checkpoint until new work surfaces.
