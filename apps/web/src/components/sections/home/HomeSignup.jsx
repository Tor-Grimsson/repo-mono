import { NewsletterBand } from '@kolkrabbi/kol-component'

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
    <NewsletterBand
      id="signup"
      inputId="newsletter-email"
      title="Subscribe to the newsletter"
      description="Get updates on new typefaces, design resources, and selected work."
      placeholder="Your mail address"
      submitLabel="Subscribe"
      onSubmit={handleSubmit}
    />
  )
}

export default HomeSignup
