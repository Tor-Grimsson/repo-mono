# Session: SwatchStack rewrite — two named variants swapped wholesale

**Date:** 2026-05-03
**Agent:** Grim
**Summary:** Rewrote `SwatchStack` to follow a prototype pattern built in `/demo` — two named variant components (`SwatchFillFront`, `SwatchStrokeFront`) selected wholesale by `activePaint`, both pinning chips at fixed positions and using DOM order alone for stacking (no z-index, no transform). Added `/` as a second binding for `paint-clear`. Visible "none" feedback experiment reverted because it broke the picker.

## Changes Made

### Files Modified

- `src/editor/color/SwatchControls.jsx` — full rewrite of the `SwatchStack` body. Two named variant components (`SwatchFillFront`, `SwatchStrokeFront`) now define the entire chip layout; `SwatchStack` is a thin selector that picks one wholesale on `activePaint`. Both variants pin fill at `FILL_SLOT (5,6)` and stroke at `STROKE_SLOT (15,16)`; only the DOM render order differs (active paint rendered second, paints on top via DOM order). Renamed `FRONT_SLOT/BACK_SLOT` → `FILL_SLOT/STROKE_SLOT`. Removed all `z-index` and `transform` positioning from chips. Extracted `SwapButton` helper for the swap-arrow icon. Updated header doc to match the new API. Both chips and the swap arrow call `onSwap`.
- `src/editor/color/ColourPanel.jsx` — `swap` rewritten to use functional `setActivePaint(p => p === 'fill' ? 'stroke' : 'fill')` (immune to stale closure). Dropped the `onFocus={setActivePaint}` prop wired earlier — chip clicks now go through `onSwap` only.
- `src/editor/state/keymap.js` — added a second `paint-clear` entry bound to `/` (`hidden: true`, alias-style, mirrors `redo-alt`'s pattern). The cheat sheet still shows only the `N` entry.
- `src/pages/Demo.jsx` — extensive prototyping scaffolding added at the top of the page:
  - Frame 1: `<CirclesA/>` + `<CirclesB/>` side-by-side as a static demonstration that DOM order alone determines stacking (black-first vs blue-first).
  - Frame 2: `{variant === 'a' ? <CirclesA/> : <CirclesB/>}` driven by an `X`-key handler — the wholesale-component-swap pattern proof.
  - Frame 3: Same `X`-driven `variant` state wired to a single `SwatchStack`'s `activePaint` so the rewrite could be verified outside the compose context.
  - Frame 4: Two `SwatchStack` instances side by side (`activePaint="fill"` vs `"stroke"`) as a static visual diff of the two variants.
  - `CirclesA` / `CirclesB` / `Labelled` helper components defined at the bottom of the file.

### Features Added / Removed

- **Added:** `/` keyboard shortcut as alias for `paint-clear` (clears the focused paint to null on the selected layer). Hidden in the cheat sheet so the `Color` section still reads cleanly.
- **Added (then reverted):** visible "none" feedback on cleared chips — `chipBg(color)` helper rendered a slash-through-white gradient when `color == null`. Removed because passing `null` through `ColourPanel` broke the wheel/sliders (`colord(null)` throws). Chips again fall back to `'#FFFFFF'` / `'#000000'` defaults; clearing still updates state but isn't visually reflected on the chip.
- **Removed:** the `onFocus` prop on `SwatchStack` (chips now toggle via `onSwap` only — matches the original macOS-port click-anywhere-swaps semantics).

## Current State

### Working

- `SwatchStack` flips visually on `activePaint` change in both `/demo` (the side-by-side static frame and the X-driven frame) and `/compose` (click any chip → `swap` → `setActivePaint(toggle)` → variant remount → chip swap).
- The two variants are persistently distinct: each is its own component type, so React unmounts one and mounts the other on `activePaint` change — fresh DOM in fresh render order, no in-place attribute update gymnastics.
- `/` is a working alias for `N` (paint-clear). Both fire `paint-clear` in `CanvasArea`'s keymap switch.
- `/demo` page hosts a four-frame scaffolding for prototyping the chip-swap pattern. Useful for future debugging in isolation; the X handler at Demo top-level toggles a `variant` state used by frames 2 and 3.

### Known Issues

- **No visible "none" indicator on cleared chips.** When the user presses `N` (or `/`) or clicks the slash-circle button, the focused paint becomes `null` on the layer, but the chip falls back to `'#FFFFFF'` / `'#000000'` in `ColourPanel.TopRow` and looks identical to a white/black chip. Confusing UX — looks like the clear button does nothing. The straightforward "pass null through and render slash-bg" fix breaks the picker because `colord(null)` throws in `HueMode` / `WheelMode` / `SlidersMode`. Real fix needs to either (a) render a slash overlay on top of a default-color chip, or (b) handle null in the picker bodies.
- **`/` may not always preventDefault.** The `paint-clear` switch case bails before `e.preventDefault()` when no layer is selected (`if (!layer) return`). When the user presses `/` with no selection, browser quickfind still fires. Move `e.preventDefault()` above the `!layer` guard to fix.
- **`Demo.jsx` is now fat with prototype scaffolding.** Four extra frames + helper components (`CirclesA`, `CirclesB`) sit at the top of the page. Useful while iterating on the swatch, but should be removed once the compose-side swap is fully validated and the "none" indicator is wired.
- **Three hours of detour on z-index/transform/HMR.** Documented here so the next agent doesn't waste the same time: when you can see DOM-order-determined stacking working in `/demo` but not in `SwatchStack`, the bug is the swatch *trying to be clever* (transforms, z-index swaps, in-place attribute updates), not the React/CSS pipeline. Default to wholesale component swap + DOM order.

## Next Steps

1. **Render visible "none" feedback without breaking the picker.** Two viable approaches: render the slash gradient as a `::before`/overlay element on top of the default-colored chip (chip stays interactive, overlay shows "none" state), OR teach the picker bodies to treat `target.hex == null` as a valid initial state (pick a sensible default to seed the wheel/sliders, write through the user's first interaction).
2. **Make `/` always `preventDefault`.** Move the call above the `!layer` guard in the `paint-clear` case in `CanvasArea.jsx`. Stops browser quickfind regardless of selection state.
3. **Remove the `/demo` prototype scaffolding** once steps 1 and 2 are validated. Restore `Demo.jsx` to just the Reference + Working showcase; drop `CirclesA` / `CirclesB` and the four prototype frames.
4. **Consider dropping the `N` binding in favor of `/`** if `/` is the user's preferred key. Currently both work; the duplicate alias entry was added to avoid disturbing existing `N` users.
