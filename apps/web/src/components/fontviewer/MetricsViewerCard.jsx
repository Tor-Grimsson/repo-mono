import { useState } from 'react'
import Extraction from './Extraction'
import { GlyphItem } from '@kol/ui'
import { glyphSets } from '@kol/ui/data'
import defaultFontUrl from '@kol/fontviewer/src/assets/variFont/TGMalromurItalicVF.ttf?url'

/**
 * MetricsViewerCard - Interactive glyph metrics viewer
 *
 * A side-by-side layout with large glyph + metrics on the left
 * and a character grid on the right. Click/hover to update.
 *
 * @component
 * @param {Object} props
 * @param {string} props.fontUrl - URL to the font file
 * @param {string} props.fontFamily - Font family name for display
 * @param {string} props.fontStyle - Font style: 'normal' or 'italic'
 * @param {Array<string>} props.glyphs - Array of glyphs to display in grid
 * @param {string} props.initialGlyph - Initial glyph to display
 * @param {string} props.title - Optional title for the card
 * @param {string} props.description - Optional description text
 *
 * @example
 * ```jsx
 * <MetricsViewerCard
 *   fontUrl={malromurFont}
 *   fontFamily="TGMalromur"
 *   fontStyle="italic"
 *   glyphs={glyphSets.lowercase}
 *   initialGlyph="f"
 *   title="View Metrics Live"
 *   description="Click any character to inspect its font metrics"
 * />
 * ```
 */
const MetricsViewerCard = ({
  fontUrl = defaultFontUrl,
  fontFamily = 'TGMalromur',
  fontStyle = 'normal',
  glyphs = glyphSets.lowercase,
  initialGlyph = 'f',
  title = 'Font Metrics Inspector',
  description = 'Click any character to view its metrics in real-time'
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
    <div className="w-full bg-surface-secondary p-8 lg:p-12 rounded-sm">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h3 className="kol-heading-sm text-auto">{title}</h3>
          <p className="kol-text-md text-fg-64 max-w-[600px]">{description}</p>
        </div>

        {/* Main Layout: Side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: Glyph Viewer with Metrics */}
          <div className="flex flex-col gap-4">
            <Extraction
              fontUrl={fontUrl}
              glyph={displayGlyph}
              height={400}
              className="bg-surface-secondary rounded-sm border border-default"
            />

            {/* Font Metadata Display */}
            <div className="bg-surface-secondary rounded-sm border border-default p-6">
              <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                <div>
                  <div className="text-auto-secondary kol-label-sm mb-1">Glyph</div>
                  <div className="text-auto kol-text-md">{displayGlyph}</div>
                </div>
                <div>
                  <div className="text-auto-secondary kol-label-sm mb-1">Font Style</div>
                  <div className="text-auto kol-text-md">{fontStyle === 'italic' ? 'Italic' : 'Roman'}</div>
                </div>
                <div>
                  <div className="text-auto-secondary kol-label-sm mb-1">Unicode (Hex)</div>
                  <div className="text-auto kol-text-md">U+{unicodeHex}</div>
                </div>
                <div>
                  <div className="text-auto-secondary kol-label-sm mb-1">Unicode (Dec)</div>
                  <div className="text-auto kol-text-md">{unicodeDec}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Character Grid */}
          <div className="flex flex-col gap-4">
            <div className="bg-surface-secondary rounded-sm border border-default p-6">
              <h4 className="kol-label-md text-auto-secondary mb-4">Character Set</h4>
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
    </div>
  )
}

export default MetricsViewerCard
