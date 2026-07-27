import PropTypes from 'prop-types'
import { Divider } from '@kolkrabbi/kol-component'

/**
 * ChapterNavigation Component
 *
 * TOC-style navigation for jumping to sections (typically prose patterns)
 *
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.description - Section description
 * @param {Array} props.chapters - Array of chapter objects with title and href
 * @param {string} props.variant - Visual style: "compact", "cards", or "list"
 * @param {string} props.className - Additional classes
 */
const ChapterNavigation = ({
  title = 'Jump to Section',
  description,
  chapters = [],
  variant = 'compact',
  className = ''
}) => {
  if (chapters.length === 0) return null

  return (
    <section className={`w-full px-8 py-16 ${className}`.trim()}>
      <div className="max-w-[1400px] mx-auto">
        {variant === 'list' ? (
          // Two-column layout with heading left, links right
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-[400px]">
              {title && (
                <h2 className="kol-sans-heading-01 text-auto mb-3">{title}</h2>
              )}
              {description && (
                <p className="kol-mono-12 text-fg-64">{description}</p>
              )}
            </div>

            <div className="w-full lg:w-[880px] flex flex-col gap-8">
              {chapters.map((chapter, index) => (
                <div key={index} className="group">
                  <a
                    href={chapter.href}
                    className="flex justify-between items-start pb-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="kol-mono-14 text-auto">{chapter.title}</h3>
                        {chapter.subtitle && (
                          <span className="kol-mono-10 text-fg-64">{chapter.subtitle}</span>
                        )}
                      </div>
                      {/* Expanded content on hover */}
                      <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                        {chapter.description && (
                          <p className="kol-mono-10 text-fg-64 mt-2">{chapter.description}</p>
                        )}
                      </div>
                    </div>
                    {/* Number / CTA toggle */}
                    <div className="flex-shrink-0 ml-4">
                      <span className="kol-helper-14 uppercase text-fg-64 block group-hover:hidden">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="kol-mono-10 text-auto hidden group-hover:block whitespace-nowrap">
                        View in context →
                      </span>
                    </div>
                  </a>
                  <Divider />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Header for non-accordion variants */}
            <div className="mb-8">
              {title && (
                <h2 className="kol-sans-heading-02 mb-4">{title}</h2>
              )}
              {description && (
                <p className="kol-mono-12 text-fg-64">{description}</p>
              )}
            </div>

            {/* Chapters Grid */}
            {variant === 'compact' ? (
              // Compact text links
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {chapters.map((chapter, index) => (
                  <a
                    key={index}
                    href={chapter.href}
                    className="kol-sans-body-01 text-auto hover:text-accent-primary transition-colors"
                  >
                    → {chapter.title}
                  </a>
                ))}
              </div>
            ) : (
              // Numbered cards
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {chapters.map((chapter, index) => (
                  <a
                    key={index}
                    href={chapter.href}
                    className="p-4 border border-auto rounded hover:border-accent-primary transition-colors group"
                  >
                    <span className="kol-helper-14 uppercase text-fg-64 group-hover:text-accent-primary transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="kol-sans-body-01 mt-2">{chapter.title}</p>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

ChapterNavigation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ),
  variant: PropTypes.oneOf(['compact', 'cards', 'list']),
  className: PropTypes.string
}

export default ChapterNavigation
