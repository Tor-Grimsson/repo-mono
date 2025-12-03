import DesPage from '../../components/workshop/molecules/DesPage'
import ComponentPreview from '../../components/workshop/molecules/ComponentPreview'
import CollectionCardPreview from '../../components/workshop/molecules/CollectionCardPreview'
import ControlsPanelsPreview from '../../components/workshop/molecules/ControlsPanelsPreview'
import LinkCardPreview from '../../components/workshop/molecules/LinkCardPreview'
import ThemeToggleMoleculePreview from '../../components/workshop/molecules/ThemeToggleMoleculePreview'
import GlyphGridPreview from '../../components/workshop/foundry/GlyphGridPreview'
import FeatureGridPreview from '../../components/workshop/foundry/FeatureGridPreview'
import PairingsListPreview from '../../components/workshop/foundry/PairingsListPreview'
import StylesGridPreview from '../../components/workshop/foundry/StylesGridPreview'
import FontControlsPanelPreview from '../../components/workshop/foundry/FontControlsPanelPreview'
import TablePreview from '../../components/workshop/molecules/TablePreview'
import SectionTogglePreview from '../../components/workshop/molecules/SectionTogglePreview'
import { componentMolecules, componentSnippets } from '../../data/workshop/tokens'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sections = [
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
    id: 'glyph-grid',
    label: 'Glyph Grid',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'feature-grid',
    label: 'Feature Grid',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'pairings-list',
    label: 'Pairings List',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'styles-grid',
    label: 'Styles Grid',
    moleculeIds: [],
    customPreview: true
  },
  {
    id: 'font-controls-panel',
    label: 'Font Controls Panel',
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
                  {section.id === 'collection-card' && <CollectionCardPreview />}
                  {section.id === 'link-card' && <LinkCardPreview />}
                  {section.id === 'theme-toggle' && <ThemeToggleMoleculePreview />}
                  {section.id === 'controls-panels' && <ControlsPanelsPreview />}
                  {section.id === 'glyph-grid' && <GlyphGridPreview />}
                  {section.id === 'feature-grid' && <FeatureGridPreview />}
                  {section.id === 'pairings-list' && <PairingsListPreview />}
                  {section.id === 'styles-grid' && <StylesGridPreview />}
                  {section.id === 'font-controls-panel' && <FontControlsPanelPreview />}
                  {section.id === 'table' && <TablePreview />}
                  {section.id === 'section-toggle' && <SectionTogglePreview />}
                  {!section.customPreview && sectionMolecules.map((item) => (
                    <ComponentPreview key={item.id} item={item} snippet={componentSnippets[item.id]} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
