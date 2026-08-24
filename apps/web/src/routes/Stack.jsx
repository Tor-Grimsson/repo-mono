import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/layout/SEO'
import StackHero from '../components/sections/stack/StackHero'
import { ListingCard } from '@kolkrabbi/kol-content'
import { getLatestBlogPosts } from '../lib/queries'
import ConnectCta from '../components/sections/shared/ConnectCta'
import HomeSignup from '../components/sections/home/HomeSignup'
import { ContentFilters } from '@kolkrabbi/kol-component'

const Stack = () => {
  const navigate = useNavigate()
  const [latestArticle, setLatestArticle] = useState(null)
  const [otherArticles, setOtherArticles] = useState([])

  const articleHref = (slug) => (slug ? `/stack/${slug}` : '/post')
  const handleNavigate = (slug) => (event) => {
    event.preventDefault()
    navigate(articleHref(slug))
  }

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
          <ListingCard
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
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-01.png"
        ogUrl="https://kolkrabbi.io/stack"
        canonical="https://kolkrabbi.io/stack"
      />
      <main id="main" className="breakpoint-padding">
      <section className="relative bg-surface-primary text-auto">
        <StackHero tall
          src="https://b2.kolkrabbi.io/website/asset-library/cms/stack/mood/mood-05-1200.jpg"
          srcSet="https://b2.kolkrabbi.io/website/asset-library/cms/stack/mood/mood-05-400.jpg 400w, https://b2.kolkrabbi.io/website/asset-library/cms/stack/mood/mood-05-800.jpg 800w, https://b2.kolkrabbi.io/website/asset-library/cms/stack/mood/mood-05-1200.jpg 1200w, https://b2.kolkrabbi.io/website/asset-library/cms/stack/mood/mood-05-1600.jpg 1600w"
          objectPosition="center"
          contentClassName="relative z-10 flex flex-col items-center gap-2 w-full max-w-[520px] lg:max-w-[30%] text-center mx-auto -translate-y-20 md:-translate-y-28"
        />
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
                  <ListingCard
                    size="hero"
                    label="Featured"
                    meta={latestArticle.meta}
                    kicker={latestArticle.kicker}
                    title={latestArticle.title}
                    summary={latestArticle.summary}
                    thumbnail={latestArticle.image}
                    tags={latestArticle.tags}
                    titleClassName="kol-display-section-sm"
                    kickerClassName="kol-card-kicker"
                    href={articleHref(latestArticle.slug)}
                    onNavigate={handleNavigate(latestArticle.slug)}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="max-w-[1400px] mx-auto py-6 md:pt-8 pb-16">
          {otherArticles.length > 0 && (
            <section className="">
              <ContentFilters
                layoutPlacement="header"
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

        <HomeSignup />

        <ConnectCta />
    </main>
    </>
  )
}

export default Stack
