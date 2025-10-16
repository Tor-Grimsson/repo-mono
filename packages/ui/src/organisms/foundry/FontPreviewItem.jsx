import { useState, useRef, useLayoutEffect, useCallback } from 'react'
import { FontControlsPanel } from '../../molecules/foundry/index.js'

const DEFAULT_SIZE = 96

/**
 * FontPreviewItem - Interactive font preview organism
 *
 * Complex organism that combines FontControlsPanel molecule with
 * sophisticated auto-sizing and text clipping logic. Manages all
 * state for font customization and display.
 *
 * Features:
 * - Auto-sizing via binary search algorithm
 * - Manual size adjustment with slider
 * - Text clipping to fit container
 * - Style and weight selection
 * - Leading and spacing controls
 * - Responsive layout with compact mode
 *
 * @param {Object} props
 * @param {Function} props.onFontSizeChange - Callback when size changes
 * @param {number} props.initialSize - Starting font size
 * @param {boolean} props.disableAutoSize - Disable auto-sizing
 * @param {string} props.text - Text to display
 * @param {number} props.initialLineHeight - Initial line height (90-140 range)
 * @param {boolean} props.compactOnDesktop - Hide some controls on desktop
 * @param {string} props.cardClassName - Additional card classes
 * @param {number} props.bgOpacity - Background opacity (0-100)
 * @param {string} props.textColor - Text color override
 * @param {string} props.textClassName - Additional text classes
 * @param {string} props.fontFamily - Font family name
 * @param {string} props.fontStyle - Font style ('normal' or 'italic')
 * @param {string} props.initialWeight - Initial font weight name
 */
const FontPreviewItem = ({
  onFontSizeChange,
  initialSize = DEFAULT_SIZE,
  disableAutoSize = false,
  text = 'Tradition meets precision.',
  initialLineHeight = 100,
  compactOnDesktop = false,
  cardClassName = '',
  bgOpacity = 100,
  textColor,
  textClassName = '',
  fontFamily = 'TGMalromur',
  fontStyle = 'normal',
  initialWeight = 'Black'
}) => {
  // STATE MANAGEMENT
  const initialStyleVariant = fontStyle === 'italic' ? 'italic' : 'roman'
  const [styleVariant, setStyleVariant] = useState(initialStyleVariant)
  const [weight, setWeight] = useState(initialWeight)
  const [size, setSize] = useState(initialSize)
  const [autoSize, setAutoSize] = useState(initialSize)
  const [leading, setLeading] = useState(initialLineHeight - 90)
  const [spacing, setSpacing] = useState(0)
  const [hasUserAdjustedSize, setHasUserAdjustedSize] = useState(disableAutoSize)
  const [visibleText, setVisibleText] = useState(text)

  // REFS
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const lastReportedSizeRef = useRef(null)
  const initialSizeAppliedRef = useRef(false)

  // CARD STYLES
  const cardStyles = {}
  if (typeof bgOpacity === 'number') {
    cardStyles['--card-opacity'] = `${Math.max(0, Math.min(100, bgOpacity))}%`
  }

  // FONT OPTIONS
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

  // ADDITIONAL CONTROLS (character set tags)
  const additionalControls = (
    <>
      {['Alt Q', 'Alt $', 'liga'].map(charSet => (
        <div
          key={charSet}
          className="cursor-pointer control-unified whitespace-nowrap"
        >
          {charSet}
        </div>
      ))}
    </>
  )

  return (
    <div
      className={`foundryCard foundryCardPadded ${cardClassName} w-full h-full flex flex-col gap-4`.trim()}
      style={cardStyles}
    >
      {/* Font Controls Panel */}
      <FontControlsPanel
        styleOptions={styleOptions}
        weightOptions={weightOptions}
        selectedStyle={styleVariant}
        selectedWeight={weight}
        onStyleChange={setStyleVariant}
        onWeightChange={setWeight}
        size={displaySize}
        onSizeChange={handleSizeChange}
        sizeMin={sliderMin}
        sizeMax={sliderMax}
        leading={leading}
        onLeadingChange={setLeading}
        spacing={spacing}
        onSpacingChange={setSpacing}
        compactOnDesktop={compactOnDesktop}
        fontLabel="Málrómur"
        additionalControls={additionalControls}
      />

      {/* Specimen Display */}
      <div ref={containerRef} className="flex-1 w-full overflow-hidden">
        <div className="h-full w-full flex items-start justify-start">
          <p
            ref={textRef}
            className={`transition-colors duration-300 max-w-full text-left ${textClassName}`.trim()}
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
