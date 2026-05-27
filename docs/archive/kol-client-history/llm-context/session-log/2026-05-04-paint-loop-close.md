# Session: Paint loop close

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Closed items 5/6/7 from the deferred-items inventory — the photoshop-paint plan's "out of scope" list. New layers adopt app-level paint, autosave persists paint, and renderer paints stroke on logo/text/pattern (not just rect/ellipse).

## Changes Made

- `src/editor/compose/state.jsx` — `addLayer` reads `paintFill` / `paintStroke` (refs) and merges as `color` for any color-supporting type, additionally `stroke` for shapes. Autosave write+restore extended with `paint: { fill, stroke, active }`. `flattenPattern` threads stroke through the buildPatternSvg call.
- `src/editor/compose/LayerRenderer.jsx` — `ShapeLayer` logo branch passes stroke/strokeWidth/linecap/linejoin to KolLogo (cascades to child paths via SVG attr cascade). `TextLayer` resolves stroke and passes `strokeColor`/`strokeWidth` into TypeBlock's value. `PatternLayer` resolves stroke and threads through buildPatternSvg.
- `src/components/styleguide/TypeBlock.jsx` — accepts `value.strokeColor` + `value.strokeWidth`, applies `WebkitTextStroke*` + `paintOrder: stroke fill` in style.
- `src/editor/modes/pattern/render.js` — `buildPatternSvg` accepts `stroke`/`strokeWidth`, emits inline style with `vector-effect: non-scaling-stroke` so stroke width stays visually consistent regardless of tile scale.
- `src/editor/color/StrokePanel.jsx` — gate widened from `kind ∈ {rect,ellipse}` to `type ∈ {shape,text,pattern}`. Dash/cap/join cascade for shape+pattern, no-op-but-stored for text.
- `src/editor/compose/build.js` — patternLayerSvg threads stroke; shapeLayerSvg logo branch adds stroke to the wrapper `<g>` style with `sw / scale` correction; textLayerSvg adds `-webkit-text-stroke` to the foreignObject inline style.
- `docs/editor/plans/2026-05-04-photoshop-paint.md` — drift line; "Shipped 2026-05-04" block replacing the deferred-list entries.

## Current State

### Working
- Paint persists across reload via autosave.
- New layers pick up the current SwatchStack pair instead of `palette:dark` / `palette:secondary`.
- Stroke colors paint on logo (cascade), text (CSS text-stroke), pattern (cascade), in addition to existing rect/ellipse rendering.
- StrokePanel weight slider works for any strokeable type.

### Known Issues / Caveats
- **Logo stroke caveat:** SVG cascade only reaches paths that don't set their own `stroke` attribute. Current Kolkrabbi logo SVGs only set `fill="currentColor"` so cascade lands. New logos that set explicit stroke would need attention.
- **Text stroke is CSS-only** (`-webkit-text-stroke`). No dash/cap/join visual effect — data preserved for flatten / export. Browsers other than Chrome/Safari/Firefox-recent may render without stroke.
- **Pattern stroke uses `non-scaling-stroke`** so visual width stays constant across tile sizes. Without it, large patterns would have hairline strokes and small patterns would have chunky ones.
- New-layer paint adoption breaks palette-tracking by default — saved presets / library inserts still carry palette refs because they bypass `layerDefaults`.

## Next Steps

Remaining 10 items from the inventory. Suggested next: **library shape validation (item 3)** — small + data-correctness payoff, unblocks future library refactors. Alternative: **popover unification (item 1)** for the bigger aesthetic-refactor payoff.
