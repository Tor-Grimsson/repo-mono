import { useState } from 'react'
import { StylesGrid } from '@kol/ui'
import FoundrySection from './components/FoundrySection'

const FoundryStyleSection = () => {
  const styles = [
    { label: 'Thin', weight: 100 },
    { label: 'Extralight', weight: 200 },
    { label: 'Light', weight: 300 },
    { label: 'Regular', weight: 400 },
    { label: 'Medium', weight: 500 },
    { label: 'Semibold', weight: 600 },
    { label: 'Bold', weight: 700 },
    { label: 'Extrabold', weight: 800 }
  ]

  const [selectedStyleVariant, setSelectedStyleVariant] = useState('italic')
  const isItalic = selectedStyleVariant === 'italic'
  const [currentStyle, setCurrentStyle] = useState(styles[3]) // Default to Regular

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={selectedStyleVariant}
          onStyleChange={setSelectedStyleVariant}
        />

        {/* Preview + Styles Grid */}
        <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-start w-full">
          {/* Left: Preview Panel - 50% with 4:3 aspect ratio */}
          <div className="w-1/2 aspect-[4/3] p-6 md:p-12 transition-colors duration-300 sticky top-24 bg-auto-inverse rounded-xl">
            <div
              className="text-center transition-colors duration-300 w-full h-full flex flex-col justify-center items-center gap-2 text-auto-inverse"
              style={{
                fontFamily: 'TGMalromur',
                fontWeight: currentStyle.weight,
                fontStyle: isItalic ? 'italic' : 'normal'
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
              isItalic={isItalic}
              onStyleHover={setCurrentStyle}
              onStyleClick={setCurrentStyle}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FoundryStyleSection
