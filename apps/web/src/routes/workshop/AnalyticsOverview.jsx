import DesPage from '../../components/workshop/molecules/DesPage'

const AnalyticsOverview = () => {
  return (
    <div className="flex flex-col gap-12">
      <DesPage
        title="Analytics Overview"
        subtitle="Introduction to the analytics system"
        meta="Design system • Analytics • Overview"
      />

      <div className="p-8">
        {/* Overview content will go here */}
      </div>
    </div>
  )
}

export default AnalyticsOverview
