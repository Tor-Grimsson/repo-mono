import { useState } from 'react'
import CollectionCard from '../molecules/CollectionCard.jsx'

/**
 * CollectionGrid - Grid display for collection items with load more functionality
 *
 * @param {Array} logomarks - Array of logomark items
 * @param {Array} illustrations - Array of illustration items
 * @param {number} initialLimit - Number of items to show initially (default: 9)
 * @param {boolean} showLoadMore - Enable load more button (default: true)
 */
export default function CollectionGrid({
  logomarks,
  illustrations,
  initialLimit = 9,
  showLoadMore = true
}) {
  const [showAll, setShowAll] = useState(false)

  // If illustrations are provided, use them
  const items = illustrations || logomarks
  const type = illustrations ? 'illustration' : 'logomark'
  const itemName = illustrations ? 'illustrations' : 'logomarks'

  // Determine which items to display
  const displayedItems = (showLoadMore && !showAll) ? items.slice(0, initialLimit) : items
  const hasMore = items.length > initialLimit

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item) => (
          <CollectionCard
            key={item.id || item.logoName || item.illustrationName}
            item={item}
            type={type}
          />
        ))}
      </div>

      {/* Show All Button */}
      {showLoadMore && hasMore && !showAll && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="kol-mono-sm-fine text-auto hover:text-fg-64 transition-colors underline"
          >
            Show all {items.length} {itemName}
          </button>
        </div>
      )}
    </>
  )
}
