import { Button } from '@kol/ui'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/studio'

const StudioAboutCard = () => {
  const imageSrc = `${cdnBase}/card-about/studio-about-1200.jpg`
  const srcSet = `${cdnBase}/card-about/studio-about-400.jpg 400w, ${cdnBase}/card-about/studio-about-800.jpg 800w, ${cdnBase}/card-about/studio-about-1200.jpg 1200w, ${cdnBase}/card-about/studio-about-1600.jpg 1600w`

  return (
    <section className="w-full py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
          {/* Image Left */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[10/6] rounded overflow-hidden border border-fg-08 bg-surface-secondary">
              <img
                src={imageSrc}
                srcSet={srcSet}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Tór Grímsson - Kolkrabbi Studio"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Right */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
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
              <Button variant="secondary" href="/foundry">
                Foundry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioAboutCard
