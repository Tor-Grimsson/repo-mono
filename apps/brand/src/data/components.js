/**
 * Components inventory — atoms / molecules / organisms.
 *
 * Single source of truth for the /reference Atoms / Molecules / Organisms
 * tables and the metadata badges on each /components showcase section.
 * Each entry: name, file path (jsx), CSS file (if any), components route
 * anchor (if showcased), short description.
 *
 * Architecture: docs/kol-migration/components/01..03-components-*.md
 */

const A = 'src/components/atoms/'
const M = 'src/components/molecules/'
const O = 'src/components/organisms/'
const NAV = 'src/components/navigation/'

const ATOMS_CSS    = 'src/styles/kol-components-atoms.css'
const MOLES_CSS    = 'src/styles/kol-components-molecules.css'
const ORG_CSS      = 'src/styles/kol-components-organisms.css'
const OPACITY_CSS  = 'src/styles/kol-opacity.css'

/* ============================================================================
 * Atoms
 * ============================================================================ */

export const ATOMS = [
  {
    name: 'Avatar',
    file: `${A}Avatar.jsx`,
    description: 'User-initial circle. Sizes sm/md/lg/xl on bg-surface-secondary.',
  },
  {
    name: 'Button',
    file: `${A}Button.jsx`,
    css: ATOMS_CSS,
    demo: 'atoms-button',
    description: 'Polymorphic button/link, 4 variants × 3 sizes. Padding scale shared with .kol-control. No auto text-transform — author strings in target case.',
  },
  {
    name: 'ColorSwatch',
    file: `${A}ColorSwatch.jsx`,
    demo: 'atoms-primitives',
    description: 'Fixed-size color chip. Polymorphic — renders as <button> when onClick passed (with hover + selected states), <span> otherwise (preview chip). size={number} for fixed px, size="fill" for grid-cell flex. showTransparent overlays TransparentX for null slots.',
  },
  {
    name: 'Divider',
    file: `${A}Divider.jsx`,
    description: 'Horizontal/vertical line, opacity-controlled (default 8% fg). Vertical wraps in flex container. PageSection consumes via .kol-page-section-divider.',
  },
  {
    name: 'Input',
    file: `${A}Input.jsx`,
    css: ATOMS_CSS,
    demo: 'control-system',
    description: 'Built on .kol-control shell. Variants filled / ghost / outline. Sizes sm / md / lg. prefix / suffix / chars / width props.',
  },
  {
    name: 'Label',
    file: `${A}Label.jsx`,
    description: 'Minimal text-fg-48 label wrapper. Used by PropertyInput.',
  },
  {
    name: 'Slider',
    file: `${A}Slider.jsx`,
    css: ATOMS_CSS,
    demo: 'atoms-slider',
    description: 'Range-input atom. Variants: default (bare track + boxed value) / subtle (filled chip). Track color exposed as --kol-slider-track CSS variable.',
  },
  {
    name: 'Stepper',
    file: `${A}Stepper.jsx`,
    css: ATOMS_CSS,
    demo: 'control-system',
    description: 'Number input + chevron buttons. Built on .kol-control shell. Chevrons absolute-positioned; size scales 8/10/12.',
  },
  {
    name: 'Textarea',
    file: `${A}Textarea.jsx`,
    css: ATOMS_CSS,
    demo: 'control-system',
    description: 'Multi-line text on .kol-control shell with --textarea modifier (display: block). Variants filled / ghost / outline. Sizes sm / md / lg. Pairs with Input for single-line.',
  },
  {
    name: 'TransparentX',
    file: `${A}TransparentX.jsx`,
    demo: 'atoms-primitives',
    description: 'Diagonal warning stroke for transparent / unused color slots. Absolute-positioned SVG primitive — parent must be position:relative. Stroke uses var(--ui-warning).',
  },
  {
    name: 'ToggleCheckbox',
    file: `${A}ToggleCheckbox.jsx`,
    css: ATOMS_CSS,
    demo: 'atoms-toggles',
    description: 'Labeled checkbox toggle. ON state inverts (white box, black check, no border) — theme-invariant.',
  },
  {
    name: 'ToggleSwitch',
    file: `${A}ToggleSwitch.jsx`,
    css: ATOMS_CSS,
    demo: 'atoms-toggles',
    description: 'On/off pill toggle. Default + plain variants. ON state inverts (white pill, black slider) — theme-invariant.',
  },
]

