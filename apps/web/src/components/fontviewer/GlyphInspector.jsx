import { useState } from 'react'
import Extraction from './Extraction'
import { GlyphItem } from '@kol/ui'
import { glyphSets } from '@kol/ui/data'
import defaultFontUrl from '@kol/fontviewer/src/assets/variFont/TGMalromurItalicVF.ttf?url'

/**
 * GlyphInspector - Interactive glyph viewer with metrics
 *
 * Displays a large glyph with full metrics overlay on the left,
 * and a character grid on the right. Clicking/hovering glyphs
 * in the grid updates the main display.
 *
 * @param {Object} props
 * @param {string} props.fontUrl - URL to the font file
 * @param {string} props.fontFamily - Font family name for display
 * @param {string} props.fontStyle - Font style: 'normal' or 'italic'
 * @param {Array<string>} props.glyphs - Array of glyphs to display in grid
 * @param {string} props.initialGlyph - Initial glyph to display
 */
const GlyphInspector = ({
  fontUrl = defaultFontUrl,
  fontFamily = 'TGMalromur',
  fontStyle = 'normal',
  glyphs = glyphSets.lowercase,
  initialGlyph = 'f'
}) => {
  const [selectedGlyph, setSelectedGlyph] = useState(initialGlyph)
  const [hoveredGlyph, setHoveredGlyph] = useState(null)

  // Show hovered glyph if hovering, otherwise show selected
  const displayGlyph = hoveredGlyph || selectedGlyph

  // Get Unicode info for the displayed glyph
  const charCode = displayGlyph.charCodeAt(0)
  const unicodeHex = charCode.toString(16).toUpperCase().padStart(4, '0')
  const unicodeDec = charCode

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Main Layout: Side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left: Glyph Viewer with Metrics */}
        <div className="flex flex-col gap-4">
          <Extraction
            fontUrl={fontUrl}
            glyph={displayGlyph}
            height={628}
            className="bg-surface-secondary rounded-lg border border-default"
          />

          {/* Font Metadata Display */}
          <div className="bg-surface-secondary rounded-lg border border-default p-6">
            <div className="grid grid-cols-2 gap-4 font-mono text-sm">
              <div>
                <div className="text-auto-secondary kol-label-sm mb-1">Glyph</div>
                <div className="text-auto kol-body-md">{displayGlyph}</div>
              </div>
              <div>
                <div className="text-auto-secondary kol-label-sm mb-1">Font Style</div>
                <div className="text-auto kol-body-md">{fontStyle === 'italic' ? 'Italic' : 'Roman'}</div>
              </div>
              <div>
                <div className="text-auto-secondary kol-label-sm mb-1">Unicode (Hex)</div>
                <div className="text-auto kol-body-md">U+{unicodeHex}</div>
              </div>
              <div>
                <div className="text-auto-secondary kol-label-sm mb-1">Unicode (Dec)</div>
                <div className="text-auto kol-body-md">{unicodeDec}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Character Grid */}
        <div className="flex flex-col gap-4">
          <div className="bg-surface-secondary rounded-lg border border-default p-6">
            <h3 className="kol-label-md text-auto-secondary mb-4">Character Set</h3>
            <div
              className="flex flex-wrap gap-4 w-full"
              onMouseLeave={() => setHoveredGlyph(null)}
            >
              {glyphs.map((glyph, index) => (
                <GlyphItem
                  key={index}
                  glyph={glyph}
                  fontStyle={fontStyle}
                  fontFamily={fontFamily}
                  isSelected={glyph === selectedGlyph}
                  onClick={setSelectedGlyph}
                  onMouseEnter={setHoveredGlyph}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlyphInspector
