/**
 * Navigation tree — TWO LEVELS.
 *
 *   CATEGORY  level 1: Home, Brand, Assets, … A grouping label, not a route
 *             (Home is the one exception — it links, it has nothing to open).
 *   below it  level 2: whatever the category holds. In Brand and Assets those
 *             are SECTIONS of one scrolling page (`to: '/brand#about'`) and the
 *             sidebar row lights by scroll-spy (BrandLayout). In the tool
 *             categories they are PAGES, because each one is an iframe mirror.
 *
 * The two levels are about NAMING, not about how content loads. Labels are ONE
 * WORD; filters, sets and variants are the page's own config, never its name.
 *
 * Shape:
 *   { id, label, icon, pages: [ { to, label }, … ] }   a grouping
 *   { id, label, icon, to }                            a category that IS a link
 */

export const NAV_TREE = [
  /* THE ONE CATEGORY THAT IS ITSELF A LINK (2026-08-01: "remove home sub item,
   * just have the category point to home"). A category with `to` and no `pages`
   * renders as a NavLink instead of a disclosure button — it has nothing to
   * disclose, and a `Home > Home` row was the label repeated for no reason.
   * Every other category still has NO route: `to` is the exception, not a
   * loosening of the rule. */
  {
    id: 'home',
    label: 'Home',
    icon: 'home-01',
    to: '/',
  },

  /* Brand documents the identity. Its seven pages were `PageSection` blocks
   * inside one `Brand.jsx` until 2026-08-01; each is now its own route.
   * Renames from the user's list: Voice → Tone, logos-concept → Logo,
   * logos-types → Lockups. */
  {
    id: 'brand',
    label: 'Brand',
    icon: 'book-open',
    pages: [
      { to: '/brand',            label: 'Overview' },
      { to: '/brand#about',      label: 'About' },
      { to: '/brand#voice',       label: 'Tone' },
      { to: '/brand#look',       label: 'Look' },
      { to: '/brand#logos-concept',       label: 'Logo' },
      { to: '/brand#logos-types',    label: 'Lockups' },
      { to: '/brand#color',      label: 'Color' },
      { to: '/brand#typography', label: 'Typography' },
    ],
  },

  /* Assets holds what you download or reproduce. Same extraction as Brand.
   * ⚠ `Patterns` and `Graphics` each absorbed TWO former section ids
   * (`patterns` + `graphics-patterns`, `graphics` + the Graphics group). If
   * either is genuinely two things it needs a second page and a second name. */
  {
    id: 'assets',
    label: 'Assets',
    icon: 'folder',
    pages: [
      { to: '/assets',            label: 'Overview' },
      { to: '/assets#logos',      label: 'Logos' },
      { to: '/assets#graphics',   label: 'Graphics' },
      { to: '/assets#patterns',   label: 'Patterns' },
      { to: '/assets#branded-assets',    label: 'Branded' },
      { to: '/assets#assets-stationery', label: 'Stationery' },
      { to: '/assets#assets-labels-tags',     label: 'Labels' },
      { to: '/assets#assets-garment-bags',       label: 'Bags' },
      { to: '/assets#assets-packaging',  label: 'Packaging' },
      { to: '/assets#social-sizes',     label: 'Social' },
      { to: '/assets#social-profile',    label: 'Profile' },
    ],
  },

  /* Overview is the deck MANAGER (create/rename/delete/export over a list).
   * Layout and the two sets are placeholders — no source exists for them. */
  {
    id: 'slide-deck',
    label: 'Slide deck',
    icon: 'maximize',
    pages: [
      { to: '/slide-deck',          label: 'Overview' },
      { to: '/slide-deck/template', label: 'Template' },
      { to: '/slide-deck/layout',   label: 'Layout' },
      { to: '/slide-deck/set-1',    label: 'Set 1' },
      { to: '/slide-deck/set-2',    label: 'Set 2' },
    ],
  },

  /* Overview is the kol-media bucket browse (the DS `MediaLibrary` organism).
   * Upload/Search/Gallery are placeholders — the write layer lives in
   * kol-media-admin and the galleries are filtered views not yet specified. */
  {
    id: 'library',
    label: 'Library',
    icon: 'library',
    pages: [
      { to: '/library',           label: 'Overview' },
      { to: '/library/browse',    label: 'Browse' },
      { to: '/library/local',     label: 'Local' },
      { to: '/library/upload',    label: 'Upload' },
      { to: '/library/search',    label: 'Search' },
      { to: '/library/gallery-1', label: 'Gallery 1' },
      { to: '/library/gallery-2', label: 'Gallery 2' },
    ],
  },

  /* Every editor page embeds the deployed kol-ds-fxr. It has NO preset URL
   * contract, so the preset rows all open the same surface and each page says
   * so on screen — `presetUrl()` in EditorPreset.jsx is the one line that
   * changes when fxr grows one. */
  {
    id: 'editor',
    label: 'Editor',
    icon: 'layout',
    pages: [
      { to: '/editor',         label: 'Overview' },
      { to: '/editor/plan',    label: 'Plan' },
      { to: '/editor/video',   label: 'Video' },
      { to: '/editor/image',   label: 'Image' },
      { to: '/editor/input',   label: 'Input' },
      { to: '/editor/camera',  label: 'Camera' },
      { to: '/editor/modular', label: 'Modular' },
      { to: '/editor/vector',  label: 'Vector' },
      { to: '/editor/photo',   label: 'Photo' },
    ],
  },

  /* NEW 2026-08-01 — no route, page or component existed for this before.
   * Every page is a placeholder. */
  {
    id: 'monitor',
    label: 'Monitor',
    /* `desktop` (device/), not `monitor` — the v1 set ships no icon by that
     * name; checked, it is the nearest thing that exists. */
    icon: 'desktop',
    pages: [
      { to: '/monitor',        label: 'Overview' },
      { to: '/monitor/plan',   label: 'Plan' },
      { to: '/monitor/iframe', label: 'Iframe' },
      { to: '/monitor/mirror', label: 'Mirror' },
    ],
  },

  /* Overview embeds the DS showcase's own labelled grid. Shipped is the
   * contact sheet over the published set. Workspace is the `_tmp` shelf —
   * housed for reference, deliberately NOT loaded. */
  {
    id: 'icons',
    label: 'Icons',
    icon: 'grid',
    pages: [
      { to: '/icons',           label: 'Overview' },
      { to: '/icons/workspace', label: 'Workspace' },
      { to: '/icons/gallery-1', label: 'Gallery 1' },
      { to: '/icons/gallery-2', label: 'Gallery 2' },
    ],
  },

  /* Denavigated 2026-07-29 (brand triage): Reference + Components routes stay
   * mounted for direct-URL harvest against kol-ds-ui; Kolkrabbi and Demo
   * removed outright. */
]

/** The category whose pages contain `pathname`, longest match first so
 *  `/brand/about` picks Brand rather than Home's `/`. */
export function getActiveCategory(pathname) {
  let best = null
  let bestLen = -1
  for (const cat of NAV_TREE) {
    /* A link-category (Home) has no `pages` — match on its own `to`. */
    const routes = cat.pages ?? (cat.to ? [{ to: cat.to }] : [])
    for (const page of routes) {
      const isMatch = page.to === '/' ? pathname === '/' : pathname.startsWith(page.to)
      if (isMatch && page.to.length > bestLen) {
        best = cat
        bestLen = page.to.length
      }
    }
  }
  return best
}

export const DENAVIGATED = [
  { id: 'reference',  label: 'Reference',  to: '/reference',  icon: 'view-list' },
  { id: 'components', label: 'Components', to: '/components', icon: 'component-01' },
]