/* ============================================================================
 * Molecules
 * ============================================================================ */

export const MOLECULES = [
  {
    name: 'Badge',
    file: `${M}Badge.jsx`,
    css: MOLES_CSS,
    demo: 'molecules-pill-tag-badge',
    description: 'Status / categorization indicator. 8 semantic variants (default / secondary / destructive / outline / success / warning / critical / info) × 3 sizes.',
  },
  {
    name: 'ContentFilters',
    file: `${M}ContentFilters.jsx`,
    description: 'Composite filter UI — tags + search + view-mode. Composes Tag + Divider + Icon + ViewToggle.',
  },
  {
    name: 'Dropdown',
    file: `${M}Dropdown.jsx`,
    description: 'Select dropdown w/ panel. Currently CSS-in-JS heavy (own SIZE_MAP, responsive width). Pending shell migration.',
  },
  {
    name: 'DropdownTagFilter',
    file: `${M}DropdownTagFilter.jsx`,
    description: 'Multi-select dropdown w/ deselect-all. Same SIZE_MAP pattern as Dropdown.',
  },
  {
    name: 'LabeledControl',
    file: `${M}LabeledControl.jsx`,
    demo: 'molecules-labeled-control',
    description: 'Slot pattern — small uppercase label above any control body. Replaces inline label-above-input layouts.',
  },
  {
    name: 'Pill',
    file: `${M}Pill.jsx`,
    css: MOLES_CSS,
    demo: 'molecules-pill-tag-badge',
    description: 'Small pill-shaped indicator. 3 variants (outline / subtle / inverse) × 3 sizes. Pill-radius (not 4px).',
  },
  {
    name: 'PropertyInput',
    file: `${M}PropertyInput.jsx`,
    demo: 'control-system',
    description: 'Composes Label + (Stepper for type=number / Input for everything else). Inspector-style property panel pattern.',
  },
  {
    name: 'QuantityInput',
    file: `${M}QuantityInput.jsx`,
    description: 'Number input + stepper combined. Own SIZE_MAP (radius violates 4px rule). Future refactor: compose Input + Stepper.',
  },
  {
    name: 'QuantityStepper',
    file: `${M}QuantityStepper.jsx`,
    description: '+/- count spinners. Own SIZE_MAP. Overlaps with new Stepper atom.',
  },
  {
    name: 'SectionLabel',
    file: `${M}SectionLabel.jsx`,
    css: ATOMS_CSS,
    description: 'Uppercase section label w/ optional icon swap. Uses .kol-label-* + .icon-default/.icon-hover utilities.',
  },
  {
    name: 'Tag',
    file: `${M}Tag.jsx`,
    css: MOLES_CSS,
    demo: 'molecules-pill-tag-badge',
    description: 'Clickable filter tag w/ active state. Pill-radius. Used in ContentFilters.',
  },
  {
    name: 'TypeBlockToolbar',
    file: `${M}TypeBlockToolbar.jsx`,
    description: 'Floating toolbar above a selected TypeBlock — alignment / weight cycle / italic / color picker / delete. Dark chrome (bg-fg-absolute-96 + text-absolute-white) so it reads on light or dark canvases. Used by Type Lab TypeFrame; ports to compose text-layer chrome in Phase 6d.',
  },
  {
    name: 'ToggleBracket',
    file: `${M}ToggleBracket.jsx`,
    css: ATOMS_CSS,
    demo: 'atoms-toggles',
    description: 'Bracket-style "Label [STATE]" toggle. Default uses .kol-control--filled shell + .toggle-bracket--active modifier (yellow + navy ink). Plain variant is bare-text.',
  },
  {
    name: 'ViewToggle',
    file: `${M}ViewToggle.jsx`,
    css: ATOMS_CSS,
    demo: 'atoms-toggles',
    description: 'Segmented control. Text variant uses .kol-control shell; icon variant uses inset "well" pattern (bg-fg-04 container + bg-fg-absolute-24 active).',
  },
]

