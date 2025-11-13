export default function SpecimenProseMenu() {
  return (
    <div className="w-full min-h-screen relative bg-[#F5F1E8]">
      {/* TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-auto text-[64px] font-normal font-['TGMalromur'] leading-[72px] tracking-wide mb-8">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-surface-inverse mx-auto mb-8" />

          <p className="text-auto text-xl font-normal font-['TGMalromur'] leading-7 mb-2">
            <span className="italic">Menu Design</span>
          </p>

          <div className="w-32 h-[1px] bg-surface-inverse mx-auto mt-8 mb-12" />

          <div className="space-y-6 text-auto text-base font-normal font-['TGMalromur'] leading-6">
            <p>
              Bill of Fare
            </p>
            <p>
              Prose Style <span className="italic">03</span>
            </p>
          </div>

          <div className="mt-20 space-y-4 text-auto text-sm font-normal font-['TGMalromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* MENU/BILL OF FARE */}
      <section className="w-full min-h-screen px-8 py-24">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-auto text-sm font-semibold font-['TGMalromur'] uppercase tracking-widest mb-8">
              Bill of Fare
            </h2>
            <div className="w-16 h-[1px] bg-surface-inverse mx-auto mb-8" />
            <p className="text-auto text-xs font-normal font-['TGMalromur'] italic">
              Appetizers on half shell
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            {/* Column 1 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Soups.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Consommé</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur'] italic">Mock Turtle</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Fish.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Boiled Sea Bass, sauce Joinville</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Baked Trout, à la Chambord</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Cold Ornamental Dishes.
                </h3>
                <div className="space-y-2 text-center text-sm">
                  <p className="text-auto font-normal font-['TGMalromur']">Galantine of Capon à la Gelée</p>
                  <p className="text-auto font-normal font-['TGMalromur']">Pâté de fois gras à la Strasbourg</p>
                  <p className="text-auto font-normal font-['TGMalromur']">Boned Turkey, aux Truffles</p>
                  <p className="text-auto font-normal font-['TGMalromur']">Ornamented Pyramids</p>
                  <p className="text-auto font-normal font-['TGMalromur'] italic">Chaudfroid</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Boiled.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Turkey, Oyster sauce</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Leg Mutton, Caper sauce</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Corned Beef</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Ham</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Tongue</p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Relishes.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Assorted Pickles</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Cranberries</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Olives</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Game.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Haunch Venison</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Roast Duck with Jelly</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Vegetables.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Green Peas</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Mashed Potatoes</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Boiled Potatoes</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Sweet Potatoes</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Spinach</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Pastry and Confections.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Charlotte Russe</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Lemon Pie</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Apple Pie</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur']">Mince Pie</p>
                  <p className="text-auto text-sm font-normal font-['TGMalromur'] italic">Jelly Roll</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center space-y-6">
            <div>
              <h3 className="text-auto text-base font-semibold font-['TGMalromur'] mb-4">
                Dessert.
              </h3>
              <div className="space-y-1">
                <p className="text-auto text-sm font-normal font-['TGMalromur']">Almonds</p>
                <p className="text-auto text-sm font-normal font-['TGMalromur']">Raisins</p>
                <p className="text-auto text-sm font-normal font-['TGMalromur']">Figs</p>
              </div>
            </div>

            <div className="border-t border-auto pt-6 max-w-[400px] mx-auto">
              <h3 className="text-auto text-base font-semibold font-['TGMalromur'] mb-3">
                <span className="italic">Wines</span>
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                <p className="text-auto font-normal font-['TGMalromur'] text-right uppercase">White</p>
                <p className="text-auto font-normal font-['TGMalromur'] text-left uppercase">Sweet</p>
                <p className="text-auto font-normal font-['TGMalromur'] text-right">Chablis Premier Cru</p>
                <p className="text-auto font-normal font-['TGMalromur'] text-left">Sauternes Select</p>
                <p className="text-auto font-normal font-['TGMalromur'] text-right italic">Burgundy</p>
                <p className="text-auto font-normal font-['TGMalromur'] text-left italic">Tokaji</p>
                <p className="text-auto font-normal font-['TGMalromur'] text-right">Pouilly-Fumé</p>
                <p className="text-auto font-normal font-['TGMalromur'] text-left">Riesling</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
