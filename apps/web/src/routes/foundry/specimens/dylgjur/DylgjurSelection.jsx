import DylgjurSpecimens from './comps/DylgjurSpecimens'
import FeaturesCardSection from '../../../../components/sections/shared/FeaturesCardSection'
import { FoundryCTA } from '@kol/ui'

export default function DylgjurSelection() {
  return (
    <div className="overflow-x-hidden">
      <DylgjurSpecimens />

      {/* Quick Links to Other Specimens */}
      <FeaturesCardSection
        sectionClassName="w-full pt-24 bg-surface-primary"
        wrapperClassName="max-w-[1400px] mx-auto flex flex-col gap-6"
        headerClassName="w-full"
        headerLabel="Explore More Specimens"
        headerDescription="Discover other typefaces and their applications"
        cardsWrapperClassName="grid grid-cols-1 md:grid-cols-3 gap-6"
        features={[
          {
            title: 'Gullhamrar',
            description: 'High-contrast display serif for editorial',
            href: '/foundry/specimen/gullhamrar',
            icon: 'foundation',
            visual: '/img/typefaces/gullhamrar/set-f-05.png',
            backgroundColor: 'bg-surface-on-inverse'
          },
          {
            title: 'Málrómur',
            description: 'Variable serif for editorial design',
            href: '/foundry/specimen/malromur',
            icon: 'foundation',
            visual: '/img/typefaces/malromur/set-a-01.png',
            backgroundColor: 'bg-surface-on-inverse'
          },
          {
            title: 'Rót',
            description: 'Variable sans serif for design systems',
            href: '/foundry/specimen/rot',
            icon: 'foundation',
            visual: '/img/typefaces/rot/set-g-03.png',
            backgroundColor: 'bg-surface-on-inverse'
          }
        ]}
        showHeader={true}
        showActions={true}
        actions={[
          {
            label: 'All Specimens',
            variant: 'primary',
            href: '/foundry/specimen'
          },
          {
            label: 'All Typefaces',
            variant: 'secondary',
            href: '/foundry/typefaces'
          }
        ]}
      />

      {/* CTA */}
      <FoundryCTA
        heading="Download Dylgjur"
        description="Free for personal and commercial use under SIL Open Font License."
        action={{
          to: '/foundry/licensing',
          label: 'View License & Download'
        }}
      />
    </div>
  )
}
