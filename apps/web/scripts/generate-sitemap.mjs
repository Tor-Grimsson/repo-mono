/**
 * Post-build sitemap generator — merges dynamic slugs into the static sitemap.
 * Runs after `vite build`; reads public/sitemap.xml (static pages), appends
 * /work/:slug + /stack/:slug (Sanity) and /prints/:slug (local data), writes
 * dist/sitemap.xml. On any fetch failure the static sitemap ships unchanged.
 */
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { prints } from '../src/data/prints.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const STATIC = path.join(__dirname, '..', 'public', 'sitemap.xml')
const OUT = path.join(__dirname, '..', 'dist', 'sitemap.xml')

const PROJECT_ID = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'to8h15ed'
const DATASET = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'projects'
const API_VERSION = process.env.SANITY_API_VERSION || process.env.VITE_SANITY_API_VERSION || '2025-01-01'

async function fetchSlugs(type) {
  const query = `*[_type == "${type}" && defined(slug.current)].slug.current`
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${type}: HTTP ${res.status}`)
  const data = await res.json()
  return Array.isArray(data?.result) ? data.result : []
}

const entry = (loc) => `  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`

const staticXml = await readFile(STATIC, 'utf-8')

let dynamic = []
try {
  const [projects, blogs] = await Promise.all([fetchSlugs('project'), fetchSlugs('blog')])
  dynamic = [
    ...projects.map((s) => entry(`https://kolkrabbi.io/work/${s}`)),
    ...blogs.map((s) => entry(`https://kolkrabbi.io/stack/${s}`)),
    ...prints.filter((p) => p.slug).map((p) => entry(`https://kolkrabbi.io/prints/${p.slug}`)),
  ]
  console.log(`sitemap: +${projects.length} work, +${blogs.length} stack, +${dynamic.length - projects.length - blogs.length} prints`)
} catch (err) {
  console.warn(`sitemap: dynamic slugs skipped (${err.message}) — shipping static only`)
}

const merged = dynamic.length
  ? staticXml.replace('</urlset>', `\n  <!-- Dynamic (generated at build) -->\n${dynamic.join('\n')}\n\n</urlset>`)
  : staticXml

await writeFile(OUT, merged)
console.log(`sitemap: written ${path.relative(process.cwd(), OUT)}`)
