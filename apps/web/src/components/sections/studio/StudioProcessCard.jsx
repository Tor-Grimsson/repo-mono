import { Button, FeatureSplit } from '@kolkrabbi/kol-component'
import ProfileCard from '../../ui/ProfileCard'

const StudioProcessCard = () => {
  return (
    <FeatureSplit
      kicker="Process"
      title="Interlocking systems"
      titleSize="heading-02"
      body={
        <>
          Kolkrabbi's process is based on observation: mapping problems, understanding and observing constraints, studying identities at component level, and rebuilding them with interlocking systems.
          <span className="block pt-4">
            Client services include identity creation, brand refresh, and product development. The end goal is to enable clients and collaborators with scalable concepts and modular tools that make future design choices intuitive and easy.
          </span>
        </>
      }
      ctas={
        <Button variant="secondary" href="/stack">
          Stack
        </Button>
      }
      media={
        <div className="flex items-center justify-center">
          <div className="hidden md:block"><ProfileCard variant="lg-h" /></div>
          <div className="md:hidden w-full"><ProfileCard variant="lg" className="w-full" /></div>
        </div>
      }
      mediaAspect="auto"
    />
  )
}

export default StudioProcessCard
