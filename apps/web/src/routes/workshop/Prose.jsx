import { useState, useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kol/ui/layout'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import { Tag } from '@kol/ui'

const PROSE_DOC_LINKS = [
  { id: '2.4.0-prose-styles-index', label: 'Prose Styles Index' },
  { id: '2.4.1-text-styles-kol', label: 'Text Styles – Kol' }
]

const Prose = () => {
  const [variant, setVariant] = useState('default')
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={PROSE_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])
  const [showGrid, setShowGrid] = useState(false)
  const gridSize = 8

  const variantClass =
    variant === 'wide' ? 'kol-prose-wide' :
    variant === 'compact' ? 'kol-prose-compact' :
    'kol-prose'

  return (
    <div className="space-y-10">

      {/* Header */}
      <header className="space-y-3">
        <h2 className="kol-heading-section">Prose System</h2>
        <p className="kol-mono-text">Typography system for long-form content</p>
        <p className="kol-mono-xs text-fg-64 mt-8">8px baseline grid · Three width variants · Optimized for reading</p>
        <div className="divider-auto mb-16"></div>
      </header>

      {/* Controls - switch variants and toggle grid */}
      <div className="flex flex-wrap gap-3">
        <Tag
          onClick={() => setVariant('default')}
          className={variant === 'default' ? 'is-active' : ''}
        >
          Default (65ch)
        </Tag>
        <Tag
          onClick={() => setVariant('wide')}
          className={variant === 'wide' ? 'is-active' : ''}
        >
          Wide (90ch)
        </Tag>
        <Tag
          onClick={() => setVariant('compact')}
          className={variant === 'compact' ? 'is-active' : ''}
        >
          Compact (45ch)
        </Tag>
        <Tag
          onClick={() => setShowGrid(!showGrid)}
          className={showGrid ? 'is-active' : ''}
        >
          {showGrid ? 'Hide' : 'Show'} Baseline Grid
        </Tag>
      </div>

      {/* Prose showcase with optional baseline grid */}
      <div className="relative overflow-hidden">

        {/* Baseline grid overlay - inline, no separate component */}
        {showGrid && (
          <svg
            className="absolute pointer-events-none"
            style={{
              opacity: 0.12,
              width: '200vw',
              height: '200vh',
              left: '-50vw',
              top: '-50vh'
            }}
          >
            <defs>
              <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                <path
                  d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        )}

        {/* All prose examples - content is right here where you see it */}
        <div className={`relative ${variantClass}`}>

          <h1>Display Heading Level 1</h1>
          <p>
            This is a paragraph following the main heading. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            The text should align to the 8px baseline grid for consistent vertical rhythm.
          </p>

          <h2>Section Heading Level 2</h2>
          <p>
            This paragraph follows a section heading. Notice how the spacing maintains the baseline grid.
            <strong>Bold text</strong> and <em>italic text</em> should maintain the same baseline as regular text.
          </p>

          <h3>Subsection Heading Level 3</h3>
          <p>
            Multiple paragraphs help visualize the rhythm. <a href="#">Links are styled</a> but don't disrupt
            the baseline. The goal is consistent spacing throughout.
          </p>

          <h4>Minor Heading Level 4</h4>
          <p>
            This is the smallest heading level, useful for minor sections and labels.
          </p>

          <h3>Unordered List Example</h3>
          <ul>
            <li>First list item with plus marker</li>
            <li>Second item showing alignment</li>
            <li>Third item to verify spacing</li>
            <li>Fourth item with longer text to demonstrate how multi-line list items wrap and maintain proper baseline alignment throughout</li>
          </ul>

          <h3>Ordered List Example</h3>
          <ol>
            <li>First numbered item</li>
            <li>Second numbered item</li>
            <li>Third numbered item</li>
            <li>Fourth numbered item</li>
          </ol>

          <h3>Code Block Example</h3>
          <pre><code>function example() {"{"}
  return "code blocks should align"
{"}"}</code></pre>

          <p>Paragraph after code block to check spacing.</p>

          <h3>Inline Code Example</h3>
          <p>
            Some text with <code>inline code</code> that should maintain the baseline grid without disrupting the flow.
          </p>

          <h3>Blockquote Example</h3>
          <blockquote>
            This is a blockquote that should maintain baseline alignment while having distinct styling.
          </blockquote>

          <p>Text after blockquote.</p>

          <hr />

          <p>Content after horizontal rule.</p>

          <h3>Pull Quote Example</h3>
          <div className="kol-pull-quote">
            <p>A pull quote stands out but should still respect vertical rhythm.</p>
            <cite>— Attribution</cite>
          </div>

          <h3>Link Variations</h3>
          <p>
            This paragraph contains <a href="#">standard links</a> and demonstrates how they integrate
            with body text. Links should be clearly distinguishable but not disruptive.
          </p>

          <h3>Text Formatting</h3>
          <p>
            This paragraph demonstrates various <strong>strong emphasis</strong>, <em>italic emphasis</em>,
            and combinations like <strong><em>bold italic text</em></strong> within flowing content.
          </p>

          <h3>Mixed Content Flow</h3>
          <p>
            This section combines multiple elements to test how they work together:
          </p>
          <ul>
            <li>List item one</li>
            <li>List item two with <code>inline code</code></li>
          </ul>
          <p>
            Paragraph between lists with a <a href="#">link</a> and <strong>strong text</strong>.
          </p>
          <ol>
            <li>Ordered item one</li>
            <li>Ordered item two</li>
          </ol>

          <h4>Final Section</h4>
          <p>
            The baseline grid helps ensure consistent vertical spacing throughout long-form content.
            Every element should align to the 8px grid for optimal reading rhythm. The three variants
            (default, wide, compact) provide flexibility for different content types while maintaining
            typographic consistency.
          </p>

        </div>
      </div>

      {/* System info - inline, no separate components */}
      <div className="space-y-4 mt-16">
        <h3 className="kol-heading-sm">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-fg-02 rounded border border-fg-08">
            <p className="kol-mono-xs text-fg-64 mb-2">Base Grid Unit</p>
            <p className="kol-text-lg">8px</p>
          </div>
          <div className="p-4 bg-fg-02 rounded border border-fg-08">
            <p className="kol-mono-xs text-fg-64 mb-2">Line Height</p>
            <p className="kol-text-lg">150% (1.5)</p>
          </div>
          <div className="p-4 bg-fg-02 rounded border border-fg-08">
            <p className="kol-mono-xs text-fg-64 mb-2">Base Font Size</p>
            <p className="kol-text-lg">16px</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Prose
