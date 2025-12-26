import { sanityClient } from './sanityClient'

const PROJECT_FIELDS = `
  _id,
  title,
  slug,
  description,
  client,
  year,
  timeframe,
  services,
  featured,
  order,
  published,
  thumbnail {
    alt,
    "url": asset->url,
    asset
  },
  heroImage {
    alt,
    "url": asset->url,
    asset
  },
  heroImageLight {
    alt,
    "url": asset->url,
    asset
  },
  heroVideo {
    "url": asset->url,
    asset
  },
  heroVideoLight {
    "url": asset->url,
    asset
  },
  svg {
    "url": asset->url,
    asset
  },
  images[] {
    alt,
    caption,
    "url": asset->url,
    asset
  },
  content,
  seo
`

export async function getAllProjects() {
  try {
    const query = `*[_type == "project" && published == true] | order(coalesce(order, 9999) asc, title asc) {
      ${PROJECT_FIELDS}
    }`
    const result = await sanityClient.fetch(query)
    return Array.isArray(result) ? result : []
  } catch (error) {
    console.error('Failed to fetch projects', error)
    return []
  }
}

export async function getProjectBySlug(slug) {
  try {
    const query = `*[_type == "project" && slug.current == $slug && published == true][0] {
      ${PROJECT_FIELDS}
    }`
    const result = await sanityClient.fetch(query, { slug })
    return result ?? null
  } catch (error) {
    console.error(`Failed to fetch project ${slug}`, error)
    return null
  }
}

export async function getFeaturedProjects() {
  try {
    const query = `*[_type == "project" && published == true && featured == true] | order(coalesce(order, 9999) asc, title asc) {
      ${PROJECT_FIELDS}
    }`
    const result = await sanityClient.fetch(query)
    return Array.isArray(result) ? result : []
  } catch (error) {
    console.error('Failed to fetch featured projects', error)
    return []
  }
}

const BLOG_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  author->{
    name,
    slug,
    image {
      "url": asset->url
    }
  },
  publishedAt,
  tags,
  coverImage {
    alt,
    "url": asset->url,
    asset
  },
  thumbnail {
    alt,
    "url": asset->url,
    asset
  },
  body,
  sources[] {
    title,
    url,
    meta
  }
`

export async function getLatestBlogPosts(limit = 3) {
  try {
    const query = `*[_type == "blog"] | order(publishedAt desc) [0...${limit}] {
      ${BLOG_FIELDS}
    }`
    const result = await sanityClient.fetch(query)
    return Array.isArray(result) ? result : []
  } catch (error) {
    console.error('Failed to fetch blog posts', error)
    return []
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
      ${BLOG_FIELDS}
    }`
    const result = await sanityClient.fetch(query, { slug })
    return result ?? null
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug}`, error)
    return null
  }
}
