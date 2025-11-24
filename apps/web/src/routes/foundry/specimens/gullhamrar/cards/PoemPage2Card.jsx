import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

export default function PoemPage2Card({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen bg-surface-inverse flex flex-col justify-between" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <CardHeader columns={columns} gutter={gutter} />

      <div className="grid w-full flex-1 items-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
        <div className="col-span-12 space-y-12 text-auto-inverse font-['TGGullhamrar']">
          <p className="text-[clamp(36px,4.5vw,64px)] leading-tight" style={{ fontWeight: 400 }}>
            og situr þar.<br />
            Var þetta gagnlegt?
          </p>
          <p className="text-[clamp(28px,3.5vw,48px)] leading-tight text-justify" style={{ fontWeight: 300 }}>
            Var þetta eitthvað sem hjálpaði einhverjum eða bjargaði einhverju? Svaraði einhverri spuringu, eða reisti eitthvað nýtt?
          </p>
          <p className="text-[clamp(32px,4vw,56px)] leading-tight" style={{ fontWeight: 400 }}>
            Sjaldan, mjög<br />
            sjaldan í rauninni
          </p>
          <p className="text-[clamp(24px,3vw,40px)] leading-tight text-justify" style={{ fontWeight: 300 }}>
            það sem að er gagnlegt er yfirleitt eitthvað sem að brýtur upp þessa hakann
          </p>
          <p className="text-[clamp(40px,5vw,72px)] leading-tight" style={{ fontWeight: 400 }}>
            ekki eitthvað sem að<br />
            er beint í verkin
          </p>
        </div>
      </div>

      <CardFooter columns={columns} gutter={gutter} />
    </section>
  )
}
