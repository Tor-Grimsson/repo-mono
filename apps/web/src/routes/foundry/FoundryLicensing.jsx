import SEO from '../../components/layout/SEO'
import { Pill, SectionHero, SectionFaq, SectionCta, Button } from '@kolkrabbi/kol-component'

const FoundryLicensing = () => {
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
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-01.png"
        ogUrl="https://kolkrabbi.io/foundry/licensing"
        canonical="https://kolkrabbi.io/foundry/licensing"
      />
      <main id="main" className="min-h-screen w-full bg-surface-primary">
      {/* Text-only SectionHero (round 2): no media → SectionText on the
        * surface, no glass. The old hand-built hero's hairline between title
        * and lede has no slot in the anatomy and is gone. */}
      <SectionHero
        height="60"
        label={<Pill variant="subtle">Free & Open Source</Pill>}
        headline="Licensing"
        headlineSize="display-01"
        headlineAs="h1"
        body="All Kolkrabbi typefaces are free for personal and commercial use. No sign-up, no tracking, no restrictions on usage."
      />

      {/* SectionFaq ships its own `px-5` — measured 2026-09-01, wrapping it in
        * `.kol-page` double-pads it to 40 at mobile. It owns its gutter; left
        * bare. The hero above is full-bleed by design. */}
      <SectionFaq
        headline="Frequently Asked Questions"
        headlineSize="heading-01"
        body="Common questions about licensing and usage"
        items={faqs.map((f) => ({ q: f.question, a: f.answer }))}
        singleOpen
        defaultOpen={0}
      />

      {/* Bottom CTA — SectionCta ships NO horizontal padding, so the page owns
        * it here exactly as on Home and Studio (kol-framework.css:340).
        * PageGutterOwnership remainder, filed 2026-08-30. */}
      <div className="kol-page">
        <SectionCta
          variant="centered"
          headline="Need Custom Licensing?"
          body="If you need custom licensing terms, extended technical support, or commissioned typeface work, get in touch."
          actions={<Button href="mailto:hello@kolkrabbi.com">Contact Us</Button>}
        />
      </div>
    </main>
    </>
  )
}

export default FoundryLicensing
