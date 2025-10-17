import { useRef } from 'react'
import { useSpring, useMotionValue, useTransform } from 'framer-motion'

/**
 * useBentoTiltMotion
 *
 * Motion-based tilt effect using spring physics for smoother, more natural animation.
 * Alternative to useBentoTilt for A/B testing.
 *
 * Usage: Must use with motion.div, not regular div
 *
 * @returns {object} Props to spread on the motion.div element
 */
export const useBentoTiltMotion = () => {
  const itemRef = useRef(null)

  // Motion values for mouse position
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Transform mouse position to rotation with spring physics
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [4, -4]),
    { stiffness: 350, damping: 35 }
  )

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-4, 4]),
    { stiffness: 350, damping: 35 }
  )

  const handleMouseMove = (event) => {
    if (!itemRef.current) return

    const { left, top, width, height } = itemRef.current.getBoundingClientRect()
    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height

    mouseX.set(relativeX)
    mouseY.set(relativeY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return {
    ref: itemRef,
    style: {
      rotateX,
      rotateY,
      transformStyle: 'preserve-3d',
      transformPerspective: 700
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}
