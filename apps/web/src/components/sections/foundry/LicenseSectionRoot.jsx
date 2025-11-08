import React from 'react'
import { Button } from '@kol/ui'

const LicenseSectionRoot = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center text-center">
      <h3 className="kol-label-compact-lg">LICENCE</h3>
      <p className="kol-mono-sm text-fg-64">
        TG Rót is available for both personal and commercial use.<br />
        Please review licensing terms before use.
      </p>
      <Button variant="outline">Licence details</Button>
    </div>
  )
}

export default LicenseSectionRoot
