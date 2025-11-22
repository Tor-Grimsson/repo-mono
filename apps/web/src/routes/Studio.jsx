import SEO from '../components/layout/SEO'
import StudioHero from '../components/sections/studio/StudioHero'
import StudioApproach from '../components/sections/studio/StudioApproach'
import StudioServices from '../components/sections/studio/StudioServices'
import StudioContact from '../components/sections/studio/StudioContact'
import { ImageSection } from '@kol/ui'
import CtaGlobal from '../components/sections/cta/CtaGlobal'

export default function Studio() {
  return (
    <>
      <SEO
        title="Studio — Kolkrabbi"
        description="Learn about Kolkrabbi's design approach, services, and collaborative process."
        ogTitle="Our Studio"
        ogDescription="Discover our design philosophy and collaborative services"
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

      <div className="main-wrapper">
        <StudioApproach />

        <div className="">
          <StudioServices />
        </div>

        
      </div>

      <CtaGlobal />
    </main>
    </>
  )
}
