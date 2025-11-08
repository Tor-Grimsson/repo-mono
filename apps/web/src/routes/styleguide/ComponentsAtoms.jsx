import DesPage from '../../components/styleguide/molecules/DesPage'
import ComponentPreview from '../../components/styleguide/molecules/ComponentPreview'
import ButtonsPreview from '../../components/styleguide/molecules/ButtonsPreview'
import TagStatesPreview from '../../components/styleguide/molecules/TagStatesPreview'
import ControlStatesPreview from '../../components/styleguide/molecules/ControlStatesPreview'
import SectionLabelPreview from '../../components/styleguide/molecules/SectionLabelPreview'
import DividerPreview from '../../components/styleguide/molecules/DividerPreview'
import PlayPausePreview from '../../components/styleguide/molecules/PlayPausePreview'
import InputPreview from '../../components/styleguide/molecules/InputPreview'
import FoundryAtomsPreview from '../../components/styleguide/foundry/FoundryAtomsPreview'
import { componentAtoms, componentSnippets } from '../../data/styleguide/tokens'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/styleguide/StyleguideExpansionContext'

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
