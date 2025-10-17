import TiltCard from '../../animation/TiltCard'
import { Button, SectionLabel } from '@kol/ui'

const Story = () => {
  return (
    <section id="type" className="py-12 md:py-24 bg-surface-primary">
      <div className="max-w-[1344px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Image - Left Column */}
          <div className="flex-1">
            <TiltCard
              src="/img/Kolk-img/trollatunga-2.png"
              alt="Type Design"
              className="w-full aspect-[4/5]"
            />
          </div>

          {/* Content - Right Column */}
          <div className="lg:w-[800px] space-y-6">
            <SectionLabel text="Type Design" />

            <h2 className="kol-heading-xl">
              Develop a sleek & timeless brand identity
            </h2>

            <p className="kol-mono text-auto">
              Visual language, defined by a set of foundational principles; from
              logo design and its usage in various formats, to typography
              selection and style definition, color system and the methodology
              behind brand palettes, to the guidelines which document and
              communicate these systems and concepts.
            </p>

            <Button id="type-button">
              To foundry
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story
