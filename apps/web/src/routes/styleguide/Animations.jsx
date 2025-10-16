import ButtonAnimations from '../../components/styleguide/animations/ButtonAnimations'
import AnimatedTitlePreview from '../../components/styleguide/animations/AnimatedTitlePreview'
import LoadersPreview from '../../components/styleguide/animations/LoadersPreview'
import InteractivePreview from '../../components/styleguide/animations/InteractivePreview'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from './StyleguideExpansionContext'

const sections = [
  {
    id: 'button-animations',
    label: 'Button Animations'
  },
  {
    id: 'animated-title',
    label: 'Animated Title'
  },
  {
    id: 'interactive',
    label: 'Interactive'
  },
  {
    id: 'loaders',
    label: 'Loaders'
  }
]

const ANIMATION_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

export default function Animations() {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('animations', ANIMATION_SECTION_DEFAULTS)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="kol-heading-section">Animations</h2>
        <p className="kol-mono-text mt-4">
          Interactive animation patterns for UI components
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <SectionToggle
              label={section.label}
              isExpanded={expandedSections[section.id]}
              onToggle={() => toggleSection(section.id)}
            />

            <div className="divider-auto w-full"></div>

            {expandedSections[section.id] && (
              <div className="space-y-4 pt-2">
                {section.id === 'button-animations' && <ButtonAnimations />}
                {section.id === 'animated-title' && <AnimatedTitlePreview />}
                {section.id === 'interactive' && <InteractivePreview />}
                {section.id === 'loaders' && <LoadersPreview />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
