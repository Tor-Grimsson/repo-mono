import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * RouteLoader - Simple loading indicator for route transitions
 *
 * Shows a minimal loading bar at the top of the screen during
 * route changes with a slight delay to avoid flash on fast loads
 */
const RouteLoader = () => {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  // Skip loader for routes with client-side overlays or dynamic content
  const skipLoader =
    location.pathname.startsWith('/workshop') ||
    location.pathname.startsWith('/prints')

  useEffect(() => {
    if (skipLoader) {
      setIsLoading(false)
      return undefined
    }
    // Start loading immediately
    setIsLoading(true)

    // Hide loader after page has loaded and rendered
    const hideTimer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => {
      clearTimeout(hideTimer)
    }
  }, [location.pathname, skipLoader])

  if (!isLoading || skipLoader) return null

  return (
    <>
      {/* Simple centered spinner that's always visible */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-primary pointer-events-none">
        <div className="w-8 h-8 border-2 border-fg-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </>
  )
}

export default RouteLoader
