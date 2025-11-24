import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CarouselNavigation, Button } from '@kol/ui'

/**
 * FeaturedCarousel Component
 *
 * Unified carousel for featured typefaces/specimens across foundry pages
 *
 * @param {Object} props
 * @param {Array} props.items - Array of carousel items with title, subtitle, description, image, href
 * @param {string} props.sectionLabel - Label for the carousel section (e.g., "Featured Typeface")
 * @param {string} props.buttonLabel - CTA button label (default: "Explore Typeface")
 * @param {string} props.height - Height classes for carousel (default: "h-[440px] md:h-[600px]")
 * @param {Function} props.renderTitle - Optional custom title renderer for font-specific styling
 * @param {number} props.autoplayInterval - Auto-advance interval in ms (default: 5000)
 */
const FeaturedCarousel = ({
  items = [],
  sectionLabel = 'Featured',
  buttonLabel = 'Explore Typeface',
  height = 'h-[440px] md:h-[640px]',
  renderTitle,
  autoplayInterval = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    if (items.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length)
    }, autoplayInterval)
    return () => clearInterval(timer)
  }, [items.length, autoplayInterval])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  const renderCarouselContent = (item) => {
    // Default typeface title rendering with font-specific sizing
    const displayName = item.displayText || item.title
    const titleContent = renderTitle ? renderTitle(item) : (
      <span
        className={`${
          (displayName === 'Málrómur' || displayName === 'Tröllatunga')
            ? 'text-[88px] md:text-[120px]'
            : 'text-[110px] md:text-[144px]'
        } block text-auto leading-none`}
        style={{
          fontFamily: item.fontFamily,
          fontStyle: item.fontStyle || 'normal',
          fontWeight: 400
        }}
      >
        {displayName}
      </span>
    )

    return (
      <div className={`relative w-full ${height} rounded overflow-hidden bg-container-primary`}>
        {/* Background Image */}
        {item.image && (
          <img
            src={item.image}
            alt=""
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        )}

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 w-full h-full p-6">
          {/* Title */}
          <div className="w-full flex justify-center">
            {titleContent}
          </div>

          {/* Subtitle */}
          {item.subtitleSecondary && (
            <div className="flex flex-col gap-2 text-center">
              <span className="kol-mono-xs text-fg-64">{item.subtitleSecondary}</span>
            </div>
          )}

          {/* Description */}
          {item.description && (
            <p className="kol-mono-xs text-auto max-w-[600px]">{item.description}</p>
          )}

          {/* CTA Button */}
          {item.href && (
            <Link to={item.href}>
              <Button variant="primary" size="sm">
                {buttonLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  }

  if (items.length === 0) return null

  return (
    <section className="w-full px-8 py-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="kol-label-mono-xs text-auto">{sectionLabel}</span>
            <span className="kol-mono-xs text-fg-64">
              {currentSlide + 1} / {items.length}
            </span>
          </div>
          <CarouselNavigation
            onPrevious={handlePrevSlide}
            onNext={handleNextSlide}
            iconSize={16}
          />
        </div>
        {renderCarouselContent(items[currentSlide])}
      </div>
    </section>
  )
}

export default FeaturedCarousel
