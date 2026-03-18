import { Button } from '@kol/ui'

const StudioAboutCard = () => {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex flex-col justify-center items-center text-center px-6 py-8 rounded-[2px] md:max-w-[600px] mx-auto" style={{ backgroundColor: 'color-mix(in srgb, var(--kol-surface-primary) 80%, transparent)', backdropFilter: 'blur(1px)' }}>
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
          </div>
          <div>
            <Button variant="secondary" href="/work">
              View Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioAboutCard
