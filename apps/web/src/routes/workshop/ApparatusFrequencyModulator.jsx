import { useContext, useLayoutEffect } from 'react'
import { ShellFullHeightContext } from '../../components/shell'
import DesPage from '../../components/workshop/molecules/DesPage'
import FrequencyModulationPreview from '../../components/workshop/animations/FrequencyModulationPreview'

const ApparatusFrequencyModulator = () => {
  const setFullHeight = useContext(ShellFullHeightContext)

  useLayoutEffect(() => {
    setFullHeight(true)
    return () => setFullHeight(false)
  }, [setFullHeight])

  return (
    <div className="flex flex-col space-y-10 h-full py-4">
      <DesPage message="Frequency Modulator – Embedded controls for harmonic wave calibration." />
      <div className="relative flex-1 overflow-hidden rounded border border-fg-08 bg-surface-secondary/40">
        <FrequencyModulationPreview />
      </div>
    </div>
  )
}

export default ApparatusFrequencyModulator
