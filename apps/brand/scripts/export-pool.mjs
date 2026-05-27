#!/usr/bin/env node
// Read the pool manifest, write a clean export tree:
//   _export/stroke/<category>/<name>.svg
//   _export/solid/<category>/<name>.svg
//
// Selection rules per (name, variant):
//   - skip entries with manifest decision === 'delete'
//   - prefer origin: claude-jsx > library > live
//   - mixed variant is excluded entirely (false-stroke / Heroicons-duotone style)
//
// Also writes _export/_index.json with the picks for traceability.
//
// Optional: pass an audit JSON exported from the page via --decisions=path.json
// to apply additional 'delete' marks on top of the manifest baseline.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, copyFileSync, readdirSync } from 'fs'
import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const POOL_DIR = join(ROOT, 'src/_staging/icons/_pool')
const MANIFEST = join(ROOT, 'src/_staging/icons/_pool.json')
const OUT_BASE = join(ROOT, '_export')

const args = process.argv.slice(2)
const decisionsArg = args.find((a) => a.startsWith('--decisions='))
const extraDecisionsPath = decisionsArg ? decisionsArg.slice('--decisions='.length) : null

const ORIGIN_PRIORITY = { 'claude-jsx': 0, library: 1, live: 2, unknown: 3 }
function pickBest(list) {
  if (!list.length) return null
  return list.slice().sort(
    (a, b) => (ORIGIN_PRIORITY[a.origin] ?? 9) - (ORIGIN_PRIORITY[b.origin] ?? 9),
  )[0]
}

function ensureDir(p) { mkdirSync(p, { recursive: true }) }

const m = JSON.parse(readFileSync(MANIFEST, 'utf8'))

// Apply optional extra decisions overlay
const extraDecisions = extraDecisionsPath && existsSync(extraDecisionsPath)
  ? JSON.parse(readFileSync(extraDecisionsPath, 'utf8'))?.decisions ?? {}
  : {}

const isDeleted = (e) => {
  const extra = extraDecisions[e.id]
  const finalDecision = (extra && extra.decision) ?? e.decision
  return finalDecision === 'delete'
}

// Group entries by (variant, category, name) — pick best per group
const groups = {}
for (const e of m.entries) {
  if (e.variant !== 'stroke' && e.variant !== 'solid') continue  // skip mixed/unknown
  if (isDeleted(e)) continue
  const key = `${e.variant}|${e.category}|${e.name}`
  if (!groups[key]) groups[key] = []
  groups[key].push(e)
}

// Wipe + recreate export dir
if (existsSync(OUT_BASE)) rmSync(OUT_BASE, { recursive: true, force: true })
ensureDir(OUT_BASE)

const index = []
const stats = { stroke: 0, solid: 0, byCategory: {} }

for (const list of Object.values(groups)) {
  const best = pickBest(list)
  const { variant, category, name, origin, originalPath, id, poolPath } = best
  const dst = join(OUT_BASE, variant, category, `${name}.svg`)
  ensureDir(dirname(dst))
  copyFileSync(join(POOL_DIR, poolPath.split('/').pop()), dst)
  index.push({ variant, category, name, origin, originalPath, sourceId: id })
  stats[variant]++
  stats.byCategory[category] = (stats.byCategory[category] ?? 0) + 1
}

writeFileSync(join(OUT_BASE, '_index.json'), JSON.stringify({
  generated: new Date().toISOString(),
  totals: { stroke: stats.stroke, solid: stats.solid },
  byCategory: stats.byCategory,
  entries: index.sort((a, b) => a.variant.localeCompare(b.variant) || a.category.localeCompare(b.category) || a.name.localeCompare(b.name)),
}, null, 2) + '\n')

const cats = Object.keys(stats.byCategory).sort()
console.log('--- export-pool ---')
console.log(`output:   ${relative(ROOT, OUT_BASE)}/`)
console.log(`stroke:   ${stats.stroke}`)
console.log(`solid:    ${stats.solid}`)
console.log(`total:    ${stats.stroke + stats.solid}`)
console.log(`categories: ${cats.length}`)
if (extraDecisionsPath) console.log(`overlay:  ${extraDecisionsPath}`)
console.log()
console.log('PER CATEGORY:')
const sorted = Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])
for (const [k, v] of sorted) console.log(String(v).padStart(4), k)
