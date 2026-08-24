import { useEffect, useCallback, useRef } from 'react'
import { Icon } from '@kolkrabbi/kol-icons'
import { Tooltip } from '@kolkrabbi/kol-component'

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
      <Tooltip label="Close lightbox" triggerClassName="absolute top-4 right-4 z-10 inline-flex">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-fg-04 transition-colors hover:bg-fg-08 cursor-pointer"
          aria-label="Close lightbox"
        >
          <Icon name="x" size={20} />
        </button>
      </Tooltip>

      {/* Prev */}
      {media.length > 1 && (
        <Tooltip label="Previous" triggerClassName="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-fg-04 hover:bg-fg-08 transition-colors cursor-pointer"
            aria-label="Previous"
          >
            <Icon name="chevron-left" size={20} />
          </button>
        </Tooltip>
      )}

      {/* Next */}
      {media.length > 1 && (
        <Tooltip label="Next" triggerClassName="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-fg-04 hover:bg-fg-08 transition-colors cursor-pointer"
            aria-label="Next"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </Tooltip>
      )}

      {/* Media */}
      <div className="max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        {isVid ? (
          <video
            src={src}
            poster={b2Poster(src)}
            aria-hidden="true"
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
