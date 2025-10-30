import { FontPreviewItem } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

/**
 * FoundryOrganismsPreview - Showcase foundry organisms
 *
 * Displays the FontPreviewItem organism with full interactive controls.
 * Note: Other organisms (sections) are page-specific and not shown here.
 */
const FoundryOrganismsPreview = () => {
  return (
    <div className="space-y-8">
      {/* Font Preview Item */}
      <div className="space-y-4">
        <DesSection
          name="Font Preview Item"
          description="Interactive font preview organism with full controls. Features auto-sizing, text clipping, style/weight selection, and leading/spacing adjustments. Uses FontControlsPanel molecule."
          code='<FontPreviewItem text="..." initialSize={96} initialWeight="Black" bgOpacity={100} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="w-full" style={{ minHeight: '420px' }}>
              <FontPreviewItem
                text="Tradition meets precision in every curve and counter."
                initialSize={72}
                initialWeight="Bold"
                bgOpacity={100}
                cardClassName=""
              />
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="w-full" style={{ minHeight: '420px' }}>
              <FontPreviewItem
                text="Tradition meets precision in every curve and counter."
                initialSize={72}
                initialWeight="Bold"
                bgOpacity={100}
                cardClassName="foundryCardInverted"
              />
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

    </div>
  )
}

export default FoundryOrganismsPreview
