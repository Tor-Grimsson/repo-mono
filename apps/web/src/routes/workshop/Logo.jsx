import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import DesCard from '../../components/workshop/molecules/DesCard'

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

const LOGO_DOC_LINKS = [
  { id: '5.1.0-foundations', label: 'Workshop – Foundations' }
]

const Logo = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent sections={sections} links={LOGO_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="logo"
        label="Design System"
        title="Logo & Wordmark"
        body="Brand assets for Kolkrabbi. Maintain clearspace equal to the logomark width and respect the minimum sizing guidance for each lockup."
      />

      {sections.map((section) => (
        <PageSection key={section.id} id={section.id} label="Logo" title={section.label}>
          <div className="mt-8 space-y-6">
            <DesCard
              name={section.label}
              description={section.description}
              details={section.details}
            />

            <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
              <div className="flex items-center justify-center py-8">
                {section.render('default')}
              </div>
            </div>
          </div>
        </PageSection>
      ))}
    </div>
  )
}

export default Logo
