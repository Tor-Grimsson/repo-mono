import AnimatedTitle from '../../animation/AnimatedTitle'
import AnimatedTitleStory from '../../animation/AnimatedTitleStory'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

const AnimatedTitlePreview = () => {
  const renderTitle = (Component) => (
    <div className="space-y-6">
      <div className="kol-mono-xs opacity-60 uppercase">Scroll to trigger animation</div>
      <Component title="This is an <br /> animated title" containerClass="kol-heading-xl" />
    </div>
  )

  return (
    <div className="space-y-8">
      <DesSection
        name="Animated Titles"
        description="GSAP-powered headline animations used in About and Story sections."
      />

      <div className="space-y-8">
        <div className="space-y-4">
          <DesCard
            name="Animated Title (About)"
            description="3D rotation with staggered word reveal controlled by scroll position."
          />

          <SurfacePreviewGrid>
            <SurfacePreviewGrid.Surface label="Default surface">
              <div className="space-y-6" style={{ minHeight: '320px' }}>
                {renderTitle(AnimatedTitle)}
              </div>
            </SurfacePreviewGrid.Surface>
            <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
              <div className="space-y-6" style={{ minHeight: '320px' }}>
                {renderTitle(AnimatedTitle)}
              </div>
            </SurfacePreviewGrid.Surface>
          </SurfacePreviewGrid>

          <details className="kol-mono-xs opacity-60">
            <summary className="cursor-pointer hover:opacity-100">View Implementation</summary>
            <div className="mt-4 space-y-4">
              <div>
                <div className="font-semibold mb-2">Usage:</div>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-black bg-opacity-5 p-4">
{`import AnimatedTitle from '@/components/animation/AnimatedTitle'

<AnimatedTitle
  title="This is an <br /> animated title"
  containerClass="kol-heading-xl"
  style={{ mixBlendMode: 'difference' }}
  lineClass="custom-line-class"
/>`}
                </pre>
              </div>
              <div>
                <div className="font-semibold mb-2">Animation Details:</div>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-black bg-opacity-5 p-4">
{`// Initial State
opacity: 0
x: 150vw
y: 50
rotateY: -45deg
rotateX: 15deg

// Animated State
opacity: 1
x: 0
y: 0
rotateY: 0
rotateX: 0
stagger: 0.02s per word

// Scroll Trigger
start: 100px from bottom
end: center bottom
toggleActions: play/reverse`}
                </pre>
              </div>
            </div>
          </details>
        </div>

        <div className="space-y-4">
          <DesCard
            name="Animated Title (Story)"
            description="Centered alignment variant with responsive flex behaviour for story sections."
          />

          <SurfacePreviewGrid>
            <SurfacePreviewGrid.Surface label="Default surface">
              <div className="space-y-6" style={{ minHeight: '320px' }}>
                {renderTitle(AnimatedTitleStory)}
              </div>
            </SurfacePreviewGrid.Surface>
            <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
              <div className="space-y-6" style={{ minHeight: '320px' }}>
                {renderTitle(AnimatedTitleStory)}
              </div>
            </SurfacePreviewGrid.Surface>
          </SurfacePreviewGrid>

          <details className="kol-mono-xs opacity-60">
            <summary className="cursor-pointer hover:opacity-100">View Differences</summary>
            <div className="mt-4 space-y-4">
              <div className="font-semibold">Key Differences from AnimatedTitle:</div>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-black bg-opacity-5 p-4">
{`// AnimatedTitle:
className="flexCenter flex-wrap"

// AnimatedTitleStory:
className="flex justify-center items-center lg:justify-start lg:items-start flex-wrap"

// Behaviour
- Mobile/Tablet: Centered alignment
- Desktop (lg+): Left-aligned for story sections`}
              </pre>
            </div>
          </details>
        </div>
      </div>

      <div className="kol-mono-xs italic opacity-40">
        These components power the animated headlines on the home page Story section.
      </div>
    </div>
  )
}

export default AnimatedTitlePreview
