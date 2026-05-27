# Session: Color system rebuild + live-CSS display pattern

**Date:** 2026-04-30 (continuation)
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Replaced the AC burgundy/cream/grey color system with a 5-layer
KOL architecture: 5 brand hue ramps (yellow / red / blue / orange / teal) ×
5 stops + cream + legacy grey + theme-pair brand roles + accent role + a
disconnected UI-state system. Reorganized the Tailwind `@theme` exposures by
concern (color in `kol-color.css`, fonts in `kol-typography.css`). Built a
runtime CSS-resolving helper (`ColorRamp.jsx` + `resolveCssVar`) and rewired
every color display surface (Demo, Reference, Styleguide) plus the Combo Lab
pool engine to read live from CSS instead of duplicating hex literals.

## Changes Made

### Files Created

- `src/components/sections/ColorRamp.jsx` — live-CSS color display helper.
  Exports `resolveCssVar(name)` (hidden-DOM-probe → hex), `<Chip token>` (live
  swatch), `<ColorRamp ramp anchor stops note>` (full ramp row).
- `docs/kol-migration/color-system.md` — full architecture log: 5-layer
  system, what JSX consumes, what was removed in the rebuild and why, the
  live-display pattern across Demo / Reference / Styleguide / Combo Lab,
  remaining content-stale refs, how to rebrand later.

### Files Modified

- `src/styles/kol-color.css` — full rebuild:
  - Deleted `--kol-color-brand-{sage, yellow, orange, red, green, teal}`
    (vestigial 6-hex palette), `--kol-status-*` (8 tokens, duplicate UI-state),
    `--kol-signal-input` + `--kol-cv-attenuate` (foreign eurorack tokens),
    `--burgundy-{100..500}` (AC ramp), AC `--cream-*` values, `--brand-surface-deep`
  - Replaced `--cream-*` with KOL values at the same names (5 stops)
  - Added 5 brand hue ramps × 5 stops (`--brand-{yellow, red, blue, orange,
    teal}-{100..500}`) with canonical anchors marked
  - Rewired brand role layer: `--brand-primary` → yellow-300, `--brand-on-primary`
    → blue-400, `--brand-secondary` → red-200, `--brand-on-secondary` → cream-100
  - Rewired accent role: `--kol-accent-primary` → `var(--brand-primary)`,
    `-on-primary` → `var(--brand-on-primary)`, `-strong` → `var(--brand-yellow-400)`
  - Kept legacy 10-stop `--grey-*` ramp untouched (until opacity-hex revival)
  - Tailwind `@theme` block extended with all 25 brand ramp stops + cream +
    role tokens; section header documents the auto-generation contract
- `src/styles/kol-typography.css` — `@theme` block (font-family exposures)
  appended at end with section header. Moved from `index.css`.
- `src/index.css` — `@theme` block deleted entirely. File is now imports +
  the one `scrollbar-gutter` global rule.
- `src/components/generators/combo-lab/pools.js` — refactored from inlined
  hex ramps (`CREAM_RAMP`/`BURGUNDY_RAMP`/`GREY_RAMP`) to **token arrays + pool
  getters**: `pool.colors` and `pool.defaults` resolve via `resolveCssVar` on
  every access. `tokenNameFor(hex)` lookup map built lazily. 9 pools defined
  (seed, brand, all-light, all-dark, yellow, red, blue, orange, teal, cream,
  greyscale).
- `src/components/generators/combo-lab/palettes.js` — `PALETTES[]` deleted
  (zero consumers). `LAYOUTS`, `LOGOS`, `fgOn` retained. File header updated
  to point at `color-system.md` and note the deletion.
- `src/pages/Demo.jsx` — replaced ~100-line hardcoded `RAMP_PROPOSAL` constant
  + local `RampRow`/`ColorSwatch` components with `<ColorRamp>` direct calls
  for all 7 ramps. PageSection renamed `kol-color-system`.
- `src/pages/Reference.jsx` — `aliasRows` rewritten for new brand role tokens
  (4 entries: `--brand-primary` / `-on-primary` / `-secondary` / `-on-secondary`).
  `burgundyRows` deleted. Added `yellowRows` / `redRows` / `blueRows` /
  `orangeRows` / `tealRows` consolidated into one `id="brand-ramps"` PageSection.
  `creamRows` and `greyRows` simplified to token + note (hex column reads via
  `LiveHex`). `rampCols` swatch column uses `var(--token)` instead of hardcoded
  hex.
