import { SectionHeader, Divider } from '@kol/ui'

export default function CollectionCategories({ collections }) {
  return (
    <div className="">
      <div className="">
        <div className="py-12">
          <SectionHeader
            eyebrow="Collection"
            title="/ logomarks"
            description="A curated selection of logo marks exploring form, function, and brand expression across diverse industries and applications."
          />
          <Divider className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <div
                key={index}
                className="bg-surface-secondary rounded-lg p-6 border border-auto hover:border-hover transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="kol-headline text-2xl">{collection.title}</h3>
                  <span className="kol-text-small text-auto/60">
                    {collection.count}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {collection.items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-fg-16 text-auto text-xs border border-surface-16"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
