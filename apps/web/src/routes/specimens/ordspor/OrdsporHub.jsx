import { Link } from 'react-router-dom'
import { SpecimenHero, Pill } from '@kol/ui'

const SpecimenOrdsporHub = () => {
  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <SpecimenHero
        title="Orðspor Specimens"
        subtitle="Variable weight typeface for impactful statements"
        description="TG Orðspor is a variable weight sans serif typeface currently in development. Specimen patterns will be developed alongside the typeface to demonstrate its capabilities for bold, impactful typography."
        fontFamily="TGOrdspor"
      >
        <div className="pt-6 flex gap-3 justify-center">
          <Pill variant="subtle" size="md">In Development</Pill>
          <Pill variant="subtle" size="md">Specimens Coming Soon</Pill>
        </div>
      </SpecimenHero>

      {/* Available Patterns */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="text-auto text-3xl font-normal font-['TGOrdspor'] leading-tight mb-4">
              Available Patterns
            </h2>
            <p className="kol-text-md text-fg-64 max-w-[600px]">
              Layout specimens demonstrating grid systems and typographic patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Layout L1 */}
            <Link
              to="/specimen/ordspor/layout/l-1"
              className="bg-container-primary p-8 rounded-sm hover:bg-container-secondary transition-colors group"
            >
              <h3 className="text-auto text-xl font-normal font-['TGOrdspor'] leading-tight mb-3 group-hover:text-fg-88 transition-colors">
                Grid System L1
              </h3>
              <p className="kol-text-sm text-fg-64 mb-4">
                8-page grid system demonstration with various column layouts and baseline grid examples
              </p>
              <p className="kol-mono-xs text-fg-48">8 pages</p>
            </Link>

            {/* Layout L2 */}
            <Link
              to="/specimen/ordspor/layout/l-2"
              className="bg-container-primary p-8 rounded-sm hover:bg-container-secondary transition-colors group"
            >
              <h3 className="text-auto text-xl font-normal font-['TGOrdspor'] leading-tight mb-3 group-hover:text-fg-88 transition-colors">
                Grid System L2
              </h3>
              <p className="kol-text-sm text-fg-64 mb-4">
                Type sizes, exhibition catalogues, and layout pattern demonstrations
              </p>
              <p className="kol-mono-xs text-fg-48">8 pages</p>
            </Link>

            {/* Layout L2 New */}
            <Link
              to="/specimen/ordspor/layout/l-2-new"
              className="bg-container-primary p-8 rounded-sm hover:bg-container-secondary transition-colors group"
            >
              <h3 className="text-auto text-xl font-normal font-['TGOrdspor'] leading-tight mb-3 group-hover:text-fg-88 transition-colors">
                Type Sizes Specimen
              </h3>
              <p className="kol-text-sm text-fg-64 mb-4">
                Simplified single-page type sizes demonstration using TG Root
              </p>
              <p className="kol-mono-xs text-fg-48">1 page</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon Message */}
      <section className="w-full px-8 py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-surface-primary p-12 rounded-sm text-center">
            <h3 className="text-auto text-2xl font-normal font-['TGOrdspor'] leading-tight mb-4">
              Typeface In Development
            </h3>
            <p className="kol-text-lg text-fg-64 max-w-[600px] mx-auto">
              TG Orðspor is currently being designed and refined. Additional specimen patterns
              will be created to showcase the variable weight capabilities once the typeface design is complete.
            </p>
          </div>
        </div>
      </section>

      {/* Variable Font Features Preview */}
      <section className="w-full px-8 py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-auto text-4xl font-normal font-['TGOrdspor'] leading-tight mb-4">
              Variable Font Axis
            </h2>
            <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
              Single axis of continuous weight variation for powerful typographic control
            </p>
          </div>

          <div className="max-w-[600px] mx-auto">
            <div className="bg-surface-primary p-12 rounded-sm">
              <div className="mb-6">
                <div className="kol-mono-xs text-fg-48 mb-2">Weight Axis</div>
                <div className="text-auto text-2xl font-normal font-['TGOrdspor']" style={{ fontWeight: 400 }}>
                  Variable (wght)
                </div>
              </div>
              <p className="kol-text-md text-fg-64">
                Continuous weight variation designed for bold, impactful statements
                and headlines where typographic presence matters
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Typeface */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="text-auto text-4xl font-normal font-['TGOrdspor'] leading-tight">
            About TG Orðspor
          </h2>

          <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
            A variable weight sans serif typeface for powerful typographic statements.
            With its bold character and variable weight axis, Orðspor will provide
            designers with precise control for impactful headlines and display typography.
          </p>

          <div className="pt-4">
            <Link
              to="/foundry/ordspor"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto text-base font-semibold font-['TGMalromur'] uppercase tracking-wider hover:bg-fg-88 transition-colors"
            >
              View Typeface Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SpecimenOrdsporHub
