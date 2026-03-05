import { useState } from 'react'
import DesSection from '../molecules/DesSection'

export default function SlidersPreview() {
  const [value, setValue] = useState(50)
  const [minimalValue, setMinimalValue] = useState(50)

  return (
    <div className="space-y-8">
      <DesSection
        name="Sliders"
        description="Range input controls — primary and minimal variants."
      />

      <div className="space-y-6 py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="control-slider gap-3 shadow-none">
          <label className="kol-mono-xs whitespace-nowrap">Weight</label>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="slider-black w-full flex-1 cursor-pointer"
          />
          <span className="kol-mono-xs text-right">{value}</span>
        </div>
        <div className="control-slider-minimal gap-3 shadow-none">
          <label className="kol-mono-xs whitespace-nowrap">Weight</label>
          <input
            type="range"
            min={0}
            max={100}
            value={minimalValue}
            onChange={(e) => setMinimalValue(Number(e.target.value))}
            className="slider-black w-full flex-1 cursor-pointer"
          />
          <span className="kol-mono-xs text-right">{minimalValue}</span>
        </div>
      </div>
    </div>
  )
}
