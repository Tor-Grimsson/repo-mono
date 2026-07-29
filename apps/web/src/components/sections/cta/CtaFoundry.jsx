import React from 'react'
import { Button } from '@kolkrabbi/kol-component'

const CtaFoundry = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center text-center">
      <h3 className="kol-helper-16 uppercase">QUESTIONS?</h3>
      <p className="kol-mono-12 text-fg-64">
        Contextual and discretionary ligatures for improved readability.<br />
        Reach out and get in touch!
      </p>
      <Button variant="outline">Get in touch!</Button>
    </div>
  )
}

export default CtaFoundry
