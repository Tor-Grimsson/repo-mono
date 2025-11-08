const FoundryTrollatunga = () => {
  return (
    <div className="min-h-screen bg-surface-primary">
      <main className="w-full">
        {/* Hero */}
        <section className="w-full px-8 py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto text-center">
            <h1
              className="text-8xl lg:text-[200px] text-auto mb-8"
              style={{ fontFamily: 'TGTrollatunga', fontWeight: 400 }}
            >
              Tröllatunga
            </h1>
            <p className="kol-text-lg text-fg-64 max-w-[600px] mx-auto">
              Troll Tongue — Display typeface with expressive character
            </p>
          </div>
        </section>

        {/* Large Specimen */}
        <section className="w-full px-8 py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-auto-inverse p-12 lg:p-24 rounded-xl">
              <p
                className="text-6xl lg:text-8xl text-auto-inverse leading-tight"
                style={{ fontFamily: 'TGTrollatunga', fontWeight: 400 }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </section>

        {/* Glyphs Preview */}
        <section className="w-full px-8 py-16">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="kol-heading-sm text-auto mb-8">Character Set</h2>
            <div
              className="text-4xl lg:text-6xl text-auto leading-relaxed"
              style={{ fontFamily: 'TGTrollatunga', fontWeight: 400 }}
            >
              <p className="mb-4">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="mb-4">abcdefghijklmnopqrstuvwxyz</p>
              <p className="mb-4">0123456789</p>
              <p>!@#$%^&*()_+-=[]{}|;:',./&lt;&gt;?</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FoundryTrollatunga
