import SEO from '../../../../components/layout/SEO'
import { OverviewHero, FoundryCTA } from '@kol/ui'
import FeaturesCardSection from '../../../../components/sections/shared/FeaturesCardSection'
import FoundryFeatureSection from '../../components/FoundryFeatureSection'
import ChapterNavigation from '../../../../components/sections/shared/ChapterNavigation'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/foundry'

const SpecimenTrollatungaHub = () => {
  // Quick links for specimen patterns
  const quickLinks = [
    {
      title: 'Complete Selection',
      description: 'Full specimen with display patterns',
      href: '/foundry/specimen/trollatunga/complete',
      icon: 'foundation',
      visual: `${cdnBase}/foundry-global/04-ql-specimen/01-quick-access.svg`,
      backgroundColor: 'bg-surface-on-inverse',
      imageAspectRatio: '9/6'
    },
    {
      title: 'Coming Soon',
      description: 'Additional specimens in development',
      href: null,
      icon: 'dashboard-book-open',
      visual: `${cdnBase}/foundry-global/04-ql-specimen/02-quick-access.svg`,
      backgroundColor: 'bg-surface-on-inverse',
      imageAspectRatio: '9/6'
    },
    {
      title: 'Licensing',
      description: 'Free under SIL OFL 1.1',
      href: '/foundry/licensing',
      icon: 'cone',
      visual: `${cdnBase}/foundry-global/04-ql-specimen/03-quick-access.svg`,
      backgroundColor: 'bg-surface-on-inverse',
      imageAspectRatio: '9/6'
    }
  ]

  // Specimen chapters for TOC navigation
  const specimenChapters = [
    {
      title: 'Character Set',
      subtitle: 'Complete Alphabet',
      description: 'Grid display of uppercase and lowercase alphabet.',
      href: '/foundry/specimen/trollatunga/complete#section-1'
    },
    {
      title: 'Waterfall',
      subtitle: 'Size Display',
      description: 'Type scale showing various display sizes.',
      href: '/foundry/specimen/trollatunga/complete#section-2'
    },
    {
      title: 'Poetry Display',
      subtitle: 'Editorial Layout',
      description: 'Icelandic poetry with dramatic typography.',
      href: '/foundry/specimen/trollatunga/complete#section-3'
    },
    {
      title: 'Ligatures',
      subtitle: 'Special Characters',
      description: 'Display of ligatures and character combinations.',
      href: '/foundry/specimen/trollatunga/complete#section-4'
    },
    {
      title: 'Weight Variations',
      subtitle: 'Font Weights',
      description: 'Comparison of light, regular, bold, and italic styles.',
      href: '/foundry/specimen/trollatunga/complete#section-5'
    }
  ]

  return (
    <>
      <SEO
        title="Tröllatunga Specimen — Kolkrabbi Foundry"
        description="Display typeface with expressive character. Explore specimen patterns showcasing dramatic applications."
        ogTitle="Tröllatunga Type Specimen"
        ogDescription="TG Tröllatunga specimen patterns"
        ogImage={`${cdnBase}/foundry-typefaces/05-trollatunga/specimen-trollatunga/01-specimen-hero/specimen-hero-1200.jpg`}
        ogUrl="https://kolkrabbi.io/foundry/specimen/trollatunga"
        canonical="https://kolkrabbi.io/foundry/specimen/trollatunga"
      />

      <main className="min-h-screen w-full bg-surface-primary mb-16 breakpoint-padding">
        {/* Hero Section */}
        <OverviewHero
          badge="Display"
          title={
            <span style={{ fontFamily: 'TGTrollatunga', fontWeight: 700, textTransform: 'none' }}>
              Tröllatunga
            </span>
          }
          description="A distinctive display typeface with bold personality and expressive character. Designed for headlines and dramatic statements."
          categories={['Display', 'Expressive', 'Editorial']}
        />

        {/* Featured Image */}
        <section className="w-full py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary flex items-center justify-center border border-fg-08">
              <img
                src={`${cdnBase}/foundry-typefaces/05-trollatunga/specimen-trollatunga/01-specimen-hero/specimen-hero-1600.jpg`}
                alt="Tröllatunga typeface specimen"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
              <div className="relative z-10 text-[120px] md:text-[256px] text-fg-96" style={{ fontFamily: 'TGTrollatunga', fontWeight: 700 }}>
                Tröllatunga
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <FeaturesCardSection
          sectionClassName="w-full py-16"
          wrapperClassName="max-w-[1400px] mx-auto flex flex-col gap-6"
          headerClassName="w-full"
          headerLabel="Navigation"
          headerDescription="Jump into specimen sections and typeface details"
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
              title="Display Typeface for Dramatic Impact"
              description="Display typeface with bold personality and expressive character. Designed for editorial headlines, posters, and dramatic statements."
              imagePosition="right"
              cta={{
                to: '/foundry/typefaces/trollatunga',
                label: 'View Typeface Details',
                className: 'mt-8'
              }}
              graphic={<img src={`${cdnBase}/foundry-typefaces/05-trollatunga/card-trollatunga/01-card/specimen-card-1200.jpg`} alt="Tröllatunga specimen" className="w-full aspect-[10/6] rounded object-cover border border-fg-08" />}
            />
          </div>
        </section>

        {/* Chapter Jump Links */}
        <ChapterNavigation
          title="Specimen Sections"
          description="Jump to specimen sections and display patterns"
          chapters={specimenChapters}
          variant="list"
        />

        {/* Specs Preview Card */}
        <section className="w-full h-[720px] flex items-center">
          <div className="max-w-[1400px] mx-auto">
            <FoundryFeatureSection
              label="Technical Specifications"
              title="Font Metrics & Details"
              description="Technical specifications including OpenType features, character set coverage, and file information."
              imagePosition="left"
              cta={{
                to: '#',
                label: 'Coming Soon',
                className: 'mt-8'
              }}
              graphic={<img src={`${cdnBase}/foundry-typefaces/05-trollatunga/card-trollatunga/02-card/specimen-card-1200.jpg`} alt="Tröllatunga specifications" className="w-full aspect-[10/6] rounded object-cover border border-fg-08" />}
            />
          </div>
        </section>

        {/* CTA */}
        <FoundryCTA
          heading="Download Tröllatunga"
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

export default SpecimenTrollatungaHub
