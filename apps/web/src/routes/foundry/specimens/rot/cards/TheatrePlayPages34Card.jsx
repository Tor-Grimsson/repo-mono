export default function TheatrePlayPages34Card({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        {/* Page 3: Act II & III */}
        <div className="col-start-2 col-span-5 space-y-12">
            <div>
              <h2 className="text-auto font-['TGRoot'] text-3xl font-bold mb-4" style={{ fontWeight: 700 }}>
                Acte II : Le Miroir
              </h2>
              <div className="space-y-4 text-auto text-sm font-['TGRoot'] leading-relaxed">
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
              <h2 className="text-auto font-['TGRoot'] text-3xl font-bold mb-4" style={{ fontWeight: 700 }}>
                Acte III : L'Écho
              </h2>
              <div className="space-y-4 text-auto text-sm font-['TGRoot'] leading-relaxed">
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
          <div className="col-span-5 space-y-8">
            <div>
              <h2 className="text-auto font-['TGRoot'] text-3xl font-bold mb-4" style={{ fontWeight: 700 }}>
                Acte IV : La Sortie
              </h2>
              <p className="text-auto text-xs font-['TGRoot'] italic opacity-60 mb-6">
                La scène est vide. La tour a disparu. Ou plutôt, tout est devenu la tour.
              </p>
            </div>

            <div className="space-y-4 text-auto text-sm font-['TGRoot'] leading-relaxed">
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

            <div className="pt-12 border-t border-auto/20 text-center">
              <p className="text-auto text-xs font-['TGRoot'] opacity-50">
                Première: Théâtre de la Cité Internationale, Paris<br />
                Direction: Marie Dubois
              </p>
            </div>
          </div>
      </div>
    </section>
  )
}
