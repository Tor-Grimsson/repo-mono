import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '../../components/shell'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesCard from '../../components/workshop/molecules/DesCard'
import SpacingRow from '../../components/workshop/molecules/SpacingRow'
import { SectionToggle } from '@kol/ui'
import useSectionExpansion from '../../components/workshop/useSectionExpansion'
import { spacingScale } from '../../data/workshop/tokens'

const sections = [
  { id: 'spacing-scale', label: 'Spacing Scale' }
]

const SPACING_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

const SPACING_DOC_LINKS = [
  { id: '2.3.0-breakpoints', label: 'Breakpoints & Responsive Layout' },
  { id: '2.3.1-breakpoints-cheat-sheet', label: 'Breakpoints Cheat Sheet' }
]

const Spacing = () => {
  const { sections: expandedSections, toggleSection, allExpanded, toggleAll } = useSectionExpansion('design-system-spacing', SPACING_SECTION_DEFAULTS)
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent sections={sections} links={SPACING_DOC_LINKS} allExpanded={allExpanded} onToggleAll={toggleAll} />)
    return () => setTocContent(null)
  }, [setTocContent, allExpanded, toggleAll])

  return (
    <div className="space-y-10">
      <DesPage
        title="Spacing"
        subtitle="Tokenized spacing system based on a 4px rhythm. Utility classes, component paddings, and layout gaps map directly to these values."
      />

      <div className="space-y-8">
        <div id="spacing-scale" className="space-y-4">
          <SectionToggle
            label="Spacing Scale"
            isExpanded={expandedSections['spacing-scale']}
            onToggle={() => toggleSection('spacing-scale')}
          />
          {expandedSections['spacing-scale'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Spacing Scale"
                description="Core spacing tokens from 4px up to 64px with matching REM values."
                details="Tokens defined in @kol/ui/theme.css and consumed via Tailwind spacing utilities."
              />
              <div className="space-y-6">
                {spacingScale.map((item) => (
                  <SpacingRow key={item.token} {...item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Spacing
