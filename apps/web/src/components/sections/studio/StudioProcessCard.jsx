import { SectionSplit } from '@kolkrabbi/kol-component'
import ProfileCard from '../../ui/ProfileCard'

const StudioProcessCard = () => {
  return (
    <SectionSplit
      height="40"
      label="Process"
      slotClass={{ label: 'reveal', headline: 'reveal', body: 'reveal' }}
      slotStyle={{ label: { '--reveal-delay': '0s' }, headline: { '--reveal-delay': '0.1s' }, body: { '--reveal-delay': '0.2s' } }}
      headline="Interlocking systems"
      headlineSize="heading-02"
      body={
        <>
          Kolkrabbi's process is based on observation: mapping problems, understanding and observing constraints, studying identities at component level, and rebuilding them with interlocking systems.
          <span className="block pt-4">
            Client services include identity creation, brand refresh, and product development. The end goal is to enable clients and collaborators with scalable concepts and modular tools that make future design choices intuitive and easy.
          </span>
        </>
      }
      media={
        <div className="flex items-center justify-center w-full">
          <div className="hidden md:block w-full"><ProfileCard variant="lg-h" className="w-full" /></div>
          <div className="md:hidden w-full"><ProfileCard variant="lg" className="w-full" /></div>
        </div>
      }
      ratio="auto"
    />
  )
}

export default StudioProcessCard
