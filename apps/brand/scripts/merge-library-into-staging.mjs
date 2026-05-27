#!/usr/bin/env node
// Merge _tmp/icons/library/<cat>/<name>.svg files into src/_staging/icons/{solid,stroke}/<cat>/.
// - Detects variant (solid vs stroke) by inspecting the SVG markup.
// - Normalizes colors to currentColor.
// - Skips _unknown/, _dupes/.
// - Skips entries where the same <variant>/<cat>/<name>.svg already exists (claude-jsx wins).
// - Updates _origin.json for newly-added entries.

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname, basename, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, '_tmp/icons/library')
const DST = join(ROOT, 'src/_staging/icons')

const SKIP_DIRS = new Set(['_unknown', '_dupes'])

const CAT_REMAP = {
  // library cat name -> staging cat name (lowercase already)
  navigation: 'navigation',
  actions: 'actions',
  brand: 'brand',
  commerce: 'commerce',
  communication: 'communication',
  cursor: 'cursor',
  editing: 'editing',
  files: 'files',
  layout: 'layout',
  math: 'editing',     // math icons rolled into editing
  media: 'media',
  misc: 'misc',
  shapes: 'shapes',
  stats: 'stats',
  status: 'status',
  system: 'system',
  time: 'time',
  typography: 'typography',
  user: 'user',
}

function* walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith('_') || SKIP_DIRS.has(name)) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) yield* walk(full)
    else if (name.endsWith('.svg')) yield full
  }
}

// Inspect raw SVG markup → 'stroke' or 'solid'.
// Heuristic: if any element has stroke="<color>" (not none/transparent), it's a stroke icon.
// Otherwise treat as solid.
function detectVariant(markup) {
  const strokeMatch = /\bstroke="(?!none|transparent|"\s)([^"]+)"/i.exec(markup)
  return strokeMatch ? 'stroke' : 'solid'
}

// Replace any hex / rgb / named non-currentColor color in fill/stroke attrs with currentColor.
// Leave fill="none" and stroke="none" alone.
function normalizeColors(markup) {
  return markup
    .replace(/(fill|stroke)="(?!none|transparent|currentColor|inherit)([^"]+)"/gi, '$1="currentColor"')
    // Inline style colors: style="...fill: #fff;..."
    .replace(/(fill|stroke):\s*(?!none|transparent|currentColor|inherit)#?[A-Za-z0-9]+/gi, '$1: currentColor')
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true })
}

const stats = { seen: 0, written: 0, skippedConflict: 0, skippedNoCat: 0, skippedNoCategory: [] }
const newOrigins = {}

for (const file of walk(SRC)) {
  stats.seen++
  const cat = basename(dirname(file))
  const stagedCat = CAT_REMAP[cat]
  if (!stagedCat) {
    stats.skippedNoCat++
    if (stats.skippedNoCategory.length < 5) stats.skippedNoCategory.push(cat)
    continue
  }
  const name = basename(file)
  const raw = readFileSync(file, 'utf8')
  const variant = detectVariant(raw)
  const dstDir = join(DST, variant, stagedCat)
  const dstPath = join(dstDir, name)
  if (existsSync(dstPath)) {
    stats.skippedConflict++
    continue
  }
  ensureDir(dstDir)
  const cleaned = normalizeColors(raw)
  writeFileSync(dstPath, cleaned.endsWith('\n') ? cleaned : cleaned + '\n')
  stats.written++
  const rel = relative(DST, dstPath)
  newOrigins[rel] = 'library'
}

// Merge into existing _origin.json
const originPath = join(DST, '_origin.json')
const existing = existsSync(originPath) ? JSON.parse(readFileSync(originPath, 'utf8')) : {}
const merged = { ...existing, ...newOrigins }
writeFileSync(originPath, JSON.stringify(merged, null, 2) + '\n')

console.log('--- merge-library-into-staging ---')
console.log(`library files seen:     ${stats.seen}`)
console.log(`written to _staging:    ${stats.written}`)
console.log(`skipped (conflict):     ${stats.skippedConflict}`)
console.log(`skipped (unknown cat):  ${stats.skippedNoCat}`)
if (stats.skippedNoCategory.length) {
  console.log(`  example unknowns: ${[...new Set(stats.skippedNoCategory)].join(', ')}`)
}
console.log(`origin entries:         ${Object.keys(merged).length}`)
