#!/usr/bin/env node
// Scan src/ for `<Icon name="X" />` and `<EditorIcon name="X" />` references and emit
// _usage.json: { [name]: { count, files: [paths] } } at src/_staging/icons/_usage.json.
// Used by /icons triage console to bucket files as keep / drop candidates.

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC_DIR = join(ROOT, 'src')
const OUT = join(ROOT, 'src/_staging/icons/_usage.json')

const SKIP_DIRS = new Set(['node_modules', '.git', '_staging', '_tmp'])
const FILE_EXT = /\.(jsx?|tsx?|mjs|cjs)$/

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) yield* walk(full)
    else if (FILE_EXT.test(name)) yield full
  }
}

// 1. JSX usage:  <Icon|EditorIcon ... name="literal" .../>
//                or with single-quotes / curly-braced literals
const TAG_RE = /<(Icon|EditorIcon)\b([^>]*?)\/?>/g
const NAME_ATTR_RE = /\bname=(?:"([^"]+)"|'([^']+)'|\{\s*["']([^"']+)["']\s*\})/

// 2. Config-object usage:  icon: 'literal'  or  icon: "literal"
//    Catches sidebars.config.js entries, tools state, ViewToggle options, etc.
const CONFIG_RE = /\bicon:\s*(?:"([^"]+)"|'([^']+)')/g

// 3. Dynamic refs:  <Icon name={var} />  — record presence so user knows about unresolved refs
const DYNAMIC_RE = /<(Icon|EditorIcon)\b[^>]*?\bname=\{(?!\s*["'])/g

const usage = {}
const totals = { files: 0, hits: 0, dynamic: 0 }
const dynamicSites = []

function addHit(name, file) {
  if (!usage[name]) usage[name] = { count: 0, files: [] }
  usage[name].count++
  const rel = relative(ROOT, file)
  if (!usage[name].files.includes(rel)) usage[name].files.push(rel)
  totals.hits++
}

for (const file of walk(SRC_DIR)) {
  totals.files++
  const text = readFileSync(file, 'utf8')

  TAG_RE.lastIndex = 0
  let m
  while ((m = TAG_RE.exec(text))) {
    const nm = NAME_ATTR_RE.exec(m[2])
    if (!nm) continue
    const name = nm[1] ?? nm[2] ?? nm[3]
    if (name) addHit(name, file)
  }

  CONFIG_RE.lastIndex = 0
  while ((m = CONFIG_RE.exec(text))) {
    const name = m[1] ?? m[2]
    if (name) addHit(name, file)
  }

  DYNAMIC_RE.lastIndex = 0
  while (DYNAMIC_RE.exec(text)) {
    totals.dynamic++
    const rel = relative(ROOT, file)
    if (!dynamicSites.includes(rel)) dynamicSites.push(rel)
  }
}

const payload = {
  generated: new Date().toISOString(),
  totals,
  dynamicSites,
  names: usage,
}
writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n')
console.log(`scanned ${totals.files} source files`)
console.log(`literal hits: ${totals.hits} across ${Object.keys(usage).length} unique names`)
console.log(`dynamic refs: ${totals.dynamic} across ${dynamicSites.length} files (manual review)`)
console.log(`wrote ${relative(ROOT, OUT)}`)
