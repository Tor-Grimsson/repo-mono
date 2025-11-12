import React, { useState, useEffect, useRef } from 'react'
import { applyTheme, getInitialTheme } from '@kol/ui'
import TypefaceHero from './TypefaceHero'
import TypefaceStyleSection from './TypefaceStyleSection'
import FontPreviewSection from './FontPreviewSection'
import VariableFontSection from './VariableFontSection'
import FoundryCharacterSets from './FoundryCharacterSets'
import FoundryOpentypeFeatures from './FoundryOpentypeFeatures'
import FoundryTypefaceDetails from './FoundryTypefaceDetails'
import LicenseSection from './LicenseSection'
import FoundryTypefacePairing from './FoundryTypefacePairing'
import FoundryOtherTypefaces from './FoundryOtherTypefaces'
import GlyphMetricsGrid from '../../fontviewer/GlyphMetricsGrid'

/**
 * Unified Typeface Page Component
 *
 * Replaces all individual FoundryType*.jsx components
 * with a single data-driven page layout
 *
 * @param {object} typeface - Typeface configuration object from typefaceConfig
 */
const TypefacePage = ({ typeface }) => {
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
    fontStyle,
    badgeText,
    styles
  } = typeface

  // Determine if variable font sections should be shown
  const showVariableSection = styles.hasWeight || styles.hasWidth

  return (
    <div className="min-h-screen bg-surface-primary">
      <main className="w-full">
        {/* Hero Section */}
        <TypefaceHero typeface={typeface} />

        {/* Full Screen Image 1 */}
        <section className="w-full h-[800px] px-8 overflow-hidden">
          <div className="w-full h-full bg-surface-secondary rounded-[4px]">
            <img
              src="/img/features/card-item-base-6.png"
              alt={`${displayName} showcase`}
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 1: Styles */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <TypefaceStyleSection typeface={typeface} />
          </div>
        </div>

        {/* Image Section 2 */}
        <section className="w-full h-[800px] px-8 overflow-hidden">
          <div className="w-full h-full bg-surface-secondary rounded-[4px]">
            <img
              src="/img/features/card-item-base-1.png"
              alt={`${displayName} showcase`}
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 2: Font Preview */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FontPreviewSection
              fontFamily={fontFamily}
              badgeText={badgeText}
              showDropdown={styles.hasItalic}
            />
          </div>
        </div>

        {/* Image Section 3 */}
        <section className="w-full h-[800px] px-8 overflow-hidden">
          <div className="w-full h-full bg-surface-secondary rounded-[4px]">
            <img
              src="/img/gemimg/one-2-b.png"
              alt={`${displayName} showcase`}
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 3: Variable Font (only for variable fonts) */}
        {showVariableSection && (
          <div className="main-wrapper">
            <div className="card-wrapper">
              <VariableFontSection
                fontFamily={fontFamily}
                badgeText={badgeText}
                showDropdown={styles.hasItalic}
              />
            </div>
          </div>
        )}

        {/* Section 4: Glyph Metrics Grid */}
        <div className="main-wrapper">
          <div className="w-full flex justify-center py-16">
            <GlyphMetricsGrid
              fontUrl={fontUrl}
              fontFamily={fontFamily}
              fontStyle={fontStyle}
            />
          </div>
        </div>

        {/* Section 5: Character Sets / Glyphs */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryCharacterSets
              fontFamily={fontFamily}
              showDropdown={styles.hasItalic}
            />
          </div>
        </div>

        {/* Image Section 4 */}
        <section className="w-full h-[800px] px-8 overflow-hidden">
          <div className="w-full h-full bg-surface-secondary rounded-[4px]">
            <img
              src="/img/features/card-item-base-7.png"
              alt={`${displayName} showcase`}
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 6: OpenType Features */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryOpentypeFeatures />
          </div>
        </div>

        {/* Section 7: Typeface Details */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryTypefaceDetails />
          </div>
        </div>

        {/* Section 8: License */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <LicenseSection />
          </div>
        </div>

        {/* Section 9: Pairings */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryTypefacePairing />
          </div>
        </div>

        {/* Section 10: Other Typefaces */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryOtherTypefaces />
          </div>
        </div>
      </main>
    </div>
  )
}

export default TypefacePage
