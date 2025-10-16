import { Button } from '@kol/ui/atoms'

const CtaHome = () => {
  return (
    <div id="contact" className="px-6 lg:px-10 py-6">
      <div className="relative rounded-lg overflow-hidden h-[60vh] flex items-center justify-center bg-surface-inverse">
        <div className="flex flex-col items-center text-center p-8 md:py-12 gap-10">
          <p className="kol-label opacity-80">Kolkrabbi Vinnustofa</p>

          <p className="w-full kol-heading-display leading-tight">
            Kolkrabbi Vinnustofa
            <br />
            based in Reykjavík
          </p>

          <Button
            variant="secondary"
            href="mailto:contact@kolkrabbi.com"
            className="mt-4"
          >
            Get in touch
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CtaHome
