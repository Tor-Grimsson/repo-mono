import { ButtonGroup, SectionLabel } from '@kol/ui'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'

const HomeWorkFeatures = () => {
  const features = [
    {
      title: 'Introduction',
      icon: 'component',
      description: 'Overview of the design system philosophy, principles, and getting started guide.',
      href: '/workshop/introduction'
    },
    {
      title: 'Documentation',
      icon: 'styleguide',
      description: 'Comprehensive documentation covering design tokens, patterns, and implementation guidelines.',
      href: '/workshop/docs'
    },
    {
      title: 'Foundations',
      icon: 'foundation',
      description: 'Core design foundations including typography, color systems, spacing, and visual hierarchy.',
      href: '/workshop/foundations'
    },
    {
      title: 'Components',
      icon: 'arrow-up',
      description: 'Complete component library with usage examples, code snippets, and best practices.',
      href: '/workshop/components'
    }
  ]

  const actions = [
    {
      label: 'Explore Workshop',
      variant: 'primary',
      href: '/workshop'
    },
    {
      label: 'View Documentation',
      variant: 'outline',
      href: '/workshop/docs'
    }
  ]

  return (
    <section className="w-full">
      <div className='w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto'>
            {/* Header */}
            <div className="w-full pt-[128px]">
               <SectionLabel text="Workshop" size="lg" />
               <p className="kol-mono-sm text-auto opacity-60 mt-3 w-[30%]">
                  Design system documentation, component library, and development resources for building with Kolkrabbi.
               </p>
            </div>

            {/* Features Grid */}
            <div className="self-stretch inline-flex flex-col md:flex-row md:h-72 justify-start items-center gap-6">
               {features.map((feature, index) => (
                 <CardFeatureItem
                   key={index}
                   title={feature.title}
                   icon={feature.icon}
                   description={feature.description}
                   href={feature.href}
                 />
               ))}
            </div>

            {/* Actions */}
            {actions.length > 0 && (
               <ButtonGroup buttons={actions} align="center" className="pt-10 pb-24" />
            )}
      </div>
    </section>
  )
}

export default HomeWorkFeatures
