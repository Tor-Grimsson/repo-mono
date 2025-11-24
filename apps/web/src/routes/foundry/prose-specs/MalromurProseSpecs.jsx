import { useState } from 'react'
import { FoundryCTA, OverviewHero, Table, ProseStylesViewer, UnitSelector } from '@kol/ui'
import FoundryFeatureSection from '../../../components/sections/foundry/FoundryFeatureSection'

const MalromurSpecs = () => {
  const [showUnits, setShowUnits] = useState('px')

  const convertToRem = (px) => (px / 16).toFixed(3)
  const convertToEm = (px, base) => (px / base).toFixed(3)

  const columns = [
    { header: 'Element', accessor: 'element', headerClassName: 'dt-cell-title', className: 'dt-cell-text' },
    {
      header: 'CSS Selector',
      accessor: 'className',
      headerClassName: 'dt-cell-title',
      className: 'dt-cell-text',
      render: (row) => <span className="dataTableToken bg-fg-08">.{row.className}</span>
    },
    {
      header: 'Size',
      accessor: 'size',
      headerClassName: 'dt-cell-title',
      className: 'dt-cell-text',
      render: (row) => showUnits === 'px' ? `${row.size}px` : `${convertToRem(row.size)}rem`
    },
    { header: 'Weight', accessor: 'weight', headerClassName: 'dt-cell-title', className: 'dt-cell-text' },
    {
      header: 'Line Height',
      accessor: 'leading',
      headerClassName: 'dt-cell-title',
      className: 'dt-cell-text',
      render: (row) => showUnits === 'px' ? `${row.leading}px` : `${convertToEm(row.leading, row.size)}em`
    },
    {
      header: 'Tracking',
      accessor: 'tracking',
      headerClassName: 'dt-cell-title',
      className: 'dt-cell-text',
      render: (row) => row.tracking > 0 ? `${row.tracking / 1000}em` : '0'
    },
    { header: 'Style', accessor: 'fontStyle', headerClassName: 'dt-cell-title', className: 'dt-cell-text' },
    { header: 'Use Case', accessor: 'useCase', headerClassName: 'dt-cell-title', className: 'dt-cell-meta' }
  ]

  const proseStyles = [
    {
      id: 'unified',
      name: 'Unified Typography System (8pt Grid)',
      elements: [
        { element: 'H1 - Page Title', className: 'malromur-h1', size: 64, weight: 500, leading: 72, tracking: 0, fontStyle: 'normal', useCase: 'Title Page Main Title' },
        { element: 'H2 - Major Section', className: 'malromur-h2', size: 48, weight: 500, leading: 56, tracking: 0, fontStyle: 'normal', useCase: 'TOC, Editorial, Menu, Chapter' },
        { element: 'H3 - Section', className: 'malromur-h3', size: 40, weight: 500, leading: 48, tracking: 0, fontStyle: 'normal', useCase: 'Newsletter Title' },
        { element: 'H4 - Subsection', className: 'malromur-h4', size: 32, weight: 500, leading: 40, tracking: 0, fontStyle: 'normal', useCase: 'Data Table, Index' },
        { element: 'H5 - Minor Heading', className: 'malromur-h5', size: 24, weight: 400, leading: 32, tracking: 0, fontStyle: 'italic', useCase: 'Editorial Subtitle' },
        { element: 'H6 - Label Heading', className: 'malromur-h6', size: 20, weight: 500, leading: 28, tracking: 0, fontStyle: 'normal', useCase: 'Category, Header, Number' },
        { element: 'Body Large', className: 'malromur-body-lg', size: 18, weight: 400, leading: 28, tracking: 0, fontStyle: 'normal', useCase: 'Editorial, Newsletter, Chapter' },
        { element: 'Body', className: 'malromur-body', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal', useCase: 'Default paragraph' },
        { element: 'Body Small', className: 'malromur-body-sm', size: 14, weight: 400, leading: 20, tracking: 0, fontStyle: 'normal', useCase: 'Labels, Descriptions' },
        { element: 'Caption', className: 'malromur-caption', size: 14, weight: 400, leading: 20, tracking: 0, fontStyle: 'italic', useCase: 'Table caption, image caption' },
        { element: 'Blockquote', className: 'malromur-blockquote', size: 28, weight: 400, leading: 36, tracking: 0, fontStyle: 'italic', useCase: 'Pull quote' },
        { element: 'Quote Small', className: 'malromur-quote-sm', size: 20, weight: 400, leading: 28, tracking: 0, fontStyle: 'italic', useCase: 'Subtitle, epigraph' },
        { element: 'List', className: 'malromur-list', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal', useCase: 'ul, ol' },
        { element: 'Code', className: 'malromur-code', size: 14, weight: 400, leading: 20, tracking: 0, fontStyle: 'normal', useCase: 'Inline code' }
      ]
    },
    {
      id: 'editorial',
      name: 'Editorial Article Typography (from Specimen)',
      elements: [
        { element: 'Epigraph', className: 'editorial-epigraph', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal', useCase: '4 cols, italic attribution' },
        { element: 'Article Title', className: 'editorial-title', size: 64, weight: 700, leading: 64, tracking: 0, fontStyle: 'normal', useCase: '5 cols max-width' },
        { element: 'Article Subtitle', className: 'editorial-subtitle', size: 48, weight: 300, leading: 48, tracking: 0, fontStyle: 'italic', useCase: 'Same as title' },
        { element: 'Body Text', className: 'editorial-body', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal', useCase: '5 cols article span' },
        { element: 'Sidebar Label', className: 'editorial-sidebar-label', size: 12, weight: 600, leading: 16, tracking: 50, fontStyle: 'normal', useCase: 'Uppercase, wide tracking' },
        { element: 'Sidebar Body', className: 'editorial-sidebar-body', size: 16, weight: 300, leading: 24, tracking: 0, fontStyle: 'normal', useCase: 'Bold label + text' },
        { element: 'Sidebar Pull Quote', className: 'editorial-pull-quote', size: 24, weight: 400, leading: 32, tracking: 0, fontStyle: 'italic', useCase: 'Centered, nested' }
      ]
    }
  ]

  const proseVariants = [
    { id: 'default', label: 'Málrómur', className: '' }
  ]

  const proseExampleElements = [
    { type: 'h1', content: 'Page Title: H1 Level' },
    { type: 'quote-small', content: 'A subtitle or epigraph using the quote small style, typically in italic for emphasis and distinction from the main body text.' },
    { type: 'h2', content: 'Major Section: H2 Level' },
    { type: 'body-large', content: 'This is body large text, used for editorial content, newsletter articles, and chapter openings. It provides enhanced readability for important introductory content while maintaining the vertical rhythm of the 8pt baseline grid.' },
    { type: 'body', content: 'This is standard body text at 16px, the default paragraph style. It provides optimal readability for extended reading while maintaining consistent spacing. Multiple paragraphs demonstrate how the typography system creates a harmonious flow throughout the document.' },
    { type: 'body', content: 'Málrómur transitional serif design, inspired by 18th century specimen catalogues, brings elegance to editorial content. The typeface supports a wide range of contexts from formal documents to contemporary digital publications.' },
    { type: 'h3', content: 'Section Header: H3 Level' },
    { type: 'body', content: 'The H3 level at 40px serves as a section divider in newsletter-style layouts. It provides clear hierarchy while maintaining the elegant proportions of the typeface across different scales.' },
    { type: 'h4', content: 'Subsection Header: H4 Level' },
    { type: 'body', content: 'Used for data tables and index titles, the H4 level at 32px provides structure without overwhelming the content. It is ideal for organizational elements that require visual weight but not dominance.' },
    { type: 'h5', content: 'Minor Heading: H5 Level in Italic' },
    { type: 'body', content: 'The H5 level appears in editorial subtitles, providing a softer, more refined emphasis. The italic treatment distinguishes it from other heading levels while maintaining readability.' },
    { type: 'h6', content: 'Label Heading: H6 Level' },
    { type: 'body-small', content: 'Body small text at 14px is used for labels, descriptions, and supplementary information. It maintains legibility while creating clear visual hierarchy. This size is perfect for captions, sidebars, and meta information.' },
    { type: 'blockquote', content: 'Pull quotes at 28px provide emphasis and visual interest, breaking up long passages while maintaining typographic harmony with the surrounding content.' },
    { type: 'body', content: 'Following the pull quote, the narrative continues with standard body text. The baseline grid ensures consistent vertical rhythm throughout.' },
    { type: 'ul', items: [
      'List items use the standard body size at 16px',
      'Maintaining consistency with paragraph text',
      'Ensuring readability in structured content',
      'The vertical spacing follows the 8pt grid system'
    ]},
    { type: 'ol', items: [
      'Ordered lists follow the same typographic principles',
      'Numbered items maintain the baseline grid alignment',
      'Creating clear hierarchical structure'
    ]},
    { type: 'caption', content: 'Caption text in italic at 14px, used for image captions and supplementary notes.' }
  ]

  const renderProseElement = (element, index) => {
    const className = element.className || ''
    switch (element.type) {
      case 'h1':
        return <h1 key={index} className={`text-[64px] leading-[72px] font-medium mb-8 ${className}`}>{element.content}</h1>
      case 'h2':
        return <h2 key={index} className={`text-[48px] leading-[56px] font-medium mt-14 mb-6 ${className}`}>{element.content}</h2>
      case 'h3':
        return <h3 key={index} className={`text-[40px] leading-[48px] font-medium mt-12 mb-4 ${className}`}>{element.content}</h3>
      case 'h4':
        return <h4 key={index} className={`text-[32px] leading-[40px] font-medium mt-10 mb-4 ${className}`}>{element.content}</h4>
      case 'h5':
        return <h5 key={index} className={`text-[24px] leading-[32px] font-normal italic mt-8 mb-4 ${className}`}>{element.content}</h5>
      case 'h6':
        return <h6 key={index} className={`text-[20px] leading-[28px] font-medium mt-6 mb-3 ${className}`}>{element.content}</h6>
      case 'body-large':
        return <p key={index} className={`text-[18px] leading-[28px] mb-4 ${className}`}>{element.content}</p>
      case 'body':
        return <p key={index} className={`text-[16px] leading-[24px] mb-4 ${className}`}>{element.content}</p>
      case 'body-small':
        return <p key={index} className={`text-[14px] leading-[20px] mb-3 ${className}`}>{element.content}</p>
      case 'caption':
        return <p key={index} className={`text-[14px] leading-[20px] italic text-fg-64 mt-2 ${className}`}>{element.content}</p>
      case 'quote-small':
        return <p key={index} className={`text-[20px] leading-[28px] italic mb-4 ${className}`}>{element.content}</p>
      case 'blockquote':
        return <blockquote key={index} className={`text-[28px] leading-[36px] italic my-8 pl-6 border-l-2 border-fg-24 ${className}`}>{element.content}</blockquote>
      case 'ul':
        return (
          <ul key={index} className="text-[16px] leading-[24px] my-4 ml-6 list-disc">
            {element.items.map((item, i) => <li key={i} className="mb-2">{item}</li>)}
          </ul>
        )
      case 'ol':
        return (
          <ol key={index} className="text-[16px] leading-[24px] my-4 ml-6 list-decimal">
            {element.items.map((item, i) => <li key={i} className="mb-2">{item}</li>)}
          </ol>
        )
      default:
        return null
    }
  }

  const proseExampleContent = (
    <div className="font-['TGMalromur']" style={{ maxWidth: '760px', marginInline: 'auto' }}>
      {proseExampleElements.map((element, index) => renderProseElement(element, index))}
    </div>
  )

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <OverviewHero
        badge="Prose Specifications"
        title="Málrómur Prose Typography"
        description="Unified typography system on 8pt baseline grid. Complete hierarchy from H1-H6 plus body variants, quotes, lists, and inline elements."
        categories={['TGMalromur Serif', '14 Elements', '8pt Grid']}
      />

      {/* Featured Image */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary">
            <img
              src="/img/typefaces/malromur/set-a-05.png"
              alt="Málrómur prose typography specimen"
              className="absolute left-0 top-0 size-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full flex items-center px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FoundryFeatureSection
            label="About Málrómur Prose"
            title="Typography for Editorial Systems"
            description="Málrómur Prose is an elegant variable serif typeface built for editorial and scholarly applications. With a unified typography system on an 8pt baseline grid, it provides complete flexibility for editorial hierarchies while maintaining exceptional clarity in long-form reading contexts."
            imagePosition="right"
            graphic={<img src="/img/typefaces/malromur/set-a-06.png" alt="Málrómur prose specimen" className="w-full aspect-[10/7] rounded object-cover" />}
          />
        </div>
      </section>

      {/* Visual Example */}
      <ProseStylesViewer
        title="Visual Example"
        variants={proseVariants}
        defaultVariant="default"
        showGridToggle={true}
        gridSize={8}
      >
        {proseExampleContent}
      </ProseStylesViewer>

      {/* Specifications Tables */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[1400px] mx-auto space-y-16">
          {proseStyles.map((style, styleIndex) => (
            <div key={style.id} className="space-y-8">
              <div className="flex justify-between items-end">
                {/* Title */}
                <div className="flex items-baseline gap-4">
                  <h2 className="kol-helper-lg text-auto">{style.name}</h2>
                  <span className="kol-helper-uc-xs text-fg-64">
                    {String(styleIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Unit Selector */}
                <UnitSelector activeUnit={showUnits} onUnitChange={setShowUnits} />
              </div>

              <Table
                caption={`${style.name} Typography Specifications`}
                columns={columns}
                rows={style.elements}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Notes */}
      <section className="w-full px-8 pb-24">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <h2 className="kol-helper-lg text-auto">Implementation Notes</h2>

          <Table
            caption="Implementation Guidelines"
            columns={[
              { header: 'Aspect', accessor: 'aspect', headerClassName: 'dt-cell-title', className: 'dt-cell-text' },
              {
                header: 'Description',
                accessor: 'description',
                headerClassName: 'dt-cell-title',
                className: 'dt-cell-meta',
                render: (row) => <span dangerouslySetInnerHTML={{ __html: row.description }} />
              }
            ]}
            rows={[
              {
                aspect: 'Font Family',
                description: 'All styles use <code class="dataTableToken bg-fg-08">TGMalromur, serif</code>'
              },
              {
                aspect: 'Baseline Grid',
                description: '8pt base grid system with 4pt subdivisions for small sizes (12px, 14px, 20px). All spacing follows grid: 8px, 16px, 24px, 32px.'
              },
              {
                aspect: 'Type Scale',
                description: 'Unified scale from 64px (H1) down to 14px (small text/captions). Consolidates 31 context-specific elements into 14 semantic sizes.'
              },
              {
                aspect: 'Line Height',
                description: 'Leading values aligned to 8pt/4pt grid. Ranges from 72px (9×8pt) for H1 to 20px (5×4pt) for small text.'
              },
              {
                aspect: 'Use Cases',
                description: 'Supports 8+ editorial contexts: title pages, TOC, articles, data tables, menus, newsletters, indexes, and chapters with unified hierarchy.'
              },
              {
                aspect: 'Letter Spacing',
                description: 'Minimal tracking for most elements. Tracking shown as em units where applied.'
              }
            ]}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Málrómur Specimens"
        description="Editorial patterns applied in real-world contexts."
        action={{
          to: "/specimen/malromur/selection",
          label: "View Specimens"
        }}
      />
    </main>
  )
}

export default MalromurSpecs
