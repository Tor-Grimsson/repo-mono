import DesPage from '../../components/workshop/molecules/DesPage'
import FoundryOrganismsPreview from '../../components/workshop/foundry/FoundryOrganismsPreview'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sections = [
  {
    id: 'foundry',
    label: 'Foundry',
    organismIds: [],
    customPreview: true
  }
]

const ORGANISM_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

export default function ComponentsOrganisms() {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('components-organisms', ORGANISM_SECTION_DEFAULTS)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Components: Organisms"
        subtitle="Complex standalone sections combining multiple molecules and atoms. Hero sections, control panels, and navigation components."
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
                {section.customPreview && section.id === 'foundry' && (
                  <FoundryOrganismsPreview />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
