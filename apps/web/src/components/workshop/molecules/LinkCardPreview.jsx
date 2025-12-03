import { LinkCard } from '@kol/ui'
import DesSection from './DesSection'
import DesCard from './DesCard'
import SurfacePreviewGrid from './SurfacePreviewGrid'

export default function LinkCardPreview({ nativeOnly = false }) {
  return (
    <div className="space-y-8">
      <DesSection
        name="Link Card"
        description="Card with heading, description, and CTA link."
        details="Used for navigation sections and feature highlights"
      />

      <DesCard
        name="Default"
        description="Standard link card with title, description, and link"
      />
      <SurfacePreviewGrid nativeOnly={nativeOnly}>
        <SurfacePreviewGrid.Surface label="Default surface">
          <div className="max-w-[320px]">
            <LinkCard
              title="Illustrations"
              description="Browse the complete illustration portfolio featuring visual explorations."
              to="/collections/illustrations"
              linkLabel="View Gallery"
            />
          </div>
        </SurfacePreviewGrid.Surface>
        <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
          <div className="max-w-[320px]">
            <LinkCard
              title="Illustrations"
              description="Browse the complete illustration portfolio featuring visual explorations."
              to="/collections/illustrations"
              linkLabel="View Gallery"
            />
          </div>
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>

      <DesCard
        name="Custom Typography"
        description="With custom title and description classes"
      />
      <SurfacePreviewGrid nativeOnly={nativeOnly}>
        <SurfacePreviewGrid.Surface label="Default surface">
          <div className="max-w-[320px]">
            <LinkCard
              title="Featured Work"
              description="Explore our latest projects and design explorations."
              to="/work"
              linkLabel="Explore Work"
              titleClass="kol-heading-narrow-sm"
              descriptionClass="kol-text-sm"
            />
          </div>
        </SurfacePreviewGrid.Surface>
        <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
          <div className="max-w-[320px]">
            <LinkCard
              title="Featured Work"
              description="Explore our latest projects and design explorations."
              to="/work"
              linkLabel="Explore Work"
              titleClass="kol-heading-narrow-sm"
              descriptionClass="kol-text-sm"
            />
          </div>
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>
    </div>
  )
}
