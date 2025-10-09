import { useEffect, useState } from 'react'

/**
 * Detects if the current device supports touch input
 * Uses multiple detection methods for reliability:
 * - ontouchstart event availability
 * - navigator.maxTouchPoints (more reliable)
 * - CSS media query for pointer precision
 *
 * @returns {boolean} - true if touch device, false if mouse/trackpad
 */
export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches

      setIsTouch(hasTouch)
    }

    checkTouch()

    // Re-check on resize (device orientation change, etc.)
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  return isTouch
}
