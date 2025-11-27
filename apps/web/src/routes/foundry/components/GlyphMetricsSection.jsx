import { useState } from 'react'
import FoundrySection from './FoundrySection'
import GlyphMetricsGrid from '../../../components/fontviewer/GlyphMetricsGrid'

const GlyphMetricsSection = ({
  fontFamily = 'TGMalromur',
  fontUrlRoman,
  fontUrlItalic,
  fontStyle = 'normal',
  badgeText = 'Málrómur',
  showDropdown = true
}) => {
  const [selectedStyleVariant, setSelectedStyleVariant] = useState(
    fontStyle === 'italic' ? 'italic' : 'roman'
  )
  const isItalic = selectedStyleVariant === 'italic'

  // Select the correct font URL based on the dropdown
  const currentFontUrl = isItalic ? fontUrlItalic : fontUrlRoman

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={selectedStyleVariant}
          onStyleChange={setSelectedStyleVariant}
          showDropdown={showDropdown}
          badgeText={badgeText}
        />

        <GlyphMetricsGrid
          fontUrl={currentFontUrl}
          fontFamily={fontFamily}
          fontStyle="normal"
        />
      </div>
    </section>
  )
}

export default GlyphMetricsSection
