import GuideCard from '../../components/styleguide/atoms/GuideCard'
import { SectionHeader } from '@kol/ui'

const Logo = () => {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Logo & Wordmark"
        description="Reference lockups for Kolkrabbi wordmarks. Keep clearspace equal to the width of the octopus mark and respect the minimum sizes below."
      />

      <GuideCard padding="lg" className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] textAbsoluteBlack">Primary Lockup</div>
            <p className="text-sm textAbsoluteBlack opacity-70 max-w-sm">
              Use this lockup on light surfaces with minimum width 160px. In dark mode it inverts automatically.
            </p>
            <div className="mt-3 text-xs textAbsoluteBlack opacity-60">Asset: `/logo/kolkrabbi-primary.svg`</div>
          </div>
          <div className="rounded-3xl border borderAbsoluteBlack20 bgAbsoluteWhite px-10 py-6 text-4xl font-bold tracking-widest textAbsoluteBlack">
            Kolkrabbi
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] textAbsoluteBlack">Monogram</div>
            <p className="text-sm textAbsoluteBlack opacity-70 max-w-sm">
              Deploy the monogram in favicons and constrained spaces. Maintain minimum 32px width.
            </p>
            <div className="mt-3 text-xs textAbsoluteBlack opacity-60">Asset: `/logo/kolkrabbi-monogram.svg`</div>
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-full border borderAbsoluteBlack20 bgAbsoluteBlack">
            <span className="textAbsoluteWhite text-2xl">K</span>
          </div>
        </div>
      </GuideCard>
    </div>
  )
}

export default Logo
