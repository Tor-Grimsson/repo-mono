/**
 * Single navigation tree.
 *
 * Each top-level entry is a page (icon + label + route). Pages may have
 * `children`. Children may have `children` (grandchildren) for further grouping.
 *
 * Leaf shape:
 *   { id: 'about',                 label: 'About'            }   — page section anchor (#about)
 *   { to: '/generators/combo-lab', label: 'Combo lab'        }   — sub-route link
 *
 * Group shape (no id, no to):
 *   { label: 'Color', children: [...] }                          — grandchild group
 */

export const NAV_TREE = [
  { id: 'home', label: 'Home', to: '/', icon: 'kolkrabbi' },

  /* Brand documents the identity; Assets holds everything you download or
   * reproduce. The asset register, the social specimens and the two graphics
   * sections moved down 2026-08-01 — Styleguide had grown into both jobs at
   * once, which is how `patterns` ended up listed twice.
   *
   * Their section anchors are OFF — see SECTION_ANCHORS below. */
  { id: 'brand',  label: 'Brand',  to: '/brand',  icon: 'book-open' },

  { id: 'assets', label: 'Assets', to: '/assets', icon: 'folder' },

  /* Slide deck is a MANAGER, not a viewer: create/delete/name/edit/export over a
   * list of decks. Templates and the individual decks are child ROUTES. */
  {
    id: 'slide-deck',
    label: 'Slide deck',
    to: '/slide-deck',
    icon: 'maximize',
    children: [
      { to: '/slide-deck/templates', label: 'Templates' },
    ],
  },

  /* Gallery quarantined to `_tmp/brand-gallery-elder/` 2026-08-01 (user ruling)
   * with its dev plugin and the stale `__photos.json`. It read a committed
   * snapshot that was 19 files behind, through a plugin pointed at a directory
   * that did not exist. Library browses the same kind of content properly.
   *
   * The three folder children were dropped 2026-08-01 with the MediaLibrary
   * adoption: the organism discloses folders IN PLACE rather than by navigation,
   * so a nav row per folder duplicated a control the page already carries — and
   * the folder list now comes from the bucket instead of a transcribed three. */
  {
    id: 'library',
    label: 'Library',
    to: '/library',
    icon: 'library',
  },

  /* Editor + Icons return 2026-08-01 as EMBEDS, not as local pages — the
   * quarantined `src/editor/` and Icons pages stay dead. Each is an iframe onto
   * the deployed repo that owns it (kol-ds-fxr, kol-ds-ui's showcase), so the
   * brand book shows the live surface and brand carries no copy of it.
   * `layout` is the icon apps/web already gives the editor (navigation.js:70). */
  /* PRESET ROWS ARE PLACEHOLDERS — the user's own list verbatim (2026-08-01,
   * "just to say something"). kol-ds-fxr has no preset URL contract, so every
   * one opens the same editor and the page says so. See EditorPreset.jsx. */
  {
    id: 'editor',
    label: 'Editor',
    to: '/editor',
    icon: 'layout',
    children: [
      { to: '/editor/video',           label: 'Video' },
      { to: '/editor/image',           label: 'Image' },
      { to: '/editor/input',           label: 'Input' },
      { to: '/editor/camera',          label: 'Camera' },
      { to: '/editor/modular-source',  label: 'Modular source' },
      { to: '/editor/vector-edit',     label: 'Vector edit' },
      { to: '/editor/photo-filter',    label: 'Photo filter' },
    ],
  },

  /* `/icons` embeds the DS showcase's own labelled grid; the child is the OTHER
   * presentation — a contact sheet, parameterised by set. */
  {
    id: 'icons',
    label: 'Icons',
    to: '/icons',
    icon: 'grid',
    children: [
      { to: '/icons/kol-icon-set-v1', label: 'Contact sheet' },
    ],
  },

  /* Denavigated 2026-07-29 (brand triage): Reference + Components routes stay
   * mounted for direct-URL harvest against kol-ds-ui; Kolkrabbi and Demo
   * removed outright. */
]

/* ── SECTION ANCHORS — DISABLED 2026-08-01 (user ruling) ────────────────────
 * "hard maintainance, little return, lets disable, so we dont loose it."
 *
 * These were `children` on the Brand and Assets rows: `{ id, label }` leaves
 * with no `to`, rendered as `#anchor` links and driven by scroll-spy. They are
 * kept here, not deleted — same contract as DENAVIGATED below.
 *
 * TO RESTORE: paste the matching array back as `children:` on its page row in
 * NAV_TREE. `SideNav.jsx` still carries every piece that renders them —
 * `collectSectionIds`, `useScrollSpy`, `hasActiveDescendant`, `SectionLeaf`,
 * `ChildNode` — parked, not removed.
 *
 * Every `id` here is a live `PageSection id=` on its page, so deep links like
 * `/brand#about` keep working; only the sidebar rows are gone. */
