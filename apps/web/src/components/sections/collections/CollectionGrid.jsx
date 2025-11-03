import CollectionCardLogo from './CollectionCardLogo'
import CollectionCardIllustration from './CollectionCardIllustration'

export default function CollectionGrid({ logomarks, illustrations }) {
  // If illustrations are provided, use them
  const items = illustrations || logomarks
  const isIllustrations = !!illustrations

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) =>
        isIllustrations ? (
          <CollectionCardIllustration
            key={item.illustrationName}
            illustration={item}
          />
        ) : (
          <CollectionCardLogo
            key={item.id || item.logoName}
            logomark={item}
          />
        )
      )}
    </div>
  )
}
