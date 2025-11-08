import TiltCard from '../../animation/TiltCard'
import { Button, SectionLabel } from '@kol/ui'

const HomeFoundry = () => {
  return (
    <section id="type" className="w-full">

      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col py-16 lg:flex-row gap-16">

          {/* Image - Left Column */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <TiltCard
              src="/img/Kolk-img/trollatunga-2.png"
              alt="Type Design"
              className="w-full aspect-[4/5]"
            />
          </div>

          {/* Content - Right Column */}
          <div className="flex-1 py-16">
            <SectionLabel className="mb-2" text="Type Design" size="md" />

            <h2 className="kol-heading-lg mb-6">
              Develop a sleek & timeless brand identity
            </h2>

            <p className="kol-mono text-auto mb-6">
              Visual language, defined by a set of foundational principles; from
              logo design and its usage in various formats, to typography
              selection and style definition, color system and the methodology
              behind brand palettes, to the guidelines which document and
              communicate these systems and concepts.
            </p>

            <Button id="type-button" iconLeft="foundation" size="md" className="mt-12 mb-3">
              To foundry
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HomeFoundry
