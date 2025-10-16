import React, { useState, useRef } from 'react'
import HeroSection from '../components/sections/foundry/HeroSection'
import ImageSection from '../components/sections/foundry/ImageSection'
import StylesSection from '../components/sections/foundry/StylesSection'
import FontPreviewSection from '../components/sections/foundry/FontPreviewSection'
import VariableFontSection from '../components/sections/foundry/VariableFontSection'
import GlyphsSection from '../components/sections/foundry/GlyphsSection'
import FeaturesSection from '../components/sections/foundry/FeaturesSection'
import DownloadSection from '../components/sections/foundry/DownloadSection'
import LicenseSection from '../components/sections/foundry/LicenseSection'
import CtaFoundry from '../components/sections/cta/CtaFoundry'
import CarouselSection from '../components/sections/foundry/CarouselSection'
import PairingsSection from '../components/sections/foundry/PairingsSection'

export default function Foundry() {
  const [weightValue, setWeightValue] = useState(400)
  const [fontPreviewSize, setFontPreviewSize] = useState(null)
  const variableTextRef = useRef(null)

  const handleWeightChange = (e) => {
    const weight = e.target.value
    setWeightValue(weight)
    if (variableTextRef.current) {
      variableTextRef.current.style.fontWeight = weight
    }
  }

  return (
    <div className="pagePadding pb-8 flex flex-col gap-6 md:gap-8" style={{ backgroundColor: 'var(--surface-primary)', color: 'var(--foreground)' }}>
      <HeroSection
        tag="Variable Font"
        title="Málrómur"
        message="A contemporary italic variable font for editorial design"
        subtext="Free for personal and commercial use"
      />
      <ImageSection src="/img/tgm/hero.png" alt="TG Málrómur showcase" useClampedRadius={true} />
      <StylesSection />

      <ImageSection
        images={[
          { src: "/img/gemimg/one-1.png", alt: "Typography in context", objectFit: "cover" },
          { src: "/img/tgm/TGM-8.png", alt: "Typography in context", className: "" }
        ]}
      />

      <FontPreviewSection
        previews={[
          {
            initialSize: 96,
            disableAutoSize: true,
            fontPreviewSize,
            setFontPreviewSize,
            initialLineHeight: 100,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            colSpan: 2,
            cardClassName: "foundryCard foundryCardPadded foundryCardInverted",
            bgOpacity: 10,
            textClassName: "text-absolute-black",
            fontStyle: "italic"
          },
          {
            initialSize: 64,
            disableAutoSize: true,
            initialLineHeight: 110,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            colSpan: 2,
            cardClassName: "foundryCard foundryCardPadded foundryCardInverted",
            bgOpacity: 10,
            textClassName: "text-absolute-black",
            fontStyle: "italic"
          },
          {
            initialSize: 48,
            disableAutoSize: true,
            initialLineHeight: 120,
            compactOnDesktop: true,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            colSpan: 1,
            cardClassName: "foundryCard foundryCardPadded foundryCardInverted",
            bgOpacity: 10,
            textClassName: "text-absolute-black",
            fontStyle: "italic"
          },
          {
            initialSize: 24,
            disableAutoSize: true,
            initialLineHeight: 140,
            compactOnDesktop: true,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            colSpan: 1,
            cardClassName: "foundryCard foundryCardPadded foundryCardInverted",
            bgOpacity: 10,
            textClassName: "text-absolute-black",
            fontStyle: "italic"
          }
        ]}
      />

      <ImageSection src="/img/tgm/TGM-3.png" alt="Design application" />
      <VariableFontSection
        weightValue={weightValue}
        handleWeightChange={handleWeightChange}
        variableTextRef={variableTextRef}
      />
      <GlyphsSection bgOpacity={10} />
      <ImageSection src="/img/tgm/TGM-4.png" alt="Usage examples" />
      <FeaturesSection />
      <ImageSection src="/img/tgm/TGM-5.png" alt="Brand applications" />
      <DownloadSection />
      <LicenseSection />
      <CtaFoundry />
      <CarouselSection />
      <PairingsSection />
    </div>
  )
}
