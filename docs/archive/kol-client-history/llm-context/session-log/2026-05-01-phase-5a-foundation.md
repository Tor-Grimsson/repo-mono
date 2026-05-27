# Session: Phase 5a + 5b — generators + compose migration

**Date:** 2026-05-01
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Audited /generators + /compose surfaces (delegated to two
parallel research agents), produced `docs/kol-migration/generators-audit.md`,
then executed Phase 5a (foundation primitives + toggle-button migration),
Phase 5b (deeper /compose migration including LayerInspector full refactor),
and Phase 5c small/medium (TypeControls hex Inputs, ColorPicker overhaul,
SocialLab Stepper, PatternLab residual + tokens, photos.json build script).
Large rewrites (TypeFrame, FloatingToolbar, slide-layouts) deferred.

## Changes Made

### Audit doc

- New: `docs/kol-migration/generators-audit.md` — 900+ line audit with
  file-by-file scope, 11 finding categories, optimal refactor path
  (5a–5e), open-questions section. Updated with executed decisions.

### Foundation primitives + cleanup (Phase 5a)

**Deleted (orphans):**
- `src/components/generators/AspectGuide.jsx` — zero consumers across `/src/`.
- `src/components/generators/ControlsSection.jsx` — replaced by molecules/LabeledControl.

**New atoms:**
- `src/components/atoms/Textarea.jsx` — multi-line on `.kol-control` shell
  via new `--textarea` modifier (display: block). Variants filled / ghost /
  outline × sizes sm / md / lg.
- `src/components/atoms/TransparentX.jsx` — 24×24 stroke X via
  `var(--ui-warning)`. For transparent / unused color slots.

**CSS additions:**
- `kol-components-atoms.css` — `.kol-control--textarea { display: block; }`
  modifier.

### ViewToggle update

- `src/components/molecules/ViewToggle.jsx` — text-variant inactive switched
  from `kol-control--ghost` (revealed border on hover) to bare
  `text-meta hover:text-emphasis`. Per user: "ViewToggle is not supposed
  to have outline hover."

### Toggle-button cluster migration → ViewToggle binary (10 sites)

Per user: "its basically a Binary ViewToggle - it should be yes a variant.
Import it." Same `aria-pressed` button cluster (`w-full px-4 py-2 kol-helper-12
rounded transition-colors bg-surface-secondary text-auto`) replaced with 2-option
ViewToggle in:

- `combo-lab/ComboLab.jsx` Logo on/off + BG on/off (2 sites)
- `pattern-lab/PatternLab.jsx` Stretch + Overflow (Visible/Clip) + Bg (3 sites)
- `social/SocialLab.jsx` View all (1 site)
- `compositor/Compositor.jsx` Pattern (1 site, conditional render — `<span>No pattern</span>` when no pattern in library)
- `type-lab/TypeControls.jsx` Italic + Variable axis (2 sites)
- `compose/inspectors/PaletteInspector.jsx` BG (1 site, restructured: bare BG label + ViewToggle)

### Section import migration (5 generator files)

`import Section from '../ControlsSection'` →
`import Section from '../../molecules/LabeledControl'`. Local `Section` alias
preserved. Visual delta: tracking-widest on label (LabeledControl has it).

Files: combo-lab/ComboLab.jsx, pattern-lab/PatternLab.jsx, social/SocialLab.jsx,
compositor/Compositor.jsx, type-lab/TypeControls.jsx.

### Textarea migration (2 sites)

- `pattern-lab/PatternLab.jsx` custom-SVG textarea
- `compositor/Compositor.jsx` text textarea

### TransparentX migration (3 sites)

- `combo-lab/ComboLab.jsx` SwatchRow inline SVG
- `social/ColorPicker.jsx` local function (deleted, atom imported)
- `compose/SwatchRow.jsx` inline SVG

### Inventory + showcases

- `src/data/system/components.js` — Textarea + TransparentX entries.
- `src/pages/Demo.jsx` —
  - Imports added.
  - `ControlSystemShowcase` grew Textarea section (3 variants × sm).
  - `ToggleShowcase` grew binary-ViewToggle example (third instance).
  - New `atoms-primitives` PageSection with TransparentX showcase
    (3 sizes).
- `src/components/navigation/sidebars.config.js` — Demo group has
  `atoms-primitives` anchor.

### Comment fix

- `generators/GeneratorLayout.jsx` — comment referencing
  `<ControlsSection>` updated to `<LabeledControl>` (alias `Section`).

## Verification

Greps post-execution:
- `ControlsSection` / `AspectGuide` references: 0 in `/src/`.
- `w-full px-4 py-2 kol-helper-12 ... bg-surface-secondary` clusters: 0.
- `stroke="#E04B4B"` literal strokes: 0.

## Drift doc note

`design-system-drift.md` §6 lists `--kol-status-*` as one of two parallel
UI-state systems. `--kol-status-*` was actually deleted in Phase 4
(confirmed via grep). The drift doc needs an update pass — out of scope
for this session.

## Phase 5b — /compose deeper migration (shipped same session)

User feedback after 5a verification:
- Textarea: use icon loader for resize handle in 24px frame as stroke;
  default rows 2-3 max.
- TransparentX: 24px is sufficient; needs to clip + thinner stroke.

**Atom fixes:**
- Created `00-kol/resize-corner.svg` (two parallel diagonals, stroke 2.5,
  currentColor — matches chevron convention).
- `Textarea.jsx` rewritten: wraps in `<label>` + label-style padding via
  `.kol-control--textarea` CSS (block + position relative + cascading
  padding rules). Renders custom resize-corner Icon at bottom-right
  (pointer-events:none). Native webkit resizer suppressed via CSS. Default
  rows = 3.
- `TransparentX.jsx` simplified: `vectorEffect="non-scaling-stroke"` keeps
  stroke at 1px regardless of container; `overflow-hidden` on parent does
  the clipping (no longer overflow-visible internally).
- /demo: removed 96px TransparentX example; kept 24px + 32px in
  `overflow-hidden` containers.
- PatternLab Textarea: dropped `rows={4}` to use atom default.

**Compose migration (per audit §5):**
- `pages/Compose.jsx` — page title AC string fixed (`'Compose'`).
- `compose/state.jsx` — default text-layer content uses `BRAND.name`.
- `compose/CanvasArea.jsx` — kept `'#0E0E11'` defensive fallback (low priority).
- `compose/inspectors/AspectInspector.jsx` → LabeledControl wrap.
- `compose/inspectors/Placeholder.jsx` — 4 inline-style margin/border
  → Tailwind utility classes.
- `compose/LayerStack.jsx` — 3 inline-style cleanups (mt-2, mb-1.5,
  min-w-[28px]).
- `compose/ComposeTopbar.jsx` — 5 raw `kol-compose-export-btn` buttons →
  `<Button variant="outline" size="sm" iconLeft|iconRight>`.
- `compose/SwatchRow.jsx` — hex chip → `<Input variant="outline" prefix="#"
  chars={6} uppercase>`.
- `compose/inspectors/PaletteInspector.jsx`:
  - 2 inline label-control wrappers → LabeledControl.
  - 3 raw kol-btn buttons → `<Button>`.
  - `require('../../generators/combo-lab/palettes')` mid-render → top-level
    `import { LAYOUTS }`.
- `compose/inspectors/LayerInspector.jsx` — **full refactor (257 → 220 lines):**
  - 8 inline label-control wrappers → LabeledControl (Variant, Content,
    Size+hint, Pattern Source, Tile size+hint, Image Source, Image Fit,
    Type Spec). Position + Color groups also wrapped.
  - Local `NumField` deleted; PositionFields uses `<Input variant="outline"
    size="sm" type="number" prefix="X|Y|W|H">` × 4 directly. Resolves dead
    `input-outline` className.
  - Local `ColorField` hex chip → `<Input variant="outline" prefix="#"
    chars={6} uppercase disabled={isPaletteRef}>`.
  - 2 raw kol-btn buttons (Image upload + clear) → `<Button>`.
  - Removed `Icon` import (no longer needed).
  - Disambiguating comments cleaned out — let the LabeledControl wraps speak.

**Combo Lab residual hex chip migration:**
- `combo-lab/ComboLab.jsx` SwatchRow local function — hex chip block →
  `<Input variant="outline" prefix="#" chars={6} uppercase>`. Last
  `kol-hex-chip` consumer eliminated.

**demoSeed.js token conversion:**
- Per user "sure" — palette colors + type ink + pattern colors all resolve
  via `resolveCssVar` from `--brand-*` / `--cream-*` / `--grey-*` tokens.
- Palette names rewritten: 'Burgundy + cream' → 'Brand pair', 'Cream ramp'
  kept, 'Burgundy ramp' → 'Red ramp', 'Brand high contrast' → 'High contrast'.
- 'Greyscale' palette `bgEnabled` toggled correctly.
- `poolId: 'burgundy'` (broken — no such pool) → `'red'`.
- 'No 7 / SS26' (AC collection) → 'Vol. I' (brand-neutral).
- 'Another Creation' → `BRAND.name`.

**Dead CSS deletion:**
- `kol-framework.css` — removed `.kol-compose-export-btn` family
  (~17 lines, lines 410-426).
- `kol-framework.css` — removed `.kol-hex-chip` family (~24 lines,
  lines 1234-1256).

**Drive-by cleanup:**
- `sidebars.config.js` — dropped dead `/site` external-link entry.

## Verification

Greps post-execution:
- 0 remaining: `ControlsSection`, `AspectGuide`, `kol-compose-export-btn`,
  `kol-hex-chip`, `input-outline`, toggle-button cluster, `#E04B4B`
  literal stroke, `require('../../generators/combo-lab/palettes')`,
  AC page title.
- AC strings remaining: `brand.config.js` (single source — flips via Phase 5e),
  `slide-layouts.jsx` (Phase 5c rewrite target), Runway decks (out of
  Phase 5 scope per phase-out-checklist §5).

## Drift doc note

`design-system-drift.md` §6 lists `--kol-status-*` as one of two parallel
UI-state systems. `--kol-status-*` was actually deleted in Phase 4
(confirmed via grep). The drift doc needs an update pass — out of scope
for this session.

## Phase 5c — small/medium per-lab batches (shipped same session)

User feedback during Phase 5b: switch /compose Inputs from `outline` to
`ghost` variant (Figma-style — invisible at rest, reveals on hover/focus).
Applied to all 7 compose Input sites (LayerInspector × 6 + SwatchRow × 1).

Generator-side trims:
- **lobby/Lobby.jsx** — dropped redundant `tracking-widest` on
  `kol-helper-12` (helper class already tracks).
- **type-lab/cuts.js** — PALETTE Burgundy ramp replaced with KOL Red ramp
  hex values + relabel. Cream/Grey kept (canonical).
- **compositor/Compositor.jsx** — `'#FFFFFF'` text/mark color fallbacks
  → `resolveCssVar('--cream-100')`.
- **type-lab/TypeControls.jsx** — 2 hex inputs → `<Input variant="filled"
  prefix="#" chars={6} uppercase>`. Added Input import.
- **social/ColorPicker.jsx** — full overhaul:
  - Tab nav (custom underline) → `<ViewToggle>` text variant.
  - ROW_WARM/ROW_GREY hex arrays → token arrays resolved via
    `resolveCssVar` at render.
  - Hex input → `<Input prefix="#" chars={6} uppercase>`.
- **social/SocialLab.jsx** — custom W/H number inputs → `<Stepper>`.
- **pattern-lab/PatternLab.jsx** — large refactor:
  - `NumInput` local now delegates to `<Stepper size="sm">`.
  - `RANDOM_PALETTE` 12-hex literal → `RANDOM_PALETTE_TOKENS` resolved
    via `buildRandomPalette()` at randomize time.
  - 7 inline label-above-input wrappers in RuleRow → `<Section>` (LabeledControl).
    Slider opacity uses LabeledControl `hint` slot.
  - Expression input → `<Input variant="filled" size="sm">`.
  - 4 raw `kol-btn` buttons → `<Button>` atom (Add rule + 2 Randomize +
    Save pattern).
  - `COLOR_DEFAULTS` literal hex → `DEFAULT_COLOR_TOKENS` (token-driven
    via resolveCssVar at state init + reset).
  - `ToggleChip` local kept — non-binary toggle, no clean atom fits.
- **scripts/build-photos-manifest.js** — new Node script. Scans
  `public/brand/images/*`, emits `public/__photos.json`. Wired to
  package.json `predev` / `prebuild` + manual `manifest:photos` script.
  Ran once; emitted 7 groups / 49 files. Restores SocialLab Library
  dropdown.

## Verification (post-5c)

Greps:
- 0 `kol-helper-12 bg-fg-absolute-24 border border-fg-08` (Pattern A)
- 0 `kol-compose-export-btn`, `kol-hex-chip`, `input-outline`,
  toggle-button cluster, AC page title, mid-render `require()`,
  `#E04B4B` literal stroke
- 0 `RANDOM_PALETTE` literal hex (replaced by tokens)
- AC residue: `slide-layouts.jsx` (3 strings + 5 hex in DEFAULT_PALETTE
  + comments — Phase 5c rewrite target), `brand.config.js` (single source,
  Phase 5e), Runway decks (out of Phase 5 scope).

## Next Steps

1. **Visual smoke test** — full pass across `/`, `/styleguide`, `/reference`,
   `/reference/acyr`, `/generators`, `/generators/{combo-lab, pattern-lab,
   type-lab, social, compositor}`, `/compose`, `/demo`, `/demo/runway-v1`–`v4`.
   Watch console clean. Check ghost-variant Inputs in /compose hover-reveal,
   ColorPicker tab toggle, custom W/H stepper, PatternLab rule rows
   (NumInput → Stepper, expression Input, opacity hint), TypeControls hex
   inputs, SocialLab library dropdown populates from `__photos.json`,
   demoSeed Lobby populate (Load demo button) shows KOL colors.

2. **Phase 5c residual rewrites** (next session, ~1 each):
   - **TypeFrame canvas-handle CSS extraction** — `.kol-typeframe-handle--{e,w,blend}`
     classes for resize/blend handles. rgba(...) literals → tokens.
   - **FloatingToolbar full rewrite** — local `Btn` → Button, `ColorSwatch`
     → shared atom (or local). Inline-styles → `.kol-typeframe-toolbar`.
   - **slide-layouts.jsx rewrite** — 15+ inline-style blocks → CSS classes.
     AC copy → strings config (KOL voice or lorem). LogoMark consolidates
     with combo-lab/layouts.jsx LogoSlot. AC hex `DEFAULT_PALETTE` → tokens.

3. **Phase 5d — string sweep final.** AC residue cleanup confined to
   `slide-layouts.jsx` (handled in 5c rewrite) + Runway decks.

4. **Phase 5e — code-name rename** (AcLogo → KolLogo, ac-*.svg → kol-*.svg).

5. **Drift doc update pass** — `design-system-drift.md` §6 stale on
   `--kol-status-*` (deleted in Phase 4). §10 ripple-list also stale —
   most consumers already migrated. Quick sweep.
