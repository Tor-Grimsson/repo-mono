export default function TheatrePlayPages12Card({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen py-24 relative flex items-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
      <div className="grid w-full relative z-10" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        {/* Page 1: Title */}
        <div className="col-start-2 col-span-5 flex flex-col justify-center space-y-8">
            <div>
              <p className="text-auto text-xs font-['TGRoot'] uppercase tracking-wider mb-6 opacity-40">
                Une Pièce Absurde en Quatre Actes
              </p>
              <h1 className="text-auto font-['TGRoot'] text-7xl font-black leading-none mb-8" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
                L'ŒIL<br />
                QUI NE<br />
                DORT<br />
                JAMAIS
              </h1>
              <p className="text-auto font-['TGRoot'] text-xl font-normal opacity-60" style={{ fontWeight: 400 }}>
                The Eye That Never Sleeps
              </p>
            </div>

            <div className="space-y-3 text-auto text-sm font-['TGRoot'] opacity-70">
              <p>Après Albert Camus & Michel Foucault</p>
              <p className="text-xs">Théâtre de l'Absurde, Paris 2025</p>
            </div>
          </div>

          {/* Page 2: Act I */}
          <div className="col-span-5 space-y-8">
            <div>
              <h2 className="text-auto font-['TGRoot'] text-3xl font-bold mb-4" style={{ fontWeight: 700 }}>
                Acte I : La Tour
              </h2>
              <p className="text-auto text-xs font-['TGRoot'] italic opacity-60 mb-6">
                Une cellule circulaire. Une lumière vient du centre. On ne voit jamais la source.
              </p>
            </div>

            <div className="space-y-4 text-auto text-sm font-['TGRoot'] leading-relaxed">
              <p>
                <span className="font-bold">LE GARDIEN</span><br />
                <span className="opacity-70">Je ne regarde personne. Je regarde tout le monde. C'est la même chose, n'est-ce pas?</span>
              </p>

              <p>
                <span className="font-bold">LE PRISONNIER</span><br />
                <span className="opacity-70">Vous êtes là?</span>
              </p>

              <p>
                <span className="font-bold">LE GARDIEN</span><br />
                <span className="opacity-70">Je suis toujours là. Même quand je ne suis pas là, je suis là. C'est le principe de la tour.</span>
              </p>

              <p>
                <span className="font-bold">LE PRISONNIER</span><br />
                <span className="opacity-70">(Il se tourne vers le mur) Alors je dois être libre. Si vous me surveillez toujours, je n'existe que dans votre regard. Et un regard ne peut pas m'emprisonner.</span>
              </p>

              <p className="pt-4 italic opacity-50 text-xs">
                Le Gardien rit. Ou peut-être pas. La lumière reste constante.
              </p>
            </div>
          </div>
      </div>
    </section>
  )
}
