// StackLatest - Latest Writing Section
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentCollection, ContentCard, ContentRow } from '@kolkrabbi/kol-component'
import { getLatestBlogPosts } from '../../../lib/queries'

const StackLatest = ({
  enableSearch = false,
  variant = 'grid',
  limit = 3,
  title = 'Studystack',
  eyebrow = 'Latest writing'
}) => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const articleHref = (slug) => (slug ? `/stack/${slug}` : '/post')
  const handleNavigate = (slug) => (event) => {
    event.preventDefault()
    navigate(articleHref(slug))
  }

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const posts = await getLatestBlogPosts(limit)
        const formattedPosts = posts.map(post => {
          const summary = post.excerpt || ''
          const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })

          return {
            image: post.thumbnail?.url || post.coverImage?.url,
            kicker: post.tags?.[0] || 'Article',
            title: post.title,
            summary,
            meta: [publishDate, calculateReadingTime(summary)],
            tags: post.tags || [],
            slug: post.slug?.current
          }
        })
        setArticles(formattedPosts)
      } catch (error) {
        console.error('Failed to load blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [limit])

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  if (loading) {
    return (
      <section className="w-full">
        <h2 className="mb-8 kol-helper-20">Studystack</h2>
        <div className="grid gap-12 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] mb-4 bg-surface-tertiary rounded-lg" />
              <div className="h-6 bg-surface-tertiary mb-2 rounded" />
              <div className="h-4 bg-surface-tertiary mb-2 rounded" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredArticles = enableSearch
    ? articles.filter(article => {
        if (!normalizedSearch) return true
        const haystack = [
          article.title,
          article.summary,
          ...(article.tags || []),
          ...(article.meta || [])
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalizedSearch)
      })
    : articles

  if (filteredArticles.length === 0) {
    if (loading) {
      return null
    }
    if (enableSearch && normalizedSearch.length > 0) {
      return (
        <section className="w-full max-w-[var(--kol-container-max)] mx-auto py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="kol-helper-20 mb-4">{title}</h2>
                <p className="kol-mono-10 text-fg-48 uppercase">{eyebrow}</p>
              </div>
              <div className="w-full md:w-[360px]">
                <input
                  type="search"
                  aria-label="Search articles"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search articles..."
                  className="control-unified w-full min-h-[44px] px-6 py-2 text-control focus:outline-none"
                />
              </div>
            </div>
            <div className="text-center py-12">
              <p className="kol-mono-14">No articles match your search yet.</p>
            </div>
          </div>
        </section>
      )
    }
    return null
  }

  return (
    <section className="w-full max-w-[var(--kol-container-max)] mx-auto py-8">
      <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="kol-helper-20 mb-4">{title}</h2>
          <p className="kol-mono-10 text-fg-48 uppercase">{eyebrow}</p>
        </div>
        {enableSearch && (
          <div className="w-full md:w-[360px]">
            <input
              type="search"
              aria-label="Search articles"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search articles..."
              className="control-unified w-full min-h-[44px] px-6 py-2 text-control focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* The content-card system, matching /stack's own mapping (2026-08-27):
        * ContentCollection owns the wall + enter stagger, ContentCard /
        * ContentRow `article` own the card. The mobile/lg card split is gone —
        * `cols` renders one column below md and three from it, one card either
        * way, which is what the family does everywhere else. */}
      {variant === 'list' ? (
        <ContentCollection form="list">
          {filteredArticles.map((article, index) => (
            <ContentRow
              key={article.slug ?? article.title ?? index}
              variant="article"
              media={article.image ? <img src={article.image} alt="" loading="lazy" className="w-full h-full object-cover" /> : undefined}
              title={article.title}
              titleClass="kol-card-title"
              meta={article.meta}
              tags={article.tags}
              href={articleHref(article.slug)}
              onNavigate={handleNavigate(article.slug)}
            />
          ))}
        </ContentCollection>
      ) : (
        <ContentCollection form="grid" cols={3}>
          {filteredArticles.map((article, index) => (
            <ContentCard
              key={article.slug ?? article.title ?? index}
              variant="article"
              media={article.image ? <img src={article.image} alt="" loading="lazy" className="w-full h-full object-cover" /> : undefined}
              kicker={article.kicker}
              kickerClass="kol-card-kicker"
              title={article.title}
              titleClass="kol-sans-display-03 uppercase text-emphasis line-clamp-2 w-full"
              body={article.summary}
              clamp={2}
              tags={article.tags}
              href={articleHref(article.slug)}
              onNavigate={handleNavigate(article.slug)}
            />
          ))}
        </ContentCollection>
      )}
    </section>
  )
}

export default StackLatest
