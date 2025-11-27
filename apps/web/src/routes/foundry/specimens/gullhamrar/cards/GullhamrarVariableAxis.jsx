import { useEffect, useRef, useCallback, memo } from 'react'

// Shared canvas for text measurement (reused across all instances)
let sharedCanvas = null
const getSharedCanvas = () => {
  if (!sharedCanvas) {
    sharedCanvas = document.createElement('canvas')
  }
  return sharedCanvas
}

// Memoized FitText component to prevent unnecessary re-renders
const FitText = memo(({ text, weight, transform, italic, textCase }) => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const wrapperRef = useRef(null)
  const resizeTimeoutRef = useRef(null)

  const fitText = useCallback(() => {
    if (!containerRef.current || !textRef.current || !wrapperRef.current) return

    const containerWidth = containerRef.current.offsetWidth

    // Use binary search instead of while loop for much faster convergence
    let minSize = 10
    let maxSize = 2000
    let fontSize = maxSize

    textRef.current.style.fontSize = fontSize + 'px'

    // Binary search for optimal font size (logarithmic time complexity)
    while (maxSize - minSize > 1) {
      fontSize = Math.floor((minSize + maxSize) / 2)
      textRef.current.style.fontSize = fontSize + 'px'

      const textWidth = textRef.current.scrollWidth

      if (textWidth > containerWidth) {
        maxSize = fontSize
      } else {
        minSize = fontSize
      }
    }

    // Set final size
    fontSize = minSize
    textRef.current.style.fontSize = fontSize + 'px'

    // Ensure text doesn't overflow
    if (textRef.current.scrollWidth > containerWidth) {
      fontSize -= 1
      textRef.current.style.fontSize = fontSize + 'px'
    }

    // Use shared canvas for measurement
    const canvas = getSharedCanvas()
    const ctx = canvas.getContext('2d')
    const computedStyle = window.getComputedStyle(textRef.current)
    ctx.font = computedStyle.font

    const metrics = ctx.measureText(text)
    const bbox = textRef.current.getBoundingClientRect()

    // Calculate precise height
    const metricsHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    const textHeight = Math.min(bbox.height, metricsHeight)

    // Set wrapper to exact text height
    wrapperRef.current.style.height = textHeight + 'px'
    wrapperRef.current.style.overflow = 'visible'
    textRef.current.style.lineHeight = '1'
  }, [text])

  useEffect(() => {
    // Wait for fonts to load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitText)
    } else {
      fitText()
    }

    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = setTimeout(fitText, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeoutRef.current)
    }
  }, [fitText])

  return (
    <div ref={wrapperRef} className="w-full">
      <div ref={containerRef} className="w-full">
        <div
          ref={textRef}
          className={`text-auto ${weight} ${italic ? 'italic' : 'not-italic'} ${textCase || ''} font-['TGGullhamrar'] leading-none whitespace-nowrap ${transform || ''}`}
          style={{ display: 'block' }}
        >
          {text}
        </div>
      </div>
    </div>
  )
})

FitText.displayName = 'FitText'

export default function GullhamrarVariableAxis() {
  const words = [
    { text: 'Dynkur', weight: 'font-bold', case: 'capitalize', italic: false },
    { text: 'Slark', weight: 'font-bold', case: 'capitalize', italic: false },
    { text: 'Húllum hæ', weight: 'font-light', case: 'capitalize', italic: false },
    { text: 'Ys & þys', weight: 'font-bold', case: 'lowercase', italic: false },
    { text: 'Argaþras', weight: 'font-bold', case: 'capitalize', italic: false },
    { text: 'Hnotabit', weight: 'font-bold', case: 'uppercase', italic: false },
    { text: 'Illdeilinn', weight: 'font-bold', case: 'uppercase', italic: false },
    { text: 'Orðaskaki', weight: 'font-normal', case: 'capitalize', italic: false },
    { text: 'Málastapp', weight: 'font-light', case: 'uppercase', italic: false },
    { text: 'Ýfingar', weight: 'font-bold', case: 'lowercase', italic: false },
    { text: 'Hergnýr', weight: 'font-light', case: 'lowercase', italic: false },
    { text: 'Húllumhæ', weight: 'font-light', case: 'uppercase', italic: false },
    { text: 'Glundroði', weight: 'font-bold', case: 'lowercase', italic: false },
    { text: 'Lýðskrum', weight: 'font-light', case: 'uppercase', italic: false },
    { text: 'Þæfingur', weight: 'font-bold', case: 'capitalize', italic: false },
    { text: 'Mjóróma', weight: 'font-bold', case: 'uppercase', italic: false },

    { text: 'Írafár', weight: 'font-bold', case: 'capitalize', italic: false },
    { text: 'Kveinstafir', weight: 'font-normal', case: 'uppercase', italic: false },
    { text: 'Jódynur', weight: 'font-normal', case: 'capitalize', italic: false },
    { text: 'Offors', weight: 'font-normal', case: 'uppercase', italic: false },
    { text: 'Skrílslæti', weight: 'font-bold', case: 'capitalize', italic: false },
    { text: 'Stímabrak', weight: 'font-light', case: 'lowercase', italic: false },
    { text: 'Skvamp', weight: 'font-normal', case: 'uppercase', italic: false },
    { text: 'Uppivöðslusemi', weight: 'font-normal', case: 'uppercase', italic: false },
    { text: 'Traðk', weight: 'font-bold', case: 'uppercase', italic: false },
    { text: 'Orustugnýr', weight: 'font-light', case: 'lowercase', italic: false },
    { text: 'Skrílslæti', weight: 'font-normal', case: 'capitalize', italic: false },
    { text: 'Skvamp', weight: 'font-bold', case: 'capitalize', italic: false },
    
  ]

  return (
    <div className="w-full min-h-screen relative">
      {/* MAIN CONTENT */}
      <section className="w-full pt-24 pb-48">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          {/* Type Specimens - Large Display Sizes */}
          <div className="flex flex-col" style={{ gap: '48px' }}>
            {words.map((word, index) => (
              <FitText key={index} text={word.text} weight={word.weight} transform={word.transform} italic={word.italic} textCase={word.case} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
