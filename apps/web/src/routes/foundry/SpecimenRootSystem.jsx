import { useState, useEffect } from 'react'
import { Pill, Slider } from '@kol/ui'

const SpecimenRootSystem = () => {
  const [weight, setWeight] = useState(400)
  const [width, setWidth] = useState(250)

  // Animate weight and width on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setWeight(prev => {
        if (prev >= 900) return 100
        return prev + 50
      })
      setWidth(prev => {
        if (prev >= 400) return 100
        return prev + 25
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Pill variant="subtle" size="sm">TG Root</Pill>
              <Pill variant="subtle" size="sm">Specimen</Pill>
            </div>
            <h1
              className="text-8xl lg:text-[120px] text-auto leading-none mb-8 transition-all duration-1000"
              style={{
                fontFamily: 'TGRoot',
                fontWeight: weight,
                fontVariationSettings: `'wdth' ${width}`
              }}
            >
              Root in Systems
            </h1>
            <p className="kol-text-lg text-fg-64 max-w-[700px]">
              Variable sans serif designed for structured design systems. Three axes of control—weight, width, and precision—for complete typographic hierarchy.
            </p>
          </div>

          {/* Axis Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-container-primary rounded">
              <div className="kol-mono-xs text-fg-48 mb-2">Weight Axis</div>
              <div className="kol-text-lg text-auto">100–900</div>
              <div className="kol-mono-xxs text-fg-64 mt-2">Nine weights from Thin to Black</div>
            </div>
            <div className="p-6 bg-container-primary rounded">
              <div className="kol-mono-xs text-fg-48 mb-2">Width Axis</div>
              <div className="kol-text-lg text-auto">100–400</div>
              <div className="kol-mono-xxs text-fg-64 mt-2">Narrow to Extended proportions</div>
            </div>
            <div className="p-6 bg-container-primary rounded">
              <div className="kol-mono-xs text-fg-48 mb-2">Variable Font</div>
              <div className="kol-text-lg text-auto">2 Axes</div>
              <div className="kol-mono-xxs text-fg-64 mt-2">Continuous interpolation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Type Scale Grid */}
      <section className="w-full px-8 py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <h2 className="kol-heading-lg text-auto mb-2">Type Scale</h2>
            <p className="kol-text-md text-fg-64">Complete hierarchy from display to utility sizes</p>
          </div>

          {/* Display Styles */}
          <div className="mb-16">
            <div className="kol-mono-xs text-fg-48 mb-6 uppercase">Display with Body</div>
            <div className="space-y-12">
              <div className="bg-surface-primary p-12 rounded">
                <div className="flex gap-2 mb-6">
                  <Pill variant="subtle" size="sm">D1</Pill>
                  <Pill variant="subtle" size="sm">80/88</Pill>
                  <Pill variant="subtle" size="sm">Bold</Pill>
                </div>
                <h2 className="text-[80px] leading-[88px] text-auto mb-8" style={{ fontFamily: 'TGRoot', fontWeight: 700 }}>
                  Everyone has the right to freedom of thought
                </h2>
                <p className="text-[18px] leading-[28px] text-auto max-w-[900px]" style={{ fontFamily: 'TGRoot', fontWeight: 400 }}>
                  Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
                </p>
                <p className="text-[18px] leading-[28px] text-fg-64 max-w-[900px] mt-6" style={{ fontFamily: 'TGRoot', fontWeight: 400 }}>
                  Alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information, ideas and periodic holidays.
                </p>
              </div>

              <div className="bg-surface-primary p-12 rounded">
                <div className="flex gap-2 mb-6">
                  <Pill variant="subtle" size="sm">D2</Pill>
                  <Pill variant="subtle" size="sm">72/80</Pill>
                  <Pill variant="subtle" size="sm">Bold</Pill>
                </div>
                <h2 className="text-[72px] leading-[80px] text-auto mb-8" style={{ fontFamily: 'TGRoot', fontWeight: 700 }}>
                  Everyone has the right to freedom of thought
                </h2>
                <p className="text-[18px] leading-[28px] text-auto max-w-[900px]" style={{ fontFamily: 'TGRoot', fontWeight: 400 }}>
                  Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
                </p>
                <p className="text-[18px] leading-[28px] text-fg-64 max-w-[900px] mt-6" style={{ fontFamily: 'TGRoot', fontWeight: 400 }}>
                  Alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information, ideas and periodic holidays.
                </p>
              </div>

              <div className="bg-surface-primary p-12 rounded">
                <div className="flex gap-2 mb-6">
                  <Pill variant="subtle" size="sm">D3</Pill>
                  <Pill variant="subtle" size="sm">64/72</Pill>
                  <Pill variant="subtle" size="sm">Bold</Pill>
                </div>
                <h2 className="text-[64px] leading-[72px] text-auto mb-8" style={{ fontFamily: 'TGRoot', fontWeight: 700 }}>
                  Everyone has the right to freedom of thought
                </h2>
                <p className="text-[18px] leading-[28px] text-auto max-w-[900px]" style={{ fontFamily: 'TGRoot', fontWeight: 400 }}>
                  Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
                </p>
                <p className="text-[18px] leading-[28px] text-fg-64 max-w-[900px] mt-6" style={{ fontFamily: 'TGRoot', fontWeight: 400 }}>
                  Alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information, ideas and periodic holidays.
                </p>
              </div>
            </div>
          </div>

          {/* Heading Styles */}
          <div className="mb-16">
            <div className="kol-mono-xs text-fg-48 mb-6 uppercase">Heading</div>
            <div className="space-y-6">
              {[
                { label: 'H1', size: 56, lineHeight: 64, weight: 800 },
                { label: 'H2', size: 48, lineHeight: 56, weight: 800 },
                { label: 'H3', size: 44, lineHeight: 52, weight: 800 },
                { label: 'H4', size: 40, lineHeight: 48, weight: 800 },
                { label: 'H5', size: 36, lineHeight: 44, weight: 800 },
                { label: 'H6', size: 32, lineHeight: 40, weight: 800 }
              ].map(heading => (
                <div key={heading.label} className="bg-surface-primary p-6 rounded">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2">
                      <Pill variant="subtle" size="sm">{heading.label}</Pill>
                      <Pill variant="subtle" size="sm">{heading.size}/{heading.lineHeight}</Pill>
                      <Pill variant="subtle" size="sm">Extra Bold</Pill>
                    </div>
                  </div>
                  <p
                    className="text-auto"
                    style={{
                      fontFamily: 'TGRoot',
                      fontWeight: heading.weight,
                      fontSize: `${heading.size}px`,
                      lineHeight: `${heading.lineHeight}px`
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Text Styles */}
          <div className="mb-16">
            <div className="kol-mono-xs text-fg-48 mb-6 uppercase">Text / Body</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'T1', size: 24, lineHeight: 36, weight: 400 },
                { label: 'T2', size: 20, lineHeight: 32, weight: 400 },
                { label: 'T3', size: 18, lineHeight: 28, weight: 400 },
                { label: 'T4', size: 16, lineHeight: 24, weight: 400 },
                { label: 'T5', size: 14, lineHeight: 20, weight: 400 },
                { label: 'T6', size: 12, lineHeight: 16, weight: 400 }
              ].map(text => (
                <div key={text.label} className="bg-surface-primary p-6 rounded">
                  <div className="flex gap-2 mb-3">
                    <Pill variant="subtle" size="sm">{text.label}</Pill>
                    <Pill variant="subtle" size="sm">{text.size}/{text.lineHeight}</Pill>
                    <Pill variant="subtle" size="sm">Regular</Pill>
                  </div>
                  <p
                    className="text-auto"
                    style={{
                      fontFamily: 'TGRoot',
                      fontWeight: text.weight,
                      fontSize: `${text.size}px`,
                      lineHeight: `${text.lineHeight}px`
                    }}
                  >
                    Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Axis Playground */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <h2 className="kol-heading-lg text-auto mb-2">Variable Axes</h2>
            <p className="kol-text-md text-fg-64">
              Explore Root's weight and width axes across different type sizes
            </p>
          </div>

          <div className="space-y-8">
            {/* Large Preview */}
            <div className="bg-container-primary p-12 rounded">
              <div className="mb-8">
                <div className="flex gap-2 mb-4">
                  <Pill variant="subtle">wght {weight}</Pill>
                  <Pill variant="subtle">wdth {width}</Pill>
                </div>
                <p
                  className="text-[80px] leading-[88px] text-auto transition-all duration-300"
                  style={{
                    fontFamily: 'TGRoot',
                    fontWeight: weight,
                    fontVariationSettings: `'wdth' ${width}`
                  }}
                >
                  The quick brown fox
                </p>
              </div>

              <div className="space-y-4">
                <Slider
                  label="Weight"
                  min={100}
                  max={900}
                  value={weight}
                  onChange={setWeight}
                  variant="minimal"
                />
                <Slider
                  label="Width"
                  min={100}
                  max={400}
                  value={width}
                  onChange={setWidth}
                  variant="minimal"
                />
              </div>
            </div>

            {/* Multi-Size Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Display', size: 64 },
                { label: 'Heading', size: 40 },
                { label: 'Body', size: 20 },
                { label: 'Utility', size: 14 }
              ].map(item => (
                <div key={item.label} className="bg-container-primary p-6 rounded">
                  <div className="flex gap-2 mb-4">
                    <Pill variant="subtle" size="sm">{item.label}</Pill>
                    <Pill variant="subtle" size="sm">{item.size}px</Pill>
                  </div>
                  <p
                    className="text-auto transition-all duration-300"
                    style={{
                      fontFamily: 'TGRoot',
                      fontWeight: weight,
                      fontVariationSettings: `'wdth' ${width}`,
                      fontSize: `${item.size}px`,
                      lineHeight: 1.4
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Character Set */}
      <section className="w-full px-8 py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <h2 className="kol-heading-lg text-auto mb-2">Character Set</h2>
            <p className="kol-text-md text-fg-64">Complete glyph coverage</p>
          </div>

          <div className="space-y-8">
            <div className="bg-surface-primary p-8 rounded">
              <div className="kol-mono-xs text-fg-48 mb-4">Uppercase</div>
              <p
                className="text-5xl text-auto tracking-wide"
                style={{ fontFamily: 'TGRoot', fontWeight: 400 }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
            </div>

            <div className="bg-surface-primary p-8 rounded">
              <div className="kol-mono-xs text-fg-48 mb-4">Lowercase</div>
              <p
                className="text-5xl text-auto tracking-wide"
                style={{ fontFamily: 'TGRoot', fontWeight: 400 }}
              >
                abcdefghijklmnopqrstuvwxyz
              </p>
            </div>

            <div className="bg-surface-primary p-8 rounded">
              <div className="kol-mono-xs text-fg-48 mb-4">Numbers</div>
              <p
                className="text-5xl text-auto tracking-wide"
                style={{ fontFamily: 'TGRoot', fontWeight: 400 }}
              >
                0123456789
              </p>
            </div>

            <div className="bg-surface-primary p-8 rounded">
              <div className="kol-mono-xs text-fg-48 mb-4">Punctuation & Symbols</div>
              <p
                className="text-5xl text-auto tracking-wide"
                style={{ fontFamily: 'TGRoot', fontWeight: 400 }}
              >
                !@#$%^&*()_+-=[]{}|;:'",./&lt;&gt;?
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SpecimenRootSystem
