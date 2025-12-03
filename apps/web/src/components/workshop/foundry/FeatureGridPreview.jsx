import { FeatureGrid } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

const sampleFeatures = [
  {
    title: 'Stylistic Alternates',
    description: 'Access alternative character designs and variant glyphs for enhanced typographic expression.'
  },
  {
    title: 'OpenType Features',
    description: 'Full support for advanced OpenType features including ligatures and contextual alternates.'
  },
  {
    title: 'Variable Font Axes',
    description: 'Smooth interpolation across weight axis from Thin (100) to Black (900).'
  },
  {
    title: 'Extended Character Set',
    description: 'Complete Latin Extended-A support including Icelandic characters Þ, Ð, Æ, and Ö.'
  }
]

export default function FeatureGridPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Feature Grid"
        description="2-column responsive grid of feature cards."
        details="Composes multiple FeatureCard atoms"
      />

      <DesCard
        name="Feature Grid"
        description="Feature cards in grid layout"
      />
      <SurfacePreviewGrid>
        <SurfacePreviewGrid.Surface label="Default surface">
          <FeatureGrid features={sampleFeatures} />
        </SurfacePreviewGrid.Surface>
        <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
          <FeatureGrid features={sampleFeatures} />
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>
    </div>
  )
}
