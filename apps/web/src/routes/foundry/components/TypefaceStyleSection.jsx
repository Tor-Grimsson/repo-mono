import { useState } from 'react'
import { StylesGrid } from '@kol/ui'
import FoundrySection from './FoundrySection'

/**
 * Parameterized Typeface Style Section Component
 *
 * Replaces FoundryStyleSection.jsx and FoundryStyleSectionRoot.jsx
 * with a single data-driven component
 *
 * Handles:
 * - Weight-only typefaces (Málrómur, Gullhamrar, Orðspor)
 * - Weight + Width typefaces (Rót)
 * - Italic variants (Málrómur)
 * - Static typefaces (Dylgjur, Silfurbarki, Tröllatunga)
 *
 * @param {object} typeface - Typeface configuration object from typefaceConfig
 */
const TypefaceStyleSection = ({ typeface }) => {
  const {
    fontFamily,
    badgeText,
    styles: styleConfig
  } = typeface

  const {
    hasWeight,
    hasWidth,
    hasItalic,
    defaultStyle = 'weight',
    weights = [],
    widths = []
  } = styleConfig

  // Determine if we need a dropdown (only for Rót with weight/width options)
  const showDropdown = hasWeight && hasWidth
  const styleOptions = showDropdown
    ? [
        { label: 'Weight', value: 'weight' },
        { label: 'Width', value: 'width' }
      ]
    : null

  // State management
  const [selectedStyleVariant, setSelectedStyleVariant] = useState(
    hasItalic ? 'italic' : defaultStyle
  )

  const isItalic = selectedStyleVariant === 'italic'

  // Determine which styles array to use
  const styles = showDropdown && selectedStyleVariant === 'width' ? widths : weights

  // Default to Regular weight (index 3) or Normal width (index 2)
  const defaultStyleIndex = showDropdown && selectedStyleVariant === 'width' ? 2 : 3
  const [currentStyle, setCurrentStyle] = useState(
    styles[defaultStyleIndex] || styles[0]
  )

  // Handle style variant change (for Rót weight/width toggle)
  const handleStyleVariantChange = (newVariant) => {
    setSelectedStyleVariant(newVariant)
    // Update current style to match the new variant
    if (newVariant === 'weight') {
      setCurrentStyle(weights[3] || weights[0]) // Regular weight
    } else if (newVariant === 'width') {
      setCurrentStyle(widths[2] || widths[0]) // Normal width
    }
  }

  // Build inline styles for the preview
  const previewStyle = {
    fontFamily: fontFamily,
    fontWeight: currentStyle.weight || 400,
    fontStyle: isItalic ? 'italic' : 'normal'
  }

  // Add width variation for Rót
  if (currentStyle.width) {
    previewStyle.fontVariationSettings = `'wdth' ${currentStyle.width}`
  }

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={selectedStyleVariant}
          onStyleChange={handleStyleVariantChange}
          styleOptions={styleOptions}
          showDropdown={showDropdown}
          badgeText={badgeText}
        />

        {/* Preview + Styles Grid */}
        <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-start w-full">
          {/* Left: Preview Panel - 50% with 4:3 aspect ratio */}
          <div className="w-1/2 aspect-[4/3] p-6 md:p-12 transition-colors duration-300 sticky top-24 bg-auto-inverse rounded-xl">
            <div
              className="text-center transition-colors duration-300 w-full h-full flex flex-col justify-center items-center gap-2 text-auto-inverse"
              style={previewStyle}
            >
              <div className="text-3xl md:text-5xl lg:text-6xl leading-none">AaBbCc</div>
              <div className="text-3xl md:text-5xl lg:text-6xl leading-none">01234567</div>
              <div className="text-3xl md:text-5xl lg:text-6xl leading-none">{'{(!@#$?&)}'}</div>
            </div>
          </div>

          {/* Right: Styles List - 50% - flows vertically */}
          <div className="w-1/2">
            <StylesGrid
              styles={styles}
              currentStyle={currentStyle}
              isItalic={isItalic}
              onStyleHover={setCurrentStyle}
              onStyleClick={setCurrentStyle}
              fontFamily={fontFamily}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TypefaceStyleSection
