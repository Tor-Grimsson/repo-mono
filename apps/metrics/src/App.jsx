import MetricsDashboard from './MetricsDashboard.jsx'
import useMetricsData from './useMetricsData.js'
import { MILESTONES } from './milestones.js'

const MAIN_HOST = 'kolkrabbi.io'

// The whole app: the design system's dashboard, handed this site's live data.
export default function App() {
  const data = useMetricsData({ mainHost: MAIN_HOST })
  return (
    <main id="main">
      <MetricsDashboard data={data} milestones={MILESTONES} mainHost={MAIN_HOST} />
    </main>
  )
}
