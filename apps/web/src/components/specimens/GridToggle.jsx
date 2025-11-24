import { ViewToggle } from '@kol/ui'

export default function GridToggle({ gridMode, onToggle }) {
  const getModeValue = () => {
    if (gridMode === 'both') return 'both'
    if (gridMode === 'columns') return 'columns'
    return 'off'
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <ViewToggle
        variant="icon"
        viewMode={getModeValue()}
        onViewChange={(mode) => {
          onToggle(mode)
        }}
        options={[
          { value: 'both', label: 'Column + Baseline', icon: 'grid-04' },
          { value: 'columns', label: 'Columns only', icon: 'grid-02' },
          { value: 'off', label: 'Hide grid', icon: 'grid-01' }
        ]}
      />
    </div>
  )
}
