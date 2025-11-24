import { useState } from 'react'
import { FoundryCTA, OverviewHero, Table, ProseStylesViewer, UnitSelector } from '@kol/ui'
import FoundryFeatureSection from '../components/FoundryFeatureSection'

const DocumentationSpecs = () => {
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
    { header: 'Style', accessor: 'fontStyle', headerClassName: 'dt-cell-title', className: 'dt-cell-meta' }
  ]

  const proseStyles = [
    {
      id: 'documentation',
      name: 'Documentation Style',
      elements: [
        { element: 'Page Title', className: 'doc-title', size: 48, weight: 500, leading: 56, tracking: 0, fontStyle: 'normal' },
        { element: 'Section Header (H2)', className: 'doc-h2', size: 32, weight: 500, leading: 40, tracking: 0, fontStyle: 'normal' },
        { element: 'Subsection Header (H3)', className: 'doc-h3', size: 24, weight: 500, leading: 32, tracking: 0, fontStyle: 'normal' },
        { element: 'Body Text', className: 'doc-body', size: 16, weight: 400, leading: 26, tracking: 0, fontStyle: 'normal' },
        { element: 'Code Inline', className: 'doc-code-inline', size: 14, weight: 400, leading: 20, tracking: 0, fontStyle: 'normal' },
        { element: 'Code Block', className: 'doc-code-block', size: 14, weight: 400, leading: 22, tracking: 0, fontStyle: 'normal' },
        { element: 'Caption', className: 'doc-caption', size: 14, weight: 400, leading: 20, tracking: 0, fontStyle: 'italic' },
        { element: 'List Item', className: 'doc-list', size: 16, weight: 400, leading: 26, tracking: 0, fontStyle: 'normal' }
      ]
    }
  ]
  // pills props
  const proseVariants = [
    { id: 'default', label: 'Documentation', className: '' }
  ]

  const proseExampleElements = [
    { type: 'h1', content: 'Page Title' },
    { type: 'p', content: 'This is a paragraph following the main heading. The text should align to the 8px baseline grid for consistent vertical rhythm across all documentation content.' },
    { type: 'h2', content: 'Section Header Level 2' },
    { type: 'p', content: 'This paragraph follows a section heading. Notice how the spacing maintains the baseline grid.', inline: [{ type: 'strong', content: 'Bold text' }, { type: 'em', content: 'italic text' }] },
    { type: 'h3', content: 'Subsection Header Level 3' },
    { type: 'p', content: 'Multiple paragraphs help visualize the rhythm.', inline: [{ type: 'a', content: 'Links are styled', href: '#' }] },
    { type: 'h3', content: 'Unordered List Example' },
    { type: 'ul', items: [
      'First list item with plus marker',
      'Second item showing alignment',
      'Third item to verify spacing',
      'Fourth item with longer text to demonstrate how multi-line list items wrap and maintain proper baseline alignment'
    ]},
    { type: 'h3', content: 'Ordered List Example' },
    { type: 'ol', items: ['First numbered item', 'Second numbered item', 'Third numbered item'] },
    { type: 'h3', content: 'Code Block Example' },
    { type: 'pre', content: 'function example() {\n  return "code blocks align to baseline"\n}' },
    { type: 'p', content: 'Paragraph after code block to check spacing.' },
    { type: 'h3', content: 'Inline Code Example' },
    { type: 'p', content: 'Some text with', inline: [{ type: 'code', content: 'inline code' }] },
    { type: 'p', content: 'Caption text demonstrating smaller size for image descriptions and attributions.', className: 'text-sm italic text-fg-64' }
  ]

  const renderProseElement = (element, index) => {
    const className = element.className || ''
    switch (element.type) {
      case 'h1': return <h1 key={index} className={className}>{element.content}</h1>
      case 'h2': return <h2 key={index} className={className}>{element.content}</h2>
      case 'h3': return <h3 key={index} className={className}>{element.content}</h3>
      case 'p':
        return (
          <p key={index} className={className}>
            {element.content}
            {element.inline?.map((inline, i) => {
              if (inline.type === 'strong') return <strong key={i}> {inline.content}</strong>
              if (inline.type === 'em') return <em key={i}> {inline.content}</em>
              if (inline.type === 'a') return <a key={i} href={inline.href}> {inline.content}</a>
              if (inline.type === 'code') return <code key={i}> {inline.content}</code>
              return null
            })}
          </p>
        )
      case 'ul':
        return (
          <ul key={index}>
            {element.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )
      case 'ol':
        return (
          <ol key={index}>
            {element.items.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        )
      case 'pre':
        return (
          <div key={index} className="docs-codeblock-wrapper">
            <div className="docs-codeblock">
              <code>{element.content}</code>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const proseExampleContent = (
    <div className="docs-article" style={{ maxWidth: '760px', marginInline: 'auto' }}>
      {proseExampleElements.map((element, index) => renderProseElement(element, index))}
    </div>
  )

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <OverviewHero
        badge="Prose Specifications"
        title="Documentation Prose Typography"
        description="Typography specifications for wiki-style documentation. Values for design system implementation."
        categories={['Right Grotesk', '8 Elements', 'Wiki Style']}
      />

      {/* Featured Image */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary">
            <img
              src="/img/typefaces/rot/set-g-05.png"
              alt="Documentation prose typography specimen"
              className="absolute left-0 top-0 size-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full flex items-center px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FoundryFeatureSection
            label="About Documentation Prose"
            title="Typography for Wiki-Style Documentation"
            description="Documentation Prose is built with Right Grotesk for a clean, technical aesthetic. Designed for wiki-style documentation with clear hierarchy, optimized readability, and support for code blocks, technical content, and structured information."
            imagePosition="left"
            graphic={<img src="/img/typefaces/rot/set-g-07.png" alt="Documentation prose specimen" className="w-full aspect-[10/7] rounded object-cover" />}
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
                description: 'All styles use <code class="dataTableToken bg-fg-08">Right Grotesk, sans-serif</code>'
              },
              {
                aspect: 'Color',
                description: 'Text color follows theme system: <code class="dataTableToken bg-fg-08">text-auto</code>'
              },
              {
                aspect: 'Line Height',
                description: 'Leading values shown as absolute pixel values. Convert to em by dividing by font size for responsive scaling.'
              },
              {
                aspect: 'Letter Spacing',
                description: 'Tracking shown as em units. Use <code class="dataTableToken bg-fg-08">letter-spacing</code> in CSS.'
              }
            ]}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Workshop Documentation"
        description="Design system documentation with typography, components, and guidelines."
        action={{
          to: "/workshop/documentation",
          label: "View Documentation"
        }}
      />
    </main>
  )
}

export default DocumentationSpecs
