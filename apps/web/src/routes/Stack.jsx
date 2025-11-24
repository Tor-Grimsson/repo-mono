import { useEffect, useState } from 'react'
import SEO from '../components/layout/SEO'
import StackHeroTall from '../components/sections/stack-detail/StackHeroTall'
import StackHighlightsGrid from '../components/sections/stack-detail/StackHighlightsGrid'
import StackBrowseArticles from '../components/sections/stack-detail/StackBrowseArticles'
import ArticleCardHero from '../components/prose/cards/ArticleCardHero'
import { getLatestBlogPosts } from '../lib/queries'
import CtaGlobal from '../components/sections/cta/CtaGlobal'

const Stack = () => {
  const [latestArticle, setLatestArticle] = useState(null)
  const [otherArticles, setOtherArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState(new Set())
  const [tagsInitialized, setTagsInitialized] = useState(false)

  useEffect(() => {
    async function fetchArticles() {
      const posts = await getLatestBlogPosts(20) // Get more posts
      if (posts.length > 0) {
        const firstPost = posts[0]
        // Transform first post for hero card
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
          slug: post.slug?.current,
          // Keep these for mini cards
          excerpt: post.excerpt,
          date: new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          thumbnail: post.coverImage?.url || post.thumbnail?.url
        }))
        setOtherArticles(remaining)
      }
    }
    fetchArticles()
  }, [])

  // Get all unique tags
  const allTags = [...new Set(otherArticles.flatMap(article => article.tags))].filter(Boolean)
  const tagOptions = allTags.map(tag => ({
    label: tag,
    value: tag
  }))

  // Initialize selectedTags with all tags when articles load
  useEffect(() => {
    if (!tagsInitialized) {
      if (allTags.length > 0) {
        setSelectedTags(new Set(allTags))
        setTagsInitialized(true)
      } else if (otherArticles.length > 0) {
        // Articles exist but no tags found; mark as initialized
        setTagsInitialized(true)
      }
    }
  }, [allTags, otherArticles.length, tagsInitialized])

  // Handle tag toggle from dropdown
  const handleTagToggle = (tag) => {
    if (tag === null) {
      // Deselect all
      setSelectedTags(new Set())
    } else {
      // Toggle individual tag
      const newTags = new Set(selectedTags)
      if (newTags.has(tag)) {
        newTags.delete(tag)
      } else {
        newTags.add(tag)
      }
      setSelectedTags(newTags)
    }
  }

  const searchActive = searchTerm.trim().length > 0
  const tagFilterActive = tagsInitialized && allTags.length > 0 && selectedTags.size > 0 && selectedTags.size !== allTags.length
  const tagCleared = tagsInitialized && allTags.length > 0 && selectedTags.size === 0
  const isFiltering = searchActive || tagFilterActive || tagCleared

  const getArticleKey = (article) => {
    if (article.slug) return `slug:${article.slug}`
    if (article.title) return `title:${article.title}`
    if (article.meta?.[0]) return `meta:${article.meta[0]}`
    if (article.image) return `image:${article.image}`
    return 'fallback:unknown'
  }

  const highlightArticles = otherArticles.slice(0, 4)
  const highlightKeys = new Set(highlightArticles.map(getArticleKey))

  // Filter articles based on search and selected tags, excluding highlights
  const filteredArticles = otherArticles
    .filter(article => !highlightKeys.has(getArticleKey(article)))
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag =
        selectedTags.size === 0 ||
        article.tags.some(tag => selectedTags.has(tag))
      return matchesSearch && matchesTag
    })

  const showLoadMoreButton = filteredArticles.length > 0

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
      <main className="min-h-screen w-full overflow-x-hidden">
      <section className="relative bg-surface-primary text-auto">
        <StackHeroTall contentClassName="relative z-10 flex flex-col items-center gap-2 w-full max-w-[520px] lg:max-w-[30%] text-center mx-auto -translate-y-20 md:-translate-y-28" />
      </section>

      {latestArticle && (
        <section
          aria-label="Featured article"
          className="relative z-10 px-6 sm:px-8 -mt-48 sm:-mt-56 md:-mt-64 lg:-mt-72 mb-16"
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

      <div className="main-wrapper">
        {highlightArticles.length > 0 && (
          <section className="pb-16">
            <StackHighlightsGrid articles={highlightArticles} />
          </section>
        )}

        <section className="card-wrapper">
          <StackBrowseArticles
            title="Browse Articles"
            articles={filteredArticles}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            tagOptions={tagOptions}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            isFiltering={isFiltering}
            showLoadMore={showLoadMoreButton}
          />
        </section>
      </div>

      <CtaGlobal />
    </main>
    </>
  )
}

export default Stack
