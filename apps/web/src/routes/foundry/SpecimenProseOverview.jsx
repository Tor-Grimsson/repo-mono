import { Link } from 'react-router-dom'

export default function SpecimenProseOverview() {
  const proseStyles = [
    {
      id: 'editorial',
      title: 'Editorial',
      subtitle: 'Magazine & Journal Layout',
      description: 'Multi-column articles with sidebar, pull quotes, and specimen details. Demonstrates how the typeface performs in long-form editorial contexts.',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="grid grid-cols-12 gap-4 h-full">
            <div className="col-span-7 space-y-3">
              <div className="space-y-1">
                <div className="h-8 w-20 bg-black/80"></div>
                <div className="h-8 w-32 bg-black/80"></div>
                <div className="h-8 w-24 bg-black/80"></div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-black/40"></div>
                <div className="h-2 w-full bg-black/40"></div>
                <div className="h-2 w-[90%] bg-black/40"></div>
              </div>
            </div>
            <div className="col-span-5 bg-[#E8DCC0] p-4 space-y-2">
              <div className="h-1 w-16 bg-black/60"></div>
              <div className="h-2 w-full bg-black/30"></div>
              <div className="h-2 w-[85%] bg-black/30"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-table',
      title: 'Data Tables',
      subtitle: 'Scientific Observations',
      description: 'Clean, semantic table structures for presenting quantitative data. Perfect for scientific publications, research papers, and technical documentation.',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8 flex items-center">
          <div className="w-full space-y-2">
            <div className="flex gap-4 border-b-2 border-black pb-2">
              <div className="flex-1 h-2 bg-black/60"></div>
              <div className="w-16 h-2 bg-black/60"></div>
              <div className="w-16 h-2 bg-black/60"></div>
              <div className="w-16 h-2 bg-black/60"></div>
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4 border-b border-black/20 py-2">
                <div className="flex-1 h-2 bg-black/40"></div>
                <div className="w-16 h-2 bg-black/30"></div>
                <div className="w-16 h-2 bg-black/30"></div>
                <div className="w-16 h-2 bg-black/30"></div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'menu',
      title: 'Menu Design',
      subtitle: 'Bill of Fare',
      description: 'Restaurant and hospitality typography. Elegant category organization, hierarchical item lists, and formal presentation suitable for fine dining.',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <div className="h-1 w-20 bg-black/80 mx-auto"></div>
              <div className="h-1 w-32 bg-black/40 mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-2 w-20 bg-black/60 mx-auto"></div>
                <div className="space-y-2">
                  <div className="h-1 w-32 bg-black/30 mx-auto"></div>
                  <div className="h-1 w-28 bg-black/30 mx-auto"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-16 bg-black/60 mx-auto"></div>
                <div className="space-y-2">
                  <div className="h-1 w-24 bg-black/30 mx-auto"></div>
                  <div className="h-1 w-32 bg-black/30 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      subtitle: 'Multi-Column Publications',
      description: 'Academic bulletins and scientific newsletters. Three-column text flow, article hierarchy, and field note formatting for scholarly communications.',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="h-6 w-40 bg-black/80"></div>
              <div className="h-3 w-32 bg-black/50"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-1 w-full bg-black/30"></div>
                  <div className="h-1 w-full bg-black/30"></div>
                  <div className="h-1 w-[90%] bg-black/30"></div>
                  <div className="h-1 w-full bg-black/30"></div>
                  <div className="h-1 w-[80%] bg-black/30"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'index',
      title: 'Index & Directory',
      subtitle: 'Reference Materials',
      description: 'Dense information design for glossaries, dictionaries, and directories. Bold terms with indented definitions in a three-column layout.',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, col) => (
              <div key={col} className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-2 w-24 bg-black/70"></div>
                    <div className="h-1 w-32 bg-black/30 ml-3"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'chapter',
      title: 'Chapter Opening',
      subtitle: 'Book Interior',
      description: 'Two-page spread simulation with generous margins. Chapter numbering, titles, and opening paragraphs demonstrating book typography.',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="grid grid-cols-2 gap-12 h-full">
            <div className="flex items-center justify-end">
              <div className="text-right space-y-2">
                <div className="h-2 w-24 bg-black/40 ml-auto"></div>
                <div className="h-6 w-32 bg-black/80 ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="space-y-3">
                <div className="h-2 w-40 bg-black/50"></div>
                <div className="space-y-2">
                  <div className="h-1 w-full bg-black/30"></div>
                  <div className="h-1 w-full bg-black/30"></div>
                  <div className="h-1 w-[90%] bg-black/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'table-of-contents',
      title: 'Table of Contents',
      subtitle: 'Navigation & Structure',
      description: 'Leader dots connecting entries to page numbers. Demonstrates hierarchical organization with indentation and proper typographic navigation.',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8 flex items-center">
          <div className="w-full space-y-3">
            <div className="h-4 w-48 bg-black/70 mx-auto mb-6"></div>
            <div className="border-t-2 border-b-2 border-black py-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`h-2 w-32 bg-black/60 ${i === 2 ? 'ml-6' : ''}`}></div>
                  <div className="flex-1 border-b border-dotted border-black/40"></div>
                  <div className="h-2 w-6 bg-black/60"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'title-page',
      title: 'Title Page',
      subtitle: 'Entry Point',
      description: 'Elegant centered title page with horizontal rules, italic subtitles, and foundry attribution. Sets the tone for the entire specimen.',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-8 w-64 bg-black/80 mx-auto"></div>
            <div className="h-[1px] w-32 bg-black mx-auto"></div>
            <div className="h-3 w-48 bg-black/50 mx-auto"></div>
            <div className="h-[1px] w-32 bg-black mx-auto"></div>
            <div className="space-y-2 pt-8">
              <div className="h-2 w-40 bg-black/30 mx-auto"></div>
              <div className="h-2 w-36 bg-black/30 mx-auto"></div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="w-full min-h-screen bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full min-h-[60vh] flex items-center justify-center px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <h1 className="text-auto text-7xl font-normal font-['TG_Malromur'] leading-tight">
            Prose Styles
          </h1>

          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <p className="text-auto text-2xl font-normal font-['TG_Malromur'] leading-8 italic opacity-70">
            A collection of typographic patterns for real-world contexts
          </p>

          <p className="text-auto text-lg font-normal font-['TG_Malromur'] leading-7 max-w-[700px] mx-auto pt-4">
            Explore eight distinct prose styles demonstrating how typefaces perform across editorial, scientific, formal, and reference contexts. Each pattern is a functional design system ready for adaptation.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/specimen/three"
              className="inline-block px-8 py-3 bg-surface-inverse text-auto text-sm font-semibold font-['TG_Malromur'] uppercase tracking-wider hover:bg-fg-88 transition-colors"
            >
              View Complete Specimen
            </Link>
            <Link
              to="/specimen/prose/specs"
              className="inline-block px-8 py-3 border-2 border-fg-24 text-auto text-sm font-semibold font-['TG_Malromur'] uppercase tracking-wider hover:border-fg-48 transition-colors"
            >
              Style Specifications
            </Link>
          </div>
        </div>
      </section>

      {/* Prose Style Cards */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto space-y-24">
          {proseStyles.map((style, index) => (
            <div
              key={style.id}
              className="group"
            >
              <Link to="/specimen/three" className="block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Preview - alternating sides */}
                  <div className={`order-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] bg-container-primary rounded-sm overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
                        {style.preview}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : ''} space-y-4`}>
                    <div>
                      <div className="text-auto text-xs font-semibold font-['TG_Malromur'] uppercase tracking-widest mb-2 opacity-60">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h2 className="text-auto text-5xl font-medium font-['TG_Malromur'] leading-tight mb-2 group-hover:opacity-70 transition-opacity">
                        {style.title}
                      </h2>
                      <p className="text-auto text-xl font-normal font-['TG_Malromur'] italic opacity-60">
                        {style.subtitle}
                      </p>
                    </div>

                    <div className="w-16 h-[1px] bg-fg-24" />

                    <p className="text-auto text-base font-normal font-['TG_Malromur'] leading-7">
                      {style.description}
                    </p>

                    <div className="pt-4">
                      <div className="inline-flex items-center gap-2 text-auto text-sm font-semibold font-['TG_Malromur'] uppercase tracking-wider group-hover:gap-4 transition-all">
                        View in context
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="text-auto text-4xl font-normal font-['TG_Malromur'] leading-tight">
            See all patterns in action
          </h2>

          <p className="text-auto text-lg font-normal font-['TG_Malromur'] leading-7 max-w-[600px] mx-auto">
            View the complete specimen with all eight prose styles flowing together in a single, comprehensive demonstration.
          </p>

          <div className="pt-4">
            <Link
              to="/specimen/three"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto text-base font-semibold font-['TG_Malromur'] uppercase tracking-wider hover:bg-fg-88 transition-colors"
            >
              Complete Specimen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
