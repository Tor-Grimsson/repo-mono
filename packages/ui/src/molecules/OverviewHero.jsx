import Pill from '../atoms/Pill'
import ButtonGroup from '../molecules/ButtonGroup'

/**
 * OverviewHero - Hero section for overview/landing pages
 *
 * Reusable hero component for collection/category overview pages
 * Shows badge, title, description, and optional category pills or buttons
 *
 * @param {Object} props
 * @param {string} props.badge - Badge text (e.g., "Collections", "Specimens", "Typefaces")
 * @param {string} props.badgeVariant - Pill variant for badge (default: "inverse")
 * @param {string} props.title - Main heading
 * @param {string} props.titleFontFamily - Optional custom font family for title
 * @param {string} props.titleFontStyle - Optional font style for title (normal/italic)
 * @param {string} props.description - Body text description
 * @param {Array} props.categories - Array of category strings to display as pills
 * @param {Array} props.buttons - Array of button configs for ButtonGroup (alternative to categories)
 * @param {string} props.footerText - Optional text below buttons/categories
 * @param {string} props.className - Additional classes
 */
const OverviewHero = ({
  badge,
  badgeVariant = 'inverse',
  title,
  titleFontFamily,
  titleFontStyle = 'normal',
  description,
  categories = [],
  buttons,
  footerText,
  className = ''
}) => {
  return (
    <section className={`w-full px-8 pt-24 pb-24 lg:pt-36 lg:pb-36 mt-24 ${className}`.trim()}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          {badge && (
            <Pill variant={badgeVariant}>{badge}</Pill>
          )}

          <h1
            className={`kol-display-lg text-auto ${titleFontStyle === 'italic' ? 'italic' : ''}`}
            style={titleFontFamily ? { fontFamily: titleFontFamily } : undefined}
          >
            {title}
          </h1>

          <div className="w-32 h-[1px] bg-fg-24" />

          {description && (
            <p className="kol-mono-text text-fg-64 max-w-[700px]">
              {description}
            </p>
          )}

          {buttons && buttons.length > 0 && (
            <div className="flex flex-col items-center gap-2 pt-4">
              <ButtonGroup buttons={buttons} align="center" />
              {footerText && (
                <p className="kol-mono-xs text-auto opacity-64 pt-4">
                  {footerText}
                </p>
              )}
            </div>
          )}

          {!buttons && categories.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-4">
              {categories.map((category, index) => (
                <Pill key={index} variant="subtle">{category}</Pill>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default OverviewHero
