import DesPage from '../../components/workshop/molecules/DesPage'
import ComponentPreview from '../../components/workshop/molecules/ComponentPreview'
import ButtonsPreview from '../../components/workshop/molecules/ButtonsPreview'
import TagStatesPreview from '../../components/workshop/molecules/TagStatesPreview'
import ControlStatesPreview from '../../components/workshop/molecules/ControlStatesPreview'
import SectionLabelPreview from '../../components/workshop/molecules/SectionLabelPreview'
import DividerPreview from '../../components/workshop/molecules/DividerPreview'
import PlayPausePreview from '../../components/workshop/molecules/PlayPausePreview'
import InputPreview from '../../components/workshop/molecules/InputPreview'
import TogglesPreview from '../../components/workshop/molecules/TogglesPreview'
import FoundryAtomsPreview from '../../components/workshop/foundry/FoundryAtomsPreview'
import { componentAtoms, componentSnippets } from '../../data/workshop/tokens'
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
    id: 'section-label',
    label: 'Section Label',
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
    id: 'controls',
    label: 'Controls',
    atomIds: ['slider-demo', 'dropdown-default'],
    customPreview: true
  },
  {
    id: 'foundry',
    label: 'Foundry',
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
          const sectionAtoms = componentAtoms.filter(atom => section.atomIds.includes(atom.id))

          return (
            <div key={section.id} className="space-y-4">
              <SectionToggle
                label={section.label}
                isExpanded={expandedSections[section.id]}
                onToggle={() => toggleSection(section.id)}
              />

              {expandedSections[section.id] && (
                <div className="space-y-4 pt-2">
                  {section.customPreview && section.id === 'buttons' ? (
                    <ButtonsPreview />
                  ) : section.customPreview && section.id === 'input' ? (
                    <InputPreview />
                  ) : section.customPreview && section.id === 'section-label' ? (
                    <SectionLabelPreview />
                  ) : section.customPreview && section.id === 'tags-pills' ? (
                    <TagStatesPreview />
                  ) : section.customPreview && section.id === 'divider' ? (
                    <DividerPreview />
                  ) : section.customPreview && section.id === 'play-pause' ? (
                    <PlayPausePreview />
                  ) : section.customPreview && section.id === 'toggles' ? (
                    <TogglesPreview />
                  ) : section.customPreview && section.id === 'controls' ? (
                    <ControlStatesPreview />
                  ) : section.customPreview && section.id === 'foundry' ? (
                    <FoundryAtomsPreview />
                  ) : (
                    sectionAtoms.map((item) => (
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
