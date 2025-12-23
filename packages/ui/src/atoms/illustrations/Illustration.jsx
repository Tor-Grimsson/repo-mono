import { useState, useEffect } from 'react'

/**
 * Illustration Component
 *
 * A reusable atom for displaying illustrations with consistent styling.
 * Fetches and inlines SVG from CDN URL to support currentColor theming.
 *
 * @example
 * <Illustration name="illustration-01" svgUrl="https://cdn.example.com/illustration.svg" size={320} />
 */

// Cache fetched SVGs to avoid re-fetching
const svgCache = new Map()

const Illustration = ({
  id,
  name,
  svgUrl,
  size = 320,
  variant = 'primary',
  className = '',
  alt = '',
  ...props
}) => {
  const [svgContent, setSvgContent] = useState(() => svgCache.get(svgUrl) || null)

  useEffect(() => {
    if (!svgUrl) return

    // Check cache first
    if (svgCache.has(svgUrl)) {
      setSvgContent(svgCache.get(svgUrl))
      return
    }

    // Fetch SVG from CDN
    fetch(svgUrl)
      .then(res => res.text())
      .then(svg => {
        svgCache.set(svgUrl, svg)
        setSvgContent(svg)
      })
      .catch(err => {
        console.error('Failed to load SVG:', err)
      })
  }, [svgUrl])

  const dimension = typeof size === 'number' ? `${size}px` : size

  // Apply size to SVG markup
  const applySizeToSvg = (svg) => {
    if (!svg) return svg
    let updated = svg
    // Replace or add width
    if (/width="/i.test(updated)) {
      updated = updated.replace(/width="[^"]*"/i, `width="${dimension}"`)
    } else {
      updated = updated.replace('<svg', `<svg width="${dimension}"`)
    }
    // Replace or add height
    if (/height="/i.test(updated)) {
      updated = updated.replace(/height="[^"]*"/i, `height="${dimension}"`)
    } else {
      updated = updated.replace('<svg', `<svg height="${dimension}"`)
    }
    return updated
  }

  return (
    <div
      className={`inline-flex items-center justify-center text-auto ${className}`}
      style={{ width: dimension, height: dimension }}
      role="img"
      aria-label={alt || name || `Illustration ${id || ''}`}
      {...props}
    >
      {svgUrl && svgContent ? (
        <span
          className="inline-block"
          style={{ width: dimension, height: dimension, lineHeight: 0 }}
          dangerouslySetInnerHTML={{ __html: applySizeToSvg(svgContent) }}
        />
      ) : (
        <div style={{ color: 'var(--kol-surface-on-primary)' }}>
          {name}
        </div>
      )}
    </div>
  )
}

export default Illustration
