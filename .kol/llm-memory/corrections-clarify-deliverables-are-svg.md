---
name: corrections-clarify-deliverables-are-svg
description: "A correction refines the ask, it doesn't retract earlier instructions; asset deliverables are editable SVG in real repo paths, never scratch-folder exports"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 46638038-4a36-4d11-ae1f-3a0046131471
  modified: 2026-07-28T09:59:20.288Z
---

Two rules from the touch-icon arc (2026-07-28):
1. When the user corrects a detail ("it's a touch icon, not an icon"), the correction CLARIFIES the request — every other part of the original ask (e.g. "use the icon guides") still stands. Don't treat a correction as permission to drop the rest.
2. Graphic assets he asked for are delivered as editable SVG masters in real repo paths (`public/favicons/…`); rasters are derived exports made only when needed. Nothing he asked to keep ever lands in `_tmp/` or scratch.

**Why:** Built PNG-only candidates off the favicon after he pointed at the KOL keyline guides and asked "you'd think SVG?"; masters sat in gitignored `_tmp/`. He escalated hard.

**How to apply:** Re-read the full original ask after every correction and list which parts still bind. KOL icon keyline guide lives in `kol-ds-ui/showcase/src/lib/icon-controls.jsx` (`KeylineBg`: 24-grid, rects 16×20/18×18/20×16 rx1, circle r4, corner diagonals) with a twin in `apps/brand/src/pages/Icons.jsx`. See [[decisions-in-plain-speak]].
