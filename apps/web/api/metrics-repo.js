// Repo/project metrics — static snapshot updated periodically.
// Vercel serverless doesn't have repo access, so these are hardcoded from `git` + `find` counts.
// Last measured: 2026-03-05

let cache = { data: null, ts: 0 }
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return res.status(200).json(cache.data)
  }

  const result = {
    components: '101',       // jsx in packages/ui/src
    routes: '192',           // jsx in apps/web/src/routes
    linesOfCode: '79,796',   // jsx+js+css across apps+packages
    commits: '203',          // git rev-list --count HEAD
    packages: '7',           // workspace packages (apps + packages dirs)
    cssFiles: '6',           // css in packages/ui/css
    atoms: '42',             // jsx in packages/ui/src/atoms
    molecules: '27',         // jsx in packages/ui/src/molecules
    sessionLogs: '170',      // md in docs/llm-context-protocol/session-logs
    docsFiles: '79',         // md in docs/documentation
    icons: '3',              // svg in apps/web/public/svg
    fonts: '19',             // woff2/woff/otf/ttf in apps/web/public/fonts
    measured: '2026-03-05',
    ts: Date.now(),
  }

  cache = { data: result, ts: Date.now() }
  return res.status(200).json(result)
}
