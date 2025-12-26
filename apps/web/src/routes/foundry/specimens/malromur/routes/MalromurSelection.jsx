import MalromurSpecimens from '../comps/MalromurSpecimens'
import FeaturesCardSection from '../../../../../components/sections/shared/FeaturesCardSection'
import { FoundryCTA } from '@kol/ui'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/foundry'

export default function MalromurSelection() {
  return (
    <div className="overflow-x-hidden">
      <MalromurSpecimens />

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
            description: 'Expressive display typeface for poetry',
            href: '/foundry/specimen/gullhamrar',
            icon: 'foundation',
            visual: `${cdnBase}/foundry-typefaces/04-gullhamrar/specimen-gullhamrar/02-specimen-image/specimen-image-800.jpg`,
            backgroundColor: 'bg-surface-on-inverse'
          },
          {
            title: 'Dylgjur',
            description: 'Contemporary serif with warmth and character',
            href: '/foundry/specimen/dylgjur',
            icon: 'foundation',
            visual: `${cdnBase}/foundry-typefaces/03-dylgjur/specimen-dylgjur/02-specimen-image/specimen-image-800.jpg`,
            backgroundColor: 'bg-surface-on-inverse'
          },
          {
            title: 'Rót',
            description: 'Variable sans serif for design systems',
            href: '/foundry/specimen/rot',
            icon: 'foundation',
            visual: `${cdnBase}/foundry-typefaces/02-raetur/specimen-raetur/02-specimen-image/specimen-image-800.jpg`,
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
        heading="Download Málrómur"
        description="Free for personal and commercial use under SIL Open Font License."
        action={{
          to: '/foundry/licensing',
          label: 'View License & Download'
        }}
      />
    </div>
  )
}
