import { useRef, useState } from 'react'

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
