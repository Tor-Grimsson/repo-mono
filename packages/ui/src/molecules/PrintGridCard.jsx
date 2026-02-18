import { useState, useRef } from 'react'

/**
 * PrintGridCard - Compact card for print grid display
 * Minimal design: Image + Title + Starting price
 *
 * @param {Object} print - The print data object
 * @param {Function} onCardClick - Callback with (rect, slug) when card is clicked
 * @param {string} className - Additional CSS classes
 */
export default function PrintGridCard({ print, onCardClick, isFlipped = false, className = '' }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const handleClick = () => {
    if (cardRef.current && onCardClick) {
      const rect = cardRef.current.getBoundingClientRect()
      onCardClick({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }, print.slug)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`block cursor-pointer ${className}`}
    >
      <article>
        {/* Image with title overlay */}
        <div
          className="relative aspect-[1/1.41421] overflow-hidden rounded bg-surface-secondary"
          style={{
            perspective: '1000px'
          }}
        >
          <div
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s ease-out',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              width: '100%',
              height: '100%'
            }}
          >
            {print.image ? (
              <img
                src={print.image}
                alt={print.name}
                className={`size-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
            ) : (
              <div className="size-full flex items-center justify-center">
                <span className="kol-mono-sm text-fg-24">No image</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 border border-fg-08 pointer-events-none rounded" />

          {/* Dark overlay + title - revealed on hover */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300"
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              opacity: isHovered ? 1 : 0
            }}
          >
            <h3 className="kol-heading-sm text-white">
              {print.name}
            </h3>
            <p className="kol-mono-xs text-white/70">From €140</p>
          </div>
        </div>
      </article>
    </div>
  )
}
