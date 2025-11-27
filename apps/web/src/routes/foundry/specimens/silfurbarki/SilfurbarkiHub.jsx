import SEO from '../../../../components/layout/SEO'
import { OverviewHero, FoundryCTA, Pill } from '@kol/ui'
import FoundryFeatureSection from '../../components/FoundryFeatureSection'

const SpecimenSilfurbarkiHub = () => {
  return (
    <>
      <SEO
        title="Silfurbarki Specimen — Kolkrabbi Foundry"
        description="Elegant serif typeface in development. Early specimen preview showcasing character and design direction."
        ogTitle="Silfurbarki Type Specimen — In Development"
        ogDescription="TG Silfurbarki early specimen preview"
        ogUrl="https://kolkrabbi.io/foundry/specimen/silfurbarki"
        canonical="https://kolkrabbi.io/foundry/specimen/silfurbarki"
      />

      <main className="min-h-screen w-full bg-surface-primary">
        {/* Hero Section */}
        <OverviewHero
          badge={
            <div className="flex items-center gap-2">
              <span>Serif</span>
              <Pill variant="subtle" size="sm">In Development</Pill>
            </div>
          }
          title={
            <span style={{ fontFamily: 'TGSilfurbarki', textTransform: 'none' }}>
              Silfurbarki
            </span>
          }
          description="An elegant serif typeface with refined proportions and delicate details, currently under development. This early specimen showcases the direction and character of the typeface design."
          categories={['Serif', 'Elegant', 'Editorial']}
        />

        {/* Featured Image - Placeholder */}
        <section className="w-full py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary flex items-center justify-center">
              <div className="text-center">
                <p className="kol-mono-xs text-fg-48 mb-2">Early Preview</p>
                <p className="text-auto text-2xl font-normal font-['TGSilfurbarki']">
                  In Development
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full h-[720px] flex items-center">
          <div className="max-w-[1400px] mx-auto">
            <FoundryFeatureSection
              label="About the Typeface"
              title="Refined Proportions & Delicate Details"
              description="TG Silfurbarki is an elegant serif typeface with refined proportions and delicate details, currently under development at Type Guild. Designed for editorial applications where sophistication and subtlety matter, it brings graceful character to typographic compositions. Additional specimens and technical details will be available as the design evolves toward completion."
              imagePosition="right"
              cta={{
                to: '/foundry/typefaces/silfurbarki',
                label: 'View Typeface Details',
                className: 'mt-8'
              }}
              graphic={
                <div className="w-full aspect-[10/7] rounded bg-container-primary flex items-center justify-center">
                  <div className="text-center">
                    <Pill variant="subtle" size="md">In Development</Pill>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* CTA */}
        <FoundryCTA
          heading="Stay Updated on Silfurbarki"
          description="Typeface in development. Be notified when Silfurbarki design is complete."
          action={{
            to: '/foundry/licensing',
            label: 'Stay Updated'
          }}
        />
      </main>
    </>
  )
}

export default SpecimenSilfurbarkiHub
