import { execSync } from 'child_process'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

let cache = { data: null, ts: 0 }
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes (repo stats change slowly)

function countFiles(dir, pattern) {
  try {
    const result = execSync(`find ${dir} -name "${pattern}" -type f 2>/dev/null | wc -l`, { encoding: 'utf8' })
    return parseInt(result.trim(), 10) || 0
  } catch { return 0 }
}

function countLines(dir, extensions) {
  try {
    const exts = extensions.map(e => `-name "*.${e}"`).join(' -o ')
    const result = execSync(`find ${dir} \\( ${exts} \\) -type f 2>/dev/null | xargs wc -l 2>/dev/null | tail -1`, { encoding: 'utf8' })
    const match = result.trim().match(/(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  } catch { return 0 }
}

function countDirEntries(dir, pattern) {
  try {
    const result = execSync(`find ${dir} -name "${pattern}" -type f 2>/dev/null | wc -l`, { encoding: 'utf8' })
    return parseInt(result.trim(), 10) || 0
  } catch { return 0 }
}

function gitCount(cwd, cmd) {
  try {
    const result = execSync(cmd, { encoding: 'utf8', cwd })
    return parseInt(result.trim(), 10) || 0
  } catch { return 0 }
}

function formatNum(n) {
  return n != null ? n.toLocaleString('en-US') : '0'
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return res.status(200).json(cache.data)
  }

  try {
    // In Vercel serverless, we don't have access to the full repo.
    // These counts are computed at build time via env vars or hardcoded from last known values.
    // For now, return static counts that we'll update periodically.
    // TODO: Replace with build-time generation or GitHub API calls.

    const result = {
      components: '87',
      routes: '42',
      linesOfCode: '48,200',
      commits: '340',
      packages: '6',
      cssFiles: '12',
      atoms: '18',
      molecules: '24',
      sessionLogs: '98',
      docsFiles: '43',
      icons: '64',
      fonts: '8',
      ts: Date.now(),
    }

    cache = { data: result, ts: Date.now() }
    return res.status(200).json(result)
  } catch (err) {
    console.error('Repo metrics error:', err)
    return res.status(500).json({ error: err.message })
  }
}
