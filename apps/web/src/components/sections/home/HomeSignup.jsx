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
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, timestamp: new Date().toISOString() }),
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
          Subscribe to our newsletter
        </h2>

        {/* Description */}
        <p className="kol-mono-sm-fine text-auto mb-12 mx-auto max-w-[64rem] opacity-0 animate-on-scroll">
          Get updates on new typefaces, design resources, and selected work delivered to your inbox.
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center gap-3 mb-16 opacity-0 animate-on-scroll">
          <Input
            type="email"
            placeholder="Your mail address"
            iconLeft="foundation"
            size="md"
            uppercase={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>

        {/* Status messages */}
        {status === 'success' && (
          <p className="kol-mono-sm text-auto opacity-80">Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="kol-mono-sm text-auto opacity-80">Please enter a valid email address.</p>
        )}


      </div>
    </section>
  )
}

export default HomeSignup
