import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, Pill } from '../atoms'

/**
 * PrintCard - Product card for the print store
 * Displays print artwork with price, edition info, and hover details
 *
 * @param {Object} print - The print data object
 * @param {boolean} showPrice - Whether to show price on card
 * @param {string} className - Additional CSS classes
 */
export default function PrintCard({ print, showPrice = true, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const isLimited = print.edition && print.edition.startsWith('limited')

  const formatPrice = (price) => `€${price}`

  const formatEdition = (edition) => {
    if (edition === 'open') return null
    if (edition.startsWith('limited-')) {
      const num = edition.replace('limited-', '')
      return `Ed. ${num}`
    }
    return edition
  }

  return (
    <Link
      to={`/prints/${print.slug}`}
      className={`group relative aspect-[3/4] bg-surface-secondary border border-auto rounded overflow-hidden hover:border-hover transition-all duration-300 block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="absolute inset-0">
        {print.image && (
          <img
            src={print.image}
            alt={print.name}
            className={`size-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        {/* Placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface-tertiary animate-pulse" />
        )}
      </div>

      {/* Edition Badge - Always visible if limited */}
      {isLimited && (
        <div className="absolute top-3 left-3 z-20">
          <Pill variant="inverse" size="sm">
            {formatEdition(print.edition)}
          </Pill>
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 p-4 flex flex-col justify-end">
        {/* Title and Price - Always visible */}
        <div className="space-y-1">
          <h3 className="kol-mono-text text-white font-medium">
            {print.name}
          </h3>
          {showPrice && (
            <p className="kol-mono-sm text-white/80">
              {formatPrice(print.price)}
            </p>
          )}
        </div>

        {/* Additional Info - Visible on hover */}
        <div
          className={`mt-3 space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {print.description && (
            <p className="kol-mono-xs text-white/70 line-clamp-2">
              {print.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {print.category && (
              <Tag variant="light" size="sm">
                {print.category}
              </Tag>
            )}
            {print.year && (
              <Tag variant="muted" size="sm">
                {print.year}
              </Tag>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
