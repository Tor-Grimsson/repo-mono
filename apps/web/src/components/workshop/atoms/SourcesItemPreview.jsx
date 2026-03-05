import { SourcesItem } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'

export default function SourcesItemPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Sources Item"
        description="Citation item for source references."
        details="Numbered source with title, link, and metadata"
      />

      <DesCard
        name="Sources Item"
        description="Single source citation with number, title, and meta info"
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <ol className="sources-list">
          <SourcesItem
            number={1}
            title="Design Systems Handbook"
            href="https://example.com"
            meta="DesignBetter, 2023"
          />
          <SourcesItem
            number={2}
            title="Atomic Design Methodology"
            href="https://example.com"
            meta="Brad Frost, 2016"
          />
        </ol>
      </div>
    </div>
  )
}
