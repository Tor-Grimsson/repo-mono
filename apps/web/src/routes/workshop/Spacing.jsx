import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '../../components/shell'
import { PageSection } from '@kolkrabbi/kol-framework'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import DesCard from '../../components/workshop/molecules/DesCard'
import SpacingRow from '../../components/workshop/molecules/SpacingRow'
import { spacingScale } from '../../data/workshop/tokens'

const sections = [
  { id: 'spacing-scale', label: 'Spacing Scale' }
]

const SPACING_DOC_LINKS = [
  { id: '2.3.0-breakpoints', label: 'Breakpoints & Responsive Layout' },
  { id: '2.3.1-breakpoints-cheat-sheet', label: 'Breakpoints Cheat Sheet' }
]

const Spacing = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent sections={sections} links={SPACING_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="spacing"
        label="Design System"
        title="Spacing"
        body="Tokenized spacing system based on a 4px rhythm. Utility classes, component paddings, and layout gaps map directly to these values."
      />

      <PageSection id="spacing-scale" label="Spacing" title="Spacing Scale">
        <div className="mt-8 space-y-6">
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
      </PageSection>
    </div>
  )
}

export default Spacing
