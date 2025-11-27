import SEO from '../../../../components/layout/SEO'
import { OverviewHero, FoundryCTA } from '@kol/ui'
import FeaturesCardSection from '../../../../components/sections/shared/FeaturesCardSection'
import FoundryFeatureSection from '../../components/FoundryFeatureSection'
import ChapterNavigation from '../../../../components/sections/shared/ChapterNavigation'

const SpecimenGullhamrarHub = () => {
  // Quick Links data
  const quickLinks = [
    {
      title: 'Complete Selection',
      description: 'Full specimen with all prose patterns',
      href: '/foundry/specimen/gullhamrar/selection',
      icon: 'foundation',
      visual: '/img/typefaces/gullhamrar/set-f-03.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Ljóðstúfur',
      description: 'Contemporary poetry demonstrating layout structures',
      href: '/foundry/specimen/gullhamrar/poetry',
      icon: 'dashboard-book-open',
      visual: '/img/typefaces/gullhamrar/set-f-07.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Licensing',
      description: 'Free under SIL OFL 1.1',
      href: '/foundry/licensing',
      icon: 'cone',
      visual: '/img/home/feat-4.png',
      backgroundColor: 'bg-surface-on-inverse'
    }
  ]

  // Prose pattern chapters for TOC navigation
  const proseChapters = [
    {
      title: 'Title',
      subtitle: 'Hero Specimen Display',
      description: 'Large-scale title page showcasing the typeface name and character. Demonstrates presence in ceremonial contexts.',
      href: '/foundry/specimen/gullhamrar/selection#title-page'
    },
    {
      title: 'Ampersand',
      subtitle: 'Special Character Focus',
      description: 'Detailed view of ampersand and special characters at display size. Shows character design details and personality.',
      href: '/foundry/specimen/gullhamrar/selection#ampersand'
    },
    {
      title: 'Word List I',
      subtitle: 'Dual Column Layout',
      description: 'Side-by-side word lists showing weight and style variations. Demonstrates contrast and hierarchy in paired layouts.',
      href: '/foundry/specimen/gullhamrar/selection#word-list-dual'
    },
    {
      title: 'Aa Specimen',
      subtitle: 'Character Showcase',
      description: 'Large Aa character pair for detailed examination. Shows uppercase and lowercase relationship at display scale.',
      href: '/foundry/specimen/gullhamrar/selection#aa-specimen'
    },
    {
      title: 'Word List II',
      subtitle: 'Stacked Layout',
      description: 'Vertical arrangement of words with varying weights. Demonstrates rhythm and visual texture in stacked compositions.',
      href: '/foundry/specimen/gullhamrar/selection#word-list-stacked'
    },
    {
      title: 'Poetry',
      subtitle: 'Expressive Typography',
      description: 'Poetry layout showcasing expressive qualities. Demonstrates emotional range and character in literary contexts.',
      href: '/foundry/specimen/gullhamrar/selection#poetry'
    },
    {
      title: 'Signage',
      subtitle: 'Display Applications',
      description: 'Wayfinding and signage layouts at various scales. Shows performance in environmental and large-format applications.',
      href: '/foundry/specimen/gullhamrar/selection#signage'
    },
    {
      title: 'Poem Page',
      subtitle: 'Editorial Poetry Layout',
      description: 'Full page poetry composition with vertical dividers. Demonstrates sophisticated editorial design applications.',
      href: '/foundry/specimen/gullhamrar/selection#poem-page-1'
    },
    {
      title: 'Alphabet',
      subtitle: 'Complete Character Set',
      description: 'Full alphabet display in uppercase and lowercase. Shows complete character coverage and consistency across case.',
      href: '/foundry/specimen/gullhamrar/selection#alphabet-dual'
    },
    {
      title: 'Gullhamrar',
      subtitle: 'Character Grid Display',
      description: 'Comprehensive character set arranged in grid format. Demonstrates full glyph coverage and character design system.',
      href: '/foundry/specimen/gullhamrar/selection#character-set'
    },
    {
      title: 'Weight Variations',
      subtitle: 'Variable Font Axis',
      description: 'Dynamic weight variations from light to bold. Shows variable font capabilities and weight range flexibility.',
      href: '/foundry/specimen/gullhamrar/selection#variable-axis'
    }
  ]

  return (
    <>
      <SEO
        title="Gullhamrar Specimen — Kolkrabbi Foundry"
        description="Expressive sans-serif typeface."
        ogTitle="Gullhamrar Type Specimen"
        ogDescription="TG Gullhamrar specimen showcasing poetry and editorial applications"
        ogImage="https://kolkrabbi.io/img/typefaces/gullhamrar/set-f-05.png"
        ogUrl="https://kolkrabbi.io/foundry/specimen/gullhamrar"
        canonical="https://kolkrabbi.io/foundry/specimen/gullhamrar"
      />

      <main className="min-h-screen w-full bg-surface-primary mb-16">
        {/* Hero Section */}
        <OverviewHero
          badge="Display Serif"
          title={
            <span style={{ fontFamily: 'TGGullhamrar', textTransform: 'none' }}>
              Gullhamrar
            </span>
          }
          description="High-contrast display sans-serif typeface for expressive and literary design."
          categories={['Display', 'Serif', 'Editorial']}
        />

        {/* Featured Image */}
        <section className="w-full py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary flex items-center justify-center">
              <img
                src="/img/typefaces/gullhamrar/set-f-05.png"
                alt="Gullhamrar typeface specimen"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
              <div className="relative z-10 text-[120px] md:text-[256px] text-fg-96" style={{ fontFamily: 'TGGullhamrar', fontWeight: 300 }}>
                Gullhamrar
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <FeaturesCardSection
          sectionClassName="w-full py-16"
          wrapperClassName="max-w-[1400px] mx-auto flex flex-col gap-6"
          headerClassName="w-full"
          headerLabel="Quick Access"
          headerDescription="Poetry specimens and character set examples"
          cardsWrapperClassName="grid grid-cols-1 md:grid-cols-3 gap-6"
          features={quickLinks}
          showHeader={true}
          showActions={false}
        />

        {/* About Section */}
        <section className="w-full h-[720px] flex items-center">
          <div className="max-w-[1400px] mx-auto">
            <FoundryFeatureSection
              label="About the Typeface"
              title="Display Sans-Serif"
              description="TG Gullhamrar is a high-contrast display sans-serif designed for editorial headlines, experimental layouts, and literary applications. The typeface features sharp terminals and extended character forms suited for large-scale display typography."
              imagePosition="right"
              cta={{
                to: '/foundry/typefaces/gullhamrar',
                label: 'View Typeface Details',
                className: 'mt-8'
              }}
              graphic={<img src="/img/typefaces/gullhamrar/set-f-07.png" alt="Gullhamrar specimen" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* Chapter Jump Links */}
        <ChapterNavigation
          title="Specimen Sections"
          description="Jump to specific display patterns and layouts in the complete selection"
          chapters={proseChapters}
          variant="list"
        />

        {/* Specs Preview Card */}
        <section className="w-full h-[720px] flex items-center">
          <div className="max-w-[1400px] mx-auto">
            <FoundryFeatureSection
              label="Technical Specifications"
              title="Font Metrics & Details"
              description="Complete technical specifications including variable axes, OpenType features, character set coverage, and file information."
              imagePosition="left"
              cta={{
                to: '#',
                label: 'Coming Soon',
                className: 'mt-8'
              }}
              graphic={<img src="/img/typefaces/gullhamrar/set-f-05.png" alt="Gullhamrar specifications" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* CTA */}
        <FoundryCTA
          heading="Download Gullhamrar"
          description="Free for personal and commercial use under SIL Open Font License."
          action={{
            to: '/foundry/licensing',
            label: 'View License & Download'
          }}
        />
      </main>
    </>
  )
}

export default SpecimenGullhamrarHub
