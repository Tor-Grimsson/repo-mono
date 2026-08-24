// useTilt — the two tilt strategies behind BentoCard/TiltCard, one home.
// useBentoTilt: plain CSS-transform tilt. useBentoTiltMotion: framer-motion springs.
// Merged 2026-08-15 (audit: duplicated mouse math). Exports keep their names —
// consumers pick per their useMotion flag.

import { useRef, useState } from 'react'
import { useSpring, useMotionValue, useTransform } from 'framer-motion'

export const useBentoTilt = () => {
  const [transformStyle, setTransformStyle] = useState('')
  const itemRef = useRef(null)

  const handleMouseMove = (event) => {
    if (!itemRef.current) return
    const { left, top, width, height } = itemRef.current.getBoundingClientRect()

    // Calculate relative position (0 to 1)
    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height

    // Use a reference size for "standard" tilt (e.g., 1200px wide card)
    const referenceSize = 1200
    const currentSize = Math.sqrt(width * height) // Use diagonal as size metric
    const referenceCardSize = Math.sqrt(referenceSize * 640) // Reference: 1200x640

    // Scale the tilt amount inversely to card size
    // Smaller cards get MORE degrees to create same perceived motion
    const sizeMultiplier = referenceCardSize / currentSize
    const baseTilt = 2
    const adjustedTilt = baseTilt * sizeMultiplier

    const tiltX = (relativeY - 0.5) * adjustedTilt
    const tiltY = (relativeX - 0.5) * -adjustedTilt

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1, 1, 1)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle('')
  }

  return {
    ref: itemRef,
    style: { transform: transformStyle, transition: 'transform 0.6s ease-out' },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}


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
