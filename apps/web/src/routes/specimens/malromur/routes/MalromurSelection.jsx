import MalromurSpecimens from '../comps/MalromurSpecimens'
import FeaturesCardSection from '../../../../components/sections/shared/FeaturesCardSection'

export default function MalromurSelection() {
  return (
    <div className="overflow-x-hidden">
      <MalromurSpecimens />

      {/* Quick Links to Other Specimens */}
      <FeaturesCardSection
        sectionClassName="w-full px-8 py-24 snap-start bg-surface-primary"
        wrapperClassName="max-w-[1400px] mx-auto flex flex-col gap-6"
        headerClassName="w-full"
        headerLabel="Explore More Specimens"
        headerDescription="Discover other typefaces and their applications"
        cardsWrapperClassName="grid grid-cols-1 md:grid-cols-3 gap-6"
        features={[
          {
            title: 'Málrómur Hub',
            description: 'Complete overview with specs and patterns',
            href: '/specimen/malromur',
            icon: 'dashboard-book-open',
            visual: '/img/typefaces/malromur/set-a-01.png',
            backgroundColor: 'bg-surface-on-inverse'
          },
          {
            title: 'All Specimens',
            description: 'Browse all typeface specimens',
            href: '/specimens',
            icon: 'type',
            visual: '/img/typefaces/malromur/set-a-02.png',
            backgroundColor: 'bg-surface-on-inverse'
          },
          {
            title: 'Foundry',
            description: 'Explore our complete type collection',
            href: '/foundry',
            icon: 'diamond',
            visual: '/img/typefaces/malromur/set-a-03.png',
            backgroundColor: 'bg-surface-on-inverse'
          }
        ]}
        showHeader={true}
        showActions={true}
        actions={[
          {
            label: 'All Typefaces',
            variant: 'primary',
            href: '/foundry/typefaces'
          },
          {
            label: 'Foundry Overview',
            variant: 'secondary',
            href: '/foundry'
          }
        ]}
      />
    </div>
  )
}
