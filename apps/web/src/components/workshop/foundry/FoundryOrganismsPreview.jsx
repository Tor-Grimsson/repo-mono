import { FontPreviewItem } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'
import TypefaceLibraryItem from '../../../routes/foundry/components/TypefaceLibraryItem'
import TypefaceVariablePreview from '../../../routes/foundry/components/TypefaceVariablePreview'

/**
 * FoundryOrganismsPreview - Showcase foundry organisms
 *
 * Displays the FontPreviewItem organism with full interactive controls.
 * Note: Other organisms (sections) are page-specific and not shown here.
 */
const FoundryOrganismsPreview = () => {
  // Sample typeface data
  const sampleTypeface = {
    name: 'TG Málrómur',
    subtitle: 'Variable Italic Serif',
    description: 'A contemporary italic variable font for editorial design',
    classification: 'Serif',
    status: 'Available',
    year: '2025',
    styles: 'Variable (wght, slnt)',
    link: '/foundry/typefaces/malromur'
  }

  const sampleTypefaceGullhamrar = {
    name: 'TG Gullhamrar',
    subtitle: 'Compliment',
    description: 'Variable weight typeface with warm, graceful forms',
    classification: 'Serif',
    status: 'Available',
    year: '2025',
    styles: 'Variable (wght)',
    link: '/foundry/typefaces/gullhamrar'
  }

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

      {/* Typeface Library Item - List View */}
      <div className="space-y-4">
        <DesSection
          name="Typeface Library Item - List View"
          description="Compact horizontal list item with alphabet preview and intelligent text clipping. Uses binary search algorithm to clip text 40px before card edge. Shows typeface name, styles, classification, and year."
          code='<TypefaceLibraryItem typeface={typeface} variant="list" />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="w-full">
              <TypefaceLibraryItem typeface={sampleTypeface} variant="list" />
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="w-full">
              <TypefaceLibraryItem typeface={sampleTypefaceGullhamrar} variant="list" />
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* Typeface Library Item - Card View */}
      <div className="space-y-4">
        <DesSection
          name="Typeface Library Item - Card View"
          description="Vertical card with large 'Ðð' preview. Hover shows pangram sentence. 500px fixed height with smooth transitions between states."
          code='<TypefaceLibraryItem typeface={typeface} variant="card" />'
        />

        <SurfacePreviewGrid cols={2}>
          <SurfacePreviewGrid.Surface>
            <div className="w-full">
              <TypefaceLibraryItem typeface={sampleTypeface} variant="card" />
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="w-full">
              <TypefaceLibraryItem typeface={sampleTypefaceGullhamrar} variant="card" />
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* Typeface Variable Preview - List View */}
      <div className="space-y-4">
        <DesSection
          name="Typeface Variable Preview - List View"
          description="Interactive preview for individual weight/variant with Size, Leading, and Spacing sliders. Editable text field with real-time font rendering. Used in 'By Typeface' filter mode."
          code='<TypefaceVariablePreview typeface={typeface} weight="Light" weightValue={200} variant="list" />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="w-full">
              <TypefaceVariablePreview
                typeface={sampleTypefaceGullhamrar}
                weight="Light"
                weightValue={200}
                variant="list"
              />
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="w-full">
              <TypefaceVariablePreview
                typeface={sampleTypefaceGullhamrar}
                weight="Bold"
                weightValue={700}
                variant="list"
              />
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* Typeface Variable Preview - Card View */}
      <div className="space-y-4">
        <DesSection
          name="Typeface Variable Preview - Card View"
          description="Static information display showing metrics (classification, weight, status, year) and typography metrics placeholder. Alternative view for weight variants."
          code='<TypefaceVariablePreview typeface={typeface} weight="Medium" weightValue={500} variant="card" />'
        />

        <SurfacePreviewGrid cols={2}>
          <SurfacePreviewGrid.Surface>
            <div className="w-full">
              <TypefaceVariablePreview
                typeface={sampleTypefaceGullhamrar}
                weight="Medium"
                weightValue={500}
                variant="card"
              />
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="w-full">
              <TypefaceVariablePreview
                typeface={sampleTypefaceGullhamrar}
                weight="Black"
                weightValue={900}
                variant="card"
              />
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

    </div>
  )
}

export default FoundryOrganismsPreview
