import { useState } from 'react'
import { FontPreviewItemAlt } from '@kol/ui'
import FoundrySection from './FoundrySection'

const FontPreviewSection = ({
  fontFamily = 'TGMalromur',
  badgeText = 'Málrómur',
  showDropdown = true,
  availableWeights = [
    'Thin', 'Extralight', 'Light',
    'Regular', 'Medium', 'Semibold',
    'Bold', 'Extrabold', 'Black'
  ],
  initialWeight = 'Regular'
}) => {
  const [selectedStyleVariant, setSelectedStyleVariant] = useState(showDropdown ? 'italic' : 'roman')
  const [selectedWeight, setSelectedWeight] = useState(initialWeight)
  const isItalic = selectedStyleVariant === 'italic'

  const weightOptions = availableWeights.map((label) => ({
    label,
    value: label
  }))

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={selectedStyleVariant}
          onStyleChange={setSelectedStyleVariant}
          showDropdown={showDropdown}
          badgeText={badgeText}
          icon="foundation"
          size="sm"
          selectedWeight={selectedWeight}
          onWeightChange={setSelectedWeight}
          showWeightDropdown={availableWeights.length > 0}
          weightOptions={weightOptions}
        />

        {/* Font Preview Items */}
        {[
          { size: 96, lines: 1 },
          { size: 64, lines: 3 },
          { size: 48, lines: 4 },
          { size: 24, lines: 5, leading: 50 }
        ].map(({ size, lines, leading }) => (
          <FontPreviewItemAlt
            key={size}
            fontFamily={fontFamily}
            fontStyle={isItalic ? 'italic' : 'normal'}
            initialWeight={selectedWeight}
            availableWeights={availableWeights}
            initialSize={size}
            initialLeading={leading}
            lineClamp={lines}
          />
        ))}
      </div>
    </section>
  )
}

export default FontPreviewSection
