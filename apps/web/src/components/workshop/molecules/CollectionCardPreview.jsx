import { CollectionCard } from '@kol/ui'
import DesSection from './DesSection'
import DesCard from './DesCard'

const sampleIllustration = {
  id: 1,
  name: 'Cyber Fox',
  description: 'Digital illustration exploring neon aesthetics',
  illustrationName: 'cyber-fox',
  type: 'Digital',
  year: '2024'
}

const sampleLogomark = {
  id: 2,
  name: 'Flík',
  description: 'Brand identity for Icelandic design studio',
  logoName: 'flik',
  type: 'Symbol',
  year: '2023'
}

const sampleVideo = {
  id: 3,
  title: 'Geometric Patterns',
  subtitle: 'Procedural animation study',
  description: 'Exploration of geometric patterns',
  type: 'Generative',
  year: '2024',
  touchDesigner: {
    patchName: 'geometric_patterns_v01.toe',
    version: '2023.11880'
  }
}

export default function CollectionCardPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Collection Card"
        description="Card for displaying collection items."
        details="Supports illustrations, logomarks, and videos with hover interactions"
      />

      <DesCard
        name="Illustration"
        description="Square aspect ratio with centered illustration"
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="max-w-[280px]">
          <CollectionCard
            item={sampleIllustration}
            type="illustration"
          />
        </div>
      </div>

      <DesCard
        name="Logomark"
        description="Square aspect ratio with centered logomark"
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="max-w-[280px]">
          <CollectionCard
            item={sampleLogomark}
            type="logomark"
          />
        </div>
      </div>

      <DesCard
        name="Video"
        description="16:9 aspect ratio with play button and TD badge"
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="max-w-[360px]">
          <CollectionCard
            item={sampleVideo}
            type="video"
            backgroundColor="bg-surface-secondary"
          />
        </div>
      </div>
    </div>
  )
}
