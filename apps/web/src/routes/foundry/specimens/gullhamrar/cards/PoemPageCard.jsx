import { Divider } from '@kol/ui'

export default function PoemPage1Card({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen  flex flex-col justify-center" style={{ paddingLeft: '180px', paddingRight: '180px' }}>

      <div className="grid w-full items-start" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>
        {/* Poem 1 */}
        <div className="col-start-2 col-span-5 -ml-[24px]">
          <div className="flex flex-row gap-6">
            {/* Vertical divider */}
            <Divider variant="vertical" opacity='24'/>

            {/* Text content */}
            <div className="space-y-8 text-auto text-[28px] font-['TGGullhamrar']" style={{ fontWeight: 300 }}>
              <p className="text-justify" style={{ lineHeight: '34px' }}>
                Að haka er að grafa sig djúpt og eyða kraftinum í að vinna bug
              </p>
              <p style={{ lineHeight: '34px' }}>
                á einni skakkaðri hugmynd sem<br />
                birtist af handahófi, eins og þegar manni<br />
                dettur sálarfrændi í hug á miðri göngu
              </p>
              <p className="text-justify" style={{ lineHeight: '34px' }}>
                og menn verða einfaldlega að elta þá hugmynd <br />
                þar til manneskjan er komin í skelliferð einmana og þreyttur
              </p>

              <p style={{lineHeight: '34px' }}>
                eins og hundrað í hundrað, þarna á gólfinu
              </p>
               <p style={{ lineHeight: '34px' }}>
                Var þetta gagnlegt?
              </p>
            </div>
          </div>
        </div>

        {/* Poem 2 */}
        <div className="col-start-8 col-span-4 -ml-[24px]">
          <div className="flex flex-row gap-6">
            {/* Vertical divider */}
            <Divider variant="vertical" opacity='24'/>

            {/* Text content */}
            <div className="space-y-8 text-auto text-[28px] font-['TGGullhamrar']" style={{ fontWeight: 300 }}>
              <p style={{ lineHeight: '34px' }}>
                Var þetta eitthvað sem hjálpaði einhverjum<br /> eða bjargaði einhverju?
              </p>
              <p className="text-justify" style={{ lineHeight: '34px' }}>
                Svaraði einhverri spuringu, eða reisti eitthvað nýtt?
              </p>
              <p style={{ lineHeight: '34px' }}>
                Sjaldan, mjög sjaldan í rauninni
              </p>
              <p className="text-justify" style={{ lineHeight: '34px' }}>
                það sem er að — er gagnlegt?<br /> brýtur upp þessa þanka
              </p>
              <p style={{ lineHeight: '34px' }}>
                eitthvað sem<br />
                er beint í verkin
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
