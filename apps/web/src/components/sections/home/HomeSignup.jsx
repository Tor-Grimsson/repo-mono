import { SectionNewsletter } from '@kolkrabbi/kol-component'

const HomeSignup = () => {
  const handleSubmit = async (email) => {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    if (!response.ok) {
      throw new Error('Subscription failed')
    }
  }

  return (
    <SectionNewsletter
      id="signup"
      background="bg-fg-absolute-16"
      fullBleed
      controlSize="lg"
      inputId="newsletter-email"
      headline="Subscribe to the newsletter"
      body="Get updates on new typefaces, design resources, and selected work."
      placeholder="Your mail address"
      submitLabel="Subscribe"
      /* the band is dark in both themes; `secondary` is the ink-on-page control
       * (SectionNewsletterSubmitVariant, component 0.157.0) */
      submitVariant="secondary"
      onSubmit={handleSubmit}
    />
  )
}

export default HomeSignup
