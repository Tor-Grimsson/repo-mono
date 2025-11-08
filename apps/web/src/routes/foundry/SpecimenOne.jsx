export default function SpecimenOne() {
  return (
    <div className="w-full h-[2400px] relative bg-orange-100">
      {/* 12-column grid */}
      <div className="w-full h-full absolute left-0 top-0">
        <div className="w-full h-full absolute inline-flex justify-start items-start">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex-1 self-stretch outline outline-2 outline-offset-[-1px] outline-black/10" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative px-10 py-10">
        {/* Year - Top Left */}
        <div className="w-64 absolute left-[40px] top-[40px] text-gray-900 text-3xl font-normal font-['TG_Gullhamrar'] leading-8">
          2025
        </div>

        {/* Side Text - Left Column */}
        <div className="w-64 absolute left-[40px] top-[759px] text-gray-900 text-base font-normal font-['TG_Gullhamrar'] leading-5">
          Ég erfði leiðara erfiðra heil-helja varaafla skalf taflkafla kappla keppniskapplag, rófa í lófa, léttur í dundi, sápa í spóa og lófi í lundi, klappaði Tófu og Tóta heimskum hundi, lérhefti sviðna viðna, brostnir draumar, finnur kiðna liðna, svikinna vina minna.<br/>
          Ég erfði erfiða afleiðara, varaafla kapla afruglara, lérhefti sviðna viðna; sú er mín iðja.
        </div>

        {/* Technical Info - Bottom Left */}
        <div className="absolute left-[40px] top-[2087px] text-gray-900 text-lg font-normal font-['TG_Gullhamrar'] leading-5">
          Handeo<br/>
          Djaneelio handemounious<br/>
          durungero forneldrich<br/>
          tchingertio flannelism<br/>
          schwlagrech<br/>
          tchingertio
        </div>
        <div className="absolute left-[161px] top-[2087px] text-gray-900 text-lg font-normal font-['TG_Gullhamrar'] leading-5 tracking-tight">
          [ 2-0. 25 ]<br/>
          [ 44. 48 ]<br/>
          [ 20.19.1 ]<br/>
          [ 1. 99-2 ]<br/>
          [ 99.0.7 ]<br/>
          [ 2.029 ]
        </div>

        {/* Main Heading */}
        <div className="w-[1072px] absolute left-[336px] top-[40px] text-gray-900 text-3xl font-normal font-['TG_Gullhamrar'] leading-8">
          TG RÓT
        </div>

        {/* Hero Heading */}
        <div className="w-[1048px] absolute left-[336px] top-[151px] text-gray-900 text-8xl font-normal font-['TG_Gullhamrar'] leading-[104px]">
          Skoðun um enga sérstaka skoðun:
        </div>

        {/* Subheading */}
        <div className="absolute left-[336px] top-[375px] text-gray-900 text-6xl font-normal font-['TG_Gullhamrar'] leading-[64px]">
          Ekkert spes look, samt hress!
        </div>

        {/* Body Text - Left Column */}
        <div className="w-[516px] absolute left-[336px] top-[479px] text-gray-900 text-3xl font-normal font-['TG_Gullhamrar'] leading-8">
          Áfallaáverkar athygli mína fangar víðfarnir áfangastígar – afskræmingar fínar, bregður undir þig þínum betri fætinum vopnaður gimmsteinum og gillineti, sannfærðu neðan-heima, klófestir út í geim að hún sé hvorki þaðan eða héðan í orðum laymans er kleinan leyst upp í leiði manns – manns að norð-austan<br/>
          Einn í ginnungargapi, mannapi dynkur, vá en flynkur! loginn snúinn út úr sínu valdi, náttmyrkur og alkaldi – styrkur rís úr eyðimerkursandi, alsjáandi.
        </div>

        {/* Body Text - Right Column */}
        <div className="w-[516px] absolute left-[892px] top-[479px] text-gray-900 text-3xl font-normal font-['TG_Gullhamrar'] leading-8">
          "Fýrum upp í hellunni og horfum á draslið brenna í skemmunni" Syngdu hærra, dansaðu fastar, miklu neðar og miklu hraðar,<br/>
          Kinnhestum sleginn, manneldismegin, heldreginn, óþveginn – og í þokkabót röngum megin.
        </div>

        {/* Pull Quote */}
        <div className="w-[516px] absolute left-[892px] top-[751px] text-gray-900 text-5xl font-normal font-['TG_Gullhamrar'] leading-[56px]">
          Fýrum upp í hellunni og horfum á draslið brenna í skemmunni.
        </div>

        {/* Right Sidebar Text - Top */}
        <div className="w-48 absolute left-[1448px] top-[40px] text-justify text-gray-900 text-base font-normal font-['TG_Gullhamrar'] leading-5">
          Vitiði ekki um manninn sem dreymir um gula sportbílinn á eftirlaunaárum?
        </div>

        {/* Page Number */}
        <div className="w-48 absolute left-[1448px] top-[2275px] text-right text-gray-900 text-3xl font-normal font-['TG_Gullhamrar'] leading-8">
          34
        </div>
      </div>
    </div>
  )
}
