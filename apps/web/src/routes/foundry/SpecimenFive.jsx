export default function SpecimenFive() {
  return (
    <div className="w-[1680px] h-[3400px] relative bg-white mx-auto pb-20">
      {/* Main Title Section */}
      <div className="w-[1158.01px] left-[224px] top-[28px] absolute inline-flex flex-col justify-start items-start gap-10">
        <div className="w-[1048.55px] h-72 justify-center">
          <span className="text-black text-8xl font-bold font-['Playfair'] leading-[93.33px]">Yes, you could typeset<br/>legislation in the<br/></span>
          <span className="text-black text-8xl font-bold font-['Playfair'] leading-[93.33px]">Playfair 2·0</span>
          <span className="text-black text-8xl font-bold font-['Playfair'] leading-[93.33px]"> typeface family</span>
        </div>
        <div className="self-stretch h-28 justify-center text-black text-4xl font-normal font-['Playfair'] leading-9">
          You are looking at one. This document demonstrates how Playfair 2·0 can be<br/>
          employed to typeset formal government legislation. In this demonstration, an excerpt<br/>
          from Faroese legislation on company registration and public disclosure.
        </div>
      </div>

      {/* Main Heading */}
      <div className="w-[1232.35px] left-[224px] top-[520px] absolute space-y-6">
        <h1 className="text-black text-5xl font-bold font-['Playfair'] leading-[56px]">
          Kunngerd um skráseiting og almannakunnering av upplýsingum<br/>
          um eigarar í vinnufyritøkum í kt-skipan Skráseiting Føroya
        </h1>

        <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
          Nr. 145 frá 15. desember 2020
        </p>
      </div>

      {/* Kapittel I */}
      <div className="w-[1232.35px] left-[224px] top-[780px] absolute space-y-[24.63px]">
        <h2 className="text-black text-3xl font-bold font-['Playfair'] leading-9">
          Kapittel I. Formál og virkanømi
        </h2>

        <div className="space-y-[24.63px]">
          <div>
            <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 1</h3>
            <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
              Hendan kunngerd setur reglur um skráseiting og almannakunnering av upplýsingum um eigarar í vinnufyritøkum,
              ið eru skráðar í kt-skipanina hjá Skráseting Føroya. Endamálið við kunngerdini er at tryggja transparens
              um eignaraskipanina í føroyskum vinnufyritøkum og at fyribyrgja, at skipanin verður nýtt til peningaútvátt
              og til at fíggja vælvavirknni.
            </p>
          </div>

          <div>
            <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 2</h3>
            <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
              Kunngerdini fevnir um øll vinnufyritøk, ið eru skráðar í kt-skipanina hjá Skráseting Føroya, umframt
              vinnufyritøk, ið eru staðsett uttanlands, men sum lúta føroyskari lóggjáving.
            </p>
          </div>
        </div>
      </div>

      {/* Kapittel II - Two Column Layout */}
      <div className="w-[1232.35px] left-[224px] top-[1240px] absolute">
        <h2 className="text-black text-3xl font-bold font-['Playfair'] leading-9 mb-6">
          Kapittel II. Ábyrgd hjá vinnufyritøkum
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-[24.63px]">
            <div>
              <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 3</h3>
              <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
                Vinnufyritøkið skal skráðsetið og dagføra upplýsingar um, hvør rættur eigari er. Upplýsingarnar skulu
                fevna um fullt navn, bústað, kt-nummar og land, har rættur eigari er búsitandi. Harafturat skal tað
                koma fram, hvussu og í hvønn mun rættur eigari hevur rættindi ella ávirkan.
              </p>
            </div>

            <div>
              <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 4</h3>
              <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
                Skráseting av upplýsingum um rættan eigara skal gerast innan 14 dagar, aftaná at vinnufyritøkið varð
                stovnað ella aftaná at broytingar eru gjørdar, ið ger seg galdandi fyri hvør rættur eigari er.
              </p>
            </div>
          </div>

          <div className="space-y-[24.63px]">
            <div>
              <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 5</h3>
              <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
                Vinnufyritøkið skal tryggja, at upplýsingarnar, sum verða skrásettar, eru rættar og dagførdar.
                Vinnufyritøkið skal hava skrásettar reglur og viðurskiftir, sum tryggja, at upplýsingarnar um rættan
                eigara verða dagførdar løpandi.
              </p>
            </div>

            <div>
              <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 6</h3>
              <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
                Rættur eigari skal lata vinnufyritøkinum í veita allar upplýsingar, sum eru neyðugar fyri at uppfylla
                skylduheitini í hesi kunngerd.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kapittel V */}
      <div className="w-[1232.35px] left-[224px] top-[1920px] absolute space-y-[24.63px]">
        <h2 className="text-black text-3xl font-bold font-['Playfair'] leading-9">
          Kapittel V. Almannakunnering
        </h2>

        <div>
          <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 12</h3>
          <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
            Skráseting Føroya skal gera upplýsingarnar um rættan eigara almanna tøkar í talgildari mynd. Upplýsingarnar
            skulu vera lættkoyrdar og kunna finnast við einfaldum leitiviðurskiftum. Tøkan til upplýsingarnar skal vera
            ókeypis fyri almenningin.
          </p>
        </div>

        <div>
          <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 13</h3>
          <p className="text-black text-xl font-normal font-['Playfair'] leading-6 pl-[37.33px]">
            Tá ið serligar umstøður tala fyri tað, kann Skráseting Føroya avmarka ella seta sker fyri almennu tøkuna
            til upplýsingar um rættan eigara. Hesin kann bert gerast, um rættur eigari hevur verið útsettur fyri
            háskavágnum, skeytbroti, ávíkan ella samsvarandi óheitagongdum, ella um orsøkir eru fyri at halda, at
            rættur eigari verður útsettur fyri slíkum.
          </p>
        </div>
      </div>

      {/* Kapittel VI */}
      <div className="w-[1232.35px] left-[224px] top-[2380px] absolute space-y-[24.63px]">
        <h2 className="text-black text-3xl font-bold font-['Playfair'] leading-9">
          Kapittel VI. Dagføring og goymsla
        </h2>

        <div>
          <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 14</h3>
          <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
            Skráseting Føroya skal tryggja, at upplýsingarnar um rættan eigara verða dagførdar og goymdar í
            skrásetingarskipanini. Dagføring skal gerast, tá ið vinnufyritøkið meldir frá broytingum, ella tá ið
            Skráseting Føroya annars verður vár við broytingar.
          </p>
        </div>

        <div>
          <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 15</h3>
          <p className="text-black text-xl font-normal font-['Playfair'] leading-6 pl-[37.33px]">
            Upplýsingar um rættan eigara skulu goymast í skrásetingarskipanini í minst 5 ár, aftaná at
            vinnufyritøkið er strikað úr kt-skipanini ella aftaná at persónurin ikki longur er rættur eigari.
          </p>
        </div>
      </div>

      {/* Kapittel VII */}
      <div className="w-[1232.35px] left-[224px] top-[2760px] absolute space-y-[24.63px]">
        <h2 className="text-black text-3xl font-bold font-['Playfair'] leading-9">
          Kapittel VII. Íkast í gildi
        </h2>

        <div>
          <h3 className="text-black text-2xl font-bold font-['Playfair'] leading-7 mb-3">§ 16</h3>
          <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
            Hendan kunngerd træðar í gildi 1. januar 2021.
          </p>
        </div>
      </div>

      {/* Signatures */}
      <div className="w-[1232.35px] left-[224px] top-[3000px] absolute">
        <div className="border-t border-black pt-8 space-y-6">
          <p className="text-black text-xl font-normal font-['Playfair'] leading-6 text-right">
            Tórshavn, 15. desember 2020
          </p>

          <div className="flex justify-between items-end pt-12">
            <div className="text-center">
              <div className="border-t border-black w-64 mb-2"></div>
              <p className="text-black text-lg font-normal font-['Playfair'] leading-6">
                Bárður á Steig Nielsen
              </p>
              <p className="text-black text-base font-normal font-['Playfair'] leading-5 italic">
                Landsstýrismaður
              </p>
            </div>

            <div className="text-center">
              <div className="border-t border-black w-64 mb-2"></div>
              <p className="text-black text-lg font-normal font-['Playfair'] leading-6">
                Heini Skorini
              </p>
              <p className="text-black text-base font-normal font-['Playfair'] leading-5 italic">
                Ráðgevi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
