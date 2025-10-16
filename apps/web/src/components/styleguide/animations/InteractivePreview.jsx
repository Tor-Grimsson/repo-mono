import TiltingImageCard from '../../animation/TiltingImageCard'
import InteractiveImage from '../../media/InteractiveImage'
import MagnetLines from '../../react-bits/MagnetLines'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'

const InteractivePreview = () => {
  return (
    <div className="space-y-8">
      <DesSection
        name="Interactive Animations"
        description="Cursor-aware experiences used across the site for motion-rich storytelling."
      />

      <div className="space-y-6">
        <DesCard
          name="Magnet Lines"
          description="Interactive grid of lines rotating toward cursor position."
          details="Component: apps/web/src/components/react-bits/MagnetLines.jsx"
        />

        <div
          className="rounded-2xl border border-auto bg-auto p-6"
          style={{ minHeight: '360px' }}
        >
          <div className="flex h-full items-center justify-center overflow-hidden">
            <MagnetLines
              rows={9}
              columns={9}
              containerSize="350px"
              lineColor="var(--component-fg)"
              lineWidth="4px"
              lineHeight="24px"
              baseAngle={-10}
            />
          </div>
        </div>

        <details className="kol-mono-xs opacity-60">
          <summary className="cursor-pointer hover:opacity-100">View Implementation</summary>
          <div className="mt-4 space-y-4">
            <div className="font-semibold">Features:</div>
            <ul className="list-disc list-inside space-y-1 opacity-80">
              <li>Grid-based layout with customizable rows and columns</li>
              <li>Pointer-following rotation calculated via trigonometry</li>
              <li>CSS custom property <code>--rotate</code> drives transforms</li>
              <li>Global pointermove listener for smooth updates</li>
            </ul>
            <div>
              <div className="font-semibold mb-2">Usage:</div>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-black bg-opacity-5 p-4">
{`import MagnetLines from '@/components/react-bits/MagnetLines'

<MagnetLines
  rows={9}
  columns={9}
  containerSize="80vmin"
  lineColor="#efefef"
  lineWidth="1vmin"
  lineHeight="6vmin"
  baseAngle={-10}
/>`}
              </pre>
            </div>
          </div>
        </details>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <DesCard
            name="Tilting Image Card"
            description="3D tilting image card with cursor-following mask overlay."
            details="Component: apps/web/src/components/animation/TiltingImageCard.jsx"
          />

          <div className="rounded-2xl border border-auto bg-auto p-2" style={{ height: '320px' }}>
            <TiltingImageCard imageUrl="/img/Kolk-img/trollatunga-2.png" />
          </div>

          <details className="kol-mono-xs opacity-60">
            <summary className="cursor-pointer hover:opacity-100">View Implementation</summary>
            <div className="mt-4 space-y-4">
              <div className="font-semibold">Features:</div>
              <ul className="list-disc list-inside space-y-1 opacity-80">
                <li>Image and cursor-following mask overlay with GSAP tilt</li>
                <li>±10° rotation mapped to pointer position</li>
                <li>Smooth reset on mouse leave/touch end</li>
              </ul>
              <div>
                <div className="font-semibold mb-2">Usage:</div>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-black bg-opacity-5 p-4">
{`import TiltingImageCard from '@/components/animation/TiltingImageCard'

<TiltingImageCard
  imageUrl="/path/to/image.jpg"
  maskUrl="/svg/mask.svg"
  className="aspect-[4/5]"
/>`}
                </pre>
              </div>
            </div>
          </details>
        </div>

        <div className="flex-1 space-y-4">
          <DesCard
            name="Interactive Image"
            description="Blurred background image with SVG clip path that tracks cursor."
            details="Component: apps/web/src/components/media/InteractiveImage.jsx"
          />

          <div className="rounded-2xl border border-auto bg-auto p-2" style={{ height: '320px' }}>
            <InteractiveImage
              src="/img/Kolk-img/trollatunga-1.png"
              alt="Interactive mountain"
              width={800}
              height={1000}
            />
          </div>

          <details className="kol-mono-xs opacity-60">
            <summary className="cursor-pointer hover:opacity-100">View Implementation</summary>
            <div className="mt-4 space-y-4">
              <div className="font-semibold">Features:</div>
              <ul className="list-disc list-inside space-y-1 opacity-80">
                <li>SVG clip path follows cursor using ResizeObserver</li>
                <li>Blurred background layer with mask reveal</li>
                <li>Smooth pointer tracking with requestAnimationFrame</li>
              </ul>
              <div>
                <div className="font-semibold mb-2">Usage:</div>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-black bg-opacity-5 p-4">
{`import InteractiveImage from '@/components/media/InteractiveImage'

<InteractiveImage
  src="/path/to/image.jpg"
  alt="Interactive image"
  width={800}
  height={1000}
/>`}
                </pre>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default InteractivePreview
