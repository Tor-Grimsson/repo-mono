import { useContext, useEffect } from 'react'
import { WorkshopTocContext } from '@kol/ui/layout'
import WorkshopDocLinks from '../../components/workshop/molecules/WorkshopDocLinks'
import { LinkWithIcon, SectionLabel, SectionToggle } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesCard from '../../components/workshop/molecules/DesCard'
import SurfacePreviewGrid from '../../components/workshop/molecules/SurfacePreviewGrid'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sections = [
  { id: 'link-with-icon', label: 'Link with Icon' },
  { id: 'section-label', label: 'Section Label' }
]

const sectionLabelSizes = [
  { size: 'sm', label: 'Small (16px icon)', height: 'h-16' },
  { size: 'md', label: 'Medium (24px icon)', height: 'h-20' },
  { size: 'lg', label: 'Large (40px icon)', height: 'h-32' }
]

const SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

const INTERACTIVE_DOC_LINKS = [
  { id: '3.1.0-components-list', label: 'Components List' }
]

const Interactive = () => {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('design-system-interactive', SECTION_DEFAULTS)
  const setTocContent = useContext(WorkshopTocContext)
  useEffect(() => {
    setTocContent(<WorkshopDocLinks links={INTERACTIVE_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Interactive Components"
        subtitle="Reusable interactive elements and patterns"
      />

      <div className="space-y-8">
        <div className="space-y-4">
          <SectionToggle
            label="Link with Icon"
            isExpanded={expandedSections['link-with-icon']}
            onToggle={() => toggleSection('link-with-icon')}
          />
          {expandedSections['link-with-icon'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Link with Icon"
                description="A styled link component with an animated icon that moves on hover."
                details="Props: to (string), children (ReactNode), iconName (string, default: 'arrow-right'), iconSize (number, default: 12), className (string)"
              />

              <SurfacePreviewGrid>
                <SurfacePreviewGrid.Surface label="Default surface">
                  <div className="space-y-6 py-4">
                    <div>
                      <div className="kol-mono-xs text-fg-48 mb-3">Default (arrow-right)</div>
                      <LinkWithIcon to="/workshop/design-system">
                        Explore Typeface
                      </LinkWithIcon>
                    </div>
                    <div>
                      <div className="kol-mono-xs text-fg-48 mb-3">Custom Icon (arrow-downright)</div>
                      <LinkWithIcon to="/workshop/design-system" iconName="arrow-downright">
                        View Documentation
                      </LinkWithIcon>
                    </div>
                    <div>
                      <div className="kol-mono-xs text-fg-48 mb-3">Larger Icon (16px)</div>
                      <LinkWithIcon to="/workshop/design-system" iconSize={16}>
                        Learn More
                      </LinkWithIcon>
                    </div>
                  </div>
                </SurfacePreviewGrid.Surface>
                <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
                  <div className="space-y-6 py-4">
                    <div>
                      <div className="kol-mono-xs text-fg-48 mb-3">Default (arrow-right)</div>
                      <LinkWithIcon to="/workshop/design-system">
                        Explore Typeface
                      </LinkWithIcon>
                    </div>
                    <div>
                      <div className="kol-mono-xs text-fg-48 mb-3">Custom Icon (arrow-downright)</div>
                      <LinkWithIcon to="/workshop/design-system" iconName="arrow-downright">
                        View Documentation
                      </LinkWithIcon>
                    </div>
                    <div>
                      <div className="kol-mono-xs text-fg-48 mb-3">Larger Icon (16px)</div>
                      <LinkWithIcon to="/workshop/design-system" iconSize={16}>
                        Learn More
                      </LinkWithIcon>
                    </div>
                  </div>
                </SurfacePreviewGrid.Surface>
              </SurfacePreviewGrid>

              <div className="rounded p-6 bg-fg-02 border border-fg-08">
                <div className="kol-mono-xs text-fg-48 mb-4">Usage</div>
                <pre className="kol-mono-xs text-auto">
{`import { LinkWithIcon } from '@kol/ui'

<LinkWithIcon to="/path">
  Explore Typeface
</LinkWithIcon>

<LinkWithIcon to="/path" iconName="arrow-downright" iconSize={16}>
  View Documentation
</LinkWithIcon>`}
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <SectionToggle
            label="Section Label"
            isExpanded={expandedSections['section-label']}
            onToggle={() => toggleSection('section-label')}
          />
          {expandedSections['section-label'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Section Label"
                description="Label component with animated arrow icon. Available in 3 size variants (sm, md, lg)."
                details="Icon swaps on hover • Uses label-compact (sm/md) and heading-md (lg) • Text uses text-auto"
              />

              <SurfacePreviewGrid>
                <SurfacePreviewGrid.Surface label="Default surface">
                  <div className="space-y-6 py-4">
                    {sectionLabelSizes.map(({ size, label, height }) => (
                      <div key={size} className="space-y-2">
                        <div className="kol-mono-xs text-fg-48">{label}</div>
                        <div className={`flex ${height} items-center justify-start`}>
                          <SectionLabel text="Featured Work" size={size} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SurfacePreviewGrid.Surface>
                <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
                  <div className="space-y-6 py-4">
                    {sectionLabelSizes.map(({ size, label, height }) => (
                      <div key={size} className="space-y-2">
                        <div className="kol-mono-xs text-fg-48">{label}</div>
                        <div className={`flex ${height} items-center justify-start`}>
                          <SectionLabel text="Featured Work" size={size} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SurfacePreviewGrid.Surface>
              </SurfacePreviewGrid>

              <div className="rounded p-6 bg-fg-02 border border-fg-08">
                <div className="kol-mono-xs text-fg-48 mb-4">Usage</div>
                <pre className="kol-mono-xs text-auto">
{`import { SectionLabel } from '@kol/ui'

<SectionLabel text="Featured Work" size="sm" />
<SectionLabel text="Featured Work" size="md" />
<SectionLabel text="Featured Work" size="lg" />`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Interactive
