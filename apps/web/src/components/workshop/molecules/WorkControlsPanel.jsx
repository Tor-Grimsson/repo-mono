import { Slider } from '@kolkrabbi/kol-component'

export default function WorkControlsPanel() {
  return (
    <div className="control-panel w-full">
      <div className="flex flex-col gap-4">
        <Slider
          label="Intensity"
          min={0}
          max={100}
          value={75}
          onChange={() => {}}
          className="w-full"
          variant="minimal"
        />
        <Slider
          label="Frequency"
          min={0}
          max={100}
          value={50}
          onChange={() => {}}
          className="w-full"
          variant="minimal"
        />
        <Slider
          label="Breath Time"
          min={0}
          max={100}
          value={50}
          onChange={() => {}}
          className="w-full"
          variant="minimal"
        />
        <Slider
          label="Breath Amp"
          min={0}
          max={100}
          value={50}
          onChange={() => {}}
          className="w-full"
          variant="minimal"
        />
        <Slider
          label="Separation"
          min={0}
          max={100}
          value={50}
          onChange={() => {}}
          className="w-full"
          variant="minimal"
        />
        <Slider
          label="Global Scale"
          min={0}
          max={100}
          value={75}
          onChange={() => {}}
          className="w-full"
          variant="minimal"
        />
        <Slider
          label="Global Time"
          min={0}
          max={100}
          value={50}
          onChange={() => {}}
          className="w-full"
          variant="minimal"
        />
        <Slider
          label="Circles"
          min={1}
          max={20}
          value={8}
          onChange={() => {}}
          className="w-full"
          variant="minimal"
        />
      </div>
      <div className="flex justify-between kol-mono-xs pt-4">
        <span>Quantize [OFF]</span>
        <span>Snap</span>
        <span>Hide</span>
      </div>
    </div>
  )
}
