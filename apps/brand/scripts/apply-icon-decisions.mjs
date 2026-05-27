#!/usr/bin/env node
// Read an exported audit JSON (from /icons "Export JSON" button) and execute
// the decisions:
//   - keep      → no-op
//   - drop?     → delete file from src/components/loaders/icons/svg/<rel>
//   - promote?  → copy from src/_staging/icons/{solid,stroke}/<rel> into the live registry
//   - redraw    → log to a redraw.txt punch list (no file change)
//
// Usage:
//   node scripts/apply-icon-decisions.mjs path/to/icon-audit-XXX.json [--dry-run]

import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync, unlinkSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LIVE_BASE = join(ROOT, 'src/components/loaders/icons/svg')
const STAGING_BASE = join(ROOT, 'src/_staging/icons')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const inputPath = args.find((a) => !a.startsWith('--'))
if (!inputPath) {
  console.error('usage: apply-icon-decisions.mjs <audit.json> [--dry-run]')
  process.exit(1)
}

const audit = JSON.parse(readFileSync(resolve(inputPath), 'utf8'))
const decisions = audit.decisions ?? {}

const stats = { keep: 0, dropped: 0, promoted: 0, redraw: [], skipped: [] }

function ensureDir(p) {
  mkdirSync(p, { recursive: true })
}

function liveTargetForStaging(stagingRel) {
  // stagingRel = "solid/system/foo.svg" or "stroke/navigation/bar.svg"
  // Live registry uses numeric-prefixed dirs (`01-navigation`), but we don't know
  // the exact prefix mapping. Default: drop into a new `_promoted/<variant>/<topic>/`
  // bucket so the user can review before final placement.
  return join(LIVE_BASE, '_promoted', stagingRel)
}

for (const [id, decision] of Object.entries(decisions)) {
  const [src, ...relParts] = id.split('::')
  const rel = relParts.join('::')

  if (decision === 'keep') {
    stats.keep++
    continue
  }

  if (decision === 'redraw') {
    stats.redraw.push(`${src}::${rel}`)
    continue
  }

  if (decision === 'drop?') {
    if (src !== 'live') {
      stats.skipped.push({ id, reason: 'drop only valid on live source' })
      continue
    }
    const fullPath = join(LIVE_BASE, rel)
    if (!existsSync(fullPath)) {
      stats.skipped.push({ id, reason: 'live file missing' })
      continue
    }
    if (!dryRun) unlinkSync(fullPath)
    stats.dropped++
    continue
  }

  if (decision === 'promote?') {
    if (src !== 'solid' && src !== 'stroke') {
      stats.skipped.push({ id, reason: 'promote only valid on staging source' })
      continue
    }
    const stagingRel = `${src}/${rel}`
    const stagingFull = join(STAGING_BASE, stagingRel)
    const liveFull = liveTargetForStaging(stagingRel)
    if (!existsSync(stagingFull)) {
      stats.skipped.push({ id, reason: 'staging source missing' })
      continue
    }
    if (!dryRun) {
      ensureDir(dirname(liveFull))
      copyFileSync(stagingFull, liveFull)
    }
    stats.promoted++
    continue
  }

  stats.skipped.push({ id, reason: `unknown decision: ${decision}` })
}

if (stats.redraw.length && !dryRun) {
  const punchPath = join(ROOT, 'docs/editor/reference/icons-redraw.md')
  ensureDir(dirname(punchPath))
  const body =
    `# Icon redraw queue\n\n` +
    `Generated ${new Date().toISOString()} from ${inputPath}\n\n` +
    stats.redraw.map((id) => `- [ ] ${id}`).join('\n') + '\n'
  writeFileSync(punchPath, body)
}

console.log('--- apply-icon-decisions ---')
console.log(`mode:      ${dryRun ? 'DRY-RUN (no writes)' : 'APPLIED'}`)
console.log(`keep:      ${stats.keep}`)
console.log(`dropped:   ${stats.dropped}`)
console.log(`promoted:  ${stats.promoted}  → src/components/loaders/icons/svg/_promoted/`)
console.log(`redraw:    ${stats.redraw.length}  → docs/editor/reference/icons-redraw.md`)
console.log(`skipped:   ${stats.skipped.length}`)
if (stats.skipped.length) {
  for (const s of stats.skipped.slice(0, 10)) console.log(`  - ${s.id}: ${s.reason}`)
}
