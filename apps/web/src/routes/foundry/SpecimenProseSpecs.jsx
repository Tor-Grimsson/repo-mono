import { Link } from 'react-router-dom'
import { useState } from 'react'

const SpecimenProseSpecs = () => {
  const [showUnits, setShowUnits] = useState('px')

  const proseStyles = [
    {
      id: 'title-page',
      name: 'Title Page',
      elements: [
        { element: 'Main Title', size: 64, weight: 400, leading: 72, tracking: 20, fontStyle: 'normal' },
        { element: 'Subtitle', size: 20, weight: 400, leading: 28, tracking: 0, fontStyle: 'italic' },
        { element: 'Foundry Name', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal' }
      ]
    },
    {
      id: 'toc',
      name: 'Table of Contents',
      elements: [
        { element: 'TOC Title', size: 48, weight: 500, leading: 56, tracking: 0, fontStyle: 'normal' },
        { element: 'Chapter Title', size: 20, weight: 400, leading: 28, tracking: 0, fontStyle: 'normal' },
        { element: 'Page Number', size: 20, weight: 400, leading: 28, tracking: 0, fontStyle: 'normal' }
      ]
    },
    {
      id: 'editorial',
      name: 'Editorial Article',
      elements: [
        { element: 'Article Title', size: 48, weight: 500, leading: 56, tracking: 0, fontStyle: 'normal' },
        { element: 'Subtitle', size: 24, weight: 400, leading: 32, tracking: 0, fontStyle: 'italic' },
        { element: 'Body Text', size: 18, weight: 400, leading: 28, tracking: 0, fontStyle: 'normal' },
        { element: 'Pull Quote', size: 28, weight: 400, leading: 36, tracking: 0, fontStyle: 'italic' },
        { element: 'Sidebar Label', size: 14, weight: 500, leading: 20, tracking: 50, fontStyle: 'normal' },
        { element: 'Sidebar Text', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal' }
      ]
    },
    {
      id: 'data-table',
      name: 'Data Table',
      elements: [
        { element: 'Table Title', size: 32, weight: 500, leading: 40, tracking: 0, fontStyle: 'normal' },
        { element: 'Column Header', size: 16, weight: 500, leading: 24, tracking: 0, fontStyle: 'normal' },
        { element: 'Table Cell', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal' },
        { element: 'Caption', size: 14, weight: 400, leading: 20, tracking: 0, fontStyle: 'italic' }
      ]
    },
    {
      id: 'menu',
      name: 'Menu / Bill of Fare',
      elements: [
        { element: 'Restaurant Name', size: 48, weight: 500, leading: 56, tracking: 0, fontStyle: 'normal' },
        { element: 'Category', size: 20, weight: 500, leading: 28, tracking: 100, fontStyle: 'normal' },
        { element: 'Item Name', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal' },
        { element: 'Description', size: 14, weight: 400, leading: 20, tracking: 0, fontStyle: 'italic' },
        { element: 'Price', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal' }
      ]
    },
    {
      id: 'newsletter',
      name: 'Newsletter / Bulletin',
      elements: [
        { element: 'Newsletter Title', size: 40, weight: 500, leading: 48, tracking: 0, fontStyle: 'normal' },
        { element: 'Issue Date', size: 18, weight: 400, leading: 24, tracking: 0, fontStyle: 'italic' },
        { element: 'Column Text', size: 16, weight: 400, leading: 24, tracking: 0, fontStyle: 'normal' },
        { element: 'Section Header', size: 20, weight: 500, leading: 28, tracking: 0, fontStyle: 'normal' }
      ]
    },
    {
      id: 'index',
      name: 'Index / Directory',
      elements: [
        { element: 'Index Title', size: 32, weight: 500, leading: 40, tracking: 0, fontStyle: 'normal' },
        { element: 'Term', size: 16, weight: 500, leading: 24, tracking: 0, fontStyle: 'normal' },
        { element: 'Definition', size: 14, weight: 400, leading: 20, tracking: 0, fontStyle: 'normal' }
      ]
    },
    {
      id: 'chapter',
      name: 'Chapter Opening',
      elements: [
        { element: 'Chapter Number', size: 20, weight: 400, leading: 28, tracking: 0, fontStyle: 'normal' },
        { element: 'Chapter Title', size: 48, weight: 500, leading: 56, tracking: 0, fontStyle: 'normal' },
        { element: 'Opening Text', size: 18, weight: 400, leading: 28, tracking: 0, fontStyle: 'normal' }
      ]
    }
  ]

  const convertToRem = (px) => (px / 16).toFixed(3)
  const convertToEm = (px, base) => (px / base).toFixed(3)

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
            <div className="space-y-4">
              <Link to="/specimen/prose" className="kol-mono-xs text-auto hover:text-fg-64 transition-colors flex items-center gap-2">
                <span>←</span>
                Back to Prose Styles
              </Link>
              <h1 className="kol-display-section text-auto">
                Style Specifications
              </h1>
              <p className="kol-text-md text-fg-64 max-w-[600px]">
                Complete typographic specifications for all 8 prose styles. Copy these values directly into your design system or stylesheet.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowUnits('px')}
                className={`px-4 py-2 kol-helper-uc-xs transition-colors ${
                  showUnits === 'px' ? 'bg-surface-inverse text-auto' : 'bg-container-primary text-auto'
                }`}
              >
                Pixels
              </button>
              <button
                onClick={() => setShowUnits('rem')}
                className={`px-4 py-2 kol-helper-uc-xs transition-colors ${
                  showUnits === 'rem' ? 'bg-surface-inverse text-auto' : 'bg-container-primary text-auto'
                }`}
              >
                Rem
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Tables */}
      <section className="w-full px-8 pb-24">
        <div className="max-w-[1400px] mx-auto space-y-16">
          {proseStyles.map((style, styleIndex) => (
            <div key={style.id} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="kol-label-mono-xs text-fg-64">
                  {String(styleIndex + 1).padStart(2, '0')}
                </span>
                <h2 className="kol-heading-md text-auto">{style.name}</h2>
              </div>

              <div className="bg-container-primary rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-fg-16">
                        <th className="text-left px-6 py-4 kol-label-mono-xs text-auto">Element</th>
                        <th className="text-left px-6 py-4 kol-label-mono-xs text-auto">Size</th>
                        <th className="text-left px-6 py-4 kol-label-mono-xs text-auto">Weight</th>
                        <th className="text-left px-6 py-4 kol-label-mono-xs text-auto">Leading</th>
                        <th className="text-left px-6 py-4 kol-label-mono-xs text-auto">Tracking</th>
                        <th className="text-left px-6 py-4 kol-label-mono-xs text-auto">Style</th>
                      </tr>
                    </thead>
                    <tbody>
                      {style.elements.map((element, elemIndex) => (
                        <tr key={elemIndex} className="border-b border-fg-08 last:border-0">
                          <td className="px-6 py-4 kol-mono-sm text-auto">{element.element}</td>
                          <td className="px-6 py-4 kol-mono-sm text-auto font-['Right_Grotesk_Mono'] font-normal">
                            {showUnits === 'px' ? `${element.size}px` : `${convertToRem(element.size)}rem`}
                          </td>
                          <td className="px-6 py-4 kol-mono-sm text-auto font-['Right_Grotesk_Mono'] font-normal">{element.weight}</td>
                          <td className="px-6 py-4 kol-mono-sm text-auto font-['Right_Grotesk_Mono'] font-normal">
                            {showUnits === 'px' ? `${element.leading}px` : `${convertToEm(element.leading, element.size)}em`}
                          </td>
                          <td className="px-6 py-4 kol-mono-sm text-auto font-['Right_Grotesk_Mono'] font-normal">
                            {element.tracking > 0 ? `${element.tracking / 1000}em` : '0'}
                          </td>
                          <td className="px-6 py-4 kol-mono-sm text-fg-64 italic">{element.fontStyle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Notes */}
      <section className="w-full px-8 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-container-primary p-12 rounded-sm space-y-8">
            <h2 className="kol-heading-md text-auto">Implementation Notes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="kol-heading-sm text-auto">Font Family</h3>
                <p className="kol-text-sm text-fg-64">
                  All styles use <code className="kol-mono-xs bg-fg-08 px-2 py-1">font-family: 'TG_Malromur', serif</code>
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="kol-heading-sm text-auto">Color</h3>
                <p className="kol-text-sm text-fg-64">
                  Text color: <code className="kol-mono-xs bg-fg-08 px-2 py-1">#000000</code> on light backgrounds
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="kol-heading-sm text-auto">Line Height</h3>
                <p className="kol-text-sm text-fg-64">
                  Leading values shown as absolute pixel values. Convert to em by dividing by font size for responsive scaling.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="kol-heading-sm text-auto">Letter Spacing</h3>
                <p className="kol-text-sm text-fg-64">
                  Tracking shown as em units. Use <code className="kol-mono-xs bg-fg-08 px-2 py-1">letter-spacing</code> in CSS.
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <h3 className="kol-heading-sm text-auto">Example CSS</h3>
              <pre className="bg-surface-secondary p-6 rounded-sm overflow-x-auto">
                <code className="kol-mono-sm text-auto">{`.editorial-title {
  font-family: 'TG_Malromur', serif;
  font-size: ${showUnits === 'px' ? '48px' : '3rem'};
  font-weight: 500;
  line-height: ${showUnits === 'px' ? '56px' : '1.167em'};
  letter-spacing: 0;
  font-style: normal;
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="kol-heading-lg text-auto">
            See It In Action
          </h2>

          <p className="kol-text-lg text-auto max-w-[600px] mx-auto">
            View the complete prose styles specimen to see these specifications applied in real-world contexts.
          </p>

          <div className="pt-4">
            <Link
              to="/specimen/three"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto kol-helper-uc-md hover:bg-fg-88 transition-colors"
            >
              View Full Specimen
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SpecimenProseSpecs
