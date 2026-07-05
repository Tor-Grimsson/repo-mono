import { useEffect, useCallback, useRef } from 'react'
import { Icon } from '@kol/ui'

function isVideo(src) {
  return src?.endsWith('.mp4') || src?.endsWith('.mov') || src?.endsWith('.webm')
}

// B2-hosted work videos ship a sibling poster.jpg next to video.mp4.
function b2Poster(url) {
  return url?.includes('/video.mp4') ? url.replace('/video.mp4', '/poster.jpg') : undefined
}

export default function ImageLightbox({ media, index, onClose, onPrev, onNext }) {
  const touchStart = useRef(null)

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.stopImmediatePropagation()
      onClose()
    } else if (e.key === 'ArrowLeft') onPrev()
    else if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    // capture: true ensures this fires before WorkDetail's Escape handler
    document.addEventListener('keydown', handleKeyDown, true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const item = media[index]
  if (!item) return null

  const src = item.url
  const isVid = item._type === 'galleryVideo' || item._type === 'galleryHostedVideo' || isVideo(src)

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (delta > 50) onPrev()
    else if (delta < -50) onNext()
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-fg-04 transition-colors hover:bg-fg-08 cursor-pointer"
        aria-label="Close lightbox"
      >
        <Icon name="cross" size={20} />
      </button>

      {/* Prev */}
      {media.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-fg-04 hover:bg-fg-08 transition-colors cursor-pointer"
          aria-label="Previous"
        >
          <Icon name="chevron-left" size={20} />
        </button>
      )}

      {/* Next */}
      {media.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-fg-04 hover:bg-fg-08 transition-colors cursor-pointer"
          aria-label="Next"
        >
          <Icon name="chevron-right" size={20} />
        </button>
      )}

      {/* Media */}
      <div className="max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        {isVid ? (
          <video
            src={src}
            poster={b2Poster(src)}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            className="max-w-full max-h-[90vh] object-contain"
          />
        ) : (
          <img
            src={src}
            alt={item.alt || ''}
            className="max-w-full max-h-[90vh] object-contain"
          />
        )}
      </div>
    </div>
  )
}
