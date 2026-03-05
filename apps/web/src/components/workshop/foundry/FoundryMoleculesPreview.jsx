import { useState } from 'react'
import {
  GlyphGrid,
  FeatureGrid,
  PairingsList,
  StylesGrid,
  FontControlsPanel
} from '@kol/ui'
import DesSection from '../molecules/DesSection'

/**
 * FoundryMoleculesPreview - Showcase all 6 foundry molecules
 *
 * Displays examples of each Foundry molecule component with interactive examples
 */
const FoundryMoleculesPreview = () => {
  // State for interactive FontControlsPanel demo
  const [style, setStyle] = useState('roman')
  const [weight, setWeight] = useState('Bold')
  const [size, setSize] = useState(72)
  const [leading, setLeading] = useState(10)
  const [spacing, setSpacing] = useState(0)

  // Sample data for glyphs (expanded set)
  const sampleGlyphs = [
    'A', 'Á', 'B', 'C', 'D', 'Ð', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N',
    'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'Þ', 'U', 'Ú', 'V', 'W', 'X', 'Y', 'Ý', 'Z'
  ]

  // Sample features for FeatureGrid
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

  // Sample pairings for PairingsList
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

  // Sample weights for StylesGrid
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

  const styleOptions = [
    { label: 'Roman', value: 'roman' },
    { label: 'Italic', value: 'italic' }
  ]

  const weightOptions = sampleWeights.map(w => ({
    label: w.label,
    value: w.label
  }))

  return (
    <div className="space-y-8">

      {/* Glyph Grid */}
      <div className="space-y-4">
        <DesSection
          name="Glyph Grid"
          description="Grid layout of glyph items in a flexible wrap layout. Composes multiple GlyphItem atoms."
          code='<GlyphGrid glyphs={["A", "B", "C", ...]} />'
        />

        <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
          <GlyphGrid glyphs={sampleGlyphs.slice(0, 24)} />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="space-y-4">
        <DesSection
          name="Feature Grid"
          description="2-column responsive grid of feature cards. Composes multiple FeatureCard atoms."
          code='<FeatureGrid features={[{title, description}, ...]} />'
        />

        <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
          <FeatureGrid features={sampleFeatures} />
        </div>
      </div>

      {/* Pairings List */}
      <div className="space-y-4">
        <DesSection
          name="Pairings List"
          description="Vertical list of font style comparison cards. Compares different variants of the same font."
          code='<PairingsList pairings={[{leftTitle, leftTag, leftDescription, rightTitle, rightTag, rightDescription}, ...]} />'
        />

        <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
          <PairingsList pairings={samplePairings} />
        </div>
      </div>

      {/* Styles Grid */}
      <div className="space-y-4">
        <DesSection
          name="Styles Grid"
          description="Grid of font weight examples from Thin to Black. Composes multiple StyleCard atoms."
          code='<StylesGrid styles={[{label, weight}, ...]} />'
        />

        <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
          <StylesGrid styles={sampleWeights} />
        </div>
      </div>

      {/* Font Controls Panel */}
      <div className="space-y-4">
        <DesSection
          name="Font Controls Panel"
          description="Interactive font controls panel with style/weight dropdowns and size/leading/spacing sliders."
          code='<FontControlsPanel styleOptions={...} weightOptions={...} ... />'
        />

        <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
          <div className="space-y-6">
            <FontControlsPanel
              styleOptions={styleOptions}
              weightOptions={weightOptions}
              selectedStyle={style}
              selectedWeight={weight}
              onStyleChange={setStyle}
              onWeightChange={setWeight}
              size={size}
              onSizeChange={setSize}
              sizeMin={12}
              sizeMax={144}
              leading={leading}
              onLeadingChange={setLeading}
              spacing={spacing}
              onSpacingChange={setSpacing}
              fontLabel="Málrómur"
            />
            <div
              className="text-center p-4 rounded-lg"
              style={{
                fontFamily: 'TGMalromur',
                fontSize: `${Math.min(size, 64)}px`,
                fontWeight: sampleWeights.find(w => w.label === weight)?.weight || 700,
                fontStyle: style === 'italic' ? 'italic' : 'normal',
                lineHeight: `${90 + leading}%`,
                letterSpacing: `${spacing}px`
              }}
            >
              Sample Text
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoundryMoleculesPreview
