import SEO from '../components/layout/SEO'
import StudioProcessCard from '../components/sections/studio/StudioProcessCard'
import { SectionHero, SectionCards } from '@kolkrabbi/kol-component'
import { useFeatureCards } from '../hooks/useFeatureCards'
import SectionCtaWrapper from '../components/sections/shared/SectionCtaWrapper'

const cdnMood = 'https://b2.kolkrabbi.io/website/asset-library/cms/stack/mood'

export default function Studio() {
  const featureCards = useFeatureCards()

  return (
    <>
      <SEO
        title="Studio — Kolkrabbi"
        description="About Kolkrabbi studio"
        ogTitle="Kolkrabbi Studio"
        ogDescription="Kolkrabbi's design and collaborative services"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-01.png"
        ogUrl="https://kolkrabbi.io/studio"
        canonical="https://kolkrabbi.io/studio"
      />
      <main id="main">
        {/* Hero — SectionHero (SectionSet, component 0.71.0): the studio HLS
          * video with the about copy composed in the organism's own glass
          * panel. The hand-rolled StudioAboutCard overlay and the two-slide
          * FeaturedCarousel it sat on retired to _tmp/2026-08-26-studio-sectionset/. */}
        {/* Split variant at its own default height (full), under the fixed
          * navbar — no top padding. `overlayOpacity` 80 = brand landing's dark wash. */}
        <div>
          <SectionHero
            variant="split"
            theme="inverse"
            /* Still, not the HLS video (user 2026-08-26: decoding it spun the
             * fans) — the same mood still brand's landing runs. */
            /* A ready node, not the descriptor: the descriptor has no focal
             * point and the subject sits right of centre in the asset —
             * `objectPosition` is the one knob (user 2026-08-26: "focus the
             * image center"). The class is the hero's own cover-fit rule. */
            media={
              <img
                className="kol-full-bleed-hero-media"
                style={{ objectPosition: '70% 50%' }}
                src={`${cdnMood}/mood-05-1200.jpg`}
                srcSet={`${cdnMood}/mood-05-400.jpg 400w, ${cdnMood}/mood-05-800.jpg 800w, ${cdnMood}/mood-05-1200.jpg 1200w, ${cdnMood}/mood-05-1600.jpg 1600w`}
                sizes="100vw"
                alt=""
              />
            }
            overlayOpacity={80}
            label="Kolkrabbi Vinnustofa"
            headline="Design studio & Atelier based in Reykjavík"
            headlineSize="heading-02"
            panelMaxWidth="max-w-[600px]"
            /* the media is already scrimmed 80% — the panel's default 80% tint
             * on top read solid; 40 keeps it glass. */
            panelProps={{ surfaceOpacity: 40 }}
          />
        </div>

        {/* Below-fold content */}
        <div>
          <StudioProcessCard />
          {/* The four cards are the same set the home band shows, passed
            * explicitly — the organism carries no default content. */}
          <SectionCards
            features={featureCards}
            itemClassName="reveal"
            itemStyle={(i) => ({ '--reveal-delay': `${i * 0.15}s` })}
            headline="Services"
            body="Type design, visual identity, and design systems for brands."
            headerClassName="w-full pt-16"
            headerTextWidthClass="w-full md:w-[40%]"
            sectionClassName="pb-16"
          />
          <SectionCtaWrapper />
        </div>
      </main>
    </>
  )
}
