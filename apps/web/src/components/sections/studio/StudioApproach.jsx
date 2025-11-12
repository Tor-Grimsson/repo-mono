import { SectionLabel } from '@kol/ui'

const StudioApproach = () => {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto">
        <div className="w-full pt-[128px]">
          <SectionLabel text="Our Approach" size="lg" />
          <p className="kol-mono-sm text-auto opacity-60 mt-3 max-w-[40%]">
            Design rooted in purpose, refined through iteration, and built to endure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pb-24">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="kol-heading-lg mb-4">Systems over decoration</h3>
              <p className="kol-mono-text text-auto opacity-80">
                We believe good design is systematic, not superficial. Every visual decision serves a purpose—creating coherence across touchpoints while allowing room for expression and evolution.
              </p>
            </div>

            <div>
              <h3 className="kol-heading-lg mb-4">Typography as foundation</h3>
              <p className="kol-mono-text text-auto opacity-80">
                Type is the backbone of visual communication. Whether designing custom typefaces or selecting existing families, we approach typography with the care it deserves—balancing personality with functionality.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="kol-heading-lg mb-4">Craft meets pragmatism</h3>
              <p className="kol-mono-text text-auto opacity-80">
                We're committed to craftsmanship, but we're not precious about it. Beautiful work must also be practical—scalable, maintainable, and adaptable to real-world constraints.
              </p>
            </div>

            <div>
              <h3 className="kol-heading-lg mb-4">Long-term thinking</h3>
              <p className="kol-mono-text text-auto opacity-80">
                Trends fade, but well-designed systems endure. We focus on creating identities and design systems that remain relevant and effective years after launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioApproach
