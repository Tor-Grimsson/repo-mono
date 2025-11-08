import ArticleCardMini from '../../prose/cards/ArticleCardMini'
import { Divider, Input, DropdownTagFilter } from '@kol/ui'

const StackBrowseArticles = ({
  title = 'Browse Articles',
  articles = [],
  searchTerm = '',
  onSearchChange,
  tagOptions = [],
  selectedTags = new Set(),
  onTagToggle,
  isFiltering = false,
  showLoadMore = false,
  onLoadMore
}) => {
  const handleSearchChange = (event) => {
    onSearchChange?.(event.target.value)
  }

  const hasTags = Array.isArray(tagOptions) && tagOptions.length > 0
  const hasArticles = Array.isArray(articles) && articles.length > 0

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="kol-heading-section">{title}</h2>
        <Divider variant="horizontal" />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-[420px]">
          <Input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search articles..."
            iconLeft="search-16"
          />
        </div>
        {hasTags && (
          <DropdownTagFilter
            options={tagOptions}
            selectedValues={selectedTags}
            onChange={onTagToggle}
          />
        )}
      </div>

      {hasArticles ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {articles.map((article, index) => {
            const key =
              article.slug ??
              article.title ??
              article.meta?.[0] ??
              `article-${index}`

            return (
              <ArticleCardMini
                key={key}
                item={{
                  title: article.title,
                  slug: article.slug,
                  image: article.image ?? article.thumbnail,
                  summary: article.summary ?? article.excerpt,
                  meta: article.meta?.join(' • ') ?? article.date,
                  tags: article.tags
                }}
              />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="kol-mono-text">
            {isFiltering
              ? 'No articles found matching your criteria.'
              : 'Articles will appear here once published.'}
          </p>
        </div>
      )}

      {showLoadMore && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            className="control-unified px-8 py-3 text-control transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={onLoadMore}
            disabled={!onLoadMore}
            aria-disabled={!onLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}

export default StackBrowseArticles
