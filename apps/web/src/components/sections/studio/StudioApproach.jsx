import { SectionLabel } from '@kol/ui'

const StudioApproach = () => {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto">
        <div className="w-full pt-[128px]">
          <SectionLabel text="Studio" size="lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <p className="kol-mono-sm text-auto opacity-60">
            Kolkrabbi is a design studio and atelier founded in 2019 by artist and designer Tór Grímsson. Based in Reykjavík, the studio focuses on brand identity, visual systems, illustration, UI/UX, and the foundational structures of visual design.
          </p>
          <div></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pb-24">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="kol-mono-text text-auto opacity-80">
                At its core, Kolkrabbi is systematic, not superficial. From typography and color logic to layout, interaction, and asset management — each step serve clarity, consistency, and long-term adaptability. The studio works with clients of all sizes, particularly those ready to refine, evolve, or rethink their visual presence.
              </p>
            </div>

            <div>
              <p className="kol-mono-text text-auto opacity-80">
                Kolkrabbi's process is grounded in structure: mapping problems, understanding constraints, observing parts of identities at the component level, and rebuilding into interlocking systems.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="kol-mono-text text-auto opacity-80">
                Identity creation, refresh of established brand, or developing a modular design system, the goal is always to enable clients with tools that make future design choices intuitive and easy to use.
              </p>
            </div>

            <div>
              <p className="kol-mono-text text-auto opacity-80">
                Kolkrabbi's work spans branding, art direction, UI/UX design, illustration, print, and digital experiences — always built on foundations that last.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioApproach
