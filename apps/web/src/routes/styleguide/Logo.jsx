import GuideCard from '../../components/styleguide/atoms/GuideCard'
import Wordmark from '../../components/ui/Wordmark'
import Logomark from '../../components/ui/Logomark'
import LogoLockup from '../../components/ui/LogoLockup'

const Logo = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="kol-heading-section">Logo & Wordmark</h2>
        <p className="kol-mono-body mt-4">Reference lockups for Kolkrabbi wordmarks. Keep clearspace equal to the width of the octopus mark and respect the minimum sizes below.</p>
      </div>

      <GuideCard padding="lg" className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">Logomark</div>
            <p className="text-sm opacity-70 max-w-sm">
              The official logomark SVG. Use this for app icons, favicons, and brand marks.
            </p>
            <div className="mt-3 text-xs opacity-60">Asset: `/svg/logo.svg`</div>
          </div>
          <div className="surface-panel rounded-3xl border px-10 py-6" style={{ borderColor: 'var(--surface-border)' }}>
            <Logomark className="h-16" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">Wordmark</div>
            <p className="text-sm opacity-70 max-w-sm">
              The official wordmark SVG. Use this for brand consistency across the site.
            </p>
            <div className="mt-3 text-xs opacity-60">Asset: `/svg/wordmark.svg`</div>
          </div>
          <div className="surface-panel rounded-3xl border px-10 py-6" style={{ borderColor: 'var(--surface-border)' }}>
            <Wordmark className="h-10" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">Primary Lockup</div>
            <p className="text-sm opacity-70 max-w-sm">
              Use this lockup on light surfaces with minimum width 160px. In dark mode it inverts automatically.
            </p>
            <div className="mt-3 text-xs opacity-60">Asset: `/svg/logo-full.svg`</div>
          </div>
          <div className="surface-panel rounded-3xl border px-10 py-6" style={{ borderColor: 'var(--surface-border)' }}>
            <LogoLockup className="h-16" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">Monogram</div>
            <p className="text-sm opacity-70 max-w-sm">
              Deploy the monogram in favicons and constrained spaces. Maintain minimum 24px width.
            </p>
            <div className="mt-3 text-xs opacity-60">Asset: `/svg/logo.svg`</div>
          </div>
          <div className="surface-panel rounded-3xl border px-10 py-6" style={{ borderColor: 'var(--surface-border)' }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border" style={{ borderColor: 'var(--surface-border)', backgroundColor: 'var(--foreground)', color: 'var(--surface-primary)' }}>
              <img src="/svg/logo.svg" alt="Kolkrabbi logomark" className="logomarkBrandInverse h-6" />
            </div>
          </div>
        </div>
      </GuideCard>
    </div>
  )
}

export default Logo
