import React from 'react'
import { Button } from '@kol/ui'

const CtaFoundry = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center text-center">
      <h3 className="kol-label-compact-lg">QUESTIONS?</h3>
      <p className="kol-mono-sm text-fg-64">
        Contextual and discretionary ligatures for improved readability.<br />
        Reach out and get in touch!
      </p>
      <Button variant="outline">Get in touch!</Button>
    </div>
  )
}

export default CtaFoundry
