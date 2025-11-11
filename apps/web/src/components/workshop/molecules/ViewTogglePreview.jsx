import { useState } from 'react'
import { ViewToggle } from '@kol/ui'
import IconViewToggle from '../../sections/collections/ViewToggle'

export default function ViewTogglePreview() {
  const [textViewMode, setTextViewMode] = useState('card')
  const [iconViewMode, setIconViewMode] = useState('grid')

  return (
    <div className="space-y-8">
      {/* Text-based ViewToggle */}
      <div className="bg-container-primary p-8 rounded-sm space-y-6">
        <div className="space-y-3">
          <h3 className="kol-heading-sm text-auto">Text-based ViewToggle</h3>
          <p className="kol-mono-sm text-fg-64">
            Toggle with text labels for switching between view modes
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="kol-mono-xs text-fg-48 mb-4">Interactive Example</div>
            <ViewToggle viewMode={textViewMode} onViewChange={setTextViewMode} />
            <p className="kol-mono-xs text-fg-48 mt-4">Current mode: {textViewMode}</p>
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
              <div>viewMode</div>
              <div className="text-fg-64">string</div>
              <div className="text-fg-48">required</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>onViewChange</div>
              <div className="text-fg-64">function</div>
              <div className="text-fg-48">required</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>options</div>
              <div className="text-fg-64">array</div>
              <div className="text-fg-48">[card, list]</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>className</div>
              <div className="text-fg-64">string</div>
              <div className="text-fg-48">''</div>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-4">Usage</div>
          <pre className="kol-mono-sm text-auto overflow-x-auto">
{`import { ViewToggle } from '@kol/ui'

const [viewMode, setViewMode] = useState('card')

<ViewToggle
  viewMode={viewMode}
  onViewChange={setViewMode}
/>

// Custom options
<ViewToggle
  viewMode={viewMode}
  onViewChange={setViewMode}
  options={[
    { value: 'grid', label: 'Grid view' },
    { value: 'table', label: 'Table view' }
  ]}
/>`}
          </pre>
        </div>
      </div>

      {/* Icon-based ViewToggle */}
      <div className="bg-container-primary p-8 rounded-sm space-y-6">
        <div className="space-y-3">
          <h3 className="kol-heading-sm text-auto">Icon-based ViewToggle</h3>
          <p className="kol-mono-sm text-fg-64">
            Toggle with icons for a more compact visual representation
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="kol-mono-xs text-fg-48 mb-4">Interactive Example</div>
            <IconViewToggle viewMode={iconViewMode} onViewChange={setIconViewMode} />
            <p className="kol-mono-xs text-fg-48 mt-4">Current mode: {iconViewMode}</p>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-4">Usage</div>
          <pre className="kol-mono-sm text-auto overflow-x-auto">
{`import ViewToggle from '../../components/sections/collections/ViewToggle'

const [viewMode, setViewMode] = useState('grid')

<ViewToggle
  viewMode={viewMode}
  onViewChange={setViewMode}
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
