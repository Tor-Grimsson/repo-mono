import { SectionLabel } from '@kol/ui'

const StudioApproach = () => {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto">
        <div className="w-full pt-[128px]">
          <SectionLabel text="Studio" size="lg" />
          <p className="kol-mono-sm text-auto opacity-60 mt-3 max-w-[60%]">
            Design studio and atelier, based in Reykjavík, focused on visual identities, branding, art direction, and design systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pb-24">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="kol-mono-text text-auto opacity-80">
                Kolkrabbi, founded in 2019, based in Reykjavík, Iceland and home to artist and designer Tór Grímsson, is a design studio and atelier focused on brand identity, UI/UX and graphic design for clients of all sizes.
              </p>
            </div>

            <div>
              <p className="kol-mono-text text-auto opacity-80">
                The studio creates customised solutions for brands looking to differentiate their visual presence in the eyes of their clientele.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="kol-mono-text text-auto opacity-80">
                Brand identity with a story that reflects values, a message that aligns with audience, and a strategy to operate—tailored to the core of the brand.
              </p>
            </div>

            <div>
              <p className="kol-mono-text text-auto opacity-80">
                Visual language defined by foundational principles; from logo design and usage in various formats, to typography selection and style definition, color system and methodology behind brand palettes, to guidelines which document and communicate these systems and concepts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioApproach
