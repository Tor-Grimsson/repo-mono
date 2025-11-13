import { SectionLabel, Button } from '@kol/ui'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'

const StudioServices = () => {
  const services = [
    {
      title: 'Visual Identity',
      icon: 'component',
      description: 'Brand strategy, logo design, and comprehensive visual systems that establish distinctive market presence.',
      href: '/work'
    },
    {
      title: 'Type Design',
      icon: 'foundation',
      description: 'Custom typeface design and licensing for editorial, branding, and digital applications.',
      href: '/foundry'
    },
    {
      title: 'Design Systems',
      icon: 'styleguide',
      description: 'Scalable component libraries, design tokens, and documentation for digital products.',
      href: '/workshop'
    },
    {
      title: 'Creative Direction',
      icon: 'arrow-up',
      description: 'Strategic guidance for visual campaigns, editorial projects, and brand evolution.',
      href: '/work'
    }
  ]

  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto py-16">
        <div className="w-full">
          <SectionLabel text="Services" size="lg" />
          <p className="kol-mono-sm text-auto opacity-60 mt-3 max-w-[40%]">
            Visual identity, typography, and design systems.
          </p>
        </div>

        <div className="self-stretch inline-flex flex-col md:flex-row md:h-72 justify-start items-center gap-6">
          {services.map((service, index) => (
            <CardFeatureItem
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              href={service.href}
            />
          ))}
        </div>

        <div className="flex justify-center pt-10 pb-16">
          <Button iconLeft="component" size="md" href="/work">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  )
}

export default StudioServices
