import { useEffect, useRef, useState } from 'react'
import { FontLoader } from '@kol/fontviewer'
import { glyphSets } from '@kol/ui/data'
import defaultFontUrl from '@kol/fontviewer/src/assets/variFont/TGMalromurItalicVF.ttf?url'

/**
 * GlyphInspectorGrid - Table-style glyph inspector with dual grids
 *
 * Matches Figma spec exactly:
 * - Left: 504px wide glyph viewer with real font metrics
 * - Right: 832px wide dual stacked grids with table-like borders
 */
const GlyphInspectorGrid = ({
  fontUrl = defaultFontUrl,
  fontFamily = 'TGMalromur',
  fontStyle = 'normal',
  initialGlyph = 'f'
}) => {
  const [selectedGlyph, setSelectedGlyph] = useState(initialGlyph)
  const [hoveredGlyph, setHoveredGlyph] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [fontData, setFontData] = useState(null)

  const glyphRef = useRef(null)
  const overlayRef = useRef(null)

  const displayGlyph = hoveredGlyph || selectedGlyph

  // Combine all glyphs into larger groups
  const allUppercase = [
    ...glyphSets.uppercase,
    ...glyphSets.latin1
  ]

  const allLowercase = [
    ...glyphSets.lowercase,
    ...(glyphSets.latinExtended || [])
  ]

  const numbersAndSymbols = [
    ...glyphSets.numbers,
    ...glyphSets.punctuation
  ]

  // Load font and extract metrics
  useEffect(() => {
    const glyphElement = glyphRef.current
    if (!glyphElement) return

    const loader = new FontLoader({
      onFontLoaded: ({ font, fontInfo, fontFamily: loadedFontFamily }) => {
        glyphElement.style.fontFamily = `"${loadedFontFamily}", sans-serif`
        glyphElement.textContent = displayGlyph
        setFontData({ font, fontInfo })

        // Extract REAL metrics
        const unitsPerEm = font.unitsPerEm || fontInfo?.unitsPerEm || 1000
        const ascender = font.tables?.os2?.sTypoAscender ?? font.tables?.hhea?.ascender ?? 800
        const descender = font.tables?.os2?.sTypoDescender ?? font.tables?.hhea?.descender ?? -200
        const capHeight = font.tables?.os2?.sCapHeight ?? 700
        const xHeight = font.tables?.os2?.sxHeight ?? 500

        setMetrics({
          unitsPerEm,
          ascender,
          descender,
          capHeight,
          xHeight
        })
      },
      onError: (err) => {
        console.error('Font load failed', err)
      }
    })

    let cancelled = false

    const loadFont = async () => {
      try {
        const response = await fetch(fontUrl)
        const buffer = await response.arrayBuffer()
        const filename = fontUrl.split('/').pop() || 'font.ttf'
        if (!cancelled) {
          await loader.loadFont(buffer, filename)
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Font load failed', err)
        }
      }
    }

    loadFont()

    return () => {
      cancelled = true
      loader.cleanup()
    }
  }, [fontUrl])

  // Update glyph when selected/hovered changes
  useEffect(() => {
    if (glyphRef.current) {
      glyphRef.current.textContent = displayGlyph
    }
  }, [displayGlyph])

  // Render metric lines
  useEffect(() => {
    if (!fontData || !metrics || !glyphRef.current || !overlayRef.current) return

    const glyph = glyphRef.current
    const overlay = overlayRef.current
    const { font } = fontData

    const render = () => {
      const overlayRect = overlay.getBoundingClientRect()
      const glyphRect = glyph.getBoundingClientRect()
      const glyphTop = glyphRect.top - overlayRect.top

      const computedStyle = window.getComputedStyle(glyph)
      const fontSize = parseFloat(computedStyle.fontSize)
      if (!fontSize || Number.isNaN(fontSize)) return

      const scale = fontSize / metrics.unitsPerEm

      const totalHeightUnits = metrics.ascender - metrics.descender
      const totalPixelHeight = totalHeightUnits * scale
      const baselineOffsetUnits = metrics.ascender
      const baseline = glyphTop + glyphRect.height / 2 - totalPixelHeight / 2 + baselineOffsetUnits * scale

      const lines = [
        { y: baseline - metrics.capHeight * scale, label: 'Cap Height', value: metrics.capHeight },
        { y: baseline - metrics.ascender * scale, label: 'Ascender', value: metrics.ascender },
        { y: baseline - metrics.xHeight * scale, label: 'x-height', value: metrics.xHeight },
        { y: baseline, label: 'Baseline', value: 0 },
        { y: baseline - metrics.descender * scale, label: 'Descender', value: metrics.descender }
      ]

      overlay.innerHTML = ''
      lines.forEach(({ y, label, value }) => {
        if (!Number.isFinite(y)) return

        // Line
        const line = document.createElement('div')
        line.style.cssText = `
          position: absolute;
          left: 0;
          right: 0;
          top: ${y}px;
          border-top: 1px solid var(--kol-border-default);
        `
        overlay.appendChild(line)

        // Left label
        const leftLabel = document.createElement('div')
        leftLabel.style.cssText = `
          position: absolute;
          left: 13px;
          top: ${y - 18}px;
          opacity: 0.8;
          color: var(--kol-surface-on-primary);
          font-size: 12px;
          font-family: 'PP Right Grotesk Mono', monospace;
          line-height: 12px;
          user-select: none;
        `
        leftLabel.textContent = label
        overlay.appendChild(leftLabel)

        // Right value
        const rightValue = document.createElement('div')
        rightValue.style.cssText = `
          position: absolute;
          right: 13px;
          top: ${y - 18}px;
          opacity: 0.8;
          color: var(--kol-surface-on-primary);
          font-size: 12px;
          font-family: 'PP Right Grotesk Mono', monospace;
          line-height: 12px;
          user-select: none;
        `
        rightValue.textContent = value
        overlay.appendChild(rightValue)
      })
    }

    const raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [fontData, metrics, displayGlyph])

  // Get Unicode info
  const charCode = displayGlyph.charCodeAt(0)
  const unicodeHex = charCode.toString(16).toUpperCase().padStart(4, '0')

  // Render table-like grid
  const renderGrid = (glyphs, title) => (
    <div className="w-[832px] flex flex-col gap-4">
      <div className="opacity-80 text-auto text-lg font-['PP_Right_Grotesk_Mono'] leading-7">
        {title}
      </div>
      <div
        className="inline-flex justify-start items-start flex-wrap"
        onMouseLeave={() => setHoveredGlyph(null)}
      >
        {glyphs.map((glyph, index) => (
          <div
            key={index}
            onClick={() => setSelectedGlyph(glyph)}
            onMouseEnter={() => setHoveredGlyph(glyph)}
            className={`
              w-16 h-16
              outline outline-1 outline-offset-[-0.5px] outline-auto
              inline-flex flex-col justify-center items-center
              overflow-hidden cursor-pointer
              transition-colors duration-150
              text-center text-2xl leading-6
              ${glyph === selectedGlyph
                ? 'bg-auto text-auto-inverse'
                : 'bg-transparent text-auto hover:bg-auto/10'
              }
            `.trim()}
            style={{
              fontFamily: fontFamily,
              fontStyle: fontStyle
            }}
          >
            {glyph}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-16 bg-surface-primary inline-flex justify-start items-start gap-10">
      {/* Left: Glyph Viewer */}
      <div className="w-[504px] inline-flex flex-col justify-start items-start gap-4">
        <div className="opacity-80 text-auto text-lg font-['PP_Right_Grotesk_Mono'] leading-7">
          Glyph Item
        </div>

        <div className="w-[504px] flex flex-col justify-start items-start gap-10">
          {/* Glyph Display with Metrics */}
          <div className="self-stretch h-96 relative rounded-md overflow-hidden">
            {/* Glyph */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                ref={glyphRef}
                className="text-center text-auto"
                style={{
                  fontSize: '316px',
                  lineHeight: '310px',
                  fontFamily: fontFamily,
                  fontStyle: fontStyle
                }}
              >
                Loading…
              </span>
            </div>

            {/* Metrics Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 pointer-events-none"
              aria-hidden
            />
          </div>

          {/* Metadata */}
          <div className="inline-flex justify-start items-start gap-8">
            <div className="opacity-80 text-auto text-lg font-['PP_Right_Grotesk_Mono'] leading-7">
              Font style<br/>
              Glyph name<br/>
              Unicode<br/>
              Decimal<br/>
              Hex
            </div>
            <div className="opacity-80 text-auto text-lg font-['PP_Right_Grotesk_Mono'] leading-7">
              {fontStyle === 'italic' ? 'Italic' : 'Roman'}<br/>
              {displayGlyph}<br/>
              U+{unicodeHex}<br/>
              {charCode}<br/>
              0x{unicodeHex}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Dual Grids */}
      <div className="inline-flex flex-col justify-start items-start gap-6">
        {renderGrid(allUppercase, 'Glyph Item')}
        {renderGrid(allLowercase, 'Glyph Item')}
      </div>
    </div>
  )
}

export default GlyphInspectorGrid
