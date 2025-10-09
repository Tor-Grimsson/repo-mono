import { useState } from 'react'
import { Button, Dropdown } from '@kol/ui'
import GlyphGrid from '../foundry-atoms/GlyphGrid'

const GlyphsSection = ({ bgOpacity = 40 }) => {
  const [currentTextStyle, setCurrentTextStyle] = useState('regular')

  const glyphSets = {
    uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    punctuation: ['.', ',', '!', '?', ';', ':', '"', "'", '-', '—', '(', ')', '[', ']', '{', '}', '&', '@', '#', '$', '%'],
    latin1: ['À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø'],
    latinExtended: ['Ā', 'Ă', 'Ą', 'Ć', 'Ĉ', 'Ċ', 'Č', 'Ď', 'Đ', 'Ē', 'Ĕ', 'Ė', 'Ę', 'Ě', 'Ĝ', 'Ğ', 'Ġ', 'Ģ', 'Ĥ', 'Ħ', 'Ĩ', 'Ī', 'Ĭ', 'Į']
  }

  const textStyleOptions = [
    { label: 'Regular', value: 'regular' },
    { label: 'Italic', value: 'italic' },
    { label: 'Bold', value: 'bold' },
    { label: 'Bold Italic', value: 'bold-italic' }
  ]

  const handleTextStyleChange = (styleName) => {
    setCurrentTextStyle(styleName)
  }

  return (
    <div
      className="foundryCard foundryCardPadded foundryCardInverted w-full flex flex-col gap-12"
      style={{
        backgroundColor: (() => {
          const isDarkMode = typeof document !== 'undefined' &&
            (document.documentElement.classList.contains('dark') ||
             document.documentElement.getAttribute('data-theme') === 'dark')
          return isDarkMode ? `rgba(255, 255, 255, ${bgOpacity / 100})` : `rgba(0, 0, 0, ${bgOpacity / 100})`
        })()
      }}
    >
      {/* Header with Character Set badge and Text Style dropdown */}
      <div className="w-full flex flex-row items-center justify-between gap-3">
        <Button
          variant="primary"
          className="!bg-[var(--color-accent)] !text-[var(--color-brand-dark)] !border-0 rounded-full !px-6 !py-2 text-control !font-normal whitespace-nowrap w-fit min-h-[44px] flex items-center"
        >
          Character Set
        </Button>
        <Dropdown
          options={textStyleOptions}
          value={currentTextStyle}
          onChange={handleTextStyleChange}
          className="min-w-[180px]"
        />
      </div>

      {/* Uppercase */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="kol-label" style={{ color: 'var(--color-text-primary)' }}>Uppercase</h3>
        <GlyphGrid glyphs={glyphSets.uppercase} />
      </div>

      {/* Lowercase */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="kol-label" style={{ color: 'var(--color-text-primary)' }}>Lowercase</h3>
        <GlyphGrid glyphs={glyphSets.lowercase} />
      </div>

      {/* Numbers */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="kol-label" style={{ color: 'var(--color-text-primary)' }}>Numbers</h3>
        <GlyphGrid glyphs={glyphSets.numbers} />
      </div>

      {/* Punctuation & Symbols */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="kol-label" style={{ color: 'var(--color-text-primary)' }}>Punctuation & Symbols</h3>
        <GlyphGrid glyphs={glyphSets.punctuation} />
      </div>

      {/* Latin-1 Supported */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="kol-label" style={{ color: 'var(--color-text-primary)' }}>Latin-1 Supported</h3>
        <GlyphGrid glyphs={glyphSets.latin1} />
      </div>

      {/* Latin Extended */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="kol-label" style={{ color: 'var(--color-text-primary)' }}>Latin Extended</h3>
        <GlyphGrid glyphs={glyphSets.latinExtended} />
      </div>
    </div>
  )
}

export default GlyphsSection
