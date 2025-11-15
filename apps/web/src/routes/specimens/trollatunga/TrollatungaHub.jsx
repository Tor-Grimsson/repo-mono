import { Link } from 'react-router-dom'
import { SpecimenHero, Pill } from '@kol/ui'

const SpecimenTrollatungaHub = () => {
  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <SpecimenHero
        title="Tröllatunga Specimens"
        subtitle="Display typeface with expressive character"
        description="TG Tröllatunga is a distinctive display typeface with bold character and expressive forms. Specimen patterns are currently being developed to showcase its dramatic applications."
        fontFamily="TGTrollatunga"
      >
        <div className="pt-6 flex justify-center">
          <Pill variant="subtle" size="md">Specimens Coming Soon</Pill>
        </div>
      </SpecimenHero>

      {/* Coming Soon Message */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-container-primary p-12 rounded-sm text-center">
            <h3 className="text-auto text-2xl font-normal font-['TGTrollatunga'] leading-tight mb-4">
              Specimen Patterns In Progress
            </h3>
            <p className="kol-text-lg text-fg-64 max-w-[600px] mx-auto">
              Comprehensive specimen patterns for TG Tröllatunga are currently being developed.
              Check back soon to explore typographic applications and use cases for this expressive display face.
            </p>
          </div>
        </div>
      </section>

      {/* About the Typeface */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="text-auto text-4xl font-normal font-['TGTrollatunga'] leading-tight">
            About TG Tröllatunga
          </h2>

          <p className="text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[600px] mx-auto">
            A display typeface with bold personality and expressive character,
            designed for headlines, posters, and applications where impact and drama are essential.
            Perfect for editorial display, branding, and dramatic typographic statements.
          </p>

          <div className="pt-4">
            <Link
              to="/foundry/trollatunga"
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

export default SpecimenTrollatungaHub
