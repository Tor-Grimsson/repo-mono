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
  { id: 'home', label: 'Home', to: '/', icon: 'signature-thick' },

  {
    id: 'styleguide',
    label: 'Styleguide',
    to: '/styleguide',
    icon: 'book-open',
    children: [
      {
        label: 'Brand overview',
        children: [
          { id: 'about', label: 'About' },
          { id: 'voice', label: 'Voice' },
          { id: 'look',  label: 'Look' },
        ],
      },
      {
        label: 'Logos',
        children: [
          { id: 'logos-concept',   label: 'Concept' },
          { id: 'logos-types',     label: 'Types' },
        ],
      },
      {
        label: 'Foundations',
        children: [
          { id: 'color',      label: 'Color' },
          { id: 'typography', label: 'Typography' },
        ],
      },
      {
        label: 'Asset register',
        children: [
          { id: 'assets-stationery',   label: 'Stationery' },
          { id: 'assets-labels-tags',  label: 'Labels & tags' },
          { id: 'assets-garment-bags', label: 'Garment bags' },
          { id: 'assets-packaging',    label: 'Packaging' },
        ],
      },
      {
        label: 'Social',
        children: [
          { id: 'social-sizes',      label: 'Sizes' },
          { id: 'social-profile',    label: 'Profile' },
          { id: 'social-generators', label: 'Generators' },
        ],
      },
      {
        label: 'Graphics',
        children: [
          { id: 'graphics-slide-deck', label: 'Slide deck' },
          { id: 'graphics-patterns',   label: 'Patterns' },
        ],
      },
    ],
  },

  { id: 'gallery', label: 'Gallery', to: '/gallery', icon: 'image' },

  { id: 'library', label: 'Library', to: '/library', icon: 'library' },

  {
    id: 'reference',
    label: 'Reference',
    to: '/reference',
    icon: 'list-01',
    children: [
      {
        label: 'Kolkrabbi',
        children: [
          { to: '/reference/acyr', label: 'Source of truth' },
        ],
      },
      {
        label: 'Routes',
        children: [
          { id: 'routes', label: 'Pages' },
        ],
      },
      {
        label: 'Color · Brand',
        children: [
          { id: 'brand-aliases', label: 'Aliases' },
          { id: 'brand-ramps',   label: 'Ramps' },
          { id: 'cream',         label: 'Cream' },
          { id: 'grey',          label: 'Greyscale' },
        ],
      },
      {
        label: 'Color · UI',
        children: [
          { id: 'surface',        label: 'Surface' },
          { id: 'state',          label: 'State' },
          { id: 'absolute',       label: 'Absolute' },
          { id: 'fg-primitives',  label: 'Opacity primitives' },
          { id: 'fg-families',    label: 'Opacity classes' },
        ],
      },
      {
        label: 'Typography',
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
        label: 'Components',
        children: [
          { id: 'components-atoms',     label: 'Atoms' },
          { id: 'components-molecules', label: 'Molecules' },
          { id: 'components-organisms', label: 'Organisms' },
        ],
      },
      {
        label: 'Assets',
        children: [
          { id: 'logos',          label: 'Logos' },
          { id: 'graphics',       label: 'Graphics' },
          { id: 'patterns',       label: 'Patterns' },
          { id: 'branded-assets', label: 'Branded assets' },
        ],
      },
    ],
  },

  { id: 'editor', label: 'Editor', to: '/editor/compose', icon: 'pencil' },

  { id: 'icons', label: 'Icons', to: '/icons', icon: 'shape' },

  { id: 'demo', label: 'Demo', to: '/demo', icon: 'bolt' },

  {
    id: 'components',
    label: 'Components',
    to: '/components',
    icon: 'component',
    children: [
      {
        label: 'Atoms',
        children: [
          { id: 'control-system',   label: 'Control system' },
          { id: 'atoms-button',     label: 'Button' },
          { id: 'atoms-slider',     label: 'Slider' },
          { id: 'atoms-primitives', label: 'Primitives' },
        ],
      },
      {
        label: 'Molecules',
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
