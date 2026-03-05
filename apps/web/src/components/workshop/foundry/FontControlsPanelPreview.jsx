import { useState } from 'react'
import { FontControlsPanel } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'

const sampleWeights = [
  { label: 'Thin', weight: 100 },
  { label: 'Extralight', weight: 200 },
  { label: 'Light', weight: 300 },
  { label: 'Regular', weight: 400 },
  { label: 'Medium', weight: 500 },
  { label: 'Semibold', weight: 600 },
  { label: 'Bold', weight: 700 },
  { label: 'Extrabold', weight: 800 },
  { label: 'Black', weight: 900 }
]

const styleOptions = [
  { label: 'Roman', value: 'roman' },
  { label: 'Italic', value: 'italic' }
]

const weightOptions = sampleWeights.map(w => ({
  label: w.label,
  value: w.label
}))

export default function FontControlsPanelPreview() {
  const [style, setStyle] = useState('roman')
  const [weight, setWeight] = useState('Bold')
  const [size, setSize] = useState(72)
  const [leading, setLeading] = useState(10)
  const [spacing, setSpacing] = useState(0)

  return (
    <div className="space-y-8">
      <DesSection
        name="Font Controls Panel"
        description="Interactive font controls panel with style/weight dropdowns and size/leading/spacing sliders."
        details="Used in font preview sections"
      />

      <DesCard
        name="Font Controls Panel"
        description="Typography control interface"
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="space-y-6">
          <FontControlsPanel
            styleOptions={styleOptions}
            weightOptions={weightOptions}
            selectedStyle={style}
            selectedWeight={weight}
            onStyleChange={setStyle}
            onWeightChange={setWeight}
            size={size}
            onSizeChange={setSize}
            sizeMin={12}
            sizeMax={144}
            leading={leading}
            onLeadingChange={setLeading}
            spacing={spacing}
            onSpacingChange={setSpacing}
            fontLabel="Málrómur"
          />
          <div
            className="text-center p-4 rounded-lg"
            style={{
              fontFamily: 'TGMalromur',
              fontSize: `${Math.min(size, 64)}px`,
              fontWeight: sampleWeights.find(w => w.label === weight)?.weight || 700,
              fontStyle: style === 'italic' ? 'italic' : 'normal',
              lineHeight: `${90 + leading}%`,
              letterSpacing: `${spacing}px`
            }}
          >
            Sample Text
          </div>
        </div>
      </div>
    </div>
  )
}
