import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/layout/SEO'
import { getLatestBlogPosts } from '../lib/queries'
import SectionCtaWrapper from '../components/sections/shared/SectionCtaWrapper'
import HomeSignup from '../components/sections/home/HomeSignup'
import { ContentFilters, ContentCollection, ContentCard, ContentRow, SectionHero, SectionText } from '@kolkrabbi/kol-component'

const MOOD = 'https://b2.kolkrabbi.io/website/asset-library/cms/stack/mood'

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
          type: post.type === 'research' ? 'Research' : 'Standard',
          slug: post.slug?.current
        }))
        setOtherArticles(remaining)
      }
    }
    fetchArticles()
  }, [])

  // Filter groups: Type (research / standard — the schema's article type,
  // mutually exclusive) first, Tags second.
  const filterGroups = useMemo(() => {
    const types = [...new Set(otherArticles.map(a => a.type))].filter(Boolean).sort()
    const allTags = [...new Set(otherArticles.flatMap(a => a.tags || []))].filter(Boolean).sort()
    const groups = []
    if (types.length > 1) groups.push({ label: 'Type', key: 'type', values: types, stack: true })
    if (allTags.length) groups.push({ label: 'Tags', key: 'tags', values: allTags })
    return groups
  }, [otherArticles])

  // Render function for ContentFilters — the content-card system (2026-08-27):
  // ContentCollection owns the grid/list + the enter stagger, ContentCard /
  // ContentRow `article` own the card. The old ListingCard + hand grid retired.
  const renderArticles = (items, _viewMode, layout) => {
    const list = layout === 'list'
    const Item = list ? ContentRow : ContentCard
    return (
      <ContentCollection form={list ? 'list' : 'grid'} cols={{ md: 3, xl: 4 }}>
        {items.map((article, index) => (
          <Item
            key={article.slug || index}
            variant="article"
            media={article.image ? <img src={article.image} alt="" loading="lazy" className="w-full h-full object-cover" /> : undefined}
            /* live's look: kicker + title uppercase (Tight display), body clamped to two lines, no tags, no date */
            kicker={article.kicker}
            kickerClass="kol-card-kicker"
            title={article.title}
            titleClass="kol-sans-display-03 uppercase text-emphasis truncate w-full"
            body={article.summary}
            clamp={2}
            href={articleHref(article.slug)}
            onNavigate={handleNavigate(article.slug)}
          />
        ))}
      </ContentCollection>
    )
  }

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
      <main id="main">
      {/* SectionHero (round 2, component 0.76.0): full-height, content at the
        * foot, bottom-heavy veil, the featured card riding the fold through
        * `foot`. StackHero retired to _tmp/2026-08-26-sectionhero-round2/.
        * `panel` = SectionText on the surface — Stack never had a glass panel. */}
      <SectionHero
        /* Clears the fixed 68px navbar (2026-08-31). The bar is opaque and
         * floats over every page; a full-bleed hero starts at top:0 and loses
         * its first 68px underneath it. */
        className="mt-[var(--kol-nav-h)]"
        fullBleed
        height="h-[90vh]"
        justify="end"
        overlap={288}
        veil
        overlayOpacity={80}
        /* ready node so the focal point is ours: centre (user 2026-08-27) */
        media={
          <img
            className="kol-full-bleed-hero-media"
            style={{ objectPosition: '50% 50%' }}
            src={`${MOOD}/mood-05-1200.jpg`}
            srcSet={`${MOOD}/mood-05-400.jpg 400w, ${MOOD}/mood-05-800.jpg 800w, ${MOOD}/mood-05-1200.jpg 1200w, ${MOOD}/mood-05-1600.jpg 1600w`}
            sizes="100vw"
            alt=""
          />
        }
        panel={
          <SectionText
            align="center"
            headline="Study Stack"
            headlineSize="display-01"
            headlineCase="upper"
            headlineAs="h1"
            body="Excercises in futility, manic obsessivities & braindumpster"
            slotClass={{ headline: 'reveal', body: 'reveal' }}
            slotStyle={{ headline: { '--reveal-delay': '0.2s' }, body: { '--reveal-delay': '0.3s' } }}

            className="max-w-[720px] mx-auto"
          />
        }
        foot={latestArticle && (
          <section aria-label="Featured article" className="mb-16">
            <div className="kol-page pt-0">
              <div className="relative overflow-hidden bg-surface-primary p-6 sm:p-8 rounded">
                <div className="pointer-events-none absolute inset-0 rounded bg-fg-02" aria-hidden="true"></div>
                <div className="relative">
                  <ContentCard
                    variant="article"
                    hero
                    label="Featured"
                    meta={latestArticle.meta}
                    kicker={latestArticle.kicker}
                    title={latestArticle.title}
                    body={latestArticle.summary}
                    media={latestArticle.image ? <img src={latestArticle.image} alt="" className="w-full h-full object-cover" /> : undefined}
                    href={articleHref(latestArticle.slug)}
                    onNavigate={handleNavigate(latestArticle.slug)}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      />

        <div className="kol-page pt-0 pb-16">
          {otherArticles.length > 0 && (
            <section className="">
              <ContentFilters
                layoutPlacement="header"
                items={otherArticles}
                title="Stack Articles"
                totalCount={otherArticles.length}
                filterGroups={filterGroups}
                mutuallyExclusiveFilters={['type']}
                renderItem={renderArticles}
                layoutOptions={[{ value: 'list', label: 'LIST' }, { value: 'grid', label: 'GRID' }]}
                /* LIST/GRID sits in the RECENT/SAVED spot here, so it wears that spot's voice */
                layoutClassName="kol-helper-14"
                defaultLayout="grid"
              />
            </section>
          )}
        </div>

        <HomeSignup />

        <SectionCtaWrapper />
    </main>
    </>
  )
}

export default Stack
