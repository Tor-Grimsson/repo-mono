import { Button } from '@kol/ui'
import ProfileCard from '../../ui/ProfileCard'

const StudioAboutCard = () => {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 items-center">
          {/* Card — right-aligned, expands left, clipped */}
          <div className="flex justify-end overflow-hidden">
            <ProfileCard image="/img/contact/thg-05.jpg" variant="lg-h" />
          </div>

          {/* Text — left-aligned, never moves */}
          <div className="flex flex-col justify-center py-16 pl-12">
            <p className="kol-mono-text tracking-[0.5px] uppercase text-auto opacity-60">
              Services
            </p>
            <h2 className="kol-heading-xl text-auto mb-6">
              Studio & atelier
            </h2>
            <div className="space-y-4 mb-8">
              <p className="kol-mono-sm text-auto opacity-80">
                Kolkrabbi is a design studio and atelier founded in 2019 by artist and designer Tór Grímsson. Based in Reykjavík, the studio focuses on brand identity, visual systems, illustration, UI/UX, and foundational structures of visual design.
              </p>
              <p className="kol-mono-sm text-auto opacity-80">
                Kolkrabbi works with clients of all sizes, particularly those working to refine, evolve, or rethink their visual presence. Work spans branding, art direction, UI/UX, illustration, print, and type design.
              </p>
            </div>
            <div>
              <Button variant="secondary" href="/work">
                View Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioAboutCard
