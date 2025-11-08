import React from 'react'
import { Pill, ButtonGroup } from '@kol/ui'

const FoundryHeroRoot = () => {
  return (
    <section className="px-8 py-48 md:py-72 flex flex-col justify-center text-center items-center overflow-hidden">
      <div className="flex flex-col items-center gap-2 max-w-[1400px]">
        <div className="pb-5 flex flex-col items-center gap-2">
          <Pill variant="subtle">Variable Font</Pill>
        </div>

        <div className="pb-16 flex flex-col items-center gap-0">
          <h1
            className="text-[64px] leading-[100%] md:text-[128px] font-semibold text-auto transition-colors duration-300"
            style={{
              fontFamily: 'TGRoot'
            }}
          >
            Rót
          </h1>

          <p
            className="text-xl font-semibold text-auto transition-colors duration-300"
            style={{
              fontFamily: 'TGRoot'
            }}
          >
            A precise geometric sans serif with variable weight and width axes
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ButtonGroup
            buttons={[
              { label: 'Download font', variant: 'primary' },
              { label: 'View Specimen', variant: 'outline' }
            ]}
            align="center"
          />

          <p className="kol-mono-xs text-auto opacity-64 pt-4 transition-colors duration-300">
            Free for personal and commercial use
          </p>
        </div>
      </div>
    </section>
  )
}

export default FoundryHeroRoot
