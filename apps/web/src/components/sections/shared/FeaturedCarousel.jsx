import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CarouselNavigation, Button } from '@kol/ui'
import HlsVideo from '../../media/HlsVideo'

/**
 * FeaturedCarousel Component
 *
 * Unified carousel for featured typefaces/specimens across foundry pages
 *
 * @param {Object} props
 * @param {Array} props.items - Array of carousel items:
 *   - title, subtitle, subtitleSecondary, description, image, video, href
 *   - titleClassName, descriptionClassName, buttonLabel (per-item overrides)
 *   - showTitle, showDescription, showButton (per-item visibility)
 * @param {string} props.sectionLabel - Label for the carousel section
 * @param {string} props.buttonLabel - Default CTA button label
 * @param {string} props.height - Height classes for carousel
 * @param {Function} props.renderTitle - Optional custom title renderer
 * @param {number} props.autoplayInterval - Auto-advance interval in ms
 * @param {boolean} props.showTitle - Global show/hide title (default: true)
 * @param {boolean} props.showDescription - Global show/hide description (default: true)
 * @param {boolean} props.showButton - Global show/hide CTA button (default: true)
 * @param {string} props.titleClassName - Default title className
 * @param {string} props.descriptionClassName - Default description className
 */
const FeaturedCarousel = ({
  items = [],
  sectionLabel = 'Featured',
  buttonLabel = 'Explore Typeface',
  height = 'h-[440px] md:h-[640px]',
  renderTitle,
  autoplayInterval = 5000,
  showTitle = true,
  showDescription = true,
  showButton = true,
  titleClassName = '',
  descriptionClassName = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  // Auto-advance carousel
  useEffect(() => {
    if (items.length === 0) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % items.length)
    }, autoplayInterval)
    return () => clearInterval(timer)
  }, [items.length, autoplayInterval])

  const handlePrevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0
    })
  }

  const renderCarouselContent = (item) => {
    // Resolve visibility (per-item overrides global)
    const shouldShowTitle = item.showTitle ?? showTitle
    const shouldShowDescription = item.showDescription ?? showDescription
    const shouldShowButton = item.showButton ?? showButton

    // Resolve classNames (per-item overrides global)
    const itemTitleClassName = item.titleClassName || titleClassName
    const itemDescriptionClassName = item.descriptionClassName || descriptionClassName
    const itemButtonLabel = item.buttonLabel || buttonLabel

    // Default typeface title rendering with font-specific sizing
    const displayName = item.displayText || item.title
    const defaultTitleClass = (displayName === 'Málrómur' || displayName === 'Tröllatunga')
      ? 'text-[88px] md:text-[120px]'
      : 'text-[110px] md:text-[144px]'

    const titleContent = renderTitle ? renderTitle(item) : (
      <span
        className={`${itemTitleClassName || defaultTitleClass} block text-auto leading-none`}
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
      <div className={`relative w-full ${height} rounded overflow-hidden bg-container-primary border border-fg-08`}>
        {/* Background Video (HLS) */}
        {item.video && (
          <HlsVideo
            src={item.video}
            poster={item.image}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        )}
        {/* Background Image (fallback when no video) */}
        {!item.video && item.image && (
          <img
            src={item.image}
            alt=""
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        )}

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 w-full h-full p-6">
          {/* Title */}
          {shouldShowTitle && displayName && (
            <div className="w-full flex justify-center">
              {titleContent}
            </div>
          )}

          {/* Subtitle */}
          {item.subtitleSecondary && (
            <div className="flex flex-col gap-2 text-center">
              <span className="kol-mono-xs text-fg-64">{item.subtitleSecondary}</span>
            </div>
          )}

          {/* Description */}
          {shouldShowDescription && item.description && (
            <p className={`kol-mono-xs text-auto max-w-[600px] ${itemDescriptionClassName}`}>{item.description}</p>
          )}

          {/* CTA Button */}
          {shouldShowButton && item.href && (
            <Link to={item.href}>
              <Button variant="primary" size="sm">
                {itemButtonLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  }

  if (items.length === 0) return null

  return (
    <section className="w-full py-16">
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
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {renderCarouselContent(items[currentSlide])}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCarousel
