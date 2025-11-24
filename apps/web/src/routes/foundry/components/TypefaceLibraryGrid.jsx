import { useMemo } from 'react'
import { ContentFilters } from '@kol/ui'

/**
 * TypefaceLibraryGrid - Grid component with filtering for typeface library
 *
 * Wrapper around ContentFilters configured for typeface display
 *
 * @param {Object} props
 * @param {Array} props.typefaces - Array of typeface objects
 * @param {Function} props.renderItem - Function to render each item with Link wrapper
 * @param {number} props.totalCount - Total count of all typefaces
 */
const TypefaceLibraryGrid = ({
  typefaces,
  renderItem,
  totalCount
}) => {
  // Extract unique values for filter groups
  const classifications = [...new Set(typefaces.map((t) => t.classification))].sort()
  const styles = [...new Set(typefaces.map((t) => t.styles))].sort()

  const filterGroups = [
    {
      label: 'Classification',
      key: 'classification',
      values: classifications
    },
    {
      label: 'Styles',
      key: 'styles',
      values: styles
    }
  ]

  const viewModeOptions = [
    { value: 'card', label: 'Card view' },
    { value: 'list', label: 'List view' }
  ]

  // Render items in grid or list based on view mode
  const renderItemsWithLayout = (items, viewMode) => {
    if (viewMode === 'card') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((typeface) => renderItem(typeface, 'card'))}
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {items.map((typeface) => renderItem(typeface, 'list'))}
      </div>
    )
  }

  return (
    <section className="w-full px-8 py-16">
      <div className="max-w-[1400px] mx-auto">
        <ContentFilters
          items={typefaces}
          title="All Typefaces"
          totalCount={totalCount}
          filterGroups={filterGroups}
          renderItem={(items, viewMode) => renderItemsWithLayout(items, viewMode)}
          viewModeOptions={viewModeOptions}
          defaultViewMode="list"
        />
      </div>
    </section>
  )
}

export default TypefaceLibraryGrid
