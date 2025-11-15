import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { Pill, Button, Icon, FoundryCTA } from '@kol/ui'

const FoundryLicensing = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const licenses = [
    {
      name: 'Personal & Commercial Use',
      price: 'Free',
      description: 'For personal projects, commercial work, client projects, and open source',
      features: [
        'Desktop use (unlimited computers)',
        'Web embedding (@font-face)',
        'Mobile app embedding',
        'Logos and branding',
        'Commercial products',
        'Modification allowed',
        'Redistribution of modified versions'
      ],
      restrictions: [
        'Cannot sell unmodified font files',
        'Cannot redistribute original files'
      ],
      cta: 'Download',
      ctaLink: '/foundry'
    }
  ]

  const faqs = [
    {
      question: 'Can I use these fonts for client work?',
      answer: 'Yes! All fonts are free for commercial use, including client projects, branding, and commercial products.'
    },
    {
      question: 'Can I embed fonts in websites and apps?',
      answer: 'Absolutely. Web embedding via @font-face and mobile app embedding are both permitted.'
    },
    {
      question: 'Can I modify the fonts?',
      answer: 'Yes, you can modify the fonts for your own use. If you redistribute modified versions, they must be under the same license.'
    },
    {
      question: 'Can I sell products that use these fonts?',
      answer: 'Yes. You can use the fonts in products you sell (t-shirts, posters, books, apps, etc.). You just cannot sell the font files themselves.'
    },
    {
      question: 'Do I need to credit the foundry?',
      answer: 'Attribution is appreciated but not required. If you want to credit us, link to kolkrabbi.io or mention "Typeface by Kolkrabbi Foundry".'
    },
    {
      question: 'What license are these fonts under?',
      answer: 'Our fonts are released under the SIL Open Font License 1.1, which allows for free commercial use with some restrictions on redistribution.'
    }
  ]

  return (
    <>
      <SEO
        title="Font Licensing — Kolkrabbi Foundry"
        description="All Kolkrabbi typefaces are free and open-source under the SIL Open Font License (OFL). Learn about usage rights and permissions."
        ogTitle="Font Licensing Information"
        ogDescription="Free and open-source fonts under SIL OFL license"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/licensing"
        canonical="https://kolkrabbi.io/foundry/licensing"
      />
      <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 pt-24 pb-24 lg:pt-36 lg:pb-36 mt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <Pill variant="subtle">Free & Open Source</Pill>

            <h1 className="kol-display-lg text-auto">
              Licensing
            </h1>

            <div className="w-32 h-[1px] bg-fg-24" />

            <p className="kol-mono-text text-fg-64 max-w-[700px]">
              All Kolkrabbi typefaces are free for personal and commercial use.
              No sign-up, no tracking, no restrictions on usage.
            </p>
          </div>
        </div>
      </section>

      {/* License Cards */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          {licenses.map((license) => (
            <div key={license.name} className="flex flex-col lg:flex-row gap-12">
              {/* Left: Overview */}
              <div className="w-full lg:w-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <h2 className="kol-heading-lg text-auto">{license.name}</h2>
                    <span className="kol-display-subsection text-auto">{license.price}</span>
                  </div>
                  <p className="kol-mono-sm text-fg-64">{license.description}</p>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <Link to={license.ctaLink}>
                    <Button variant="primary" size="lg" uppercase={true}>
                      {license.cta}
                    </Button>
                  </Link>

                  <p className="kol-mono-xs text-fg-64">
                    Released under SIL Open Font License 1.1
                  </p>
                </div>
              </div>

              {/* Right: Features & Restrictions in boxes */}
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                {/* What's Included Box */}
                <div className="flex-1 bg-container-primary p-8 rounded-sm">
                  <h3 className="kol-heading-sm text-auto mb-4">What's Included</h3>
                  <ul className="space-y-4">
                    {license.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Icon name="check-mark" size={16} className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="kol-mono-sm text-auto">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions Box */}
                <div className="flex-1 bg-container-primary p-8 rounded-sm">
                  <h3 className="kol-heading-sm text-auto mb-4">Restrictions</h3>
                  <ul className="space-y-4">
                    {license.restrictions.map((restriction, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Icon name="cross" size={16} className="text-red-500 mt-1 flex-shrink-0" />
                        <span className="kol-mono-sm text-fg-64">{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* License Details */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <h2 className="kol-heading-lg text-auto mb-3">License Details</h2>
            <p className="kol-mono-sm text-fg-64">Understanding the SIL Open Font License</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-container-primary p-8 rounded-sm space-y-6">
              <h3 className="kol-heading-sm text-auto">You Can</h3>
              <div className="space-y-5">
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Use Freely</div>
                  <p className="kol-mono-sm text-fg-64">Use for any personal or commercial project without payment</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Embed Anywhere</div>
                  <p className="kol-mono-sm text-fg-64">Embed in websites, apps, PDFs, and digital products</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Modify</div>
                  <p className="kol-mono-sm text-fg-64">Create derivative works and customize for your needs</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Bundle</div>
                  <p className="kol-mono-sm text-fg-64">Include in software or design tool distributions</p>
                </div>
              </div>
            </div>

            <div className="bg-container-primary p-8 rounded-sm space-y-6">
              <h3 className="kol-heading-sm text-auto">You Cannot</h3>
              <div className="space-y-5">
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Sell Original Files</div>
                  <p className="kol-mono-sm text-fg-64">Cannot sell or license unmodified font files on their own</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Sublicense</div>
                  <p className="kol-mono-sm text-fg-64">Cannot sublicense the fonts under a different license</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Use Reserved Names</div>
                  <p className="kol-mono-sm text-fg-64">Modified versions cannot use reserved font names</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
            <div>
              <h2 className="kol-heading-lg text-auto mb-3">Frequently Asked Questions</h2>
              <p className="kol-mono-sm text-fg-64">Common questions about licensing and usage</p>
            </div>

            <div className="space-y-4 min-w-[720px]">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div key={index} className="bg-container-primary rounded-sm">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-8 flex items-center justify-between text-left"
                    >
                      <h3 className="kol-mono-text text-auto">{faq.question}</h3>
                      <Icon
                        name={isOpen ? 'minus' : 'plus'}
                        size={20}
                        className="text-auto flex-shrink-0 ml-4"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-8 pb-8">
                        <p className="kol-mono-sm text-fg-64">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Need Custom Licensing?"
        description="If you need custom licensing terms, extended technical support, or commissioned typeface work, get in touch."
        action={[
          {
            to: "mailto:hello@kolkrabbi.com",
            label: "Contact Us"
          }
        ]}
      />
    </main>
    </>
  )
}

export default FoundryLicensing
