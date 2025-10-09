import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@kol/ui'
import CursorTrail from './CursorTrail'
import Navbar from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import ImageSection from './sections/ImageSection'
import StylesSection from './sections/StylesSection'
import FontPreviewSection from './sections/FontPreviewSection'
import VariableFontSection from './sections/VariableFontSection'
import GlyphsSection from './sections/GlyphsSection'
import FeaturesSection from './sections/FeaturesSection'
import DownloadSection from './sections/DownloadSection'
import LicenseSection from './sections/LicenseSection'
import CTASection from './sections/CTASection'
import CarouselSection from './sections/CarouselSection'
import PairingsSection from './sections/PairingsSection'
import Footer from './sections/Footer'


const FoundryType = () => {
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

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <div className="min-h-screen transition-colors" style={{ backgroundColor: 'var(--color-bg-primary)', cursor: 'none' }}>
      <CursorTrail />
      <Container className="max-w-[1688px] mx-auto">
        {/* Section 1: Navbar */}
        <Navbar onToggleTheme={toggleTheme} />

        {/* Section 2: Hero */}
        <HeroSection
          tag="New Release"
          title="Málrómur"
          message="An elegant italic typeface with<br/>flowing curves and refined character"
          subtext="Available in multiple weights and styles"
          titleClassName="text-[80px] leading-[0.8]"
          messageClassName="text-[28px]"
        />

        {/* 3 Málrómur reykjandi stelpa 3: Image */}
        <ImageSection src="/img/tgm/hero.png" alt="TG Málrómur showcase" />

        {/* Available styles 4: Styles */}
        <StylesSection />

        {/* Section 5: Image */}
        <div className="w-full h-auto flex flex-col md:flex-row lg:flex-row gap-4 items-start">
          <div className="w-full md:w-1/2 lg:w-1/2 aspect-[4/5]">
            <ImageSection src="/img/tgm/TGM-2.png" alt="Typography in context" className="" />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 aspect-[4/5]">
            <ImageSection src="/img/tgm/TGM-2.png" alt="Typography in context" className="" />
          </div>
        </div>

        {/* Section 6: FPS GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 my-6 md:my-10 h-auto md:h-[150vh]">
          <div className="col-span-1 md:col-span-2 h-[72vh] md:h-[55vh]">
            <FontPreviewSection onFontSizeChange={setFontPreviewSize} />
          </div>
          <div className="col-span-1 md:col-span-2 h-[60vh] md:h-[45vh]">
            <FontPreviewSection />
          </div>
          <div className="col-span-1 h-[58vh] md:h-[40vh]">
            <FontPreviewSection />
          </div>
          <div className="col-span-1 h-[55vh] md:h-[35vh]">
            <FontPreviewSection />
          </div>
        </div>

        {/* Section 7: Image */}
        <ImageSection src="/img/tgm/TGM-3.png" alt="Design application" />

        {/* Section 8: Variable Font */}
        <VariableFontSection />

        {/* Section 9: Glyphs */}
        <GlyphsSection
          currentGlyphSet={currentGlyphSet}
          onGlyphSetChange={handleGlyphSetChange}
          glyphsGridRef={glyphsGridRef}
        />

        {/* Section 10: Image */}
        <ImageSection src="/img/tgm/TGM-4.png" alt="Usage examples" />

        {/* Section 11: Features */}
        <FeaturesSection />

        {/* Section 12: Image */}
        <ImageSection src="/img/tgm/TGM-5.png" alt="Brand applications" />

        {/* Section 13: Download */}
        <DownloadSection />

        {/* Section 14: License */}
        <LicenseSection />

        {/* Section 15: CTA */}
        <CTASection />

        {/* Section 16: Carousel */}
        <CarouselSection />

        {/* Section 17: Pairings */}
        <PairingsSection />
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default FoundryType
