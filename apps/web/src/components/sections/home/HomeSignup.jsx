import { Button, Input } from '@kol/ui'
import { useEffect } from 'react'

const HomeSignup = () => {
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

  return (
    <section id="signup" className="w-full flex flex-col items-center justify-center text-center">
      <div className="max-w-[1400px] mx-auto py-24">
        {/* Heading */}
        <h2 className="kol-display-lg mb-6 opacity-0 animate-on-scroll">
          Develop a sleek & timeless brand identity
        </h2>

        {/* Description */}
        <p className="kol-mono-sm-fine text-auto mb-12 mx-auto max-w-[64rem] opacity-0 animate-on-scroll">
          Visual language, defined by a set of foundational principles; from logo design and its usage in various formats, to typography selection and style definition, color system and the methodology behind brand palettes, to the guidelines which document and communicate these systems and concepts.
        </p>

        {/* Email form */}
        <form className="flex flex-row items-center justify-center gap-3 mb-16 opacity-0 animate-on-scroll">
          <Input
            type="email"
            placeholder="Your mail address"
            iconLeft="foundation"
            size="md"
            uppercase={true}
          />
          <Button type="submit" variant="primary">
            Get Started
          </Button>
        </form>


      </div>
    </section>
  )
}

export default HomeSignup
