import { GlyphGrid } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'

const sampleGlyphs = [
  'A', 'Á', 'B', 'C', 'D', 'Ð', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N',
  'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'Þ', 'U', 'Ú', 'V', 'W', 'X', 'Y', 'Ý', 'Z'
]

export default function GlyphGridPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Glyph Grid"
        description="Grid layout of glyph items in a flexible wrap layout."
        details="Composes multiple GlyphItem atoms"
      />

      <DesCard
        name="Glyph Grid"
        description="Character grid display"
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <GlyphGrid glyphs={sampleGlyphs.slice(0, 24)} />
      </div>
    </div>
  )
}
