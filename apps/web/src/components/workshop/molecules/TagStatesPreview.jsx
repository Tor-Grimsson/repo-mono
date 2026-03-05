import { useState } from 'react'
import { Tag } from '@kol/ui'
import DesSection from './DesSection'
import DesCard from './DesCard'

const sizes = [
  { id: 'sm', label: 'Small', color: 'blue' },
  { id: 'md', label: 'Medium', color: 'yellow' },
  { id: 'lg', label: 'Large', color: 'teal' }
]

const TAG_COLORS = ['blue', 'teal', 'green', 'yellow', 'red', 'orange', 'purple', 'dark']

const renderSizeRow = (label, renderTag, { showSizeLabels = false } = {}) => (
  <div className="space-y-3" key={label}>
    <div className="kol-mono-xs uppercase">{label}</div>
    <div className="flex gap-6 items-start">
      {sizes.map((size) => (
        <div key={size.id} className="flex-1 space-y-2">
          {showSizeLabels && <div className="kol-mono-xs opacity-60">{size.label}</div>}
          {renderTag(size.id, size.color)}
        </div>
      ))}
    </div>
  </div>
)

export default function TagStatesPreview() {
  const [dismissed, setDismissed] = useState([])
  const [activeStates, setActiveStates] = useState({})
  const toggleActive = (key) => setActiveStates((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="space-y-8">
      <DesSection
        name="Tag"
        description="Interactive tag component from @kol/ui. Renders <button> when onClick or onRemove is set, <span> otherwise. Prefixes content with #."
        details={[
          'Props: variant (default | inverse | naked | solid), size (sm | md | lg), color, active, icon, onClick, onRemove',
          'Sizes: sm 4×10, md 5×12, lg 6×14 — font scales with size',
          'States: hover reveals border (32% opacity), active locks it',
          'Colors: blue, teal, green, yellow, red, orange, purple, dark — 20% bg / 40% border / white text. Solid variant uses full opacity.',
          'Naked: no pill — colored text only, same icon/dismiss/size support'
        ].join('\n')}
      />

      <div className="space-y-8">
        {/* Base — default & inverse */}
        <div className="space-y-4">
          <DesCard
            name="Base Variants"
            description="Default and inverse pill. Hover increases border opacity, active locks it."
          />
          <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
              <div className="space-y-6">
                {renderSizeRow('Default', (size) => {
                  const key = `default-${size}`
                  return (
                    <Tag size={size} active={!!activeStates[key]} onClick={() => toggleActive(key)} onRemove={() => toggleActive(key)}>click me</Tag>
                  )
                }, { showSizeLabels: true })}
                {renderSizeRow('With Icon', (size) => {
                  const key = `icon-${size}`
                  return !dismissed.includes(key)
                    ? <Tag size={size} icon="bolt" onRemove={() => setDismissed((p) => [...p, key])}>Tag</Tag>
                    : null
                })}
                {renderSizeRow('Color', (size, color) => {
                  const key = `color-${size}`
                  return !dismissed.includes(key)
                    ? <Tag color={color} size={size} onRemove={() => setDismissed((p) => [...p, key])}>Tag</Tag>
                    : null
                })}
                {renderSizeRow('Solid', (size, color) => {
                  const key = `solid-${size}`
                  return !dismissed.includes(key)
                    ? <Tag color={color} size={size} solid onRemove={() => setDismissed((p) => [...p, key])}>Tag</Tag>
                    : null
                })}
                {renderSizeRow('Naked', (size, color) => {
                  const key = `naked-${size}`
                  return !dismissed.includes(key)
                    ? <Tag variant="naked" color={color} size={size} onRemove={() => setDismissed((p) => [...p, key])}>Tag</Tag>
                    : null
                })}
              </div>
          </div>
        </div>

        {/* Static Pills */}
        <div className="space-y-4">
          <DesCard
            name="Static Pills"
            description="Non-interactive pill styles for metadata labels and badges."
            details="pill-subtle works on both surfaces. pill-inverse for solid fills, pill-outline for bordered treatment. All pills use fixed 4x16 padding."
          />
          <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
              <div className="space-y-6">
                {[
                  { className: 'pill-inverse', label: 'Pill Inverse' },
                  { className: 'pill-outline', label: 'Pill Outline' },
                  { className: 'pill-subtle', label: 'Pill Subtle' }
                ].map((v) => (
                  <div className="space-y-3" key={v.className}>
                    <div className="kol-mono-xs uppercase">{v.label}</div>
                    <div className="flex gap-6 items-start">
                      {sizes.map((size) => (
                        <div key={size.id} className="flex-1 space-y-2">
                          <div className="kol-mono-xs opacity-60">{size.label}</div>
                          <span className={`${v.className} tag-${size.id}`}>
                            Tag
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
