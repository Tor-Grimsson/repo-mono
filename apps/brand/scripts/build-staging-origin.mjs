#!/usr/bin/env node
// Walk src/_staging/icons/ and emit _origin.json mapping each relative
// path -> origin tag. Currently every file here came from Claude design (`claude-jsx`).
// Future passes (e.g. library tree merge) should append/override entries here.

import { readdirSync, statSync, writeFileSync } from 'fs'
import { join, relative } from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BASE = join(ROOT, 'src/_staging/icons')

function* walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith('_')) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) yield* walk(full)
    else if (name.endsWith('.svg')) yield full
  }
}

const out = {}
let total = 0
for (const file of walk(BASE)) {
  const rel = relative(BASE, file)
  out[rel] = 'claude-jsx'
  total++
}

writeFileSync(join(BASE, '_origin.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`wrote _origin.json: ${total} entries`)
