// Repo/project metrics — static snapshot updated periodically.
// Vercel serverless doesn't have repo access, so these are hardcoded from `find` counts
// and the GitHub API. Re-measure with the commands in the comments.
// Last measured: 2026-10-06

let cache = { data: null, ts: 0 }
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return res.status(200).json(cache.data)
  }

  const result = {
    components: '39',        // jsx in apps/web/src/components
    routes: '21',            // jsx in apps/web/src/routes
    linesOfCode: '20,533',   // jsx+js+css+ts across apps+packages (dist and _tmp excluded)
    commits: '328',          // GitHub: /repos/Tor-Grimsson/repo-mono/commits, last page at per_page=1
    packages: '6',           // workspace packages (apps + packages dirs)
    cssFiles: '5',           // css in apps/web/src
    atoms: '25',             // jsx in node_modules/@kolkrabbi/kol-component/src/atoms
    molecules: '67',         // jsx in node_modules/@kolkrabbi/kol-component/src/molecules
    sessionLogs: '296',      // md in .kol/llm-context/session-log
    docsFiles: '83',         // md in docs/documentation
    icons: '342',            // svg in node_modules/@kolkrabbi/kol-icons/src
    fonts: '112',            // woff2/woff/otf/ttf in public/fonts
    measured: '2026-10-06',
    ts: Date.now(),
  }

  cache = { data: result, ts: Date.now() }
  return res.status(200).json(result)
}
