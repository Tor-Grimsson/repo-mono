import RotSpecimens from './comps/RotSpecimens'
import FeaturesCardSection from '../../../../components/sections/shared/FeaturesCardSection'
import { FoundryCTA } from '@kol/ui'

export default function RotSelection() {
  return (
    <div className="overflow-x-hidden">
      <RotSpecimens />

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
            title: 'Dylgjur',
            description: 'Experimental sans-serif display typeface',
            href: '/foundry/specimen/dylgjur',
            icon: 'foundation',
            visual: '/img/typefaces/dylgjur/set-b-02.png',
            backgroundColor: 'bg-surface-on-inverse'
          },
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
        heading="Download Rót"
        description="Free for personal and commercial use under SIL Open Font License."
        action={{
          to: '/foundry/licensing',
          label: 'View License & Download'
        }}
      />
    </div>
  )
}
