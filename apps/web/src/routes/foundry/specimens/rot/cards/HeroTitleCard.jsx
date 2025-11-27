export default function HeroTitleCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full h-screen relative" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="relative z-10 h-full flex items-center">
        <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
          <div style={{ gridColumn: 'span 12' }} className="flex flex-col items-center justify-center">
            {/* Top left label */}
            <div className="absolute top-12 left-12">
              <p className="text-auto text-sm font-normal font-['TGRoot']">
                New Typeface
              </p>
            </div>

            {/* Top right label */}
            <div className="absolute top-12 right-12">
              <p className="text-auto text-sm font-normal font-['TGRoot']">
                No. 1
              </p>
            </div>

            {/* Center content */}
            <div className="flex flex-col items-center justify-center">
              {/* Main typeface name */}
              <h1
                className="text-auto mb-16"
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
                className="text-auto"
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
                <rect width="32" height="32" fill="currentColor" className="text-auto" />
              </svg>
              <span className="text-auto text-sm font-normal font-['TGRoot'] uppercase tracking-wider">
                Kolkrabbi 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
