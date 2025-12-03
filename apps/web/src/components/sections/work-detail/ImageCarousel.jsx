import { useState, useRef } from 'react'
import SanityImage from '../../media/SanityImage'

export default function ImageCarousel({ images = [], projectTitle }) {
  // Filter out any invalid images (missing asset or url)
  const validImages = images.filter(img => img?.asset || img?.url)

  const [currentIndex, setCurrentIndex] = useState(5)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [prevTranslate, setPrevTranslate] = useState(0)
  const sliderRef = useRef(null)

  if (!validImages || validImages.length === 0) return null

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  const getPositionX = (event) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }

  const handleDragStart = (event) => {
    event.preventDefault()
    setIsDragging(true)
    setStartX(getPositionX(event))
    setCurrentTranslate(0)
    setPrevTranslate(0)
  }

  const handleDragMove = (event) => {
    if (!isDragging) return
    event.preventDefault()
    const currentPosition = getPositionX(event)
    const diff = currentPosition - startX
    const containerWidth = sliderRef.current?.offsetWidth || 1
    const percentageMoved = (diff / containerWidth) * 100
    setCurrentTranslate(percentageMoved)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    // If moved more than 20% of slide width, go to next/prev
    if (currentTranslate < -20) {
      handleNext()
    } else if (currentTranslate > 20) {
      handlePrev()
    }

    // Reset
    setCurrentTranslate(0)
  }

  const getTransform = () => {
    const baseTranslate = -currentIndex * 100
    if (isDragging) {
      return `translateX(${baseTranslate + currentTranslate}%)`
    }
    return `translateX(${baseTranslate}%)`
  }

  return (
    <div className="hidden md:block relative w-full h-[80vh] overflow-hidden">
      {/* Carousel Wrapper */}
      <div
        ref={sliderRef}
        className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className={`flex w-full h-full items-center ${isDragging ? '' : 'transition-transform duration-500 ease-out'}`}
          style={{
            transform: getTransform(),
          }}
        >
          {validImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full flex items-center justify-center md:px-16 pointer-events-none select-none"
            >
              <div className="w-full md:max-w-[70%] aspect-[3/2] rounded overflow-hidden">
                <SanityImage
                  image={image}
                  alt={image?.alt || `Project image ${index + 1}`}
                  width={1400}
                  height={933}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="carousel-nav-button absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-fg-inverse-16 transition-colors"
        aria-label="Previous image"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="carousel-nav-button absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-fg-inverse-16 transition-colors"
        aria-label="Next image"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Indicator Dots */}
      {validImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-fg-64 w-6'
                  : 'bg-fg-24'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .carousel-nav-button:hover {
          background-color: color-mix(in srgb, var(--kol-surface-on-inverse) 32%, transparent);
        }
      `}</style>
    </div>
  )
}
