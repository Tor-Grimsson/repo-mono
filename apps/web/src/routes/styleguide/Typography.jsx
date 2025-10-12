import GuideCard from '../../components/styleguide/atoms/GuideCard'
import TypeSample from '../../components/styleguide/molecules/TypeSample'
import { typographyScale } from '../../data/styleguide/tokens'

const Typography = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="kol-heading-section">Typography</h2>
        <p className="kol-mono-body mt-4">Typographic styles map to the shared Kolkrabbi token classes. Preview sizes, weights, and intended usage below.</p>
      </div>

      <GuideCard padding="none" border={false} rounded={false}>
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
