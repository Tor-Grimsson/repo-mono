import { useState } from 'react'
import { StylesGrid } from '@kol/ui'

const StylesSection = () => {
  const styles = [
    { label: 'Thin', weight: 100 },
    { label: 'Thin Italic', weight: 100, italic: true },
    { label: 'Extralight', weight: 200 },
    { label: 'Extralight Italic', weight: 200, italic: true },
    { label: 'Light', weight: 300 },
    { label: 'Light Italic', weight: 300, italic: true },
    { label: 'Regular', weight: 400 },
    { label: 'Regular Italic', weight: 400, italic: true },
    { label: 'Medium', weight: 500 },
    { label: 'Medium Italic', weight: 500, italic: true },
    { label: 'Semibold', weight: 600 },
    { label: 'Semibold Italic', weight: 600, italic: true },
    { label: 'Bold', weight: 700 },
    { label: 'Bold Italic', weight: 700, italic: true },
    { label: 'Extrabold', weight: 800 },
    { label: 'Extrabold Italic', weight: 800, italic: true }
  ]

  const [currentStyle, setCurrentStyle] = useState(styles[6]) // Default to Regular

  return (
    <section className="h-screen py-12 lg:py-16">
      {/* Top: Headers */}
      <div className="flex justify-between mb-4">
        <h2 className="kol-label" style={{ color: 'var(--kol-surface-on-primary)' }}>
          Málrómur Styles
        </h2>
        <h2 className="kol-label" style={{ color: 'var(--kol-surface-on-primary)' }}>
          {styles.length} Styles
        </h2>
      </div>

      {/* Bottom: Preview + Styles Grid */}
      <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-start h-full w-full">
        {/* Left: Preview Panel - 50% with 4:3 aspect ratio */}
        <div className="w-1/2 aspect-[4/3] p-6 md:p-12 transition-colors duration-300 sticky top-24" style={{ backgroundColor: 'var(--kol-surface-on-primary)', borderRadius: '12px' }}>
          <div
            className="text-center transition-colors duration-300 w-full h-full flex flex-col justify-center items-center gap-2"
            style={{
              fontFamily: 'TGMalromur',
              fontWeight: currentStyle.weight,
              fontStyle: currentStyle.italic ? 'italic' : 'normal',
              color: 'var(--color-bg-primary)'
            }}
          >
            <div className="text-3xl md:text-5xl lg:text-6xl leading-none">AaBbCc</div>
            <div className="text-3xl md:text-5xl lg:text-6xl leading-none">01234567</div>
            <div className="text-3xl md:text-5xl lg:text-6xl leading-none">{'{(!@#$?&)}'}</div>
          </div>
        </div>

        {/* Right: Styles List - 50% - flows vertically */}
        <div className="w-1/2 h-full">
          <StylesGrid
            styles={styles}
            onStyleHover={setCurrentStyle}
          />
        </div>
      </div>
    </section>
  )
}

export default StylesSection
