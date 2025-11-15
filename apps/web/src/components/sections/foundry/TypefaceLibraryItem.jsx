import { useState, useRef, useLayoutEffect } from 'react'

/**
 * TypefaceLibraryItem - Unified component for typeface library display
 *
 * Displays typeface in either card or list format
 * Card view: vertical layout with large "Ðð" preview
 * List view: horizontal layout with alphabet preview
 *
 * Note: Should be wrapped with Link component from parent
 *
 * @param {Object} props
 * @param {Object} props.typeface - Typeface data object
 * @param {string} props.typeface.name - Typeface name (e.g., "TG Málrómur")
 * @param {string} props.typeface.styles - Style description (e.g., "Variable (wght, slnt)")
 * @param {string} props.variant - Display variant: 'card' or 'list' (default: 'card')
 */
const TypefaceLibraryItem = ({ typeface, variant = 'card' }) => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [visibleText, setVisibleText] = useState('Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz')
  // Map typeface name to font family
  const fontFamily = typeface.name === 'TG Rót' ? 'TGRoot' :
                     typeface.name === 'TG Tröllatunga' ? 'TGTrollatunga' :
                     typeface.name === 'TG Dylgjur' ? 'TGDylgjur' :
                     typeface.name === 'TG Gullhamrar' ? 'TGGullhamrar' :
                     typeface.name === 'TG Silfurbarki' ? 'TGSilfurbarki' :
                     typeface.name === 'TG Orðspor' ? 'TGOrdspor' :
                     'TGMalromur'

  const fontStyle = typeface.name === 'TG Málrómur' ? 'italic' : 'normal'

  const fullAlphabet = 'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz'

  // TEXT CLIPPING LOGIC - similar to DisplaySpecimen but for horizontal width
  useLayoutEffect(() => {
    if (variant !== 'list') return

    const container = containerRef.current
    const textElement = textRef.current
    if (!container || !textElement) return

    const calculateClipping = () => {
      // Get the container's available width minus padding (40px inset from right)
      const availableWidth = container.clientWidth - 40 // 40px inset
      const chars = fullAlphabet.split('')
      let clippedText = ''

      // Binary search to find maximum number of characters that fit
      let low = 0
      let high = chars.length

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        const testText = chars.slice(0, mid).join('')
        textElement.textContent = testText

        const textWidth = textElement.scrollWidth

        if (textWidth <= availableWidth) {
          clippedText = testText
          low = mid + 1
        } else {
          high = mid - 1
        }
      }

      setVisibleText(clippedText)
    }

    calculateClipping()

    // Recalculate on window resize
    window.addEventListener('resize', calculateClipping)

    return () => {
      window.removeEventListener('resize', calculateClipping)
    }
  }, [variant, fontFamily, fontStyle])

  // Card variant
  if (variant === 'card') {
    return (
      <div className="group bg-surface-primary group-hover:bg-surface-inverse rounded hover:shadow-lg transition-all duration-300 h-[500px] relative border border-fg-64">
          {/* Details at Top */}
          <div className="p-6 space-y-2 group-hover:opacity-0 transition-opacity duration-300 relative z-10">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="kol-helper-lg text-auto group-hover:text-auto-inverse transition-colors">
                {typeface.name}
              </h3>
            </div>
            <p className="kol-helper-s text-fg-64 group-hover:text-fg-inverse-64 transition-colors">
              {typeface.styles}
            </p>
          </div>

          {/* Preview Area */}
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end justify-start p-8">
            {/* Default: Ðð */}
            <div
              className="text-auto group-hover:text-auto-inverse text-[140px] lg:text-[160px] leading-none transition-all duration-300 group-hover:opacity-0 relative z-10"
              style={{
                fontFamily,
                fontStyle,
                fontWeight: 400
              }}
            >
              Ðð
            </div>
          </div>

          {/* Hover: Sentence - Covers entire card */}
          <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p
              className="text-auto-inverse text-4xl lg:text-5xl leading-tight text-center"
              style={{
                fontFamily,
                fontStyle,
                fontWeight: 400
              }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
    )
  }

  // List variant - compact horizontal style matching TypefaceVariablePreview
  return (
    <div ref={containerRef} className="self-stretch min-h-40 p-6 rounded border border-fg-16 flex flex-col justify-start items-start gap-6 mb-6 overflow-hidden">
      {/* Header Row */}
      <div className="self-stretch flex justify-between items-center">
        {/* Left: Typeface Name & Info */}
        <div className="w-64 flex justify-start items-start gap-6">
          <div className="flex-1 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-auto text-base font-normal font-['PP_Right_Grotesk_Mono'] uppercase leading-4 tracking-wide">
                {typeface.name}
              </div>
              <div className="self-stretch opacity-60 justify-start text-auto text-xs font-normal font-['PP_Right_Grotesk_Mono'] leading-3 tracking-tight">
                {typeface.styles}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status/Year info */}
        <div className="flex flex-col items-end gap-2">
          <span className="text-auto text-base font-normal font-['PP_Right_Grotesk_Mono'] leading-4 tracking-wide">
            {typeface.classification}
          </span>
          <span className="opacity-60 text-auto text-xs font-normal font-['PP_Right_Grotesk_Mono'] leading-3 tracking-tight">
            {typeface.year}
          </span>
        </div>
      </div>

      {/* Preview Text Row */}
      <div className="self-stretch rounded flex justify-start items-center">
        <div
          ref={textRef}
          className="flex-1 self-stretch justify-start text-auto font-black leading-[52px] whitespace-nowrap"
          style={{
            fontFamily,
            fontStyle,
            fontWeight: 400,
            fontSize: '48px',
            letterSpacing: '0'
          }}
        >
          {visibleText}
        </div>
      </div>
    </div>
  )
}

export default TypefaceLibraryItem
