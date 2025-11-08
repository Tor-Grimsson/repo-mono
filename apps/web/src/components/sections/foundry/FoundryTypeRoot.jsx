import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@kol/ui'
import CursorTrail from '../../overlay/CursorTrail'
import Navbar from '../../layout/Navbar'
import { applyTheme, getInitialTheme } from '@kol/ui'
import FoundryHeroRoot from './FoundryHeroRoot'
import { ImageSection } from '@kol/ui'
import FoundryStyleSectionRoot from './FoundryStyleSectionRoot'
import FontPreviewSectionRoot from './FontPreviewSectionRoot'
import VariableFontSectionRoot from './VariableFontSectionRoot'
import FoundryCharacterSetsRoot from './FoundryCharacterSetsRoot'
import FoundryOpentypeFeaturesRoot from './FoundryOpentypeFeaturesRoot'
import FoundryTypefaceDetailsRoot from './FoundryTypefaceDetailsRoot'
import LicenseSectionRoot from './LicenseSectionRoot'
import FoundryTypefacePairingRoot from './FoundryTypefacePairingRoot'


const FoundryTypeRoot = () => {
  const [weightValue, setWeightValue] = useState(400)
  const [currentGlyphSet, setCurrentGlyphSet] = useState('uppercase')
  const [fontPreviewSize, setFontPreviewSize] = useState(null)
  const variableTextRef = useRef(null)
  const glyphsGridRef = useRef(null)

  const handleWeightChange = (e) => {
    const weight = e.target.value
    setWeightValue(weight)
    if (variableTextRef.current) {
      variableTextRef.current.style.fontWeight = weight
    }
  }

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

  return (
    <div className="min-h-screen bg-surface-primary">
      <main className="w-full">
        {/* Hero Section */}
        <FoundryHeroRoot />

        {/* Full Screen Image */}
        <section className="w-full h-[800px] px-8 overflow-hidden">
          <div className="w-full h-full bg-surface-secondary rounded-[4px]">
            <img
              src="/img/features/card-item-base-6.png"
              alt="Root showcase"
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 1: Styles */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryStyleSectionRoot />
          </div>
        </div>

        {/* Image Section 2 */}
        <section className="w-full h-[800px] px-8 overflow-hidden">
          <div className="w-full h-full bg-surface-secondary rounded-[4px]">
            <img
              src="/img/features/card-item-base-1.png"
              alt="Root showcase"
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 2: Font Preview */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FontPreviewSectionRoot />
          </div>
        </div>

        {/* Image Section 3 */}
        <section className="w-full h-[800px] px-8 overflow-hidden">
          <div className="w-full h-full bg-surface-secondary rounded-[4px]">
            <img
              src="/img/gemimg/one-2.png"
              alt="Root showcase"
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 3: Variable Font */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <VariableFontSectionRoot />
          </div>
        </div>

        {/* Section 4: Character Sets / Glyphs */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryCharacterSetsRoot />
          </div>
        </div>

        {/* Image Section 4 */}
        <section className="w-full h-[800px] px-8 overflow-hidden">
          <div className="w-full h-full bg-surface-secondary rounded-[4px]">
            <img
              src="/img/features/card-item-base-7.png"
              alt="Root showcase"
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 5: OpenType Features */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryOpentypeFeaturesRoot />
          </div>
        </div>

        {/* Section 6: Typeface Details */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryTypefaceDetailsRoot />
          </div>
        </div>

        {/* Section 7: License */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <LicenseSectionRoot />
          </div>
        </div>

        {/* Section 8: Pairings */}
        <div className="main-wrapper">
          <div className="card-wrapper">
            <FoundryTypefacePairingRoot />
          </div>
        </div>
      </main>
    </div>
  )
}

export default FoundryTypeRoot
