import { Link } from 'react-router-dom'
import { FoundryCTA, SpecimenHero, Button, LinkWithIcon, Pill } from '@kol/ui'

export default function SpecimenProseOverview() {
  const proseStyles = [
    {
      id: 'editorial',
      title: 'Editorial',
      subtitle: 'Magazine & Journal Layout',
      description: 'Multi-column articles with sidebar, pull quotes, and specimen details. Demonstrates how the typeface performs in long-form editorial contexts.',
      link: '/specimen/malromur/editorial',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="grid grid-cols-12 gap-6 h-full items-start">
            <div className="col-span-7 space-y-6">
              <h3 className="font-['TGMalromur'] text-5xl italic leading-tight text-black/90">
                The Volcanic Landscape
              </h3>
              <div className="space-y-3 font-['TGMalromur'] text-base leading-relaxed text-black/70">
                <p>Iceland's geological features are dominated by volcanic activity, with geothermal areas scattered across the island's interior.</p>
                <p>The Mid-Atlantic Ridge runs through Iceland, making it one of the most tectonically active regions.</p>
                <p>Glaciers cover roughly 11% of the country's total area, creating dramatic contrasts with the volcanic terrain.</p>
              </div>
            </div>
            <div className="col-span-5 bg-[#E8DCC0] p-6 space-y-4 h-full">
              <div className="font-['TGMalromur'] text-xs uppercase tracking-wider text-black/60">Sidebar</div>
              <p className="font-['TGMalromur'] text-sm leading-relaxed text-black/70">Geothermal heat provides sustainable energy for 90% of homes in Iceland.</p>
              <p className="font-['TGMalromur'] text-sm leading-relaxed text-black/70">The country sits atop one of the world's most active volcanic zones.</p>
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
      link: '/specimen/malromur/data-table',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="h-full flex flex-col items-start space-y-1">
            <div className="flex gap-4 border-b-2 border-black/80 pb-2 font-['TGMalromur'] text-sm font-semibold text-black/80">
              <div className="flex-1">Species</div>
              <div className="w-20 text-right">Height</div>
              <div className="w-20 text-right">Density</div>
              <div className="w-20 text-right">Range</div>
            </div>
            {[
              ['Betula pubescens', '12m', '0.68', '0-400m'],
              ['Salix phylicifolia', '4m', '0.52', '0-600m'],
              ['Sorbus aucuparia', '8m', '0.61', '0-500m'],
              ['Populus tremula', '15m', '0.45', '0-450m'],
              ['Alnus incana', '10m', '0.53', '0-550m'],
              ['Juniperus communis', '2m', '0.71', '0-700m'],
              ['Salix lanata', '1m', '0.64', '0-650m'],
              ['Empetrum nigrum', '0.3m', '0.58', '0-800m']
            ].map((row, i) => (
              <div key={i} className="flex gap-4 border-b border-black/10 py-2 font-['TGMalromur'] text-sm w-full">
                <div className="flex-1 italic text-black/70">{row[0]}</div>
                <div className="w-20 text-right text-black/60">{row[1]}</div>
                <div className="w-20 text-right text-black/60">{row[2]}</div>
                <div className="w-20 text-right text-black/60">{row[3]}</div>
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
      link: '/specimen/malromur/menu',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="text-center h-full flex flex-col items-center font-['TGMalromur']">
            <div className="space-y-2 mb-12">
              <div className="text-5xl italic text-black/90">Spring Menu</div>
              <div className="text-sm uppercase tracking-widest text-black/50">2024</div>
            </div>
            <div className="grid grid-cols-2 gap-16 w-full flex-1 content-start">
              <div className="space-y-6">
                <div className="text-base uppercase tracking-wider text-black/70">Appetizers</div>
                <div className="space-y-3 text-sm text-black/60">
                  <div className="italic">Smoked Arctic Char</div>
                  <div className="italic">Wild Mushroom Soup</div>
                  <div className="italic">Pickled Herring</div>
                  <div className="italic">Smørrebrød</div>
                  <div className="italic">Rye Bread & Butter</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="text-base uppercase tracking-wider text-black/70">Entrées</div>
                <div className="space-y-3 text-sm text-black/60">
                  <div className="italic">Lamb Shoulder</div>
                  <div className="italic">Pan-Seared Cod</div>
                  <div className="italic">Roasted Root Vegetables</div>
                  <div className="italic">Arctic Char Fillet</div>
                  <div className="italic">Wild Venison</div>
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
      link: '/specimen/malromur/newsletter',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="h-full flex flex-col items-start font-['TGMalromur']">
            <div className="space-y-2 mb-8">
              <div className="text-4xl italic text-black/90">Nordic Studies Quarterly</div>
              <div className="text-sm text-black/50">Vol. 47, Issue 2 — Spring 2024</div>
            </div>
            <div className="grid grid-cols-3 gap-8 flex-1 items-start content-start">
              {[
                ['Recent volcanic activity in the Reykjanes Peninsula suggests renewed magmatic intrusion.', 'Climate patterns show significant shifts in North Atlantic currents.', 'Glacial retreat accelerates in southern regions.', 'Temperature anomalies recorded across Iceland.'],
                ['Archaeological findings from 14th century settlements reveal trade networks.', 'Linguistic analysis of Old Norse manuscripts continues.', 'Medieval artifacts discovered near coastal sites.', 'Historical trade routes mapped extensively.'],
                ['Geothermal energy developments expand across western regions.', 'Biodiversity studies document endemic species adaptations.', 'Marine ecosystems respond to warming waters.', 'Conservation efforts increase nationwide.']
              ].map((col, i) => (
                <div key={i} className="space-y-5 h-full">
                  {col.map((text, j) => (
                    <p key={j} className="text-sm leading-relaxed text-black/70">{text}</p>
                  ))}
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
      link: '/specimen/malromur/index',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="grid grid-cols-3 gap-8 h-full font-['TGMalromur'] items-start content-start">
            {[
              [['Basalt', 'Volcanic rock'], ['Fjord', 'Glacial valley'], ['Geyser', 'Hot spring'], ['Lava', 'Molten rock'], ['Magma', 'Underground melt'], ['Obsidian', 'Volcanic glass'], ['Pumice', 'Porous rock'], ['Scoria', 'Volcanic debris']],
              [['Moraine', 'Glacial deposit'], ['Plateau', 'Elevated plain'], ['Ridge', 'Mountain crest'], ['Summit', 'Peak point'], ['Tarn', 'Mountain lake'], ['Tephra', 'Volcanic ash'], ['Tundra', 'Arctic plain'], ['Valley', 'Low area']],
              [['Vent', 'Volcanic opening'], ['Crater', 'Depression'], ['Caldera', 'Collapsed crater'], ['Dike', 'Vertical intrusion'], ['Fumarole', 'Gas vent'], ['Hornito', 'Lava mound'], ['Pahoehoe', 'Smooth lava'], ['Sill', 'Horizontal intrusion']]
            ].map((col, colIdx) => (
              <div key={colIdx} className="space-y-4">
                {col.map(([term, def], i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-base font-semibold text-black/80">{term}</div>
                    <div className="text-sm text-black/60 ml-3 italic">{def}</div>
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
      link: '/specimen/malromur/chapter',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="grid grid-cols-2 gap-16 h-full font-['TGMalromur'] items-start">
            <div className="flex justify-end pr-12 h-full items-center">
              <div className="text-right space-y-4">
                <div className="text-sm uppercase tracking-wider text-black/50">Chapter Three</div>
                <div className="text-5xl italic text-black/90 leading-tight">Fire & Ice</div>
              </div>
            </div>
            <div className="flex pl-12 h-full items-center">
              <div className="space-y-6">
                <div className="w-16 h-16 flex items-start justify-start text-7xl text-black/90 italic leading-none">T</div>
                <div className="space-y-4 text-base leading-relaxed text-black/70">
                  <p>he landscape transforms dramatically where glacial ice meets volcanic fire. This juxtaposition defines Iceland's unique geology.</p>
                  <p>Ancient lava fields stretch beneath ice caps, creating a dynamic interplay of extreme temperatures.</p>
                  <p>Volcanic eruptions pierce through kilometers of solid ice, releasing torrents of meltwater that reshape the terrain in hours.</p>
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
      link: '/specimen/malromur/toc',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-8">
          <div className="w-full h-full flex flex-col items-start font-['TGMalromur']">
            <div className="text-4xl italic text-black/90 text-center w-full mb-12">Contents</div>
            <div className="border-t-2 border-b-2 border-black/20 py-8 space-y-4 w-full flex-1 flex flex-col items-start">
              {[
                ['Introduction', '1'],
                ['The Volcanic System', '15'],
                ['Glacial Formations', '45'],
                ['  Vatnajökull Region', '52'],
                ['  Langjökull Plateau', '61'],
                ['Geothermal Activity', '78'],
                ['Flora & Fauna', '103'],
                ['Marine Ecosystems', '128'],
                ['Climate & Weather', '156'],
                ['Conservation Efforts', '189'],
                ['Conclusion', '215']
              ].map(([title, page], i) => (
                <div key={i} className="flex items-center gap-2 w-full">
                  <div className={`text-base ${title.startsWith('  ') ? 'ml-8 italic text-black/60' : 'text-black/80'}`}>
                    {title.trim()}
                  </div>
                  <div className="flex-1 border-b border-dotted border-black/30"></div>
                  <div className="text-base text-black/70">{page}</div>
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
      link: '/specimen/malromur/title-page',
      preview: (
        <div className="w-full h-full bg-[#F5F1E8] p-12 flex items-center justify-center">
          <div className="text-center space-y-8 font-['TGMalromur']">
            <div className="space-y-6">
              <div className="text-6xl text-black/90 leading-tight">
                Iceland
              </div>
              <div className="w-32 h-[2px] bg-black/80 mx-auto"></div>
              <div className="text-2xl italic text-black/70">
                A Natural History
              </div>
              <div className="w-32 h-[2px] bg-black/80 mx-auto"></div>
            </div>
            <div className="space-y-3 pt-12">
              <div className="text-sm uppercase tracking-wider text-black/50">
                Volume One
              </div>
              <div className="text-sm text-black/60">
                Published by Nordic Research Institute
              </div>
              <div className="text-sm text-black/60">
                Reykjavík · 2024
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'scientific-paper',
      title: 'Scientific Paper',
      subtitle: 'Academic Publication',
      description: 'Formal academic paper structure with abstract, methodology, data tables, and conclusions. Ideal for research journals and scientific publications.',
      link: '/specimen/malromur/scientific',
      preview: (
        <div className="w-full h-full bg-white p-8">
          <div className="h-full flex flex-col items-start font-['TGMalromur']">
            <div className="text-center w-full mb-6">
              <div className="text-xs uppercase tracking-wider text-black/50 mb-3">Abstract</div>
              <div className="text-sm leading-relaxed text-black/70 max-w-[90%] mx-auto">
                This study examines the thermal dynamics of Icelandic geothermal systems and their relationship to volcanic activity patterns.
              </div>
            </div>

            <div className="text-2xl font-semibold text-black/90 text-center w-full mb-6">
              Geothermal Activity Patterns
            </div>

            <div className="space-y-4 mb-6 flex-1">
              <div>
                <div className="text-sm font-semibold text-black/80 mb-2">1. Introduction</div>
                <div className="text-sm leading-relaxed text-black/70">
                  Iceland's position on the Mid-Atlantic Ridge creates unique conditions for geothermal research. The interaction between tectonic plates and volcanic systems produces observable thermal patterns across the landscape.
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black/80 mb-2">2. Methodology</div>
                <div className="text-sm leading-relaxed text-black/70">
                  Data was collected from 47 monitoring stations across three geothermal fields over a 24-month period. Temperature readings were recorded at six-hour intervals.
                </div>
              </div>
            </div>

            <div className="border-t border-black/20 pt-4 w-full">
              <div className="text-xs font-semibold text-black/70 mb-3">Table 1: Temperature Ranges by Region</div>
              <div className="space-y-2">
                <div className="flex gap-6 text-xs font-semibold text-black/60 border-b border-black/30 pb-1">
                  <div className="flex-1">Region</div>
                  <div className="w-20 text-right">Min °C</div>
                  <div className="w-20 text-right">Max °C</div>
                </div>
                <div className="flex gap-6 text-xs text-black/70">
                  <div className="flex-1">Reykjanes</div>
                  <div className="w-20 text-right">185</div>
                  <div className="w-20 text-right">298</div>
                </div>
                <div className="flex gap-6 text-xs text-black/70">
                  <div className="flex-1">Hengill</div>
                  <div className="w-20 text-right">210</div>
                  <div className="w-20 text-right">315</div>
                </div>
                <div className="flex gap-6 text-xs text-black/70">
                  <div className="flex-1">Krafla</div>
                  <div className="w-20 text-right">195</div>
                  <div className="w-20 text-right">340</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'legislative',
      title: 'Legislative Documentation',
      subtitle: 'Government & Legal',
      description: 'Formal government legislation with hierarchical chapter structure, section numbering, and official document formatting.',
      link: '/specimen/malromur/legislative',
      preview: (
        <div className="w-full h-full bg-white p-8">
          <div className="h-full flex flex-col items-start font-['TGMalromur']">
            <div className="text-center w-full mb-6">
              <div className="text-lg font-semibold text-black/90 mb-2">Act No. 47/2023</div>
              <div className="text-sm text-black/60 italic">Environmental Protection and Conservation</div>
            </div>

            <div className="border-b-2 border-black/80 pb-3 mb-6 w-full">
              <div className="text-base font-semibold text-black/80 text-center">Chapter III: Protected Areas</div>
            </div>

            <div className="space-y-5 flex-1">
              <div className="flex gap-4 items-start">
                <div className="text-sm font-semibold text-black/70 flex-shrink-0 w-12">§ 12</div>
                <div className="text-sm leading-relaxed text-black/70">
                  All designated conservation areas shall maintain natural ecosystems in their original state. Human activity within such areas requires explicit authorization from the Environmental Agency.
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-sm font-semibold text-black/70 flex-shrink-0 w-12">§ 13</div>
                <div className="text-sm leading-relaxed text-black/70">
                  Protected areas include national parks, nature reserves, and regions of geological significance as defined in Schedule A of this Act.
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-sm font-semibold text-black/70 flex-shrink-0 w-12">§ 14</div>
                <div className="text-sm leading-relaxed text-black/70">
                  The Minister may establish additional protected areas through regulation, following consultation with relevant municipalities and stakeholder groups.
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-sm font-semibold text-black/70 flex-shrink-0 w-12">§ 15</div>
                <div className="text-sm leading-relaxed text-black/70">
                  Violations of protection measures shall be subject to fines as specified in Article 45, with penalties ranging from 500,000 to 5,000,000 ISK.
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'variable-axis',
      title: 'Variable Axis Explorer',
      subtitle: 'Display Typography',
      description: 'Massive display sizes demonstrating weight variations and typographic capabilities. From whisper to thunder, exploring the full range of the variable font.',
      link: '/specimen/malromur/variable-axis',
      preview: (
        <div className="w-full h-full bg-white p-8 flex items-center justify-center">
          <div className="h-full flex flex-col justify-center items-center space-y-6 font-['TGMalromur'] text-black/90">
            <div className="text-6xl italic leading-none" style={{ fontWeight: 200 }}>
              Whisper
            </div>
            <div className="text-6xl italic leading-none" style={{ fontWeight: 400 }}>
              Speak
            </div>
            <div className="text-6xl italic leading-none" style={{ fontWeight: 600 }}>
              Declare
            </div>
            <div className="text-6xl italic leading-none" style={{ fontWeight: 800 }}>
              Thunder
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="w-full min-h-screen bg-surface-primary">
      {/* Hero Section */}
      <SpecimenHero
        title="Prose Styles"
        subtitle="A collection of typographic patterns for real-world contexts"
        description="Explore eleven distinct prose styles demonstrating how typefaces perform across editorial, scientific, formal, and reference contexts. Each pattern is a functional design system ready for adaptation."
        fontFamily="TGMalromur"
        className="min-h-[60vh]"
      >
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/specimen/malromur/complete">
            <Button variant="primary" size="lg" uppercase={true}>
              View Complete Specimen
            </Button>
          </Link>
          <Link to="/specimen/malromur/specs">
            <Button variant="outline" size="lg" uppercase={true}>
              Style Specifications
            </Button>
          </Link>
        </div>
      </SpecimenHero>

      {/* Prose Style Cards */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto space-y-24">
          {proseStyles.map((style, index) => (
            <div
              key={style.id}
              className="group"
            >
              <Link to={style.link || "/specimen/three"} className="block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Preview - alternating sides */}
                  <div className={`order-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="bg-surface-secondary rounded-sm overflow-hidden h-[400px]">
                      <div className="h-full">
                        {style.preview}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : ''} space-y-6`}>
                    <Pill variant="subtle" size="sm">
                      Pattern {String(index + 1).padStart(2, '0')}
                    </Pill>

                    <h2 className="text-auto text-6xl font-normal font-['TGMalromur'] italic leading-tight">
                      {style.title}
                    </h2>

                    <p className="text-auto text-2xl font-normal font-['TGMalromur'] italic opacity-60">
                      {style.subtitle}
                    </p>

                    <p className="kol-mono-text text-fg-64">
                      {style.description}
                    </p>

                    <div className="w-16 h-[1px] bg-fg-24" />

                    <LinkWithIcon to={style.link || "/specimen/three"}>
                      View Pattern
                    </LinkWithIcon>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="See all patterns in action"
        description="View the complete specimen with all eleven prose styles flowing together in a single, comprehensive demonstration."
        action={{
          to: "/specimen/malromur/complete",
          label: "Complete Specimen"
        }}
      />
    </div>
  )
}
