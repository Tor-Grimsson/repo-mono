import React from 'react'
import { Button, Divider } from '@kolkrabbi/kol-component'

const FoundryLicenseQuestions = () => {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row gap-24 md:gap-12">
        {/* License Section */}
        <div className="w-full flex flex-col gap-6 items-center text-center">
          <h3 className="kol-helper-16 uppercase">LICENCE</h3>
          <p className="kol-mono-12 text-fg-32">
            TG Málrómur is available for both personal and commercial use.<br />
            Please review licensing terms before use.
          </p>
          <Button variant="outline">Licence details</Button>
        </div>

        <Divider variant="horizontal" className="md:hidden" />
        <Divider variant="vertical" className="hidden md:flex" />

        {/* Questions CTA */}
        <div className="w-full flex flex-col gap-6 items-center text-center">
          <h3 className="kol-helper-16 uppercase">QUESTIONS?</h3>
          <p className="kol-mono-12 text-fg-32">
            Contextual and discretionary ligatures for improved readability.<br />
            Reach out and get in touch!
          </p>
          <Button variant="outline">Get in touch!</Button>
        </div>
      </div>
    </section>
  )
}

export default FoundryLicenseQuestions
