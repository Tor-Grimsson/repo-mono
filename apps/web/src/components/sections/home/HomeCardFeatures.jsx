import { ButtonGroup, SectionLabel } from '@kol/ui'
import CardFeatureItem from '../../styleguide/molecules/CardFeatureItem'

const HomeCardFeatures = () => {
  const features = [
    {
      title: 'Brand Identity',
      icon: 'component',
      description: 'Visual language defined by foundational principles and consistent application.'
    },
    {
      title: 'Digital Products',
      icon: 'foundation',
      description: 'Modern web applications built with scalable architecture and design systems.'
    },
    {
      title: 'Art Direction',
      icon: 'styleguide',
      description: 'Creative direction that brings cohesive visual storytelling to life.'
    },
    {
      title: 'Strategy',
      icon: 'arrow-up',
      description: 'Research-driven approach tailored to your brand core values and audience.'
    }
  ]

  const actions = [
    {
      label: 'View Projects',
      variant: 'primary',
      onClick: () => console.log('View Projects')
    },
    {
      label: 'Learn More',
      variant: 'secondary',
      onClick: () => console.log('Learn More')
    }
  ]

  return (
    <section className="w-full">
      <div className='w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto'>
            {/* Header */}
            <div className="w-full pt-[224px]">
               <SectionLabel text="Selected Work" />
               <p className="kol-mono-sm text-auto opacity-60 mt-3 text-[12px] w-[30%]">
                  Develop a sleek and timeless brand identity, with a story that reflects your values, a message that aligns with your audience, and a strategy to operate tailored fitted to the core of your brand.
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
                  />
               ))}
            </div>

            {/* Actions */}
            {actions.length > 0 && (
               <ButtonGroup buttons={actions} align="center" className="pt-10 pb-4" />
            )}
      </div>
    </section>
  )
}

export default HomeCardFeatures
