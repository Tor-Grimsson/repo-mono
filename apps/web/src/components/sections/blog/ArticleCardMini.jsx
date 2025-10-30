import { Link } from 'react-router-dom'

const ArticleCardMini = ({ item }) => {
  return (
    <Link
      to={item.slug ? `/stack/${item.slug}` : '/post'}
      className="flex gap-4 group items-start hover:opacity-70 transition-opacity"
      data-tags={item.tags?.join(' ')}
    >
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden" style={{ backgroundColor: 'var(--kol-color-neutral-200)', borderRadius: 'var(--radius-md)' }}>
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
        <style>{`
          .dark a > div:first-child {
            background-color: var(--kol-color-neutral-700);
          }
        `}</style>
      </div>
      <div className="flex-1 min-w-0">

        {/* TEXT FIELD 1: ARTICLE TITLE */}
        <h4 className="kol-helper-md-fine mb-1 line-clamp-2">
          {item.title}
        </h4>

        {/* TEXT FIELD 2: META INFO (DATE + READING TIME) */}
        {item.meta && (
          <div className="kol-text-sm" style={{ color: 'color-mix(in srgb, var(--kol-surface-on-primary) 64%, transparent)' }}>
            {item.meta}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ArticleCardMini
