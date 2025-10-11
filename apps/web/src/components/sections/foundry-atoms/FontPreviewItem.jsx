import { Slider, Dropdown } from '@kol/ui'
import { useState, useRef, useLayoutEffect, useCallback } from 'react'

const DEFAULT_SIZE = 96

const FontPreviewItem = ({ onFontSizeChange, initialSize = DEFAULT_SIZE, disableAutoSize = false, text = 'Tradition meets precision.', initialLineHeight = 100, compactOnDesktop = false, cardClassName = '', bgOpacity = 100, textColor, textClassName = '', fontFamily = 'TGMalromur', fontStyle = 'normal', initialWeight = 'Black' }) => {
  const initialStyleVariant = fontStyle === 'italic' ? 'italic' : 'roman'
  const [styleVariant, setStyleVariant] = useState(initialStyleVariant)
  const [weight, setWeight] = useState(initialWeight)
  const [size, setSize] = useState(initialSize)
  const [autoSize, setAutoSize] = useState(initialSize)
  const [leading, setLeading] = useState(initialLineHeight - 90)
  const [spacing, setSpacing] = useState(0)
  const [hasUserAdjustedSize, setHasUserAdjustedSize] = useState(disableAutoSize)
  const [visibleText, setVisibleText] = useState(text)

  const containerRef = useRef(null)
  const textRef = useRef(null)
  const lastReportedSizeRef = useRef(null)
  const initialSizeAppliedRef = useRef(false)
  const cardStyles = {}
  if (typeof bgOpacity === 'number') {
    cardStyles['--card-opacity'] = `${Math.max(0, Math.min(100, bgOpacity))}%`
  }

  const weightLabels = ['Thin', 'Extralight', 'Light', 'Regular', 'Medium', 'Semibold', 'Bold', 'Extrabold', 'Black']

  const styleOptions = [
    { label: 'Roman', value: 'roman' },
    { label: 'Italic', value: 'italic' }
  ]

  const weightOptions = weightLabels.map((label) => ({
    label,
    value: label
  }))

  const weightValues = {
    'Thin': 100,
    'Extralight': 200,
    'Light': 300,
    'Regular': 400,
    'Medium': 500,
    'Semibold': 600,
    'Bold': 700,
    'Extrabold': 800,
    'Black': 900
  }

  const computedFontStyle = styleVariant === 'italic' ? 'italic' : 'normal'


  // AUTO-SIZE CALCULATION
  // Uses binary search to find largest font size that fits in container
  const calculateAutoSize = useCallback(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    if (!containerWidth || !containerHeight) return

    // Save original font size to restore after measurement
    const originalFontSize = text.style.fontSize
    let low = 8
    let high = 512
    let best = low

    // Binary search: try font sizes between 8px and 512px
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      text.style.fontSize = `${mid}px`

      const fitsWidth = text.scrollWidth <= containerWidth
      const fitsHeight = text.scrollHeight <= containerHeight

      if (fitsWidth && fitsHeight) {
        best = mid
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    text.style.fontSize = originalFontSize
    setAutoSize(best)
  }, [leading, spacing, weight, styleVariant])

  // AUTO-SIZE TRIGGERS
  // Recalculate when container resizes or window resizes
  useLayoutEffect(() => {
    calculateAutoSize()

    // Watch container size changes with ResizeObserver
    let disconnectObserver = null
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => calculateAutoSize())
      const container = containerRef.current

      if (container) {
        observer.observe(container)
      }

      disconnectObserver = () => observer.disconnect()
    }

    // Watch window resize as fallback
    let removeResizeListener = null
    if (typeof window !== 'undefined') {
      const handleResize = () => calculateAutoSize()
      window.addEventListener('resize', handleResize)
      removeResizeListener = () => window.removeEventListener('resize', handleResize)
    }

    return () => {
      if (disconnectObserver) {
        disconnectObserver()
      }
      if (removeResizeListener) {
        removeResizeListener()
      }
    }
  }, [calculateAutoSize])

  // APPLY AUTO-SIZE TO STATE
  // Update displayed size when auto-size changes (unless user manually adjusted)
  useLayoutEffect(() => {
    if (autoSize <= 0 || hasUserAdjustedSize) return

    setSize(prev => {
      if (Number.isNaN(autoSize)) return prev

      // Only update if first time or significant change
      if (!initialSizeAppliedRef.current || Math.abs(prev - autoSize) > 0.5) {
        initialSizeAppliedRef.current = true
        return autoSize
      }

      return prev
    })
  }, [autoSize, hasUserAdjustedSize])

  // SLIDER BOUNDS
  // Slider min/max based on auto-size calculation
  const sliderMin = autoSize > 0 ? Math.min(12, autoSize) : 12
  const sliderMax = disableAutoSize ? 300 : (autoSize > 0 ? autoSize : 300)

  // USER SIZE ADJUSTMENT HANDLER
  // Track when user manually changes size via slider
  const handleSizeChange = (value) => {
    const numericValue = Number(value)
    const clamped = Math.max(sliderMin, Math.min(numericValue, sliderMax))

    setSize(clamped)

    // Mark as user-adjusted if different from auto-size
    if (autoSize > 0) {
      setHasUserAdjustedSize(Math.abs(clamped - sliderMax) > 0.5)
    } else {
      setHasUserAdjustedSize(false)
    }
  }

  // DISPLAY SIZE CALCULATION
  // Actual size to render (respects slider bounds)
  const displaySize = disableAutoSize ? size : (autoSize > 0 ? Math.min(size, sliderMax) : size)
  const fontWeightValue = weightValues[weight] || 900

  // NOTIFY PARENT OF SIZE CHANGES
  // Call parent callback when size changes
  useLayoutEffect(() => {
    if (typeof onFontSizeChange === 'function' && !Number.isNaN(displaySize)) {
      if (lastReportedSizeRef.current !== displaySize) {
        lastReportedSizeRef.current = displaySize
        onFontSizeChange(displaySize)
      }
    }
  }, [displaySize, onFontSizeChange])

  // TEXT CLIPPING LOGIC
  // Clips text to fit visible area - uses binary search to find max words that fit
  useLayoutEffect(() => {
    const container = containerRef.current
    const textElement = textRef.current
    if (!container || !textElement) return

    // Reserve minimal space since controls are at top
    const safetyMargin = 20
    const availableHeight = container.clientHeight - safetyMargin
    const words = text.split(' ')
    let clippedText = ''

    // Binary search to find maximum number of words that fit
    let low = 0
    let high = words.length

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const testText = words.slice(0, mid).join(' ')
      textElement.textContent = testText

      const textHeight = textElement.offsetHeight

      if (textHeight <= availableHeight) {
        clippedText = testText
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    setVisibleText(clippedText)
  }, [text, displaySize, leading, spacing, fontWeightValue, styleVariant])

  return (
    <div
      className={`foundryCard foundryCardPadded ${cardClassName} w-full h-full flex flex-col gap-4 ${compactOnDesktop ? 'fpsCompactControls' : ''}`}
      style={cardStyles}
    >
      <div className="flex flex-col gap-3 w-full">
         
        {/* Container for buttons, tags, and sliders */}
        <div className="fpsMainWrapper">
          {/* Buttons - Badge + Weight */}
          <div className="fpsButtonsWrapper">
            <div className="flex flex-wrap items-center gap-3">
              <div className="fontBadge">
                Málrómur
              </div>
              <Dropdown
                options={styleOptions}
                value={styleVariant}
                onChange={setStyleVariant}
                className="min-w-[140px]"
              />
              <Dropdown
                options={weightOptions}
                value={weight}
                onChange={setWeight}
                className="min-w-[140px]"
              />
            </div>
          </div>

          {/* Character Set Tags - Hidden on mobile and on compact desktop views */}
          <div className="fpsHideCompact">
            {['Alt Q', 'Alt $', 'liga'].map(charSet => (
              <div
                key={charSet}
                className="cursor-pointer control-unified whitespace-nowrap"
              >
                {charSet}
              </div>
            ))}
          </div>

          {/* Sliders */}
          <div className="flex flex-col lg:flex-col w-full lg:flex-1 gap-3">
            <Slider
              label="Size"
              min={sliderMin}
              max={sliderMax}
              value={displaySize}
              onChange={handleSizeChange}
              displayWidth={12}
              className="w-full"
            />
            <Slider
              label="Leading"
              min={0}
              max={50}
              value={leading}
              onChange={setLeading}
              className="w-full fpsHideCompact"
            />
            <Slider
              label="Spacing"
              min={-20}
              max={20}
              value={spacing}
              onChange={setSpacing}
              className="w-full fpsHideCompact"
            />
          </div>
        </div>
      </div>

      {/* Specimen Display */}
      <div ref={containerRef} className="flex-1 w-full overflow-hidden">
        <div className="h-full w-full flex items-start justify-start">
          <p
            ref={textRef}
            className={`transition-colors duration-300 max-w-full text-left ${textClassName}`}
            style={{
              fontFamily: fontFamily,
              fontStyle: computedFontStyle,
              fontSize: `${displaySize}px`,
              fontWeight: fontWeightValue,
              lineHeight: `${90 + leading}%`,
              letterSpacing: `${spacing}px`,
              wordWrap: 'normal',
              overflowWrap: 'normal',
              hyphens: 'none',
              whiteSpace: 'normal',
              color: textColor
            }}
          >
            {visibleText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FontPreviewItem
