import { Pill, SectionLabel } from '@kol/ui'

const SpecimenRootSystem = () => {
  return (
    <>
      {/* TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center bg-surface-primary">
        <div className="max-w-[1400px] mx-auto text-center px-8">
          <Pill variant="inverse">Design System</Pill>

          <h1 className="kol-display-lg text-auto mt-6 mb-6" style={{ fontFamily: 'TGRoot', fontWeight: 700 }}>
            TG Rót
          </h1>

          <div className="w-32 h-[1px] bg-fg-24 mx-auto mb-6" />

          <p className="kol-mono-text text-fg-64 max-w-[700px] mx-auto">
            Variable sans-serif designed for structured design systems. Complete typographic hierarchy with weight and width axes.
          </p>
        </div>
      </section>

      {/* SPECIMEN CONTENT */}
      <main className="min-h-screen w-full bg-surface-primary">
      {/* Variable Axes Overview */}
      <section className="w-full py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-16">
            <SectionLabel text="Variable Axes" size="md" />
            <h2 className="kol-heading-lg text-auto mb-4">Two Axes of Control</h2>
            <p className="kol-mono-text text-fg-64 max-w-[700px]">
              Weight and width axes provide complete typographic flexibility for design systems.
            </p>
          </div>

          {/* Axis Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="kol-mono-xs text-fg-48">Weight Axis</span>
                <span className="kol-mono-xs text-auto">100–900</span>
              </div>
              <p className="kol-mono-text text-fg-64">
                Nine weights from Thin to Black with continuous interpolation for precise typographic control.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="kol-mono-xs text-fg-48">Width Axis</span>
                <span className="kol-mono-xs text-auto">100–400</span>
              </div>
              <p className="kol-mono-text text-fg-64">
                Narrow to Extended proportions for adaptive layouts and responsive typography.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Type Scale Grid */}
      <section className="w-full py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-16">
            <SectionLabel text="Type Scale" size="md" />
            <h2 className="kol-heading-lg text-auto mb-4">Display & Body</h2>
            <p className="kol-mono-text text-fg-64">
              Large display sizes paired with body text to demonstrate hierarchy.
            </p>
          </div>

          {/* Display Styles */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex gap-2">
                <Pill variant="subtle" size="sm">Display 1</Pill>
                <Pill variant="subtle" size="sm">80/88</Pill>
                <Pill variant="subtle" size="sm">Bold · 700</Pill>
              </div>
              <h2 className="text-[80px] leading-[88px] text-auto" style={{ fontFamily: 'TGRoot', fontWeight: 700 }}>
                Everyone has the right to freedom of thought
              </h2>
              <p className="text-[18px] leading-[28px] text-auto max-w-[900px]" style={{ fontFamily: 'TGRoot', fontWeight: 400 }}>
                Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
              </p>
            </div>

            <div className="w-full h-[1px] bg-fg-12" />

            <div className="space-y-6">
              <div className="flex gap-2">
                <Pill variant="subtle" size="sm">Display 2</Pill>
                <Pill variant="subtle" size="sm">64/72</Pill>
                <Pill variant="subtle" size="sm">Bold · 700</Pill>
              </div>
              <h2 className="text-[64px] leading-[72px] text-auto" style={{ fontFamily: 'TGRoot', fontWeight: 700 }}>
                Everyone has the right to freedom of thought
              </h2>
              <p className="text-[18px] leading-[28px] text-auto max-w-[900px]" style={{ fontFamily: 'TGRoot', fontWeight: 400 }}>
                Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Heading Scale */}
      <section className="w-full py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-16">
            <SectionLabel text="Headings" size="md" />
            <h2 className="kol-heading-lg text-auto mb-4">Heading Hierarchy</h2>
            <p className="kol-mono-text text-fg-64">
              Six heading levels with Extra Bold weight for strong typographic presence.
            </p>
          </div>

          <div className="space-y-12">
            {[
              { label: 'H1', size: 56, lineHeight: 64, weight: 800 },
              { label: 'H2', size: 48, lineHeight: 56, weight: 800 },
              { label: 'H3', size: 40, lineHeight: 48, weight: 800 },
              { label: 'H4', size: 32, lineHeight: 40, weight: 800 },
            ].map(heading => (
              <div key={heading.label} className="space-y-4">
                <div className="flex gap-2">
                  <Pill variant="subtle" size="sm">{heading.label}</Pill>
                  <Pill variant="subtle" size="sm">{heading.size}/{heading.lineHeight}</Pill>
                  <Pill variant="subtle" size="sm">Extra Bold · 800</Pill>
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
                <div className="w-full h-[1px] bg-fg-12" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Body Text */}
      <section className="w-full py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-16">
            <SectionLabel text="Body Text" size="md" />
            <h2 className="kol-heading-lg text-auto mb-4">Text Sizes</h2>
            <p className="kol-mono-text text-fg-64">
              Body text sizes for content hierarchy with Regular weight.
            </p>
          </div>

          <div className="space-y-12">
            {[
              { label: 'Large', size: 20, lineHeight: 32, weight: 400 },
              { label: 'Base', size: 18, lineHeight: 28, weight: 400 },
              { label: 'Small', size: 16, lineHeight: 24, weight: 400 },
              { label: 'Utility', size: 14, lineHeight: 20, weight: 400 }
            ].map(text => (
              <div key={text.label} className="space-y-4">
                <div className="flex gap-2">
                  <Pill variant="subtle" size="sm">{text.label}</Pill>
                  <Pill variant="subtle" size="sm">{text.size}/{text.lineHeight}</Pill>
                  <Pill variant="subtle" size="sm">Regular · 400</Pill>
                </div>
                <p
                  className="text-auto max-w-[900px]"
                  style={{
                    fontFamily: 'TGRoot',
                    fontWeight: text.weight,
                    fontSize: `${text.size}px`,
                    lineHeight: `${text.lineHeight}px`
                  }}
                >
                  Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
                </p>
                <div className="w-full h-[1px] bg-fg-12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Character Set */}
      <section className="w-full py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-16">
            <SectionLabel text="Character Set" size="md" />
            <h2 className="kol-heading-lg text-auto mb-4">Complete Glyph Coverage</h2>
            <p className="kol-mono-text text-fg-64">
              Full Latin character set with uppercase, lowercase, numbers, and punctuation.
            </p>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <Pill variant="subtle" size="sm">Uppercase</Pill>
              <p
                className="text-5xl text-auto tracking-wide"
                style={{ fontFamily: 'TGRoot', fontWeight: 400 }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              <div className="w-full h-[1px] bg-fg-12" />
            </div>

            <div className="space-y-4">
              <Pill variant="subtle" size="sm">Lowercase</Pill>
              <p
                className="text-5xl text-auto tracking-wide"
                style={{ fontFamily: 'TGRoot', fontWeight: 400 }}
              >
                abcdefghijklmnopqrstuvwxyz
              </p>
              <div className="w-full h-[1px] bg-fg-12" />
            </div>

            <div className="space-y-4">
              <Pill variant="subtle" size="sm">Numbers</Pill>
              <p
                className="text-5xl text-auto tracking-wide"
                style={{ fontFamily: 'TGRoot', fontWeight: 400 }}
              >
                0123456789
              </p>
              <div className="w-full h-[1px] bg-fg-12" />
            </div>

            <div className="space-y-4">
              <Pill variant="subtle" size="sm">Punctuation & Symbols</Pill>
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
    </>
  )
}

export default SpecimenRootSystem
