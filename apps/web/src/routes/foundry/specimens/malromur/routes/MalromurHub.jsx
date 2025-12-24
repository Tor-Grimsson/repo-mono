import SEO from '../../../../../components/layout/SEO'
import { OverviewHero, FoundryCTA } from '@kol/ui'
import FeaturesCardSection from '../../../../../components/sections/shared/FeaturesCardSection'
import FoundryFeatureSection from '../../../components/FoundryFeatureSection'
import ChapterNavigation from '../../../../../components/sections/shared/ChapterNavigation'

const SpecimenMalromurHub = () => {
  // Quick Links data
  const quickLinks = [
    {
      title: 'Complete Selection',
      description: 'Full specimen with all prose patterns',
      href: '/foundry/specimen/malromur/selection',
      icon: 'dashboard-book-open',
      visual: '/img/typefaces/malromur/set-a-01.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Specifications',
      description: 'Technical details and font metrics',
      href: '/foundry/specimen/malromur/specs',
      icon: 'bolt',
      visual: '/img/typefaces/malromur/set-a-02.png',
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

  // Prose pattern chapters for TOC navigation
  const proseChapters = [
    {
      title: 'Editorial',
      subtitle: 'Magazine & Journal Layout',
      description: 'Multi-column articles with sidebar, pull quotes, and specimen details. Demonstrates how the typeface performs in long-form editorial contexts.',
      href: '/foundry/specimen/malromur/selection#editorial'
    },
    {
      title: 'Data Tables',
      subtitle: 'Structured Information Design',
      description: 'Complex tabular data with headers, cells, and hierarchical information. Shows typeface clarity in dense technical layouts.',
      href: '/foundry/specimen/malromur/selection#data-tables'
    },
    {
      title: 'Menu Design',
      subtitle: 'Restaurant & Hospitality',
      description: 'Multi-section menu layouts with pricing, descriptions, and categories. Demonstrates elegance in service industry applications.',
      href: '/foundry/specimen/malromur/selection#menu'
    },
    {
      title: 'Newsletter',
      subtitle: 'Email & Digital Publishing',
      description: 'Newsletter templates with headlines, body text, and calls-to-action. Shows performance in digital communication formats.',
      href: '/foundry/specimen/malromur/selection#newsletter'
    },
    {
      title: 'Index/Directory',
      subtitle: 'Reference & Navigation',
      description: 'Alphabetical listings with page numbers and cross-references. Demonstrates typeface utility in reference materials.',
      href: '/foundry/specimen/malromur/selection#index'
    },
    {
      title: 'Chapter Opening',
      subtitle: 'Book & Publication Design',
      description: 'Chapter title pages with numbers, headings, and introductory text. Shows typeface character in editorial hierarchies.',
      href: '/foundry/specimen/malromur/selection#chapter'
    },
    {
      title: 'Table of Contents',
      subtitle: 'Navigation Systems',
      description: 'Multi-level TOC with sections, subsections, and page numbers. Demonstrates organization in complex documents.',
      href: '/foundry/specimen/malromur/selection#toc'
    },
    {
      title: 'Title Page',
      subtitle: 'Cover & Frontmatter',
      description: 'Book title pages with author, publisher, and publication details. Shows typeface presence in ceremonial contexts.',
      href: '/foundry/specimen/malromur/selection#title-page'
    }
  ]

  return (
    <>
      <SEO
        title="Málrómur Specimen — Kolkrabbi Foundry"
        description="Variable serif typeface for editorial and scholarly applications. Explore prose patterns, specifications, and complete character set."
      />

      <main className="min-h-screen w-full bg-surface-primary mb-16">
        {/* Hero Section */}
        <OverviewHero
          badge="Variable Serif"
          title={
            <span style={{ fontFamily: 'TGMalromur', fontStyle: 'italic', textTransform: 'none' }}>
              Málrómur
            </span>
          }
          description="An elegant italic variable typeface built for editorial systems. With refined forms and a complete weight range, Málrómur excels in long-form reading contexts."
          categories={['Serif', 'Variable', 'Editorial']}
        />

        {/* Featured Image */}
        <section className="w-full py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary flex items-center justify-center">
              <img
                src="/img/typefaces/malromur/set-a-04.png"
                alt="Málrómur typeface specimen"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
              <div className="relative z-10 text-[120px] md:text-[256px] text-fg-96" style={{ fontFamily: 'TGMalromur', fontWeight: 500, fontStyle: 'italic' }}>
                Málrómur
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
          headerDescription="Explore the specimen, review specs, or check licensing"
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
              title="Designed for Editorial Systems"
              description="TG Málrómur is a contemporary italic variable font built for editorial systems. With a variable weight axis ranging from Light (200) to ExtraBold (800), it provides complete flexibility for editorial hierarchies and long-form reading contexts. The refined italic forms bring character and elegance to scholarly typography while maintaining exceptional clarity."
              imagePosition="right"
              cta={{
                to: '/foundry/malromur',
                label: 'View Typeface Details',
                className: 'mt-8'
              }}
              graphic={<img src="/img/typefaces/malromur/set-a-04.png" alt="Málrómur specimen" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* Chapter Jump Links */}
        <ChapterNavigation
          title="Prose Styles"
          description="Jump to specific editorial patterns and layouts in the complete selection"
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
                to: '/foundry/specimen/malromur/specs',
                label: 'View Full Specifications',
                className: 'mt-8'
              }}
            graphic={<img src="/img/typefaces/malromur/set-a-04.png" alt="Málrómur specifications" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* CTA */}
        <FoundryCTA
          heading="Download Málrómur"
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

export default SpecimenMalromurHub
