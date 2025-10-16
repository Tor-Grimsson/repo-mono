import { useState } from 'react'
import DesSection from './DesSection'
import DesCard from './DesCard'
import SurfacePreviewGrid from './SurfacePreviewGrid'
import { SectionToggle } from '@kol/ui'

const SectionTogglePreview = () => {
  const [defaultExpanded, setDefaultExpanded] = useState(true)
  const [inverseExpanded, setInverseExpanded] = useState(false)

  return (
    <div className="space-y-4">
      <DesSection
        name="Section Toggle"
        description="Shared molecule for collapsible styleguide sections. Uses kol-mono-text-label for labels and syncs with the expansion context so sections remember state across navigation."
      />
      <DesCard
        name="<SectionToggle />"
        description="Flex container pairing the label and indicator. Pass expansion state + toggle handler; the component handles typography and plus/minus glyphs."
        code="<SectionToggle label='Section Title' isExpanded={false} onToggle={() => {}} />"
      />
      <p className="kol-mono-text opacity-70">
        Place SectionToggle at the top of every expandable section. Pair it with `useStyleguideExpansion` to persist state and wrap the content that follows in a `divider-auto` + padded panel.
      </p>
      <SurfacePreviewGrid>
        <SurfacePreviewGrid.Surface label="Default surface">
          <div className="space-y-3">
            <SectionToggle
              label="Type specimens"
              isExpanded={defaultExpanded}
              onToggle={() => setDefaultExpanded((prev) => !prev)}
            />
            {defaultExpanded ? (
              <div className="rounded-lg border border-auto bg-auto p-4 text-auto">
                <p className="kol-mono-text text-xs opacity-70">
                  Expanded content appears beneath the toggle. Use `divider-auto` between stacked sections.
                </p>
              </div>
            ) : null}
          </div>
        </SurfacePreviewGrid.Surface>
        <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
          <div className="space-y-3">
            <SectionToggle
              label="Token audit"
              isExpanded={inverseExpanded}
              onToggle={() => setInverseExpanded((prev) => !prev)}
            />
            {inverseExpanded ? (
              <div className="rounded-lg border border-auto bg-auto p-4 text-auto">
                <p className="kol-mono-text text-xs opacity-70">
                  Component tokens adapt to the surface. Foreground and borders switch automatically.
                </p>
              </div>
            ) : null}
          </div>
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>
    </div>
  )
}

export default SectionTogglePreview
