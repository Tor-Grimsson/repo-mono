import { LinkCard } from '@kol/ui'
import DesSection from './DesSection'
import DesCard from './DesCard'

export default function LinkCardPreview() {
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
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="max-w-[320px]">
          <LinkCard
            title="Illustrations"
            description="Browse the complete illustration portfolio featuring visual explorations."
            to="/collections/illustrations"
            linkLabel="View Gallery"
          />
        </div>
      </div>

      <DesCard
        name="Custom Typography"
        description="With custom title and description classes"
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
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
      </div>
    </div>
  )
}
