import SEO from '../components/layout/SEO'
import StudioHero from '../components/sections/studio/StudioHero'
import StudioApproach from '../components/sections/studio/StudioApproach'
import FeaturesCardSection from '../components/sections/shared/FeaturesCardSection'
import StudioContact from '../components/sections/studio/StudioContact'
import { ImageSection } from '@kol/ui'
import CtaGlobal from '../components/sections/cta/CtaGlobal'

const services = [
  {
    title: 'Visual Identity',
    icon: 'component',
    visual: '/img/home/feat-2.png',
    description: 'Brand strategy, logo design, and visual systems for brand identity.',
    href: '/work'
  },
  {
    title: 'Type Design',
    icon: 'foundation',
    visual: '/img/home/feat-1.png',
    description: 'Custom typeface design, specimens library & licensing.',
    href: '/foundry'
  },
  {
    title: 'Design Systems',
    icon: 'styleguide',
    visual: '/img/home/feat-3.png',
    description: 'Component libraries, style guide, design tokens, and documentation.',
    href: '/workshop'
  },
  {
    title: 'Use Cases',
    icon: 'black-bishop',
    visual: '/img/home/feat-4.png',
    description: 'Creative direction for visual campaigns, editorial projects, and brand evolution.',
    href: '/work'
  }
]

export default function Studio() {
  return (
    <>
      <SEO
        title="Studio — Kolkrabbi"
        description="Learn about Kolkrabbi's design approach, services, and collaborative process."
        ogTitle="Kolkrabbi Studio"
        ogDescription="Kolkrabbi's design philosophy and collaborative services"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/studio"
        canonical="https://kolkrabbi.io/studio"
      />
      <main className="min-h-screen w-full overflow-x-hidden">
      <div>
        <StudioHero />
      </div>

      <div>
        <ImageSection

        />
      </div>

      <div className="py-6 md:py-8 flex flex-col gap-8">
        <StudioApproach />

        <div className="">
          <FeaturesCardSection
            features={services}
            headerLabel="Services"
            headerDescription="Visual identity, typography, and design systems."
            actions={[
              {
                label: 'View Work',
                variant: 'primary',
                href: '/work'
              }
            ]}
            headerClassName="w-full pt-16"
            headerTextWidthClass="w-full md:w-[40%]"
            buttonGroupClassName="pt-10 pb-16"
          />
        </div>


      </div>

      <CtaGlobal />
    </main>
    </>
  )
}
