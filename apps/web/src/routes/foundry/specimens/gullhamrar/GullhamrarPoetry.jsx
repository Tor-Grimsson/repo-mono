import GridOverlay from '../../../../components/specimens/GridOverlay'
import PoetryTitleCard from './cards/PoetryTitleCard'

export default function SpecimenOne() {
  const columns = 12
  const gutter = 24
  const marginX = 180
  const columnWidth = 86

  return (
    <div className="overflow-x-hidden">
      <GridOverlay columns={columns} gutter={gutter} marginX={marginX} columnWidth={columnWidth} initialGridMode="off">
      {/* TITLE PAGE */}
      <PoetryTitleCard />

      {/* POETRY LAYOUT */}
      <section className="w-full h-screen flex items-center" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
        <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${columns}, ${columnWidth}px)`, gap: `${gutter}px` }}>

          {/* Left Column - Spans columns 1-2 */}
          <div className="col-start-1 col-span-2 flex flex-col justify-between h-[80vh]">
            {/* Year - Top */}
            <div className="text-auto text-2xl font-normal font-['TGGullhamrar'] leading-7">
              2025
            </div>

            {/* Side Text */}
            <div className="text-auto text-xs font-light font-['TGGullhamrar'] leading-4">
              Ég erfði leiðara erfiðra heil-helja varaafla skalf taflkafla kappla keppniskapplag, rófa í lófa, léttur í dundi, sápa í spóa og lófi í lundi, klappaði Tófu og Tóta heimskum hundi, lérhefti sviðna viðna, brostnir draumar, finnur kiðna liðna, svikinna vina minna.<br/>
              Ég erfði erfiða afleiðara, varaafla kapla afruglara, lérhefti sviðna viðna; sú er mín iðja.
            </div>
          </div>

          {/* Main Content - Columns 3-10 */}
          <div className="col-start-3 col-span-8">
            {/* Main Heading */}
            <div className="text-auto text-2xl font-normal font-['TGGullhamrar'] leading-7 mb-[80px]">
              TG RÓT
            </div>

            {/* Main Content Group */}
            <div className="flex flex-col">
              {/* Hero Heading & Subheading */}
              <div className="flex flex-col mb-16">
                {/* Hero Heading */}
                <div className="text-auto text-7xl font-normal font-['TGGullhamrar'] leading-[96px] mb-4">
                  Skoðun um enga sérstaka skoðun:
                </div>

                {/* Subheading */}
                <div className="text-auto text-5xl font-normal font-['TGGullhamrar'] leading-[56px]">
                  Ekkert spes look, samt hress!
                </div>
              </div>

              {/* Two Column Body Text */}
              <div className="grid grid-cols-2 gap-6">
                {/* Body Text - Left */}
                <div className="text-auto text-2xl font-normal font-['TGGullhamrar'] leading-7">
                  Áfallaáverkar athygli mína fangar víðfarnir áfangastígar – afskræmingar fínar, bregður undir þig þínum betri fætinum vopnaður gimmsteinum og gillineti, sannfærðu neðan-heima, klófestir út í geim að hún sé hvorki þaðan eða héðan í orðum laymans er kleinan leyst upp í leiði manns – manns að norð-austan<br/>
                  Einn í ginnungargapi, mannapi dynkur, vá en flynkur! loginn snúinn út úr sínu valdi, náttmyrkur og alkaldi – styrkur rís úr eyðimerkursandi, alsjáandi.
                </div>

                {/* Body Text - Right */}
                <div className="space-y-8">
                  <div className="text-auto text-2xl font-normal font-['TGGullhamrar'] leading-7">
                    "Fýrum upp í hellunni og horfum á draslið brenna í skemmunni" Syngdu hærra, dansaðu fastar, miklu neðar og miklu hraðar,<br/>
                    Kinnhestum sleginn, manneldismegin, heldreginn, óþveginn – og í þokkabót röngum megin.
                  </div>

                  {/* Pull Quote */}
                  <div className="text-auto text-4xl font-normal font-['TGGullhamrar'] leading-[40px] mt-8">
                    Fýrum upp í hellunni og horfum á draslið brenna í skemmunni.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Columns 11-12 */}
          <div className="col-start-11 col-span-2 flex flex-col justify-between h-[80vh]">
            {/* Right Sidebar Text */}
            <div className="text-justify text-auto text-sm font-normal font-['TGGullhamrar'] leading-5">
              Vitiði ekki um manninn sem dreymir um gula sportbílinn á eftirlaunaárum?
            </div>

            {/* Technical Numbers */}
            <div className="text-left text-auto text-base font-normal font-['TGGullhamrar'] leading-5 tracking-tight">
              [ 2-0. 25 ]<br/>
              [ 44. 48 ]<br/>
              [ 20.19.1 ]<br/>
              [ 1. 99-2 ]<br/>
              [ 99.0.7 ]<br/>
              [ 2.029 ]
            </div>
          </div>

        </div>
      </section>
    </GridOverlay>
    </div>
  )
}
