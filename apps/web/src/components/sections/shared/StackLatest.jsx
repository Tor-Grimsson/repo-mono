// StackLatest - Latest Writing Section
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListingCard } from '@kolkrabbi/kol-content'
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
        <h2 className="mb-8 kol-label">Studystack</h2>
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
        <section className="w-full max-w-[1400px] mx-auto py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="kol-label mb-4">{title}</h2>
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
    <section className="w-full max-w-[1400px] mx-auto py-8">
      <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="kol-label mb-4">{title}</h2>
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

      {variant === 'list' ? (
        <div className="flex flex-col gap-6">
          {filteredArticles.map((article, index) => (
            <ListingCard
              key={article.slug ?? article.title ?? index}
              size="mini"
              title={article.title}
              thumbnail={article.image}
              meta={article.meta}
              tags={article.tags}
              titleClassName="kol-card-title"
              href={articleHref(article.slug)}
              onNavigate={handleNavigate(article.slug)}
            />
          ))}
        </div>
      ) : (
        <>
          {/* Mobile/MD: Vertical stack with mini cards */}
          <div className="w-full flex flex-col gap-8 lg:hidden">
            {filteredArticles.map((article, index) => (
              <ListingCard
                key={article.slug ?? article.title ?? index}
                size="mini"
                title={article.title}
                summary={article.summary}
                thumbnail={article.image}
                meta={article.meta}
                tags={article.tags}
                titleClassName="kol-card-title"
                href={articleHref(article.slug)}
                onNavigate={handleNavigate(article.slug)}
              />
            ))}
          </div>
          {/* LG+: Grid with hero cards */}
          <div className="hidden lg:grid gap-12 lg:grid-cols-3">
            {filteredArticles.map((article, index) => (
              <ListingCard
                key={article.slug ?? article.title ?? index}
                size="hero"
                showHeader={false}
                kicker={article.kicker}
                title={article.title}
                summary={article.summary}
                thumbnail={article.image}
                tags={article.tags}
                titleClassName="kol-display-section-sm"
                kickerClassName="kol-card-kicker"
                href={articleHref(article.slug)}
                onNavigate={handleNavigate(article.slug)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default StackLatest
