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
      inputId="newsletter-email"
      headline="Subscribe to the newsletter"
      body="Get updates on new typefaces, design resources, and selected work."
      placeholder="Your mail address"
      submitLabel="Subscribe"
      onSubmit={handleSubmit}
    />
  )
}

export default HomeSignup
