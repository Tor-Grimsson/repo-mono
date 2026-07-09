import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '../../components/shell'
import { PageSection } from '@kolkrabbi/kol-framework'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import ButtonsPreview from '../../components/workshop/molecules/ButtonsPreview'
import TagStatesPreview from '../../components/workshop/molecules/TagStatesPreview'
import DividerPreview from '../../components/workshop/molecules/DividerPreview'
import PlayPausePreview from '../../components/workshop/molecules/PlayPausePreview'
import InputPreview from '../../components/workshop/molecules/InputPreview'
import TogglesPreview from '../../components/workshop/atoms/TogglesPreview'
import SlidersPreview from '../../components/workshop/atoms/SlidersPreview'
import DropdownPreview from '../../components/workshop/atoms/DropdownPreview'
import QuantityStepperPreview from '../../components/workshop/atoms/QuantityStepperPreview'
import FoundryAtomsPreview from '../../components/workshop/foundry/FoundryAtomsPreview'
import SidebarMenuItemPreview from '../../components/workshop/atoms/SidebarMenuItemPreview'
import SourcesItemPreview from '../../components/workshop/atoms/SourcesItemPreview'

const sections = [
  {
    id: 'buttons',
    label: 'Buttons',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'input',
    label: 'Input',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'tags-pills',
    label: 'Tags / Pills',
    atomIds: ['tag-pill', 'tag-default'],
    customPreview: true
  },
  {
    id: 'divider',
    label: 'Divider',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'play-pause',
    label: 'Play/Pause Button',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'toggles',
    label: 'Toggles',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'sliders',
    label: 'Sliders',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'dropdown',
    label: 'Dropdown',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'quantity-stepper',
    label: 'Quantity',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'foundry',
    label: 'Foundry',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'sidebar-menu-item',
    label: 'Sidebar Menu Item',
    atomIds: [],
    customPreview: true
  },
  {
    id: 'sources-item',
    label: 'Sources Item',
    atomIds: [],
    customPreview: true
  },
]

const ATOMS_DOC_LINKS = [
  { id: '3.0.0-components-index', label: 'Components Overview' },
  { id: '3.1.0-components-list', label: 'Components List' }
]

export default function ComponentsAtoms() {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent sections={sections} links={ATOMS_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="components-atoms"
        label="Components"
        title="Components: Atoms"
        body="Basic building blocks that cannot be broken down further. Buttons, tags, pills, inputs, and other primitive UI elements."
      />

      {sections.map((section) => (
        <PageSection key={section.id} id={section.id} label="Atoms" title={section.label}>
          <div className="mt-8 space-y-6">
            {section.id === 'buttons' && <ButtonsPreview />}
            {section.id === 'input' && <InputPreview />}
            {section.id === 'tags-pills' && <TagStatesPreview />}
            {section.id === 'divider' && <DividerPreview />}
            {section.id === 'play-pause' && <PlayPausePreview />}
            {section.id === 'toggles' && <TogglesPreview />}
            {section.id === 'sliders' && <SlidersPreview />}
            {section.id === 'dropdown' && <DropdownPreview />}
            {section.id === 'quantity-stepper' && <QuantityStepperPreview />}
            {section.id === 'foundry' && <FoundryAtomsPreview />}
            {section.id === 'sidebar-menu-item' && <SidebarMenuItemPreview />}
            {section.id === 'sources-item' && <SourcesItemPreview />}
          </div>
        </PageSection>
      ))}
    </div>
  )
}
