import ArticleCardHero from '../../prose/cards/ArticleCardHero'
import { SectionLabel, Divider } from '@kol/ui'

const StackHighlightsGrid = ({ articles = [], label = 'Stack Highlights' }) => {
  if (!articles.length) {
    return null
  }

  const displayArticles = articles.slice(0, 4)
  const getArticleKey = (article, index) => {
    if (article.slug) return `slug:${article.slug}`
    if (article.title) return `title:${article.title}`
    if (article.meta?.[0]) return `meta:${article.meta[0]}`
    if (article.image) return `image:${article.image}`
    return `fallback:${index}`
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8 py-8">
      <div className="w-full flex flex-row justify-between items-center gap-4">
        <SectionLabel text={label} />
      </div>

      <Divider variant="horizontal" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
        {displayArticles.map((article, index) => {
          const articleKey = getArticleKey(article, index)

          return (
            <div key={articleKey} className="bg-fg-02 border border-auto rounded p-6 sm:p-8">
              <ArticleCardHero article={article} variant="grid" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StackHighlightsGrid
