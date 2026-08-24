import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPrintBySlug } from '../src/data/prints.js'
import { STATIC_META } from '../src/data/seoMetadata.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_INDEX = path.join(__dirname, '..', 'dist', 'app.html')

const DEFAULT_META = {
  title: 'Kolkrabbi — Design System, Type Foundry & Studio',
  description: 'Explore Kolkrabbi: A comprehensive design system featuring custom typefaces, interactive specimens, design patterns, and creative explorations.',
  image: 'https://kolkrabbi.io/img/open-graph/open-graph-01.png'
}

const escapeHtml = (value) => {
  if (value == null) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const getEnv = (key, fallback = '') => process.env[key] || fallback

// Top-level sections the router owns. Deliberately segment-level, not a mirror of
// App.jsx's route table — that table is built dynamically (embed groups, apparat
// tools) and duplicating it here would 404 live pages every time a route is added.
// ponytail: catches the real garbage (/wp-admin, /index.php, typos); an unknown
// leaf under a known section still renders the SPA's own NotFound at 200.
const KNOWN_SECTIONS = new Set([
  'studio', 'metrics', 'work', 'foundry', 'stack', 'prints', 'workshop', 'docs',
])

export const isKnownSection = (url) => {
  if (url === '/') return true
  return KNOWN_SECTIONS.has(url.split('/')[1])
}

// '/studio/' → '/studio', '/' → '/'
export const normalizePath = (p) =>
  p.length > 1 ? p.replace(/\/+$/, '') || '/' : p

async function fetchSanityMeta(type, slug) {
  const projectId =
    getEnv('SANITY_PROJECT_ID') || getEnv('VITE_SANITY_PROJECT_ID') || 'to8h15ed'
  const dataset =
    getEnv('SANITY_DATASET') || getEnv('VITE_SANITY_DATASET') || 'projects'
  const apiVersion =
    getEnv('SANITY_API_VERSION') || getEnv('VITE_SANITY_API_VERSION') || '2025-01-01'

  let query
  if (type === 'blog') {
    query =
      '*[_type == "blog" && slug.current == $slug][0]{title, excerpt, "seoTitle": seo.seoTitle, "seoDescription": seo.seoDescription, "ogImage": seo.ogImage.asset->url + "?w=1200&fm=jpg&q=80", "coverImage": coverImage.asset->url + "?w=1200&fm=jpg&q=80", "thumbnail": thumbnail.asset->url + "?w=1200&fm=jpg&q=80"}'
  } else {
    query =
      '*[_type == "project" && slug.current == $slug][0]{title, description, "metaTitle": seo.metaTitle, "metaDescription": seo.metaDescription, "thumbnail": thumbnail.asset->url + "?w=1200&fm=jpg&q=80"}'
  }

  const params = new URLSearchParams()
  params.set('query', query)
  // GROQ params are JSON-encoded values — hand-wrapping in quotes breaks on a
  // slug containing " or \, which Sanity then rejects with a 400.
  params.set('$slug', JSON.stringify(slug))

  const apiUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${params.toString()}`

  // `failed` separates "Sanity is unreachable" from "no such document" — only the
  // latter is a real 404. Without it a CMS blip would 404 live pages.
  try {
    const response = await fetch(apiUrl)
    if (!response.ok) return { data: null, failed: true }
    const data = await response.json()
    return { data: data?.result || null, failed: false }
  } catch {
    return { data: null, failed: true }
  }
}

export default async function handler(req, res) {
  // Trailing slashes are the same resource — normalize once so both the STATIC_META
  // lookup and the slug patterns below see '/studio', not '/studio/'.
  const url = normalizePath(req.url.split('?')[0])
  let meta = { ...DEFAULT_META }
  let notFound = false
  const canonicalUrl = `https://kolkrabbi.io${url}`

  // Tier 1: Sanity CMS — /stack/:slug
  const stackMatch = url.match(/^\/stack\/([^/]+)$/)
  if (stackMatch) {
    const slug = stackMatch[1]
    const { data, failed } = await fetchSanityMeta('blog', slug)
    if (data) {
      meta.title = data.seoTitle || data.title || DEFAULT_META.title
      meta.description = data.seoDescription || data.excerpt || DEFAULT_META.description
      meta.image = data.ogImage || data.thumbnail || data.coverImage || DEFAULT_META.image
    } else if (!failed) {
      notFound = true
    }
  }

  // Tier 1: Sanity CMS — /work/:slug
  const workMatch = url.match(/^\/work\/([^/]+)$/)
  if (workMatch) {
    const slug = workMatch[1]
    const { data, failed } = await fetchSanityMeta('project', slug)
    if (data) {
      meta.title = data.metaTitle || data.title || DEFAULT_META.title
      meta.description = data.metaDescription || data.description || DEFAULT_META.description
      meta.image = data.thumbnail || DEFAULT_META.image
    } else if (!failed) {
      notFound = true
    }
  }

  // Tier 2: Local data — /prints/:slug
  const printMatch = url.match(/^\/prints\/([^/]+)$/)
  if (printMatch) {
    const slug = printMatch[1]
    const print = getPrintBySlug(slug)
    if (print) {
      meta.title = `${print.name} — Art Print | Kolkrabbi`
      meta.description = print.description || DEFAULT_META.description
      meta.image = print.image || DEFAULT_META.image
    } else {
      notFound = true
    }
  }

  // Tier 3: Static meta lookup for all other routes
  if (!stackMatch && !workMatch && !printMatch) {
    const staticEntry = STATIC_META[url]
    if (staticEntry) {
      meta = { ...DEFAULT_META, ...staticEntry }
    } else if (url.startsWith('/workshop')) {
      meta = { ...DEFAULT_META, ...STATIC_META['/workshop'] }
    } else if (!isKnownSection(url)) {
      notFound = true
    }
  }

  let html
  try {
    html = await readFile(DIST_INDEX, 'utf-8')
  } catch {
    res.status(500).send('Internal Server Error: could not read index.html')
    return
  }

  html = html
    .replace(/__TITLE__/g, escapeHtml(meta.title))
    .replace(/__DESCRIPTION__/g, escapeHtml(meta.description))
    .replace(/__IMAGE__/g, escapeHtml(meta.image))
    .replace(/__URL__/g, escapeHtml(canonicalUrl))

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  // Still ships the SPA shell so the router renders NotFound — only the status
  // differs, which is what crawlers read.
  res.status(notFound ? 404 : 200).send(html)
}
