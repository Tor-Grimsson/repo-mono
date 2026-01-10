import { PortableText } from '@portabletext/react'
import { Pill } from '@kol/ui'
import { portableTextBlogComponents } from '../core/PortableTextBlog'
import SourcesList from '../blocks/SourcesList'

const buildSanityImageUrlWithParams = (url, width, height) => {
  if (!url || typeof url !== 'string') return null
  const baseUrl = url.split('?')[0]
  const params = new URLSearchParams()
  params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  params.set('fit', 'crop')
  params.set('crop', 'center')
  params.set('auto', 'format')
  return `${baseUrl}?${params.toString()}`
}

const buildSanityImageSrcSet = (url, widths, aspectRatio) => {
  if (!url || typeof url !== 'string') return null
  return widths
    .map((width) => {
      const height = Math.round(width / aspectRatio)
      return `${buildSanityImageUrlWithParams(url, width, height)} ${width}w`
    })
    .join(', ')
}

const HERO_IMAGE_WIDTHS = [640, 960, 1200, 1600, 2000, 2400, 2800, 3200, 4000]
const HERO_IMAGE_SIZES = '200vw'

/**
 * ArticleLayout - Full-page layout for blog posts and Stack articles
 *
 * Handles the complete article rendering including header, content, and footer.
 * Integrates with Sanity Portable Text for rich content.
 *
 * @param {Object} post - Article data from Sanity CMS
 * @param {string} post.title - Article title
 * @param {string} post.excerpt - Optional summary/lead paragraph
 * @param {string} post.publishedAt - ISO date string
 * @param {string[]} post.tags - Category tags
 * @param {Object} post.coverImage - Cover image data
 * @param {Object} post.author - Author data with name and image
 * @param {Array} post.body - Portable Text content blocks
 * @param {Array} post.sources - Optional references/sources
 */
const ArticleLayout = ({ post }) => {
  if (!post) {
    return null
  }

  const calculateReadingTime = (text) => {
    if (!text) return '1 min read'
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const formattedPost = {
    title: post.title,
    excerpt: post.excerpt || '',
    date: new Date(post.publishedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    readingTime: calculateReadingTime(post.excerpt || ''),
    coverImage: post.coverImage?.url || post.thumbnail?.url,
    author: post.author,
    tags: post.tags || [],
    content: post.body
  }

  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8 py-16 px-6 lg:px-10">

        {/* Article Header */}
        <header className="flex flex-col gap-6">
          {/* Tags */}
          {formattedPost?.tags && formattedPost.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {formattedPost.tags.map((tag, i) => (
                <Pill key={i} variant="subtle">
                  {tag}
                </Pill>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="kol-display-lg">
            {formattedPost?.title || 'Untitled'}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-4">
            {formattedPost?.author && (
              <div className="flex items-center gap-3">
                {formattedPost.author.image?.url && (
                  <img
                    src={formattedPost.author.image.url}
                    alt={formattedPost.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <p className="kol-mono-sm font-medium">{formattedPost.author.name}</p>
                  <p className="kol-text-sm text-fg-64">{formattedPost?.date}</p>
                </div>
              </div>
            )}
            {!formattedPost?.author && formattedPost?.date && (
              <p className="kol-text-sm text-fg-64">{formattedPost.date}</p>
            )}
            {formattedPost?.readingTime && (
              <span className="kol-text-sm text-fg-64">• {formattedPost.readingTime}</span>
            )}
          </div>

          {/* Excerpt */}
          {formattedPost?.excerpt && (
            <p className="kol-text-lg text-fg-64">
              {formattedPost.excerpt}
            </p>
          )}

          {/* Featured/Cover Image */}
          {formattedPost?.coverImage && (
            <div className="rounded-lg overflow-hidden bg-surface-secondary border border-auto">
              <img
                src={buildSanityImageUrlWithParams(formattedPost.coverImage, 1200, 600)}
                srcSet={buildSanityImageSrcSet(formattedPost.coverImage, HERO_IMAGE_WIDTHS, 2)}
                sizes={HERO_IMAGE_SIZES}
                alt={formattedPost.title}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '600px' }}
                loading="eager"
              />
            </div>
          )}
        </header>

        {/* Article Body */}
        <div className="kol-prose">
          {formattedPost?.content ? (
            <PortableText
              value={formattedPost.content}
              components={portableTextBlogComponents}
            />
          ) : (
            <p className="text-fg-64">No content available.</p>
          )}
        </div>

        {/* Sources & References */}
        {post?.sources && post.sources.length > 0 && (
          <SourcesList sources={post.sources} />
        )}

        {/* Article Footer */}
        <footer className="flex gap-2 flex-wrap border-t-2 border-auto pt-12 mt-8">
          {formattedPost?.tags && formattedPost.tags.length > 0 && (
            formattedPost.tags.map((tag, i) => (
              <Pill key={i} variant="subtle">
                {tag}
              </Pill>
            ))
          )}
        </footer>

      </div>
    </section>
  )
}

export default ArticleLayout
