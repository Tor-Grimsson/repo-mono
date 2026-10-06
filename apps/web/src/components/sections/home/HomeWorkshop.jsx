import { Button, ButtonGroup } from '@kolkrabbi/kol-component'
import { SectionCardItem } from '@kolkrabbi/kol-component'

const cdnBase = 'https://b2.kolkrabbi.io/website/asset-library/homepage'

const HomeWorkshop = () => {
  const features = [
    {
      title: 'Introduction',
      icon: 'cone',
      description: 'Overview of the apps and tools, their state and where they live',
      href: '/workshop',
      visual: `${cdnBase}/home-feat-workshop/workshop-introduction/workshop-introduction-800.jpg`
    },
    {
      title: 'Design System',
      icon: 'component-01',
      description: 'Packages, components and foundations, live at ui.kolkrabbi.io',
      href: '/workshop/design-system',
      visual: `${cdnBase}/home-feat-workshop/workshop-components/workshop-components-800.jpg`
    },
    {
      title: 'Brand',
      icon: 'edit',
      description: 'Logo, color ramps, typography and brand assets',
      href: '/workshop/brand',
      visual: `${cdnBase}/home-feat-workshop/workshop-foundation/workshop-foundation-800.jpg`
    },
    {
      title: 'FXR',
      icon: 'layout',
      description: 'Vector and generative design editor',
      href: '/workshop/fxr',
      visual: '/img/dev/home-feat-workshop/workshop-fxr-800.jpg'
    }
  ]


  return (
    <section className="w-full">
      <div className='kol-page w-full flex flex-col gap-8 md:gap-10 mx-auto'>
            {/* Header */}
            <div className="w-full pt-[128px]">
               <div className="flex items-center h-8">
                  <p className="kol-sans-heading-02 text-auto">
                     Workshop
                  </p>
               </div>
               <p className="kol-mono-12 text-auto opacity-60 mt-3 w-full md:w-[30%]">
                  The design system, the brand site and the tools built around Kolkrabbi, each on its own subdomain.
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
                   <SectionCardItem
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
            {/* No pt/pb: the parent is `flex flex-col gap-8 md:gap-10` and
              * already owns the rhythm. `pt-10` stacked 40 on the 32 flex gap
              * (72 above the buttons) and `pb-24` put 96 under them, which read
              * as an unexplained hole before the next section. */}
            <div className="reveal-group w-full flex justify-center">
              <ButtonGroup align="center">
                <Button size="lg" tone="sunken" href="/workshop" className="w-full sm:w-auto">Explore Workshop</Button>
                <Button tone="grey" size="lg" href="/workshop/design-system" className="w-full sm:w-auto">View Design System</Button>
              </ButtonGroup>
            </div>
      </div>
    </section>
  )
}

export default HomeWorkshop
