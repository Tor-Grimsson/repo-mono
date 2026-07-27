import { useState } from 'react'
import FoundrySection from './FoundrySection'
import GlyphMetricsGrid from '../../../components/fontviewer/GlyphMetricsGrid'

const GlyphMetricsSection = ({
  fontFamily = 'TGMalromur',
  fontUrlRoman,
  fontUrlItalic,
  fontStyle = 'normal',
  badgeText = 'Málrómur',
  showDropdown = true,
  // Variable font axis support
  hasWeight = false,
  hasWidth = false,
  weights = [],
  widths = []
}) => {
  const [selectedStyleVariant, setSelectedStyleVariant] = useState(
    fontStyle === 'italic' ? 'italic' : 'roman'
  )
  const [selectedAxis, setSelectedAxis] = useState('weight')
  const [selectedWeight, setSelectedWeight] = useState(400)
  const [selectedWidth, setSelectedWidth] = useState(100)

  const isItalic = selectedStyleVariant === 'italic'

  // Select the correct font URL based on the dropdown
  const currentFontUrl = isItalic ? fontUrlItalic : fontUrlRoman

  // Build axis options for dropdown
  const axisOptions = []
  if (hasWeight) axisOptions.push({ label: 'Weight', value: 'weight' })
  if (hasWidth) axisOptions.push({ label: 'Width', value: 'width' })

  // Build value options based on selected axis
  const valueOptions = selectedAxis === 'weight'
    ? weights.map(w => ({ label: w.label, value: w.weight }))
    : widths.map(w => ({ label: w.label, value: w.width }))

  const selectedValue = selectedAxis === 'weight' ? selectedWeight : selectedWidth
  const onValueChange = selectedAxis === 'weight' ? setSelectedWeight : setSelectedWidth

  // Show axis dropdown if font has variable axes
  const showAxisDropdown = axisOptions.length > 0

  // Get variation settings for the glyph display
  const variationSettings = {}
  if (hasWeight) variationSettings.wght = selectedWeight
  if (hasWidth) variationSettings.wdth = selectedWidth

  // Style dropdown: roman/italic when font has italic
  const italicOptions = [
    { label: 'Roman', value: 'roman' },
    { label: 'Italic', value: 'italic' }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={showDropdown ? selectedStyleVariant : showAxisDropdown ? selectedValue : undefined}
          onStyleChange={showDropdown ? setSelectedStyleVariant : showAxisDropdown ? onValueChange : undefined}
          showDropdown={showDropdown || (showAxisDropdown && valueOptions.length > 0)}
          styleOptions={showDropdown ? italicOptions : valueOptions}
          badgeText={badgeText}
          icon="foundation"
          size="sm"
          showWeightDropdown={showAxisDropdown && valueOptions.length > 0}
          weightOptions={valueOptions}
          selectedWeight={selectedValue}
          onWeightChange={onValueChange}
        />

        <GlyphMetricsGrid
          fontUrl={currentFontUrl}
          fontFamily={fontFamily}
          fontStyle="normal"
          variationSettings={variationSettings}
        />
      </div>
    </section>
  )
}

export default GlyphMetricsSection
