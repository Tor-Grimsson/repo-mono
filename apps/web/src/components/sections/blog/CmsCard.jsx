// CmsCard - Latest Writing Section
import { useState, useEffect } from 'react'
import ArticleCard from './ArticleCard'
import { getLatestBlogPosts } from '../../../lib/queries'

const CmsCard = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const posts = await getLatestBlogPosts(3)
        const formattedPosts = posts.map(post => ({
          title: post.title,
          excerpt: post.excerpt || '',
          date: new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          readingTime: calculateReadingTime(post.excerpt || ''),
          aspect: 'landscape',
          thumbnail: post.thumbnail?.url || post.coverImage?.url,
          tags: post.tags || [],
          slug: post.slug?.current
        }))
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
      <div className="grid gap-12 md:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </section>
  )
}

export default CmsCard
