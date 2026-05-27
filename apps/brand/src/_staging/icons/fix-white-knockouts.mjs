#!/usr/bin/env node
/**
 * Convert fill="white" knockouts in solid icons → true transparent cutouts,
 * so the icon is single-color (currentColor) and themes correctly.
 *
 * Method: convert every shape (rect/circle/ellipse/path) to path data, merge
 * into ONE <path fill="currentColor" fill-rule="evenodd">. White detail subpaths,
 * being enclosed by the base, become holes under evenodd.
 *
 * SCOPE: only files where white appears EXCLUSIVELY as fill. Files with
 * stroke="white" are SKIPPED — a stroke knockout is a line, not an enclosed
 * region; evenodd can't cut it. Those need outlining/redraw (hand work).
 *
 *   node apps/brand/src/_staging/icons/fix-white-knockouts.mjs          # dry run
 *   node apps/brand/src/_staging/icons/fix-white-knockouts.mjs --write
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'solid')
const WRITE = process.argv.includes('--write')

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.svg') ? [join(d, e.name)] : [])

const num = (s) => parseFloat(s)
const attr = (a, n) => { const m = a.match(new RegExp(`\\b${n}="([^"]+)"`)); return m ? m[1] : null }

const rectPath = (x, y, w, h, rx, ry) => {
  rx = rx ?? ry ?? 0; ry = ry ?? rx ?? 0
  rx = Math.min(rx, w / 2); ry = Math.min(ry, h / 2)
  if (!rx && !ry) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`
  return `M${x + rx} ${y}H${x + w - rx}A${rx} ${ry} 0 0 1 ${x + w} ${y + ry}V${y + h - ry}A${rx} ${ry} 0 0 1 ${x + w - rx} ${y + h}H${x + rx}A${rx} ${ry} 0 0 1 ${x} ${y + h - ry}V${y + ry}A${rx} ${ry} 0 0 1 ${x + rx} ${y}Z`
}
const circlePath = (cx, cy, r) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`
const ellipsePath = (cx, cy, rx, ry) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`

const toPath = (tag, a) => {
  if (tag === 'path') return attr(a, 'd')
  if (tag === 'rect') return rectPath(num(attr(a, 'x') || 0), num(attr(a, 'y') || 0), num(attr(a, 'width')), num(attr(a, 'height')), attr(a, 'rx') != null ? num(attr(a, 'rx')) : null, attr(a, 'ry') != null ? num(attr(a, 'ry')) : null)
  if (tag === 'circle') return circlePath(num(attr(a, 'cx')), num(attr(a, 'cy')), num(attr(a, 'r')))
  if (tag === 'ellipse') return ellipsePath(num(attr(a, 'cx')), num(attr(a, 'cy')), num(attr(a, 'rx')), num(attr(a, 'ry')))
  return null
}

let fixed = 0, skipped = 0
const done = []
for (const f of walk(ROOT)) {
  const t = readFileSync(f, 'utf8')
  if (!/="white"/.test(t)) continue
  if (/stroke="white"/.test(t)) { skipped++; continue } // stroke knockout — hand work
  const shapes = [...t.matchAll(/<(rect|circle|ellipse|path)\b([^>]*?)\/?>/g)]
  const ds = shapes.map(m => toPath(m[1], m[2])).filter(Boolean)
  if (!ds.length || ds.length !== shapes.length) { skipped++; continue } // unparseable shape → skip
  const d = ds.join(' ')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="${d}" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/></svg>\n`
  done.push(basename(dirname(f)) + '/' + basename(f))
  if (WRITE) writeFileSync(f, svg)
  fixed++
}
console.log(`${WRITE ? 'WROTE' : 'DRY-RUN'}: ${fixed} fill-white knockouts → evenodd currentColor; ${skipped} skipped (stroke-white / unparseable → hand work)`)
console.log('fixed:', done.slice(0, 25).join(', '), done.length > 25 ? `…+${done.length - 25}` : '')
