import { Button } from '@kol/ui'
import DesSection from './DesSection'

const buttonVariants = [
  { id: 'primary', variant: 'primary', text: 'kol' },
  { id: 'secondary', variant: 'secondary', text: 'kol' },
  { id: 'outline', variant: 'outline', text: 'kol' },
  { id: 'accent', variant: 'accent', text: 'kol' },
  { id: 'control', variant: 'control', text: 'Control' }
]

export default function ButtonStatesPreview() {
  return (
    <div className="space-y-8">
      <DesSection
        name="Button"
        description="Action buttons with variant and size props. Resize viewport to see responsive sizing."
      />

      <div className="flex flex-wrap gap-3 py-8 p-4 rounded bg-surface-primary border border-auto">
        {buttonVariants.map((v) => (
          <Button key={v.id} variant={v.variant} iconRight="arrow-right">
            {v.text}
          </Button>
        ))}
      </div>
    </div>
  )
}
