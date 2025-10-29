import { useState } from 'react'
import { Dropdown } from '@kol/ui'

const SectionLabel = () => {
  const [selectedStyle, setSelectedStyle] = useState('roman')

  const styleOptions = [
    { label: 'Roman', value: 'roman' },
    { label: 'Italic', value: 'italic' },
    { label: 'Bold', value: 'bold' },
    { label: 'Bold Italic', value: 'bold-italic' }
  ]

  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        {/* Header with pill and dropdown */}
        <div className="w-full flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          {/* Left: Málrómur pill with AA icon */}
          <div className="px-6 py-3 bg-auto-inverse rounded-full border border-fg-08 inline-flex items-center gap-6">
            <span className="kol-mono-xs text-auto-inverse">
              Málrómur
            </span>
            <span className="kol-mono-xs text-auto-inverse font-semibold">
              AA
            </span>
          </div>

          {/* Right: Style dropdown */}
          <Dropdown
            options={styleOptions}
            value={selectedStyle}
            onChange={setSelectedStyle}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-opacity-hex-12" />
      </div>
    </section>
  )
}

export default SectionLabel
