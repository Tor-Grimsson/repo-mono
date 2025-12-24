import SEO from '../../../../components/layout/SEO'
import { OverviewHero, FoundryCTA } from '@kol/ui'
import FeaturesCardSection from '../../../../components/sections/shared/FeaturesCardSection'
import FoundryFeatureSection from '../../components/FoundryFeatureSection'
import ChapterNavigation from '../../../../components/sections/shared/ChapterNavigation'

const SpecimenOrdsporHub = () => {
  // Quick Links data
  const quickLinks = [
    {
      title: 'Complete Selection',
      description: 'Full specimen with all grid patterns',
      href: '/foundry/specimen/ordspor/complete',
      icon: 'foundation',
      visual: '/img/typefaces/ordspor/set-ordspor-01.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Coming Soon',
      description: 'Additional specimens in development',
      href: null,
      icon: 'dashboard-book-open',
      visual: '/img/typefaces/ordspor/set-ordspor-04.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Licensing',
      description: 'License information coming soon',
      href: '/foundry/licensing',
      icon: 'cone',
      visual: 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/foundry/01-foundry-overview/02-ql-navigation/ql-dark/ql-card-04/ql-b-card-04-800.jpg',
      backgroundColor: 'bg-surface-on-inverse'
    }
  ]

  // Specimen chapters for navigation
  const specimenChapters = [
    {
      title: 'Grid System Intro',
      subtitle: 'Modular Typography',
      description: 'Introduction to the Swiss-inspired grid system with 10-column layout.',
      href: '/foundry/specimen/ordspor/complete#section-1'
    },
    {
      title: '10 Columns',
      subtitle: 'Grid Visualization',
      description: 'Visual demonstration of the 10-column grid structure.',
      href: '/foundry/specimen/ordspor/complete#section-2'
    },
    {
      title: 'Two Columns',
      subtitle: 'Equal Divisions',
      description: 'Balanced two-column layout for articles and documentation.',
      href: '/foundry/specimen/ordspor/complete#section-3'
    },
    {
      title: 'Three Columns',
      subtitle: 'Feature Grid',
      description: 'Three-column pattern for feature comparisons and product layouts.',
      href: '/foundry/specimen/ordspor/complete#section-4'
    },
    {
      title: 'Asymmetric Layout',
      subtitle: 'Visual Hierarchy',
      description: 'Asymmetric column divisions creating dynamic visual interest.',
      href: '/foundry/specimen/ordspor/complete#section-5'
    },
    {
      title: 'Complex Grid',
      subtitle: 'Mixed Layouts',
      description: 'Complex grid patterns with varying column proportions.',
      href: '/foundry/specimen/ordspor/complete#section-6'
    },
    {
      title: 'Baseline Grid',
      subtitle: 'Vertical Rhythm',
      description: 'Baseline grid demonstration with 24px vertical rhythm.',
      href: '/foundry/specimen/ordspor/complete#section-7'
    },
    {
      title: 'Editorial Layout',
      subtitle: '3 + 6 + 1 Pattern',
      description: 'Editorial layout with margins, main content, and sidebar.',
      href: '/foundry/specimen/ordspor/complete#section-8'
    },
    {
      title: 'Type Sizes',
      subtitle: 'Scale System',
      description: 'Typographic scale demonstration showing hierarchy.',
      href: '/foundry/specimen/ordspor/complete#section-9'
    }
  ]

  return (
    <>
      <SEO
        title="Orðspor Specimen — Kolkrabbi Foundry"
        description="Variable weight sans serif typeface in development. Explore layout grid systems and typographic pattern previews."
        ogTitle="Orðspor Type Specimen — In Development"
        ogDescription="TG Orðspor specimen previews showcasing grid systems"
        ogImage="https://kolkrabbi.io/img/typefaces/ordspor/set-ordspor-01.png"
        ogUrl="https://kolkrabbi.io/foundry/specimen/ordspor"
        canonical="https://kolkrabbi.io/foundry/specimen/ordspor"
      />

      <main className="min-h-screen w-full bg-surface-primary mb-16">
        {/* Hero Section */}
        <OverviewHero
          badge="Variable Sans Serif"
          title={
            <span style={{ fontFamily: 'TGOrdspor', fontWeight: 700, textTransform: 'none' }}>
              Orðspor
            </span>
          }
          description="A variable weight sans serif typeface for impactful statements. Currently in development with grid system specimens available for preview."
          categories={['Sans Serif', 'Variable', 'Display']}
        />

        {/* Featured Image */}
        <section className="w-full py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary flex items-center justify-center">
              <img
                src="/img/typefaces/ordspor/set-ordspor-01.png"
                alt="Orðspor typeface specimen"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
              <div className="relative z-10 text-[120px] md:text-[256px] text-fg-96" style={{ fontFamily: 'TGOrdspor', fontWeight: 700 }}>
                Orðspor
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
              title="Variable Sans-Serif for Grid Systems"
              description="Variable weight sans-serif typeface currently in development. Designed for structured grid layouts and typographic systems with Swiss design principles."
              imagePosition="right"
              cta={{
                to: '/foundry/typefaces/ordspor',
                label: 'View Typeface Details',
                className: 'mt-8'
              }}
              graphic={<img src="/img/typefaces/ordspor/set-ordspor-02.png" alt="Orðspor specimen" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* Chapter Jump Links */}
        <ChapterNavigation
          title="Specimen Sections"
          description="Jump to specimen sections and grid patterns"
          chapters={specimenChapters}
          variant="list"
        />

        {/* Specs Preview Card */}
        <section className="w-full h-[720px] flex items-center">
          <div className="max-w-[1400px] mx-auto">
            <FoundryFeatureSection
              label="Technical Specifications"
              title="Font Metrics & Details"
              description="Technical specifications including variable axes, OpenType features, character set coverage, and file information."
              imagePosition="left"
              cta={{
                to: '#',
                label: 'Coming Soon',
                className: 'mt-8'
              }}
              graphic={<img src="/img/typefaces/ordspor/set-ordspor-03.png" alt="Orðspor specifications" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* CTA */}
        <FoundryCTA
          heading="Stay Updated on Orðspor"
          description="Typeface in development. Check back for updates on release."
          action={{
            to: '/foundry/licensing',
            label: 'View Licensing Info'
          }}
        />
      </main>
    </>
  )
}

export default SpecimenOrdsporHub
