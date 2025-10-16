import DesSection from '../../components/styleguide/molecules/DesSection'
import TypeSample from '../../components/styleguide/molecules/TypeSample'
import { typographyScale } from '../../data/styleguide/tokens'

const Typography = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="kol-heading-section">Typography</h2>
        <p className="kol-mono-text mt-4">Typographic styles map to the shared Kolkrabbi token classes. Preview sizes, weights, and intended usage below.</p>
      </div>

      <DesSection
        name="Type Scale"
        description="Display, heading, text, and monospace tokens with responsive breakpoint specs."
        details="Classes defined via kol-* utilities sourced from @kol/ui/theme.css"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {typographyScale.map((type) => (
          <TypeSample
            key={type.id}
            id={type.id}
            className={type.className}
            label={type.label}
            usage={type.usage}
            breakpoints={type.breakpoints}
          />
        ))}
      </div>
    </div>
  )
}

export default Typography
