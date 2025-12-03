import { useState } from 'react'
import { ToggleBracket, ToggleCheckbox, ToggleSwitch } from '@kol/ui'
import DesCard from './DesCard'

export default function TogglesPreview() {
  const [bracketState, setBracketState] = useState(false)
  const [checkboxState, setCheckboxState] = useState(false)
  const [switchState, setSwitchState] = useState(false)

  return (
    <div className="space-y-8">
      {/* Toggle Bracket */}
      <div className="space-y-4">
        <DesCard
          name="Toggle Bracket"
          description="Bracket-style toggle with clear on/off states"
          code="<ToggleBracket label='Feature' value={state} onChange={setState} />"
        />
        <div className="flex items-center gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
          <ToggleBracket
            label="Feature"
            value={bracketState}
            onChange={setBracketState}
          />
          <span className="kol-mono-sm text-fg-64">
            State: {bracketState ? 'On' : 'Off'}
          </span>
        </div>
      </div>

      {/* Toggle Checkbox */}
      <div className="space-y-4">
        <DesCard
          name="Toggle Checkbox"
          description="Checkbox-style toggle for form inputs"
          code="<ToggleCheckbox label='Enable' checked={state} onChange={setState} />"
        />
        <div className="flex items-center gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
          <ToggleCheckbox
            label="Enable option"
            checked={checkboxState}
            onChange={setCheckboxState}
          />
          <span className="kol-mono-sm text-fg-64">
            State: {checkboxState ? 'Checked' : 'Unchecked'}
          </span>
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="space-y-4">
        <DesCard
          name="Toggle Switch"
          description="iOS-style toggle switch"
          code="<ToggleSwitch label='Dark mode' checked={state} onChange={setState} />"
        />
        <div className="flex items-center gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
          <ToggleSwitch
            label="Dark mode"
            checked={switchState}
            onChange={setSwitchState}
          />
          <span className="kol-mono-sm text-fg-64">
            State: {switchState ? 'On' : 'Off'}
          </span>
        </div>
      </div>

      {/* All Together */}
      <div className="space-y-4">
        <DesCard
          name="All Toggles"
          description="Comparison of all three toggle styles"
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded">
          <div className="flex items-center gap-4">
            <ToggleBracket
              label="Feature"
              value={bracketState}
              onChange={setBracketState}
            />
            <span className="kol-mono-xs text-fg-64 w-32">Bracket</span>
            <span className="kol-mono-sm text-fg-64">
              {bracketState ? 'On' : 'Off'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ToggleCheckbox
              label="Enable option"
              checked={checkboxState}
              onChange={setCheckboxState}
            />
            <span className="kol-mono-xs text-fg-64 w-32">Checkbox</span>
            <span className="kol-mono-sm text-fg-64">
              {checkboxState ? 'Checked' : 'Unchecked'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ToggleSwitch
              label="Dark mode"
              checked={switchState}
              onChange={setSwitchState}
            />
            <span className="kol-mono-xs text-fg-64 w-32">Switch</span>
            <span className="kol-mono-sm text-fg-64">
              {switchState ? 'On' : 'Off'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
