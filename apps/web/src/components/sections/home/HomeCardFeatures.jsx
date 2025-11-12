import { ButtonGroup, SectionLabel } from '@kol/ui'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'

const HomeCardFeatures = () => {
  const features = [
    {
      title: 'Type Foundry',
      icon: 'foundation',
      description: 'Custom typeface design and licensing for distinctive brand typography.',
      href: '/foundry'
    },
    {
      title: 'Client Work',
      icon: 'component',
      description: 'Brand identity and digital product design for ambitious companies.',
      href: '/work'
    },
    {
      title: 'Collections',
      icon: 'styleguide',
      description: 'Curated explorations in illustration, logomarks, and visual experiments.',
      href: '/collections'
    },
    {
      title: 'Workshop',
      icon: 'arrow-up',
      description: 'Design system documentation, components, and development resources.',
      href: '/workshop'
    }
  ]

  const actions = [
    {
      label: 'Explore Projects',
      variant: 'primary',
      href: '/work'
    },
    {
      label: 'Get in Touch',
      variant: 'secondary',
      href: 'mailto:hello@kolkrabbi.io'
    }
  ]

  return (
    <section className="w-full">
      <div className='w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto'>
            {/* Header */}
            <div className="w-full pt-[224px]">
               <SectionLabel text="Featured" size="lg" />
               <p className="kol-mono-sm text-auto opacity-60 mt-3 w-[30%]">
                  Selected projects and explorations in type design, brand identity, and visual systems.
               </p>
            </div>

            {/* Features Grid */}
            <div className="self-stretch inline-flex flex-col md:flex-row md:h-72 justify-start items-center gap-6">
               {features.map((feature, index) => (
                  <CardFeatureItem
                  key={index}
                  title={feature.title}
                  icon={feature.icon}
                  visual={feature.visual}
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

export default HomeCardFeatures
