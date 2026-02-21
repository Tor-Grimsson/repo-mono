import { useEffect, useState, useMemo } from 'react'
import SEO from '../components/layout/SEO'
import StackHeroTall from '../components/sections/stack-detail/StackHeroTall'
import ArticleCardHero from '../components/prose/cards/ArticleCardHero'
import { getLatestBlogPosts } from '../lib/queries'
import CtaGlobal from '../components/sections/cta/CtaGlobal'
import { ContentFilters } from '@kol/ui'

const Stack = () => {
  const [latestArticle, setLatestArticle] = useState(null)
  const [otherArticles, setOtherArticles] = useState([])

  useEffect(() => {
    async function fetchArticles() {
      const posts = await getLatestBlogPosts(20)
      if (posts.length > 0) {
        const firstPost = posts[0]
        // Transform first post for featured card
        setLatestArticle({
          image: firstPost.coverImage?.url || firstPost.thumbnail?.url,
          kicker: firstPost.tags?.[0] || 'Article',
          title: firstPost.title,
          summary: firstPost.excerpt,
          meta: [
            new Date(firstPost.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          ],
          tags: firstPost.tags || [],
          slug: firstPost.slug?.current
        })

        // Transform remaining posts for grid
        const remaining = posts.slice(1).map(post => ({
          image: post.coverImage?.url || post.thumbnail?.url,
          kicker: post.tags?.[0] || 'Article',
          title: post.title,
          summary: post.excerpt,
          meta: [
            new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          ],
          tags: post.tags || [],
          slug: post.slug?.current
        }))
        setOtherArticles(remaining)
      }
    }
    fetchArticles()
  }, [])

  // Build filter groups from article tags
  const filterGroups = useMemo(() => {
    const allTags = [...new Set(otherArticles.flatMap(a => a.tags || []))].filter(Boolean)
    if (allTags.length === 0) return []
    return [{
      label: 'Tags',
      key: 'tags',
      values: allTags.sort()
    }]
  }, [otherArticles])

  // Render function for ContentFilters
  const renderArticles = (items) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
      {items.map((article, index) => (
        <div
          key={article.slug || index}
          className="reveal"
          style={{ '--reveal-delay': `${Math.min(index * 0.08, 0.5)}s` }}
        >
          <ArticleCardHero article={article} variant="grid" />
        </div>
      ))}
    </div>
  )

  return (
    <>
      <SEO
        title="Stack — Articles & Design Insights"
        description="Articles on design, typography, creative technology, and design systems."
        ogTitle="Stack — Design Articles & Insights"
        ogDescription="Design articles featuring insights, typography tutorials, and creative tech topics"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/stack"
        canonical="https://kolkrabbi.io/stack"
      />
      <main>
      <section className="relative bg-surface-primary text-auto">
        <StackHeroTall contentClassName="relative z-10 flex flex-col items-center gap-2 w-full max-w-[520px] lg:max-w-[30%] text-center mx-auto -translate-y-20 md:-translate-y-28" />
      </section>

      {latestArticle && (
          <section
            aria-label="Featured article"
            className="relative z-10 -mt-48 sm:-mt-56 md:-mt-64 lg:-mt-72 mb-16"
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="relative overflow-hidden bg-surface-primary border border-auto p-6 sm:p-8 rounded">
                <div className="pointer-events-none absolute inset-0 rounded bg-fg-02" aria-hidden="true"></div>
                <div className="relative">
                  <ArticleCardHero article={latestArticle} />
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="max-w-[1400px] mx-auto py-6 md:pt-8 pb-16">
          {otherArticles.length > 0 && (
            <section className="">
              <ContentFilters
                items={otherArticles}
                title="Stack Articles"
                totalCount={otherArticles.length}
                filterGroups={filterGroups}
                renderItem={renderArticles}
                defaultViewMode="grid"
              />
            </section>
          )}
        </div>

        <CtaGlobal />
    </main>
    </>
  )
}

export default Stack