export const SECTION_ANCHORS = {
  brand: [
    {
      label: 'BRAND OVERVIEW',
      children: [
        { id: 'about', label: 'About' },
        { id: 'voice', label: 'Voice' },
        { id: 'look',  label: 'Look' },
      ],
    },
    {
      label: 'LOGOS',
      children: [
        { id: 'logos-concept', label: 'Concept' },
        { id: 'logos-types',   label: 'Types' },
      ],
    },
    {
      label: 'FOUNDATIONS',
      children: [
        { id: 'color',      label: 'Color' },
        { id: 'typography', label: 'Typography' },
      ],
    },
  ],
  assets: [
    {
      label: 'DOWNLOADS',
      children: [
        { id: 'logos',          label: 'Logos' },
        { id: 'graphics',       label: 'Graphics' },
        { id: 'patterns',       label: 'Patterns' },
        { id: 'branded-assets', label: 'Branded assets' },
      ],
    },
    {
      label: 'STATIONERY',
      children: [
        { id: 'assets-stationery',   label: 'Stationery' },
        { id: 'assets-labels-tags',  label: 'Labels & tags' },
        { id: 'assets-garment-bags', label: 'Garment bags' },
        { id: 'assets-packaging',    label: 'Packaging' },
      ],
    },
    {
      label: 'SOCIAL',
      children: [
        { id: 'social-sizes',   label: 'Sizes' },
        { id: 'social-profile', label: 'Profile' },
      ],
    },
    {
      label: 'GRAPHICS',
      /* `graphics-slide-deck` dropped with the section itself — the deck has
       * its own page now (SlideDeckPage.jsx); the section is quarantined at
       * `_tmp/brand-deck-section-elder/`. */
      children: [
        { id: 'graphics-patterns', label: 'Patterns' },
      ],
    },
  ],
}

export const DENAVIGATED = [
  {
    id: 'reference',
    label: 'Reference',
    to: '/reference',
    icon: 'view-list',
    children: [
      {
        label: 'ROUTES',
        children: [
          { id: 'routes', label: 'Pages' },
        ],
      },
      {
        label: 'COLOR · BRAND',
        children: [
          { id: 'brand-aliases', label: 'Aliases' },
          { id: 'brand-ramps',   label: 'Ramps' },
          { id: 'cream',         label: 'Cream' },
          { id: 'grey',          label: 'Greyscale' },
        ],
      },
      {
        label: 'COLOR · UI',
        children: [
          { id: 'surface',        label: 'Surface' },
          { id: 'state',          label: 'State' },
          { id: 'absolute',       label: 'Absolute' },
          { id: 'fg-primitives',  label: 'Opacity primitives' },
          { id: 'fg-families',    label: 'Opacity classes' },
        ],
      },
      {
        label: 'TYPOGRAPHY',
        children: [
          { id: 'sans-families', label: 'Family tokens' },
          { id: 'sans-atomic',   label: 'Sans atomic' },
          { id: 'prose',         label: 'Prose elements' },
          { id: 'mono',          label: 'Mono' },
          { id: 'opacity',       label: 'Reading hierarchy' },
          { id: 'cuts',          label: 'Cuts loaded' },
        ],
      },
      {
        label: 'COMPONENTS',
        children: [
          { id: 'components-atoms',     label: 'Atoms' },
          { id: 'components-molecules', label: 'Molecules' },
          { id: 'components-organisms', label: 'Organisms' },
        ],
      },
    ],
  },

  {
    id: 'components',
    label: 'Components',
    to: '/components',
    icon: 'component-01',
    children: [
      {
        label: 'ATOMS',
        children: [
          { id: 'control-system',   label: 'Control system' },
          { id: 'atoms-button',     label: 'Button' },
          { id: 'atoms-slider',     label: 'Slider' },
          { id: 'atoms-primitives', label: 'Primitives' },
        ],
      },
      {
        label: 'MOLECULES',
        children: [
          { id: 'atoms-toggles',             label: 'Toggles' },
          { id: 'molecules-labeled-control', label: 'LabeledControl' },
          { id: 'molecules-pill-tag-badge',  label: 'Pill / Tag / Badge' },
        ],
      },
    ],
  },

]

/* Find the active top-level page given a pathname. */
export function getActivePage(pathname) {
  if (pathname === '/') return NAV_TREE.find((n) => n.to === '/')
  return NAV_TREE.find((n) => n.to !== '/' && pathname.startsWith(n.to))
}
