import { buildInventory, fileLabel } from '@kolkrabbi/kol-workshop/engine'
import { labelFromSlug } from './labels.js'

/* THE VAULT — this repo's docs/ library fed through @kolkrabbi/kol-workshop's
 * content-injection seam (the package never globs docs; the app does). Mirrors
 * kol-ds-ui showcase/src/nav/vault.js — same folder law, same tree grammar:
 * docs/<category>/<chapter>/<page>. Both categories load: documentation/ and
 * operations/. */
export const VAULT_MODULES = import.meta.glob('@docs/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/* A doc lives at docs/<category>/… — a markdown file sitting directly in
 * docs/ (INDEX.md, loose notes) is not content for the parser. Filter is on
 * root depth, not filename: INDEX.md inside a chapter is a real page. */
const VAULT_CONTENT = Object.fromEntries(
  Object.entries(VAULT_MODULES).filter(([path]) => {
    const rel = path.replace(/^.*?docs\//, '')
    return rel.includes('/')
  })
)

export const VAULT = buildInventory(VAULT_CONTENT)

export const vaultDocHref = (id) => `/workshop/docs/${id}`

/* Rail row label = the FILENAME (kol-ds-ui ruling 2026-08-01) — the tree
 * mirrors docs/ on disk. Search keeps the full title, deliberately. */
const railTitle = (d) => fileLabel(d.file)

const relPath = (file) => file.replace(/^.*?docs\//, '')

/* Sidebar tree — category → chapter → page, folder-based so unnumbered docs
 * can never silently vanish (the numeric-grouping trap that dropped 60 of 70
 * docs in the retired in-repo engine). Grammar ported from the showcase:
 * - a category's own INDEX.md is not a page (the category is the eyebrow)
 * - a chapter's nested subfolders fold INTO the chapter (3-level taxonomy)
 * - a loose file at category root is its own childless row
 * - a chapter's INDEX.md becomes the header link + an `About` row on top */
export const VAULT_TREE = (() => {
  const groups = new Map()
  for (const d of VAULT) {
    const segs = relPath(d.file).split('/')
    if (segs.length === 2 && segs[1].toLowerCase() === 'index.md') continue
    const key = segs.length > 2
      ? `${segs[0]}/${segs[1]}`
      : `${segs[0]}//${segs[1]}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(d)
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, docs]) => {
      const loose = key.includes('//')
      const segs = key.split(loose ? '//' : '/')
      const chapter = loose ? null : segs[1]
      const indexDoc = loose ? null : docs.find((d) => /\/index\.md$/i.test(d.file))
      return {
        id: `vault-${key.replace(/\/+/g, '-')}`,
        category: segs[0],
        chapter,
        loose,
        label: loose ? fileLabel(segs[1]) : labelFromSlug(chapter),
        ...(indexDoc ? { path: vaultDocHref(indexDoc.id) } : {}),
        ...(loose ? { path: vaultDocHref(docs[0].id), children: [] } : {}),
        children: loose ? [] : [
          ...(indexDoc ? [{ id: `vd-${indexDoc.id}`, label: 'About', path: vaultDocHref(indexDoc.id) }] : []),
          ...docs
            .filter((d) => !/\/index\.md$/i.test(d.file))
            .slice()
            .sort((a, b) => a.file.localeCompare(b.file))
            .map((d) => ({ id: `vd-${d.id}`, label: railTitle(d), path: vaultDocHref(d.id) })),
        ],
      }
    })
})()

/* Category → its chapter groups, in folder order (documentation before
 * operations) — each category renders as its own sidebar eyebrow. */
export const VAULT_CATEGORIES = (() => {
  const byCategory = new Map()
  for (const g of VAULT_TREE) {
    if (!byCategory.has(g.category)) byCategory.set(g.category, [])
    byCategory.get(g.category).push(g)
  }
  return [...byCategory.entries()].sort(([a], [b]) => String(a).localeCompare(String(b)))
})()

export const VAULT_SEARCH_ITEMS = VAULT.map((d) => ({
  label: d.title,
  path: vaultDocHref(d.id),
  sectionLabel: 'Documentation',
  tags: d.metadata?.tags || [],
  /* headings extracted by buildInventory (workshop ≥0.3.5) — search matches
   * doc content, not just title/tags. */
  headings: d.headings || [],
  keywords: [],
}))

/* Web has no MDX component pages — the tag overlay + graph read the vault. */
export const TAG_INVENTORY = VAULT
