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
          className={`text-auto ${weight} ${italic ? 'italic' : 'not-italic'} ${textCase || ''} font-['TGDylgjur'] leading-none whitespace-nowrap ${transform || ''}`}
          style={{ display: 'block' }}
        >
          {text}
        </div>
      </div>
    </div>
  )
})

FitText.displayName = 'FitText'

export default function DylgjurVariableAxis({ columns, gutter, marginX }) {
  const words = [
    { text: 'Raftjan', weight: 'font-normal', case: 'capitalize', italic: false },
    { text: 'skækill', weight: 'font-light', case: 'lowercase', italic: false },
    { text: 'Auvirðilegur', weight: 'font-bold', case: 'capitalize', italic: false },
    { text: 'Hofmóðsgikkur', weight: 'font-normal', case: 'capitalize', italic: false },
    { text: 'digurbarkamælgi', weight: 'font-light', case: 'lowercase', italic: false },
    { text: 'einhæfni', weight: 'font-bold', case: 'lowercase', italic: false },
    { text: 'Gorgeirsdrambur', weight: 'font-bold', case: 'capitalize', italic: false },
    { text: 'Rennimjúkt', weight: 'font-normal', case: 'capitalize', italic: false },
    { text: 'sálagárur', weight: 'font-light', case: 'lowercase', italic: false },
    { text: 'æðardúnn', weight: 'font-bold', case: 'lowercase', italic: false },
    { text: 'daðradalur', weight: 'font-normal', case: 'lowercase', italic: false },
  ]

  return (
    <div className="w-full min-h-screen relative">
      {/* MAIN CONTENT */}
      <section className="w-full pt-24 pb-48">
        <div className="w-full" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
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
