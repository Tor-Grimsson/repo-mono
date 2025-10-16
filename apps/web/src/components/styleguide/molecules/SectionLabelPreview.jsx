import { SectionLabel } from '@kol/ui'
import DesSection from './DesSection'
import DesCard from './DesCard'
import SurfacePreviewGrid from './SurfacePreviewGrid'

export default function SectionLabelPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Section Label"
        description="Animated monospace label used in hero headers and work summaries."
        details="Triggers on viewport entry • Uses kol-mono-xs with tracking adjustments • Background stays transparent"
        code={'<SectionLabel text="Featured Work" />'}
      />

      <DesCard
        name="Default Treatment"
        description="Single label centered inside a responsive container."
      />

      <SurfacePreviewGrid>
        <SurfacePreviewGrid.Surface label="Default surface">
          <div className="flex min-h-[180px] items-center justify-center">
            <SectionLabel text="Featured Work" />
          </div>
        </SurfacePreviewGrid.Surface>
        <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
          <div className="flex min-h-[180px] items-center justify-center">
            <SectionLabel text="Featured Work" />
          </div>
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>
    </div>
  )
}
