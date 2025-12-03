import { useState } from 'react'
import { GlyphItem, FeatureCard, PairingCard, StyleCard, TypefaceCard } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

/**
 * FoundryAtomsPreview - Showcase all 6 foundry atoms
 *
 * Displays examples of each Foundry atom component on both
 * default (dark) and inverse (light) surfaces
 */
const FoundryAtomsPreview = ({ nativeOnly = false }) => {
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
      <DesSection
        name="Foundry"
        description="Atoms specific to the Foundry typeface pages."
        details="Glyph items, feature cards, pairing cards, style cards, and typeface cards"
      />

      {/* GlyphItem */}
      <DesCard
        name="Glyph Item"
        description="Single glyph character display with hoverFlipTheme effect"
      />

      <SurfacePreviewGrid nativeOnly={nativeOnly}>
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

      {/* FeatureCard */}
      <DesCard
        name="Feature Card"
        description="Metadata display card with title and description"
      />

      <SurfacePreviewGrid nativeOnly={nativeOnly}>
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

      {/* PairingCard */}
      <DesCard
        name="Pairing Card"
        description="Font pairing comparison card with vertical divider"
      />

      <SurfacePreviewGrid nativeOnly={nativeOnly}>
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

      {/* StyleCard */}
      <DesCard
        name="Style Card"
        description="Font weight display card with label and numeric value"
      />

      <SurfacePreviewGrid nativeOnly={nativeOnly}>
        <SurfacePreviewGrid.Surface>
          <div className="flex flex-col gap-2">
            <StyleCard
              label="Regular"
              weight={340}
              isActive={activeStyle === 0}
              onMouseEnter={() => setActiveStyle(0)}
            />
            <StyleCard
              label="Bold"
              weight={620}
              isActive={activeStyle === 1}
              onMouseEnter={() => setActiveStyle(1)}
            />
          </div>
        </SurfacePreviewGrid.Surface>

        <SurfacePreviewGrid.Surface inverse>
          <div className="flex flex-col gap-2">
            <StyleCard
              label="Regular"
              weight={340}
              isActive={activeStyle === 0}
              onMouseEnter={() => setActiveStyle(0)}
            />
            <StyleCard
              label="Bold"
              weight={620}
              isActive={activeStyle === 1}
              onMouseEnter={() => setActiveStyle(1)}
            />
          </div>
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>

      {/* TypefaceCard */}
      <DesCard
        name="Typeface Card"
        description="Typeface showcase card with inverse surface background"
      />

      <SurfacePreviewGrid nativeOnly={nativeOnly}>
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
  )
}

export default FoundryAtomsPreview
