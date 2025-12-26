import TiltCard from '../../animation/TiltCard'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'
import { useTheme } from '@kol/ui'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/homepage'

const InteractivePreview = () => {
  const { theme } = useTheme()
  const variant = theme === 'dark' ? 'foundry-card-light' : 'foundry-card-dark'
  const imageSrc = `${cdnBase}/home-foundry-card/${variant}/${variant}-1200.jpg`

  return (
    <div className="space-y-8">
      <DesSection
        name="Interactive Animations"
        description="Cursor-aware experiences used across the site for motion-rich storytelling."
      />

      <div className="space-y-4">
        <DesCard
          name="Tilt Card"
          description="3D tilting card with spring-based motion effect. Used on home page for foundry feature."
          details="Component: apps/web/src/components/animation/TiltCard.jsx"
        />

        <div className="rounded border border-fg-08 overflow-hidden p-8 flex justify-center">
          <div style={{ width: '500px', height: '400px' }}>
            <TiltCard
              src={imageSrc}
              alt="Foundry preview"
              className="w-full h-full rounded-[4px]"
            />
          </div>
        </div>

        <div className="rounded p-6 bg-fg-02 border border-fg-08">
          <div className="kol-mono-xs text-fg-48 mb-4">Usage</div>
          <pre className="kol-mono-xs text-auto">
{`import TiltCard from '@/components/animation/TiltCard'

<TiltCard
  src={imageSrc}
  alt="Type Design"
  className="w-full aspect-[5/4] rounded-[4px]"
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default InteractivePreview
