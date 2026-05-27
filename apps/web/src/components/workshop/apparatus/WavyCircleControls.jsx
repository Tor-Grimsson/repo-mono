import { useState } from 'react'
import { Button, Slider, ToggleBracket, ToggleCheckbox } from '@kol/ui'

const editingDescriptionId = 'wavy-editing-description'
const backlogListId = 'wavy-backlog-list'

const WavyCircleControls = ({
  params,
  ui,
  stats,
  enhancementIdeas,
  onParamChange,
  onUiToggle,
  onExportSvg,
  onCopyPath
}) => {
  const [showEditingDetails, setShowEditingDetails] = useState(false)
  const [showBacklog, setShowBacklog] = useState(false)

  return (
    <aside className="flex w-full max-w-none bg-fg-02 flex-col gap-5 border-b border-auto p-6 lg:order-2 lg:max-w-[360px] lg:border-b-0 lg:border-l">
      <section className="flex flex-col gap-4">
        <h2 className="kol-mono-xs text-fg-64">Wave Parameters</h2>
        <Slider
          label="Radius"
          min={50}
          max={200}
          value={params.radius}
          step={1}
          onChange={(value) => onParamChange('radius', value)}
          variant="minimal"
          className="w-full"
        />
        <Slider
          label="Amplitude"
          min={0}
          max={50}
          value={params.amplitude}
          step={1}
          onChange={(value) => onParamChange('amplitude', value)}
          variant="minimal"
          className="w-full"
        />
        <Slider
          label="Frequency"
          min={1}
          max={12}
          value={params.frequency}
          step={1}
          onChange={(value) => onParamChange('frequency', value)}
          variant="minimal"
          className="w-full"
        />
        <Slider
          label="Zoom"
          min={0.5}
          max={3}
          step={0.1}
          value={params.zoom}
          onChange={(value) => onParamChange('zoom', value)}
          variant="minimal"
          className="w-full"
          formatValue={(value) => `${value.toFixed(1)}×`}
        />
        <Slider
          label="Stroke Width"
          min={0.5}
          max={5}
          step={0.5}
          value={params.strokeWidth}
          onChange={(value) => onParamChange('strokeWidth', value)}
          variant="minimal"
          className="w-full"
          formatValue={(value) => `${value.toFixed(1)}px`}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="kol-mono-xs uppercase tracking-[0.08em] text-fg-64">Visualization</h2>
        <div className="flex flex-wrap items-center gap-4">
          <ToggleCheckbox
            label={<span className="kol-mono-text-xs uppercase tracking-[0.08em]">Grid</span>}
            checked={ui.showGrid}
            onChange={(next) => onUiToggle('showGrid', next)}
          />
          <ToggleCheckbox
            label={<span className="kol-mono-text-xs uppercase tracking-[0.08em]">Nodes</span>}
            checked={ui.showNodes}
            onChange={(next) => onUiToggle('showNodes', next)}
          />
          <ToggleCheckbox
            label={<span className="kol-mono-text-xs uppercase tracking-[0.08em]">Handles</span>}
            checked={ui.showHandles}
            onChange={(next) => onUiToggle('showHandles', next)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <button
          type="button"
          className="kol-mono-xs uppercase tracking-[0.08em] text-fg-64 flex items-center justify-between text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kol-focus-ring)]"
          onClick={() => setShowEditingDetails((prev) => !prev)}
          aria-expanded={showEditingDetails}
          aria-controls={editingDescriptionId}
        >
          <span>Editing Mode</span>
          <span className="kol-mono-xs">{showEditingDetails ? 'Hide' : 'Show'}</span>
        </button>
        {showEditingDetails && (
          <div id={editingDescriptionId} className="kol-mono-xs leading-tight">
            Symmetric editing moves all rotational siblings together. Symmetrical Bézier mirrors the handles to maintain
            smooth tangents.
          </div>
        )}
        <ToggleBracket
          label="Symmetric Editing"
          value={ui.symmetricEdit}
          onToggle={(next) => onUiToggle('symmetricEdit', next)}
          variant="plain"
          className="justify-between text-left text-fg-64"
        />
        <ToggleBracket
          label="Symmetrical Handles"
          value={ui.symmetricalBezier}
          onToggle={(next) => onUiToggle('symmetricalBezier', next)}
          variant="plain"
          className="justify-between text-left text-fg-64"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="kol-mono-xs uppercase tracking-[0.08em] text-fg-64">Appearance</h2>

        <div className="flex flex-col gap-2">
          <label className="kol-mono-xs uppercase tracking-[0.08em] text-fg-64">
            Path Color
          </label>
          <input
            type="color"
            value={params.pathColor}
            onChange={(event) => onParamChange('pathColor', event.target.value)}
            className="input-outline input-md h-12 w-full"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="kol-mono-xs uppercase tracking-[0.08em] text-fg-64">Statistics</h2>
        <div className="kol-mono-xs flex flex-col gap-1 rounded border border-auto bg-surface-secondary p-3">
          <div>
            <span className="kol-mono-xs uppercase tracking-[0.06em]">Nodes:</span> {stats.nodeCount}
          </div>
          <div>
            <span className="kol-mono-xs uppercase tracking-[0.06em]">Control Points:</span> {stats.handleCount}
          </div>
          <div>
            <span className="kol-mono-xs uppercase tracking-[0.06em]">Optimality:</span> {stats.optimality}
          </div>
        </div>
      </section>

      {enhancementIdeas.length > 0 && (
        <section className="flex flex-col gap-4">
          <button
            type="button"
            className="kol-mono-xs uppercase tracking-[0.08em] text-fg-64 flex items-center justify-between text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kol-focus-ring)]"
            onClick={() => setShowBacklog((prev) => !prev)}
            aria-expanded={showBacklog}
            aria-controls={backlogListId}
          >
            <span>Backlog</span>
            <span className="kol-mono-xs">{showBacklog ? 'Hide' : 'Show'}</span>
          </button>
          {showBacklog && (
            <ul id={backlogListId} className="kol-mono-xs text-fg-64 space-y-1 list-disc pl-4">
              {enhancementIdeas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={onExportSvg}>
            Download SVG
          </Button>
          <Button variant="outline" size="sm" onClick={onCopyPath}>
            Copy Path
          </Button>
        </div>
      </section>
    </aside>
  )
}

export default WavyCircleControls
