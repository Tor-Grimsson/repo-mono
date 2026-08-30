import { SectionCta } from '@kolkrabbi/kol-component'

const SectionCtaWrapper = ({ background }) => {
  return (
    <SectionCta
      className="reveal"
      background={background}
      eyebrow="/ CONNECT"
      promptLabel="WORKING ON A PROJECT?"
      heading="SEND A MESSAGE"
      contactLabel="CONTACT"
      email="hello@kolkrabbi.io"
    />
  )
}

export default SectionCtaWrapper
