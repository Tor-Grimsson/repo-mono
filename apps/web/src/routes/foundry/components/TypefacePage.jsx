import React, { useState, useEffect, useRef } from 'react'
import { applyTheme, FoundryCTA, getInitialTheme, OverviewHero } from '@kol/ui'
import TypefaceStyleSection from './TypefaceStyleSection'
import FontPreviewSection from './FontPreviewSection'
import VariableFontSection from './VariableFontSection'
import FoundryCharacterSets from './FoundryCharacterSets'
import FoundryOpentypeFeatures from './FoundryOpentypeFeatures'
import FoundryTypefaceDetails from './FoundryTypefaceDetails'
import FoundryTypefacePairing from './FoundryTypefacePairing'
import FoundryOtherTypefaces from './FoundryOtherTypefaces'
import GlyphMetricsSection from './GlyphMetricsSection'

/**
 * Unified Typeface Page Component
 *
 * Replaces all individual FoundryType*.jsx components
 * with a single data-driven page layout
 *
 * @param {object} typeface - Typeface configuration object from typefaceConfig
 * @param {string} titleClassName - Optional custom className for hero title
 */
const TypefacePage = ({ typeface, titleClassName = 'text-8xl' }) => {
  const [currentGlyphSet, setCurrentGlyphSet] = useState('uppercase')
  const glyphsGridRef = useRef(null)

  const handleGlyphSetChange = (setName) => {
    setCurrentGlyphSet(setName)
  }

  const toggleTheme = (nextTheme) => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    const targetTheme = typeof nextTheme === 'string' ? nextTheme : (current === 'dark' ? 'light' : 'dark')
    applyTheme(targetTheme)
  }

  useEffect(() => {
    applyTheme(getInitialTheme())
  }, [])

  const {
    displayName,
    fontFamily,
    fontUrl,
    fontUrlRoman,
    fontUrlItalic,
    fontStyle,
    badgeText,
    category,
    description,
    specimenLink,
    styles,
    photos = []
  } = typeface

  // Determine if variable font sections should be shown
  const showVariableSection = styles.hasWeight || styles.hasWidth

  // Get photo at index (all typefaces have CDN photos configured)
  const getPhoto = (index) => photos[index]

  // Generate srcSet from a photo URL by replacing the size
  // Pattern: {path}-{size}.jpg → {path}-400.jpg 400w, {path}-800.jpg 800w, etc.
  // Capped at 1600 as not all images have 2560 available
  const getSrcSet = (photoUrl) => {
    if (!photoUrl || !photoUrl.includes('-1200.jpg')) return null
    const basePath = photoUrl.replace('-1200.jpg', '')
    return `${basePath}-400.jpg 400w, ${basePath}-800.jpg 800w, ${basePath}-1200.jpg 1200w, ${basePath}-1600.jpg 1600w`
  }

  return (
    <div className="min-h-screen mb-16 bg-surface-primary">
      <main className="w-full">
        {/* Hero Section */}
        <OverviewHero
          badge={category}
          badgeVariant="subtle"
          title={displayName}
          titleFontFamily={fontFamily}
          titleFontStyle={fontStyle}
          titleClassName={titleClassName}
          description={description}
          buttons={[
            { label: 'Download font', variant: 'primary' },
            {
              label: 'View Specimen',
              variant: 'outline',
              href: specimenLink
            }
          ]}
          footerText="Free for personal and commercial use"
        />

        {/* Full Screen Image 1 */}
        <section className="w-full pt-16">
          <div className="max-w-[1400px] mx-auto aspect-[2/1]">
            <div className="w-full h-full bg-surface-secondary rounded border border-fg-08">
              <img
                src={getPhoto(0)}
                srcSet={getSrcSet(photos[0])}
                sizes="(max-width: 1400px) 100vw, 1400px"
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Section 1: Styles */}
        <TypefaceStyleSection typeface={typeface} />

        {/* Image Section 2 */}
        <section className="w-full overflow-hidden py-16">
          <div className="max-w-[1400px] mx-auto aspect-[2/1]">
            <div className="w-full h-full bg-surface-secondary rounded border border-fg-08">
              <img
                src={getPhoto(1)}
                srcSet={getSrcSet(photos[1])}
                sizes="(max-width: 1400px) 100vw, 1400px"
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Font Preview */}
        <FontPreviewSection
          fontFamily={fontFamily}
          badgeText={badgeText}
          showDropdown={styles.hasItalic}
        />

        {/* Image Section 3 */}
        <section className="w-full overflow-hidden py-16">
          <div className="max-w-[1400px] mx-auto aspect-[2/1]">
            <div className="w-full h-full bg-surface-secondary rounded border border-fg-08">
              <img
                src={getPhoto(2)}
                srcSet={getSrcSet(photos[2])}
                sizes="(max-width: 1400px) 100vw, 1400px"
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Variable Font (only for variable fonts) */}
        {showVariableSection && (
          <VariableFontSection
            fontFamily={fontFamily}
            badgeText={badgeText}
            showDropdown={styles.hasItalic}
          />
        )}

        {/* Section 4: Glyph Metrics Grid */}
        <GlyphMetricsSection
          fontUrlRoman={fontUrlRoman || fontUrl}
          fontUrlItalic={fontUrlItalic || fontUrl}
          fontFamily={fontFamily}
          fontStyle={fontStyle}
          badgeText={badgeText}
          showDropdown={styles.hasItalic}
          hasWeight={styles.hasWeight}
          hasWidth={styles.hasWidth}
          weights={styles.weights || []}
          widths={styles.widths || []}
        />

        {/* Section 5: Character Sets / Glyphs */}
        {/* <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryCharacterSets
              fontFamily={fontFamily}
              showDropdown={styles.hasItalic}
            />
          </div>
        </div> */}

        {/* Image Section 4 */}
        <section className="w-full mt-12 py-16 overflow-hidden">
          <div className="max-w-[1400px] mx-auto aspect-[2/1]">
            <div className="w-full h-full bg-surface-secondary rounded border border-fg-08">
              <img
                src={getPhoto(3)}
                srcSet={getSrcSet(photos[3])}
                sizes="(max-width: 1400px) 100vw, 1400px"
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Section 6: OpenType Features */}
        <div className="my-8">
          <FoundryOpentypeFeatures />
        </div>

        {/* Section 7: Typeface Details */}
        {/* <div className="main-wrapper">
          <div className="">
            <FoundryTypefaceDetails />
          </div>
        </div> */}

        {/* Section 9: Pairings */}
        <FoundryTypefacePairing />

        {/* Section 10: Other Typefaces */}
        <FoundryOtherTypefaces />

        {/* Image Section 5 */}
        <section className="w-full py-16 overflow-hidden">
          <div className="max-w-[1400px] mx-auto aspect-[2/1]">
            <div className="w-full h-full bg-surface-secondary rounded border border-fg-08">
              <img
                src={getPhoto(4)}
                srcSet={getSrcSet(photos[4])}
                sizes="(max-width: 1400px) 100vw, 1400px"
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Section 8: License */}
        <FoundryCTA
          heading="Licence"
          description="TG Málrómur is available for both personal and commercial use. Please review licensing terms before use."
          action={{
            to: '/foundry/licence',
            label: 'Licence details',
            variant: 'secondary'
          }}
        />

        

        

        
      </main>
    </div>
  )
}

export default TypefacePage
