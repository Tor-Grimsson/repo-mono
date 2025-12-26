import { useState, useMemo, useRef } from 'react'

/**
 * PrintGridCard - Compact card for print grid display
 * Minimal design: Image + Title + Price
 *
 * @param {Object} print - The print data object
 * @param {Function} onCardClick - Callback with (rect, slug) when card is clicked
 * @param {string} className - Additional CSS classes
 */
export default function PrintGridCard({ print, onCardClick, isFlipped = false, className = '' }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef(null)

  const formattedPrice = useMemo(() => {
    if (typeof print?.price !== 'number') return null
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: print?.currency || 'EUR',
        maximumFractionDigits: 0
      }).format(print.price)
    } catch {
      return `${print.price} ${print?.currency || 'EUR'}`
    }
  }, [print?.price, print?.currency])

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
      className={`group block cursor-pointer ${className}`}
    >
      <article>
        {/* Image */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded bg-surface-secondary"
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
                className={`size-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
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
        </div>

        {/* Content */}
        <div className="pt-4 space-y-1">
          <h3 className="kol-heading-sm text-fg-primary group-hover:text-accent-primary transition-colors">
            {print.name}
          </h3>
          {formattedPrice && (
            <p className="kol-mono-sm text-fg-64">{formattedPrice}</p>
          )}
        </div>
      </article>
    </div>
  )
}
