import { Divider } from '@kol/ui'

// Article number with pilcrow (¶ 1. gr.)
const ArticleNumber = ({ number, isFirst = false }) => (
  <div className={`flex gap-8 mb-6 ${!isFirst ? 'mt-6' : ''}`}>
    <div className="w-8 flex-shrink-0 text-right">
      <p className="text-auto text-[20px] font-semibold font-['TGMalromur'] leading-[28px]">
        ¶
      </p>
    </div>
    <p className="text-auto text-[20px] font-semibold font-['TGMalromur'] leading-[28px]">
      {number}. gr.
    </p>
  </div>
)

// Paragraph with section symbol (§ 1)
const Paragraph = ({ section, children, hasFootnote, footnote, noIndent = false }) => {
  const isFirstParagraph = section === 1 || noIndent
  return (
    <div className="flex gap-8 mb-0">
      <div className="w-8 flex-shrink-0 text-right">
        <p className="text-auto text-[18px] font-semibold font-['TGMalromur'] leading-[28px]">
          § {section}
        </p>
      </div>
      {hasFootnote ? (
        <div>
          <p className={`text-auto text-[18px] font-normal font-['TGMalromur'] leading-[28px] ${!isFirstParagraph ? 'indent-8' : ''}`}>
            {children}
          </p>
          <p className="text-fg-48 mt-1 mb-4 text-xs font-normal font-['TGMalromur'] leading-5 italic">
            {footnote}
          </p>
        </div>
      ) : (
        <p className={`text-auto text-[18px] font-normal font-['TGMalromur'] leading-[28px] ${!isFirstParagraph ? 'indent-8' : ''}`}>
          {children}
        </p>
      )}
    </div>
  )
}

