// Home.jsx - Migrated from _nav-ref/kolkrabbi-home
import SEO from '../components/layout/SEO'
import HomeHero from '../components/sections/home/HomeHero'
import HomeAbout from '../components/sections/home/HomeAbout'
import { Button, SectionCards } from '@kolkrabbi/kol-component'
import { useFeatureCards } from '../hooks/useFeatureCards'
import HomeHighlights from '../components/sections/home/HomeHighlights'
import HomeInstagram from '../components/sections/home/HomeInstagram'
import HomeFoundry from '../components/sections/home/HomeFoundry'
import HomeWorkshop from '../components/sections/home/HomeWorkshop'
import HomeSignup from '../components/sections/home/HomeSignup'
import SectionCtaWrapper from '../components/sections/shared/SectionCtaWrapper'
import StackLatest from '../components/sections/shared/StackLatest'

const Home = ({ onVideoStart }) => {
  const featureCards = useFeatureCards()

  return (
    <>
      <SEO
        title="Kolkrabbi Studio"
        description="Design studio, atelier & type foundry"
        ogTitle="Kolkrabbi — design studio, atelier & type foundry"
        ogDescription="Design studio, atelier & type foundry"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-01.png"
        ogUrl="https://kolkrabbi.io/"
        canonical="https://kolkrabbi.io/"
      />
      <main id="main" className="min-h-screen w-full">
        <HomeHero onVideoStart={onVideoStart} />

        <div className="kol-page pt-6 md:pt-8">
          <HomeAbout />
        </div>

        <div className="py-6 md:py-8 lg:mt-16 flex flex-col gap-8">
          {/* DS organism (0.38.0, hover-zoom wave) — content authored here, the
            * component is deliberately content-free. Copy verbatim from the
            * retired local fork's defaults. */}
          <SectionCards
            features={featureCards}
            itemClassName="reveal"
            itemStyle={(i) => ({ '--reveal-delay': `${i * 0.15}s` })}
            actionsClassName="reveal-group"
            headline="Typefaces & Design Systems"
            body="A design studio focused on typography, digital products, and creative technology."
            actions={
              <>
                <Button variant="primary" href="/work">Explore Projects</Button>
                <Button variant="secondary" href="mailto:hello@kolkrabbi.io" className="border border-fg-08">Get in Touch</Button>
              </>
            }
          />

          <div className='kol-page pt-0 lg:mt-16'>
            <HomeHighlights />
          </div>
        </div>

        {/* Gradient section wrapper */}
        <div className="relative kol-full-bleed">
          {/* Background gradient layer */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, var(--kol-surface-primary), var(--kol-surface-contrast), var(--kol-surface-primary))' }}
          />

          <div className="relative">
            <HomeInstagram />

            <div className="px-4 md:px-5 lg:px-6 py-6 md:py-8 flex flex-col gap-8">
              <HomeWorkshop />

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

          <div className="kol-page pt-0">
            <StackLatest />
          </div>
        </div>

        <SectionCtaWrapper />
      </main>
    </>
  )
}

export default Home
