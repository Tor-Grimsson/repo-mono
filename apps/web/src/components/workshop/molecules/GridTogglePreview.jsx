import { useState } from 'react'
import GridToggle from '../../specimens/GridToggle'

export default function GridTogglePreview() {
  const [showGrid, setShowGrid] = useState(true)

  return (
    <div className="space-y-8">
      {/* Grid Toggle */}
      <div className="bg-container-primary p-8 rounded-sm space-y-6 relative min-h-[400px]">
        <div className="space-y-3">
          <h3 className="kol-heading-sm text-auto">Grid Toggle</h3>
          <p className="kol-mono-sm text-fg-64">
            Icon-based toggle for showing/hiding grid overlays in specimen pages
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative bg-surface-secondary h-64 rounded">
            <GridToggle showGrid={showGrid} onToggle={() => setShowGrid(!setShowGrid)} />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="kol-mono-xs text-fg-48">Grid is {showGrid ? 'visible' : 'hidden'}</p>
            </div>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-4">Props</div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-fg-64 pb-2 border-b border-fg-16">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>showGrid</div>
              <div className="text-fg-64">boolean</div>
              <div className="text-fg-48">required</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>onToggle</div>
              <div className="text-fg-64">function</div>
              <div className="text-fg-48">required</div>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-4">Usage</div>
          <pre className="kol-mono-sm text-auto overflow-x-auto">
{`import GridToggle from './components/specimens/GridToggle'

const [showGrid, setShowGrid] = useState(true)

<GridToggle
  showGrid={showGrid}
  onToggle={() => setShowGrid(!showGrid)}
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
