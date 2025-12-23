import { useState, useEffect } from 'react'

/**
 * Grid Component
 *
 * Atom responsible for rendering grid exploration SVGs with consistent sizing.
 * Fetches and inlines SVG from CDN URL to support currentColor theming.
 *
 * @example
 * <Grid name="grid-01" svgUrl="https://cdn.example.com/grid.svg" size={320} />
 */

// Cache fetched SVGs to avoid re-fetching
const svgCache = new Map()

const fallbackMarkup = `
<svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="320" rx="16" fill="currentColor" fill-opacity="0.08" />
  <path d="M40 80H280" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4" />
  <path d="M40 160H280" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4" />
  <path d="M40 240H280" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4" />
  <path d="M80 40V280" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4" />
  <path d="M160 40V280" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4" />
  <path d="M240 40V280" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4" />
</svg>
`

const Grid = ({
  id,
  name,
  svgUrl,
  size = 320,
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
      aria-label={alt || name || `Grid ${id || ''}`}
      {...props}
    >
      {svgUrl && svgContent ? (
        <span
          className="inline-block"
          style={{ width: dimension, height: dimension, lineHeight: 0 }}
          dangerouslySetInnerHTML={{ __html: applySizeToSvg(svgContent) }}
        />
      ) : (
        <span
          className="inline-block"
          style={{ width: dimension, height: dimension, lineHeight: 0 }}
          dangerouslySetInnerHTML={{ __html: applySizeToSvg(fallbackMarkup) }}
        />
      )}
    </div>
  )
}

export default Grid
