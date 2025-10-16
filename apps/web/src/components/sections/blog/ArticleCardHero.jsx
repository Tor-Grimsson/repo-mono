import { Link } from 'react-router-dom'

const ArticleCardHero = ({ article, variant = 'featured' }) => {
  const headingClass = variant === 'grid' ? 'kol-heading-section-small' : 'kol-heading-section'

  return (
    <Link
      to={article.slug ? `/stack/${article.slug}` : '/post'}
      className="block group"
      data-tags={article.tags?.join(' ')}
    >
      <article className="w-full">
        {/* Header with Featured and Meta */}
        {variant === 'featured' && (
          <div className="flex justify-between items-center mb-4">
            <div className="kol-mono-text">Featured</div>
            {article.meta && article.meta.length > 0 && (
              <div className="flex gap-3 kol-mono">
                {article.meta.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="aspect-[16/9] mb-4 overflow-hidden w-full bg-neutral-200 dark:bg-neutral-700" style={{ borderRadius: 'var(--radius-xl)' }}>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="space-y-3">
          {article.kicker && (
            <div className="kol-mono-text uppercase tracking-wide">
              {article.kicker}
            </div>
          )}
          <h2 className={`${headingClass} transition-opacity duration-200 group-hover:opacity-70`}>
            {article.title}
          </h2>
          {article.summary && (
            <p className="kol-mono-text">
              {article.summary}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}

export default ArticleCardHero
