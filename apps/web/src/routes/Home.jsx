// Home.jsx - Migrated from _nav-ref/kolkrabbi-home
import SEO from '../components/layout/SEO'
import HomeHero from '../components/sections/home/HomeHero'
import HomeAbout from '../components/sections/home/HomeAbout'
import FeaturesCardSection from '../components/sections/shared/FeaturesCardSection'
import HomeHighlights from '../components/sections/home/HomeHighlights'
import HomeInstagram from '../components/sections/home/HomeInstagram'
import HomeFoundry from '../components/sections/home/HomeFoundry'
import WorkshopFeatures from '../components/sections/home/WorkshopFeatures'
import HomeSignup from '../components/sections/home/HomeSignup'
import CtaGlobal from '../components/sections/cta/CtaGlobal'
import CmsGlobal from '../components/sections/blog/CmsGlobal'

const Home = ({ onVideoStart }) => {
  return (
    <>
      <SEO
        title="Kolkrabbi Studio"
        description="Design studio, atelier & type foundry"
        ogTitle="Kolkrabbi — design studio, atelier & type foundry"
        ogDescription="Design studio, atelier & type foundry"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/"
        canonical="https://kolkrabbi.io/"
      />
      <main className="min-h-screen w-full">
        <HomeHero onVideoStart={onVideoStart} />

        <div className="pt-6 md:pt-8">
          <HomeAbout />
        </div>

        <div className="py-6 md:py-8 lg:mt-16 flex flex-col gap-8">
          <FeaturesCardSection />

          <div className='lg:mt-16'>
            <HomeHighlights />
          </div>
        </div>

        {/* Gradient section wrapper */}
        <div className="relative full-bleed">
          {/* Background gradient layer */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, var(--kol-surface-primary), var(--kol-surface-contrast), var(--kol-surface-primary))' }}
          />

          <div className="relative px-4 md:px-6 lg:px-8">
            <HomeInstagram />

            <div className="py-6 md:py-8 flex flex-col gap-8">
              <WorkshopFeatures />

              <div>
                <HomeFoundry />
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 md:py-8 flex flex-col gap-8">
          <div>
            <HomeSignup />
          </div>

          <div className="">
            <CmsGlobal />
          </div>
        </div>

        <CtaGlobal />
      </main>
    </>
  )
}

export default Home
