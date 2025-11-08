import { useState } from 'react'
import { StylesGrid } from '@kol/ui'
import FoundrySection from './components/FoundrySection'

const FoundryStyleSectionRoot = () => {
  const weightStyles = [
    { label: 'Thin', weight: 100 },
    { label: 'Extralight', weight: 200 },
    { label: 'Light', weight: 300 },
    { label: 'Regular', weight: 400 },
    { label: 'Medium', weight: 500 },
    { label: 'Semibold', weight: 600 },
    { label: 'Bold', weight: 700 },
    { label: 'Extrabold', weight: 800 },
    { label: 'Black', weight: 900 }
  ]

  const widthStyles = [
    { label: 'Narrow', width: 100 },
    { label: 'Semi-Narrow', width: 175 },
    { label: 'Normal', width: 250 },
    { label: 'Semi-Extended', width: 325 },
    { label: 'Extended', width: 400 }
  ]

  const [selectedStyleVariant, setSelectedStyleVariant] = useState('weight')
  const styles = selectedStyleVariant === 'weight' ? weightStyles : widthStyles
  const [currentStyle, setCurrentStyle] = useState(weightStyles[3]) // Default to Regular

  const styleOptions = [
    { label: 'Weight', value: 'weight' },
    { label: 'Width', value: 'width' }
  ]

  const handleStyleVariantChange = (newVariant) => {
    setSelectedStyleVariant(newVariant)
    // Update current style to match the new variant
    if (newVariant === 'weight') {
      setCurrentStyle(weightStyles[3]) // Regular weight
    } else {
      setCurrentStyle(widthStyles[2]) // Normal width
    }
  }

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={selectedStyleVariant}
          onStyleChange={handleStyleVariantChange}
          styleOptions={styleOptions}
          badgeText="Rót Aa"
        />

        {/* Preview + Styles Grid */}
        <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-start w-full">
          {/* Left: Preview Panel - 50% with 4:3 aspect ratio */}
          <div className="w-1/2 aspect-[4/3] p-6 md:p-12 transition-colors duration-300 sticky top-24 bg-auto-inverse rounded-xl">
            <div
              className="text-center transition-colors duration-300 w-full h-full flex flex-col justify-center items-center gap-2 text-auto-inverse"
              style={{
                fontFamily: 'TGRoot',
                fontWeight: currentStyle.weight || 400,
                fontVariationSettings: currentStyle.width ? `'wdth' ${currentStyle.width}` : "'wdth' 250",
                fontStyle: 'normal'
              }}
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
              isItalic={false}
              onStyleHover={setCurrentStyle}
              onStyleClick={setCurrentStyle}
              fontFamily="TGRoot"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FoundryStyleSectionRoot
