import { useState } from 'react'
import {
  GlyphGrid,
  FeatureGrid,
  PairingsList,
  StylesGrid,
  FoundryCard,
  FontControlsPanel,
  Slider
} from '@kol/ui'
import DesSection from '../molecules/DesSection'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

/**
 * FoundryMoleculesPreview - Showcase all 6 foundry molecules
 *
 * Displays examples of each Foundry molecule component with
 * interactive examples and variant demonstrations
 */
const FoundryMoleculesPreview = () => {
  // State for interactive FontControlsPanel demo
  const [style, setStyle] = useState('roman')
  const [weight, setWeight] = useState('Bold')
  const [size, setSize] = useState(72)
  const [leading, setLeading] = useState(10)
  const [spacing, setSpacing] = useState(0)

  // State for FoundryCard opacity demo
  const [cardOpacity, setCardOpacity] = useState(100)

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
      primary: 'TG Málrómur Black',
      secondary: 'Right Grotesk Regular',
      usage: 'Display Headlines + Body Text'
    },
    {
      primary: 'TG Málrómur Bold',
      secondary: 'Inter Medium',
      usage: 'Section Headers + UI Elements'
    },
    {
      primary: 'TG Málrómur Regular',
      secondary: 'Right Grotesk Light',
      usage: 'Subheadings + Editorial'
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

      {/* GlyphGrid */}
      <div className="space-y-4">
        <DesSection
          name="GlyphGrid"
          description="Grid layout of glyph items in a flexible wrap layout. Composes multiple GlyphItem atoms."
          code='<GlyphGrid glyphs={["A", "B", "C", ...]} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <GlyphGrid glyphs={sampleGlyphs.slice(0, 24)} />
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <GlyphGrid glyphs={sampleGlyphs.slice(0, 24)} />
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* FeatureGrid */}
      <div className="space-y-4">
        <DesSection
          name="FeatureGrid"
          description="2-column responsive grid of feature cards. Composes multiple FeatureCard atoms."
          code='<FeatureGrid features={[{title, description}, ...]} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <FeatureGrid features={sampleFeatures} />
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <FeatureGrid features={sampleFeatures} />
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* PairingsList */}
      <div className="space-y-4">
        <DesSection
          name="PairingsList"
          description="Vertical list of font pairing cards. Composes multiple PairingCard atoms."
          code='<PairingsList pairings={[{primary, secondary, usage}, ...]} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <PairingsList pairings={samplePairings} />
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <PairingsList pairings={samplePairings} />
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* StylesGrid */}
      <div className="space-y-4">
        <DesSection
          name="StylesGrid"
          description="Grid of font weight examples from Thin to Black. Composes multiple StyleCard atoms."
          code='<StylesGrid styles={[{label, weight}, ...]} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <StylesGrid styles={sampleWeights} />
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <StylesGrid styles={sampleWeights} />
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* FoundryCard */}
      <div className="space-y-4">
        <DesSection
          name="FoundryCard"
          description="Base card component with variants (default, padded, inverted) and opacity control."
          code='<FoundryCard variant="padded" opacity={100}>...</FoundryCard>'
        />

        <div className="space-y-4">
          {/* Opacity slider */}
          <div
            className="rounded-lg p-8 border-auto"
            style={{
              backgroundColor: 'var(--surface-primary)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="kol-mono-xs opacity-60 mb-4">Opacity Control</div>
            <Slider
              label="Card Opacity"
              min={0}
              max={100}
              value={cardOpacity}
              onChange={setCardOpacity}
              className="max-w-md"
            />
          </div>

          {/* Variant examples */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-3">
              <div className="kol-mono-xs uppercase opacity-60">Default</div>
              <FoundryCard variant="default" opacity={cardOpacity}>
                <div className="min-h-[120px] flex items-center justify-center kol-mono-xs">
                  Default card variant
                </div>
              </FoundryCard>
            </div>
            <div className="space-y-3">
              <div className="kol-mono-xs uppercase opacity-60">Padded</div>
              <FoundryCard variant="padded" opacity={cardOpacity}>
                <div className="min-h-[120px] flex items-center justify-center kol-mono-xs">
                  Padded card variant
                </div>
              </FoundryCard>
            </div>
            <div className="space-y-3">
              <div className="kol-mono-xs uppercase opacity-60">Inverted</div>
              <FoundryCard variant="inverted" opacity={cardOpacity}>
                <div className="min-h-[120px] flex items-center justify-center kol-mono-xs">
                  Inverted card variant
                </div>
              </FoundryCard>
            </div>
          </div>
        </div>
      </div>

      {/* FontControlsPanel */}
      <div className="space-y-4">
        <DesSection
          name="FontControlsPanel"
          description="Interactive font controls panel with style/weight dropdowns and size/leading/spacing sliders."
          code='<FontControlsPanel styleOptions={...} weightOptions={...} ... />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
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
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
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
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>
    </div>
  )
}

export default FoundryMoleculesPreview
