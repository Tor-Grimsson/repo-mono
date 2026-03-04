import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kol/ui/layout'
import WorkshopDocLinks from '../../components/workshop/molecules/WorkshopDocLinks'
import ButtonAnimations from '../../components/workshop/animations/ButtonAnimations'
import AnimatedTitlePreview from '../../components/workshop/animations/AnimatedTitlePreview'
import LoadersPreview from '../../components/workshop/animations/LoadersPreview'
import InteractivePreview from '../../components/workshop/animations/InteractivePreview'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesCard from '../../components/workshop/molecules/DesCard'
import SurfacePreviewGrid from '../../components/workshop/molecules/SurfacePreviewGrid'
import { LinkWithIcon, SectionLabel, SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sectionLabelSizes = [
  { size: 'sm', label: 'Small (16px icon)', height: 'h-16' },
  { size: 'md', label: 'Medium (24px icon)', height: 'h-20' },
  { size: 'lg', label: 'Large (40px icon)', height: 'h-32' }
]

const sections = [
  {
    id: 'button-animations',
    label: 'Button Animations'
  },
  {
    id: 'animated-title',
    label: 'Animated Title'
  },
  {
    id: 'interactive',
    label: 'Interactive'
  },
  {
    id: 'loaders',
    label: 'Loaders'
  },
  {
    id: 'link-with-icon',
    label: 'Link with Icon'
  },
  {
    id: 'section-label',
    label: 'Section Label'
  }
]

const ANIMATION_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

const ANIMATIONS_DOC_LINKS = [
  { id: '5.1.0-foundations', label: 'Workshop – Foundations' }
]

export default function Animations() {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('animations', ANIMATION_SECTION_DEFAULTS)
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopDocLinks links={ANIMATIONS_DOC_LINKS} />)
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
        title="Animations"
        subtitle="Animation patterns and interactive UI components"
      />

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <SectionToggle
              label={section.label}
              isExpanded={expandedSections[section.id]}
              onToggle={() => toggleSection(section.id)}
            />

            {expandedSections[section.id] && (
              <div className="space-y-4 pt-2">
                {section.id === 'button-animations' && <ButtonAnimations />}
                {section.id === 'animated-title' && <AnimatedTitlePreview />}
                {section.id === 'interactive' && <InteractivePreview />}
                {section.id === 'loaders' && <LoadersPreview />}

                {section.id === 'link-with-icon' && (
                  <>
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
                  </>
                )}

                {section.id === 'section-label' && (
                  <>
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
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
