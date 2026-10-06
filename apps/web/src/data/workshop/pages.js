import { buildInventory } from '@kolkrabbi/kol-workshop'

/* THE PAGES — one markdown file per app in ./pages, fed through
 * @kolkrabbi/kol-workshop's content-injection seam (the package never globs;
 * the app does). The home cards, the rail, the search items, the page titles
 * and the routes all derive from this folder: adding an app is adding a file. */
export const PAGE_MODULES = import.meta.glob('./pages/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const PAGE_INVENTORY = buildInventory(PAGE_MODULES)

export const pageHref = (id) => `/workshop/${id}`

/* The frontmatter, flattened for the chrome: `order` sorts the rail and the
 * home, `embed` says whether the open-in-place frame exists at <id>/live. */
export const PAGES = PAGE_INVENTORY
  .map((d) => ({
    ...d.metadata,
    id: d.id,
    title: d.title,
    headings: d.headings,
    embed: d.metadata.embed === 'true',
    order: Number(d.metadata.order) || 99,
  }))
  .sort((a, b) => a.order - b.order)
