// CmsCard - Latest Writing Section
import { useState, useEffect } from 'react'
import ArticleCardHero from './ArticleCardHero'
import ArticleCardMini from './ArticleCardMini'
import { getLatestBlogPosts } from '../../../lib/queries'

const CmsCard = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const posts = await getLatestBlogPosts(3)
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
  }, [])

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  if (loading) {
    return (
      <section className="mb-6 px-6 lg:px-10">
        <h2 className="mb-8 kol-label">Studystack</h2>
        <div className="grid gap-12 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] mb-4 bg-[var(--color-neutral-200)]" style={{ borderRadius: 'var(--radius-xl)' }} />
              <div className="h-6 bg-[var(--color-neutral-200)] mb-2" style={{ borderRadius: 'var(--radius-sm)' }} />
              <div className="h-4 bg-[var(--color-neutral-200)] mb-2" style={{ borderRadius: 'var(--radius-sm)' }} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mb-6 px-6 lg:px-10">
      <h2 className="mb-8 kol-label">Studystack</h2>
        {/* Mobile/MD: Vertical stack with ArticleCardMini */}
        <div className="flex flex-col gap-6 lg:hidden">
          {articles.map((article, index) => (
            <ArticleCardMini
              key={index}
              item={{
                ...article,
                meta: article.meta?.join(' • ')
              }}
            />
          ))}
        </div>
        {/* LG+: Grid with ArticleCardHero */}
        <div className="hidden lg:grid gap-12 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCardHero key={index} article={article} variant="grid" />
          ))}
        </div>
    </section>
  )
}

export default CmsCard
