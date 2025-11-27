export default function SpecimenProseMenu() {
  return (
    <div className="w-full min-h-screen relative">
      {/* MENU/BILL OF FARE */}
      <section className="w-full h-screen snap-start flex items-center justify-center">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
            {/* Left Page - Main Menu */}
            <div className="col-span-5 col-start-2 p-12 bg-fg-02 min-h-[600px] flex flex-col">
              <div className="text-center mb-12">
                <h2 className="text-auto text-sm font-semibold font-['TGMalromur'] uppercase tracking-widest mb-4">
                  Bill of Fare
                </h2>
                <div className="w-16 h-[1px] bg-fg-24 mx-auto mb-4" />
                <p className="text-auto text-xs font-normal font-['TGMalromur'] italic">
                  Appetizers on half shell
                </p>
              </div>

              <div className="flex-1">
              <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                {/* Left column of left page */}
                <div className="space-y-8">
              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Soups.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Consommé</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur'] italic">Mock Turtle</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Fish.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Boiled Sea Bass, sauce Joinville</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Baked Trout, à la Chambord</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Cold Ornamental Dishes.
                </h3>
                <div className="space-y-2 text-center text-sm">
                  <p className="text-auto font-light font-['TGMalromur']">Galantine of Capon à la Gelée</p>
                  <p className="text-auto font-light font-['TGMalromur']">Pâté de fois gras à la Strasbourg</p>
                  <p className="text-auto font-light font-['TGMalromur']">Boned Turkey, aux Truffles</p>
                  <p className="text-auto font-light font-['TGMalromur']">Ornamented Pyramids</p>
                  <p className="text-auto font-light font-['TGMalromur'] italic">Chaudfroid</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Boiled.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Turkey, Oyster sauce</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Leg Mutton, Caper sauce</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Corned Beef</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Ham</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Tongue</p>
                </div>
              </div>
                </div>

                {/* Right column of left page */}
                <div className="space-y-8">
              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  <span className="italic">Relishes.</span>
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Assorted Pickles</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Cranberries</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Olives</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Game.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Haunch Venison</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Roast Duck with Jelly</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Vegetables.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Green Peas</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Mashed Potatoes</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Boiled Potatoes</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Sweet Potatoes</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Spinach</p>
                </div>
              </div>

              <div>
                <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-4">
                  Pastry and Confections.
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Charlotte Russe</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Lemon Pie</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Apple Pie</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur']">Mince Pie</p>
                  <p className="text-auto text-sm font-light font-['TGMalromur'] italic">Jelly Roll</p>
                </div>
              </div>
                </div>
              </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-auto text-xs font-normal font-['TGMalromur'] uppercase tracking-wider">
                  Thursday, December 25th, 1884
                </p>
              </div>
            </div>

            {/* Right Page - Dessert & Wines */}
            <div className="col-span-5 p-12 bg-fg-02 min-h-[600px] flex flex-col">
              <div className="text-center mb-12">
                <h2 className="text-auto text-sm font-semibold font-['TGMalromur'] uppercase tracking-widest mb-4">
                  Dessert & Wines
                </h2>
                <div className="w-16 h-[1px] bg-fg-24 mx-auto" />
              </div>

              <div className="flex-1 space-y-12">
                <div>
                  <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-6">
                    Dessert.
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="text-center space-y-2">
                      <p className="text-auto font-light font-['TGMalromur']">English Plum Pudding</p>
                      <p className="text-auto font-light font-['TGMalromur']">Nesselrode Pudding</p>
                      <p className="text-auto font-light font-['TGMalromur'] italic">Biscuit Glacé</p>
                      <p className="text-auto font-light font-['TGMalromur']">Almonds</p>
                      <p className="text-auto font-light font-['TGMalromur']">Macarons</p>
                      <p className="text-auto font-light font-['TGMalromur'] italic">Trifle</p>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-auto font-light font-['TGMalromur']">Raisins</p>
                      <p className="text-auto font-light font-['TGMalromur']">Figs</p>
                      <p className="text-auto font-light font-['TGMalromur']">Dates</p>
                      <p className="text-auto font-light font-['TGMalromur'] italic">Crystallized Fruits</p>
                      <p className="text-auto font-light font-['TGMalromur']">Candied Ginger</p>
                      <p className="text-auto font-light font-['TGMalromur']">Marzipan</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-6">
                    <span className="italic">Wines</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="text-center space-y-2">
                      <p className="text-auto font-semibold font-['TGMalromur'] uppercase mb-3">White</p>
                      <p className="text-auto font-light font-['TGMalromur']">Chablis Premier Cru</p>
                      <p className="text-auto font-light font-['TGMalromur'] italic">Burgundy</p>
                      <p className="text-auto font-light font-['TGMalromur']">Pouilly-Fumé</p>
                      <p className="text-auto font-light font-['TGMalromur']">Muscadet</p>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-auto font-semibold font-['TGMalromur'] uppercase mb-3">Sweet</p>
                      <p className="text-auto font-light font-['TGMalromur']">Sauternes Select</p>
                      <p className="text-auto font-light font-['TGMalromur'] italic">Tokaji</p>
                      <p className="text-auto font-light font-['TGMalromur']">Riesling</p>
                      <p className="text-auto font-light font-['TGMalromur']">Ice Wine</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-auto text-base font-semibold font-['TGMalromur'] text-center mb-6">
                    Coffee & Tea.
                  </h3>
                  <div className="space-y-2 text-center">
                    <p className="text-auto text-sm font-light font-['TGMalromur']">French Roast Coffee</p>
                    <p className="text-auto text-sm font-light font-['TGMalromur'] italic">Green Tea</p>
                    <p className="text-auto text-sm font-light font-['TGMalromur']">Black Tea</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-auto text-xs font-normal font-['TGMalromur'] italic">
                  Please inform staff of any dietary restrictions or allergies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
