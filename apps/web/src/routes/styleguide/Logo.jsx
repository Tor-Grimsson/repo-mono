import DesPage from '../../components/styleguide/molecules/DesPage'
import DesSection from '../../components/styleguide/molecules/DesSection'
import DesCard from '../../components/styleguide/molecules/DesCard'
import SurfacePreviewGrid from '../../components/styleguide/molecules/SurfacePreviewGrid'
import Wordmark from '../../components/ui/Wordmark'
import Logomark from '../../components/ui/Logomark'
import LogoLockup from '../../components/ui/LogoLockup'

const assets = [
  {
    id: 'logomark',
    name: 'Logomark',
    description: 'Octopus icon used for avatars, app icons, and constrained brand spaces.',
    code: 'Asset: /svg/logo.svg',
    render: () => <Logomark className="h-16" />
  },
  {
    id: 'wordmark',
    name: 'Wordmark',
    description: 'Primary wordmark SVG for standard placements. Inverts automatically on dark surfaces.',
    code: 'Asset: /svg/wordmark.svg',
    render: () => <Wordmark className="h-10" />
  },
  {
    id: 'lockup',
    name: 'Primary Lockup',
    description: 'Combined logomark + wordmark lockup. Maintain minimum width of 160px.',
    code: 'Asset: /svg/logo-full.svg',
    render: () => <LogoLockup className="h-16" />
  },
  {
    id: 'monogram',
    name: 'Monogram',
    description: 'Circular monogram for favicons and badges. Minimum size 24px width.',
    code: 'Asset: /svg/logo.svg',
    render: (tone) => (
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full border"
        style={{
          borderColor: 'var(--kol-border-default)',
          backgroundColor: tone === 'inverse' ? 'var(--kol-color-median-dark)' : 'var(--kol-surface-on-primary)',
          color: tone === 'inverse' ? 'var(--kol-color-median-light)' : 'var(--kol-surface-primary)'
        }}
      >
        <img src="/svg/logo.svg" alt="Kolkrabbi logomark" className="h-6" />
      </div>
    )
  }
]

const Logo = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Logo & Wordmark"
        subtitle="Brand assets for Kolkrabbi. Maintain clearspace equal to the logomark width and respect the minimum sizing guidance for each lockup."
      />

      <DesSection
        name="Brand Assets"
        description="All logo treatments adapt to light and dark surfaces when used with text-auto/bg-auto tokens."
        details="SVGs live under /svg. Do not rasterize—embed inline wherever possible for theme awareness."
      />

      <div className="grid grid-cols-1 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="space-y-4 rounded-2xl border border-auto bg-auto p-6">
            <DesCard
              name={asset.name}
              description={asset.description}
              code={asset.code}
            />

            <SurfacePreviewGrid>
              <SurfacePreviewGrid.Surface label="Default surface">
                <div className="flex items-center justify-center py-6">
                  {asset.render ? asset.render('default') : null}
                </div>
              </SurfacePreviewGrid.Surface>
              <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
                <div className="flex items-center justify-center py-6">
                  {asset.render ? asset.render('inverse') : null}
                </div>
              </SurfacePreviewGrid.Surface>
            </SurfacePreviewGrid>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Logo
