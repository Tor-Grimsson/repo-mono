import GuideCard from '../../components/styleguide/atoms/GuideCard'
import { SectionHeader } from '@kol/ui'
import TypeSample from '../../components/styleguide/molecules/TypeSample'
import { typographyScale } from '../../data/styleguide/tokens'

const Typography = () => {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Typography"
        description="Typographic styles map to the shared Kolkrabbi token classes. Preview sizes, weights, and intended usage below."
      />

      <GuideCard padding="lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {typographyScale.map((type) => (
            <TypeSample key={type.id} id={type.id} className={type.className} label={type.label} usage={type.usage} />
          ))}
        </div>
      </GuideCard>
    </div>
  )
}

export default Typography
