import { sanityClient } from './sanityClient'

const PROJECT_FIELDS = `
  _id,
  title,
  slug,
  type,
  description,
  about,
  client,
  year,
  tags,
  links[]{label, url},
  thumbnail {
    alt,
    "url": asset->url,
    asset
  },
  heroImage {
    alt,
    "url": asset->url,
    "dimensions": asset->metadata.dimensions,
    asset
  },
  heroVideo {
    aspectRatio,
    "url": asset->url,
    asset
  },
  media[] {
    _type,
    alt,
    caption,
    aspectRatio,
    "url": asset->url,
    "dimensions": asset->metadata.dimensions,
    asset
  },
  seo
`

export async function getAllProjects() {
  try {
    const query = `*[_type == "project"] | order(orderRank asc, _updatedAt desc) {
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
    const query = `*[_type == "project" && slug.current == $slug][0] {
      ${PROJECT_FIELDS}
    }`
    const result = await sanityClient.fetch(query, { slug })
    return result ?? null
  } catch (error) {
    console.error(`Failed to fetch project ${slug}`, error)
    return null
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
  body[]{
    ...,
    _type == "videoBlock" => {
      ...,
      "file": file{
        ...,
        "url": asset->url
      },
      "poster": poster{
        ...,
        "url": asset->url
      }
    }
  },
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
