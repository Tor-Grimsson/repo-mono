import GuideCard from '../../components/styleguide/atoms/GuideCard'
import SpacingRow from '../../components/styleguide/molecules/SpacingRow'
import { spacingScale } from '../../data/styleguide/tokens'

const Spacing = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="kol-heading-section">Spacing</h2>
        <p className="kol-mono-body mt-4">Spacing tokens provide a 4px-based rhythm used throughout layout utilities and component padding.</p>
      </div>

      <GuideCard padding="none" border={false} rounded={false} className="space-y-3">
        {spacingScale.map((item) => (
          <SpacingRow key={item.token} {...item} />
        ))}
      </GuideCard>
    </div>
  )
}

export default Spacing
