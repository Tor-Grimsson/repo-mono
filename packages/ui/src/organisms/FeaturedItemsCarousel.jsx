import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CarouselNavigation from '../molecules/CarouselNavigation'
import Pill from '../atoms/Pill'
import LinkWithIcon from '../atoms/LinkWithIcon'

/**
 * FeaturedItemsCarousel - Organism
 *
 * A rotating carousel for featured items with auto-rotation and manual navigation.
 * Displays items with metadata, content preview, and call-to-action.
 *
 * @param {Object} props
 * @param {Array} props.items - Array of items to display in carousel
 * @param {Function} props.renderContent - Function to render item content: (item) => ReactNode
 * @param {boolean} [props.autoRotate=true] - Enable auto-rotation
 * @param {number} [props.interval=5000] - Auto-rotation interval in milliseconds
 * @param {string} [props.counterLabel='Featured Work'] - Label for the counter section
 * @param {string} [props.className] - Additional CSS classes for container
 * @param {Object} [props.layout] - Layout configuration
 * @param {string} [props.layout.contentHeight='500px'] - Fixed height for content area
 *
 * @example
 * <FeaturedItemsCarousel
 *   items={featuredItems}
 *   renderContent={(item) => {
 *     if (item.type === 'video') {
 *       return <video src={item.videoUrl} autoPlay loop muted />
 *     }
 *     return <img src={item.imageUrl} alt={item.name} />
 *   }}
 *   autoRotate={true}
 *   interval={5000}
 * />
 *
 * Item structure:
 * {
 *   name: string,           // Item title
 *   type: string,           // Item type (for badge)
 *   subtitle: string,       // Item subtitle
 *   description: string,    // Item description
 *   route: string,          // Link destination
 *   linkLabel: string,      // Optional: Custom link text (default: "View Collection")
 *   badgeVariant: string,   // Optional: Pill variant (default: "subtle")
 *   badgeSize: string,      // Optional: Pill size (default: "sm")
 *   // ... any custom fields for renderContent
 * }
 */
