import { useState } from 'react'
import { GlyphItem, FeatureCard, PairingCard, StyleCard, ImageItem, TypefaceCard } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

/**
 * FoundryAtomsPreview - Showcase all 6 foundry atoms
 *
 * Displays examples of each Foundry atom component on both
 * default (dark) and inverse (light) surfaces
 */
const FoundryAtomsPreview = () => {
  const [activeFeature, setActiveFeature] = useState(null)
  const [activeStyle, setActiveStyle] = useState(null)
  const [activeTypeface, setActiveTypeface] = useState(null)

  // Sample data
  const sampleGlyphs = ['A', 'Á', 'Ö', 'Þ', 'æ']

  const sampleFeatures = [
    {
      title: 'Designer',
      description: 'TÖLVUGULL - Multidisciplinary design studio',
      icon: 'foundation'
    },
    {
      title: 'Format',
      description: 'Variable & Static - OTF, WOFF, WOFF2',
      icon: 'foundation'
    }
  ]

  const samplePairings = [
    {
      leftTitle: 'Málrómur',
      leftTag: 'Standard',
      leftDescription: 'Default character forms',
      rightTitle: 'Málrómur',
      rightTag: 'Stylistic',
      rightDescription: 'Alternative character forms'
    },
    {
      leftTitle: 'Málrómur',
      leftTag: 'Regular Weight',
      leftDescription: 'Balanced for body text',
      rightTitle: 'Málrómur',
      rightTag: 'Bold Weight',
      rightDescription: 'Emphasis and hierarchy'
    }
  ]

  const sampleWeights = [
    { label: 'Fine', weight: 100 },
    { label: 'Regular', weight: 340 },
    { label: 'Medium', weight: 470 },
    { label: 'Bold', weight: 620 },
    { label: 'Black', weight: 900 }
  ]

  const sampleTypefaces = [
    {
      name: 'TRÖLLATUNGA',
      subtitle: 'Fall Foliage',
      description: 'Contextual and discretionary ligatures for improved readability'
    },
    {
      name: 'TRÖLLATUNGA',
      subtitle: 'Nordic Saga',
      description: 'Extended Latin character set with Icelandic support'
    }
  ]

  return (
    <div className="space-y-8">

      {/* GlyphItem */}
      <div className="space-y-4">
        <DesSection
          name="Glyph Item"
          description="Single glyph character display in bordered 64x64px box. Uses TG Málrómur font with hoverFlipTheme effect (inverts theme colors on hover). Supports optional fontStyle ('normal' or 'italic')."
          code='<GlyphItem glyph="Á" fontStyle="normal" />'
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
          description="Metadata display card used in FeatureGrid. Shows title (uppercase) and description with optional icon. Supports active state tracking for last hovered card."
          code='<FeatureCard title="Designer" description="TÖLVUGULL" icon="foundation" isActive={activeIndex === 0} onMouseEnter={() => setActiveIndex(0)} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleFeatures.map((feature, i) => (
                <FeatureCard
                  key={i}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  isActive={activeFeature === i}
                  onMouseEnter={() => setActiveFeature(i)}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleFeatures.map((feature, i) => (
                <FeatureCard
                  key={i}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  isActive={activeFeature === i}
                  onMouseEnter={() => setActiveFeature(i)}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* PairingCard */}
      <div className="space-y-4">
        <DesSection
          name="Pairing Card"
          description="Font pairing comparison card with vertical divider. Shows two font specimens side-by-side with tag and description. Used in PairingsList molecule. Features hover state (8% border → 24%, transparent bg → 1% tint)."
          code='<PairingCard leftTitle="Málrómur" leftTag="Standard" leftDescription="Default forms" rightTitle="Málrómur" rightTag="Stylistic" rightDescription="Alternative forms" />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="flex flex-col gap-4">
              {samplePairings.map((pairing, i) => (
                <PairingCard
                  key={i}
                  leftTitle={pairing.leftTitle}
                  leftTag={pairing.leftTag}
                  leftDescription={pairing.leftDescription}
                  rightTitle={pairing.rightTitle}
                  rightTag={pairing.rightTag}
                  rightDescription={pairing.rightDescription}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="flex flex-col gap-4">
              {samplePairings.map((pairing, i) => (
                <PairingCard
                  key={i}
                  leftTitle={pairing.leftTitle}
                  leftTag={pairing.leftTag}
                  leftDescription={pairing.leftDescription}
                  rightTitle={pairing.rightTitle}
                  rightTag={pairing.rightTag}
                  rightDescription={pairing.rightDescription}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* StyleCard */}
      <div className="space-y-4">
        <DesSection
          name="Style Card"
          description="Font weight display card showing weight name and numeric value. Uses TG Málrómur font rendered at the specified weight. Supports active state tracking and optional italic style. Used in FoundryStyleSection."
          code='<StyleCard label="Medium" weight={470} isActive={activeIndex === 0} onMouseEnter={() => setActiveIndex(0)} onClick={handleClick} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="flex flex-col gap-2">
              {sampleWeights.map((style, i) => (
                <StyleCard
                  key={i}
                  label={style.label}
                  weight={style.weight}
                  isActive={activeStyle === i}
                  onMouseEnter={() => setActiveStyle(i)}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="flex flex-col gap-2">
              {sampleWeights.map((style, i) => (
                <StyleCard
                  key={i}
                  label={style.label}
                  weight={style.weight}
                  isActive={activeStyle === i}
                  onMouseEnter={() => setActiveStyle(i)}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* ImageItem */}
      <div className="space-y-4">
        <DesSection
          name="Image Item"
          description="Image display with responsive sizing and optional clamped border radius. Supports aspectRatio ('auto' or 'square'), objectFit ('cover', 'contain'), and useClampedRadius for responsive radius."
          code='<ImageItem src="/img/foundry/specimen.jpg" alt="Typeface specimen" objectFit="cover" useClampedRadius={true} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div
              className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: 'var(--kol-surface-secondary)' }}
            >
              <div className="kol-mono-xs text-fg-48">Image placeholder (640x480)</div>
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div
              className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: 'var(--kol-surface-secondary)' }}
            >
              <div className="kol-mono-xs text-fg-48">Image placeholder (640x480)</div>
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* TypefaceCard */}
      <div className="space-y-4">
        <DesSection
          name="Typeface Card"
          description="Typeface showcase card with inverse surface background. Shows name (uppercase), subtitle (italic), large specimen (64px Aa), and description. Features opacity states (80% default → 100% on hover/active). Used in FoundryOtherTypefaces grid."
          code='<TypefaceCard name="TRÖLLATUNGA" subtitle="Fall Foliage" description="Contextual ligatures" isActive={activeIndex === 0} onMouseEnter={() => setActiveIndex(0)} />'
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleTypefaces.map((typeface, i) => (
                <TypefaceCard
                  key={i}
                  name={typeface.name}
                  subtitle={typeface.subtitle}
                  description={typeface.description}
                  isActive={activeTypeface === i}
                  onMouseEnter={() => setActiveTypeface(i)}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleTypefaces.map((typeface, i) => (
                <TypefaceCard
                  key={i}
                  name={typeface.name}
                  subtitle={typeface.subtitle}
                  description={typeface.description}
                  isActive={activeTypeface === i}
                  onMouseEnter={() => setActiveTypeface(i)}
                />
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

    </div>
  )
}

export default FoundryAtomsPreview
