import { useEffect, useState } from 'react'
import StackHero from '../components/sections/stack-detail/StackHero'
import ArticleCardHero from '../components/sections/blog/ArticleCardHero'
import ArticleCardMini from '../components/sections/blog/ArticleCardMini'
import TagFilterDropdown from '../components/ui/TagFilterDropdown'
import CtaHome from '../components/sections/cta/CtaHome'
import { getLatestBlogPosts } from '../lib/queries'

const Stack = () => {
  const [latestArticle, setLatestArticle] = useState(null)
  const [otherArticles, setOtherArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState(new Set())

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
    if (allTags.length > 0 && selectedTags.size === 0) {
      setSelectedTags(new Set(allTags))
    }
  }, [allTags.length])

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

  // Filter articles based on search and selected tags
  const filteredArticles = otherArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    // Show article if any of its tags are selected, or if no tags are selected (show all)
    const matchesTag = selectedTags.size === 0 || article.tags.some(tag => selectedTags.has(tag))
    return matchesSearch && matchesTag
  })

  // Split filtered articles: first 6 get normal cards, rest get mini cards
  const normalArticles = filteredArticles.slice(0, 6)
  const miniArticles = filteredArticles.slice(6)

  return (
    <main className="min-h-screen w-full flex flex-col gap-0 pb-4">
      <StackHero />
      <div
        className="w-full h-px"
        style={{ backgroundColor: 'var(--foreground)', opacity: 0.2 }}
      ></div>

      {/* ArticleHero, Divider & Posts Grid Container */}
      <div className="flex flex-col gap-24 mt-24">
        {latestArticle && (
          <div className="px-6 lg:px-12">
            <div className="max-w-[1200px] mx-auto">
              <ArticleCardHero article={latestArticle} />
            </div>
          </div>
        )}

        {/* Divider, Filter & Search */}
        {otherArticles.length > 0 && (
          <div className="px-6 lg:px-12">
            <div className="max-w-[1200px] mx-auto">
              {/* Divider */}
              <div
                className="w-full h-px mb-8"
                style={{ backgroundColor: 'var(--foreground)', opacity: 0.2 }}
              ></div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                {/* Search Input */}
                <div className="w-full md:w-[30%]">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="control-unified w-full min-h-[44px] px-6 py-2 text-control focus:outline-none"
                  />
                </div>

                {/* Tag Filter Dropdown */}
                {tagOptions.length > 0 && (
                  <TagFilterDropdown
                    options={tagOptions}
                    selectedValues={selectedTags}
                    onChange={handleTagToggle}
                  />
                )}
              </div>

              {/* Normal Articles Grid - Using ArticleCardHero in grid */}
              {normalArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {normalArticles.map((article, index) => (
                    <ArticleCardHero key={index} article={article} variant="grid" />
                  ))}
                </div>
              )}

              {/* Mini Articles Grid */}
              {miniArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {miniArticles.map((article, index) => (
                    <ArticleCardMini
                      key={index}
                      item={{
                        title: article.title,
                        slug: article.slug,
                        image: article.thumbnail,
                        meta: article.date,
                        tags: article.tags
                      }}
                    />
                  ))}
                </div>
              )}

              {/* No results message */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="kol-mono-body">No articles found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <CtaHome />
    </main>
  )
}

export default Stack
