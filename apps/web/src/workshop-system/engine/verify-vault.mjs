/**
 * Repo-specific verification sweep (NOT part of the portable core).
 * Reads every doc in docs/documentation, builds the inventory, and resolves
 * EVERY markdown link the parser emits — proving the whole vault renders with
 * working cross-links, and listing anything genuinely dead.
 *
 * Run from repo root:  node apps/web/src/workshop-system/engine/verify-vault.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { buildInventory } from './build-inventory.js'
import { parseDocsMarkdown } from './parse-markdown.js'
import { resolveDocId } from './doc-helpers.js'

const DOCROOT = join(process.cwd(), 'docs/documentation')

// Build the raw-module map the way the Vite glob would (folders 00-09 only).
const modules = {}
for (const folder of readdirSync(DOCROOT, { withFileTypes: true })) {
  if (!folder.isDirectory() || !/^0\d-/.test(folder.name)) continue
  const fdir = join(DOCROOT, folder.name)
  for (const file of readdirSync(fdir)) {
    if (file.endsWith('.md')) {
      modules[`/docs/documentation/${folder.name}/${file}`] = readFileSync(join(fdir, file), 'utf8')
    }
  }
}

const inventory = buildInventory(modules)
const knownIds = new Set(inventory.map((d) => d.id))

// Collect every .md link url out of a parsed doc (intro + sections, incl. list
// items and table cells).
const collectLinks = (parsed) => {
  const urls = []
  const eat = (toks) =>
    toks?.forEach((t) => {
      if (t.type === 'link' && t.url?.includes('.md')) urls.push(t.url)
    })
  const eatBlock = (b) => {
    eat(b.tokens)
    b.items?.forEach((i) => eat(i.tokens))
    b.rows?.forEach((r) => r.forEach((c) => eat(c.tokens)))
  }
  parsed.introBlocks.forEach(eatBlock)
  parsed.sections.forEach((s) => s.blocks.forEach(eatBlock))
  return urls
}

let totalLinks = 0
let resolved = 0
const dead = {}
let parseFailures = 0

for (const doc of inventory) {
  let parsed
  try {
    parsed = parseDocsMarkdown(modules[`/${doc.file}`])
  } catch {
    parseFailures++
    continue
  }
  const folder = doc.file.split('/').slice(-2, -1)[0]
  for (const url of collectLinks(parsed)) {
    totalLinks++
    if (resolveDocId(url, knownIds, folder)) resolved++
    else dead[url] = (dead[url] || 0) + 1
  }
}

const deadList = Object.entries(dead).sort((a, b) => b[1] - a[1])
const deadCount = deadList.reduce((n, [, c]) => n + c, 0)

console.log(`docs parsed:      ${inventory.length} (${parseFailures} parse failures)`)
console.log(`md links:         ${totalLinks}`)
console.log(`resolved:         ${resolved}`)
console.log(`unresolved:       ${deadCount} (${deadList.length} distinct targets)`)
if (deadList.length) {
  console.log('\nUnresolved targets (count × target):')
  for (const [url, c] of deadList) console.log(`  ${String(c).padStart(3)} × ${url}`)
}
