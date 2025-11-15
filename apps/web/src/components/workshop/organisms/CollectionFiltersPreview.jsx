import { useState } from 'react'
import { CollectionFilters } from '@kol/ui'

export default function CollectionFiltersPreview() {
  // Sample data for demonstration
  const sampleItems = [
    {
      id: 1,
      title: 'Abstract Forms',
      category: 'Generative',
      type: 'Abstract',
      year: '2024'
    },
    {
      id: 2,
      title: 'Geometric Patterns',
      category: 'Generative',
      type: 'Pattern',
      year: '2023'
    },
    {
      id: 3,
      title: 'Fluid Dynamics',
      category: 'Simulation',
      type: 'Fluid',
      year: '2024'
    },
    {
      id: 4,
      title: 'Particle Systems',
      category: 'Simulation',
      type: 'Particle',
      year: '2024'
    },
    {
      id: 5,
      title: 'Data Visualization',
      category: 'Data',
      type: 'Visualization',
      year: '2023'
    },
    {
      id: 6,
      title: 'Kinetic Typography',
      category: 'Typography',
      type: 'Kinetic',
      year: '2024'
    },
    {
      id: 7,
      title: 'Audio Reactive',
      category: 'Audio',
      type: 'Reactive',
      year: '2023'
    },
    {
      id: 8,
      title: 'Shader Experiments',
      category: 'Shader',
      type: 'GLSL',
      year: '2024'
    }
  ]

  const sampleCollections = [
    {
      title: 'Generative',
      count: 12,
      items: ['Abstract', 'Pattern', 'Noise']
    },
    {
      title: 'Simulation',
      count: 8,
      items: ['Fluid', 'Particle', 'Physics']
    },
    {
      title: 'Audio',
      count: 5,
      items: ['Reactive', 'Frequency', 'Beat']
    },
    {
      title: 'Typography',
      count: 6,
      items: ['Kinetic', 'Morphing', 'Distortion']
    }
  ]

  const [filteredItems, setFilteredItems] = useState(sampleItems)

  const handleFilterChange = (filters) => {
    if (filters.size === 0) {
      setFilteredItems(sampleItems)
      return
    }

    const filtered = sampleItems.filter((item) => {
      return Array.from(filters).some((filterKey) => {
        const [filterType, filterValue] = filterKey.split(':')
        return item[filterType] === filterValue
      })
    })
    setFilteredItems(filtered)
  }

  return (
    <div className="space-y-8">
      {/* Component Info */}
      <div className="space-y-4">
        <div>
          <h2 className="kol-heading-lg mb-2">CollectionFilters</h2>
          <p className="kol-mono-sm text-fg-64">
            Organism component for filtering collection items by category, type, and year with expandable filter interface.
          </p>
        </div>

        {/* Props Table */}
        <div className="bg-container-primary p-6 rounded-sm space-y-4">
          <h3 className="kol-heading-sm">Props</h3>
          <div className="space-y-3 kol-mono-xs">
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">logomarks</span>
              <span className="text-fg-64">Array of items to filter (required)</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">onFilterChange</span>
              <span className="text-fg-64">Callback function receiving Set of active filters (required)</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">totalCount</span>
              <span className="text-fg-64">Total number of items before filtering (required)</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">collectionTitle</span>
              <span className="text-fg-64">Title for the collection (default: "Collection")</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">collections</span>
              <span className="text-fg-64">Array of collection category objects (default: [])</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2">
              <span className="text-auto font-medium">showCollectionCategories</span>
              <span className="text-fg-64">Show collection categories section (default: true)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example 1: Default with Collections */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">With Collection Categories</h3>
          <p className="kol-mono-xs text-fg-64">
            Full featured filter with collection category cards displayed above filters
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <CollectionFilters
            logomarks={filteredItems}
            onFilterChange={handleFilterChange}
            collections={sampleCollections}
            totalCount={sampleItems.length}
            collectionTitle="Sample Collection"
            showCollectionCategories={true}
          />

          {/* Show filtered count */}
          <div className="mt-6 pt-6 border-t border-fg-08">
            <p className="kol-mono-sm text-fg-64">
              Showing {filteredItems.length} of {sampleItems.length} items
            </p>
          </div>
        </div>
      </div>

      {/* Example 2: Without Collection Categories */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Without Collection Categories</h3>
          <p className="kol-mono-xs text-fg-64">
            Simplified filter interface without collection category cards
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <CollectionFilters
            logomarks={sampleItems}
            onFilterChange={(filters) => console.log('Filters changed:', filters)}
            collections={[]}
            totalCount={sampleItems.length}
            collectionTitle="Motion Graphics"
            showCollectionCategories={false}
          />
        </div>
      </div>

      {/* Example 3: Custom Title */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Custom Collection Title</h3>
          <p className="kol-mono-xs text-fg-64">
            Filter with custom collection title
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <CollectionFilters
            logomarks={sampleItems}
            onFilterChange={(filters) => console.log('Filters changed:', filters)}
            collections={[]}
            totalCount={sampleItems.length}
            collectionTitle="Experimental Works Collection"
            showCollectionCategories={false}
          />
        </div>
      </div>

      {/* Usage Code */}
      <div className="space-y-4">
        <h3 className="kol-heading-md">Usage</h3>
        <pre className="bg-container-primary p-6 rounded-sm overflow-x-auto">
          <code className="kol-mono-xs text-fg-64">{`import { useState, useMemo } from 'react'
import CollectionFilters from '../../components/sections/collections/CollectionFilters'

export default function MyCollection() {
  const [filters, setFilters] = useState(new Set())

  const items = [
    {
      id: 1,
      title: 'Item 1',
      category: 'Generative',
      type: 'Abstract',
      year: '2024'
    },
    // ... more items
  ]

  const filteredItems = useMemo(() => {
    if (filters.size === 0) return items

    return items.filter((item) => {
      return Array.from(filters).some((filterKey) => {
        const [filterType, filterValue] = filterKey.split(':')
        return item[filterType] === filterValue
      })
    })
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div>
      <CollectionFilters
        logomarks={items}
        onFilterChange={handleFilterChange}
        collections={[]}
        totalCount={items.length}
        collectionTitle="My Collection"
        showCollectionCategories={false}
      />

      {/* Render filtered items */}
      <div className="grid grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  )
}`}</code>
        </pre>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="kol-heading-md">Features</h3>
        <ul className="space-y-2 kol-mono-sm text-fg-64 list-disc list-inside">
          <li>Collapsible filter interface with icon toggle</li>
          <li>Filter by category, type, and year</li>
          <li>Active filter count display</li>
          <li>Clear all filters button</li>
          <li>Real-time item count updates</li>
          <li>Optional collection category cards</li>
          <li>Tag-based filter selection</li>
          <li>Visual feedback for active filters</li>
        </ul>
      </div>
    </div>
  )
}
