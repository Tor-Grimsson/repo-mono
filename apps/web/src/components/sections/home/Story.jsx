import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import AnimatedTitle from '../../animation/AnimatedTitleStory'
import SectionHeader from '../../ui/SectionHeader'
import { Button } from '@kol/ui'

const Story = () => {
  const imageRef = useRef(null) // Ref for the image that gets tilted
  const overlayRef = useRef(null) // Ref for the overlay that has the mask

  useLayoutEffect(() => {
    // Set initial flat rotation for the image
    gsap.set(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 500,
    })
    // Set initial centered position for the mask on the overlay
    gsap.set(overlayRef.current, { '--x': '50%', '--y': '50%' })
  }, [])

  const handleMouseLeave = () => {
    // Reset the image rotation
    gsap.to(imageRef.current, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: 'power1.inOut',
    })
  }

  // This is the updated function to handle both mouse and touch events
  const handleMove = (e) => {
    const imageEl = imageRef.current
    const overlayEl = overlayRef.current
    if (!imageEl || !overlayEl) return

    // Determine if it's a touch event and get the coordinates
    const isTouchEvent = e.type.startsWith('touch')
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY

    const rect = e.currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Update the mask position on the overlay
    gsap.set(overlayEl, {
      '--x': `${x}px`,
      '--y': `${y}px`,
    })

    // Only apply 3D tilt on mouse events (not touch)
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
    <section
      id="type"
      className="relative w-screen"
    >
      <div className="flex size-full flex-col items-center lg:justify-center">
        {/* Mobile: show header above title */}
        <div className="lg:hidden flex-col items-center text-center">
          <SectionHeader className="text-[var(--foreground)]">
            Type Design
          </SectionHeader>
          <AnimatedTitle
            title="Develop a sleek &<br />timeless brand identity"
            sectionId="#story"
            containerClass="my-3 pointer-events-none relative z-10"
            style={{ color: 'var(--foreground)' }}
          />
        </div>

        {/* Mobile: vertical stack, Desktop: horizontal layout */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:items-center lg:px-12 lg:max-h-[80vh]">
          {/* Image container */}
          <div className="storyImgContainer">
            {/* This outer div handles mouse and touch events */}
            <div
              className="relative w-[60%] lg:w-[65%] max-w-2xl mx-auto aspect-[4/5]"
              onMouseMove={handleMove}
              onTouchMove={handleMove}
              onMouseLeave={handleMouseLeave}
              onTouchEnd={handleMouseLeave}
            >
              {/* Layer 1: The Image (gets transformed) */}
              <img
                ref={imageRef}
                src="/img/Kolk-img/trollatunga-2.png"
                alt="Story"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Layer 2: The Overlay (gets the moving mask) */}
              <div ref={overlayRef} className="storyOverlay" />
            </div>
          </div>

          {/* Desktop: right column with title + text */}
          <div className="relative w-full px-12 lg:px-0 mt-4 lg:mt-0">
            {/* Single container for header, title, and text */}
            <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left lg:gap-8 lg:w-full">
              {/* Desktop: section label + title stacked and left aligned */}
              <div className="hidden lg:flex w-full flex-col gap-6 lg:items-start">
                <SectionHeader className="inline-flex w-auto text-[var(--foreground)]">
                  Type Design
                </SectionHeader>
                <div className="w-full">
                  <AnimatedTitle
                    title="Develop a sleek &<br />timeless brand identity"
                    sectionId="#story"
                    containerClass="pointer-events-none relative z-10 w-full items-center lg:items-start text-center lg:text-left lg:px-0"
                    lineClass="w-full lg:justify-start lg:items-start"
                    style={{ color: 'var(--foreground)' }}
                  />
                </div>
              </div>

              {/* Text */}
              <p
                className="mt-6 lg:mt-0 text-center lg:text-left kol-mono lg:pr-24"
                style={{ color: 'var(--foreground)' }}
              >
                Visual language, defined by a set of foundational principles; from
                logo design and it's usage in various formats, to typography
                selection and style definition, color system and the methodology
                behind brand palettes, to the guidelines which document and
                communicate these systems and concepts.
              </p>
              <Button
                id="type-button"
                className="mt-5 lg:self-start"
              >
                To foundry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story
