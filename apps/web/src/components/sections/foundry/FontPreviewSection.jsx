import { useState } from 'react'
import { FontPreviewItem, SPECIMEN_TEXT_ICELANDIC } from '@kol/ui'
import FoundrySection from './components/FoundrySection'

const FontPreviewSection = ({
  fontFamily = 'TGMalromur',
  badgeText = 'Málrómur Aa',
  showDropdown = true
}) => {
  const [selectedStyleVariant, setSelectedStyleVariant] = useState('italic')
  const isItalic = selectedStyleVariant === 'italic'

  const previews = [
    {
      initialSize: 96,
      initialLineHeight: 100,
      text: SPECIMEN_TEXT_ICELANDIC,
      colSpan: 2,
      disableAutoSize: true
    },
    {
      initialSize: 64,
      initialLineHeight: 110,
      text: SPECIMEN_TEXT_ICELANDIC,
      colSpan: 2,
      disableAutoSize: true
    },
    {
      initialSize: 48,
      initialLineHeight: 120,
      text: SPECIMEN_TEXT_ICELANDIC,
      colSpan: 1,
      disableAutoSize: true
    },
    {
      initialSize: 24,
      initialLineHeight: 140,
      text: SPECIMEN_TEXT_ICELANDIC,
      colSpan: 1,
      disableAutoSize: true
    }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={selectedStyleVariant}
          onStyleChange={setSelectedStyleVariant}
          showDropdown={showDropdown}
          badgeText={badgeText}
        />

        {/* Preview Items */}
        <div className="flex flex-col gap-0">
          {/* Items 1 and 2 - Full width */}
          {previews.slice(0, 2).map((preview, index) => (
            <FontPreviewItem
              key={index}
              initialSize={preview.initialSize}
              initialLineHeight={preview.initialLineHeight}
              text={preview.text}
              fontFamily={fontFamily}
              fontStyle={isItalic ? 'italic' : 'normal'}
              textClassName="text-auto"
              variant="desktop"
              disableAutoSize={preview.disableAutoSize}
            />
          ))}

          {/* Items 3 and 4 - Side by side on desktop */}
          <div className="flex flex-col lg:flex-row lg:gap-10">
            {previews.slice(2, 4).map((preview, index) => (
              <div key={index + 2} className="lg:flex-1 lg:min-w-0">
                <FontPreviewItem
                  initialSize={preview.initialSize}
                  initialLineHeight={preview.initialLineHeight}
                  text={preview.text}
                  fontFamily={fontFamily}
                  fontStyle={isItalic ? 'italic' : 'normal'}
                  textClassName="text-auto"
                  variant="desktop-small"
                  disableAutoSize={preview.disableAutoSize}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FontPreviewSection