export default function SpecimenFive() {
  return (
    <div className="w-full min-h-screen relative">
      {/* DOCUMENT HEADER */}
      <section className="w-full min-h-screen py-24 snap-start">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
            <div className="col-span-6 col-start-4 mb-12 text-center pb-8">
            <Divider opacity="24" className="mb-8" />
            <h2 className="text-auto text-[48px] font-medium font-['TGMalromur'] leading-[56px] mb-6">
              Lög um Stjórnarráð Íslands
            </h2>
            <p className="text-auto text-[20px] font-normal font-['TGMalromur'] leading-[28px] tracking-wide">
              2011 nr. 115 23. september
            </p>
            <Divider opacity="24" className="mt-8" />
          </div>

            {/* Amendments section */}
            <div className="col-span-6 col-start-4 mb-16">
              <p className="text-fg-48 text-xs font-normal font-['TGMalromur'] leading-5 text-justify">
                Tóku gildi 28. september 2011. Breytt með: L. 173/2011 (tóku gildi 30. des. 2011). L. 115/2012 (tóku gildi 2. nóv. 2012). L. 82/2015 (tóku gildi 23. júlí 2015 nema síðari málsliður 1. gr. sem tók gildi 1. sept. 2015). L. 130/2016 (tóku gildi 1. júlí 2017). L. 79/2019 (tóku gildi 6. júlí 2019; komu til framkvæmda skv. fyrirmælum í brbákv., sbr. einnig l. 25/2020, 20. gr.). L. 137/2022 (tóku gildi 1. apríl 2023). L. 52/2023 (tóku gildi 28. júní 2023). L. 60/2024 (tóku gildi 28. júní 2024).
              </p>
            </div>

            {/* I. kafli */}
            <div className="col-span-12 mb-24">
              <div className="col-span-12 mb-16">
                <h3 className="text-auto text-[32px] font-medium font-['TGMalromur'] leading-[40px] mb-2 text-center">
                  I. kafli
                </h3>
                <h4 className="text-auto text-[20px] font-medium font-['TGMalromur'] leading-[28px] mb-8 text-center tracking-wide">
                  UM STJÓRNARRÁÐ ÍSLANDS
                </h4>
              </div>

              <div className="col-span-12 -ml-16 grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
                <div className="col-span-4 col-start-3">
                  <ArticleNumber number={1} isFirst />
                  <Paragraph section={1}>
                    Ráðherrar í ríkisstjórn Íslands og ráðuneyti þeirra mynda Stjórnarráð Íslands. Ráðherrar fara með og bera ábyrgð á stjórnarframkvæmdum öllum, hver á sínu málefnasviði. Sá ráðherra sem forseti Íslands hefur skipað til forsætis í ríkisstjórn Íslands nefnist forsætisráðherra.
                  </Paragraph>
                  <Paragraph section={2}>
                    Ráðherrar starfa í umboði Alþingis. Forsætisráðherra er skylt að biðjast lausnar fyrir sig og ráðuneyti sitt ef tillaga um vantraust á ríkisstjórn er samþykkt á Alþingi. Samþykki Alþingi tillögu um vantraust á einstakan ráðherra í ríkisstjórn er forsætisráðherra skylt að gera tillögu til forseta um að viðkomandi ráðherra verði leystur frá embætti.
                  </Paragraph>
                </div>

                <div className="col-span-4 col-start-7">
                  <ArticleNumber number={2} isFirst />
                  <Paragraph section={1}>
                    Stjórnarráð Íslands skiptist í ráðuneyti. Ráðuneyti eru skrifstofur ráðherra og æðstu stjórnvöld framkvæmdarvaldsins hvert á sínu málefnasviði. Ákveða skal fjölda ráðuneyta og heiti þeirra með forsetaúrskurði, sbr. 15. gr. stjórnarskrárinnar, samkvæmt tillögu forsætisráðherra.
                  </Paragraph>
                  <Paragraph section={2}>
                    Tillagan skal lögð fyrir Alþingi í formi þingsályktunartillögu sem komi þegar til umræðu og afgreiðslu áður en forsetaúrskurður er gefinn út. Stjórnarráð Íslands hefur aðsetur í Reykjavík.
                  </Paragraph>
                  <Paragraph section={3} hasFootnote footnote={<><sup>1</sup> L. 82 / 2015, 1. gr.</>}>
                    Ráðherra kveður á um aðsetur stofnunar sem undir hann heyrir, nema á annan veg sé mælt í lögum. Áður en ákvörðun um flutning á aðsetri stofnunar er tekin skal ráðherra gefa Alþingi skýrslu um fyrirhugaðan flutning.<sup>1</sup>
                  </Paragraph>
                </div>
              </div>
            </div>

            {/* II. kafli */}
            <div className="col-span-12 mb-24">
              <div className="col-span-12 mb-16">
                <h3 className="text-auto text-[32px] font-medium font-['TGMalromur'] leading-[40px] mb-2 text-center">
                  II. kafli
                </h3>
                <h4 className="text-auto text-[20px] font-medium font-['TGMalromur'] leading-[28px] text-center tracking-wide">
                  UM SKIPAN OG LAUN RÁÐHERRA OG VERKASKIPTINGU MILLI ÞEIRRA<sup>1</sup>
                </h4>
                <p className="text-fg-48 mt-2 mb-8 text-xs font-normal font-['TGMalromur'] leading-5 italic text-center">
                  <sup>1</sup> L. 79 / 2019, 6. gr.
                </p>
              </div>

              <div className="col-span-12 -ml-16 grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
                <div className="col-span-4 col-start-2">
                  <ArticleNumber number={3} isFirst />
                  <Paragraph section={1} hasFootnote footnote={<><sup>1</sup> L. 79 / 2019, 5. gr., sbr. einnig brbákv. í s.l.</>}>
                    Forseti Íslands skipar forsætisráðherra. Forseti Íslands skipar aðra ráðherra samkvæmt tillögu forsætisráðherra. Forseti Íslands veitir forsætisráðherra og ráðuneyti hans sem og einstökum ráðherrum lausn frá embætti samkvæmt tillögu forsætisráðherra.<sup>1</sup>
                  </Paragraph>
                </div>

                <div className="col-span-4 col-start-6">
                  <ArticleNumber number={4} isFirst />
                  <Paragraph section={1}>
                    Stjórnarmálefni ber undir ráðuneyti eftir ákvæðum forsetaúrskurðar, sem kveðinn er upp samkvæmt tillögu forsætisráðherra.
                  </Paragraph>
                  <Paragraph section={2}>
                    Við skiptingu stjórnarmálefna á milli ráðuneyta skal þess jafnan gætt að eðlislík stjórnarmálefni heyri undir sama ráðuneyti.
                  </Paragraph>
                </div>

                <div className="col-span-4 col-start-10">
                  <ArticleNumber number={5} isFirst />
                  <Paragraph section={1}>
                    Nú er stjórnarmálefni flutt milli ráðuneyta og skal þá ljúka meðferð ólokinna stjórnsýslumála í því ráðuneyti sem við málefni tekur.
                  </Paragraph>
                  <Paragraph section={2}>
                    Komi upp vafi eða ágreiningur um það undir hvaða ráðuneyti stjórnarmálefni heyrir sker forsætisráðherra úr.
                  </Paragraph>
                </div>
              </div>
            </div>

            {/* III. kafli */}
            <div className="col-span-12 mb-24">
              <div className="col-span-12 mb-16">
                <h3 className="text-auto text-[32px] font-medium font-['TGMalromur'] leading-[40px] mb-2 text-center">
                  III. kafli
                </h3>
                <h4 className="text-auto text-[20px] font-medium font-['TGMalromur'] leading-[28px] mb-8 text-center tracking-wide">
                  UM RÍKISSTJÓRN OG SAMHÆFINGU STARFA Á MILLI RÁÐHERRA
                </h4>
              </div>

              <div className="col-span-12 -ml-16 grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
                <div className="col-span-4 col-start-2">
                  <ArticleNumber number={6} isFirst />
                  <Paragraph section={1}>
                    Ríkisstjórnarfundi skal halda um eftirfarandi mál:
                  </Paragraph>
                  <Paragraph section={2}>
                    <span className="italic"></span> Nýmæli í lögum,<sup>1</sup> þ.e. lagafrumvörp sem ráðherrar hyggjast leggja fram á Alþingi sem stjórnarfrumvörp, og önnur málefni sem bera á upp fyrir forseta Íslands til staðfestingar, þ.m.t. tillögur til þingsályktana.
                  </Paragraph>
                  <Paragraph section={3} hasFootnote footnote={<><sup>1</sup> L. 82 / 2015, 2. gr. <sup>2</sup> L. 115 / 2012, 1. gr.</>}>
                    Öllum málum sem ráðherrar bera upp í ríkisstjórn skal fylgja sérstakt minnisblað ráðherra til ríkisstjórnar þar sem meginatriði máls eru rakin og helstu sjónarmið sem að baki liggja. Ef óskað er eftir samþykki ríkisstjórnar skal setja þar fram skýrt orðaða tillögu. Forsætisráðherra stýrir ríkisstjórnarfundum.<sup>2</sup>
                  </Paragraph>
                </div>

                <div className="col-span-4 col-start-6">
                  <ArticleNumber number={7} isFirst />
                  <Paragraph section={1}>
                    Forsætisráðherra felur starfsmanni forsætisráðuneytisins<sup>1</sup> að gegna störfum ritara ríkisstjórnar.
                  </Paragraph>
                  <Paragraph section={2} hasFootnote footnote={<>1) L. 115 / 2012, 2. gr. 2) Rgl. 791 / 2018.</>}>
                    Fundargerðir skulu staðfestar af forsætisráðherra og dreift til annarra ráðherra þegar staðfesting liggur fyrir.<sup>2 )</sup> Komi fram athugasemd við fundargerð frá ráðherra skal hún skráð í fundargerð næsta fundar.
                  </Paragraph>
                  <Paragraph section={3}>
                    Um störf ríkisstjórnar fer að öðru leyti eftir starfsreglum <sup>2 )</sup> sem ríkisstjórnin setur sér.
                  </Paragraph>
                </div>

                <div className="col-span-4 col-start-10">
                  <ArticleNumber number={8} isFirst />
                  <Paragraph section={1}>
                    Forsætisráðherra ber að gæta þess að verkaskipting á milli ráðherra sé eins skýr og kostur er. Ráðherrar skulu leitast við að samhæfa stefnu og aðgerðir ráðuneyta þegar málefni og málefnasvið skarast. Forsætisráðherra skal beita sér fyrir því að stefna og aðgerðir ráðherra á einstökum sviðum séu samhæfðar ef á þarf að halda.
                  </Paragraph>
                  <Paragraph section={2} hasFootnote footnote={<>1) Rgl. 166 / 2013.</>}>
                    Forsætisráðherra setur reglur <sup>1 )</sup> um störf ráðherranefnda að höfðu samráði við ríkisstjórn.
                  </Paragraph>
                </div>
              </div>
            </div>

            {/* IV. kafli */}
            <div className="col-span-12 mb-24">
              <div className="col-span-12 mb-16">
                <h3 className="text-auto text-[32px] font-medium font-['TGMalromur'] leading-[40px] mb-2 text-center">
                  IV. kafli
                </h3>
                <h4 className="text-auto text-[20px] font-medium font-['TGMalromur'] leading-[28px] mb-8 text-center tracking-wide">
                  UM STJÓRNUNAR- OG EFTIRLITSHEIMILDIR RÁÐHERRA
                </h4>
              </div>

              <div className="col-span-12 -ml-16 grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
                <div className="col-span-5 col-start-3">
                  <ArticleNumber number={12} isFirst />
                  <Paragraph section={1} hasFootnote footnote={<>1) L. 82 / 2015, 5. gr.</>}>
                    Ráðherra fer með yfirstjórn stjórnvalda sem hafa á hendi framkvæmd stjórnarmálefna er undir [hann] <sup>1 )</sup> heyra, enda leiði ekki af lögum að stjórnvald skuli vera sjálfstætt gagnvart ráðherra.
                  </Paragraph>
                  <Paragraph section={2} noIndent>
                    Í yfirstjórn skv. 1. mgr. felst m.a. að ráðherra getur gefið stjórnvaldi almenn og sérstök fyrirmæli um starfrækslu á verkefnum þess, fjárreiður og meðferð eigna, sbr. þó 3. mgr. 13. gr., enda mæli lög eða eðli máls því ekki í mót.
                  </Paragraph>
                  <Paragraph section={3}>
                    Ráðherra er heimilt að láta í té óbindandi álit sem þýðingu geta haft til leiðbeiningar fyrir stjórnarframkvæmd á málefnasviði hans, enda leiði ekki af lögum eða eðli máls að honum sé það óheimilt.
                  </Paragraph>

                  <ArticleNumber number={13} />
                  <Paragraph section={1}>
                    Ráðherra skal hafa eftirlit með starfrækslu, fjárreiðum og eignum á vegum stjórnvalda sem heyra undir almennar stjórnunarheimildir hans.
                  </Paragraph>
                  <Paragraph section={2}>
                    Ráðherra skal enn fremur hafa almennt eftirlit með starfrækslu, fjárreiðum og eignum þeirra sjálfstæðu stjórnvalda sem heyra stjórnarfarslega undir hann. Eftirlit með sjálfstæðum stjórnvöldum tekur ekki til málsmeðferðar eða ákvarðana í einstökum málum.
                  </Paragraph>
                </div>

                <div className="col-span-5 col-start-8">
                  <Paragraph section={3} noIndent>
                    Hafi eign á vegum stjórnvalds verið lögð undir annan ráðherra, sbr. 4. gr., en þann sem stjórnvald heyrir stjórnarfarslega undir fer sá ráðherra með almennt eftirlit með þeirri eign, sbr. 15. gr.
                  </Paragraph>

                  <ArticleNumber number={14} />
                  <Paragraph section={1}>
                    Ráðherra getur krafið stjórnvald, sem heyrir undir yfirstjórn hans, um hverjar þær upplýsingar og skýringar sem honum er þörf á til að sinna yfirstjórnarhlutverki sínu.
                  </Paragraph>
                  <Paragraph section={2}>
                    Ráðherra getur krafið sjálfstæð stjórnvöld, sem heyra stjórnarfarslega undir hann, um hverjar þær upplýsingar og skýringar sem þörf er á til að sinna eftirliti skv. 13. gr. og öðrum lögmæltum skyldum ráðherra.
                  </Paragraph>
                  <Paragraph section={3}>
                    Ef nauðsynlegt reynist í þessu sambandi að afhenda ráðherra upplýsingar sem almennar eða sérstakar þagnarskyldureglur taka til eru hann og ráðuneyti hans bundin þagnarskyldu með sama hætti og í þeim reglum greinir.
                  </Paragraph>

                  <ArticleNumber number={15} />
                  <Paragraph section={1}>
                    Ráðherra skal hafa almennt eftirlit með þeim eignum ríkisins, þar á meðal eign í einkaréttarlegum lögaðilum, sem til viðkomandi ráðherra hafa verið lagðar.
                  </Paragraph>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="col-span-6 col-start-3">
              <Divider opacity="12" className="mb-6" />
              <p className="text-fg-48 text-sm font-normal font-['TGMalromur'] leading-5 italic">
                Lög nr. 115/2011 · Alþingi Íslands · 2011
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
