# Session: Phase 4 — tier promotion + component inventory

**Date:** 2026-04-30 (third of the day; follow-up to `control-system-tier-cleanup`)
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Round 3 promotion (kol-components.css residual + framework
component CSS → atoms tier), Slider restructure, LabeledControl molecule,
dead-component deletions, plus the docs layer: components inventory data
file feeding /reference tables and /demo metadata badges.

## Changes Made

### Files Modified

**Tier-file movement:**
- `src/styles/kol-components.css` — **deleted** (was 155-line residual after Phase 3 cleanup; all content promoted to atoms tier)
- `src/styles/kol-components-atoms.css` — appended sidenav-hop family, page-section-divider, kol-label-* typography, icon-default/-hover utility, plus the Slider section was rewritten for the variant restructure
- `src/styles/kol-framework.css` — removed sidenav-hop / sidenav-link / sidenav-group rules (~60 lines), removed page-section-divider rules (~10 lines)
- `src/styles/kol-theme.css` — removed `kol-components.css` import
- `src/styles/kol-fonts-full.css` → `src/styles/kol-typography-fonts-full.css` (rename + import update in `TypeLab.jsx`)

**Slider restructure:**
- `src/components/atoms/Slider.jsx` — `default` variant retired (was bordered); `minimal` renamed to `default` (most used); `subtle` kept; track exposed as `--kol-slider-track` CSS variable
- 6 consumers stripped of `variant="minimal"` prop (now default): `Compositor.jsx`, `PatternLab.jsx`, `TypeControls.jsx`, `SocialLab.jsx`, `LayerStack.jsx`, `Demo.jsx`

**New molecule:**
- `src/components/molecules/LabeledControl.jsx` — generic slot for `label + control body` composition. Children-as-control API. Has `label` + `hint` + `children` + `className` props.

**Dead component deletions:**
- `src/components/atoms/Checkbox.jsx` — 0 importers, deleted
- `src/components/molecules/ButtonNav.jsx` — 0 importers, deleted
- `src/components/molecules/UnitSelector.jsx` — 0 importers, deleted

**Components inventory data:**
- `src/data/system/components.js` — **new** — single source of truth listing all atoms (9), molecules (13), navigation molecules (1), organisms (15) with file path + CSS path + demo route anchor + description per entry
- `src/pages/Reference.jsx` — added Atoms / Molecules / Organisms PageSections rendering the inventory as `simple`-variant Tables; columns: Name (Link to /demo) / JSX path / CSS path / Description
- `src/pages/Demo.jsx` — added `<ComponentMeta>` widget; wired badges into ControlSystemShowcase, ButtonShowcase, ToggleShowcase, SliderShowcase, LabeledControlShowcase, PillTagBadgeShowcase
- `src/components/navigation/sidebars.config.js` — added `Components > Atoms / Molecules / Organisms` group under Reference; added `LabeledControl` entry under Demo group

**Docs:**
- `docs/kol-migration/components/06-open-questions.md` — **new** Phase 4 mid-work parking lot. 3 of 7 questions resolved during the session
- `docs/kol-migration/components/05-deletion-plan.md` — earlier doc, marked status: executed
- `docs/kol-migration/components/01-components-atoms.md` — refreshed status section with Phase 4 completed items

### Features Added

- **`.kol-slider-track` CSS variable** — Slider track color is now exposed for per-instance override. Default = `--kol-fg-64`; subtle variant overrides to `--kol-surface-on-primary`. Demo includes an accent-track override example.
- **LabeledControl molecule** — replaces the inline `label-above-control` pattern used across generators. Demo at `/demo#molecules-labeled-control` shows it wrapping Slider, Input, Stepper.
- **/reference Components tables** — three new sections (16 atoms / 17 molecules / 18 organisms) listing every component with file path + CSS file + description + link to /demo where applicable. Sidebar entry under `Components`.
- **/demo ComponentMeta badges** — small mono-styled file/css path strips on each showcase section, sourced from the same data file.

### Features Removed

- **Slider bordered `default` variant** — retired (was unused; bordered look superseded by the bare-track variant which is now default).
- **`Checkbox.jsx` plain atom, `ButtonNav.jsx`, `UnitSelector.jsx`** — all 3 confirmed dead (0 importers); deleted entirely.
- **Residual `kol-components.css`** — deleted; all remaining content promoted to atoms tier with documented headers.

## Current State

### Working

- All atoms / molecules / organisms accessible via `/reference#components-{atoms,molecules,organisms}` as catalog tables.
- All demo'd components have file/css path badges visible above their showcase content at `/demo`.
- Slider in Pattern Lab, Compositor, Type Lab, Social Lab, Compose, Demo all renders with the new default (bare track) variant; consumers no longer pass `variant="minimal"` (it's the default).
- Slider track color customizable per-instance via `style={{ '--kol-slider-track': '...' }}`.
- LabeledControl shipped + demoed; Pattern Lab `<Section label>` inline pattern is the natural target for refactor (deferred).
- `kol-components.css` no longer imported anywhere; theme cascade is `kol-color → kol-opacity → kol-typography → kol-typography-mono → kol-utilities → kol-components-atoms → kol-components-molecules → kol-components-organisms`.

### Known Issues

- **Pattern Lab + Compositor inline `<Section label>` pattern** still scattered — natural target for LabeledControl adoption, deferred for Phase 5.
- **Pill / Tag / Badge** still use ad-hoc CSS in `kol-components-molecules.css`. Shell migration rejected (pill-radius vs 4px conflict; status-color semantics for Badge). They stay where they are.
- **Generator UIs** (combo-lab, pattern-lab, type-lab, social, compositor) untouched in the chrome refactor — Phase 5 batch starts with combo-lab per user.
- **`-ac` legacy names** — not yet swept. Per user, part of Phase 5 batch protocol.
- **`branded-assets.js` `ASSET_SPECS`** — orphan data after guides removal (still in repo).
- **Component metadata in docs** doesn't include line numbers (rot quickly). File paths only.

### Open Questions (logged in `06-open-questions.md`)

Resolved this session: Slider track exposure ✓, Pill/Tag/Badge shell migration ✗-rejected, LabeledControl API ✓ (children-as-control), UnitSelector ✓ (deleted as dead).

Still open: Section labels tier home (parked in atoms; could move to typography), Component metadata in docs (file paths only — chose to skip line numbers).

## Next Steps

1. **Phase 5 — combo-lab refactor (user-flagged batch protocol).** Per user: locate missing assets (logo, etc.), audit panel structure, replace 3 inline-styled buttons with proper Button atom, identify panel/canvas as candidate molecules/organisms.
2. **`-ac` legacy name purge** — grep for AC-flavored class/var/string references after combo-lab work, sweep.
3. **Repeat for social generator + remaining generators** in batch protocol.
4. **Pattern Lab adoption of LabeledControl** — replace inline `<Section label>` with the new molecule. Trivial mechanical refactor; cascades naturally.
5. **Drop orphan `ASSET_SPECS`** in `branded-assets.js` once confirmed unused.
