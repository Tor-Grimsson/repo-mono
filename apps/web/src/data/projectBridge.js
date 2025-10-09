
import { getClient } from '../lib/sanityClient'

const PROJECT_PREVIEW_FIELDS = `{
  _id,
  title,
  "slug": slug.current,
  client,
  year,
  services,
  timeframe,
  summary,
  description,
  featured,
  order,
  thumbnail {
    alt,
    "url": coalesce(asset->url, url),
    asset
  }
}`

const PROJECT_DETAIL_FIELDS = `{
  _id,
  title,
  "slug": slug.current,
  client,
  year,
  services,
  timeframe,
  summary,
  description,
  featured,
  order,
  thumbnail {
    alt,
    "url": coalesce(asset->url, url),
    asset
  },
  heroImage {
    alt,
    "url": coalesce(asset->url, url),
    asset
  },
  images[] {
    _key,
    alt,
    caption,
    "url": coalesce(asset->url, url),
    asset
  },
  content
}`

const ORDER = '| order(coalesce(order, 9999) asc, title asc)'

function projectClient(usePreview = false) {
  return getClient(usePreview)
}

export async function fetchProjectsFallback({ preview = false } = {}) {
  const client = projectClient(preview)
  try {
    const query = `*[_type == "project" && published == true] ${ORDER} ${PROJECT_PREVIEW_FIELDS}`
    const result = await client.fetch(query)
    return Array.isArray(result) ? result : []
  } catch (error) {
    console.warn('Sanity project bridge list failed', error)
    return []
  }
}

export async function fetchProjectDetailFallback({ slug, preview = false } = {}) {
  if (!slug) return null
  const client = projectClient(preview)
  try {
    const query = `*[_type == "project" && slug.current == $slug][0] ${PROJECT_DETAIL_FIELDS}`
    return await client.fetch(query, { slug })
  } catch (error) {
    console.warn('Sanity project bridge detail failed', error)
    return null
  }
}

export function normaliseProject(project) {
  if (!project) return null
  return {
    ...project,
    slug: project.slug ? { current: project.slug } : project.slug,
    heroImage: project.heroImage || project.thumbnail,
    gallery: project.images || [],
    content: project.content || [],
  }
}