const FeaturedItemsCarousel = ({
  items = [],
  renderContent,
  autoRotate = true,
  interval = 5000,
  counterLabel = 'Featured Work',
  className = '',
  layout = {}
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Preload all carousel images on mount
  useEffect(() => {
    items.forEach((item) => {
      const bg = item.layout?.backgroundImage
      if (bg) {
        const img = new Image()
        img.src = typeof bg === 'string' ? bg : bg.src
      }
      if (item.imageUrl) {
        const img = new Image()
        img.src = typeof item.imageUrl === 'string' ? item.imageUrl : item.imageUrl.src
      }
    })
  }, [items])
  const defaultLayout = {
    contentHeight: '500px',
    variant: 'classic'
  }

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoRotate || items.length === 0) return

    const rotationInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length)
    }, interval)

    return () => clearInterval(rotationInterval)
  }, [items.length, autoRotate, interval])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  }

  if (items.length === 0) {
    return null
  }

  const currentItem = items[currentSlide]
  const resolvedLayout = {
    ...defaultLayout,
    ...layout,
    ...(currentItem?.layout || {})
  }
  const currentVariant = resolvedLayout.variant

  const renderHeroCard = () => {
    const {
      contentHeight,
      backgroundImage,
      reverse,
      mediaFill,
      mediaShift,
      textOverlay,
      simple,
      simpleReverse,
      videoFill,
      geoCard,
      darkCircle
    } = resolvedLayout

    const textContent = (
      <>
        <div className="w-fit">
          <Pill
            variant={currentItem.badgeVariant || 'subtle'}
            size={currentItem.badgeSize || 'sm'}
            className="bg-surface-auto-inverse text-harp"
          >
            {currentItem.type}
          </Pill>
        </div>
        <h2 className="kol-heading-xl text-surface-auto-inverse">
          {currentItem.name || currentItem.title}
        </h2>
        {currentItem.subtitle && (
          <p className="kol-text-compact-xl text-surface-auto-inverse/70">
            {currentItem.subtitle}
          </p>
        )}
        {currentItem.description && (
          <p className="kol-mono-text-lg text-surface-auto-inverse/60">
            {currentItem.description}
          </p>
        )}
        <div className="h-[1px] w-20 bg-surface-auto-inverse/30" />
      </>
    )

    const mediaBlock = (
      <div className={`relative w-full ${mediaFill ? 'h-full' : 'max-w-[520px]'}`}>
        <div
          className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
            mediaFill ? 'h-full w-full' : ''
          }`}
        >
          {renderContent && renderContent(currentItem)}
        </div>
      </div>
    )

    const CardTag = currentItem.route ? 'a' : 'div'
    const isDarkCard = resolvedLayout.darkCard
    if (simple) {
      // Split-panel card layout: left panel (logo + text) | right panel (grid/image)
      return (
        <CardTag
          {...(CardTag === 'a'
            ? { href: currentItem.route, className: undefined }
            : null)}
          className={`group relative block overflow-hidden rounded border border-fg-08 ${
            isDarkCard ? 'bg-surface-primary text-auto' : 'bg-surface-inverse text-auto'
          }`}
        >
          <div className="relative flex w-full simple-card">
            {/* Background image - fills entire card */}
            <div className="absolute inset-0">
              {backgroundImage ? (
                <img
                  src={typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src}
                  srcSet={typeof backgroundImage === 'object' ? backgroundImage.srcset : undefined}
                  sizes={typeof backgroundImage === 'object' ? backgroundImage.sizes : undefined}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-surface-secondary" />
              )}
            </div>

            {/* Text fixed bottom-left */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 flex flex-col gap-0">
              <div className="kol-heading-md md:kol-heading-lg">
                {currentItem.name}
              </div>
              {currentItem.subtitle && (
                <div className="kol-mono-xs md:kol-mono-text">
                  {currentItem.subtitle}
                </div>
              )}
            </div>

            {/* Logo circle - centered on mobile, left side on desktop */}
            {renderContent && renderContent(currentItem) && (
              <div className="absolute inset-0 md:left-0 md:right-auto md:w-1/2 z-10 flex items-center justify-center md:pl-12">
                <div
                  className={`flex items-center justify-center rounded-full mb-16 md:mb-8 ${
                    darkCircle
                      ? 'bg-opacity-hex-96'
                      : isDarkCard
                        ? 'bg-surface-primary'
                        : 'bg-container-primary'
                  }`}
                  style={{ width: 'min(200px, 60vw)', height: 'min(200px, 60vw)' }}
                >
                  {renderContent(currentItem)}
                </div>
              </div>
            )}
          </div>
          <style>{`
            .simple-card { aspect-ratio: 4 / 5; }
            @media (min-width: 768px) {
              .simple-card { aspect-ratio: 16 / 7; }
            }
          `}</style>
        </CardTag>
      )
    }

    if (simpleReverse) {
      // Reverse split-panel card: content on right, text bottom-right
      return (
        <CardTag
          {...(CardTag === 'a'
            ? { href: currentItem.route, className: undefined }
            : null)}
          className={`group relative block overflow-hidden rounded border border-fg-08 ${
            isDarkCard ? 'bg-surface-primary text-auto' : 'bg-surface-inverse text-auto'
          }`}
        >
          <div className="relative flex w-full simple-card">
            {/* Background image - fills entire card */}
            <div className="absolute inset-0">
              {backgroundImage ? (
                <img
                  src={typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src}
                  srcSet={typeof backgroundImage === 'object' ? backgroundImage.srcset : undefined}
                  sizes={typeof backgroundImage === 'object' ? backgroundImage.sizes : undefined}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-surface-secondary" />
              )}
            </div>

            {/* Text fixed bottom-right (bottom-left on mobile) */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-auto md:right-8 z-10 flex flex-col gap-0 md:text-right">
              <div className="kol-heading-md md:kol-heading-lg">
                {currentItem.name}
              </div>
              {currentItem.subtitle && (
                <div className="kol-mono-xs md:kol-mono-text">
                  {currentItem.subtitle}
                </div>
              )}
            </div>

            {/* Content circle - centered on mobile, right side on desktop */}
            <div className="absolute inset-0 md:right-0 md:left-auto md:w-1/2 z-10 flex items-center justify-center md:pr-12">
              <div
                className={`flex items-center justify-center rounded-full mb-16 md:mb-8 ${
                  isDarkCard ? 'bg-surface-primary' : 'bg-container-primary'
                }`}
                style={{ width: 'min(200px, 60vw)', height: 'min(200px, 60vw)' }}
              >
                {renderContent && renderContent(currentItem)}
              </div>
            </div>
          </div>
          <style>{`
            .simple-card { aspect-ratio: 4 / 5; }
            @media (min-width: 768px) {
              .simple-card { aspect-ratio: 16 / 7; }
            }
          `}</style>
        </CardTag>
      )
    }

    if (geoCard) {
      // Geo card: 560px tall graphic frame with square content
      return (
        <CardTag
          {...(CardTag === 'a'
            ? { href: currentItem.route, className: undefined }
            : null)}
          className="group relative block overflow-hidden rounded border border-fg-08 bg-surface-primary"
        >
          <div className="relative flex w-full simple-card">
            {/* Background image - fills entire card */}
            <div className="absolute inset-0">
              {backgroundImage ? (
                <img
                  src={typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src}
                  srcSet={typeof backgroundImage === 'object' ? backgroundImage.srcset : undefined}
                  sizes={typeof backgroundImage === 'object' ? backgroundImage.sizes : undefined}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-surface-secondary" />
              )}
            </div>

            {/* Text fixed bottom-left */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 flex flex-col gap-0">
              <div className="kol-heading-md md:kol-heading-lg">
                {currentItem.name}
              </div>
              {currentItem.subtitle && (
                <div className="kol-mono-xs md:kol-mono-text">
                  {currentItem.subtitle}
                </div>
              )}
            </div>

            {/* Graphic frame - responsive, centered on mobile, right side on desktop */}
            <div className="absolute top-0 bottom-0 left-0 right-0 md:left-auto md:w-1/2 z-10 flex items-center justify-center md:pr-12">
              <div className="flex items-center justify-center rounded-[4px] md:rounded-lg bg-container-primary p-4 md:p-12 mb-16 md:mb-0 geoCardFrame">
                {renderContent && renderContent(currentItem)}
              </div>
            </div>
          </div>
          <style>{`
            .simple-card { aspect-ratio: 4 / 5; }
            @media (min-width: 768px) {
              .simple-card { aspect-ratio: 16 / 7; }
            }
            .geoCardFrame { width: 180px; height: 180px; }
            @media (min-width: 768px) { .geoCardFrame { width: 448px; height: 448px; } }
          `}</style>
        </CardTag>
      )
    }

    if (videoFill) {
      // Full video/image card with centered title and subtitle
      return (
        <CardTag
          {...(CardTag === 'a'
            ? { href: currentItem.route, className: undefined }
            : null)}
          className="group relative block overflow-hidden rounded border border-fg-08"
        >
          <div className="relative flex w-full simple-card">
            {/* Media background - fills entire card */}
            <div className="absolute inset-0">
              {currentItem.videoUrl ? (
                <video
                  src={currentItem.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : currentItem.imageUrl ? (
                <img
                  src={typeof currentItem.imageUrl === 'string' ? currentItem.imageUrl : currentItem.imageUrl.src}
                  srcSet={typeof currentItem.imageUrl === 'object' ? currentItem.imageUrl.srcset : undefined}
                  sizes={typeof currentItem.imageUrl === 'object' ? currentItem.imageUrl.sizes : undefined}
                  alt={currentItem.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-surface-secondary" />
              )}
            </div>

            {/* Text fixed bottom-left */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 flex flex-col gap-0">
              <div className="kol-heading-md md:kol-heading-lg text-light-fixed">
                {currentItem.name}
              </div>
              {currentItem.subtitle && (
                <div className="kol-mono-xs md:kol-mono-text text-light-fixed/80">
                  {currentItem.subtitle}
                </div>
              )}
            </div>
          </div>
          <style>{`
            .simple-card { aspect-ratio: 4 / 5; }
            @media (min-width: 768px) {
              .simple-card { aspect-ratio: 16 / 7; }
            }
          `}</style>
        </CardTag>
      )
    }

    const heroInner = textOverlay ? (
      <div className="relative z-10" style={{ minHeight: contentHeight }}>
        <div
          className={`flex h-full items-center px-6 lg:px-16 ${
            reverse ? 'justify-start' : 'justify-end'
          }`}
          style={
            mediaShift
              ? reverse
                ? { paddingLeft: mediaShift }
                : { paddingRight: mediaShift }
              : undefined
          }
        >
          {mediaBlock}
        </div>
        <div className="pointer-events-auto absolute bottom-0 left-0 max-w-2xl px-6 pb-6 lg:px-16 lg:pb-12">
          <div className="space-y-4">
            {textContent}
          </div>
        </div>
      </div>
    ) : (
      <div
        className="relative z-10 grid gap-8 lg:grid-cols-12"
        style={{ minHeight: contentHeight }}
      >
        <div
          className={`col-span-12 flex flex-col justify-end gap-4 p-8 lg:col-span-5 lg:p-12 ${
            reverse ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'
          }`}
        >
          {textContent}
        </div>
        <div
          className={`col-span-12 flex items-center justify-center p-6 lg:col-span-7 lg:p-12 ${
            reverse ? 'lg:order-1' : 'lg:order-2'
          }`}
          style={
            mediaShift
              ? reverse
                ? { marginRight: mediaShift }
                : { marginLeft: mediaShift }
              : undefined
          }
        >
          {mediaBlock}
        </div>
      </div>
    )

    return (
      <CardTag
        {...(CardTag === 'a'
          ? { href: currentItem.route, className: undefined }
          : null)}
        className="group relative block overflow-hidden rounded-[32px] border border-fg-08 bg-surface-primary"
      >
        <div className="absolute inset-0">
          {backgroundImage ? (
            <img
              src={typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src}
              srcSet={typeof backgroundImage === 'object' ? backgroundImage.srcset : undefined}
              sizes={typeof backgroundImage === 'object' ? backgroundImage.sizes : undefined}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-surface-primary/90 via-surface-secondary/50 to-surface-primary/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-surface-primary/95 via-surface-primary/60 to-surface-primary/30" />
        </div>
        {heroInner}
      </CardTag>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header with counter and navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="kol-label-mono-xs text-auto">{counterLabel}</span>
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

      {/* Carousel content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.15 }}
          >
            {currentVariant === 'hero' ? (
              renderHeroCard()
            ) : (
              <div className="rounded bg-container-primary p-12 lg:p-16">
                <div
                  className="grid grid-cols-1 gap-12 lg:grid-cols-2"
                  style={{ minHeight: resolvedLayout.contentHeight }}
                >
                  <div className="flex flex-col justify-center space-y-6">
                    <div className="w-fit">
                      <Pill
                        variant={currentItem.badgeVariant || 'subtle'}
                        size={currentItem.badgeSize || 'sm'}
                      >
                        {currentItem.type}
                      </Pill>
                    </div>

                    <h2 className="kol-heading-xl text-auto">
                      {currentItem.name || currentItem.title}
                    </h2>

                    {currentItem.subtitle && (
                      <p className="kol-text-compact-xl text-fg-80">
                        {currentItem.subtitle}
                      </p>
                    )}

                    {currentItem.description && (
                      <p className="kol-mono-text-lg text-fg-64">
                        {currentItem.description}
                      </p>
                    )}

                    <div className="h-[1px] w-16 bg-fg-24" />

                    <LinkWithIcon to={currentItem.route}>
                      {currentItem.linkLabel || 'View Collection'}
                    </LinkWithIcon>
                  </div>

                  <div
                    className="flex items-center justify-center overflow-hidden rounded-[4px] bg-surface-primary"
                    style={{ height: resolvedLayout.contentHeight }}
                  >
                    {renderContent && renderContent(currentItem)}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FeaturedItemsCarousel
