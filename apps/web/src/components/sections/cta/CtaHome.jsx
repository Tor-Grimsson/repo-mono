import { Button } from '@kol/ui/atoms'

const CtaHome = () => {
  return (
    <div id="contact" className="px-6 lg:px-10 py-6">
      <div className="relative rounded-lg overflow-hidden h-[60vh] flex items-center justify-center" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        <style>{`
          .dark #contact > div {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          .dark #contact > div * {
            color: #000000 !important;
          }
          .dark #contact button,
          .dark #contact a {
            background-color: var(--color-neutral-300) !important;
            color: #000000 !important;
          }
          #contact button:hover,
          #contact a:hover {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          .dark #contact button:hover,
          .dark #contact a:hover {
            background-color: #000000 !important;
            color: #ffffff !important;
          }
        `}</style>
        <div className="flex flex-col items-center text-center p-8 md:py-12">
          <p className="kol-label z-10">
            Kolkrabbi Vinnustofa
          </p>

          <p className="mt-10 w-full kol-heading-display z-10">
            Kolkrabbi Vinnustofa
            <br />
            based in Reykjavík
          </p>

          <Button
            variant="secondary"
            href="mailto:contact@kolkrabbi.com"
            className="mt-10"
            style={{ backgroundColor: 'var(--color-neutral-600)', color: '#ffffff' }}
          >
            Get in touch
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CtaHome
