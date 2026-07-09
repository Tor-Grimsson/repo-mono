import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kolkrabbi/kol-workshop'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
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
import { componentMolecules, componentSnippets } from '../../data/workshop/tokens'
import { PageSection } from '@kolkrabbi/kol-framework'

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
  }
]

const MOLECULES_DOC_LINKS = [
  { id: '3.0.0-components-index', label: 'Components Overview' },
  { id: '3.1.0-components-list', label: 'Components List' }
]

export default function ComponentsMolecules() {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={MOLECULES_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="components-molecules"
        label="Components"
        title="Components: Molecules"
        body="Simple compositions combining 2-3 atoms with a single purpose. Slider controls, button groups, and labeled inputs."
      />

      {sections.map((section) => {
        const sectionMolecules = componentMolecules.filter(mol => section.moleculeIds.includes(mol.id))

        return (
          <PageSection key={section.id} id={section.id} label="Molecules" title={section.label}>
            <div className="mt-8 space-y-6">
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
              {!section.customPreview && sectionMolecules.map((item) => (
                <ComponentPreview key={item.id} item={item} snippet={componentSnippets[item.id]} />
              ))}
            </div>
          </PageSection>
        )
      })}
    </div>
  )
}