- `src/pages/Styleguide.jsx` — color chapter rewritten: hardcoded ramp arrays
  (`greyRamp` / `brandPalette` / `creamRamp` / `burgundyRamp`) deleted, replaced
  by `BRAND_RAMPS` config + `stops5`/`stops10` arrays. New `LiveSwatch` helper
  wraps existing `Swatch` with token resolution. JSX iterates `BRAND_RAMPS` to
  render all 5 brand ramps + cream + grey. Prose updated.
- `src/components/navigation/sidebars.config.js` — Reference sidebar entry
  `burgundy` → `brand-ramps`. Demo sidebar entry `kol-color-proposal` →
  `kol-color-system`.
- `docs/kol-migration/design-system-drift.md` — added §12 (palette data drift,
  flagged AC hex literals in palettes.js) and §13 (missing primitive — solid
  neutrals, retired `--kol-opacity-hex-*` family without equivalent). KOL
  master sync renumbered to §14.

### Files Deleted

- None. (All AC ramp deletions happened inside `kol-color.css`.)

## Architecture (5-layer color system)

1. **Primitives** — 5 brand hue ramps × 5 stops + cream + legacy grey +
   absolutes
2. **Surface system** — `--kol-surface-{primary, secondary, tertiary, inverse}`
   + on-companions, theme-flipping (untouched by this rebuild)
3. **Brand identity** — 4 theme-pair tokens. Edit these to rebrand without
   touching consumers.
4. **Accent role** — `--kol-accent-{primary, on-primary, primary-strong}`
   pointing at the brand role layer
5. **UI state** — `--ui-{error, warning, info, success}`, deliberately
   disconnected from brand ramps (universal semantic meaning, not brand
   identity)

Tailwind `@theme` registrations re-export the brand role + 25 brand ramp stops
+ 5 cream + 4 ui-state tokens as `bg-*`/`text-*`/`border-*` utilities. Tailwind
v4 generates utilities on-demand, so registering everything is cheap.

## Live-display pattern

Single source of truth: `kol-color.css`. Every consumer reads the value at
runtime via `resolveCssVar(tokenName)` — no duplicated hex literals anywhere.

| surface | adapter | location |
|---|---|---|
| Demo | `<ColorRamp>` direct | `Demo.jsx` |
| Reference table cells | `<LiveHex>` | `Reference.jsx` |
| Styleguide swatches | `<LiveSwatch>` (wraps existing `Swatch`) | `Styleguide.jsx` |
| Combo Lab pools | pool getters via `resolveCssVar` | `pools.js` |

Edit a token, every surface re-renders with the new value.

## Current State

### Working
- 6 ramps + accent role + brand identity all wired to KOL palette.
- `bg-brand-primary` / `text-brand-yellow-300` / etc. Tailwind utilities
  available in JSX.
- `/demo#kol-color-system`, `/reference#brand-ramps`, `/styleguide#color` all
  live-display from CSS.
- Combo Lab generates palettes from the new ramps via the token-based pool
  engine.

### Known issues / out of scope
- **Content / copy stale refs** — `Styleguide.jsx` prose mentions "burgundy and
  cream" in 3 places (Look chapter line 108, AssetCard captions ~line 374,
  Avatar section ~line 464). Comments in `slide-layouts.jsx` reference burgundy
  by name. These belong in a future AC → KOL string sweep, not this color rebuild.
- `kol-site.css` references `--brand-surface-deep` (deleted). File dies with
  the marketing-site strip pass; harmless until then.
- `--grey-{50,600..900}` consumers (e.g. `deckStyles.js`, surface tokens) — all
  still valid since the legacy 10-stop grey ramp was kept untouched.

## Next Steps

1. **Verify in browser.** Reload `/demo`, `/reference`, `/styleguide`,
   `/generators/combo-lab` — confirm no broken renders, no console errors,
   palette generation produces KOL colors.
2. **Content / copy sweep** (separate pass) — rewrite the 3 prose mentions of
   "burgundy and cream" in Styleguide + the burgundy comments in
   slide-layouts.jsx + AssetCard captions. Folds into the larger AC → KOL
   string sweep documented in `phase-out-checklist.md` §5.
3. **Migration roadmap update** — `migration-notes.md` and the larger
   phase-out checklist should mark color-system items as done; the live
   pattern means future color tweaks don't need additional migration passes.
