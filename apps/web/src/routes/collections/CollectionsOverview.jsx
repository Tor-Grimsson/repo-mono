import { Pill, LinkWithIcon, FoundryCTA } from '@kol/ui'

const CollectionsOverview = () => {
  const collections = [
    {
      name: 'Illustrations',
      subtitle: 'Visual design explorations',
      description: 'A curated collection of illustrated works and conceptual explorations showcasing visual storytelling.',
      status: 'Active',
      route: '/collections/illustrations',
      featured: true
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 pt-24 pb-24 lg:pt-36 lg:pb-36 mt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <Pill variant="inverse">Collections</Pill>

            <h1 className="kol-display-lg text-auto">
              Kolkrabbi Collections
            </h1>

            <div className="w-32 h-[1px] bg-fg-24" />

            <p className="kol-mono-text text-fg-64 max-w-[700px]">
              A curated showcase of visual explorations including illustrations, logomarks, and experimental design work.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Pill variant="subtle">Illustrations</Pill>
              <Pill variant="subtle">Logo Marks</Pill>
              <Pill variant="subtle">Visual Experiments</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <span className="kol-label-mono-xs text-auto">Featured Collection</span>
          </div>

          {collections
            .filter(c => c.featured)
            .map((collection) => (
              <div key={collection.route} className="bg-container-primary p-12 lg:p-16 rounded">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <Pill variant="subtle" size="sm">{collection.status}</Pill>

                    <h2 className="text-auto text-6xl font-normal leading-tight">
                      {collection.name}
                    </h2>

                    <p className="text-auto text-2xl font-normal opacity-60">
                      {collection.subtitle}
                    </p>

                    <p className="kol-mono-text-lg text-fg-64">
                      {collection.description}
                    </p>

                    <div className="w-16 h-[1px] bg-fg-24" />

                    <LinkWithIcon to={collection.route}>
                      Explore Collection
                    </LinkWithIcon>
                  </div>

                  <div className="bg-surface-secondary rounded-sm flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-auto text-[96px] font-normal leading-none">
                      ✦
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-container-primary p-8 rounded-sm">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">Illustrations</h3>
                <p className="kol-mono-sm text-fg-64">
                  Browse the complete illustration portfolio featuring visual explorations and conceptual work.
                </p>
                <LinkWithIcon to="/collections/illustrations">
                  View Gallery
                </LinkWithIcon>
              </div>
            </div>

            <div className="bg-container-primary p-8 rounded-sm">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">Logomarks</h3>
                <p className="kol-mono-sm text-fg-64">
                  Explore a curated selection of logomark designs and brand identity experiments.
                </p>
                <LinkWithIcon to="/collections/logomarks">
                  View Marks
                </LinkWithIcon>
              </div>
            </div>

            <div className="bg-container-primary p-8 rounded-sm">
              <div className="space-y-4">
                <h3 className="kol-heading-sm text-auto">Motion Graphics</h3>
                <p className="kol-mono-sm text-fg-64">
                  Discover animated design work and motion graphics showcasing dynamic visual storytelling.
                </p>
                <LinkWithIcon to="/collections/motion-graphics">
                  View Motion
                </LinkWithIcon>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Explore More Work"
        description="View our full portfolio of design work, including client projects and experimental explorations."
        action={{
          to: "/work",
          label: "View Portfolio"
        }}
      />
    </main>
  )
}

export default CollectionsOverview
