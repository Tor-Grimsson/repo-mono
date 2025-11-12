import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'

const loaders = [
  {
    id: 'color-loader',
    name: 'ColorLoader',
    description: 'Interactive fullscreen loader with cursor trails and TextPressure "ENTER" animation.',
    location: 'apps/web/src/components/loaders/ColorLoader.jsx',
    features: [
      'CursorTrail and CursorTrailColor effects',
      'TextPressure "ENTER" text with variable font pressure',
      'Fade-in animation after 2 seconds',
      'Three-section vertical layout (thirds)'
    ],
    usage: `<ColorLoader\n  message="Loading"\n  onEnter={() => {}}\n/>`
  },
  {
    id: 'spinner-loader',
    name: 'SpinnerLoader',
    description: 'Fullscreen loader with rotating "KOLKRABBI" text, MagnetLines background, and TextPressure "ENTER".',
    location: 'apps/web/src/components/loaders/SpinnerLoader.jsx',
    features: [
      'MagnetLines interactive grid (12 rows × 48 columns)',
      'Rotating "KOLKRABBI" text (720° continuous rotation, 2.5s duration)',
      'CursorTrail and CursorTrailColor effects',
      'TextPressure "ENTER" with fade-in after 2 seconds',
      'Three-section vertical layout'
    ],
    usage: `<SpinnerLoader\n  message="Loading"\n  onEnter={() => {}}\n/>`,
    animation: [
      'Rotate: 720° (2 full rotations)',
      'Duration: 2.5 seconds',
      'Repeat: Infinite',
      'Easing: Linear'
    ]
  }
]

const LoadersPreview = () => {
  return (
    <div className="space-y-8">
      <DesSection
        name="Loader Animations"
        description="Fullscreen loading overlays used for transitions and demo experiences."
      />

      {loaders.map((loader) => (
        <div key={loader.id} className="space-y-4 rounded-2xl border border-auto bg-auto p-6">
          <DesCard
            name={loader.name}
            description={loader.description}
            details={`Location: ${loader.location}`}
          />

          <div className="kol-mono-xs space-y-3 text-auto">
            <div>
              <span className="opacity-60">Features:</span>
              <ul className="mt-2 list-disc list-inside space-y-1 opacity-80">
                {loader.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="opacity-60">Usage:</span>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded bg-black bg-opacity-5 p-3">
{loader.usage}
              </pre>
            </div>
            {loader.animation && (
              <div>
                <span className="opacity-60">Animation:</span>
                <ul className="mt-2 list-disc list-inside space-y-1 opacity-80">
                  {loader.animation.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="kol-mono-xs italic opacity-40">
        Note: Loaders leverage Framer Motion, TextPressure, CursorTrail effects, and MagnetLines for rich transitions.
      </div>
    </div>
  )
}

export default LoadersPreview