/* Navigation-tier (project-specific molecules) — listed alongside molecules
 * for /reference completeness even though they live under navigation/. */
export const NAVIGATION_MOLECULES = [
  {
    name: 'ThemeToggle',
    file: `${NAV}ThemeToggle.jsx`,
    demo: 'atoms-toggles',
    description: 'Light/dark theme toggle. icon (32×32 minimal) + hop (full-width Button-primary-styled sidenav row) variants.',
  },
]

/* ============================================================================
 * Organisms
 * ============================================================================ */

export const ORGANISMS = [
  {
    name: 'Table',
    file: `${O}Table.jsx`,
    css: ORG_CSS,
    description: 'Generic data table. Variants: default (bordered) / simple (borderless flush). 15-class CSS surface — see kol-components-organisms.css header.',
  },
  {
    name: 'AssetCard',
    file: `${O}AssetCard.jsx`,
    description: 'Asset preview card with optional caption. Wraps any artwork.',
  },
  {
    name: 'AssetCarousel',
    file: `${O}AssetCarousel.jsx`,
    description: 'Asset carousel — embla-based with drag-free inertia.',
  },
  {
    name: 'AssetFigure',
    file: `${O}AssetFigure.jsx`,
    description: 'Asset figure w/ caption.',
  },
  {
    name: 'AssetGrid',
    file: `${O}AssetGrid.jsx`,
    description: 'Asset grid layout.',
  },
  {
    name: 'AssetTable',
    file: `${O}AssetTable.jsx`,
    description: 'Asset preview / download table. Composes Table; uses row-aware className for ink-flagging non-dark rows.',
  },
  {
    name: 'FeatureSplit',
    file: `${O}FeatureSplit.jsx`,
    description: '2-column feature split layout.',
  },
  {
    name: 'PortalIndex',
    file: `${O}PortalIndex.jsx`,
    description: 'Portal route index display.',
  },
  {
    name: 'Ramp',
    file: `${O}Ramp.jsx`,
    description: 'Color ramp display row.',
  },
  {
    name: 'SigTicker',
    file: `${O}SigTicker.jsx`,
    description: 'Animated signature ticker.',
  },
  {
    name: 'SocialMocks',
    file: `${O}SocialMocks.jsx`,
    description: 'Social media mockup compositions (Avatar etc.).',
  },
  {
    name: 'SpectrumGrid',
    file: `${O}SpectrumGrid.jsx`,
    description: 'Color spectrum visualization grid.',
  },
  {
    name: 'StationeryMocks',
    file: `${O}StationeryMocks.jsx`,
    description: 'Brand stationery mockups (BusinessCard, Envelope, Hangtag, etc.). Type A + Type B variants.',
  },
  {
    name: 'Swatch',
    file: `${O}Swatch.jsx`,
    description: 'Single color swatch primitive — used by Ramp / SpectrumGrid.',
  },
  {
    name: 'TypeBlock',
    file: `${O}TypeBlock.jsx`,
    description: 'Typography block — single-div renderer for full Right-Grotesk typography props (cut, weight, italic, size, tracking, leading, case, color, align). Owns contentEditable + double-click commit; does NOT own position/outline/handles (consumer wraps with its own absolute container). Type Lab TypeFrame composes for the basic branch; compose text layer adopts in Phase 6d.',
  },
  {
    name: 'TypeSample',
    file: `${O}TypeSample.jsx`,
    description: 'Typography sample display.',
  },
]
