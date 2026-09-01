import { useNavigate } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { TypefaceLibraryGridWithVariables } from '@kolkrabbi/kol-foundry'
import InDevelopmentSection from '../../components/sections/foundry/InDevelopmentSection'
import { SectionHero, SectionCta, Button } from '@kolkrabbi/kol-component'

const cdnBase = 'https://b2.kolkrabbi.io/website/asset-library/foundry'

const FoundryTypefaces = () => {
  const navigate = useNavigate()
  // Weight variants and axes for variable fonts
  const typefaceWeights = {
    'TG Málrómur': [
      { weight: 'Light', value: 200, axis: 'wght' },
      { weight: 'Regular', value: 300, axis: 'wght' },
      { weight: 'Medium', value: 400, axis: 'wght' },
      { weight: 'SemiBold', value: 500, axis: 'wght' },
      { weight: 'Bold', value: 700, axis: 'wght' },
      { weight: 'Black', value: 900, axis: 'wght' }
    ],
    'TG Rót': [
      // Weight axis
      { weight: 'Light', value: 200, axis: 'wght' },
      { weight: 'Regular', value: 400, axis: 'wght' },
      { weight: 'Medium', value: 500, axis: 'wght' },
      { weight: 'Bold', value: 700, axis: 'wght' },
      { weight: 'Black', value: 900, axis: 'wght' },
      // Width axis
      { weight: 'Narrow', value: 75, axis: 'wdth' },
      { weight: 'Normal', value: 100, axis: 'wdth' },
      { weight: 'Extended', value: 125, axis: 'wdth' }
    ],
    'TG Gullhamrar': [
      { weight: 'Light', value: 200, axis: 'wght' },
      { weight: 'Regular', value: 400, axis: 'wght' },
      { weight: 'Medium', value: 500, axis: 'wght' },
      { weight: 'Bold', value: 700, axis: 'wght' },
      { weight: 'Black', value: 900, axis: 'wght' }
    ],
    'TG Dylgjur': [
      { weight: 'Regular', value: 400, axis: 'wght' }
    ],
    'TG Tröllatunga': [
      { weight: 'Regular', value: 400, axis: 'wght' }
    ]
  }

  const typefaces = [
    {
      name: 'TG Málrómur',
      subtitle: 'Voice Characteristic',
      description: 'A contemporary italic variable font for editorial design',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, slnt)',
      link: '/foundry/typefaces/malromur',
      specimens: [
        { name: 'Variable Axis', link: '/foundry/specimen/two' },
        { name: 'Prose Styles', link: '/foundry/specimen/prose' }
      ]
    },
    {
      name: 'TG Rót',
      subtitle: 'Root',
      description: 'Precise geometric sans serif with variable weight and width axes',
      classification: 'Sans Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, wdth)',
      link: '/foundry/typefaces/root',
      specimens: []
    },
    {
      name: 'TG Tröllatunga',
      subtitle: 'Troll Tongue',
      description: 'Display typeface with expressive character',
      classification: 'Display',
      status: 'Available',
      year: '2025',
      styles: 'Regular',
      link: '/foundry/typefaces/trollatunga',
      specimens: []
    },
    {
      name: 'TG Dylgjur',
      subtitle: 'Falsehood',
      description: 'Sharp angles and pointed character for critical discourse',
      classification: 'Sans Serif',
      status: 'Available',
      year: '2025',
      styles: 'Regular',
      link: '/foundry/typefaces/dylgjur',
      specimens: []
    },
    {
      name: 'TG Gullhamrar',
      subtitle: 'Compliments',
      description: 'Variable weight typeface with warm, graceful forms',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght)',
      link: '/foundry/typefaces/gullhamrar',
      specimens: []
    }
  ]

  const upcomingTypefaces = [
    {
      name: 'TG Silfurbarki',
      subtitle: 'Silver Bark',
      description: 'Organic display typeface inspired by birch bark textures',
      classification: 'Display',
      status: 'In Development',
      year: '2025',
      styles: 'Regular'
    },
    {
      name: 'TG Orðspor',
      subtitle: 'Reputation',
      description: 'Editorial serif with strong personality for headlines',
      classification: 'Serif',
      status: 'In Development',
      year: '2025',
      styles: 'Variable (wght)'
    },
    {
      name: 'TG Einbreið',
      subtitle: 'Single Width',
      description: 'Monospaced for technical applications and code',
      classification: 'Monospace',
      status: 'In Development',
      year: '2026',
      styles: 'Variable (wght)'
    }
  ]

  // Hero still — the Málrómur carousel frame (the five-slide carousel retired
  // for the studio's split hero, user 2026-08-27)
  const heroStill = `${cdnBase}/foundry-global/01-carousel/carousel-malromur/carousel-malromur-1200.jpg`

  return (
    <>
      <SEO
        title="All Typefaces — Kolkrabbi Foundry"
        description="Browse our complete library of free, open-source typefaces including Málrómur, Rót, Gullhamrar, and more."
        ogTitle="Kolkrabbi Typeface Library"
        ogDescription="Browse all available free typefaces from Kolkrabbi"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-01.png"
        ogUrl="https://kolkrabbi.io/foundry/typefaces"
        canonical="https://kolkrabbi.io/foundry/typefaces"
      />
      <main id="main" className="min-h-screen w-full bg-surface-primary">
      {/* Hero — the studio's split hero: one still, 80% wash, the copy in the
        * organism's glass panel. */}
      <SectionHero
        /* Clears the fixed 68px navbar (2026-08-31). The bar is opaque and
         * floats over every page; a full-bleed hero starts at top:0 and loses
         * its first 68px underneath it. */
        className="mt-[var(--kol-nav-h)]"
        variant="split"
        theme="inverse"
        media={<img className="kol-full-bleed-hero-media" style={{ objectPosition: '0% 50%' }} src={heroStill} alt="" />}
        overlayOpacity={80}
        headline={<>Kolkrabbi Foundry<br />Typeface Library</>}
        headlineSize="heading-01"
        panelMaxWidth="max-w-[600px]"
        panelProps={{ surfaceOpacity: 40 }}
      />

      {/* All Typefaces Grid with Variable Preview and Typeface Filter */}
      {/* the ruled owner, not `breakpoint-padding` (PageGutterOwnership, 2026-08-30).
        * kol-foundry's grid carries its own `max-w-[cap] mx-auto` inside this, which
        * then clamps to this box — so content lands on the same 1704 as every other
        * page instead of spending the whole cap. */}
      <div className="kol-page pt-0">
      <TypefaceLibraryGridWithVariables
        typefaces={typefaces}
        typefaceWeights={typefaceWeights}
        totalCount={typefaces.length}
        onNavigate={(href, e) => { e.preventDefault(); navigate(href) }}
      />

      {/* Coming Soon */}
      <InDevelopmentSection typefaces={upcomingTypefaces} />

      {/* Licence — the slug pages' CTA, same strings */}
      <SectionCta
        variant="centered"
        headline="Licence"
        body="All Kolkrabbi typefaces are free for personal and commercial use. No sign-up, no tracking, no restrictions on usage."
        actions={
          <Button variant="primary" href="/foundry/licensing" onClick={(e) => { e.preventDefault(); navigate('/foundry/licensing') }}>
            Licence details
          </Button>
        }
      />
      </div>

    </main>
    </>
  )
}

export default FoundryTypefaces
