import React, { useState } from 'react'
import GridToggle from '../../../components/specimens/GridToggle'

export default function RotSelection() {
  const [showGrid, setShowGrid] = useState(true)

  // Grid configuration
  const columns = 12
  const gutter = 24 // px
  const baselineGrid = 24 // px
  const marginX = 48 // px

  return (
    <div className="w-full min-h-screen relative bg-surface-inverse">
      <GridToggle showGrid={showGrid} onToggle={() => setShowGrid(!showGrid)} />

      {/* SECTION 1: HERO - TG RÓT GROTESK SANS */}
      <section className="w-full h-screen relative bg-surface-inverse" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 h-full flex items-center">
          <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 12' }} className="flex flex-col items-center justify-center">
              {/* Top left label */}
              <div className="absolute top-12 left-12">
                <p className="text-auto-inverse text-sm font-normal font-['TGMalromur']">
                  New Typeface
                </p>
              </div>

              {/* Top right label */}
              <div className="absolute top-12 right-12">
                <p className="text-auto-inverse text-sm font-normal font-['TGMalromur']">
                  No. 1
                </p>
              </div>

              {/* Center content */}
              <div className="flex flex-col items-center justify-center">
                {/* Main typeface name */}
                <h1
                  className="text-auto-inverse mb-16"
                  style={{
                    fontFamily: 'TGRoot',
                    fontSize: 'clamp(120px, 20vw, 280px)',
                    fontWeight: 700,
                    lineHeight: 0.85,
                    letterSpacing: '-0.02em',
                  }}
                >
                  TGRót
                </h1>

                {/* Subtitle */}
                <p
                  className="text-auto-inverse"
                  style={{
                    fontFamily: 'TGRoot',
                    fontSize: 'clamp(32px, 4vw, 56px)',
                    fontWeight: 200,
                    letterSpacing: '0.3em',
                    marginLeft: '0.3em',
                  }}
                >
                  GROTESK SANS
                </p>
              </div>

              {/* Bottom branding */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" fill="white" />
                </svg>
                <span className="text-auto-inverse text-sm font-normal font-['TGMalromur'] uppercase tracking-wider">
                  Kolkrabbi 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PERFORMANCES REMARKABLE COUNTRY CARD */}
      <section className="w-full min-h-screen relative bg-surface-inverse py-24" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 6' }}>
              {/* Header */}
              <div className="flex justify-between items-start border-b-2 border-auto-inverse pb-4 mb-12">
                <div>
                  <p className="text-auto-inverse text-[10px] font-['TGMalromur'] uppercase tracking-wider mb-2 opacity-50">
                    SPECIMENS OF TG ROOT
                  </p>
                  <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase opacity-40">
                    10 ROOT
                  </p>
                </div>
                <div>
                  <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase opacity-40">
                    FEATURED
                  </p>
                  <p className="text-auto-inverse text-[10px] font-['TGMalromur'] opacity-40 text-right">
                    125
                  </p>
                </div>
              </div>

              {/* 14/2 POINT - PERFORMANCES */}
              <div className="mb-12 pb-8 border-b-2 border-auto-inverse">
                <div className="flex justify-between items-baseline mb-4">
                  <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase opacity-40">14/2 POINT</p>
                  <p className="text-auto-inverse text-[10px] font-['TGMalromur'] opacity-40">64.16.24.20</p>
                </div>
                <h2 className="text-auto-inverse font-['TGRoot'] text-5xl font-bold leading-tight">
                  PERFORMANCES<br />
                  Remarkable Country
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: GERMAN MINIMALIST PAINTING EXHIBITION CATALOGUE */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center justify-center">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 8' }}>
              {/* Cover */}
              <div className="mb-32">
                <div className="mb-12">
                  <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider mb-2 opacity-40">
                    Ausstellungskatalog
                  </p>
                  <h1 className="text-auto-inverse font-['TGRoot'] text-8xl font-black leading-none mb-6" style={{ fontWeight: 900 }}>
                    Dieter<br />Bauhman
                  </h1>
                  <p className="text-auto-inverse font-['TGRoot'] text-2xl font-normal leading-tight opacity-60" style={{ fontWeight: 400 }}>
                    Stille Geometrien
                  </p>
                </div>

                <div className="border-t-2 border-auto-inverse pt-6">
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed opacity-70">
                    Museum für Moderne Kunst Frankfurt<br />
                    14 März – 18 Juni 2025
                  </p>
                </div>
              </div>

              {/* Interior spread */}
              <div className="grid grid-cols-2 gap-16 mb-32">
                <div>
                  <h2 className="text-auto-inverse font-['TGRoot'] text-4xl font-bold leading-tight mb-6" style={{ fontWeight: 700 }}>
                    Katalog
                  </h2>
                  <div className="space-y-4 text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed">
                    <p className="opacity-70">
                      Die Ausstellung präsentiert fünfzig Jahre minimalistischer Malerei von Dieter Bauhman, einem der bedeutendsten deutschen Künstler der Nachkriegszeit.
                    </p>
                    <p className="opacity-70">
                      Seine Werke zeichnen sich durch strenge geometrische Formen und eine reduzierte Farbpalette aus, die an die Bauhaus-Tradition anknüpfen.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-auto-inverse pl-4">
                    <p className="text-auto-inverse font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                      Werk Nr. 47
                    </p>
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-60">
                      Öl auf Leinwand, 200 × 150 cm, 1987
                    </p>
                  </div>

                  <div className="border-l-4 border-auto-inverse pl-4">
                    <p className="text-auto-inverse font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                      Werk Nr. 52
                    </p>
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-60">
                      Öl auf Leinwand, 180 × 180 cm, 1991
                    </p>
                  </div>

                  <div className="border-l-4 border-auto-inverse pl-4">
                    <p className="text-auto-inverse font-['TGRoot'] text-lg font-bold mb-2" style={{ fontWeight: 700 }}>
                      Werk Nr. 63
                    </p>
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-60">
                      Acryl auf Leinwand, 220 × 160 cm, 2003
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: GERMAN PERFORMANCE TRIO PAMPHLET */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center justify-center">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 6' }}>
              <div className="space-y-16">
                {/* Front */}
                <div className="text-center space-y-8">
                  <h1 className="text-auto-inverse font-['TGRoot'] text-7xl font-black leading-none" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                    DREI
                  </h1>

                  <div className="space-y-2">
                    <p className="text-auto-inverse font-['TGRoot'] text-3xl font-bold" style={{ fontWeight: 700 }}>
                      Körper • Raum • Zeit
                    </p>
                  </div>

                  <div className="pt-8 border-t border-auto-inverse/20">
                    <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-70">
                      Eine Performance von<br />
                      Hanna Müller · Lars Schneider · Eva Koch
                    </p>
                  </div>
                </div>

                {/* Interior */}
                <div className="space-y-12 pt-16 border-t border-auto-inverse/20">
                  <div>
                    <h2 className="text-auto-inverse font-['TGRoot'] text-2xl font-bold mb-4" style={{ fontWeight: 700 }}>
                      Aufführungen
                    </h2>
                    <div className="space-y-3 text-auto-inverse text-sm font-['TGMalromur']">
                      <p className="opacity-80">Donnerstag, 20:00 Uhr — HAU Berlin</p>
                      <p className="opacity-80">Freitag, 20:00 Uhr — HAU Berlin</p>
                      <p className="opacity-80">Samstag, 19:00 Uhr — HAU Berlin</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed opacity-70">
                      DREI untersucht die Beziehung zwischen Körper und architektonischem Raum durch eine Choreographie des Alltäglichen. Drei Performer bewegen sich durch streng definierte geometrische Muster und schaffen dabei eine Spannung zwischen individueller Geste und kollektiver Struktur.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-auto-inverse/20">
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">
                      Dauer: 75 Minuten ohne Pause<br />
                      Tickets: www.hebbel-am-ufer.de
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PANTONE COLOR SWATCHES PRESS RELEASE */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center justify-center">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 8' }}>
              <div className="space-y-12">
                {/* Header */}
                <div className="pb-8 border-b-2 border-auto-inverse">
                  <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider mb-4 opacity-40">
                    Press Release — For Immediate Release
                  </p>
                  <h1 className="text-auto-inverse font-['TGRoot'] text-6xl font-black leading-none mb-6" style={{ fontWeight: 900 }}>
                    PANTONE<br />
                    Color of the Year<br />
                    2026
                  </h1>
                  <p className="text-auto-inverse font-['TGRoot'] text-xl font-normal opacity-60" style={{ fontWeight: 400 }}>
                    Introducing PANTONE 17-3938 Resonant Azure
                  </p>
                </div>

                {/* Body */}
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <p className="text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed">
                      PANTONE 17-3938 Resonant Azure represents a convergence of technological optimism and environmental consciousness, embodying the duality of our digital and natural worlds.
                    </p>
                    <p className="text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed opacity-70">
                      This vivid blue shade speaks to our desire for tranquility while acknowledging the dynamic energy of contemporary life.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-auto-inverse font-['TGRoot'] text-lg font-bold mb-4" style={{ fontWeight: 700 }}>
                      Color Specifications
                    </h2>
                    <div className="space-y-3 text-auto-inverse text-xs font-['TGMalromur']">
                      <p><span className="font-bold">PANTONE:</span> 17-3938 TPG</p>
                      <p><span className="font-bold">RGB:</span> 98, 145, 224</p>
                      <p><span className="font-bold">HEX:</span> #6291E0</p>
                      <p><span className="font-bold">CMYK:</span> 56, 35, 0, 12</p>
                    </div>
                  </div>
                </div>

                {/* Swatches */}
                <div className="grid grid-cols-4 gap-4 pt-8">
                  <div>
                    <div className="w-full h-32 bg-[#6291E0] rounded mb-2" />
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] font-bold">17-3938</p>
                    <p className="text-auto-inverse text-[10px] font-['TGMalromur'] opacity-60">Resonant Azure</p>
                  </div>
                  <div>
                    <div className="w-full h-32 bg-surface-inverse rounded mb-2" />
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] font-bold">19-4029</p>
                    <p className="text-auto-inverse text-[10px] font-['TGMalromur'] opacity-60">Midnight Navy</p>
                  </div>
                  <div>
                    <div className="w-full h-32 bg-surface-inverse rounded border border-auto-inverse/10 mb-2" />
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] font-bold">11-0602</p>
                    <p className="text-auto-inverse text-[10px] font-['TGMalromur'] opacity-60">Cloud Dancer</p>
                  </div>
                  <div>
                    <div className="w-full h-32 bg-gray-600 rounded mb-2" />
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] font-bold">17-1464</p>
                    <p className="text-auto-inverse text-[10px] font-['TGMalromur'] opacity-60">Flame Orange</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-8 border-t border-auto-inverse/20">
                  <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">
                    Contact: press@pantone.com<br />
                    Pantone LLC, a wholly owned subsidiary of X-Rite, Incorporated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CAMUS/FOUCAULT SURREALIST PLAY - PAGE 1 & 2 */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center justify-center">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            {/* Page 1: Title */}
            <div style={{ gridColumn: 'span 6' }} className="flex flex-col justify-center space-y-8">
              <div>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider mb-6 opacity-40">
                  Une Pièce Absurde en Quatre Actes
                </p>
                <h1 className="text-auto-inverse font-['TGRoot'] text-7xl font-black leading-none mb-8" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
                  L'ŒIL<br />
                  QUI NE<br />
                  DORT<br />
                  JAMAIS
                </h1>
                <p className="text-auto-inverse font-['TGRoot'] text-xl font-normal opacity-60" style={{ fontWeight: 400 }}>
                  The Eye That Never Sleeps
                </p>
              </div>

              <div className="space-y-3 text-auto-inverse text-sm font-['TGMalromur'] opacity-70">
                <p>Après Albert Camus & Michel Foucault</p>
                <p className="text-xs">Théâtre de l'Absurde, Paris 2025</p>
              </div>
            </div>

            {/* Page 2: Act I */}
            <div style={{ gridColumn: 'span 6' }} className="space-y-8">
              <div>
                <h2 className="text-auto-inverse font-['TGRoot'] text-3xl font-bold mb-4" style={{ fontWeight: 700 }}>
                  Acte I : La Tour
                </h2>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] italic opacity-60 mb-6">
                  Une cellule circulaire. Une lumière vient du centre. On ne voit jamais la source.
                </p>
              </div>

              <div className="space-y-4 text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed">
                <p>
                  <span className="font-bold">LE GARDIEN</span><br />
                  <span className="opacity-70">Je ne regarde personne. Je regarde tout le monde. C'est la même chose, n'est-ce pas?</span>
                </p>

                <p>
                  <span className="font-bold">LE PRISONNIER</span><br />
                  <span className="opacity-70">Vous êtes là?</span>
                </p>

                <p>
                  <span className="font-bold">LE GARDIEN</span><br />
                  <span className="opacity-70">Je suis toujours là. Même quand je ne suis pas là, je suis là. C'est le principe de la tour.</span>
                </p>

                <p>
                  <span className="font-bold">LE PRISONNIER</span><br />
                  <span className="opacity-70">(Il se tourne vers le mur) Alors je dois être libre. Si vous me surveillez toujours, je n'existe que dans votre regard. Et un regard ne peut pas m'emprisonner.</span>
                </p>

                <p className="pt-4 italic opacity-50 text-xs">
                  Le Gardien rit. Ou peut-être pas. La lumière reste constante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CAMUS/FOUCAULT SURREALIST PLAY - PAGE 3 & 4 */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center justify-center">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            {/* Page 3: Act II & III */}
            <div style={{ gridColumn: 'span 6' }} className="space-y-12">
              <div>
                <h2 className="text-auto-inverse font-['TGRoot'] text-3xl font-bold mb-4" style={{ fontWeight: 700 }}>
                  Acte II : Le Miroir
                </h2>
                <div className="space-y-4 text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed">
                  <p>
                    <span className="font-bold">SISYPHE</span><br />
                    <span className="opacity-70">(Poussant un rocher invisible) Chaque jour je monte. Chaque nuit je descends. Mais aujourd'hui, le rocher m'a regardé.</span>
                  </p>

                  <p>
                    <span className="font-bold">LE GARDIEN</span><br />
                    <span className="opacity-70">Le rocher ne peut pas vous regarder. Vous vous surveillez vous-même maintenant.</span>
                  </p>

                  <p>
                    <span className="font-bold">SISYPHE</span><br />
                    <span className="opacity-70">(S'arrêtant) Alors je suis devenu la tour?</span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-auto-inverse font-['TGRoot'] text-3xl font-bold mb-4" style={{ fontWeight: 700 }}>
                  Acte III : L'Écho
                </h2>
                <div className="space-y-4 text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed">
                  <p className="opacity-70">
                    Tous les personnages parlent en même temps. Leurs voix se superposent. On ne comprend rien. C'est intentionnel. La lumière clignote pour la première fois.
                  </p>

                  <p>
                    <span className="font-bold">MEURSAULT</span><br />
                    <span className="opacity-70">(Entrant pour la première fois) Il fait chaud. Pourquoi il fait toujours si chaud dans vos prisons philosophiques?</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Page 4: Act IV */}
            <div style={{ gridColumn: 'span 6' }} className="space-y-8">
              <div>
                <h2 className="text-auto-inverse font-['TGRoot'] text-3xl font-bold mb-4" style={{ fontWeight: 700 }}>
                  Acte IV : La Sortie
                </h2>
                <p className="text-auto-inverse text-xs font-['TGMalromur'] italic opacity-60 mb-6">
                  La scène est vide. La tour a disparu. Ou plutôt, tout est devenu la tour.
                </p>
              </div>

              <div className="space-y-4 text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed">
                <p>
                  <span className="font-bold">TOUS</span><br />
                  <span className="opacity-70">(En chœur) Nous sommes libres maintenant?</span>
                </p>

                <p>
                  <span className="font-bold">LA VOIX DU GARDIEN</span><br />
                  <span className="opacity-70">(Venant de partout et de nulle part) Vous l'avez toujours été. C'est ça le problème.</span>
                </p>

                <p className="pt-8 text-center">
                  <span className="font-['TGRoot'] text-2xl font-black" style={{ fontWeight: 900 }}>
                    FIN
                  </span>
                </p>

                <p className="pt-6 italic opacity-50 text-xs text-center">
                  (La lumière reste allumée. Le public ne sait pas s'il doit partir.)
                </p>
              </div>

              <div className="pt-12 border-t border-auto-inverse/20 text-center">
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">
                  Première: Théâtre de la Cité Internationale, Paris<br />
                  Direction: Marie Dubois
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: DANISH MICHELIN RESTAURANT MENU */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center justify-center">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 7' }}>
              <div className="space-y-16">
                {/* Header */}
                <div className="text-center space-y-6 pb-12 border-b border-auto-inverse/20">
                  <h1 className="text-auto-inverse font-['TGRoot'] text-6xl font-black leading-none" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                    NOMA
                  </h1>
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60">
                    Fem Retters Menu<br />
                    København · 2025
                  </p>
                  <div className="flex justify-center gap-1 text-auto-inverse text-2xl">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>

                {/* Course 1 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-auto-inverse/10 pb-4">
                    <div className="flex-1">
                      <h2 className="text-auto-inverse font-['TGRoot'] text-2xl font-bold mb-2" style={{ fontWeight: 700 }}>
                        Første ret
                      </h2>
                      <p className="text-auto-inverse font-['TGRoot'] text-lg font-normal mb-3" style={{ fontWeight: 400 }}>
                        Røget Ål · Grønne Æbler · Peberrod
                      </p>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60 leading-relaxed">
                        Røget ål fra Limfjorden med syltede grønne æbler, peberrodsemulsion og sprøde urtechips
                      </p>
                    </div>
                  </div>
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] italic opacity-50">
                    Pairing: Riesling, Weingut Knipser 2023 • Pfalz, Tyskland
                  </p>
                </div>

                {/* Course 2 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-auto-inverse/10 pb-4">
                    <div className="flex-1">
                      <h2 className="text-auto-inverse font-['TGRoot'] text-2xl font-bold mb-2" style={{ fontWeight: 700 }}>
                        Anden ret
                      </h2>
                      <p className="text-auto-inverse font-['TGRoot'] text-lg font-normal mb-3" style={{ fontWeight: 400 }}>
                        Kammuslinger · Tang · Sødmælksskum
                      </p>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60 leading-relaxed">
                        Råe kammuslinger med fermenteret tang, sødmælksskum og vild peberurt
                      </p>
                    </div>
                  </div>
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] italic opacity-50">
                    Pairing: Chablis 1er Cru, Domaine Vocoret 2022 • Bourgogne, Frankrig
                  </p>
                </div>

                {/* Course 3 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-auto-inverse/10 pb-4">
                    <div className="flex-1">
                      <h2 className="text-auto-inverse font-['TGRoot'] text-2xl font-bold mb-2" style={{ fontWeight: 700 }}>
                        Tredje ret
                      </h2>
                      <p className="text-auto-inverse font-['TGRoot'] text-lg font-normal mb-3" style={{ fontWeight: 400 }}>
                        Grillet Hummer · Brændte Løg · Mos
                      </p>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60 leading-relaxed">
                        Levende hummer grillet over birkebål med emulsion af brændte løg og skovmossmør
                      </p>
                    </div>
                  </div>
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] italic opacity-50">
                    Pairing: Puligny-Montrachet, Domaine Leflaive 2021 • Bourgogne, Frankrig
                  </p>
                </div>

                {/* Course 4 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-auto-inverse/10 pb-4">
                    <div className="flex-1">
                      <h2 className="text-auto-inverse font-['TGRoot'] text-2xl font-bold mb-2" style={{ fontWeight: 700 }}>
                        Fjerde ret
                      </h2>
                      <p className="text-auto-inverse font-['TGRoot'] text-lg font-normal mb-3" style={{ fontWeight: 400 }}>
                        Vildt · Rødbede · Gran
                      </p>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60 leading-relaxed">
                        Kronvildt fra Jægersborg Dyrehave med rødbede fem måder og grannalebouillon
                      </p>
                    </div>
                  </div>
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] italic opacity-50">
                    Pairing: Pinot Noir, Domaine Méo-Camuzet 2019 • Bourgogne, Frankrig
                  </p>
                </div>

                {/* Course 5 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-auto-inverse/10 pb-4">
                    <div className="flex-1">
                      <h2 className="text-auto-inverse font-['TGRoot'] text-2xl font-bold mb-2" style={{ fontWeight: 700 }}>
                        Femte ret
                      </h2>
                      <p className="text-auto-inverse font-['TGRoot'] text-lg font-normal mb-3" style={{ fontWeight: 400 }}>
                        Æble · Havtorn · Birk
                      </p>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60 leading-relaxed">
                        Æblesorbet med havtorngelé, birkesirup og frosne birkeblade
                      </p>
                    </div>
                  </div>
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] italic opacity-50">
                    Pairing: Sauternes, Château d'Yquem 2020 • Bordeaux, Frankrig
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-12 border-t border-auto-inverse/20 text-center space-y-4">
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-50">
                    Menu designet af Chefkok René Redzepi<br />
                    Alle ingredienser er lokale og sæsonbestemte
                  </p>
                  <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-40">
                    Kr. 3.500 per person · Vinmenu Kr. 2.200
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: SUZANNE CIANI - BUCHLA 1975 */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center justify-center">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 9' }}>
              <div className="space-y-16">
                {/* Title page */}
                <div className="space-y-8">
                  <div>
                    <p className="text-auto-inverse text-xs font-['TGMalromur'] uppercase tracking-wider mb-6 opacity-40">
                      Electronic Music Performance · 1975
                    </p>
                    <h1 className="text-auto-inverse font-['TGRoot'] text-8xl font-black leading-none mb-4" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
                      SUZANNE<br />
                      CIANI
                    </h1>
                    <p className="text-auto-inverse font-['TGRoot'] text-3xl font-normal opacity-70" style={{ fontWeight: 400 }}>
                      Live on the Buchla Synthesizer
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-12 pt-8 border-t-2 border-auto-inverse">
                    <div className="space-y-4">
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed">
                        Recorded live at WBAI Free Music Store, New York City, May 1975. Ciani performs improvised compositions on the Buchla 200 Series Modular Electronic Music System.
                      </p>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] leading-relaxed opacity-70">
                        This historic performance captures the pioneering work of one of electronic music's most innovative composers during the formative years of synthesizer music.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-auto-inverse font-['TGRoot'] text-lg font-bold mb-4" style={{ fontWeight: 700 }}>
                        Technical Specifications
                      </h2>
                      <div className="space-y-2 text-auto-inverse text-sm font-['TGMalromur']">
                        <p><span className="font-bold">Instrument:</span> Buchla 200 Series</p>
                        <p><span className="font-bold">Format:</span> 1/4" Reel-to-Reel</p>
                        <p><span className="font-bold">Duration:</span> 47:32</p>
                        <p><span className="font-bold">Studio:</span> WBAI Radio</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Track listing */}
                <div className="space-y-6">
                  <h2 className="text-auto-inverse font-['TGRoot'] text-3xl font-bold pb-4 border-b-2 border-auto-inverse" style={{ fontWeight: 700 }}>
                    Performance Program
                  </h2>

                  <div className="space-y-6">
                    <div className="flex justify-between items-start pb-4 border-b border-auto-inverse/20">
                      <div className="flex-1">
                        <p className="text-auto-inverse font-['TGRoot'] text-xl font-bold mb-2" style={{ fontWeight: 700 }}>
                          Part I: Butterfly
                        </p>
                        <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60">
                          Exploring amplitude modulation and complex waveform interactions
                        </p>
                      </div>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-40">8:47</p>
                    </div>

                    <div className="flex justify-between items-start pb-4 border-b border-auto-inverse/20">
                      <div className="flex-1">
                        <p className="text-auto-inverse font-['TGRoot'] text-xl font-bold mb-2" style={{ fontWeight: 700 }}>
                          Part II: Ocean Waves
                        </p>
                        <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60">
                          Voltage-controlled filters creating organic soundscapes
                        </p>
                      </div>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-40">12:18</p>
                    </div>

                    <div className="flex justify-between items-start pb-4 border-b border-auto-inverse/20">
                      <div className="flex-1">
                        <p className="text-auto-inverse font-['TGRoot'] text-xl font-bold mb-2" style={{ fontWeight: 700 }}>
                          Part III: The Velocity of Love
                        </p>
                        <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60">
                          Sequential voltage control and gate patterns
                        </p>
                      </div>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-40">15:03</p>
                    </div>

                    <div className="flex justify-between items-start pb-4 border-b border-auto-inverse/20">
                      <div className="flex-1">
                        <p className="text-auto-inverse font-['TGRoot'] text-xl font-bold mb-2" style={{ fontWeight: 700 }}>
                          Part IV: Industrial Landscape
                        </p>
                        <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-60">
                          Noise generators and random voltage sources
                        </p>
                      </div>
                      <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-40">11:24</p>
                    </div>
                  </div>
                </div>

                {/* Credits */}
                <div className="pt-12 border-t border-auto-inverse/20">
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-auto-inverse font-['TGRoot'] text-lg font-bold mb-4" style={{ fontWeight: 700 }}>
                        Credits
                      </h3>
                      <div className="space-y-2 text-auto-inverse text-sm font-['TGMalromur']">
                        <p><span className="font-bold">Performer:</span> Suzanne Ciani</p>
                        <p><span className="font-bold">Engineer:</span> Robert Margouleff</p>
                        <p><span className="font-bold">Mastering:</span> Bernie Grundman</p>
                        <p><span className="font-bold">Photography:</span> Michael Ochs</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-auto-inverse font-['TGRoot'] text-lg font-bold mb-4" style={{ fontWeight: 700 }}>
                        Publication Details
                      </h3>
                      <div className="space-y-2 text-auto-inverse text-sm font-['TGMalromur']">
                        <p><span className="font-bold">Publisher:</span> Finders Keepers Records</p>
                        <p><span className="font-bold">Catalog No:</span> FKR 095LP</p>
                        <p><span className="font-bold">Released:</span> October 2018</p>
                        <p><span className="font-bold">Format:</span> 180g Vinyl LP + Download</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="pt-12 border-t border-auto-inverse/20">
                  <blockquote className="text-auto-inverse text-lg font-['TGRoot'] font-normal leading-relaxed italic opacity-70" style={{ fontWeight: 400 }}>
                    "The Buchla is not an instrument you play—it's an instrument you converse with. Every patch is a dialogue between intention and surprise."
                  </blockquote>
                  <p className="text-auto-inverse text-sm font-['TGMalromur'] mt-4 opacity-50">
                    — Suzanne Ciani, 1975
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: ICELANDIC POETRY - 120PT */}
      <section className="w-full min-h-screen bg-surface-inverse py-16 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center">
          <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 12' }}>
              {/* Header */}
              <div className="flex justify-between items-start mb-24">
                <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
                  TG RÓT
                </p>
                <p className="text-auto-inverse text-sm font-['TGMalromur'] uppercase tracking-wider opacity-70">
                  2025
                </p>
              </div>

              <div className="w-full h-px bg-surface-inverse opacity-30 mb-24" />

              {/* Main text */}
              <div className="space-y-12 text-auto-inverse font-['TGRoot']" style={{ fontWeight: 300 }}>
                <p className="text-[clamp(60px,8vw,120px)] leading-none">
                  Lofaðu mér epískum<br />
                  hversdagsleika,
                </p>
                <p className="text-[clamp(60px,8vw,120px)] leading-none">
                  seldu mér samsæri<br />
                  á staurfæti almúgans,
                </p>
                <p className="text-[clamp(60px,8vw,120px)] leading-none">
                  færðu mér fönix sem<br />
                  kann ekki að fljúga; reis<br />
                  ekki úr ösku og<br />
                  er of brotinn til að<br />
                  trúa á sjálfan sig.
                </p>
              </div>

              {/* Footer */}
              <div className="absolute bottom-16 left-8">
                <p className="text-auto-inverse text-xs font-['TGMalromur'] opacity-50">
                  120 PT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: LARGE Ð - GRAPHIC */}
      <section className="w-full min-h-screen bg-surface-inverse py-16 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 12' }} className="relative">
              {/* Header */}
              <div className="absolute top-16 left-0">
                <p className="text-auto-inverse text-sm font-['TGMalromur'] font-bold">
                  TG RÓT<br />
                  Leturgerð 2025
                </p>
              </div>

              {/* Giant Ð character as SVG approximation */}
              <div className="flex items-center justify-center">
                <svg className="w-full max-w-[900px] h-auto" viewBox="0 0 900 1200" preserveAspectRatio="xMidYMid meet">
                  {/* Top horizontal bars */}
                  <rect x="150" y="130" width="750" height="90" fill="#000000" transform="rotate(-5 525 175)" />
                  <rect x="150" y="290" width="450" height="80" fill="#000000" />

                  {/* Large circular D body */}
                  <circle cx="450" cy="750" r="380" fill="#000000" />

                  {/* Inner counter (white oval) */}
                  <ellipse cx="450" cy="750" rx="160" ry="220" fill="#ffffff" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: TYPE SIZE WATERFALL - DARK */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center">
          <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 12' }} className="space-y-8">
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-2 text-auto-inverse font-['TGRoot']" style={{ fontWeight: 700 }}>
                  <p className="text-[clamp(160px,20vw,344px)] leading-none">Blóta</p>
                  <p className="text-xs font-['TGMalromur'] opacity-40 absolute right-8">344 PT</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <p className="text-auto-inverse font-['TGRoot'] text-[clamp(140px,18vw,296px)] leading-none" style={{ fontWeight: 700 }}>
                    Refir
                  </p>
                  <span className="absolute right-8 top-0 text-auto-inverse text-xs font-['TGMalromur'] opacity-40">296 PT</span>
                </div>

                <div className="relative">
                  <p className="text-auto-inverse font-['TGRoot'] text-[clamp(120px,15vw,240px)] leading-none" style={{ fontWeight: 700 }}>
                    Áföllum
                  </p>
                  <span className="absolute right-8 top-0 text-auto-inverse text-xs font-['TGMalromur'] opacity-40">240 PT</span>
                </div>

                <div className="relative">
                  <p className="text-auto-inverse font-['TGRoot'] text-[clamp(90px,11vw,184px)] leading-none" style={{ fontWeight: 700 }}>
                    Ranadýra
                  </p>
                  <span className="absolute right-8 top-0 text-auto-inverse text-xs font-['TGMalromur'] opacity-40">184 PT</span>
                </div>

                <div className="relative flex items-center gap-6">
                  <p className="text-auto-inverse font-['TGRoot'] text-[clamp(70px,9vw,144px)] leading-none" style={{ fontWeight: 700 }}>
                    Alsjáandi
                  </p>
                  {/* Eye icon */}
                  <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-90">
                    <ellipse cx="60" cy="40" rx="58" ry="38" fill="white" />
                    <circle cx="60" cy="40" r="20" fill="#000000" />
                  </svg>
                  <span className="absolute right-8 top-0 text-auto-inverse text-xs font-['TGMalromur'] opacity-40">144 PT</span>
                </div>

                <div className="relative">
                  <p className="text-auto-inverse font-['TGRoot'] text-[clamp(55px,7vw,112px)] leading-none" style={{ fontWeight: 700 }}>
                    Sporðskjulaga
                  </p>
                  <span className="absolute right-8 top-0 text-auto-inverse text-xs font-['TGMalromur'] opacity-40">112 PT</span>
                </div>

                <div className="relative">
                  <p className="text-auto-inverse font-['TGRoot'] text-[clamp(40px,5vw,80px)] leading-none" style={{ fontWeight: 700 }}>
                    Gimsteinar & gyllinet
                  </p>
                  <span className="absolute right-8 top-0 text-auto-inverse text-xs font-['TGMalromur'] opacity-40">80 PT</span>
                </div>

                <div className="relative">
                  <p className="text-auto-inverse font-['TGRoot'] text-[clamp(32px,4vw,64px)] leading-none" style={{ fontWeight: 700 }}>
                    Ráðstefnur varasalvasala
                  </p>
                  <span className="absolute right-8 top-0 text-auto-inverse text-xs font-['TGMalromur'] opacity-40">64 PT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: WEIGHT SPECIMENS - 240PT */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="relative z-10 flex items-center">
          <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 10' }} className="space-y-16">
              {/* Header */}
              <div className="flex justify-between items-start mb-12">
                <p className="text-auto-inverse text-sm font-['TGMalromur'] font-bold">
                  TG RÓT
                </p>
                <p className="text-auto-inverse text-sm font-['TGMalromur'] opacity-40">
                  240 PT
                </p>
              </div>

              {/* Weight demonstrations */}
              <div className="space-y-8">
                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 100 }}>
                  Þunnur
                </p>

                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 300 }}>
                  Léttur
                </p>

                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 400 }}>
                  Tíður
                </p>

                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 700 }}>
                  Djarfur
                </p>

                <p className="text-auto-inverse font-['TGRoot'] text-[clamp(100px,12vw,240px)] leading-none" style={{ fontWeight: 900 }}>
                  Þykkur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: BUSINESS PROPOSAL TITLE */}
      <section className="w-full min-h-screen bg-surface-inverse py-24 relative" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Column Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
            <div className="h-full grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Baseline Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
            `
          }}></div>
        )}

        <div className="w-full grid h-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          <div style={{ gridColumn: 'span 8', gridColumnStart: 3 }} className="flex flex-col justify-center text-center space-y-8">
            <h1 className="text-auto-inverse font-['TGRoot'] text-[clamp(60px,10vw,120px)] leading-none" style={{ fontWeight: 900 }}>
              Kolkrabbi<br />Vinnustofa
            </h1>
            <p className="text-auto-inverse font-['TGRoot'] text-2xl" style={{ fontWeight: 400 }}>Þórður Grímsson</p>
          </div>
        </div>
      </section>

    </div>
  )
}
