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
const FitText = memo(({ text, weight, transform, italic }) => {
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
          className={`text-auto ${weight} ${italic ? 'italic' : 'not-italic'} font-['TGMalromur'] leading-none whitespace-nowrap ${transform || ''}`}
          style={{ display: 'block' }}
        >
          {text}
        </div>
      </div>
    </div>
  )
})

FitText.displayName = 'FitText'

export default function SpecimenTwo() {
  const words = [
    { text: 'Húmbúkk', weight: 'font-bold', italic: true },
    { text: 'Slægð', weight: 'font-black', italic: false },
    { text: 'Stjórnarerindreki', weight: 'font-medium', italic: false },
    { text: '66 μm 8Ω', weight: 'font-extrabold', transform: 'uppercase', italic: true },
    { text: 'Ranímosk', weight: 'font-normal', italic: true },
    { text: 'Duft', weight: 'font-black', transform: 'uppercase', italic: false },
    { text: '⎓ Rafiðn ⏦', weight: 'font-semibold', italic: true },
    { text: 'Skækill', weight: 'font-medium', italic: false },
    { text: 'Dinglumdangl', weight: 'font-normal', transform: 'uppercase', italic: true },
    { text: 'Ýringur', weight: 'font-bold', italic: true },
    { text: 'sálagárur', weight: 'font-light', italic: false },
    { text: 'Gorgeirsdrambur', weight: 'font-semibold', italic: true },
    { text: 'FÝR Δ', weight: 'font-extrabold', italic: true },
    { text: '6,4″ 128‴', weight: 'font-normal', italic: false },
    { text: 'Auvirðilegur', weight: 'font-medium', italic: true },
    { text: 'Rennimjúkur', weight: 'font-bold', italic: true },
    { text: 'digurbarki', weight: 'font-black', italic: true },
    { text: 'Slaufa', weight: 'font-light', transform: 'uppercase', italic: false },
    { text: 'Eyðimerkursandalabarnakór', weight: 'font-semibold', italic: true },
    { text: '456-3983', weight: 'font-medium', italic: false },
    { text: 'æðardúnn', weight: 'font-extrabold', transform: 'uppercase', italic: true },
    { text: 'Vísitölusjóður', weight: 'font-normal', italic: true },
    { text: 'Hughrif', weight: 'font-bold', italic: false },
    { text: 'glöggskyggni', weight: 'font-light', italic: true },
    { text: '←↙↖↑↔↓↗↘→', weight: 'font-semibold', italic: true },
    { text: 'Ýringur', weight: 'font-medium', italic: true },
    { text: '∑% = x (8 * 2x) / x3', weight: 'font-normal', italic: false },
    { text: 'Bægslagangur', weight: 'font-black', transform: 'uppercase', italic: true },
    { text: 'stríðsglæpir', weight: 'font-bold', italic: false },
    { text: 'svaðil-pött', weight: 'font-extrabold', italic: true },
    { text: '§ 55/@', weight: 'font-light', italic: true },
    { text: 'svarthvítar svikamyllur', weight: 'font-medium', italic: true },
    { text: 'sökkvandi skálínur', weight: 'font-semibold', italic: true },
    { text: 'Auvirðilegur', weight: 'font-normal', transform: 'uppercase', italic: false },
    { text: '&!?;', weight: 'font-bold', italic: true },
    { text: 'sjaldséðar sálagárur,', weight: 'font-light', italic: false },
    { text: 'dóm í dróma', weight: 'font-medium', italic: true },
    { text: 'Ljósop', weight: 'font-black', transform: 'uppercase', italic: true },
    { text: 'Andseti', weight: 'font-extrabold', italic: true },
    { text: 'yfirgengils falsmælgi', weight: 'font-normal', italic: false },
    { text: 'Pjúrítani 66/B', weight: 'font-semibold', italic: true },
    { text: 'lævís bellibrögð í friðrofi réttvísinnar?', weight: 'font-bold', italic: true },
    { text: 'óforsjáll duttlungur', weight: 'font-light', italic: false },
    { text: 'Frávikshegðun', weight: 'font-medium', transform: 'uppercase', italic: true },
    { text: 'Vélabrögð', weight: 'font-extrabold', italic: false },
    { text: 'Ranadýr', weight: 'font-normal', transform: 'uppercase', italic: true },
  ]

  return (
    <div className="w-full min-h-screen relative bg-surface">
      {/* MAIN CONTENT */}
      <section className="w-full py-24">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          {/* Type Specimens - Large Display Sizes */}
          <div className="flex flex-col" style={{ gap: '48px' }}>
            {words.map((word, index) => (
              <FitText key={index} text={word.text} weight={word.weight} transform={word.transform} italic={word.italic} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
