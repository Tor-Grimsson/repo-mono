import { StylesGrid } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'

const sampleWeights = [
  { label: 'Thin', weight: 100 },
  { label: 'Extralight', weight: 200 },
  { label: 'Light', weight: 300 },
  { label: 'Regular', weight: 400 },
  { label: 'Medium', weight: 500 },
  { label: 'Semibold', weight: 600 },
  { label: 'Bold', weight: 700 },
  { label: 'Extrabold', weight: 800 },
  { label: 'Black', weight: 900 }
]

export default function StylesGridPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Styles Grid"
        description="Grid of font weight examples from Thin to Black."
        details="Composes multiple StyleCard atoms"
      />

      <DesCard
        name="Styles Grid"
        description="Font weight display grid"
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <StylesGrid styles={sampleWeights} />
      </div>
    </div>
  )
}
