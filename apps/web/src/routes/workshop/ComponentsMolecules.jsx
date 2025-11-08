import DesPage from '../../components/workshop/molecules/DesPage'
import ComponentPreview from '../../components/workshop/molecules/ComponentPreview'
import ControlsPanelsPreview from '../../components/workshop/molecules/ControlsPanelsPreview'
import ThemeToggleMoleculePreview from '../../components/workshop/molecules/ThemeToggleMoleculePreview'
import FoundryMoleculesPreview from '../../components/workshop/foundry/FoundryMoleculesPreview'
import TablePreview from '../../components/workshop/molecules/TablePreview'
import SectionTogglePreview from '../../components/workshop/molecules/SectionTogglePreview'
import { componentMolecules, componentSnippets } from '../../data/workshop/tokens'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sections = [
  {
    id: 'theme-toggle',
    label: 'Theme Toggle',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'controls-panels',
    label: 'Controls Panels',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'foundry',
    label: 'Foundry',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'table',
    label: 'Table',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'section-toggle',
    label: 'Section Toggle',
    moleculeIds: [],
    customPreview: true
  }
]

const MOLECULE_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

export default function ComponentsMolecules() {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('components-molecules', MOLECULE_SECTION_DEFAULTS)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Components: Molecules"
        subtitle="Simple compositions combining 2-3 atoms with a single purpose. Slider controls, button groups, and labeled inputs."
      />

      <div className="space-y-8">
        {sections.map((section) => {
          const sectionMolecules = componentMolecules.filter(mol => section.moleculeIds.includes(mol.id))

          return (
            <div key={section.id} className="space-y-4">
              <SectionToggle
                label={section.label}
                isExpanded={expandedSections[section.id]}
                onToggle={() => toggleSection(section.id)}
              />

              {expandedSections[section.id] && (
                <div className="space-y-4 pt-2">
                  {section.customPreview && section.id === 'theme-toggle' ? (
                    <ThemeToggleMoleculePreview />
                  ) : section.customPreview && section.id === 'controls-panels' ? (
                    <ControlsPanelsPreview />
                  ) : section.customPreview && section.id === 'foundry' ? (
                    <FoundryMoleculesPreview />
                  ) : section.customPreview && section.id === 'table' ? (
                    <TablePreview />
                  ) : section.customPreview && section.id === 'section-toggle' ? (
                    <SectionTogglePreview />
                  ) : (
                    sectionMolecules.map((item) => (
                      <ComponentPreview key={item.id} item={item} snippet={componentSnippets[item.id]} />
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
