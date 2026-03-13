import { useState } from 'react'
import SEO from '../../components/layout/SEO'
import { Pill, Icon, FoundryCTA } from '@kol/ui'

const FoundryLicensing = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const faqs = [
    {
      question: 'Can I use these fonts for client work?',
      answer: 'All fonts are free for commercial use, including client projects, branding, and commercial products.'
    },
    {
      question: 'Can I embed fonts in websites and apps?',
      answer: 'Web embedding via @font-face and mobile app embedding are both permitted.'
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
      answer: 'Attribution is appreciated but not required. If you want to credit, link to kolkrabbi.io or mention "Typeface by Kolkrabbi Foundry".'
    },
    {
      question: 'What license are these fonts under?',
      answer: 'These fonts are released under the SIL Open Font License 1.1, which allows for free commercial use with some restrictions on redistribution.'
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
      <main className="min-h-screen w-full bg-surface-primary breakpoint-padding">
      {/* Hero Section */}
      <section className="w-full pt-24 pb-24 lg:pt-36 lg:pb-36 mt-24">
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

      {/* FAQ Section */}
      <section className="w-full py-16">
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
