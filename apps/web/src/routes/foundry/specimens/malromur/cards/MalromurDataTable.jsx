export default function SpecimenProseDataTable() {
  return (
    <div className="w-full min-h-screen relative">
      {/* DATA TABLE */}
      <section className="w-full h-screen snap-start flex items-center">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
          <div className="col-span-10 col-start-2 mb-8">
            <h2 className="text-auto text-2xl font-normal font-['TGMalromur'] leading-8 mb-2">
              Icelandic Weather Observations, <span className="italic">Autumn 1884</span>
            </h2>
            <div className="w-24 h-[1px] bg-fg-24" />
          </div>

          {/* Table using CSS Grid */}
          <div className="col-span-10 col-start-2">
            {/* Top border */}
            <div className="w-full h-[1px] bg-fg-24 mb-3"></div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
              {/* Header row */}
              <div className="col-span-3">
                <p className="text-left text-auto text-xs font-semibold font-['TGMalromur'] uppercase" style={{ lineHeight: '16px' }}>Location</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-xs font-semibold font-['TGMalromur'] uppercase" style={{ lineHeight: '16px' }}>Sept 1</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-xs font-semibold font-['TGMalromur'] uppercase" style={{ lineHeight: '16px' }}>Sept 15</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-xs font-semibold font-['TGMalromur'] uppercase" style={{ lineHeight: '16px' }}>Oct 1</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-xs font-semibold font-['TGMalromur'] uppercase" style={{ lineHeight: '16px' }}>Oct 15</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-xs font-semibold font-['TGMalromur'] uppercase" style={{ lineHeight: '16px' }}>Nov 1</p>
              </div>
              <div className="col-span-2">
                <p className="text-right text-auto text-xs font-semibold font-['TGMalromur'] uppercase" style={{ lineHeight: '16px' }}>Avg Temp</p>
              </div>
            </div>

            {/* Border after header */}
            <div className="w-full h-[1px] bg-fg-16 my-3"></div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
              {/* Row 1 */}
              <div className="col-span-3">
                <p className="text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>Reykjavík</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>12°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>9°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>7°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>4°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>2°</p>
              </div>
              <div className="col-span-2">
                <p className="text-right text-auto text-sm font-semibold font-['TGMalromur']" style={{ lineHeight: '24px' }}>6.8°C</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-fg-12 my-3"></div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
              {/* Row 2 */}
              <div className="col-span-3">
                <p className="text-auto text-sm font-normal font-['TGMalromur'] italic" style={{ lineHeight: '24px' }}>Akureyri</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>11°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>8°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>5°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>3°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>0°</p>
              </div>
              <div className="col-span-2">
                <p className="text-right text-auto text-sm font-semibold font-['TGMalromur']" style={{ lineHeight: '24px' }}>5.4°C</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-fg-12 my-3"></div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
              {/* Row 3 */}
              <div className="col-span-3">
                <p className="text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>Vestmannaeyjar</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>13°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>11°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>9°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>6°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>4°</p>
              </div>
              <div className="col-span-2">
                <p className="text-right text-auto text-sm font-semibold font-['TGMalromur']" style={{ lineHeight: '24px' }}>8.6°C</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-fg-12 my-3"></div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
              {/* Row 4 */}
              <div className="col-span-3">
                <p className="text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>Egilsstaðir</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>10°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>7°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>4°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>1°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>-1°</p>
              </div>
              <div className="col-span-2">
                <p className="text-right text-auto text-sm font-semibold font-['TGMalromur']" style={{ lineHeight: '24px' }}>4.2°C</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-fg-12 my-3"></div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(10, 86px)', gap: '24px' }}>
              {/* Row 5 */}
              <div className="col-span-3">
                <p className="text-auto text-sm font-normal font-['TGMalromur'] italic" style={{ lineHeight: '24px' }}>Ísafjörður</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>11°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>8°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>6°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>3°</p>
              </div>
              <div className="col-span-1">
                <p className="text-center text-auto text-sm font-normal font-['TGMalromur']" style={{ lineHeight: '24px' }}>1°</p>
              </div>
              <div className="col-span-2">
                <p className="text-right text-auto text-sm font-semibold font-['TGMalromur']" style={{ lineHeight: '24px' }}>5.8°C</p>
              </div>
            </div>
          </div>

          <div className="col-span-10 col-start-2">
            <p className="mt-6 text-fg-48 text-xs font-light font-['TGMalromur'] italic leading-5">
              Temperatures recorded at noon local time. Data courtesy of Veðurstofa Íslands.
            </p>
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}
