#!/usr/bin/env node
// Build a single working pool from every icon source. Output:
//   src/_staging/icons/_pool/<n>.svg            — flat copy of every SVG, sequentially numbered
//   src/_staging/icons/_pool.json               — manifest with metadata per pool entry
//
// Manifest entry shape:
//   {
//     id:           "1",
//     poolPath:     "_pool/1.svg",
//     origin:       "live" | "claude-jsx" | "library" | "unknown",
//     source:       "live" | "staging-stroke" | "staging-solid",
//     originalPath: "01-navigation/arrow-up.svg",  (relative to source root)
//     name:         "arrow-up",
//     category:     "navigation",
//     variant:      "stroke" | "solid" | "mixed" | "unknown",
//     hash:         <content fingerprint>,
//     decision:     "undecided"
//   }

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, copyFileSync } from 'fs'
import { join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LIVE_BASE = join(ROOT, 'src/components/loaders/icons/svg')
const STK_BASE  = join(ROOT, 'src/_staging/icons/stroke')
const SOL_BASE  = join(ROOT, 'src/_staging/icons/solid')
const POOL_DIR  = join(ROOT, 'src/_staging/icons/_pool')
const MANIFEST  = join(ROOT, 'src/_staging/icons/_pool.json')
const ORIGIN_JSON = join(ROOT, 'src/_staging/icons/_origin.json')

const cleanTopic = (raw) => raw.replace(/^\d+-/, '')

function* walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith('_')) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) yield* walk(full)
    else if (name.endsWith('.svg')) yield full
  }
}

function detectVariant(svg) {
  if (!svg) return 'unknown'
  const topMatch = /<svg\b([^>]*)>/i.exec(svg) ?? ['', '']
  const topAttrs = topMatch[1]
  const topFill   = (/\bfill="([^"]+)"/i.exec(topAttrs)   ?? [, ''])[1]
  const topStroke = (/\bstroke="([^"]+)"/i.exec(topAttrs) ?? [, ''])[1]

  const isPaint = (v) => v && v !== 'none' && v !== 'transparent'
  let anyFill = isPaint(topFill)
  let anyStroke = isPaint(topStroke)

  const ELEM_RE = /<(path|circle|rect|ellipse|line|polyline|polygon)\b([^>]*?)\/?>/gi
  let m
  while ((m = ELEM_RE.exec(svg))) {
    const a = m[2]
    const fillM   = /\bfill="([^"]+)"/i.exec(a)
    const strokeM = /\bstroke="([^"]+)"/i.exec(a)
    const f = fillM   ? fillM[1]   : topFill
    const s = strokeM ? strokeM[1] : topStroke
    if (isPaint(f)) anyFill = true
    if (isPaint(s)) anyStroke = true
  }

  if (anyFill && anyStroke) return 'mixed'
  if (anyStroke) return 'stroke'
  if (anyFill)   return 'solid'
  return 'unknown'
}

function contentHash(svg) {
  if (!svg) return ''
  const buf = []
  const RE = /\b(d|cx|cy|r|x|y|x1|y1|x2|y2|width|height|points)="([^"]+)"/gi
  let m
  while ((m = RE.exec(svg))) buf.push(m[1] + ':' + m[2].replace(/\s+/g, ' ').trim())
  return buf.join('|')
}

const ORIGIN = existsSync(ORIGIN_JSON) ? JSON.parse(readFileSync(ORIGIN_JSON, 'utf8')) : {}

// Wipe + recreate pool dir so re-runs don't accumulate stale copies.
if (existsSync(POOL_DIR)) rmSync(POOL_DIR, { recursive: true, force: true })
mkdirSync(POOL_DIR, { recursive: true })

const sources = [
  { base: LIVE_BASE, source: 'live',           defaultOrigin: 'live' },
  { base: STK_BASE,  source: 'staging-stroke', defaultOrigin: null,   originPrefix: 'stroke/' },
  { base: SOL_BASE,  source: 'staging-solid',  defaultOrigin: null,   originPrefix: 'solid/'  },
]

const manifest = []
let id = 1

for (const { base, source, defaultOrigin, originPrefix } of sources) {
  if (!existsSync(base)) continue
  for (const file of walk(base)) {
    const rel = relative(base, file)
    const segs = rel.split('/')
    const name = segs.pop().replace(/\.svg$/, '')
    const topicRaw = segs[0] ?? 'root'
    const category = cleanTopic(topicRaw)
    const svg = readFileSync(file, 'utf8')
    const variant = detectVariant(svg)
    const hash = contentHash(svg)
    const origin = defaultOrigin
      ?? ORIGIN[`${originPrefix ?? ''}${rel}`]
      ?? 'unknown'

    const poolFile = `${id}.svg`
    copyFileSync(file, join(POOL_DIR, poolFile))
    manifest.push({
      id: String(id),
      poolPath: `_pool/${poolFile}`,
      origin,
      source,
      originalPath: rel,
      name,
      category,
      variant,
      hash,
      decision: 'undecided',
    })
    id++
  }
}

writeFileSync(MANIFEST, JSON.stringify({
  generated: new Date().toISOString(),
  total: manifest.length,
  entries: manifest,
}, null, 2) + '\n')

console.log('--- build-pool ---')
console.log(`pool entries: ${manifest.length}`)
console.log(`pool dir:     ${relative(ROOT, POOL_DIR)}`)
console.log(`manifest:     ${relative(ROOT, MANIFEST)}`)

const byVariant = {}
const bySource = {}
const byOrigin = {}
for (const e of manifest) {
  byVariant[e.variant] = (byVariant[e.variant] ?? 0) + 1
  bySource[e.source]   = (bySource[e.source]   ?? 0) + 1
  byOrigin[e.origin]   = (byOrigin[e.origin]   ?? 0) + 1
}
console.log('variants:', byVariant)
console.log('sources: ', bySource)
console.log('origins: ', byOrigin)
