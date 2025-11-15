import DesPage from '../../components/workshop/molecules/DesPage'
import ComponentPreview from '../../components/workshop/molecules/ComponentPreview'
import CarouselNavigationPreview from '../../components/workshop/molecules/CarouselNavigationPreview'
import CollectionCardPreview from '../../components/workshop/molecules/CollectionCardPreview'
import ControlsPanelsPreview from '../../components/workshop/molecules/ControlsPanelsPreview'
import LinkCardPreview from '../../components/workshop/molecules/LinkCardPreview'
import ThemeToggleMoleculePreview from '../../components/workshop/molecules/ThemeToggleMoleculePreview'
import FoundryMoleculesPreview from '../../components/workshop/foundry/FoundryMoleculesPreview'
import TablePreview from '../../components/workshop/molecules/TablePreview'
import SectionTogglePreview from '../../components/workshop/molecules/SectionTogglePreview'
import ViewTogglePreview from '../../components/workshop/molecules/ViewTogglePreview'
import GridTogglePreview from '../../components/workshop/molecules/GridTogglePreview'
import { componentMolecules, componentSnippets } from '../../data/workshop/tokens'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sections = [
  {
    id: 'carousel-navigation',
    label: 'Carousel Navigation',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'collection-card',
    label: 'Collection Card',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'link-card',
    label: 'Link Card',
    moleculeIds: [],
    customPreview: true
  },
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
  },
  {
    id: 'view-toggle',
    label: 'View Toggle',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'grid-toggle',
    label: 'Grid Toggle',
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
                  {section.customPreview && section.id === 'carousel-navigation' ? (
                    <CarouselNavigationPreview />
                  ) : section.customPreview && section.id === 'collection-card' ? (
                    <CollectionCardPreview />
                  ) : section.customPreview && section.id === 'link-card' ? (
                    <LinkCardPreview />
                  ) : section.customPreview && section.id === 'theme-toggle' ? (
                    <ThemeToggleMoleculePreview />
                  ) : section.customPreview && section.id === 'controls-panels' ? (
                    <ControlsPanelsPreview />
                  ) : section.customPreview && section.id === 'foundry' ? (
                    <FoundryMoleculesPreview />
                  ) : section.customPreview && section.id === 'table' ? (
                    <TablePreview />
                  ) : section.customPreview && section.id === 'section-toggle' ? (
                    <SectionTogglePreview />
                  ) : section.customPreview && section.id === 'view-toggle' ? (
                    <ViewTogglePreview />
                  ) : section.customPreview && section.id === 'grid-toggle' ? (
                    <GridTogglePreview />
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
