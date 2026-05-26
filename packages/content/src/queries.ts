export const CASE_STUDY_LIST = `*[_type == "project" && defined(slug.current)] | order(orderRank asc, _updatedAt desc) {
  _id,
  title,
  "slug": slug.current,
  type,
  client,
  year,
  description,
  thumbnail{
    ...,
    asset->{
      url,
      metadata{dimensions, lqip}
    }
  }
}`

export const CASE_STUDY_DETAIL = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  type,
  client,
  year,
  description,
  about,
  tags,
  links[]{label, url},
  heroImage{
    ...,
    asset->{
      url,
      metadata{dimensions, lqip}
    }
  },
  heroVideo{
    "url": asset->url,
    asset
  },
  media[]{
    _type,
    ...,
    asset->{
      url,
      metadata{dimensions, lqip}
    }
  },
}`

export const BLOG_DETAIL = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  type,
  author->{
    name,
    slug,
    bio,
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
  toc[]{
    title,
    summary,
    targetId,
    bullets
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
}`
