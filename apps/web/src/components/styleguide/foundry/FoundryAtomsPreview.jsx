import { GlyphItem, FeatureCard, PairingCard, StyleCard, FontBadge, ImageItem } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

/**
 * FoundryAtomsPreview - Showcase all 6 foundry atoms
 *
 * Displays examples of each Foundry atom component on both
 * default (dark) and inverse (light) surfaces
 */
const FoundryAtomsPreview = () => {
  // Sample data
  const sampleGlyphs = ['A', 'Á', 'Ö', 'Þ', 'æ']

  const sampleFeatures = [
    {
      title: 'Stylistic Alternates',
      description: 'Access alternative character designs and variant glyphs for enhanced typographic expression.'
    },
    {
      title: 'OpenType Features',
      description: 'Full support for advanced OpenType features including ligatures and contextual alternates.'
    }
  ]

  const samplePairings = [
    {
      primary: 'TG Málrómur',
      secondary: 'Right Grotesk',
      usage: 'Headlines + Body'
    },
    {
      primary: 'TG Málrómur Bold',
      secondary: 'Inter',
      usage: 'Display + UI'
    }
  ]

  const sampleWeights = [
    { label: 'Thin', weight: 100 },
    { label: 'Regular', weight: 400 },
    { label: 'Bold', weight: 700 },
    { label: 'Black', weight: 900 }
  ]

  const sampleBadges = [
    'Variable Font',
    'OpenType Features',
    'TG Málrómur'
  ]

  return (
    <div className="space-y-8">

      {/* GlyphItem */}
      <div className="space-y-4">
        <DesSection
          name="Glyph Item"
          description="Single glyph character display with bordered box and hover flip theme effect. Uses TG Málrómur font."
          code='<GlyphItem glyph="A" />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="flex flex-wrap gap-3">
              {sampleGlyphs.map((glyph, i) => (
                <GlyphItem key={i} glyph={glyph} />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="flex flex-wrap gap-3">
              {sampleGlyphs.map((glyph, i) => (
                <GlyphItem key={i} glyph={glyph} />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* FeatureCard */}
      <div className="space-y-4">
        <DesSection
          name="Feature Card"
          description="Title and description card with hover flip theme effect. Used for OpenType features."
          code='<FeatureCard title="Feature Name" description="Description text here" />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="space-y-3">
              {sampleFeatures.map((feature, i) => (
                <FeatureCard key={i} title={feature.title} description={feature.description} />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="space-y-3">
              {sampleFeatures.map((feature, i) => (
                <FeatureCard key={i} title={feature.title} description={feature.description} />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* PairingCard */}
      <div className="space-y-4">
        <DesSection
          name="Pairing Card"
          description="Font pairing display showing primary font, secondary font, and usage context."
          code='<PairingCard primary="Font A" secondary="Font B" usage="Context" />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="space-y-3">
              {samplePairings.map((pairing, i) => (
                <PairingCard
                  key={i}
                  primary={pairing.primary}
                  secondary={pairing.secondary}
                  usage={pairing.usage}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="space-y-3">
              {samplePairings.map((pairing, i) => (
                <PairingCard
                  key={i}
                  primary={pairing.primary}
                  secondary={pairing.secondary}
                  usage={pairing.usage}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* StyleCard */}
      <div className="space-y-4">
        <DesSection
          name="StyleCard"
          description="Individual font weight display with weight name and sample text rendered in that weight."
          code='<StyleCard label="Bold" weight={700} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="space-y-2">
              {sampleWeights.map((style, i) => (
                <StyleCard
                  key={i}
                  label={style.label}
                  weight={style.weight}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="space-y-2">
              {sampleWeights.map((style, i) => (
                <StyleCard
                  key={i}
                  label={style.label}
                  weight={style.weight}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* FontBadge */}
      <div className="space-y-4">
        <DesSection
          name="FontBadge"
          description="Small label badge for categorization with pill shape, accent background, and monospace font."
          code='<FontBadge>Label Text</FontBadge>'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="flex flex-wrap gap-2">
              {sampleBadges.map((badge, i) => (
                <FontBadge key={i}>{badge}</FontBadge>
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="flex flex-wrap gap-2">
              {sampleBadges.map((badge, i) => (
                <FontBadge key={i}>{badge}</FontBadge>
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* ImageItem */}
      <div className="space-y-4">
        <DesSection
          name="ImageItem"
          description="Single image display with optional object-fit styling and responsive sizing."
          code='<ImageItem src="/path/to/image.jpg" alt="Description" objectFit="cover" />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div
              className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: 'var(--surface-tertiary)' }}
            >
              <div className="kol-mono-xs opacity-50">Image placeholder (640x480)</div>
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div
              className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: 'var(--surface-tertiary)' }}
            >
              <div className="kol-mono-xs opacity-50">Image placeholder (640x480)</div>
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

    </div>
  )
}

export default FoundryAtomsPreview
