import { Link } from 'react-router-dom'

const ArticleCard = ({ title, excerpt, date, readingTime, aspect = 'landscape', thumbnail, tags = [], slug }) => {
  const aspectClass = aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[16/9]'

  const content = (
    <article className="group cursor-pointer w-full max-w-full">
      <div className={`${aspectClass} mb-4 overflow-hidden w-full`} style={{ backgroundColor: 'var(--color-neutral-200)', borderRadius: 'var(--radius-xl)' }}>
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <style>{`
          .dark article > div:first-child {
            background-color: var(--color-neutral-700);
          }
        `}</style>
      </div>
      {tags.length > 0 && (
        <div className="flex gap-2 mb-2">
          {tags.map((tag, index) => (
            <span key={index} className="pill-inverse">
              {tag}
            </span>
          ))}
        </div>
      )}
      <h3 className="mb-2 kol-mono text-[24px]" style={{ transition: 'opacity var(--transition-base)' }}>
        <style>{`
          article:hover h3 {
            opacity: var(--opacity-hover);
          }
        `}</style>
        {title}
      </h3>
      <p className="mb-2 kol-body-sm" style={{ color: 'var(--foreground-muted)' }}>{excerpt}</p>
      <time className="pill-subtle">
        {date} • {readingTime}
      </time>
    </article>
  )

  if (slug) {
    return <Link to={`/stack/${slug}`}>{content}</Link>
  }

  return content
}

export default ArticleCard
