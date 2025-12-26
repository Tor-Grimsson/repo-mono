import { Button, useTheme } from '@kol/ui'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/studio'

const StudioProcessCard = () => {
  const { theme } = useTheme()
  const variant = theme === 'dark' ? 'light' : 'dark'
  const imageSrc = `${cdnBase}/card-process/process-${variant}.svg`

  return (
    <section className="w-full py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-stretch">
          {/* Image Right */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[10/6] rounded overflow-hidden border border-fg-08 bg-surface-inverse flex items-center justify-center p-8">
              <img
                src={imageSrc}
                alt="Kolkrabbi design process diagram"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Left */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p className="kol-mono-text tracking-[0.5px] uppercase text-auto opacity-60">
              Process
            </p>
            <h2 className="kol-heading-xl text-auto mb-6">
              Interlocking systems
            </h2>
            <div className="space-y-4 mb-8">
              <p className="kol-mono-sm text-auto opacity-80">
                Kolkrabbi's process is based on observation: mapping problems, understanding and observing constraints, studying identities at component level, and rebuilding them with interlocking systems.
              </p>
              <p className="kol-mono-sm text-auto opacity-80">
                Client services include identity creation, brand refresh, and product development. The end goal is to enable clients and collaborators with scalable concepts and modular tools that make future design choices intuitive and easy.
              </p>
            </div>
            <div>
              <Button variant="secondary" href="/work">
                Use cases
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioProcessCard
