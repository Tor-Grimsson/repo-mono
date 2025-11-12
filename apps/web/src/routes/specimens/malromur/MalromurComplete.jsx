export default function SpecimenThree() {
  return (
    <div className="w-full min-h-screen relative bg-[#F5F1E8]">
      {/* SECTION 1: TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-black text-[64px] font-normal font-['TGMalromur'] leading-[72px] tracking-wide mb-8">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-black mx-auto mb-8" />

          <p className="text-black text-xl font-normal font-['TGMalromur'] leading-7 mb-2">
            <span className="italic">A Study in Prose Styles</span>
          </p>

          <div className="w-32 h-[1px] bg-black mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-black text-base font-normal font-['TGMalromur'] leading-6">
            <p>
              Following the unique gestures <span className="italic">of</span> the types <span className="italic">of</span> various contexts
            </p>
            <p>
              as typeset in 2024 <span className="italic">for</span> the digital age
            </p>
          </div>

          <div className="mt-20 space-y-4 text-black text-sm font-normal font-['TGMalromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: TABLE OF CONTENTS */}
      <section className="w-full min-h-screen flex items-center justify-center px-8 py-24">
        <div className="max-w-[640px] mx-auto">
          <h2 className="text-center text-black text-3xl font-normal font-['TGMalromur'] leading-10 mb-12">
            Table <span className="italic">of</span> Contents
          </h2>

          <div className="border-t-2 border-b-2 border-black py-8 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TGMalromur']">Editorial</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TGMalromur']">2</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TGMalromur']">Data Tables</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TGMalromur']">3</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TGMalromur']">Menu Design</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TGMalromur']">4</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TGMalromur']">Newsletter</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TGMalromur']">5</span>
            </div>

            <div className="flex justify-between items-baseline pl-8">
              <span className="text-black text-lg font-normal font-['TGMalromur'] italic">Field Notes</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TGMalromur']">6</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TGMalromur']">Index</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TGMalromur']">7</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-black text-lg font-normal font-['TGMalromur']">Chapter Opening</span>
              <span className="flex-1 border-b border-dotted border-black mx-4 mb-1"></span>
              <span className="text-black text-lg font-normal font-['TGMalromur']">8</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EDITORIAL ARTICLE */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-black text-sm font-normal font-['TGMalromur'] leading-5 mb-4">
              "There's something placid and comforting about this lighter touch, especially when compared to the vigorous, authoritative book Romans that would follow it."
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Main article column */}
            <div className="col-span-7 space-y-6">
              <div className="mb-8">
                <h3 className="text-black text-[64px] font-medium font-['TGMalromur'] leading-[64px] mb-2">
                  On the
                </h3>
                <h3 className="text-black text-[64px] font-medium font-['TGMalromur'] leading-[64px] mb-2">
                  graceful
                </h3>
                <h3 className="text-black text-[64px] font-medium font-['TGMalromur'] leading-[64px]">
                  serif
                </h3>
              </div>

              <p className="text-black text-base font-normal font-['TGMalromur'] leading-6">
                The serif (also called <span className="italic">seraph</span>) is the finishing stroke at the base or top of letterforms. The word originated from the Dutch <span className="italic">schreef</span> meaning line or stroke. In Latin typography, serifs provide visual horizontal emphasis to guide the eye along lines of text. They also help distinguish individual letters.
              </p>

              <p className="text-black text-base font-normal font-['TGMalromur'] leading-6">
                This particular cut of type was based on the types cut by William Martin in the late 18th century for William Bulmer. These types were regarded as the finest of their era. Unlike the vigorous, authoritative book romans that would follow, Martin's types possessed a lighter touch – something placid and comforting about their design.
              </p>

              <p className="text-black text-base font-normal font-['TGMalromur'] leading-6">
                The contrast between thick and thin strokes is pronounced but not aggressive. The letterforms are sturdy but refined. There is a sense of confidence without ostentation, elegance without fragility. This balance makes it suitable for extended reading while maintaining enough personality for display settings.
              </p>
            </div>

            {/* Sidebar */}
            <div className="col-span-5 bg-[#E8DCC0] p-8">
              <div className="mb-6">
                <p className="text-black text-xs font-semibold font-['TGMalromur'] uppercase tracking-wider mb-2">
                  Type Specimen
                </p>
                <div className="w-12 h-[1px] bg-black mb-4" />
              </div>

              <p className="text-black text-sm font-normal font-['TGMalromur'] leading-5 mb-4">
                <span className="font-semibold">Designer:</span> Kolkrabbi Foundry
              </p>

              <p className="text-black text-sm font-normal font-['TGMalromur'] leading-5 mb-4">
                <span className="font-semibold">Classification:</span> Transitional serif, inspired by late 18th century British typography
              </p>

              <p className="text-black text-sm font-normal font-['TGMalromur'] leading-5 mb-4">
                <span className="font-semibold">Weights:</span> From thin to black, with corresponding italics
              </p>

              <p className="text-black text-sm font-normal font-['TGMalromur'] leading-5 mb-6">
                <span className="font-semibold">Use cases:</span> Books, periodicals, editorial design, scientific publications, formal documents
              </p>

              <div className="mt-8 p-4 bg-white">
                <p className="text-black text-2xl font-normal font-['TGMalromur'] leading-7 text-center italic">
                  "A lighter touch compared to vigorous book Romans"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DATA TABLE */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="text-black text-2xl font-normal font-['TGMalromur'] leading-8 mb-2">
              Icelandic Weather Observations, <span className="italic">Autumn 2024</span>
            </h2>
            <div className="w-24 h-[1px] bg-black" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-t-2 border-b border-black">
                  <th className="text-left py-3 px-2 text-black text-xs font-semibold font-['TGMalromur'] uppercase">Location</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TGMalromur'] uppercase">Sept 1</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TGMalromur'] uppercase">Sept 15</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TGMalromur'] uppercase">Oct 1</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TGMalromur'] uppercase">Oct 15</th>
                  <th className="text-center py-3 px-2 text-black text-xs font-semibold font-['TGMalromur'] uppercase">Nov 1</th>
                  <th className="text-right py-3 px-2 text-black text-xs font-semibold font-['TGMalromur'] uppercase">Avg Temp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">Reykjavík</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">12°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">9°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">7°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">4°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">2°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TGMalromur']">6.8°C</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TGMalromur'] italic">Akureyri</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">11°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">8°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">5°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">3°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">0°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TGMalromur']">5.4°C</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">Vestmannaeyjar</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">13°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">11°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">9°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">6°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">4°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TGMalromur']">8.6°C</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">Egilsstaðir</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">10°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">7°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">4°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">1°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">-1°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TGMalromur']">4.2°C</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="py-3 px-2 text-black text-sm font-normal font-['TGMalromur'] italic">Ísafjörður</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">11°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">8°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">6°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">3°</td>
                  <td className="text-center py-3 px-2 text-black text-sm font-normal font-['TGMalromur']">1°</td>
                  <td className="text-right py-3 px-2 text-black text-sm font-semibold font-['TGMalromur']">5.8°C</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-black text-xs font-normal font-['TGMalromur'] italic leading-5">
            Temperatures recorded at noon local time. Data courtesy of Veðurstofa Íslands.
          </p>
        </div>
      </section>

      {/* SECTION 5: MENU/BILL OF FARE */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-black text-sm font-semibold font-['TGMalromur'] uppercase tracking-widest mb-8">
              Bill of Fare
            </h2>
            <div className="w-16 h-[1px] bg-black mx-auto mb-8" />
            <p className="text-black text-xs font-normal font-['TGMalromur'] italic">
              Appetizers on half shell
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            {/* Column 1 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-black text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Soups.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Consommé</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur'] italic">Mock Turtle</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Fish.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Boiled Sea Bass, sauce Joinville</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Baked Trout, à la Chambord</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Cold Ornamental Dishes.
                </h3>
                <div className="space-y-2 text-center text-sm">
                  <p className="text-black font-normal font-['TGMalromur']">Galantine of Capon à la Gelée</p>
                  <p className="text-black font-normal font-['TGMalromur']">Pâté de fois gras à la Strasbourg</p>
                  <p className="text-black font-normal font-['TGMalromur']">Boned Turkey, aux Truffles</p>
                  <p className="text-black font-normal font-['TGMalromur']">Ornamented Pyramids</p>
                  <p className="text-black font-normal font-['TGMalromur'] italic">Chaudfroid</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Boiled.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Turkey, Oyster sauce</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Leg Mutton, Caper sauce</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Corned Beef</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Ham</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Tongue</p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-black text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Relishes.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Assorted Pickles</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Cranberries</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Olives</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Game.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Haunch Venison</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Roast Duck with Jelly</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Vegetables.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Green Peas</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Mashed Potatoes</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Boiled Potatoes</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Sweet Potatoes</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Spinach</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Pastry and Confections.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Charlotte Russe</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Lemon Pie</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Apple Pie</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur']">Mince Pie</p>
                  <p className="text-black text-sm font-normal font-['TGMalromur'] italic">Jelly Roll</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center space-y-6">
            <div>
              <h3 className="text-black text-base font-semibold font-['TGMalromur'] mb-4">
                Dessert.
              </h3>
              <div className="space-y-1">
                <p className="text-black text-sm font-normal font-['TGMalromur']">Almonds</p>
                <p className="text-black text-sm font-normal font-['TGMalromur']">Raisins</p>
                <p className="text-black text-sm font-normal font-['TGMalromur']">Figs</p>
              </div>
            </div>

            <div className="border-t border-black pt-6 max-w-[400px] mx-auto">
              <h3 className="text-black text-base font-semibold font-['TGMalromur'] mb-3">
                <span className="italic">Wines</span>
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                <p className="text-black font-normal font-['TGMalromur'] text-right uppercase">White</p>
                <p className="text-black font-normal font-['TGMalromur'] text-left uppercase">Sweet</p>
                <p className="text-black font-normal font-['TGMalromur'] text-right">Chablis Premier Cru</p>
                <p className="text-black font-normal font-['TGMalromur'] text-left">Sauternes Select</p>
                <p className="text-black font-normal font-['TGMalromur'] text-right italic">Burgundy</p>
                <p className="text-black font-normal font-['TGMalromur'] text-left italic">Tokaji</p>
                <p className="text-black font-normal font-['TGMalromur'] text-right">Pouilly-Fumé</p>
                <p className="text-black font-normal font-['TGMalromur'] text-left">Riesling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: NEWSLETTER/BULLETIN */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <h2 className="text-black text-5xl font-normal font-['TGMalromur'] leading-tight mb-2">
              Bulletin #35
            </h2>
            <p className="text-black text-2xl font-normal font-['TGMalromur'] italic leading-8">
              General Notes
            </p>
            <div className="w-24 h-[1px] bg-black mt-4" />
          </div>

          <div className="mb-8">
            <h3 className="text-black text-xl font-semibold font-['TGMalromur'] leading-7 mb-2">
              The Long-billed Marsh Wren
            </h3>
            <p className="text-black text-base font-normal font-['TGMalromur'] italic leading-6 mb-4">
              Capture of a Second Specimen
            </p>
            <div className="w-16 h-[1px] bg-black mb-6" />

            <p className="text-black text-sm font-normal font-['TGMalromur'] leading-6 italic mb-4">
              With a pair of Field Glasses the Cardinal can be seen at a great distance in winter.
            </p>
          </div>

          <div className="columns-3 gap-8 text-black text-sm font-normal font-['TGMalromur'] leading-6">
            <p className="mb-4">
              On November 12th we set out with determination and a singular purpose: to observe the behavioral patterns of the Long-billed Marsh Wren in its natural habitat. The morning was crisp, with a light fog hanging over the marshlands that would soon give way to the warming sun. Armed with our field notebooks and a keen sense of anticipation, we proceeded to the eastern edge of the wetlands.
            </p>

            <p className="mb-4">
              Our first sighting came at approximately 9:30 AM, when a distinctive chattering call drew our attention to a dense patch of cattails. There, perched precariously on a swaying stem, was an adult specimen in full breeding plumage. The bird's characteristic upright tail and nervous demeanor were immediately apparent.
            </p>

            <p className="mb-4">
              What followed was a remarkable display of territorial behavior. The wren proceeded to visit no fewer than six separate nest structures within a radius of twenty meters, each constructed with the intricate dome shape characteristic of the species. It became clear that this particular individual was maintaining multiple nesting sites, a behavior previously documented but rarely observed in such detail.
            </p>

            <p className="mb-4">
              The vocal repertoire proved equally fascinating. Over the course of three hours, we documented fourteen distinct call variations, ranging from harsh scolding notes to melodious warbling sequences. The complexity of the species' acoustic communication suggests a level of social organization that merits further investigation.
            </p>

            <p className="mb-4">
              Perhaps most intriguing was the bird's interaction with a nearby population of Red-winged Blackbirds. Rather than displaying the expected territorial aggression, the wren seemed to tolerate, and at times even approach, the larger birds. This behavioral anomaly raises questions about interspecies dynamics in marsh ecosystems.
            </p>

            <p className="mb-4">
              As the afternoon progressed and the temperature rose, activity levels decreased markedly. By 2:00 PM, the bird had retreated deep into the vegetation, and our observations concluded. The day's fieldwork provided valuable data points that will contribute to our ongoing study of marsh bird ecology and behavior.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: INDEX/DIRECTORY */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-black text-3xl font-normal font-['TGMalromur'] leading-10 mb-8">
            Index <span className="italic">of</span> Icelandic Terms
          </h2>

          <div className="columns-3 gap-8 text-black text-sm font-normal font-['TGMalromur'] leading-6">
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Ást</p>
                <p className="pl-4 text-xs italic">love, affection</p>
              </div>

              <div>
                <p className="font-semibold">Augnablik</p>
                <p className="pl-4 text-xs italic">moment, instant</p>
              </div>

              <div>
                <p className="font-semibold">Bátur</p>
                <p className="pl-4 text-xs italic">boat, vessel</p>
              </div>

              <div>
                <p className="font-semibold">Bjór</p>
                <p className="pl-4 text-xs italic">beer</p>
              </div>

              <div>
                <p className="font-semibold">Bók</p>
                <p className="pl-4 text-xs italic">book</p>
              </div>

              <div>
                <p className="font-semibold">Dagur</p>
                <p className="pl-4 text-xs italic">day</p>
              </div>

              <div>
                <p className="font-semibold">Draumur</p>
                <p className="pl-4 text-xs italic">dream</p>
              </div>

              <div>
                <p className="font-semibold">Eldur</p>
                <p className="pl-4 text-xs italic">fire</p>
              </div>

              <div>
                <p className="font-semibold">Fjall</p>
                <p className="pl-4 text-xs italic">mountain</p>
              </div>

              <div>
                <p className="font-semibold">Flugvéll</p>
                <p className="pl-4 text-xs italic">airport</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-semibold">Gluggaveður</p>
                <p className="pl-4 text-xs italic">window weather</p>
              </div>

              <div>
                <p className="font-semibold">Hestur</p>
                <p className="pl-4 text-xs italic">horse</p>
              </div>

              <div>
                <p className="font-semibold">Himinn</p>
                <p className="pl-4 text-xs italic">sky, heaven</p>
              </div>

              <div>
                <p className="font-semibold">Jökull</p>
                <p className="pl-4 text-xs italic">glacier</p>
              </div>

              <div>
                <p className="font-semibold">Kaffi</p>
                <p className="pl-4 text-xs italic">coffee</p>
              </div>

              <div>
                <p className="font-semibold">Köttur</p>
                <p className="pl-4 text-xs italic">cat</p>
              </div>

              <div>
                <p className="font-semibold">Ljós</p>
                <p className="pl-4 text-xs italic">light</p>
              </div>

              <div>
                <p className="font-semibold">Matur</p>
                <p className="pl-4 text-xs italic">food</p>
              </div>

              <div>
                <p className="font-semibold">Myrkur</p>
                <p className="pl-4 text-xs italic">darkness</p>
              </div>

              <div>
                <p className="font-semibold">Náttúra</p>
                <p className="pl-4 text-xs italic">nature</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-semibold">Regn</p>
                <p className="pl-4 text-xs italic">rain</p>
              </div>

              <div>
                <p className="font-semibold">Sjór</p>
                <p className="pl-4 text-xs italic">sea, ocean</p>
              </div>

              <div>
                <p className="font-semibold">Sól</p>
                <p className="pl-4 text-xs italic">sun</p>
              </div>

              <div>
                <p className="font-semibold">Stjarna</p>
                <p className="pl-4 text-xs italic">star</p>
              </div>

              <div>
                <p className="font-semibold">Tími</p>
                <p className="pl-4 text-xs italic">time</p>
              </div>

              <div>
                <p className="font-semibold">Vatn</p>
                <p className="pl-4 text-xs italic">water, lake</p>
              </div>

              <div>
                <p className="font-semibold">Veður</p>
                <p className="pl-4 text-xs italic">weather</p>
              </div>

              <div>
                <p className="font-semibold">Vindur</p>
                <p className="pl-4 text-xs italic">wind</p>
              </div>

              <div>
                <p className="font-semibold">Þjóð</p>
                <p className="pl-4 text-xs italic">nation, people</p>
              </div>

              <div>
                <p className="font-semibold">Ævintýri</p>
                <p className="pl-4 text-xs italic">adventure, fairy tale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TWO-PAGE SPREAD / CHAPTER OPENING */}
      <section className="w-full min-h-screen flex items-center justify-center px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 gap-16">
            {/* Left page */}
            <div className="flex items-center justify-end">
              <div className="max-w-[400px] text-right">
                <p className="text-black text-sm font-normal font-['TGMalromur'] uppercase tracking-wider mb-4">
                  Chapter V.
                </p>
                <h2 className="text-black text-4xl font-semibold font-['TGMalromur'] leading-tight">
                  On Flight
                </h2>
              </div>
            </div>

            {/* Right page */}
            <div className="flex items-center">
              <div className="max-w-[500px] space-y-6 text-black text-base font-normal font-['TGMalromur'] leading-7">
                <p className="italic">
                  A great difference subsisting on the wing
                </p>

                <p>
                  One of the most striking features of bird life is surely its restless activity. This is always apparent, but it attains its climax at almost fevered excitement at the spring advances and the potential instinct for <span className="italic">mating</span> is ultra-potent, or both intensified dramatically.
                </p>

                <p>
                  In their normal routine many resident species are comparatively unobtrusive. A certain resident robin, or beautiful resident in mid-air, is with calm wings sweeps noisily along the ridge of an orchard boundary wall, its flight is compounded with curious sidelong glides and pauses, interspersed amid the ground. And there, as to be added, are evidences in the lofty maple tree from whence it took its rise.
                </p>

                <p>
                  Most birds have sufficient aerial skill to enable them to proceed in their course of migration unobstructed by adverse conditions. There may be some natural barriers, mountains, or seas, which impel them to deviate from their natural course. But these are exceptions – with most residents, migration is accompanied by great smoothness of aerial motion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="w-full min-h-[50vh] flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center space-y-6">
          <div className="w-32 h-[1px] bg-black mx-auto mb-8" />
          <p className="text-black text-sm font-normal font-['TGMalromur'] leading-6">
            End of specimens
          </p>
          <p className="text-black text-xs font-normal font-['TGMalromur'] italic leading-5">
            TG Málrómur · Kolkrabbi Foundry · 2024
          </p>
        </div>
      </section>
    </div>
  )
}
