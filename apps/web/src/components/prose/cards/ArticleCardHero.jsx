import { Link } from 'react-router-dom'

const ArticleCardHero = ({ article, variant = 'featured' }) => {
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
            <div className="kol-card-kicker">Featured</div>
            {article.meta && article.meta.length > 0 && (
              <div className="flex gap-3 kol-card-tag">
                {article.meta.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="aspect-[16/9] mb-4 overflow-hidden w-full bg-fg-04 border border-fg-08 hover:border-fg-16" style={{ borderRadius: '4px' }}>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="space-y-3">
          {/* TEXT FIELD 1: KICKER - This is "VIRTUAL MACHINE" */}
          {article.kicker && (
            <div className="kol-card-kicker uppercase tracking-wide text-fg-64">
              {article.kicker}
            </div>
          )}

          {/* TEXT FIELD 2: TITLE - This is "USING AN LLM TO TEACH ME STUFF..." */}
          <h2 className="kol-display-section-sm transition-opacity duration-200 group-hover:opacity-70 line-clamp-2">
            {article.title}
          </h2>

          {/* TEXT FIELD 3: SUMMARY - This is "This is a semi-technical walkthrough..." */}
          {article.summary && (
            <p className="kol-card-excerpt text-fg-48">
              {article.summary}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}

export default ArticleCardHero
