import { useState } from 'react'

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
        <h2 className="kol-label" style={{ color: 'var(--foreground)' }}>
          Málrómur Styles
        </h2>
        <h2 className="kol-label" style={{ color: 'var(--foreground)' }}>
          {styles.length} Styles
        </h2>
      </div>

      {/* Bottom: Preview + Styles Grid */}
      <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-start h-full w-full">
        {/* Left: Preview Panel - 50% with 4:3 aspect ratio */}
        <div className="w-1/2 aspect-[4/3] p-6 md:p-12 transition-colors duration-300 sticky top-24" style={{ backgroundColor: 'var(--foreground)', borderRadius: '12px' }}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 h-full auto-rows-fr">
            {styles.map((style, index) => (
              <button
                key={`${style.label}-${index}`}
                onMouseEnter={() => setCurrentStyle(style)}
                className="styleButtonWithHover text-center px-4 py-3 rounded md:rounded-lg group h-full flex flex-row items-center justify-between md:items-start"
              >
                <span
                  className="font-medium transition-colors duration-300 lg:text-2xl text-left md:self-end"
                  style={{
                    fontFamily: 'TGMalromur',
                    fontStyle: style.italic ? 'italic' : 'normal',
                    fontWeight: style.weight,
                    fontSize: 'clamp(12px, calc(16px - (500px - 100vw) * 0.08), 16px)'
                  }}
                >
                  {style.label}
                </span>
                <span
                  className="lg:text-2xl font-bold transition-colors duration-200 text-right md:self-start"
                  style={{
                    fontFamily: 'TGMalromur',
                    fontSize: 'clamp(12px, calc(16px - (500px - 100vw) * 0.08), 16px)',
                    color: 'var(--color-accent-red)'
                  }}
                >
                  {style.weight}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StylesSection
