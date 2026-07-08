import { useState } from 'react'
import { ToggleBracket, ToggleCheckbox, ToggleSwitch, ViewToggle } from '@kolkrabbi/kol-component'
import { TogglePill, UnitSelector, CarouselNavigation, Checkbox } from '@kol/ui'
import DesSection from '../molecules/DesSection'

const gridOptions = [
  { value: 'both', label: 'Column + Baseline', icon: 'grid-04' },
  { value: 'columns', label: 'Columns only', icon: 'grid-02' },
  { value: 'off', label: 'Hide grid', icon: 'grid-01' }
]

export default function TogglesPreview() {
  const [bracketState, setBracketState] = useState(false)
  const [checkboxState, setCheckboxState] = useState(false)
  const [pillState, setPillState] = useState(false)
  const [switchState, setSwitchState] = useState(false)
  const [activeUnit, setActiveUnit] = useState('px')
  const [viewMode, setViewMode] = useState('grid')
  const [gridMode, setGridMode] = useState('both')

  return (
    <div className="space-y-8">
      <DesSection
        name="Toggles"
        description="Binary state controls — bracket, checkbox, switch, unit selector, carousel nav, and view toggles."
      />

      <div className="space-y-6 py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="flex flex-wrap items-center gap-6">
          <ToggleBracket label="Feature" value={bracketState} onChange={setBracketState} />
          <ToggleCheckbox label="Enable" checked={checkboxState} onChange={setCheckboxState} />
          <Checkbox checked={checkboxState} onChange={setCheckboxState} />
          <TogglePill checked={pillState} onChange={setPillState} />
          <ToggleSwitch label="Dark mode" checked={switchState} onChange={setSwitchState} />
          <UnitSelector activeUnit={activeUnit} onUnitChange={setActiveUnit} />
          <CarouselNavigation onPrevious={() => {}} onNext={() => {}} />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          <ViewToggle variant="icon" viewMode={viewMode} onViewChange={setViewMode} className="w-fit" />
          <ViewToggle variant="icon" viewMode={gridMode} onViewChange={setGridMode} options={gridOptions} className="w-fit" />
        </div>
      </div>
    </div>
  )
}
