import { ButtonGroup } from '@kol/ui'
import DesSection from './DesSection'
import ButtonStatesPreview from './ButtonStatesPreview'

export default function ButtonsPreview() {
  return (
    <div className="space-y-12">
      <ButtonStatesPreview />

      <div className="space-y-8">
        <DesSection
          name="Button Group"
          description="Groups related buttons with consistent spacing."
        />

        <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
          <ButtonGroup
            buttons={[
              { label: 'Primary Action', variant: 'primary' },
              { label: 'Secondary', variant: 'outline' }
            ]}
            align="left"
          />
        </div>
      </div>
    </div>
  )
}
