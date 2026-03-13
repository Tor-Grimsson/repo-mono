import { useState } from 'react'
import { FoundryCTA, Tag, OverviewHero, Table, ProseStylesViewer } from '@kol/ui'
import FoundryFeatureSection from '../components/FoundryFeatureSection'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/foundry'

const StackSpecs = () => {
  const [activeVariant, setActiveVariant] = useState('default')

  const columns = [
    { header: 'Element', accessor: 'element', headerClassName: 'kol-table-cell-title', className: 'kol-table-cell-text' },
    {
      header: 'CSS Selector',
      accessor: 'selector',
      headerClassName: 'kol-table-cell-title',
      className: 'kol-table-cell-text',
      render: (row) => <span className="kol-table-token bg-fg-08">{row.selector}</span>
    },
    { header: 'Size', accessor: 'size', headerClassName: 'kol-table-cell-title', className: 'kol-table-cell-text' },
    { header: 'Weight', accessor: 'weight', headerClassName: 'kol-table-cell-title', className: 'kol-table-cell-text' },
    { header: 'Line Height', accessor: 'lineHeight', headerClassName: 'kol-table-cell-title', className: 'kol-table-cell-text' },
    { header: 'Font Family', accessor: 'fontFamily', headerClassName: 'kol-table-cell-title', className: 'kol-table-cell-text' },
    { header: 'Special', accessor: 'special', headerClassName: 'kol-table-cell-title', className: 'kol-table-cell-meta' }
  ]

  const proseVariants = [
    { id: 'default', label: 'Standard (65ch)', className: 'kol-prose' },
    { id: 'wide', label: 'Wide (90ch)', className: 'kol-prose-wide' },
    { id: 'compact', label: 'Compact (45ch)', className: 'kol-prose-compact' }
  ]

  const proseStyles = [
    {
      id: 'default',
      name: 'Standard Width (65ch)',
      className: 'kol-prose',
      width: '~1040px',
      elements: [
        { element: 'Heading 1', selector: '.kol-prose h1', size: 'clamp(48px, 6vw, 64px)', weight: 500, lineHeight: '100%', fontFamily: 'Right Grotesk Tight', special: 'uppercase' },
        { element: 'Heading 2', selector: '.kol-prose h2', size: 'clamp(32px, 4vw, 48px)', weight: 500, lineHeight: '110%', fontFamily: 'Right Grotesk Tight', special: '-' },
        { element: 'Heading 3', selector: '.kol-prose h3', size: 'clamp(24px, 3vw, 32px)', weight: 500, lineHeight: '120%', fontFamily: 'Right Grotesk Tight', special: '-' },
        { element: 'Heading 4', selector: '.kol-prose h4', size: '20px', weight: 600, lineHeight: '130%', fontFamily: 'Inter Tight', special: '-' },
        { element: 'Paragraph', selector: '.kol-prose p', size: 'clamp(16px, 1.8vw, 18px)', weight: 400, lineHeight: '160%', fontFamily: 'Inter Tight', special: '-' },
        { element: 'Lists', selector: '.kol-prose ul, .kol-prose ol', size: 'clamp(16px, 1.8vw, 18px)', weight: 400, lineHeight: '160%', fontFamily: 'Inter Tight', special: 'ul: + marker, ol: 01 marker' },
        { element: 'Inline Code', selector: '.kol-prose code', size: '0.95em', weight: 500, lineHeight: 'inherit', fontFamily: 'Right Grotesk Mono', special: '16% bg, 0px 8px padding' },
        { element: 'Code Block', selector: '.kol-prose pre', size: '14px', weight: 400, lineHeight: '150%', fontFamily: 'Right Grotesk Mono', special: 'tertiary bg, 1.25rem padding' },
        { element: 'Blockquote', selector: '.kol-prose blockquote', size: 'inherit', weight: 400, lineHeight: 'inherit', fontFamily: 'Inter Tight', special: 'italic, 4px border-left' }
      ]
    },
    {
      id: 'wide',
      name: 'Wide Width (90ch)',
      className: 'kol-prose-wide',
      width: '~1440px',
      elements: [
        { element: 'Heading 1', selector: '.kol-prose-wide h1', size: 'clamp(64px, 8vw, 96px)', weight: 500, lineHeight: '100%', fontFamily: 'Right Grotesk Tight', special: 'uppercase' },
        { element: 'Heading 2', selector: '.kol-prose-wide h2', size: 'clamp(40px, 5vw, 64px)', weight: 500, lineHeight: '110%', fontFamily: 'Right Grotesk Tight', special: '-' },
        { element: 'Heading 3', selector: '.kol-prose-wide h3', size: 'clamp(32px, 4vw, 48px)', weight: 500, lineHeight: '120%', fontFamily: 'Right Grotesk Tight', special: '-' },
        { element: 'Heading 4', selector: '.kol-prose-wide h4', size: '24px', weight: 600, lineHeight: '130%', fontFamily: 'Inter Tight', special: '-' },
        { element: 'Paragraph', selector: '.kol-prose-wide p', size: 'clamp(18px, 2vw, 20px)', weight: 400, lineHeight: '170%', fontFamily: 'Inter Tight', special: '-' },
        { element: 'Lists', selector: '.kol-prose-wide ul, .kol-prose-wide ol', size: 'clamp(18px, 2vw, 20px)', weight: 400, lineHeight: '170%', fontFamily: 'Inter Tight', special: 'disc/decimal markers' },
        { element: 'Inline Code', selector: '.kol-prose-wide code', size: '0.95em', weight: 500, lineHeight: 'inherit', fontFamily: 'Right Grotesk Mono', special: 'tertiary bg, 0.4em padding' },
        { element: 'Code Block', selector: '.kol-prose-wide pre', size: '16px', weight: 500, lineHeight: '140%', fontFamily: 'Right Grotesk Mono', special: 'tertiary bg, 1.5rem padding' },
        { element: 'Blockquote', selector: '.kol-prose-wide blockquote', size: 'clamp(20px, 2.2vw, 24px)', weight: 400, lineHeight: 'inherit', fontFamily: 'Inter Tight', special: 'italic, 4px border-left' }
      ]
    },
    {
      id: 'compact',
      name: 'Compact Width (45ch)',
      className: 'kol-prose-compact',
      width: '~720px',
      elements: [
        { element: 'Heading 1', selector: '.kol-prose-compact h1', size: 'clamp(32px, 5vw, 40px)', weight: 500, lineHeight: '100%', fontFamily: 'Right Grotesk Tight', special: 'uppercase' },
        { element: 'Heading 2', selector: '.kol-prose-compact h2', size: 'clamp(24px, 3.5vw, 32px)', weight: 500, lineHeight: '110%', fontFamily: 'Right Grotesk Tight', special: '-' },
        { element: 'Heading 3', selector: '.kol-prose-compact h3', size: 'clamp(20px, 2.5vw, 24px)', weight: 500, lineHeight: '120%', fontFamily: 'Right Grotesk Tight', special: '-' },
        { element: 'Heading 4', selector: '.kol-prose-compact h4', size: '18px', weight: 600, lineHeight: '130%', fontFamily: 'Inter Tight', special: '-' },
        { element: 'Paragraph', selector: '.kol-prose-compact p', size: 'clamp(14px, 1.6vw, 16px)', weight: 400, lineHeight: '160%', fontFamily: 'Inter Tight', special: '-' },
        { element: 'Lists', selector: '.kol-prose-compact ul, .kol-prose-compact ol', size: 'clamp(14px, 1.6vw, 16px)', weight: 400, lineHeight: '160%', fontFamily: 'Inter Tight', special: 'disc/decimal markers' },
        { element: 'Inline Code', selector: '.kol-prose-compact code', size: '0.95em', weight: 500, lineHeight: 'inherit', fontFamily: 'Right Grotesk Mono', special: 'tertiary bg, 0.4em padding' },
        { element: 'Code Block', selector: '.kol-prose-compact pre', size: '12px', weight: 500, lineHeight: '140%', fontFamily: 'Right Grotesk Mono', special: 'tertiary bg, 0.875rem padding' },
        { element: 'Blockquote', selector: '.kol-prose-compact blockquote', size: 'inherit', weight: 400, lineHeight: 'inherit', fontFamily: 'Inter Tight', special: 'italic, 3px border-left' }
      ]
    }
  ]

  const proseExampleElements = [
    { type: 'h1', content: 'Display Heading Level 1' },
    { type: 'p', content: 'This is a paragraph following the main heading. Lorem ipsum dolor sit amet, consectetur adipiscing elit. The text should align to the 8px baseline grid for consistent vertical rhythm.' },
    { type: 'h2', content: 'Section Heading Level 2' },
    { type: 'p', content: 'This paragraph follows a section heading. Notice how the spacing maintains the baseline grid.', inline: [{ type: 'strong', content: 'Bold text' }, { type: 'em', content: 'italic text' }] },
    { type: 'h3', content: 'Subsection Heading Level 3' },
    { type: 'p', content: 'Multiple paragraphs help visualize the rhythm.', inline: [{ type: 'a', content: 'Links are styled', href: '#' }] },
    { type: 'h4', content: 'Minor Heading Level 4' },
    { type: 'p', content: 'This is the smallest heading level, useful for minor sections and labels.' },
    { type: 'h3', content: 'Unordered List Example' },
    { type: 'ul', items: [
      'First list item with plus marker',
      'Second item showing alignment',
      'Third item to verify spacing',
      'Fourth item with longer text to demonstrate how multi-line list items wrap and maintain proper baseline alignment throughout'
    ]},
    { type: 'h3', content: 'Ordered List Example' },
    { type: 'ol', items: ['First numbered item', 'Second numbered item', 'Third numbered item', 'Fourth numbered item'] },
    { type: 'h3', content: 'Code Block Example' },
    { type: 'pre', content: 'function example() {\n  return "code blocks should align"\n}' },
    { type: 'p', content: 'Paragraph after code block to check spacing.' },
    { type: 'h3', content: 'Inline Code Example' },
    { type: 'p', content: 'Some text with', inline: [{ type: 'code', content: 'inline code' }] },
    { type: 'h3', content: 'Blockquote Example' },
    { type: 'blockquote', content: 'This is a blockquote that should maintain baseline alignment while having distinct styling.' },
    { type: 'p', content: 'Text after blockquote.' },
    { type: 'hr' },
    { type: 'p', content: 'Content after horizontal rule.' },
    { type: 'h3', content: 'Pull Quote Example' },
    { type: 'pullquote', content: 'A pull quote stands out but should still respect vertical rhythm.', cite: '— Attribution' },
    { type: 'h3', content: 'Link Variations' },
    { type: 'p', content: 'This paragraph contains', inline: [{ type: 'a', content: 'standard links', href: '#' }] },
    { type: 'h3', content: 'Text Formatting' },
    { type: 'p', content: 'This paragraph demonstrates various', inline: [{ type: 'strong', content: 'strong emphasis' }, { type: 'em', content: 'italic emphasis' }, { type: 'strong-em', content: 'bold italic text' }] },
    { type: 'h3', content: 'Mixed Content Flow' },
    { type: 'p', content: 'This section combines multiple elements to test how they work together:' },
    { type: 'ul', items: ['List item one', { text: 'List item two with', inline: { type: 'code', content: 'inline code' }}] },
    { type: 'p', content: 'Paragraph between lists with a', inline: [{ type: 'a', content: 'link', href: '#' }, { type: 'strong', content: 'strong text' }] },
    { type: 'ol', items: ['Ordered item one', 'Ordered item two'] },
    { type: 'h4', content: 'Final Section' },
    { type: 'p', content: 'The baseline grid helps ensure consistent vertical spacing throughout long-form content. Every element should align to the 8px grid for optimal reading rhythm. The three variants (default, wide, compact) provide flexibility for different content types while maintaining typographic consistency.' }
  ]

  const renderProseElement = (element, index) => {
    switch (element.type) {
      case 'h1': return <h1 key={index}>{element.content}</h1>
      case 'h2': return <h2 key={index}>{element.content}</h2>
      case 'h3': return <h3 key={index}>{element.content}</h3>
      case 'h4': return <h4 key={index}>{element.content}</h4>
      case 'p':
        return (
          <p key={index}>
            {element.content}
            {element.inline?.map((inline, i) => {
              if (inline.type === 'strong') return <strong key={i}> {inline.content}</strong>
              if (inline.type === 'em') return <em key={i}> {inline.content}</em>
              if (inline.type === 'strong-em') return <strong key={i}><em>{inline.content}</em></strong>
              if (inline.type === 'a') return <a key={i} href={inline.href}> {inline.content}</a>
              if (inline.type === 'code') return <code key={i}> {inline.content}</code>
              return null
            })}
          </p>
        )
      case 'ul':
        return (
          <ul key={index}>
            {element.items.map((item, i) => (
              <li key={i}>
                {typeof item === 'string' ? item : (
                  <>
                    {item.text}
                    {item.inline && item.inline.type === 'code' && <code> {item.inline.content}</code>}
                  </>
                )}
              </li>
            ))}
          </ul>
        )
      case 'ol':
        return (
          <ol key={index}>
            {element.items.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        )
      case 'pre':
        return <pre key={index}><code>{element.content}</code></pre>
      case 'blockquote':
        return <blockquote key={index}>{element.content}</blockquote>
      case 'hr':
        return <hr key={index} />
      case 'pullquote':
        return (
          <div key={index} className="kol-pull-quote">
            <p>{element.content}</p>
            <cite>{element.cite}</cite>
          </div>
        )
      default:
        return null
    }
  }

  const proseExampleContent = (
    <>
      {proseExampleElements.map((element, index) => renderProseElement(element, index))}
    </>
  )

  return (
    <main className="min-h-screen w-full bg-surface-primary breakpoint-padding">
      {/* Hero Section */}
      <OverviewHero
        badge="Prose Specifications"
        title="Stack Prose Typography"
        description="Typography specifications for article and blog content across three width variants. Values for design system implementation."
        categories={['Standard (65ch)', 'Wide (90ch)', 'Compact (45ch)']}
      />

      {/* Featured Image */}
      <section className="w-full py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary border border-fg-08">
            <img
              src={`${cdnBase}/foundry-typefaces/02-raetur/specimen-raetur/01-specimen-hero/specimen-hero-1600.jpg`}
              alt="Stack prose typography specimen"
              className="absolute left-0 top-0 size-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full flex items-center py-24">
        <div className="max-w-[1400px] mx-auto">
          <FoundryFeatureSection
            label="About Stack Prose"
            title="Typography for Articles and Blogs"
            description="Stack Prose is a typography system built with Right Grotesk Tight and Inter Tight, designed for article and blog content. Three width variants provide flexibility for different reading contexts while maintaining consistent vertical rhythm on an 8pt baseline grid."
            imagePosition="right"
            graphic={<img src={`${cdnBase}/foundry-typefaces/02-raetur/specimen-raetur/02-specimen-image/specimen-image-1200.jpg`} alt="Stack prose specimen" className="w-full aspect-[10/6] rounded object-cover border border-fg-08" />}
          />
        </div>
      </section>

      {/* Visual Example */}
      <ProseStylesViewer
        title="Visual Example"
        variants={proseVariants}
        activeVariant={activeVariant}
        onVariantChange={setActiveVariant}
        showGridToggle={true}
        gridSize={8}
      >
        {proseExampleContent}
      </ProseStylesViewer>

      {/* Specifications Tables */}
      <section className="w-full py-24">
        <div className="max-w-[1400px] mx-auto space-y-16">
          {proseStyles.filter(style => style.id === activeVariant).map((style, styleIndex) => (
            <div key={style.id} className="space-y-8">
              <div className="flex justify-between items-end">


                {/* Numbered Title */}
                <div className="flex flex-rox items-baseline w-max-[1400px] gap-4">
                  <h2 className="kol-helper-lg text-auto">{style.name}</h2>
                  <span className="kol-helper-uc-xs text-fg-64">
                    {String(styleIndex + 1).padStart(2, '0')}
                  </span>
                  
                </div>

                {/* Variant Selector */}


                <div className="flex gap-2">
                  <Tag
                    onClick={() => setActiveVariant('default')}
                    className={activeVariant === 'default' ? 'is-active' : ''}
                  >
                    Standard (65ch)
                  </Tag>
                  <Tag
                    onClick={() => setActiveVariant('wide')}
                    className={activeVariant === 'wide' ? 'is-active' : ''}
                  >
                    Wide (90ch)
                  </Tag>
                  <Tag
                    onClick={() => setActiveVariant('compact')}
                    className={activeVariant === 'compact' ? 'is-active' : ''}
                  >
                    Compact (45ch)
                  </Tag>
                </div>

                
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
      <section className="w-full pb-24">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <h2 className="kol-helper-lg text-auto">Implementation Notes</h2>

          <Table
            caption="Implementation Guidelines"
            columns={[
              { header: 'Aspect', accessor: 'aspect', headerClassName: 'kol-table-cell-title', className: 'kol-table-cell-text' },
              {
                header: 'Description',
                accessor: 'description',
                headerClassName: 'kol-table-cell-title',
                className: 'kol-table-cell-meta',
                render: (row) => <span dangerouslySetInnerHTML={{ __html: row.description }} />
              }
            ]}
            rows={[
              {
                aspect: 'Font Families',
                description: 'Headings use <code class="kol-table-token bg-fg-08">Right Grotesk Tight</code>, body text uses <code class="kol-table-token bg-fg-08">Inter Tight</code>, code uses <code class="kol-table-token bg-fg-08">Right Grotesk Mono</code>'
              },
              {
                aspect: 'Responsive Typography',
                description: 'Uses <code class="kol-table-token bg-fg-08">clamp()</code> for fluid scaling between minimum and maximum sizes based on viewport width.'
              },
              {
                aspect: 'Line Heights',
                description: 'Specified as percentages (100%, 110%, etc.) for consistent vertical rhythm across all viewport sizes.'
              },
              {
                aspect: 'Three Variants',
                description: 'Standard (65ch), Wide (90ch), and Compact (45ch) provide optimal line lengths for different content contexts.'
              }
            ]}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Stack Articles"
        description="Articles covering design systems, typography, and development processes."
        action={{
          to: "/stack",
          label: "Browse Stack"
        }}
      />
    </main>
  )
}

export default StackSpecs
