// Home.jsx - Migrated from _nav-ref/kolkrabbi-home
import SEO from '../components/layout/SEO'
import HomeHero from '../components/sections/home/HomeHero'
import HomeAbout from '../components/sections/home/HomeAbout'
import FeaturesCardSection from '../components/sections/shared/FeaturesCardSection'
import HomeHighlights from '../components/sections/home/HomeHighlights'
import HomeFoundry from '../components/sections/home/HomeFoundry'
import WorkshopFeatures from '../components/sections/home/WorkshopFeatures'
import HomeSignup from '../components/sections/home/HomeSignup'
import CtaGlobal from '../components/sections/cta/CtaGlobal'
import CmsGlobal from '../components/sections/blog/CmsGlobal'

const Home = ({ onVideoStart }) => {
  return (
    <>
      <SEO
        title="Kolkrabbi — Design System, Type Foundry & Studio"
        description="Design system featuring custom typefaces, interactive specimens, design patterns, and creative explorations."
        ogTitle="Kolkrabbi — Design System & Type Foundry"
        ogDescription="Design system, custom typefaces, interactive specimens, and creative work."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/"
        canonical="https://kolkrabbi.io/"
      />
      <main className="min-h-screen w-full overflow-x-hidden">
        <HomeHero onVideoStart={onVideoStart} />

        <div className="px-6 md:px-8">
          <div className="pt-6 md:pt-8">
            <HomeAbout />
          </div>

          <div className="py-6 md:py-8 flex flex-col gap-8">
            <FeaturesCardSection />

            <div>
              <HomeHighlights />
            </div>

            <WorkshopFeatures />

            <div>
              <HomeFoundry />
            </div>

            <div>
              <HomeSignup />
            </div>

            <div className="card-wrapper">
              <CmsGlobal />
            </div>
          </div>

          <CtaGlobal />
        </div>
      </main>
    </>
  )
}

export default Home
