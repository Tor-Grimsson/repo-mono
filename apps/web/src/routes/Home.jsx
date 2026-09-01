// Home.jsx - Migrated from _nav-ref/kolkrabbi-home
import SEO from '../components/layout/SEO'
import HomeHero from '../components/sections/home/HomeHero'
import HomeAbout from '../components/sections/home/HomeAbout'
import { Button, SectionCards, ButtonGroup } from '@kolkrabbi/kol-component'
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

        <div className="kol-page py-6 md:py-8 lg:mt-16 flex flex-col gap-8">
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
              /* ButtonGroup, not a bare fragment (2026-08-31): the group is what
               * stacks the pair and makes them full-width below `sm`. Without it
               * these two sat side by side on a phone while the identical pair in
               * HomeWorkshop — which does use it — stacked correctly. */
              <ButtonGroup align="center">
                <Button variant="primary" size="lg" href="/work" className="w-full sm:w-auto">Explore Projects</Button>
                <Button variant="secondary" size="lg" href="mailto:hello@kolkrabbi.io" className="w-full sm:w-auto border border-fg-08">Get in Touch</Button>
              </ButtonGroup>
            }
          />

          {/* No `kol-page` here — the wrapper above owns the gutter. Nesting one
            * inside another doubles it (2026-08-31). */}
          <div className='pt-0 lg:mt-16'>
            <HomeHighlights />
          </div>
        </div>

        {/* Gradient section wrapper */}
        {/* No `kol-full-bleed` here (2026-08-31): it exists to CANCEL a page gutter,
          * and this wrapper's parent is bare `main` — so it only shifted the box -16
          * and fought the `kol-page` inside. The gradient layer is `absolute inset-0`
          * and already spans the full width without it. */}
        <div className="relative">
          {/* Background gradient layer */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, var(--kol-surface-primary), var(--kol-surface-contrast), var(--kol-surface-primary))' }}
          />

          {/* The gutter sits HERE, not on the block below (2026-08-31): the outer
            * wrapper is `kol-full-bleed`, which shifts its box -16px so the page
            * gutter can be cancelled. Anything inside it that is NOT meant to bleed
            * has to re-establish the gutter, and Instagram's own `px-4` only got it
            * back to 0. One owner for the whole gradient block. */}
          <div className="relative">
            {/* NO gutter on this wrapper (2026-08-31): Instagram's post marquee is
              * meant to run full width, and padding here clipped it. The gutter
              * belongs to the text inside the section, not to the section. */}
            <HomeInstagram />

            {/* NO `kol-page` here (2026-08-31): HomeFoundry renders the DS
              * `SectionSplit`, whose `.kol-section-split` already carries the page
              * gutter itself — stacking one here put its heading at 40 where the rest
              * of the page sits at 20. HomeWorkshop pads itself instead, since it
              * renders no self-padding organism. */}
            <div className="py-6 md:py-8 flex flex-col gap-8">
              <HomeWorkshop />

              <div>
                <HomeFoundry />
              </div>
            </div>
          </div>
        </div>

        <div className="kol-page py-6 md:py-8 flex flex-col gap-8">
          <div>
            <HomeSignup />
          </div>

          {/* Gutter owned by the wrapper above — see the note on HomeHighlights. */}
          <div className="pt-0">
            <StackLatest />
          </div>
        </div>

        {/* SectionCta ships no horizontal padding of its own, so the page owns it
          * here like every other block (2026-08-31). */}
        <div className="kol-page">
          <SectionCtaWrapper />
        </div>
      </main>
    </>
  )
}

export default Home
