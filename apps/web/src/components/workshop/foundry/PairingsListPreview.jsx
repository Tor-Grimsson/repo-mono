import { PairingsList } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

const samplePairings = [
  {
    leftTitle: 'Málrómur',
    leftTag: 'Standard',
    leftDescription: 'Default character forms with standard ligatures',
    rightTitle: 'Málrómur',
    rightTag: 'Stylistic Alternates',
    rightDescription: 'Alternative character forms for unique typographic expression'
  },
  {
    leftTitle: 'Málrómur',
    leftTag: 'Regular Weight',
    leftDescription: 'Balanced weight for body text and extended reading',
    rightTitle: 'Málrómur',
    rightTag: 'Bold Weight',
    rightDescription: 'Increased weight for emphasis and hierarchy'
  }
]

export default function PairingsListPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Pairings List"
        description="Vertical list of font style comparison cards."
        details="Compares different variants of the same font"
      />

      <DesCard
        name="Pairings List"
        description="Font variant comparisons"
      />
      <SurfacePreviewGrid>
        <SurfacePreviewGrid.Surface label="Default surface">
          <PairingsList pairings={samplePairings} />
        </SurfacePreviewGrid.Surface>
        <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
          <PairingsList pairings={samplePairings} />
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>
    </div>
  )
}
