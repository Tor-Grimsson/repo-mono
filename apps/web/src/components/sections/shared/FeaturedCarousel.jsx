import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@kolkrabbi/kol-component'
import CarouselNavigation from '../../ui/CarouselNavigation.jsx'
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
  showTitle = true,
  showDescription = true,
  showButton = true,
  showHeader = true,
  fullWidth = false,
  rounded = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  titleClassName = '',
  descriptionClassName = '',
  children,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  const handlePrevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  // Autoplay — use fixed interval only for image slides; video slides advance on 'ended'
  const timerRef = useRef(null)
  const currentItem = items[currentSlide]
  const currentHasVideo = !!currentItem?.video

  const advanceSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  useEffect(() => {
    if (!autoPlay || items.length <= 1 || currentHasVideo) return
    timerRef.current = setInterval(advanceSlide, autoPlayInterval)
    return () => clearInterval(timerRef.current)
  }, [autoPlay, autoPlayInterval, items.length, currentSlide, currentHasVideo])

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
      ? 'text-[48px] sm:text-[64px] md:text-[88px] lg:text-[120px]'
      : 'text-[56px] sm:text-[80px] md:text-[110px] lg:text-[144px]'

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
      <div className={`relative w-full ${height} overflow-hidden bg-surface-secondary${rounded ? ' rounded border border-fg-08' : ''}`}>
        {/* Background Video (HLS) */}
        {item.video && (
          <HlsVideo
            src={item.video}
            poster={item.image}
            className="absolute left-0 top-0 size-full object-cover object-center"
            onEnded={autoPlay && items.length > 1 ? advanceSlide : undefined}
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
        <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
          <div className="flex flex-col items-center text-center gap-6 px-6 py-8 rounded-[2px]" style={{ backgroundColor: 'color-mix(in srgb, var(--kol-surface-primary) 80%, transparent)', backdropFilter: 'blur(1px)' }}>
            {/* Title */}
            {shouldShowTitle && displayName && (
              <div className="w-full flex justify-center">
                {titleContent}
              </div>
            )}

            {/* Subtitle */}
            {item.subtitleSecondary && (
              <span className="kol-mono-10 text-fg-64">{item.subtitleSecondary}</span>
            )}

            {/* Description */}
            {shouldShowDescription && item.description && (
              <p className={`kol-mono-10 text-auto max-w-[600px] ${itemDescriptionClassName}`}>{item.description}</p>
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
      </div>
    )
  }

  if (items.length === 0) return null

  return (
    <section className={`w-full${fullWidth ? '' : ' py-16'}`}>
      {/* Preload all slide images */}
      <div className="hidden">
        {items.map((item, i) => item.image && (
          <img key={i} src={item.image} alt="" />
        ))}
      </div>
      <div className={fullWidth ? '' : 'max-w-[1400px] mx-auto'}>
        {showHeader && (
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="kol-label-mono-xs text-auto">{sectionLabel}</span>
              <span className="kol-mono-10 text-fg-64">
                {currentSlide + 1} / {items.length}
              </span>
            </div>
            <CarouselNavigation
              onPrevious={handlePrevSlide}
              onNext={handleNextSlide}
              iconSize={16}
            />
          </div>
        )}
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

          {/* Static overlay — does not slide with video */}
          {children && (
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="h-full flex items-start justify-center pt-[280px]">
                <div className="pointer-events-auto w-full">
                  {children}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCarousel
