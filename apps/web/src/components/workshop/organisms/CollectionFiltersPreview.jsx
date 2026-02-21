import { useMemo } from 'react'
import { ContentFilters } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'

const sampleItems = [
  { id: 1, title: 'Abstract Forms', category: 'Generative', type: 'Abstract', year: '2024' },
  { id: 2, title: 'Geometric Patterns', category: 'Generative', type: 'Pattern', year: '2023' },
  { id: 3, title: 'Fluid Dynamics', category: 'Simulation', type: 'Fluid', year: '2024' },
  { id: 4, title: 'Particle Systems', category: 'Simulation', type: 'Particle', year: '2024' },
  { id: 5, title: 'Data Visualization', category: 'Data', type: 'Visualization', year: '2023' },
  { id: 6, title: 'Kinetic Typography', category: 'Typography', type: 'Kinetic', year: '2024' }
]

export default function CollectionFiltersPreview() {
  const filterGroups = useMemo(() => [
    { label: 'Category', key: 'category', values: [...new Set(sampleItems.map(i => i.category))] },
    { label: 'Type', key: 'type', values: [...new Set(sampleItems.map(i => i.type))] },
    { label: 'Year', key: 'year', values: [...new Set(sampleItems.map(i => i.year))].sort() }
  ], [])

  const renderItems = (filteredItems) => (
    <div className="grid grid-cols-2 gap-2">
      {filteredItems.map((item) => (
        <div key={item.id} className="p-3 rounded-sm border border-fg-08 kol-mono-xs">
          {item.title}
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-8">
      <DesSection
        name="Content Filters"
        description="Filter interface for collection items."
        details="Category, type, and year filtering"
      />

      <DesCard
        name="Content Filters"
        description="Expandable filter panel with category, type, and year options"
      />
      <div className="p-6 rounded-sm border border-fg-08">
        <ContentFilters
          items={sampleItems}
          title="Sample Collection"
          totalCount={sampleItems.length}
          filterGroups={filterGroups}
          renderItem={renderItems}
        />
      </div>
    </div>
  )
}
