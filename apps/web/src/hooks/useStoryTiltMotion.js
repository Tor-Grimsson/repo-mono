import { useRef } from 'react'
import { useSpring, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

/**
 * useStoryTiltMotion
 *
 * Motion-based tilt effect with cursor-following mask for Story section
 * Combines 3D tilt with mask position tracking
 *
 * Usage: Must use with motion.img and motion.div for overlay
 *
 * @returns {object} Props for image and overlay elements
 */
export const useStoryTiltMotion = () => {
  const containerRef = useRef(null)

  // Motion values for mouse position (0 to 1 normalized)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Motion values for absolute pixel position (for mask)
  const maskX = useMotionValue('50%')
  const maskY = useMotionValue('50%')

  // Transform mouse position to rotation with spring physics
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [4, -4]),
    { stiffness: 350, damping: 35 }
  )

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-4, 4]),
    { stiffness: 350, damping: 35 }
  )

  const handleMove = (e) => {
    if (!containerRef.current) return

    const isTouchEvent = e.type.startsWith('touch')
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Update mask position (absolute pixels)
    maskX.set(`${x}px`)
    maskY.set(`${y}px`)

    // Update normalized position for tilt (only on mouse, not touch)
    if (!isTouchEvent) {
      const relativeX = x / rect.width
      const relativeY = y / rect.height
      mouseX.set(relativeX)
      mouseY.set(relativeY)
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    maskX.set('50%')
    maskY.set('50%')
  }

  return {
    containerRef,
    imageProps: {
      style: {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 500
      }
    },
    overlayProps: {
      style: {
        '--x': maskX,
        '--y': maskY
      }
    },
    handlers: {
      onMouseMove: handleMove,
      onTouchMove: handleMove,
      onMouseLeave: handleMouseLeave,
      onTouchEnd: handleMouseLeave
    }
  }
}
