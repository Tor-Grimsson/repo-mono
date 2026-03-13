import { useState } from 'react'
import CollectionCard from '../molecules/CollectionCard.jsx'

export default function CollectionGrid({
  logomarks,
  illustrations,
  grids,
  initialLimit = 9,
  showLoadMore = true
}) {
  const [showAll, setShowAll] = useState(false)
  const items = illustrations || grids || logomarks
  const type = illustrations ? 'illustration' : grids ? 'grid' : 'logomark'
  const itemName = illustrations ? 'illustrations' : grids ? 'grids' : 'logomarks'
  const displayedItems = (showLoadMore && !showAll) ? items.slice(0, initialLimit) : items
  const hasMore = items.length > initialLimit

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item, index) => (
          <div
            key={item.id || item.logoName || item.illustrationName}
            className="reveal"
            style={{ '--reveal-delay': `${Math.min(index * 0.08, 0.6)}s` }}
          >
            <CollectionCard item={item} type={type} />
          </div>
        ))}
      </div>
      {showLoadMore && hasMore && !showAll && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="kol-mono-sm-regular text-auto hover:text-fg-64 transition-colors underline"
          >
            Show all {items.length} {itemName}
          </button>
        </div>
      )}
    </>
  )
}
