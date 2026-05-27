# Session: Icons audit + organized library

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Cataloged 480 staging SVGs, organized into a `stroke/` + `solid/` library with renames, generated programmatic stroke versions of all solids, then merged the live `loaders/icons/svg/` set into the same library.

## Changes Made

### Files Modified
- `docs/icons-audit/icons-audit.md` — new doc. Per-folder kind table for the 480 staging SVGs, names assigned by reading SVG content for the ambiguous ones, plus reorganization manifest (stroke/solid trees + renames + name-collision `-alt` suffix policy + `stroke-remake/` notes + loaders merge section).

### Files Added (`_tmp/_components-2import/icons-organized/`)
- `solid/` — 340 files. Mirrors the editor/01-…/16-… categories from staging + new `another-creation/` bucket (signature-thick).
- `stroke/` — 170 files. Includes `rack/` (110, sub-bucketed transport/waves/filters/generators/sequencer/logic/patterns/color/cables/caps/curves/shapes-3d/nav), `kol/` (29 from `loaders/icons/svg/00-kol`), plus design-tools/cursor/shapes/swap/typography/view/brushes/search/status.
- `stroke-remake/` — 340 files. Mechanical fill→stroke conversion of `solid/`, mirrors the same tree. Each `fill="X"` flipped to `fill="none" stroke="X" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`. Paths inside `<defs>/<clipPath>/<mask>/<pattern>/<symbol>` and already-stroked paths left alone.
- `_manifest.json` — full source→target mapping for the staging reorg.

### Source folders preserved (untouched)
- `_tmp/_components-2import/icons-2-stroke-maybe/`, `_tmp/_components-2import/icons-to-diff/`, `src/components/loaders/icons/svg/` — all originals intact (copy not move).

### Renames applied
Ambiguously-named files in the staging set were renamed by content. Highlights: `_typography-{1,2,3,}` → `letter-{a,t}` (stroke + solid variants), `color-0{1..4}` → `color-wheel/palette/paint-drop` (`color-03` dropped as duplicate of `_nav-01-2` paint-brush), `design tools+*` → `components-linked/workflow-nodes/pen-nib/step-path`, `nav-ui*` → `zoom-in/zoom-out/search`, `placeholder*` → `swap-{to,from}-diamond`, `shape-{1..4}` → `triangle/pentagon/hexagon/square`, `dimond` → `diamond` (typo fix), `editor/18-editor/*-tool-<group>.svg` → `editor-tools/<group>/*.svg` (redundant suffix dropped). `Icon/objects-*` → `align-*`. Full table in audit doc.

### Side-effect cleanup
- `solid/actions/search-line.svg` and `solid/status/loader.svg` — were misbucketed as solid by the original folder-dominance pass; the loaders set classified them correctly. Removed from `solid/`, kept in `stroke/{actions,status}/`. Corresponding `stroke-remake/` entries (generated from the wrong source) also dropped.
- 9 basename collisions across the two staging folders (different glyphs, same name): `bolt`, `bucket`, `cone`, `cross`, `diamond`, `pills`, `rotate`, `row`, `triangle` — legacy `icons-2-stroke-maybe/` versions live alongside with `-alt` suffix.

## Current State

### Working
- 480 staging SVGs catalogued; 367 loaders SVGs merged on top (334 byte-identical dupes skipped, 31 new added, 2 misplacements corrected).
- Library at `_tmp/_components-2import/icons-organized/`: 340 solid · 170 stroke · 340 stroke-remake · 850 total.
- Audit doc at `docs/icons-audit/icons-audit.md` documents source layout, classifications, renames, reorganization, and remake.

### Known Issues
- `stroke-remake/` is a programmatic starting point, not finished art. Conversion is correct for icons whose silhouette is a single closed path; icons that relied on overlapping/compound fills to imply form (e.g. `editing/adjust.svg` half-circle indicator → renders as double-outline circle) need a hand-redraw.
- `stroke/rack/nav/chevron-{left,right}.svg` are visually solid (filled chevrons), but live under `stroke/rack/` for domain cohesion with the rest of the rack set. Mixed convention — fine but worth noting if a strict stroke/solid split matters later.
- 3 `00-kol/` files (`color`, `list`, `ptrn-checker`) are mixed (stroke + accent fill); placed in `stroke/kol/` since the kol set is overall stroke.

## Next Steps
1. Walk `stroke-remake/` and flag the icons that need a hand-redraw (filled-form-ones-where-stroke-doesnt-translate).
2. Decide which icons from the library actually feed `src/components/loaders/icons/svg/`. Most of `solid/{01-…/16-…}/*` already do; staging-only icons (rack, kol, design-tools, etc.) need a routing decision.
3. Resolve the 9 `-alt` collision pairs — pick one per name, drop the other.
4. Decide the fate of `_tmp/_components-2import/`: once the library is canonical, the staging folders can be deleted.
