import React from 'react'
import { Button, SectionTitle } from '@kol/ui'

const CtaFoundry = () => {
  return (
    <section
      className="foundryCard foundryCardPadded foundryCardInverted w-full flex flex-col gap-8 items-center text-center"
      style={{ '--card-opacity': '10%' }}
    >
      <h3 className="kol-label" >Questions?</h3>
      <p className="text-xl transition-colors duration-300" >
        Get in touch with our team
      </p>
      <div className="flex gap-4">
        <Button variant="primary" className="w-auto">Contact Us</Button>
        <Button variant="secondary" className="w-auto">FAQ</Button>
      </div>
    </section>
  )
}

export default CtaFoundry
