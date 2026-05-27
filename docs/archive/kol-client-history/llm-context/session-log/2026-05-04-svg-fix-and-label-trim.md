# Session: SVG calc() fix + label trim + punch list growth

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Small follow-ups after the unresolved-and-punchlist checkpoint. Fixed a React DOM warning from `calc()` in SVG attributes; shortened the "Edit in Pattern/Type mode" buttons; grew the punch list with two new items the user surfaced.

## Changes Made

### Files Modified
- `src/editor/compose/LayerRenderer.jsx` — `ShapeLayer` `kind: 'rect'` and `kind: 'ellipse'` no longer use `calc(100% - …)` in SVG width/height/rx/ry attributes (SVG attrs don't accept CSS calc; React was warning). Both branches now declare `viewBox="0 0 ${layer.w} ${layer.h}"` and use plain numeric coords with `preserveAspectRatio="none"` to keep the stretch behavior.
- `src/editor/compose/inspectors/LayerInspector.jsx` — "Edit in Pattern mode" → "Pattern mode"; "Edit in Type mode" → "Type mode" (button text was overflowing the column width).

### Punch list updates
- Item 10 added: **snapping** (drag/resize snaps to canvas edges/center + other layers, Figma-style alignment guides).
- Item 11 added: **capitalization inconsistency** throughout — layer rows show `text`/`pattern` lowercase next to `Canvas`/`Group` capitalised; pick a convention; audit inspector titles, toolbar labels, library item names, dropdown options.

## Current State

### Working
- Console no longer logs the `calc(100% - 0px)` SVG warning.
- Pattern/Type mode buttons fit their column in the inspector.

### Known Issues
- **U1 (cursor doesn't reflect tool selection)** — still UNRESOLVED. See `2026-05-04-unresolved-and-punchlist.md`.
- **U2 (drawn-object position doesn't match cursor coordinate)** — still UNRESOLVED.
- 11 outstanding items on the punch list (text alignment, marquee, alignment of selection, palette/swatches mismatch, color panel divergence, shape kind picker, more shape primitives, icon audit, eyedropper, snapping, capitalization).

## Next Steps

1. User to direct next item. Open ones from the punch list ranged from quick wins (capitalization audit, label tweaks) to bigger architectural lifts (marquee + alignment + snapping is a coherent selection-system push).
2. U1/U2 still need fresh-session attention with proper instrumentation, not the speculative iteration that didn't fix them.
