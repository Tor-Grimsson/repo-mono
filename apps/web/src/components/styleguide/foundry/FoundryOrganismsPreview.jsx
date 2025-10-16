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
      {/* FontPreviewItem */}
      <div className="space-y-4">
        <DesSection
          name="FontPreviewItem"
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

      {/* Other Organisms Note */}
      <div
        className="rounded-lg p-8 border-auto"
        style={{
          backgroundColor: 'var(--surface-primary)',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
      >
        <div className="space-y-3">
          <h4 className="kol-mono-xs uppercase opacity-80">Other Foundry Organisms</h4>
          <p className="kol-text-sm opacity-70">
            The following organisms are full page sections and are best viewed on the Foundry page:
          </p>
          <ul className="kol-text-sm opacity-70 list-disc list-inside space-y-1 ml-2">
            <li>
              <span className="font-semibold">HeroSection</span> - Page hero with tag, title, message, and subtext
            </li>
            <li>
              <span className="font-semibold">StylesSection</span> - Display all font weights using StylesGrid
            </li>
            <li>
              <span className="font-semibold">FontPreviewSection</span> - Grid of multiple FontPreviewItem organisms
            </li>
            <li>
              <span className="font-semibold">VariableFontSection</span> - Interactive variable font controls with live preview
            </li>
            <li>
              <span className="font-semibold">GlyphsSection</span> - Glyph set display using GlyphGrid molecule
            </li>
            <li>
              <span className="font-semibold">FeaturesSection</span> - OpenType features using FeatureGrid molecule
            </li>
            <li>
              <span className="font-semibold">PairingsSection</span> - Font pairing recommendations using PairingsList
            </li>
            <li>
              <span className="font-semibold">LicenseSection</span> - License information display
            </li>
            <li>
              <span className="font-semibold">DownloadSection</span> - Download CTA with button and info
            </li>
            <li>
              <span className="font-semibold">CarouselSection</span> - Font examples carousel
            </li>
            <li>
              <span className="font-semibold">ImageSection</span> - Full-width image or multi-image grid
            </li>
          </ul>
          <p className="kol-text-sm opacity-70 pt-2">
            These organisms compose the atoms and molecules shown in previous sections to create
            complete, functional page sections specific to the Foundry typography showcase.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FoundryOrganismsPreview
