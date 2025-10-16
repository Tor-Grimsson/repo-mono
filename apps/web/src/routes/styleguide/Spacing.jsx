import DesPage from '../../components/styleguide/molecules/DesPage'
import DesSection from '../../components/styleguide/molecules/DesSection'
import SpacingRow from '../../components/styleguide/molecules/SpacingRow'
import { spacingScale } from '../../data/styleguide/tokens'

const Spacing = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Spacing"
        subtitle="Tokenized spacing system based on a 4px rhythm. Utility classes, component paddings, and layout gaps map directly to these values."
      />

      <DesSection
        name="Spacing Scale"
        description="Core spacing tokens from 4px up to 192px with matching REM values."
        details="Tokens defined in @kol/ui/theme.css and consumed via Tailwind spacing utilities."
      />

      <div className="space-y-8">
        {spacingScale.map((item) => (
          <SpacingRow key={item.token} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Spacing
