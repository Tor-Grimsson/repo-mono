import ButtonAnimations from '../../components/workshop/animations/ButtonAnimations'
import AnimatedTitlePreview from '../../components/workshop/animations/AnimatedTitlePreview'
import LoadersPreview from '../../components/workshop/animations/LoadersPreview'
import InteractivePreview from '../../components/workshop/animations/InteractivePreview'
import DesPage from '../../components/workshop/molecules/DesPage'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

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
      <DesPage
        title="Animations"
        subtitle="Animation patterns and interactive UI components"
      />

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <SectionToggle
              label={section.label}
              isExpanded={expandedSections[section.id]}
              onToggle={() => toggleSection(section.id)}
            />

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
