import { SectionLabel, Button } from '@kol/ui'

const StudioContact = () => {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto py-16">
        <div className="w-full">
          <SectionLabel text="Get in Touch" size="lg" />
          <p className="kol-mono-sm text-auto opacity-60 mt-3 max-w-[40%]">
            Have a project in mind? Let's talk about how we can help.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 pb-16">
          {/* Left Column - Info */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="reveal" style={{ '--reveal-delay': '0s' }}>
              <h3 className="kol-heading-md mb-3">Studio</h3>
              <p className="kol-mono-text text-auto opacity-80">
                Kolkrabbi Vinnustofa<br />
                Reykjavík, Iceland
              </p>
            </div>

            <div className="reveal" style={{ '--reveal-delay': '0.1s' }}>
              <h3 className="kol-heading-md mb-3">Inquiries</h3>
              <p className="kol-mono-text text-auto opacity-80">
                hello@kolkrabbi.is<br />
                <span className="opacity-60">For project inquiries and collaboration</span>
              </p>
            </div>

            <div className="reveal" style={{ '--reveal-delay': '0.2s' }}>
              <h3 className="kol-heading-md mb-3">Type Licensing</h3>
              <p className="kol-mono-text text-auto opacity-80">
                type@kolkrabbi.is<br />
                <span className="opacity-60">For typeface licensing and custom type projects</span>
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form Placeholder */}
          <div className="reveal flex-1 flex flex-col gap-6" style={{ '--reveal-delay': '0.15s' }}>
            <div className="p-12 bg-surface-secondary rounded border border-auto">
              <h3 className="kol-heading-lg mb-4">Start a conversation</h3>
              <p className="kol-mono-text text-auto opacity-80 mb-8">
                Whether you have a specific project in mind or just want to explore possibilities, we'd love to hear from you.
              </p>

              <div className="flex flex-col gap-4">
                <Button
                  iconLeft="component"
                  size="md"
                  href="mailto:hello@kolkrabbi.is"
                  className="w-full md:w-auto"
                >
                  Send us an email
                </Button>
                <p className="kol-mono-sm text-auto opacity-60">
                  We typically respond within 1-2 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioContact
