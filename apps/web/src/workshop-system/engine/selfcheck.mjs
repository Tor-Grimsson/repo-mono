/**
 * Standalone self-check for the docs engine — runs under plain `node`, zero deps.
 *   node apps/web/src/workshop-system/engine/selfcheck.mjs
 *
 * Proves the parser core is portable (this is the artifact that lifts into the
 * markdown-parser collection). The parser asserts are HARD (exit 1 on break).
 * The taxonomy probe at the bottom is a DIAGNOSTIC — it reports the one real
 * gap (current `NN-slug` ids don't group) without failing the parser proof.
 */
import assert from 'node:assert/strict'
import { parseDocsMarkdown } from './parse-markdown.js'
import { parseFrontmatter } from './frontmatter.js'
import { groupDocsByMajor, categoryLabels, resolveDocId } from './doc-helpers.js'

const SAMPLE = `---
Title: Sample
tags: [alpha, beta]
---

# Sample Doc

Intro with **bold**, *italic*, \`code\`, a [link](02-foo.md), a [[03-bar|wiki]], a swatch {#ff0044} and a #tagged word.

## First Section

Some prose.

### Sub heading

- item one
- item two

1. step one
2. step two

> a callout

| A | B |
|---|---|
| 1 | 2 |

\`\`\`js
const x = 1
\`\`\`

---

## Second Section

More.
`

// ---- Parser core (HARD asserts — the portable proof) --------------------
const { sections, toc, introBlocks, inlineTags } = parseDocsMarkdown(SAMPLE)

// frontmatter is skipped by the parser; parse it separately
const fm = parseFrontmatter(SAMPLE)
assert.deepEqual(fm.tags, ['alpha', 'beta'], 'frontmatter inline array')

// intro
const h1 = introBlocks.find((b) => b.type === 'heading1')
assert.equal(h1?.content, 'Sample Doc', 'H1 → introBlocks')
const intro = introBlocks.find((b) => b.type === 'paragraph')
const kinds = intro.tokens.map((t) => t.type)
for (const k of ['bold', 'italic', 'code', 'link', 'colorswatch', 'hashtag']) {
  assert.ok(kinds.includes(k), `inline token: ${k}`)
}
const links = intro.tokens.filter((t) => t.type === 'link')
assert.ok(links.some((l) => l.url === '02-foo.md'), 'md link url')
assert.ok(links.some((l) => l.url === '03-bar.md' && l.text === 'wiki'), 'wikilink → .md link token')
assert.ok(intro.tokens.some((t) => t.type === 'colorswatch' && t.color === '#ff0044'), 'color swatch')
assert.ok(inlineTags.includes('tagged'), 'hashtag extracted to inlineTags')

// sections + toc (H2 only)
assert.equal(sections.length, 2, 'two H2 sections')
assert.equal(toc.length, 2, 'toc has both H2s')
assert.deepEqual(toc.map((t) => t.id), ['first-section', 'second-section'], 'toc slug ids')

// block coverage inside first section
const b = sections[0].blocks
const types = b.map((x) => x.type)
for (const t of ['heading3', 'list', 'blockquote', 'table', 'code', 'divider']) {
  assert.ok(types.includes(t), `block type: ${t}`)
}
const lists = b.filter((x) => x.type === 'list')
assert.ok(lists.some((l) => l.ordered === false && l.items.length === 2), 'unordered list')
assert.ok(lists.some((l) => l.ordered === true && l.items.length === 2), 'ordered list')
const table = b.find((x) => x.type === 'table')
assert.deepEqual(table.headers, ['A', 'B'], 'table headers')
assert.equal(table.rows.length, 1, 'table body row')
const code = b.find((x) => x.type === 'code')
assert.equal(code.lang, 'js', 'code fence language')
assert.deepEqual(code.lines, ['const x = 1'], 'code fence body')

// `+` bullet marker (CommonMark) groups like - and *
const plus = parseDocsMarkdown('## S\n\n+ one\n+ two\n')
const plusList = plus.sections[0].blocks.find((x) => x.type === 'list')
assert.ok(plusList && plusList.items.length === 2, '+ bullets parse as a list')
assert.equal(plusList.items[0].content, 'one', '+ bullet content has no literal +')

console.log('PARSER CORE: all asserts passed — engine is portable (ran under plain node, zero deps).')

// ---- Link resolver (HARD asserts — pure id resolution, no routes) ----------
const known = new Set(['03-typography', '00-docs-index', '01-foundation-index'])
assert.equal(resolveDocId('../02-design-system/03-typography.md', known)?.id, '03-typography', 'cross-folder file link')
assert.equal(resolveDocId('03-typography.md#legacy', known)?.anchor, 'legacy', 'anchor preserved')
assert.equal(resolveDocId('../00-docs/INDEX.md', known)?.id, '00-docs-index', 'INDEX.md → folder-index (path folder)')
assert.equal(resolveDocId('./INDEX.md', known, '01-foundation')?.id, '01-foundation-index', 'bare INDEX.md → currentFolder-index')
assert.equal(resolveDocId('../operations/INDEX.md', known), null, 'out-of-vault link stays unresolved')
assert.equal(resolveDocId('https://example.com', known), null, 'non-.md link ignored')
console.log('LINK RESOLVER: all asserts passed — INDEX + cross-folder + anchors resolve, dead links → null.')

// ---- Taxonomy adapter (HARD asserts — grouping keys off the folder path) ---
// CURRENT vault shape after the 2026 renumber: id = FILE number within folder,
// category = FOLDER number in `file`. Grouping must read the folder, not the id.
const currentDocs = [
  { id: '01-repository-structure', title: 'Repository Structure', file: 'docs/documentation/01-foundation/01-repository-structure.md' },
  { id: '03-markdown-parser', title: 'Markdown Parser', file: 'docs/documentation/01-foundation/03-markdown-parser.md' },
  { id: '05-navigation-system', title: 'Navigation System', file: 'docs/documentation/01-foundation/05-navigation-system.md' },
  { id: '07-documentation', title: 'Documentation', file: 'docs/documentation/05-workshop/07-documentation.md' },
]
const grouped = groupDocsByMajor(currentDocs)
const placed = Object.values(grouped).flat().length
assert.equal(placed, 4, 'every current doc groups (none dropped)')
assert.equal(grouped['1'].length, 3, '3 docs → folder 01 (Foundation)')
assert.equal(grouped['5'].length, 1, '1 doc → folder 05 (Workshop)')
assert.equal(categoryLabels[1], 'Foundation', 'folder 1 labels as Foundation')
console.log(`\nTAXONOMY ADAPTER: ${placed}/4 grouped — folder 01→${categoryLabels[1]}, 05→${categoryLabels[5]}. Gap closed.`)
