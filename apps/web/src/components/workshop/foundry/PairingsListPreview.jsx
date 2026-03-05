import { PairingsList } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'

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
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <PairingsList pairings={samplePairings} />
      </div>
    </div>
  )
}
