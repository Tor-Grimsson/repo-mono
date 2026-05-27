# Session: Typography data extraction + locked-docs convention

**Date:** 2026-04-30 (continuation)
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Extracted typography data + reasoning into a single source-of-truth
file (`src/data/system/typography.js`); both `/reference` and `/styleguide`
now render from it. Unified opacity (numeric primitives + descriptors + class
families) into one section under typography. Added frontmatter to all
`docs/kol-migration/*.md` files. Established `locked/` subfolder convention
to label canonical docs vs active vs superseded.

## Changes Made

### Files Created

- `src/data/system/typography.js` — single source of truth: 6 sections
  (`sans-families`, `sans-atomic`, `prose`, `mono`, `opacity`, `cuts`) with
  rows + reasoning prose + token paths. Imported by both Reference and
  Styleguide.
- `docs/kol-migration/locked/` — folder for canonical docs.
- `docs/kol-migration/locked/README.md` — convention doc (canonical / active
  / superseded states).

### Files Modified

- `src/components/sections/ColorRamp.jsx` — added `resolveCssVarRaw(name)`
  utility (raw computed value, for sizes / families) and `<LiveValue token>`
  component (table-cell live read).
- `src/pages/Reference.jsx` — typography sections now data-driven.
  `TYPE_COLUMNS` dictionary maps string keys (`sans`, `prose`, `mono`,
  `descriptors`, `opacity-primitives`, `opacity-families`, `family`, `cuts`)
  → column arrays with JSX render funcs. Removed inline `typeRows`/`typeCols`,
  `helperRows`/`helperCols`, `monoRows`/`monoCols`, `cutsRows`/`cutsCols`.
  Removed inline `fg-opacity` color section + `fgRows`/`fgCols` (moved into
  typography opacity section). Renumbered color sections (state 07→06,
  absolute 08→07).
- `src/pages/Styleguide.jsx` — chapter 07 typography rebuilt as a map over
  `TYPOGRAPHY_SECTIONS` (filtered to skip `cuts`). New `<TypeShowcase>`
  component handles per-section visual treatment (sans / prose / mono /
  opacity). Removed unused `<TypeSample>` import + 12 hardcoded TypeSample
  blocks.
- `src/components/navigation/sidebars.config.js` — replaced `type-scale` /
  `cuts` / `helpers` (single mono entry) with 6 typography anchors:
  `sans-families`, `sans-atomic`, `prose`, `mono`, `opacity`, `cuts`.
  Removed `fg-opacity` entry (moved under typography).
- `docs/kol-migration/locked/color-system.md` — moved here from parent
  folder. Added frontmatter (`title`, `status: canonical`, `updated`, `tags`,
  `covers`, `sources`, `related`).
- `docs/kol-migration/locked/typography-system.md` — moved here from parent.
  Frontmatter + restructured: "What landed" promoted to the canonical
  reference (file layout, tokens, classes, prose, mono, opacity, migrations,
  how to extend, how to read in `/reference` + `/styleguide`).
- `docs/kol-migration/design-system-drift.md` — frontmatter (status: active).
- `docs/kol-migration/migration-notes.md` — frontmatter (status: active).
- `docs/kol-migration/phase-out-checklist.md` — frontmatter (status: active).
- `docs/kol-migration/typography-proposal.md` — frontmatter (status:
  superseded, `superseded_by`). Top of file flagged as superseded.
- Code comments updated in `kol-typography.css`, `kol-typography-mono.css`,
  `src/data/system/typography.js`, `pools.js`, `palettes.js` —
  "Architecture:" links point at `docs/kol-migration/locked/{name}.md`.
- `LLM_RULES.md` — directory tree extended with `kol-migration/` contents
  (locked subfolder + status of each file).

### Features Added

- **Single-source-of-truth pattern for system data** — `src/data/system/`
  hosts pure-data exports per system. Generic CSS-reading helpers in
  `ColorRamp.jsx` are imported where live reads are needed. Reference.jsx
  is a thin renderer; same pattern can extend to color, layout, routes
  later.
- **`<TypeShowcase>` (Styleguide)** — one component handles all 5 typography
  section visual styles via section-id branching. Reads sections from the
  same data file Reference uses.
- **Unified opacity section** at `/reference#opacity` — numeric primitives
  (14 stops × 3 tiers) + 6 descriptors + class-family table in one
  PageSection with reasoning prose. Replaces the prior split between color's
  `fg-opacity` section and typography's `descriptors`.
- **`locked/` doc convention** — `status:` frontmatter + folder placement
  signal canonical vs active vs superseded at-a-glance.

### Conventions adopted (going forward)

- Cross-doc references in frontmatter: bare filenames preferred over full
  paths (less brittle when files move).
- Don't enumerate every file in `LLM_RULES.md` directory tree — reference
  the convention.
- Don't ripple path updates through code comments / session logs / multiple
  docs on every reorg.

## Current State

### Working
- Reference page typography sections (08-13) all data-driven from
  `typography.js`. Live CSS reads via `<LiveValue>`. Reasoning prose
  rendered above each table.
- Styleguide typography chapter (07) data-driven from same source.
  TypeShowcase handles sans / prose / mono / opacity rows.
- Opacity unified — one section in /reference under typography, one set of
  TypeShowcase rows in /styleguide.
- Sidebar entries match new section IDs.
- All 7 `docs/kol-migration/` markdown files have frontmatter (`title`,
  `status`, `updated`, `tags`).
- `locked/` folder houses the 2 canonical docs.

### Known Issues
- Color section in Reference (brand aliases, ramps, surface, state, absolute)
  still inline data in Reference.jsx — same data-extraction pattern not yet
  applied. Routes table also still inline.
- Layout system (spacing, radius, shadow, transitions, z-index in
  `kol-theme.css`) currently undocumented in /reference.
- Italic regular mono (400i) still missing from JetBrains font files.
- `.text-trim` utility shipped, no consumer uses it yet — opt-in rollout
  pending.

## Next Steps

1. Apply same data-extraction pattern to color → `src/data/system/color.js`.
   Reference renders all color sections (brand aliases, ramps, surface,
   state, absolute) via `COLOR_SECTIONS.map(...)`.
2. Add layout (`src/data/system/layout.js`) — spacing / radius / shadow /
   transitions / z-index. New `/reference#layout` PageSection.
3. Routes (`src/data/system/routes.js`) — extract route table.
4. Browser verification: click through `/reference`, `/styleguide`,
   `/generators` + sub-labs after these reorgs.
