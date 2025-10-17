import DesCard from './DesCard'
import SurfacePreviewGrid from './SurfacePreviewGrid'

const sampleText = {
  display: 'KOLKRABBI DISPLAY',
  section: 'KOLKRABBI SECTION',
  'section-small': 'KOLKRABBI SECTION SMALL',
  subsection: 'KOLKRABBI SUBSECTION',
  'heading-xl': 'Kolkrabbi Heading XL',
  'heading-lg': 'Kolkrabbi Heading LG',
  'heading-md': 'Kolkrabbi Heading MD',
  'heading-sm': 'KOLKRABBI HEADING SM',
  'text-lg': 'Larger text for introductory paragraphs and feature copy.',
  text: 'Text copy demonstrates spacing and legibility.',
  'text-sm': 'Supporting copy with smaller size.',
  'body-lg': 'Feature paragraphs with comfortable reading size.',
  'mono-text': 'Monospace text for technical content.',
  'mono-text-label': 'MONO TEXT LABEL',
  mono: 'Compact mono details',
  'mono-xs': 'Monospace metadata text',
  'mono-xxs': 'Ultra-small mono',
  label: 'UI LABEL',
  'label-compact': 'SECTION LABEL TEXT'
}

const resolveFontFamily = (fontKey) => {
  switch (fontKey) {
    case 'RightGrotesk':
      return 'var(--kol-font-family-rgrot-tight)'
    case 'RightGroteskMono':
      return 'var(--kol-font-family-mono)'
    case 'Inter Tight':
      return 'var(--kol-font-family-body)'
    default:
      return 'inherit'
  }
}

const TypeSample = ({ className, label, usage, font, id, breakpoints = [] }) => {
  const renderPreview = () => (
    <div className="space-y-4">
      {breakpoints.map((bp, index) => (
        <div key={index} className="space-y-2">
          <div
            className="text-auto"
            style={{
              fontFamily: resolveFontFamily(bp.fontFamily),
              fontSize: bp.size,
              lineHeight: bp.lineHeight,
              textTransform: bp.textTransform || 'none',
              letterSpacing: bp.letterSpacing || 'normal',
              fontWeight: bp.fontWeight || 'normal',
              opacity: bp.preview ? 0.6 : 1
            }}
          >
            {sampleText[id] ?? sampleText.text}
          </div>
          <div className="kol-mono text-[11px] opacity-60">
            size: {bp.size.replace('px', '')} | lead: {bp.lineHeight.replace('%', '')} | {bp.fontFamily.replace('RightGrotesk', '').replace('Inter ', '')}
            {bp.preview && <span className="ml-2 opacity-40">(preview)</span>}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      <DesCard
        name={label}
        description={usage}
        code={`class: ${className}${font ? ` • ${font}` : ''}`}
      />

      <SurfacePreviewGrid layout="stacked">
        <SurfacePreviewGrid.Surface label="Default surface">
          {renderPreview()}
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>

      {breakpoints.length > 0 && (
        <div className="grid grid-cols-1 gap-4 border-t border-auto pt-4 text-auto md:grid-cols-3">
          {breakpoints.map((bp, index) => (
            <div key={index} className="space-y-1">
              <div className="kol-mono text-xs font-medium">
                {index + 1}.{index + 1} {bp.name}{bp.range ? ` (${bp.range})` : ''}
              </div>
              <div className="kol-mono text-[11px] opacity-70 space-y-0.5 pl-3">
                <div>• Size: {bp.size}</div>
                <div>• Tailwind: {bp.tailwind}</div>
                <div>• Line Height: {bp.lineHeight}</div>
                <div>• Font Family: {bp.fontFamily}</div>
                {bp.textTransform && <div>• Case: {bp.textTransform}</div>}
                {bp.letterSpacing && <div>• Tracking: {bp.letterSpacing}</div>}
                {bp.fontWeight && <div>• Weight: {bp.fontWeight}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TypeSample
