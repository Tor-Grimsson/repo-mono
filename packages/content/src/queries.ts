export const CASE_STUDY_LIST = `*[_type == "project" && defined(slug.current) && published == true] | order(order asc, _updatedAt desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  year,
  featured,
  description,
  services,
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
  client,
  year,
  timeframe,
  services,
  description,
  heroImage{
    ...,
    asset->{
      url,
      metadata{dimensions, lqip}
    }
  },
  images[]{
    ...,
    asset->{
      url,
      metadata{dimensions, lqip}
    }
  },
  content[],
  fonts[]{fontFamily->{title, slug, foundry->{title, slug}}}
}`

export const FONT_FAMILIES = `*[_type == "fontFamily"]{ _id, title, "slug": slug.current, styles[], foundry->{title, slug} }`
