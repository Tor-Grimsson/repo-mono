import { useEffect, useRef, useState } from 'react'
import { FontLoader } from '@kol/fontviewer'
import defaultFontUrl from '@kol/fontviewer/src/assets/variFont/TGMalromurItalicVF.ttf?url'

const PREVIEW_CONTAINER_STYLE = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const GLYPH_STYLE = {
  fontSize: '256px',
  lineHeight: 1,
  display: 'inline-block'
}

const OVERLAY_STYLE = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none'
}

const LINE_STYLE = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: '1px',
  background: 'rgba(255,255,255,0.4)'
}

const LEGEND_STYLE = {
  position: 'absolute',
  left: '16px',
  fontFamily: 'monospace',
  fontSize: '12px'
}

const VERTICAL_LINE_STYLE = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '1px',
  background: 'rgba(255,255,255,0.35)'
}

const VERTICAL_LEGEND_STYLE = {
  position: 'absolute',
  top: '16px',
  fontFamily: 'monospace',
  fontSize: '12px',
  transform: 'translateX(-50%)'
}

const Extraction = ({
  fontUrl = defaultFontUrl,
  height = 628,
  className = '',
  showBaseline = true,
  showAscender = true,
  showDescender = true,
  showCapHeight = true,
  showXHeight = true,
  showBearings = true,
  showMetricLabels = true,
  showBearingLabels = true,
  glyph = 'æ',
  disableSelection = true
}) => {
  const glyphRef = useRef(null)
  const overlayRef = useRef(null)
  const [metrics, setMetrics] = useState(null)
  const [fontData, setFontData] = useState(null)

  useEffect(() => {
    const glyphElement = glyphRef.current
    if (!glyphElement) return

    const loader = new FontLoader({
      onFontLoaded: ({ font, fontInfo, fontFamily }) => {
        glyphElement.style.fontFamily = `"${fontFamily}", sans-serif`
        glyphElement.textContent = glyph
        setFontData({ font, fontInfo })
        setMetrics({
          unitsPerEm: fontInfo?.unitsPerEm ?? null,
          ascender: font?.tables?.hhea?.ascender ?? null,
          descender: font?.tables?.hhea?.descender ?? null,
          xHeight: font?.tables?.os2?.sxHeight ?? null,
          capHeight: font?.tables?.os2?.sCapHeight ?? null
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

  useEffect(() => {
    if (glyphRef.current) {
      glyphRef.current.textContent = glyph
    }
  }, [glyph])

  useEffect(() => {
    if (!fontData || !metrics) return
    const glyph = glyphRef.current
    const overlay = overlayRef.current
    if (!glyph || !overlay) return

    const render = () => {
      const { font } = fontData
      const overlayRect = overlay.getBoundingClientRect()
      const glyphRect = glyph.getBoundingClientRect()
      const glyphTop = glyphRect.top - overlayRect.top

      const computedStyle = window.getComputedStyle(glyph)
      const fontSize = parseFloat(computedStyle.fontSize)
      if (!fontSize || Number.isNaN(fontSize)) return

      const unitsPerEm = font.unitsPerEm || metrics.unitsPerEm || 1000
      const scale = fontSize / unitsPerEm

      const ascenderUnits = font.tables?.os2?.sTypoAscender ?? metrics.ascender ?? 0
      const descenderUnits = font.tables?.os2?.sTypoDescender ?? metrics.descender ?? 0
      const capHeightUnits = font.tables?.os2?.sCapHeight ?? metrics.capHeight ?? null
      const xHeightUnits = font.tables?.os2?.sxHeight ?? metrics.xHeight ?? null

      const totalHeightUnits = ascenderUnits - descenderUnits
      const totalPixelHeight = totalHeightUnits * scale
      const baselineOffsetUnits = ascenderUnits
      const baseline = glyphTop + glyphRect.height / 2 - totalPixelHeight / 2 + baselineOffsetUnits * scale

      const lines = []
      if (showBaseline) {
        lines.push({ y: baseline, label: 'Baseline', value: 0 })
      }
      if (showAscender) {
        lines.push({ y: baseline - ascenderUnits * scale, label: 'Ascender', value: ascenderUnits })
      }
      if (showDescender) {
        lines.push({ y: baseline - descenderUnits * scale, label: 'Descender', value: descenderUnits })
      }
      if (showCapHeight && capHeightUnits != null) {
        lines.push({ y: baseline - capHeightUnits * scale, label: 'Cap height', value: capHeightUnits })
      }
      if (showXHeight && xHeightUnits != null) {
        lines.push({ y: baseline - xHeightUnits * scale, label: 'x-height', value: xHeightUnits })
      }

      overlay.innerHTML = ''
      lines.forEach(({ y, label, value }) => {
        if (!Number.isFinite(y)) return
        const line = document.createElement('div')
        Object.assign(line.style, LINE_STYLE, { top: `${y}px` })

        overlay.appendChild(line)

        if (showMetricLabels) {
          const legend = document.createElement('div')
          Object.assign(legend.style, LEGEND_STYLE, { top: `${y - 18}px` })
          if (disableSelection) {
            legend.style.userSelect = 'none'
          }
          legend.textContent = `${label} → ${value}`
          overlay.appendChild(legend)
        }
      })

      if (showBearings) {
        const glyphIndex = font.charToGlyphIndex(glyph.textContent || '')
        const glyphData = font.glyphs.get(glyphIndex)
        if (glyphData) {
          const advanceWidthUnits = glyphData.advanceWidth ?? metrics.unitsPerEm ?? font.unitsPerEm ?? 1000
          const advanceWidthPx = advanceWidthUnits * scale

          const leftBearingUnits = glyphData.leftSideBearing ?? glyphData.xMin ?? 0
          const glyphWidthUnits = (() => {
            const xMin = glyphData.xMin ?? 0
            const xMax = glyphData.xMax ?? (glyphData.advanceWidth ?? xMin)
            return xMax - xMin
          })()
          const rightBearingUnits = advanceWidthUnits - (leftBearingUnits + glyphWidthUnits)

          const containerWidth = overlayRect.width
          const advanceStart = (containerWidth - advanceWidthPx) / 2
          const leftPos = advanceStart + leftBearingUnits * scale
          const rightPos = advanceStart + advanceWidthPx - rightBearingUnits * scale
          const bearingLines = [
            {
              x: leftPos,
              label: 'Left bearing',
              value: Math.round(leftBearingUnits)
            },
            {
              x: rightPos,
              label: 'Right bearing',
              value: Math.round(rightBearingUnits)
            }
          ]

          bearingLines.forEach(({ x, label, value }) => {
            if (!Number.isFinite(x)) return
            const line = document.createElement('div')
            Object.assign(line.style, VERTICAL_LINE_STYLE, { left: `${x}px` })

            overlay.appendChild(line)

            if (showBearingLabels) {
              const legend = document.createElement('div')
              Object.assign(legend.style, VERTICAL_LEGEND_STYLE, { left: `${x}px` })
              if (disableSelection) {
                legend.style.userSelect = 'none'
              }
              legend.textContent = `${label} → ${value}`
              overlay.appendChild(legend)
            }
          })
        }
      }
    }

    const raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [
    fontData,
    metrics,
    showBaseline,
    showAscender,
    showDescender,
    showCapHeight,
    showXHeight,
    showBearings,
    showMetricLabels,
    showBearingLabels,
    glyph,
    disableSelection
  ])

  return (
    <div
      className={className}
      style={disableSelection ? { userSelect: 'none' } : undefined}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${height}px`,
          overflow: 'hidden'
        }}
      >
        <div style={PREVIEW_CONTAINER_STYLE}>
          <span ref={glyphRef} style={GLYPH_STYLE}>
            Loading…
          </span>
        </div>
        <div ref={overlayRef} style={OVERLAY_STYLE} aria-hidden />
      </div>
    </div>
  )
}

export default Extraction
