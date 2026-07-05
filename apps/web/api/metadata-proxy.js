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
  image: 'https://kolkrabbi.io/img/open-graph/open-graph-03.png'
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
  params.set('$slug', `"${slug}"`)

  const apiUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${params.toString()}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data?.result || null
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  const url = req.url.split('?')[0]
  let meta = { ...DEFAULT_META }
  const canonicalUrl = `https://kolkrabbi.io${url}`

  // Tier 1: Sanity CMS — /stack/:slug
  const stackMatch = url.match(/^\/stack\/([^/]+)$/)
  if (stackMatch) {
    const slug = stackMatch[1]
    const data = await fetchSanityMeta('blog', slug)
    if (data) {
      meta.title = data.seoTitle || data.title || DEFAULT_META.title
      meta.description = data.seoDescription || data.excerpt || DEFAULT_META.description
      meta.image = data.ogImage || data.thumbnail || data.coverImage || DEFAULT_META.image
    }
  }

  // Tier 1: Sanity CMS — /work/:slug
  const workMatch = url.match(/^\/work\/([^/]+)$/)
  if (workMatch) {
    const slug = workMatch[1]
    const data = await fetchSanityMeta('project', slug)
    if (data) {
      meta.title = data.metaTitle || data.title || DEFAULT_META.title
      meta.description = data.metaDescription || data.description || DEFAULT_META.description
      meta.image = data.thumbnail || DEFAULT_META.image
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
    }
  }

  // Tier 3: Static meta lookup for all other routes
  if (!stackMatch && !workMatch && !printMatch) {
    const staticEntry = STATIC_META[url]
    if (staticEntry) {
      meta = { ...DEFAULT_META, ...staticEntry }
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
  res.status(200).send(html)
}
