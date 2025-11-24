import { Divider } from '@kol/ui'

export default function SpecimenFour() {
  return (
    <div className="w-full min-h-screen relative">
      {/* SCIENTIFIC PAPER - TWO COLUMN SPREAD */}
      <section className="w-full snap-start flex items-center py-24">
        <div className="w-full" style={{ paddingLeft: '180px', paddingRight: '180px' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 86px)', gap: '24px' }}>

            {/* Paper Title and Author - 6 columns centered */}
            <div className="col-span-6 col-start-4 text-center mb-12">
              <h1 className="text-auto text-4xl font-medium font-['TGMalromur'] leading-10 mb-3">
                Experimental Test of Parity <br></br>Conservation in Beta Decay
              </h1>
              <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 mb-1">
                C. S. Wu, E. Ambler, R. W. Hayward, D. D. Hoppes, and R. P. Hudson
              </p>
              <p className="text-fg-48 text-xs font-normal font-['TGMalromur'] leading-5 italic">
                Physical Review, 1957, Vol. 105, № 4, pp. 1413–1415.
              </p>
            </div>

            {/* Left Column - 5 columns (2-6) */}
            <div className="col-span-5 col-start-2">
              {/* Abstract */}
              <div className="mb-6">
                <h2 className="text-auto text-xs font-semibold font-['TGMalromur'] leading-5 mb-3 uppercase tracking-wide">
                  Abstract
                </h2>
                <p className="text-fg-80 text-sm font-extralight font-['TGMalromur'] leading-6 text-justify italic">
                  This paper reports the experimental test of parity conservation in beta decay. The angular distribution of electrons emitted from oriented Co⁶⁰ nuclei has been measured. The asymmetry in the distribution demonstrates that parity is not conserved in weak interactions. These results provide direct experimental evidence contradicting the previously assumed invariance under space inversion in beta decay processes.
                </p>
              </div>

              {/* Introduction */}
              <div className="space-y-4 mb-6">
                <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                  The question of parity conservation in weak interactions has been one of fundamental importance in physics. Lee and Yang recently suggested that parity might not be conserved in weak interactions, proposing several experiments to test this hypothesis. Among these was the study of beta emission from oriented nuclei, which offers a particularly clear test of the conservation law.
                </p>

                <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                  If parity is conserved, the intensity of particles emitted along the nuclear spin direction should equal that emitted opposite to the spin direction. Any asymmetry in this distribution would constitute a violation of parity conservation. The choice of <span className="italic">Co⁶⁰</span> as the radioactive source was dictated by several favorable characteristics: its relatively long half-life, the high energy of emitted beta particles, and the feasibility of achieving substantial nuclear orientation at attainable temperatures.
                </p>

                <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                  The experimental arrangement required cooling the sample to temperatures near absolute zero using adiabatic demagnetization techniques. The cobalt nuclei were embedded in a cerium magnesium nitrate crystal, which served as the cooling medium and provided the magnetic field necessary for orientation. Detection apparatus was positioned to measure beta particle emission both parallel and antiparallel to the applied magnetic field direction.
                </p>
              </div>

              {/* Experimental Procedure */}
              <div className="pt-4">
                <Divider opacity="16" className="mb-4" />
                <h2 className="text-auto text-xs font-semibold font-['TGMalromur'] leading-5 mb-3 uppercase tracking-wide">
                  Experimental Procedure
                </h2>

                <div className="space-y-4">
                  <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                    The <span className="italic">Co⁶⁰</span> sample was prepared by neutron irradiation of cobalt metal and subsequently embedded in a cerium magnesium nitrate crystal. The assembly was mounted in a cryostat capable of reaching temperatures as low as 0.003 K through adiabatic demagnetization. A magnetic field of 2.3 tesla was applied to align the nuclear spins.
                  </p>

                  <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                    Temperature was monitored through observation of the gamma-ray anisotropy, which provides a reliable measure of nuclear polarization. At the lowest temperatures achieved, the degree of polarization reached approximately <span className="italic">P</span> ≈ 0.6. Beta particle detectors were positioned above and below the source to measure emission rates in directions parallel and antiparallel to the magnetic field.
                  </p>

                  <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                    Measurements were conducted over a temperature range from 0.003 K to approximately 0.1 K. At higher temperatures, thermal agitation destroys the nuclear orientation, and the asymmetry should vanish, providing an important control for systematic effects. Data collection began on December 27, 1956, with reliable operation achieved by January 1957 after refinement of technical difficulties.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - 5 columns (7-11) */}
            <div className="col-span-5">
              {/* Data Table */}
              <div className="mb-8">
                <h3 className="text-auto text-xs font-semibold font-['TGMalromur'] leading-5 mb-4 uppercase tracking-wide">
                  Asymmetry Measurements
                </h3>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-1 border-fg-24">
                      <th className="text-left py-2 px-2 text-auto text-xs font-medium font-['TGMalromur'] leading-5">Temperature</th>
                      <th className="text-center py-2 px-2 text-auto text-xs font-medium font-['TGMalromur'] leading-5">Polarization</th>
                      <th className="text-center py-2 px-2 text-auto text-xs font-medium font-['TGMalromur'] leading-5">Count Ratio</th>
                      <th className="text-center py-2 px-2 text-auto text-xs font-medium font-['TGMalromur'] leading-5">Asymmetry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-fg-12">
                      <td className="py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">0.003 K</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">0.60</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">1.22</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5 italic">−0.61</td>
                    </tr>
                    <tr className="border-b border-fg-12">
                      <td className="py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">0.010 K</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">0.52</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">1.18</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5 italic">−0.53</td>
                    </tr>
                    <tr className="border-b border-fg-12">
                      <td className="py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">0.050 K</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">0.28</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">1.08</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5 italic">−0.29</td>
                    </tr>
                    <tr className="border-b border-fg-12">
                      <td className="py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5 italic">0.100 K</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">0.08</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5">1.02</td>
                      <td className="text-center py-2 px-2 text-auto text-xs font-normal font-['TGMalromur'] leading-5 italic">−0.08</td>
                    </tr>
                  </tbody>
                </table>

                <p className="mt-3 text-fg-48 text-xs font-light font-['TGMalromur'] leading-5 italic">
                  Note: Count ratio represents antiparallel to parallel emission. Asymmetry parameter calculated from angular distribution. Magnetic field strength: 2.3 T.
                </p>
              </div>

              {/* Discussion */}
              <div className="space-y-4 mb-6">
                <h2 className="text-auto text-xs font-semibold font-['TGMalromur'] leading-5 mb-3 uppercase tracking-wide">
                  Discussion
                </h2>

                <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                  The experimental results demonstrate conclusively that beta particles are emitted preferentially in the direction opposite to the nuclear spin. At the lowest temperature achieved, where nuclear polarization reached 60 percent, the count rate for electrons emitted antiparallel to the magnetic field exceeded the parallel rate by approximately 22 percent. This asymmetry increased monotonically with the degree of polarization.
                </p>

                <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                  The temperature dependence of the effect provides strong evidence that the asymmetry arises from nuclear orientation rather than systematic instrumental effects. As the sample warmed above 0.1 K, thermal randomization of nuclear spins caused the asymmetry to vanish, as predicted. The correlation between gamma-ray anisotropy and beta asymmetry confirms that both phenomena originate from the same nuclear alignment.
                </p>

                
              </div>

              {/* Conclusion */}
              <div className="pt-4">
                <Divider opacity="16" className="mb-4" />
                <h2 className="text-auto text-xs font-semibold font-['TGMalromur'] leading-5 mb-3 uppercase tracking-wide">
                  Conclusion
                </h2>

                <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify mb-4">
                  This experiment provides unambiguous evidence that parity is not conserved in beta decay. The observation of asymmetric electron emission from oriented <span className="italic">Co⁶⁰</span> nuclei contradicts the fundamental assumption that nature is symmetric under space inversion. This represents one of the most significant discoveries in modern physics, fundamentally altering our understanding of symmetry principles in weak interactions.
                </p>

                <p className="text-auto text-sm font-normal font-['TGMalromur'] leading-6 text-justify">
                  The implications extend beyond beta decay to all weak interaction processes. The violation of parity conservation necessitates a complete reformulation of the theory of weak interactions and raises profound questions about the fundamental symmetries of nature. Further experimental and theoretical work will be required to fully understand the implications of this discovery for particle physics and quantum field theory.
                </p>
              </div>

              {/* Footer */}
              <div className="text-left pt-6 mt-2">
               
                <p className="text-fg-48 text-xs font-normal font-['TGMalromur'] leading-5 italic">
                  Physical Review · Vol. 105, № 4 · 1957
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
