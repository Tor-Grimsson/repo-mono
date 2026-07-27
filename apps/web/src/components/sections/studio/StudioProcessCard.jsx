import { Button } from '@kolkrabbi/kol-component'
import ProfileCard from '../../ui/ProfileCard'

const StudioProcessCard = () => {
  return (
    <section className="w-full py-48">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-stretch">
          {/* ProfileCard Right */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="hidden md:block"><ProfileCard variant="lg-h" /></div>
            <div className="md:hidden w-full"><ProfileCard variant="lg" className="w-full" /></div>
          </div>

          {/* Text Left */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p className="kol-mono-14 tracking-[0.5px] uppercase text-auto opacity-60">
              Process
            </p>
            <h2 className="kol-sans-heading-02 text-auto mb-6">
              Interlocking systems
            </h2>
            <div className="space-y-4 mb-8">
              <p className="kol-mono-12 text-auto opacity-80">
                Kolkrabbi's process is based on observation: mapping problems, understanding and observing constraints, studying identities at component level, and rebuilding them with interlocking systems.
              </p>
              <p className="kol-mono-12 text-auto opacity-80">
                Client services include identity creation, brand refresh, and product development. The end goal is to enable clients and collaborators with scalable concepts and modular tools that make future design choices intuitive and easy.
              </p>
            </div>
            <div>
              <Button variant="secondary" href="/stack">
                Stack
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioProcessCard
