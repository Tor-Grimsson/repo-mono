import React, { useState, useEffect, useRef } from 'react'
import { applyTheme, FoundryCTA, getInitialTheme, Button } from '@kol/ui'
import { Link } from 'react-router-dom'
import FullBleedHero from '../../../components/sections/shared/FullBleedHero'

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
        {/* Full-bleed Hero */}
        <div className="mt-14 md:mt-16">
          <FullBleedHero
            image={getPhoto(0)}
            srcSet={getSrcSet(photos[0])}
            alt={`${displayName} showcase`}
            imageOpacity={100}
          >
            <div className="flex flex-col items-center text-center gap-4 md:gap-6 px-4 md:px-6 py-6 md:py-8 rounded-[2px]" style={{ backgroundColor: 'color-mix(in srgb, var(--kol-surface-primary) 80%, transparent)', backdropFilter: 'blur(1px)' }}>
              <span
                className={`${(displayName === 'Málrómur' || displayName === 'Tröllatunga') ? 'text-[48px] sm:text-[64px] md:text-[88px] lg:text-[120px]' : 'text-[56px] sm:text-[80px] md:text-[110px] lg:text-[144px]'} block text-auto leading-none ${fontStyle === 'italic' ? 'italic' : ''}`.trim()}
                style={{ fontFamily, fontStyle: fontStyle || 'normal', fontWeight: 400 }}
              >
                {displayName}
              </span>
              <span className="kol-mono-xs text-fg-64">{category}</span>
              <p className="kol-mono-xs text-auto max-w-[480px] md:max-w-[600px]">{description}</p>
              <Link to="/foundry/licensing">
                <Button variant="primary" size="sm">Download Font</Button>
              </Link>
            </div>
          </FullBleedHero>
        </div>

        <div className="breakpoint-padding">
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
            availableWeights={(styles.weights || []).map(w => w.label)}
            initialWeight={(styles.weights || [])[0]?.label || 'Regular'}
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
              to: '/foundry/licensing',
              label: 'Licence details',
              variant: 'primary'
            }}
          />
        </div>
      </main>
    </div>
  )
}

export default TypefacePage
