import { ButtonGroup, SectionLabel } from '@kol/ui'
import CardFeatureItem from '../../styleguide/molecules/CardFeatureItem'

const HomeWorkFeatures = () => {
  const features = [
    {
      title: 'Case Study 1',
      icon: 'component',
      description: 'A detailed exploration of our approach to modern web development and design systems.'
    },
    {
      title: 'Case Study 2',
      icon: 'foundation',
      description: 'Building scalable brand identities with thoughtful design principles.'
    },
    {
      title: 'Case Study 3',
      icon: 'styleguide',
      description: 'Creating cohesive visual experiences across digital products.'
    },
    {
      title: 'Case Study 4',
      icon: 'arrow-up',
      description: 'Strategic brand development from concept to implementation.'
    }
  ]

  const actions = [
    {
      label: 'Download font',
      variant: 'primary',
      onClick: () => console.log('View All Work')
    },
    {
      label: 'View Specimen',
      variant: 'outline',
      onClick: () => console.log('Contact Us')
    }
  ]

  return (
    <section className="w-full">
      <div className='w-full flex flex-col max-w-[1400px] mx-auto pt-24'>
            {/* Header */}

            <div className="w-full mb-6">
               <SectionLabel text="Selected Work" size="md"/>
               
            </div>

            {/* Features Grid */}
            <div className="self-stretch inline-flex flex-col md:flex-row md:h-76 justify-start items-center gap-6">
               {features.map((feature, index) => (
                  <CardFeatureItem
                  key={index}
                  title={feature.title}
                  icon={feature.icon}
                  visual={feature.visual}
                  description={feature.description}
                  backgroundColor="bg-opacity-hex-01"
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

export default HomeWorkFeatures
