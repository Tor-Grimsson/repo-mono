import SEO from '../../../../components/layout/SEO'
import { OverviewHero, FoundryCTA } from '@kol/ui'
import FeaturesCardSection from '../../../../components/sections/shared/FeaturesCardSection'
import FoundryFeatureSection from '../../components/FoundryFeatureSection'
import ChapterNavigation from '../../../../components/sections/shared/ChapterNavigation'

const SpecimenDylgjurHub = () => {
  // Quick Links data
  const quickLinks = [
    {
      title: 'Complete Selection',
      description: 'Full specimen with all display patterns',
      href: '/foundry/specimen/dylgjur/selection',
      icon: 'foundation',
      visual: '/img/typefaces/dylgjur/set-b-02.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Coming Soon',
      description: 'Additional specimens in development',
      href: null,
      icon: 'atomic-organism',
      visual: '/img/typefaces/dylgjur/set-b-02.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Licensing',
      description: 'Free under SIL OFL 1.1',
      href: '/foundry/licensing',
      icon: 'cone',
      visual: 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/foundry/01-foundry-overview/02-ql-navigation/ql-dark/ql-card-04/ql-b-card-04-800.jpg',
      backgroundColor: 'bg-surface-on-inverse'
    }
  ]

  // Specimen chapters for TOC navigation
  const proseChapters = [
    {
      title: 'Title Page',
      subtitle: 'Hero Specimen Display',
      description: 'Title page displaying the typeface name and letterforms.',
      href: '/foundry/specimen/dylgjur/selection#dylgjur-title'
    },
    {
      title: 'Word Grid',
      subtitle: 'Badge Layout System',
      description: 'Grid-based word display with badge styling showing UI and label applications.',
      href: '/foundry/specimen/dylgjur/selection#word-grid'
    },
    {
      title: 'Aa Specimen',
      subtitle: 'Character Showcase',
      description: 'Large Aa character pair for detailed examination at display scale.',
      href: '/foundry/specimen/dylgjur/selection#aa-specimen'
    },
    {
      title: 'Word List',
      subtitle: 'Display Typography',
      description: 'Vertical word arrangements demonstrating rhythm and weight variations.',
      href: '/foundry/specimen/dylgjur/selection#word-list'
    },
    {
      title: 'Ligatures',
      subtitle: 'Typographic Features',
      description: 'Special character combinations and OpenType features.',
      href: '/foundry/specimen/dylgjur/selection#ligature'
    },
    {
      title: 'Alphabet',
      subtitle: 'Complete Character Set',
      description: 'Full alphabet display in uppercase and lowercase.',
      href: '/foundry/specimen/dylgjur/selection#alphabet'
    },
    {
      title: 'Grid Layouts',
      subtitle: 'Modular Compositions',
      description: 'Grid-based layouts showing typographic hierarchy and structure.',
      href: '/foundry/specimen/dylgjur/selection#grid-layout-light'
    },
    {
      title: 'Flaður',
      subtitle: 'Layout',
      description: 'Flaður, companion layout.',
      href: '/foundry/specimen/dylgjur/selection#fladur-title'
    },
    {
      title: 'Grid Mixed',
      subtitle: 'Combined Patterns',
      description: 'Mixed content grid with ligatures and typographic details.',
      href: '/foundry/specimen/dylgjur/selection#grid-ligatures'
    },
    {
      title: 'Variable Weight',
      subtitle: 'Weight Specimens',
      description: 'Full range of font weights in fluid display layouts.',
      href: '/foundry/specimen/dylgjur/selection#raftjan'
    }
  ]

  return (
    <>
      <SEO
        title="Dylgjur Specimen — Kolkrabbi Foundry"
        description="Experimental sans-serif display typeface. Character set, ligatures, and typographic applications."
        ogTitle="Dylgjur Type Specimen"
        ogDescription="TG Dylgjur specimen showcasing editorial and display applications"
        ogImage="https://kolkrabbi.io/img/typefaces/dylgjur/set-b-02.png"
        ogUrl="https://kolkrabbi.io/foundry/specimen/dylgjur"
        canonical="https://kolkrabbi.io/foundry/specimen/dylgjur"
      />

      <main className="min-h-screen w-full bg-surface-primary mb-16">
        {/* Hero Section */}
        <OverviewHero
          badge="Sans Serif"
          title={
            <span style={{ fontFamily: 'TGDylgjur', textTransform: 'none' }}>
              Dylgjur
            </span>
          }
          description="Experimental sans-serif display typeface."
          categories={['Sans Serif', 'Editorial', 'Display']}
        />

        {/* Featured Image */}
        <section className="w-full py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary flex items-center justify-center">
              <img
                src="/img/typefaces/dylgjur/set-b-02.png"
                alt="Dylgjur typeface specimen"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
              <div className="relative z-10 text-[120px] md:text-[256px] text-fg-96" style={{ fontFamily: 'TGDylgjur', fontWeight: 300 }}>
                Dylgjur
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
          headerDescription="Jump into specimen sections and licensing"
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
              title="Sans-Serif Display Typeface"
              description="Experimental sans-serif display typeface. Includes ligatures and OpenType features for typographic layouts."
              imagePosition="right"
              cta={{
                to: '/foundry/typefaces/dylgjur',
                label: 'View Typeface Details',
                className: 'mt-8'
              }}
              graphic={<img src="/img/typefaces/dylgjur/set-b-02.png" alt="Dylgjur specimen" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* Chapter Jump Links */}
        <ChapterNavigation
          title="Specimen Sections"
          description="Jump to specimen sections and display patterns"
          chapters={proseChapters}
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
              graphic={<img src="/img/typefaces/dylgjur/set-b-02.png" alt="Dylgjur specifications" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* CTA */}
        <FoundryCTA
          heading="Download Dylgjur"
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

export default SpecimenDylgjurHub
