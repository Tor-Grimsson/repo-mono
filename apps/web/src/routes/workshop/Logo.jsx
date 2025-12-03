import DesPage from '../../components/workshop/molecules/DesPage'
import DesCard from '../../components/workshop/molecules/DesCard'
import SurfacePreviewGrid from '../../components/workshop/molecules/SurfacePreviewGrid'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sections = [
  {
    id: 'logomark',
    label: 'Logomark',
    description: 'Octopus icon used for avatars, app icons, and constrained brand spaces.',
    details: 'Asset: /svg/logo.svg',
    render: (tone) => (
      <img
        src="/svg/logo.svg"
        alt="Kolkrabbi logomark"
        className={`h-16 ${tone === 'inverse' ? 'logomarkBrandInverse' : 'logomarkBrand'}`}
      />
    )
  },
  {
    id: 'wordmark',
    label: 'Wordmark',
    description: 'Primary wordmark SVG for standard placements. Inverts automatically on dark surfaces.',
    details: 'Asset: /svg/wordmark.svg',
    render: (tone) => (
      <img
        src="/svg/wordmark.svg"
        alt="Kolkrabbi wordmark"
        className={`h-10 ${tone === 'inverse' ? 'wordmarkBrandInverse' : 'wordmarkBrand'}`}
      />
    )
  },
  {
    id: 'lockup',
    label: 'Primary Lockup',
    description: 'Combined logomark + wordmark lockup. Maintain minimum width of 160px.',
    details: 'Asset: /svg/logo-full.svg',
    render: (tone) => (
      <div className="flex items-center gap-3">
        <img
          src="/svg/logo.svg"
          alt="Kolkrabbi logomark"
          className={`h-12 ${tone === 'inverse' ? 'logomarkBrandInverse' : 'logomarkBrand'}`}
        />
        <img
          src="/svg/wordmark.svg"
          alt="Kolkrabbi wordmark"
          className={`h-8 ${tone === 'inverse' ? 'wordmarkBrandInverse' : 'wordmarkBrand'}`}
        />
      </div>
    )
  },
  {
    id: 'monogram',
    label: 'Monogram',
    description: 'Circular monogram for favicons and badges. Minimum size 24px width.',
    details: 'Asset: /svg/logo.svg',
    render: (tone) => (
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full border ${tone === 'inverse' ? 'bg-fg-96 border-fg-16' : 'bg-surface-inverse border-fg-08'}`}
      >
        <img
          src="/svg/logo.svg"
          alt="Kolkrabbi logomark"
          className={`h-6 ${tone === 'inverse' ? 'logomarkBrand' : 'logomarkBrandInverse'}`}
        />
      </div>
    )
  }
]

const SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

const Logo = () => {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('foundations-logo', SECTION_DEFAULTS)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Logo & Wordmark"
        subtitle="Brand assets for Kolkrabbi. Maintain clearspace equal to the logomark width and respect the minimum sizing guidance for each lockup."
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
                <DesCard
                  name={section.label}
                  description={section.description}
                  details={section.details}
                />

                <SurfacePreviewGrid>
                  <SurfacePreviewGrid.Surface label="Default surface">
                    <div className="flex items-center justify-center py-8">
                      {section.render('default')}
                    </div>
                  </SurfacePreviewGrid.Surface>
                  <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
                    <div className="flex items-center justify-center py-8">
                      {section.render('inverse')}
                    </div>
                  </SurfacePreviewGrid.Surface>
                </SurfacePreviewGrid>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Logo
