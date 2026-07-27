import { Link } from 'react-router-dom'

const ArticleCardMini = ({ item }) => {
  const metaText = Array.isArray(item.meta) ? item.meta.join(' • ') : item.meta

  return (
    <Link
      to={item.slug ? `/stack/${item.slug}` : '/post'}
      className="group flex gap-6 items-start transition-opacity hover:opacity-80"
      data-tags={item.tags?.join(' ')}
    >
      <div className="flex-shrink-0 w-[120px] h-[120px] overflow-hidden rounded bg-fg-12">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2.5">

        {/* TEXT FIELD 1: ARTICLE TITLE */}
        <h4 className="kol-mono-14 line-clamp-2 transition-opacity group-hover:opacity-80">
          {item.title}
        </h4>

        {/* TEXT FIELD 2: SUMMARY */}
        {item.summary && (
          <p className="kol-mono-12 text-fg-64 line-clamp-2">
            {item.summary}
          </p>
        )}

        {/* TEXT FIELD 3: META INFO (DATE + READING TIME) */}
        {metaText && (
          <div className="kol-helper-14 text-fg-80 uppercase">
            {metaText}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ArticleCardMini
