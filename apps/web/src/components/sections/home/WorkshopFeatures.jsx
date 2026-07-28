import { Button, ButtonGroup } from '@kolkrabbi/kol-component'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/homepage'

const WorkshopFeatures = () => {
  const features = [
    {
      title: 'Introduction',
      icon: 'cone',
      description: 'Overview of the design system philosophy and principles',
      href: '/workshop',
      visual: `${cdnBase}/home-feat-workshop/workshop-introduction/workshop-introduction-800.jpg`
    },
    {
      title: 'Documentation',
      icon: 'book-open',
      description: 'Documentation covering design tokens, patterns and guidelines',
      href: '/workshop/docs',
      visual: `${cdnBase}/home-feat-workshop/workshop-documentation/workshop-documentation-800.jpg`
    },
    {
      title: 'Design System',
      icon: 'foundation',
      description: 'Design foundations; typography, color system and visual hierarchy',
      href: '/workshop/design-system',
      visual: `${cdnBase}/home-feat-workshop/workshop-foundation/workshop-foundation-800.jpg`
    },
    {
      title: 'Components',
      icon: 'component-01',
      description: 'Component library with usage examples, code snippets, and best practices',
      href: '/workshop/design-system',
      visual: `${cdnBase}/home-feat-workshop/workshop-components/workshop-components-800.jpg`
    }
  ]


  return (
    <section className="w-full">
      <div className='w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto'>
            {/* Header */}
            <div className="w-full pt-[128px]">
               <div className="flex items-center h-8">
                  <p className="kol-sans-heading-02 text-auto">
                     Workshop
                  </p>
               </div>
               <p className="kol-mono-12 text-auto opacity-60 mt-3 w-full md:w-[30%]">
                  Design system documentation, component library, and development resources for building with Kolkrabbi.
               </p>
            </div>

            {/* Features Grid */}
            <div className="self-stretch inline-flex flex-col md:flex-row md:h-72 justify-start items-center gap-6">
               {features.map((feature, index) => (
                 <div
                   key={index}
                   className="reveal flex-1"
                   style={{ '--reveal-delay': `${index * 0.15}s` }}
                 >
                   <CardFeatureItem
                     title={feature.title}
                     icon={feature.icon}
                     visual={feature.visual}
                     description={feature.description}
                     href={feature.href}
                     imagePosition="top"
                   />
                 </div>
               ))}
            </div>

            {/* Actions */}
            <div className="reveal-group w-full flex justify-center pt-10 pb-24">
              <ButtonGroup align="center">
                <Button variant="primary" href="/workshop" className="w-full sm:w-auto hover:bg-oq-08">Explore Workshop</Button>
                <Button variant="outline" href="/workshop/docs" className="w-full sm:w-auto">View Documentation</Button>
              </ButtonGroup>
            </div>
      </div>
    </section>
  )
}

export default WorkshopFeatures
