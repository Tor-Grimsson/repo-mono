export default function SpecimenProseMenu() {
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
            <span className="italic">Menu Design</span>
          </p>

          <div className="w-32 h-[1px] bg-black mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-black text-base font-normal font-['TG_Malromur'] leading-6">
            <p>
              Bill of Fare
            </p>
            <p>
              Prose Style <span className="italic">03</span>
            </p>
          </div>

          <div className="mt-20 space-y-4 text-black text-sm font-normal font-['TG_Malromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* MENU/BILL OF FARE */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-black text-sm font-semibold font-['TG_Malromur'] uppercase tracking-widest mb-8">
              Bill of Fare
            </h2>
            <div className="w-16 h-[1px] bg-black mx-auto mb-8" />
            <p className="text-black text-xs font-normal font-['TG_Malromur'] italic">
              Appetizers on half shell
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            {/* Column 1 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-black text-base font-semibold font-['TG_Malromur'] text-center mb-4">
                  Soups.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Consommé</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur'] italic">Mock Turtle</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TG_Malromur'] text-center mb-4">
                  <span className="italic">Fish.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Boiled Sea Bass, sauce Joinville</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Baked Trout, à la Chambord</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TG_Malromur'] text-center mb-4">
                  Cold Ornamental Dishes.
                </h3>
                <div className="space-y-2 text-center text-sm">
                  <p className="text-black font-normal font-['TG_Malromur']">Galantine of Capon à la Gelée</p>
                  <p className="text-black font-normal font-['TG_Malromur']">Pâté de fois gras à la Strasbourg</p>
                  <p className="text-black font-normal font-['TG_Malromur']">Boned Turkey, aux Truffles</p>
                  <p className="text-black font-normal font-['TG_Malromur']">Ornamented Pyramids</p>
                  <p className="text-black font-normal font-['TG_Malromur'] italic">Chaudfroid</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TG_Malromur'] text-center mb-4">
                  <span className="italic">Boiled.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Turkey, Oyster sauce</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Leg Mutton, Caper sauce</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Corned Beef</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Ham</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Tongue</p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-black text-base font-semibold font-['TG_Malromur'] text-center mb-4">
                  <span className="italic">Relishes.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Assorted Pickles</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Cranberries</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Olives</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TG_Malromur'] text-center mb-4">
                  Game.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Haunch Venison</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Roast Duck with Jelly</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TG_Malromur'] text-center mb-4">
                  Vegetables.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Green Peas</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Mashed Potatoes</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Boiled Potatoes</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Sweet Potatoes</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Spinach</p>
                </div>
              </div>

              <div>
                <h3 className="text-black text-base font-semibold font-['TG_Malromur'] text-center mb-4">
                  Pastry and Confections.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Charlotte Russe</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Lemon Pie</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Apple Pie</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur']">Mince Pie</p>
                  <p className="text-black text-sm font-normal font-['TG_Malromur'] italic">Jelly Roll</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center space-y-6">
            <div>
              <h3 className="text-black text-base font-semibold font-['TG_Malromur'] mb-4">
                Dessert.
              </h3>
              <div className="space-y-1">
                <p className="text-black text-sm font-normal font-['TG_Malromur']">Almonds</p>
                <p className="text-black text-sm font-normal font-['TG_Malromur']">Raisins</p>
                <p className="text-black text-sm font-normal font-['TG_Malromur']">Figs</p>
              </div>
            </div>

            <div className="border-t border-black pt-6 max-w-[400px] mx-auto">
              <h3 className="text-black text-base font-semibold font-['TG_Malromur'] mb-3">
                <span className="italic">Wines</span>
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                <p className="text-black font-normal font-['TG_Malromur'] text-right uppercase">White</p>
                <p className="text-black font-normal font-['TG_Malromur'] text-left uppercase">Sweet</p>
                <p className="text-black font-normal font-['TG_Malromur'] text-right">Chablis Premier Cru</p>
                <p className="text-black font-normal font-['TG_Malromur'] text-left">Sauternes Select</p>
                <p className="text-black font-normal font-['TG_Malromur'] text-right italic">Burgundy</p>
                <p className="text-black font-normal font-['TG_Malromur'] text-left italic">Tokaji</p>
                <p className="text-black font-normal font-['TG_Malromur'] text-right">Pouilly-Fumé</p>
                <p className="text-black font-normal font-['TG_Malromur'] text-left">Riesling</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
