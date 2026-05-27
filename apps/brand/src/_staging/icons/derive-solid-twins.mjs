#!/usr/bin/env node
/**
 * Derive SOLID twins from stroke-only icons that are pure closed silhouettes.
 *
 * SAFE bucket only: stroke icons whose paths are ALL closed (contain Z) and
 * number ≤ N. A solid = fill those paths with currentColor, combined into one
 * <path fill-rule="evenodd"> so overlapping/concentric subpaths cut out cleanly.
 *
 * Line-native (open paths / wireframe) and mixed icons are SKIPPED — they have
 * no clean single-color solid form and must be hand-drawn.
 *
 *   node apps/brand/src/_staging/icons/derive-solid-twins.mjs          # dry run
 *   node apps/brand/src/_staging/icons/derive-solid-twins.mjs --write  # write files
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))
const WRITE = process.argv.includes('--write')
const MAX_PATHS = 12

const walk = (dir) => {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.name.endsWith('.svg')) out.push(p)
  }
  return out
}

const strokeFiles = walk(join(ROOT, 'stroke'))
const solidNames = new Set(walk(join(ROOT, 'solid')).map(p => basename(p, '.svg')))

let derived = 0, skipped = 0
const made = []
for (const f of strokeFiles) {
  const name = basename(f, '.svg')
  if (solidNames.has(name)) continue // already mirrored
  const t = readFileSync(f, 'utf8')
  const ds = [...t.matchAll(/\bd="([^"]+)"/g)].map(m => m[1])
  const allClosed = ds.length > 0 && ds.every(d => /z/i.test(d))
  if (!allClosed || ds.length > MAX_PATHS) { skipped++; continue }

  const d = ds.join(' ')
  const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="${d}" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
</svg>
`
  const cat = basename(dirname(f))
  const outDir = join(ROOT, 'solid', cat)
  const out = join(outDir, `${name}.svg`)
  made.push(`solid/${cat}/${name}.svg`)
  if (WRITE) { mkdirSync(outDir, { recursive: true }); writeFileSync(out, svg) }
  derived++
}

console.log(`${WRITE ? 'WROTE' : 'DRY-RUN'}: ${derived} solid twins derived, ${skipped} stroke-only skipped (not safe-fillable)`)
console.log('made:', made.slice(0, 20).join(', '), made.length > 20 ? `…+${made.length - 20}` : '')
