import { Button } from '@kol/ui'

export default function CtaWork() {
  return (
    <div className="py-16 md:py-24 lg:py-32 flex flex-col items-center gap-8">
      <p className="kol-heading-lg uppercase text-center">
        Let's work together
      </p>
      <Button
        href="mailto:hello@kolkrabbi.io"
        variant="outline"
      >
        Get in touch
      </Button>
    </div>
  )
}
