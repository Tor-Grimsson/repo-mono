export default function SpecimenProseTOC() {
  const dotLeaderStyle = {
    flex: 1,
    alignSelf: 'baseline',
    marginBottom: '2px',
    marginLeft: '12px',
    marginRight: '12px',
    height: '1px',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'1\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'0.5\' cy=\'0.5\' r=\'0.5\' fill=\'%23666\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'left bottom'
  };

  return (
    <div className="w-full min-h-screen relative">
      {/* TABLE OF CONTENTS */}
      <section className="w-full h-screen snap-start flex items-center">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
            <div className="col-span-4 col-start-5">
              <h2 className="text-center text-auto text-3xl font-normal font-['TGMalromur'] mb-12" style={{ lineHeight: '40px' }}>
                Table <span className="italic">of</span> Contents
              </h2>

              <div className="border-t border-b border-fg-24 py-8 space-y-2">
                <div className="flex items-baseline justify-between text-auto text-lg font-normal font-['TGMalromur']" style={{ lineHeight: '32px' }}>
                  <span>Editorial</span>
                  <span style={dotLeaderStyle}></span>
                  <span>2</span>
                </div>

                <div className="flex items-baseline justify-between text-auto text-lg font-normal font-['TGMalromur']" style={{ lineHeight: '32px' }}>
                  <span>Data Tables</span>
                  <span style={dotLeaderStyle}></span>
                  <span>3</span>
                </div>

                <div className="flex items-baseline justify-between text-auto text-lg font-normal font-['TGMalromur']" style={{ lineHeight: '32px' }}>
                  <span>Menu Design</span>
                  <span style={dotLeaderStyle}></span>
                  <span>4</span>
                </div>

                <div className="flex items-baseline justify-between text-auto text-lg font-normal font-['TGMalromur']" style={{ lineHeight: '32px' }}>
                  <span>Newsletter</span>
                  <span style={dotLeaderStyle}></span>
                  <span>5</span>
                </div>

                <div className="flex items-baseline justify-between text-auto text-lg font-normal font-['TGMalromur']" style={{ lineHeight: '32px', paddingLeft: '32px' }}>
                  <span className="italic font-light">Field Notes</span>
                  <span style={dotLeaderStyle}></span>
                  <span className="italic font-light">6</span>
                </div>

                <div className="flex items-baseline justify-between text-auto text-lg font-normal font-['TGMalromur']" style={{ lineHeight: '32px' }}>
                  <span>Index</span>
                  <span style={dotLeaderStyle}></span>
                  <span>7</span>
                </div>

                <div className="flex items-baseline justify-between text-auto text-lg font-normal font-['TGMalromur']" style={{ lineHeight: '32px' }}>
                  <span>Chapter Opening</span>
                  <span style={dotLeaderStyle}></span>
                  <span>8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
