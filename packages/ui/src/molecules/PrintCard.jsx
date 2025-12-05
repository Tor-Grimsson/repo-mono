import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * PrintCard - Product card for the print store
 * Clean, minimal design with title header and large image area
 *
 * @param {Object} print - The print data object
 * @param {string} className - Additional CSS classes
 */
export default function PrintCard({ print, className = '' }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageLoaded(false)
  }, [print?.image])

  const primaryPrice = useMemo(() => {
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

  const secondaryPrice = useMemo(() => {
    if (typeof print?.priceISK !== 'number') return null
    try {
      return new Intl.NumberFormat('is-IS', {
        style: 'currency',
        currency: 'ISK',
        maximumFractionDigits: 0
      }).format(print.priceISK)
    } catch {
      return `${print.priceISK} ISK`
    }
  }, [print?.priceISK])

  const editionLabel = print?.edition === 'open'
    ? 'Open edition'
    : print?.edition?.startsWith('limited-')
      ? `Limited edition of ${print.edition.replace('limited-', '')}`
      : print?.edition

  return (
    <Link
      to={`/prints/${print.slug}`}
      className={`group block ${className}`}
    >
      <article className="mx-auto max-w-[1400px] px-6 md:px-8 py-12 border-b border-fg-08">
        <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded bg-surface-secondary">
            {print.image ? (
              <img
                src={print.image}
                alt={print.name}
                className={`size-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
            ) : (
              <div className="size-full flex items-center justify-center">
                <span className="kol-mono-sm text-fg-24">No image</span>
              </div>
            )}
            <div className="absolute inset-0 border border-fg-08/40 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4">
            <p className="kol-mono-xs uppercase tracking-[0.35em] text-fg-48">
              {print.category}
            </p>
            <h3 className="kol-display-sm text-auto">{print.name}</h3>
            <p className="kol-mono-text text-fg-64 max-w-[520px]">
              {print.description}
            </p>

            <div className="flex flex-wrap items-baseline gap-3">
              {primaryPrice && <span className="kol-heading-md">{primaryPrice}</span>}
              {secondaryPrice && (
                <span className="kol-mono-sm text-fg-48">
                  ({secondaryPrice})
                </span>
              )}
            </div>

            {editionLabel && (
              <span className="kol-mono-xs uppercase tracking-[0.2em] text-fg-48">
                {editionLabel}
              </span>
            )}

            <div className="flex items-center gap-2 text-fg-64 group-hover:text-fg-primary transition-colors">
              <span className="kol-mono-sm">View details</span>
              <span aria-hidden="true" className="text-lg">↗</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
