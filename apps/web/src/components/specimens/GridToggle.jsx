import { ViewToggle } from '@kol/ui'

export default function GridToggle({ showGrid, onToggle }) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <ViewToggle
        variant="icon"
        viewMode={showGrid ? 'grid' : 'list'}
        onViewChange={(mode) => {
          if ((mode === 'grid' && !showGrid) || (mode === 'list' && showGrid)) {
            onToggle()
          }
        }}
        options={[
          { value: 'grid', label: 'Show grid', icon: 'grid-04' },
          { value: 'list', label: 'Hide grid', icon: 'grid-02' }
        ]}
      />
    </div>
  )
}
