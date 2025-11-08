import { Link } from 'react-router-dom'
import { Pill } from '@kol/ui'

const FoundryLicensing = () => {
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
      answer: 'Attribution is appreciated but not required. If you want to credit us, link to kolkrabbi.com or mention "Typeface by Kolkrabbi Foundry".'
    },
    {
      question: 'What license are these fonts under?',
      answer: 'Our fonts are released under the SIL Open Font License 1.1, which allows for free commercial use with some restrictions on redistribution.'
    }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <section className="w-full px-8 py-24 lg:py-32">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <Pill variant="subtle">Free & Open Source</Pill>

          <h1 className="kol-display-section text-auto">
            Licensing
          </h1>

          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <p className="kol-text-lg text-auto max-w-[700px] mx-auto">
            All Kolkrabbi typefaces are free for personal and commercial use.
            No sign-up, no tracking, no restrictions on usage.
          </p>
        </div>
      </section>

      {/* License Cards */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          {licenses.map((license) => (
            <div key={license.name} className="bg-container-primary p-12 rounded-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Overview */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <h2 className="kol-heading-lg text-auto">{license.name}</h2>
                      <span className="kol-display-subsection text-auto">{license.price}</span>
                    </div>
                    <p className="kol-text-md text-fg-64">{license.description}</p>
                  </div>

                  <Link
                    to={license.ctaLink}
                    className="inline-block px-12 py-4 bg-surface-inverse text-auto kol-helper-uc-md hover:bg-fg-88 transition-colors"
                  >
                    {license.cta}
                  </Link>

                  <div className="pt-4">
                    <p className="kol-mono-xs text-fg-64">
                      Released under SIL Open Font License 1.1
                    </p>
                  </div>
                </div>

                {/* Right: Features & Restrictions */}
                <div className="space-y-8">
                  <div>
                    <h3 className="kol-heading-sm text-auto mb-4">What's Included</h3>
                    <ul className="space-y-2">
                      {license.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-auto text-lg mt-1">✓</span>
                          <span className="kol-text-sm text-auto">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="kol-heading-sm text-auto mb-4">Restrictions</h3>
                    <ul className="space-y-2">
                      {license.restrictions.map((restriction, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-auto text-lg mt-1">×</span>
                          <span className="kol-text-sm text-fg-64">{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* License Details */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <h2 className="kol-heading-lg text-auto mb-3">License Details</h2>
            <p className="kol-text-md text-fg-64">Understanding the SIL Open Font License</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-container-primary p-8 rounded-sm space-y-4">
              <h3 className="kol-heading-sm text-auto">You Can</h3>
              <div className="space-y-3">
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Use Freely</div>
                  <p className="kol-text-sm text-fg-64">Use for any personal or commercial project without payment</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Embed Anywhere</div>
                  <p className="kol-text-sm text-fg-64">Embed in websites, apps, PDFs, and digital products</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Modify</div>
                  <p className="kol-text-sm text-fg-64">Create derivative works and customize for your needs</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Bundle</div>
                  <p className="kol-text-sm text-fg-64">Include in software or design tool distributions</p>
                </div>
              </div>
            </div>

            <div className="bg-container-primary p-8 rounded-sm space-y-4">
              <h3 className="kol-heading-sm text-auto">You Cannot</h3>
              <div className="space-y-3">
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Sell Original Files</div>
                  <p className="kol-text-sm text-fg-64">Cannot sell or license unmodified font files on their own</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Sublicense</div>
                  <p className="kol-text-sm text-fg-64">Cannot sublicense the fonts under a different license</p>
                </div>
                <div>
                  <div className="kol-label-mono-xs text-auto mb-1">Use Reserved Names</div>
                  <p className="kol-text-sm text-fg-64">Modified versions cannot use reserved font names</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-12">
            <h2 className="kol-heading-lg text-auto mb-3">Frequently Asked Questions</h2>
            <p className="kol-text-md text-fg-64">Common questions about licensing and usage</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-container-primary p-8 rounded-sm space-y-3">
                <h3 className="kol-heading-sm text-auto">{faq.question}</h3>
                <p className="kol-text-md text-fg-64">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Licensing */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[900px] mx-auto bg-container-primary p-12 rounded-sm text-center space-y-6">
          <h2 className="kol-heading-lg text-auto">Need Custom Licensing?</h2>
          <p className="kol-text-md text-fg-64 max-w-[600px] mx-auto">
            If you need custom licensing terms, extended technical support, or commissioned typeface work, get in touch.
          </p>
          <div className="pt-4">
            <a
              href="mailto:hello@kolkrabbi.com"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto kol-helper-uc-md hover:bg-fg-88 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="w-32 h-[1px] bg-fg-24 mx-auto" />

          <h2 className="kol-heading-lg text-auto">
            Ready to Get Started?
          </h2>

          <p className="kol-text-lg text-auto max-w-[600px] mx-auto">
            Download our typefaces and start using them in your projects today. No registration required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/foundry/typefaces"
              className="inline-block px-12 py-4 bg-surface-inverse text-auto kol-helper-uc-md hover:bg-fg-88 transition-colors"
            >
              View All Typefaces
            </Link>
            <Link
              to="/foundry/specimens"
              className="inline-block px-12 py-4 border border-fg-24 text-auto kol-helper-uc-md hover:border-fg-48 transition-colors"
            >
              Browse Specimens
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FoundryLicensing
