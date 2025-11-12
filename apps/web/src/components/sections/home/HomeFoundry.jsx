import TiltCard from '../../animation/TiltCard'
import { Button, SectionLabel } from '@kol/ui'

const HomeFoundry = () => {
  return (
    <section id="type" className="w-full">

      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col py-16 lg:flex-row gap-16">

          {/* Image - Left Column */}
          <div className="w-full lg:flex-1">
            <TiltCard
              src="/img/Kolk-img/trollatunga-2.png"
              alt="Type Design"
              className="w-full aspect-[5/4] rounded"
            />
          </div>

          {/* Content - Right Column */}
          <div className="w-full lg:flex-1 py-16">
            <SectionLabel className="mb-2" text="Type Foundry" size="md" />

            <h2 className="kol-heading-lg mb-6">
              Custom typefaces for distinctive brands
            </h2>

            <p className="kol-mono text-auto mb-6">
              Explore our collection of original typefaces designed for editorial, branding, and digital applications. Each font family is crafted with attention to detail and optimized for modern design systems.
            </p>

            <Button id="type-button" iconLeft="foundation" size="md" className="mt-12 mb-3" href="/foundry">
              Browse Typefaces
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HomeFoundry
