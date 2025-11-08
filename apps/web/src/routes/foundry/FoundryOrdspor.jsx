import { useState } from 'react'

const FoundryOrdspor = () => {
  const [weight, setWeight] = useState(400)

  const weights = [
    { label: 'Thin', value: 100 },
    { label: 'Extralight', value: 200 },
    { label: 'Light', value: 300 },
    { label: 'Regular', value: 400 },
    { label: 'Medium', value: 500 },
    { label: 'Semibold', value: 600 },
    { label: 'Bold', value: 700 },
    { label: 'Extrabold', value: 800 },
    { label: 'Black', value: 900 }
  ]

  return (
    <div className="min-h-screen bg-surface-primary">
      <main className="w-full">
        {/* Hero */}
        <section className="w-full px-8 py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto text-center">
            <h1
              className="text-8xl lg:text-[200px] text-auto mb-8 transition-all duration-300"
              style={{ fontFamily: 'TGOrdspor', fontWeight: weight }}
            >
              Orðspor
            </h1>
            <p className="kol-text-lg text-fg-64 max-w-[600px] mx-auto">
              Reputation — Variable weight typeface for impactful statements
            </p>
          </div>
        </section>

        {/* Weight Controls */}
        <section className="w-full px-8 py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-container-primary p-8 rounded-sm">
              <h2 className="kol-heading-sm text-auto mb-6">Variable Weights</h2>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
                {weights.map((w) => (
                  <button
                    key={w.value}
                    onClick={() => setWeight(w.value)}
                    className={`p-4 rounded border transition-all ${
                      weight === w.value
                        ? 'border-auto bg-opacity-hex-08'
                        : 'border-fg-24 hover:border-fg-48'
                    }`}
                  >
                    <div
                      className="text-4xl text-auto mb-2"
                      style={{ fontFamily: 'TGOrdspor', fontWeight: w.value }}
                    >
                      Aa
                    </div>
                    <div className="kol-mono-xxs text-fg-64">{w.label}</div>
                    <div className="kol-mono-xxs text-fg-48">{w.value}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Large Specimen */}
        <section className="w-full px-8 py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-auto-inverse p-12 lg:p-24 rounded-xl">
              <p
                className="text-6xl lg:text-8xl text-auto-inverse leading-tight transition-all duration-300"
                style={{ fontFamily: 'TGOrdspor', fontWeight: weight }}
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
              className="text-4xl lg:text-6xl text-auto leading-relaxed transition-all duration-300"
              style={{ fontFamily: 'TGOrdspor', fontWeight: weight }}
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

export default FoundryOrdspor
