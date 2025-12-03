import DesPage from '../../components/workshop/molecules/DesPage'
import ButtonsPreview from '../../components/workshop/molecules/ButtonsPreview'
import TagStatesPreview from '../../components/workshop/molecules/TagStatesPreview'
import DividerPreview from '../../components/workshop/molecules/DividerPreview'
import PlayPausePreview from '../../components/workshop/molecules/PlayPausePreview'
import InputPreview from '../../components/workshop/molecules/InputPreview'
import TogglesPreview from '../../components/workshop/atoms/TogglesPreview'
import SlidersPreview from '../../components/workshop/atoms/SlidersPreview'
import DropdownPreview from '../../components/workshop/atoms/DropdownPreview'
import FoundryAtomsPreview from '../../components/workshop/foundry/FoundryAtomsPreview'
import SidebarMenuItemPreview from '../../components/workshop/atoms/SidebarMenuItemPreview'
import SourcesItemPreview from '../../components/workshop/atoms/SourcesItemPreview'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

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
  }
]

const ATOM_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

export default function ComponentsAtoms() {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('components-atoms', ATOM_SECTION_DEFAULTS)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Components: Atoms"
        subtitle="Basic building blocks that cannot be broken down further. Buttons, tags, pills, inputs, and other primitive UI elements."
      />

      <div className="space-y-8">
        {sections.map((section) => {
          return (
            <div key={section.id} className="space-y-4">
              <SectionToggle
                label={section.label}
                isExpanded={expandedSections[section.id]}
                onToggle={() => toggleSection(section.id)}
              />

              {expandedSections[section.id] && (
                <div className="space-y-4 pt-2">
                  {section.id === 'buttons' && <ButtonsPreview />}
                  {section.id === 'input' && <InputPreview />}
                  {section.id === 'tags-pills' && <TagStatesPreview />}
                  {section.id === 'divider' && <DividerPreview />}
                  {section.id === 'play-pause' && <PlayPausePreview />}
                  {section.id === 'toggles' && <TogglesPreview />}
                  {section.id === 'sliders' && <SlidersPreview />}
                  {section.id === 'dropdown' && <DropdownPreview />}
                  {section.id === 'foundry' && <FoundryAtomsPreview />}
                  {section.id === 'sidebar-menu-item' && <SidebarMenuItemPreview />}
                  {section.id === 'sources-item' && <SourcesItemPreview />}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
