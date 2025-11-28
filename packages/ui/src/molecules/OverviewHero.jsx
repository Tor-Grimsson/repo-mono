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
 * @param {string} props.titleClassName - Optional custom className for title (defaults to "kol-display-lg text-auto")
 * @param {string} props.description - Body text description
 * @param {Array} props.categories - Array of category strings to display as pills
 * @param {Array} props.buttons - Array of button configs for ButtonGroup (alternative to categories)
 * @param {string} props.footerText - Optional text below buttons/categories
 * @param {string} props.variant - Layout variant: "centered" (default) or "left"
 * @param {string} props.className - Additional classes
 */
const OverviewHero = ({
  badge,
  badgeVariant = 'inverse',
  title,
  titleFontFamily,
  titleFontStyle = 'normal',
  titleClassName,
  description,
  categories = [],
  buttons,
  footerText,
  variant = 'centered',
  className = ''
}) => {
  // variant="left" is used on COLLECTION PAGES (Grids, Illustrations, Logomarks, Motion Graphics)
  // variant="centered" is used on OTHER PAGES (default)
  const isLeft = variant === 'left'

  // COLLECTION PAGES (variant="left"):
  // px-8       = horizontal padding
  // flex       = flexbox container
  // items-end  = push content to bottom
  // mt-24      = top margin (96px) for navbar
  // pb-16      = bottom padding (64px)
  // HEIGHT: set via inline style (640px) because Tailwind arbitrary values not generated from packages
  const leftVariantClasses = 'px-8 flex items-center mt-24 pb-16'

  // OTHER PAGES (variant="centered"):
  // pt-24 pb-24       = vertical padding mobile
  // lg:pt-36 lg:pb-36 = vertical padding desktop
  // mt-24             = top margin for navbar
  const centeredVariantClasses = 'pt-24 pb-24 lg:pt-36 lg:pb-36 mt-24'

  return (
    // ============================================================
    // OUTER WRAPPER <section>
    // - w-full = full width
    // - IF variant="left" → use leftVariantClasses + inline style for height (640px)
    // - IF variant="centered" → use centeredVariantClasses (padding-based height)
    // ============================================================
    <section
      className={`w-full ${isLeft ? leftVariantClasses : centeredVariantClasses} ${className}`.trim()}
      style={isLeft ? { height: '600px' } : undefined}
    >

      {/* ============================================================
          CONTAINER - limits the max width
          - mx-auto = center horizontally
          - w-full = full width up to max
          - IF variant="left" → max 1200px wide
          - IF variant="centered" → max 1400px wide
          ============================================================ */}
      <div className={`mx-auto w-full ${isLeft ? 'max-w-[1200px]' : 'max-w-[1400px]'}`}>

        {/* ============================================================
            CONTENT BOX - holds badge, title, description
            - flex flex-col = stack items vertically
            - IF variant="left" → text aligned LEFT
            - IF variant="centered" → text aligned CENTER
            ============================================================ */}
        <div className={`flex flex-col ${isLeft ? 'items-start text-left space-y-4' : 'items-center text-center space-y-6'}`}>

          {/* BADGE PILL */}
          {badge && (
            <Pill variant={badgeVariant}>{badge}</Pill>
          )}

          <h1
            className={`${titleClassName !== undefined ? titleClassName : 'kol-display-lg text-auto'} ${titleFontStyle === 'italic' ? 'italic' : ''}`.trim()}
            style={titleFontFamily ? { fontFamily: titleFontFamily } : undefined}
          >
            {title}
          </h1>

          {!isLeft && <div className="w-32 h-[1px] bg-fg-24" />}

          {description && (
            <p className="kol-mono-text text-fg-64 max-w-[700px]">
              {description}
            </p>
          )}

          {buttons && buttons.length > 0 && (
            <div className={`flex flex-col ${isLeft ? 'items-start' : 'items-center'} gap-2 pt-4`}>
              <ButtonGroup buttons={buttons} align={isLeft ? 'left' : 'center'} />
              {footerText && (
                <p className="kol-mono-xs text-auto opacity-64 pt-4">
                  {footerText}
                </p>
              )}
            </div>
          )}

          {!buttons && categories.length > 0 && (
            <div className={`flex flex-wrap gap-3 pt-4 ${isLeft ? 'justify-start' : ''}`}>
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
