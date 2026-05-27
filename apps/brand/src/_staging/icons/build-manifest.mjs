#!/usr/bin/env node
/**
 * Icon manifest generator — kol stroke/solid mirrored icon system (staging).
 *
 * Scans stroke/ + solid/ and emits:
 *   _manifest.json  — machine: per-icon name/category/variants/size/color
 *   _manifest.md    — human summary: totals, mirror gaps, size outliers, color violations
 *
 * Repeatable: re-run after adding/drawing icons. Doubles as the twin-gap worklist.
 *   node apps/brand/src/_staging/icons/build-manifest.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname, basename, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))
const VARIANTS = ['stroke', 'solid']

const walk = (dir) => {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.name.endsWith('.svg')) out.push(p)
  }
  return out
}

const parseSvg = (file) => {
  const t = readFileSync(file, 'utf8')
  const vb = t.match(/viewBox="([^"]+)"/)?.[1] ?? null
  const w = t.match(/\bwidth="([^"]+)"/)?.[1] ?? null
  const h = t.match(/\bheight="([^"]+)"/)?.[1] ?? null
  // mask/defs legitimately use black/white internally (they create transparency, not color) — ignore them
  const scan = t.replace(/<mask[\s\S]*?<\/mask>/g, '').replace(/<defs[\s\S]*?<\/defs>/g, '')
  const badColors = [...scan.matchAll(/(?:fill|stroke)="(#[0-9a-fA-F]{3,8}|black|white|rgb[^"]*)"/g)].map(m => m[1])
  return { viewBox: vb, size: w && h ? `${w}x${h}` : null, badColors: [...new Set(badColors)] }
}

// name -> { category, stroke?: meta, solid?: meta }
const icons = {}
for (const variant of VARIANTS) {
  const base = join(ROOT, variant)
  let files = []
  try { files = walk(base) } catch { continue }
  for (const f of files) {
    const name = basename(f, '.svg')
    const category = relative(base, dirname(f)) || '_root'
    const meta = parseSvg(f)
    icons[name] ??= { name, category }
    icons[name].category = category
    icons[name][variant] = { path: relative(ROOT, f), ...meta }
  }
}

const list = Object.values(icons).sort((a, b) => (a.category + a.name).localeCompare(b.category + b.name))
for (const ic of list) {
  ic.variants = VARIANTS.filter(v => ic[v])
  ic.mirrored = ic.variants.length === VARIANTS.length
}

// ---- summaries ----
const strokeOnly = list.filter(i => i.stroke && !i.solid).map(i => `${i.category}/${i.name}`)
const solidOnly = list.filter(i => i.solid && !i.stroke).map(i => `${i.category}/${i.name}`)
const sizeOutliers = list.flatMap(i => VARIANTS.flatMap(v => i[v] && i[v].size !== '24x24' ? [`${i[v].path} (${i[v].size})`] : []))
const colorViolations = list.flatMap(i => VARIANTS.flatMap(v => i[v]?.badColors.length ? [`${i[v].path} → ${i[v].badColors.join(',')}`] : []))
const byCategory = {}
for (const i of list) {
  byCategory[i.category] ??= { stroke: 0, solid: 0, mirrored: 0 }
  if (i.stroke) byCategory[i.category].stroke++
  if (i.solid) byCategory[i.category].solid++
  if (i.mirrored) byCategory[i.category].mirrored++
}

const summary = {
  generated: new Date().toISOString(),
  grid: '24x24 viewBox 0 0 24 24, fill/stroke currentColor',
  totals: {
    uniqueNames: list.length,
    stroke: list.filter(i => i.stroke).length,
    solid: list.filter(i => i.solid).length,
    mirrored: list.filter(i => i.mirrored).length,
    strokeOnly: strokeOnly.length,
    solidOnly: solidOnly.length,
    twinGaps: strokeOnly.length + solidOnly.length,
    sizeOutliers: sizeOutliers.length,
    colorViolations: colorViolations.length,
  },
  byCategory,
}

writeFileSync(join(ROOT, '_manifest.json'),
  JSON.stringify({ summary, gaps: { strokeOnly, solidOnly }, sizeOutliers, colorViolations, icons: list }, null, 2))

// ---- human-readable ----
const cat = Object.entries(byCategory).sort()
  .map(([c, v]) => `| ${c} | ${v.stroke} | ${v.solid} | ${v.mirrored} | ${v.stroke + v.solid - 2 * v.mirrored} |`).join('\n')
const md = `# Icon Manifest — kol stroke/solid (staging)

Generated: ${summary.generated} · Grid: ${summary.grid}
Regenerate: \`node apps/brand/src/_staging/icons/build-manifest.mjs\`

## Totals
- Unique names: **${summary.totals.uniqueNames}**
- stroke: ${summary.totals.stroke} · solid: ${summary.totals.solid} · **mirrored (both): ${summary.totals.mirrored}**
- Twin gaps: **${summary.totals.twinGaps}** (${summary.totals.strokeOnly} need solid, ${summary.totals.solidOnly} need stroke)
- Size outliers (≠24×24): **${summary.totals.sizeOutliers}**
- currentColor violations: **${summary.totals.colorViolations}**

## Per category
| category | stroke | solid | mirrored | gap |
|---|---|---|---|---|
${cat}

## Size outliers
${sizeOutliers.length ? sizeOutliers.map(s => `- ${s}`).join('\n') : '_none_'}

## currentColor violations (full list in _manifest.json)
${colorViolations.length ? colorViolations.slice(0, 30).map(s => `- ${s}`).join('\n') + (colorViolations.length > 30 ? `\n- …+${colorViolations.length - 30} more` : '') : '_none_'}
`
writeFileSync(join(ROOT, '_manifest.md'), md)
console.log(JSON.stringify(summary, null, 2))
