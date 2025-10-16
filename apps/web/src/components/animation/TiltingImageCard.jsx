import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * TiltingImageCard
 *
 * Image card with 3D tilt effect and cursor-following mask overlay.
 * Extracted from Story section on homepage.
 *
 * @param {string} imageUrl - URL of the image to display
 * @param {string} maskUrl - URL of the SVG mask (default: /svg/mask.svg)
 * @param {string} className - Additional classes for the container
 */
export default function TiltingImageCard({
  imageUrl,
  maskUrl = '/svg/mask.svg',
  className = ''
}) {
  const imageRef = useRef(null)
  const overlayRef = useRef(null)

  useLayoutEffect(() => {
    gsap.set(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 500,
    })
    gsap.set(overlayRef.current, { '--x': '50%', '--y': '50%' })
  }, [])

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: 'power1.inOut',
    })
  }

  const handleMove = (e) => {
    const imageEl = imageRef.current
    const overlayEl = overlayRef.current
    if (!imageEl || !overlayEl) return

    const isTouchEvent = e.type.startsWith('touch')
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY

    const rect = e.currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Update mask position
    gsap.set(overlayEl, {
      '--x': `${x}px`,
      '--y': `${y}px`,
    })

    // Apply 3D tilt on mouse events only
    if (!isTouchEvent) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10
      gsap.to(imageEl, {
        duration: 0.5,
        rotateX,
        rotateY,
        ease: 'power1.out',
      })
    }
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
    >
      {/* Layer 1: The Image (gets transformed with 3D tilt) */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Tilting card"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2: The Overlay (cursor-following mask) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: 'transparent',
          maskImage: `url(${maskUrl})`,
          WebkitMaskImage: `url(${maskUrl})`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: '500px 625px',
          WebkitMaskSize: '500px 625px',
          maskPosition: 'var(--x) var(--y)',
          WebkitMaskPosition: 'var(--x) var(--y)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />
    </div>
  )
}
