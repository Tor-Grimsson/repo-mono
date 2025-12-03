/**
 * SurfacePreviewGrid
 *
 * Two-column grid for showing component examples on default and inverse surfaces
 * Includes optional surface labels and mode indicator circles
 *
 * Usage:
 * <SurfacePreviewGrid>
 *   <SurfacePreviewGrid.Surface label="Default Surface">
 *     {content}
 *   </SurfacePreviewGrid.Surface>
 *   <SurfacePreviewGrid.Surface label="Inverse Surface" inverse>
 *     {content}
 *   </SurfacePreviewGrid.Surface>
 * </SurfacePreviewGrid>
 */

const Surface = ({ children, label, inverse = false, showIndicator = true }) => {
  return (
    <div
      className={`relative p-3 md:p-4 rounded ${inverse ? 'bg-surface-inverse' : 'bg-surface-primary border border-auto'}`}
    >
      {/* Optional label */}
      {label && (
        <div className="kol-mono-xs opacity-60 mb-4">{label}</div>
      )}

      {/* Mode indicator circle (top right) */}
      {showIndicator && (
        <div
          className="absolute top-2 right-2 h-2 w-2 rounded-full md:top-4 md:right-4 md:h-3 md:w-3 bg-fg"
          title={inverse ? 'Inverse surface (light mode)' : 'Default surface (dark mode)'}
        />
      )}

      {/* Content */}
      {children}
    </div>
  )
}

const SurfacePreviewGrid = ({ children, layout = 'side-by-side', nativeOnly = false }) => {
  const layoutClass = layout === 'stacked' || nativeOnly
    ? 'grid grid-cols-1 gap-6'
    : 'grid grid-cols-1 lg:grid-cols-2 gap-6'

  if (nativeOnly) {
    // Only render the first child (default surface)
    const childArray = Array.isArray(children) ? children : [children]
    const defaultSurface = childArray.find(child => !child?.props?.inverse)
    return <div className={layoutClass}>{defaultSurface}</div>
  }

  return <div className={layoutClass}>{children}</div>
}

// Compound component pattern
SurfacePreviewGrid.Surface = Surface

export default SurfacePreviewGrid
