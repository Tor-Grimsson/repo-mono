import { SectionLabel, Divider } from '@kol/ui'

const WorkSection = ({ label = 'Featured Work' }) => {
  return (
    <>
      {/* Header with section label */}
      <div className="w-full flex flex-row justify-between items-center gap-4">
        <SectionLabel text={label} />
      </div>

      <Divider variant="horizontal" />
    </>
  )
}

export default WorkSection
