import StudioHero from '../components/sections/studio/StudioHero'
import StudioApproach from '../components/sections/studio/StudioApproach'
import StudioServices from '../components/sections/studio/StudioServices'
import StudioValues from '../components/sections/studio/StudioValues'
import StudioContact from '../components/sections/studio/StudioContact'
import { ImageSection } from '@kol/ui'
import CtaGlobal from '../components/sections/cta/CtaGlobal'

export default function Studio() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div>
        <StudioHero />
      </div>

      
      <div className="main-wrapper">
        <StudioApproach />

        <div className="card-wrapper">
          <StudioServices />
        </div>

         <div>
            <ImageSection
            src="/img/Kolk-img/trollatunga-2.png"
            alt="Kolkrabbi Studio workspace"
            />
         </div>


        <div className="">
          <StudioValues />
        </div>

        <div className="card-wrapper">
          <StudioContact />
        </div>
      </div>

      <CtaGlobal />
    </main>
  )
}
