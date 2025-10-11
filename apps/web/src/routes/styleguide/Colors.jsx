import GuideCard from '../../components/styleguide/atoms/GuideCard'
import { SectionHeader } from '@kol/ui'
import ColorSwatch from '../../components/styleguide/molecules/ColorSwatch'
import { accentSwatches, foregroundSwatches, surfaceSwatches } from '../../data/styleguide/tokens'

const Colors = () => {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Color Tokens"
        description="Primary surfaces and text colors adapt automatically between light and dark themes via shared CSS variables."
      />

      <GuideCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold textAbsoluteBlack">Surface palette</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {surfaceSwatches.map((swatch) => (
            <ColorSwatch key={swatch.token} {...swatch} />
          ))}
        </div>
      </GuideCard>

      <GuideCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold textAbsoluteBlack">Foreground tokens</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foregroundSwatches.map((swatch) => (
            <ColorSwatch key={swatch.token} {...swatch} />
          ))}
        </div>
      </GuideCard>

      <GuideCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold textAbsoluteBlack">Accent & feedback</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accentSwatches.map((swatch) => (
            <ColorSwatch key={swatch.token} {...swatch} />
          ))}
        </div>
      </GuideCard>
    </div>
  )
}

export default Colors
