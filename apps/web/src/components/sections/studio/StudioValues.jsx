import { SectionLabel } from '@kol/ui'

const StudioValues = () => {
  const values = [
    {
      number: '01',
      title: 'Quality over quantity',
      description: 'We work with a limited number of clients to ensure every project receives the attention and craft it deserves.'
    },
    {
      number: '02',
      title: 'Collaboration as craft',
      description: 'The best work emerges from dialogue. We see our clients as partners in the creative process, not just recipients of deliverables.'
    },
    {
      number: '03',
      title: 'Process transparency',
      description: 'No black boxes. We share our thinking, involve you in key decisions, and maintain clear communication throughout.'
    },
    {
      number: '04',
      title: 'Continuous learning',
      description: 'Design evolves. We stay curious, experiment with new tools and techniques, and bring fresh thinking to every project.'
    }
  ]

  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto py-16">
        <div className="w-full">
          <SectionLabel text="Our Values" size="lg" />
          <p className="kol-mono-sm text-auto opacity-60 mt-3 max-w-[40%]">
            Principles that guide how we work and collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-16">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col gap-3">
              <span className="kol-mono-sm uppercase text-auto opacity-40">
                {value.number}
              </span>
              <h3 className="kol-heading-lg mb-2">{value.title}</h3>
              <p className="kol-mono-text text-auto opacity-80">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StudioValues
