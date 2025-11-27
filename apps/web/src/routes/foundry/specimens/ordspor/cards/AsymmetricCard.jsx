export default function AsymmetricCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen flex flex-col justify-between" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        <div className="col-start-2 col-span-10">
          <div className="mb-16">
            <p className="text-auto font-['TGOrdspor'] text-xs uppercase tracking-wider opacity-60 mb-2">
              Layout Demonstration
            </p>
            <h2 className="text-auto font-['TGOrdspor'] text-[clamp(48px,6vw,96px)] leading-none" style={{ fontWeight: 700 }}>
              Asymmetric
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
            <div className="col-span-6">
              <h3 className="text-auto font-['TGOrdspor'] text-[clamp(32px,4vw,64px)] leading-tight mb-6" style={{ fontWeight: 700 }}>
                Primary Content
              </h3>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(16px,1.8vw,24px)] leading-relaxed mb-8">
                Asymmetric layouts break away from equal columns to create visual interest and establish clear content hierarchy. The larger column draws focus to primary content.
              </p>
              <p className="text-auto font-['TGOrdspor'] text-[clamp(16px,1.8vw,24px)] leading-relaxed">
                This layout pattern is particularly effective for editorial design where one element needs prominence while supporting information remains accessible.
              </p>
            </div>

            <div className="col-span-4 space-y-6">
              <div>
                <h4 className="text-auto font-['TGOrdspor'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Supporting Detail
                </h4>
                <p className="text-auto font-['TGOrdspor'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  The narrower column provides supplementary information without competing for attention with the main content area.
                </p>
              </div>

              <div>
                <h4 className="text-auto font-['TGOrdspor'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Additional Context
                </h4>
                <p className="text-auto font-['TGOrdspor'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  Smaller text sizes and condensed spacing maintain the visual hierarchy while maximizing information density.
                </p>
              </div>

              <div>
                <h4 className="text-auto font-['TGOrdspor'] text-[clamp(18px,2vw,28px)] leading-tight mb-3" style={{ fontWeight: 700 }}>
                  Side Notes
                </h4>
                <p className="text-auto font-['TGOrdspor'] text-[clamp(13px,1.4vw,16px)] leading-relaxed">
                  This sidebar pattern works well for metadata, related links, or quick reference information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
