import { Button, Input } from '@kol/ui'
import { useEffect, useState } from 'react'

const HomeSignup = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('') // 'success', 'error', or ''

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          } else {
            entry.target.classList.remove('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setStatus('error')
      return
    }

    try {
      const response = await fetch('https://formspree.io/f/xkgagper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: 'Website Newsletter'
        }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setStatus('error')
    }
  }

  return (
    <section id="signup" className="w-full flex flex-col items-center justify-center text-center">
      <div className="max-w-[1400px] mx-auto py-24">
        {/* Heading */}
        <h2 className="kol-display-lg mb-6 opacity-0 animate-on-scroll">
          Subscribe to the newsletter
        </h2>

        {/* Description */}
        <p className="kol-mono-sm-regular text-auto mb-12 mx-auto max-w-[64rem] opacity-0 animate-on-scroll">
          Get updates on new typefaces, design resources, and selected work.
        </p>

        {/* Email form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mb-16 opacity-0 animate-on-scroll sm:flex-row sm:items-center sm:justify-center sm:gap-3"
        >
          <Input
            id="newsletter-email"
            type="email"
            placeholder="Your mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="md"
            aria-required="true"
            aria-describedby={status === 'error' ? 'signup-error' : undefined}
            className="w-full sm:max-w-[400px] md:max-w-[520px]"
          />
          <Button type="submit" variant="primary" aria-label="Subscribe to newsletter" className="w-full sm:w-auto">
            Subscribe
          </Button>
        </form>

        {/* Status messages */}
        {status === 'success' && (
          <p className="kol-mono-sm text-auto opacity-80" role="status" aria-live="polite">
            Thanks for subscribing!
          </p>
        )}
        {status === 'error' && (
          <p id="signup-error" className="kol-mono-sm text-auto opacity-80" role="alert" aria-live="assertive">
            Please enter a valid email address.
          </p>
        )}


      </div>
    </section>
  )
}

export default HomeSignup
