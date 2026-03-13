/**
 * StickyNavCard - Clickable summary card for sidebar navigation
 * Used in ArticleRichProse for scroll-spy navigation
 */
const StickyNavCard = ({
  heading,
  body,
  bullets = [],
  index,
  isActive = false,
  collapsed = false,
  onClick
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left"
    >
      <article
        className={`space-y-3 rounded border p-6 ${
          isActive ? 'border-auto bg-fg-02' : 'border-fg-08'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className={`kol-helper-md uppercase ${collapsed ? 'line-clamp-1' : ''} ${isActive ? 'text-auto' : 'text-fg-48'}`}>
            {heading}
          </h3>
          <span className={`kol-mono-xs uppercase ${isActive ? 'text-fg-80' : 'text-fg-48'}`}>
            #{index + 1}
          </span>
        </div>

        {body && (
          <p className={`kol-mono-sm-regular ${isActive ? 'text-fg-64' : 'text-fg-32'}`}>
            {body}
          </p>
        )}

        {Array.isArray(bullets) && bullets.length > 0 && (
          <ul className="space-y-2">
            {bullets.map((item, bulletIndex) => (
              <li key={bulletIndex} className="kol-mono-xs text-fg-64 flex gap-2">
                <span className="text-fg-48">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </button>
  )
}

export default StickyNavCard
