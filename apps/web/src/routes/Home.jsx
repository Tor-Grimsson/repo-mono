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
      <div>
        <HomeHero onVideoStart={onVideoStart} />
        <HomeAbout />
      </div>

      <div className="main-wrapper">
        <FeaturesCardSection />

        <div className="">
          <HomeHighlights />
        </div>

        <WorkshopFeatures />

        <div className="">
          <HomeFoundry />
        </div>

        <div className="">
          <HomeSignup />
        </div>
        
        <div className="card-wrapper">
          <CmsGlobal />
        </div>
      </div>

      <CtaGlobal />
    </main>
    </>
  )
}

export default Home
