import { Button } from '@kol/ui'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

const animationVariants = [
  {
    id: 'diagonal-swap',
    label: 'Diagonal Swap',
    description: 'Icon exits bottom-right while new icon enters from top-left with scale effect',
    icon: 'arrow-downright'
  }
]

const renderButtons = (variant) => (
  <div className="flex flex-wrap gap-4">
    <Button variant="primary" iconRight={variant.icon} iconRightHover={variant.icon} animateIcon>
      Primary
    </Button>
    <Button variant="secondary" iconRight={variant.icon} iconRightHover={variant.icon} animateIcon>
      Secondary
    </Button>
    <Button variant="outline" iconRight={variant.icon} iconRightHover={variant.icon} animateIcon>
      Outline
    </Button>
  </div>
)

const ButtonAnimations = () => {
  return (
    <div className="space-y-8">
      <DesSection
        name="Button Icon Animations"
        description="Hover animations applied to button icons. Mirrors production behaviour for primary, secondary, and outline variants."
      />

      {animationVariants.map((variant) => (
        <div key={variant.id} className="space-y-4">
          <DesCard
            name={variant.label}
            description={variant.description}
          />

          <SurfacePreviewGrid>
            <SurfacePreviewGrid.Surface label="Default surface">
              {renderButtons(variant)}
            </SurfacePreviewGrid.Surface>
            <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
              {renderButtons(variant)}
            </SurfacePreviewGrid.Surface>
          </SurfacePreviewGrid>

          <details className="kol-mono-xs opacity-60">
            <summary className="cursor-pointer hover:opacity-100">View CSS Implementation</summary>
            <pre className="mt-4 whitespace-pre-wrap rounded bg-black bg-opacity-5 p-4">
{`/* Icon animation: ${variant.label} */
.icon-default {
  transform: translate(0, 0) scale(1);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.icon-hover {
  transform: translate(-100%, -100%) scale(0.8);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

button:hover .icon-default,
a:hover .icon-default {
  transform: translate(100%, 100%) scale(0.8);
  opacity: 0;
}

button:hover .icon-hover,
a:hover .icon-hover {
  transform: translate(0, 0) scale(1);
  opacity: 1;
}`}
            </pre>
          </details>
        </div>
      ))}

      <div className="kol-mono-xs italic opacity-40">More animation patterns coming soon…</div>
    </div>
  )
}

export default ButtonAnimations
