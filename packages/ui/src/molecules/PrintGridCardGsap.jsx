import { useState, useRef, useMemo, forwardRef } from 'react'

const PrintGridCardGsap = forwardRef(function PrintGridCardGsap({ print, onCardClick, className = '' }, ref) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef(null)

  const displayImage = useMemo(() => {
    const printMockup = print.detailImages?.[0]
    if (printMockup && Math.random() < 0.5) return printMockup
    return print.image
  }, [])

  const handleClick = () => {
    const el = cardRef.current
    if (el && onCardClick) {
      const rect = el.getBoundingClientRect()
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
      ref={(node) => {
        cardRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`block cursor-pointer ${className}`}
    >
      <article>
        <div className="relative aspect-[1/1.41421] overflow-hidden rounded bg-surface-secondary">
          {displayImage ? (
            <img
              src={displayImage}
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
          <div className="absolute inset-0 border border-fg-08 pointer-events-none rounded" />
        </div>
      </article>
    </div>
  )
})

export default PrintGridCardGsap
