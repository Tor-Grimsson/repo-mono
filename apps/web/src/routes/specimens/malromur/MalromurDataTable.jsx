export default function SpecimenProseDataTable() {
  return (
    <div className="w-full min-h-screen relative bg-[#F5F1E8]">
      {/* TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-black text-[64px] font-normal font-['TG_Malromur'] leading-[72px] tracking-wide mb-8">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-black mx-auto mb-8" />

          <p className="text-black text-xl font-normal font-['TG_Malromur'] leading-7 mb-2">
            <span className="italic">Data Tables</span>
          </p>

          <div className="w-32 h-[1px] bg-black mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-black text-base font-normal font-['TG_Malromur'] leading-6">
            <p>
              Scientific Observations
            </p>
            <p>
              Prose Style <span className="italic">02</span>
            </p>
          </div>

          <div className="mt-20 space-y-4 text-black text-sm font-normal font-['TG_Malromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* DATA TABLE */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="text-black text-2xl font-normal font-['TG_Malromur'] leading-8 mb-2">
              Icelandic Weather Observations, <span className="italic">Autumn 2024</span>
            </h2>
            <div className="w-24 h-[1px] bg-black" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-t-2 border-b border-black">
                  <th className="text-left py-3 px-2 text-black text-xs font-semibold font-['TG_Malromur'] uppercase">Location</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TG_Malromur'] uppercase">Sept 1</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TG_Malromur'] uppercase">Sept 15</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TG_Malromur'] uppercase">Oct 1</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TG_Malromur'] uppercase">Oct 15</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TG_Malromur'] uppercase">Nov 1</th>
                  <th className="text-right py-3 px-2 text-black text-xs font-semibold font-['TG_Malromur'] uppercase">Avg Temp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">Reykjavík</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">12°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">9°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">7°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">4°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">2°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TG_Malromur']">6.8°C</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TG_Malromur'] italic">Akureyri</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">11°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">8°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">5°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">3°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">0°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TG_Malromur']">5.4°C</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">Vestmannaeyjar</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">13°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">11°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">9°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">6°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">4°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TG_Malromur']">8.6°C</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">Egilsstaðir</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">10°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">7°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">4°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">1°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">-1°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TG_Malromur']">4.2°C</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TG_Malromur'] italic">Ísafjörður</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">11°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">8°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">6°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">3°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TG_Malromur']">1°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TG_Malromur']">5.8°C</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-black text-xs font-normal font-['TG_Malromur'] italic leading-5">
            Temperatures recorded at noon local time. Data courtesy of Veðurstofa Íslands.
          </p>
        </div>
      </section>
    </div>
  )
}
