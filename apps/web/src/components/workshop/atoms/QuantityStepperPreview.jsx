import { useState } from 'react'
import { QuantityStepper, QuantityInput } from '@kol/ui'
import DesSection from '../molecules/DesSection'

export default function QuantityStepperPreview() {
  const [stepperValue, setStepperValue] = useState(1)
  const [inputValue, setInputValue] = useState(1)

  return (
    <div className="space-y-8">
      <DesSection
        name="Quantity"
        description="Numeric input controls — stepper buttons and spinner variants."
      />

      <div className="flex flex-wrap items-start gap-6 py-8 p-4 rounded bg-surface-primary border border-auto">
        <QuantityStepper value={stepperValue} onChange={setStepperValue} min={1} max={10} />
        <QuantityInput value={inputValue} onChange={setInputValue} min={1} max={10} />
      </div>
    </div>
  )
}
