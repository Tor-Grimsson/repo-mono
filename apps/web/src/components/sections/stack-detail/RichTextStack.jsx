import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '../../portable-text/components'
import SourcesList from '../../portable-text/SourcesList'

const RichTextStack = ({ post }) => {
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
    <article className="px-6 lg:px-10 pb-24">
      <div className="max-w-4xl mx-auto">

        {/* Article Header */}
        <header className="mb-16">
          {/* Tags */}
          {formattedPost?.tags && formattedPost.tags.length > 0 && (
            <div className="flex gap-2 mb-6">
              {formattedPost.tags.map((tag, i) => (
                <span key={i} className="pill-inverse text-xs">{tag}</span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="kol-heading-display mb-6">
            {formattedPost?.title || 'Untitled'}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-4 mb-8">
            {formattedPost?.author && (
              <div className="flex items-center gap-3">
                {formattedPost.author.image?.url && (
                  <img
                    src={formattedPost.author.image.url}
                    alt={formattedPost.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="kol-mono font-medium">{formattedPost.author.name}</p>
                  <p className="kol-body-sm" style={{ color: 'var(--foreground-muted)' }}>
                    {formattedPost?.date}
                  </p>
                </div>
              </div>
            )}
            {!formattedPost?.author && formattedPost?.date && (
              <p className="kol-body-sm" style={{ color: 'var(--foreground-muted)' }}>
                {formattedPost.date}
              </p>
            )}
            {formattedPost?.readingTime && (
              <span className="kol-body-sm" style={{ color: 'var(--foreground-muted)' }}>
                • {formattedPost.readingTime}
              </span>
            )}
          </div>

          {/* Excerpt */}
          {formattedPost?.excerpt && (
            <p className="kol-body-lg mb-8" style={{ color: 'var(--foreground-muted)' }}>
              {formattedPost.excerpt}
            </p>
          )}

          {/* Featured/Cover Image */}
          {formattedPost?.coverImage && (
            <div className="mb-12 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--color-neutral-200)' }}>
              <img
                src={formattedPost.coverImage}
                alt={formattedPost.title}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '600px' }}
              />
            </div>
          )}
        </header>

        {/* Article Body */}
        <div className="kol-prose">
          {formattedPost?.content ? (
            <PortableText value={formattedPost.content} components={portableTextComponents} />
          ) : (
            <p style={{ color: 'var(--foreground-muted)' }}>
              No content available.
            </p>
          )}
        </div>

        {/* Sources & References */}
        {post?.sources && post.sources.length > 0 && (
          <SourcesList sources={post.sources} />
        )}

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--surface-border)' }}>
          {formattedPost?.tags && formattedPost.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {formattedPost.tags.map((tag, i) => (
                <span key={i} className="pill-subtle">{tag}</span>
              ))}
            </div>
          )}
        </footer>

      </div>
    </article>
  )
}

export default RichTextStack
