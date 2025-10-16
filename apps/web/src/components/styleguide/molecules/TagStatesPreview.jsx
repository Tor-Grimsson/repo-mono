import DesSection from './DesSection'
import DesCard from './DesCard'
import SurfacePreviewGrid from './SurfacePreviewGrid'

const breakpoints = [
  { id: 'mobile', label: 'Mobile', fontSize: '10px', padding: '4px 16px' },
  { id: 'tablet', label: 'Tablet', fontSize: '10px', padding: '4px 16px' },
  { id: 'desktop', label: 'Desktop', fontSize: '10px', padding: '4px 16px' }
]

const interactiveVariants = [
  { id: 'tag-control', label: 'Tag Control', className: 'tag-control' },
  { id: 'tag-control-inverse', label: 'Tag Control Inverse', className: 'tag-control-inverse' }
]

const pillVariants = [
  { id: 'pill-inverse', label: 'Pill Inverse', className: 'pill-inverse' },
  { id: 'pill-outline', label: 'Pill Outline', className: 'pill-outline' },
  { id: 'pill-subtle', label: 'Pill Subtle', className: 'pill-subtle' }
]

const renderBreakpointStack = (variant) => (
  <div className="space-y-3" key={variant.id}>
    <div className="kol-mono-xs uppercase">{variant.label}</div>
    <div className="grid grid-cols-1 gap-4">
      {breakpoints.map((bp) => (
        <div key={`${variant.id}-${bp.id}`} className="space-y-2">
          <div className="kol-mono-xs opacity-60">{bp.label}</div>
          <span
            className={variant.className}
            style={{
              fontSize: bp.fontSize,
              padding: bp.padding
            }}
          >
            Tag
          </span>
        </div>
      ))}
    </div>
  </div>
)

export default function TagStatesPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Tags & Pills"
        description="Interactive tag controls and static pill styles rendered across responsive typography scales."
        details="Typography: kol-mono-text • Fixed padding 4×16 at all breakpoints. Use pills so they match the defined atom showcase."
      />

      <div className="space-y-8">
        <div className="space-y-4">
          <DesCard
            name="Interactive Tags"
            description="tag-control classes with hover states, tuned for control surfaces."
            details="Use tag-control on default surfaces, tag-control-inverse when nested inside inverse surfaces."
          />

          <SurfacePreviewGrid>
            <SurfacePreviewGrid.Surface label="Default surface">
              <div className="space-y-6">
                {interactiveVariants.map(renderBreakpointStack)}
              </div>
            </SurfacePreviewGrid.Surface>
            <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
              <div className="space-y-6">
                {interactiveVariants.map(renderBreakpointStack)}
              </div>
            </SurfacePreviewGrid.Surface>
          </SurfacePreviewGrid>
        </div>

        <div className="space-y-4">
          <DesCard
            name="Static Pills"
            description="Non-interactive pill styles for metadata labels and badges."
            details="Use pill-subtle on inverse treatments; pill-outline maintains border contrast across modes. All pills follow fixed 4×16 padding and kol-mono-xs typography."
          />

          <SurfacePreviewGrid>
            <SurfacePreviewGrid.Surface label="Default surface">
              <div className="space-y-6">
                {pillVariants.filter(variant => variant.id !== 'pill-subtle').map(renderBreakpointStack)}
              </div>
            </SurfacePreviewGrid.Surface>
            <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
              <div className="space-y-6">
                {pillVariants.map(renderBreakpointStack)}
              </div>
            </SurfacePreviewGrid.Surface>
          </SurfacePreviewGrid>
        </div>
      </div>
    </div>
  )
}
