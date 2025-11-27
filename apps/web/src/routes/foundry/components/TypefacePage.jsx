import React, { useState, useEffect, useRef } from 'react'
import { applyTheme, FoundryCTA, getInitialTheme, OverviewHero } from '@kol/ui'
import TypefaceStyleSection from './TypefaceStyleSection'
import FontPreviewSection from './FontPreviewSection'
import VariableFontSection from './VariableFontSection'
import FoundryCharacterSets from './FoundryCharacterSets'
import FoundryOpentypeFeatures from './FoundryOpentypeFeatures'
import FoundryTypefaceDetails from './FoundryTypefaceDetails'
import LicenseSection from './LicenseSection'
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

  // Get photos with fallback to placeholders
  const getPhoto = (index, fallback) => {
    return photos[index] || fallback
  }

  return (
    <div className="min-h-screen bg-surface-primary">
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
          <div className="max-w-[1400px] mx-auto aspect-[16/7]">
            <div className="w-full h-full bg-surface-secondary rounded-[4px]">
              <img
                src={getPhoto(0, '/img/features/card-item-base-6.png')}
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
              />
            </div>
          </div>
        </section>

        {/* Section 1: Styles */}
        <TypefaceStyleSection typeface={typeface} />

        {/* Image Section 2 */}
        <section className="w-full overflow-hidden">
          <div className="max-w-[1400px] mx-auto aspect-[16/9]">
            <div className="w-full h-full bg-surface-secondary rounded-[4px]">
              <img
                src={getPhoto(1, '/img/features/card-item-base-1.png')}
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
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
        <section className="w-full overflow-hidden">
          <div className="max-w-[1400px] mx-auto aspect-[16/9]">
            <div className="w-full h-full bg-surface-secondary rounded-[4px]">
              <img
                src={getPhoto(2, '/img/gemimg/one-2-b.png')}
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
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
        <section className="w-full mt-12 overflow-hidden">
          <div className="max-w-[1400px] mx-auto aspect-[16/9]">
            <div className="w-full h-full bg-surface-secondary rounded-[4px]">
              <img
                src={getPhoto(3, '/img/features/card-item-base-7.png')}
                alt={`${displayName} showcase`}
                className="w-full h-full object-cover rounded-[4px]"
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

        {/* Section 8: License */}
        <LicenseSection />

        {/* Section 9: Pairings */}
        <FoundryTypefacePairing />

        {/* Section 10: Other Typefaces */}
        <FoundryOtherTypefaces />

        
      </main>
    </div>
  )
}

export default TypefacePage
