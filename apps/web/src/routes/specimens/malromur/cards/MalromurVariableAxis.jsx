import { useEffect, useRef } from 'react'

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

  const FitText = ({ text, weight, transform, italic }) => {
    const containerRef = useRef(null)
    const textRef = useRef(null)
    const wrapperRef = useRef(null)
    const canvasRef = useRef(null)

    useEffect(() => {
      const fitText = () => {
        if (!containerRef.current || !textRef.current || !wrapperRef.current) return

        const containerWidth = containerRef.current.offsetWidth
        let fontSize = 1000
        textRef.current.style.fontSize = fontSize + 'px'

        // Reduce font size until text fits
        while (textRef.current.scrollWidth > containerWidth && fontSize > 10) {
          fontSize -= 1
          textRef.current.style.fontSize = fontSize + 'px'
        }

        // Fine-tune: increase font size slightly if there's room
        while (textRef.current.scrollWidth < containerWidth && fontSize < 2000) {
          fontSize += 1
          textRef.current.style.fontSize = fontSize + 'px'
          if (textRef.current.scrollWidth > containerWidth) {
            fontSize -= 1
            textRef.current.style.fontSize = fontSize + 'px'
            break
          }
        }

        // First let the text render naturally to get its bounding box
        textRef.current.style.display = 'block'

        // Use canvas to measure precise text metrics
        if (!canvasRef.current) {
          canvasRef.current = document.createElement('canvas')
        }
        const ctx = canvasRef.current.getContext('2d')
        const computedStyle = window.getComputedStyle(textRef.current)
        ctx.font = computedStyle.font

        const metrics = ctx.measureText(text)

        // Get the actual rendered bounding box
        const bbox = textRef.current.getBoundingClientRect()

        // Calculate precise height from canvas metrics
        const metricsHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

        // Use the smaller of the two (tighter fit)
        const textHeight = Math.min(bbox.height, metricsHeight)

        // Set wrapper to exact text height with visible overflow to prevent clipping
        wrapperRef.current.style.height = textHeight + 'px'
        wrapperRef.current.style.overflow = 'visible'

        textRef.current.style.lineHeight = '1'
      }

      // Wait for fonts to load
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(fitText)
      } else {
        fitText()
      }

      window.addEventListener('resize', fitText)
      return () => window.removeEventListener('resize', fitText)
    }, [text])

    return (
      <div ref={wrapperRef} className="w-full">
        <div ref={containerRef} className="w-full">
          <div ref={textRef} className={`text-auto ${weight} ${italic ? 'italic' : 'not-italic'} font-['TGMalromur'] leading-none whitespace-nowrap ${transform || ''}`} style={{ display: 'block' }}>
            {text}
          </div>
        </div>
      </div>
    )
  }

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
