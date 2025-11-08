import DesPage from '../../components/workshop/molecules/DesPage'
import ChessHero from '../../components/workshop/chess/dashboards/ChessHero'
import '../../components/workshop/chess/chess.css'

const ChessOverview = () => {
  return (
    <div className="space-y-12">
      <DesPage
        title="Chess Overview"
        subtitle="High-level metrics and performance trends."
        meta="106-month archive snapshot"
      />
      <ChessHero />
    </div>
  )
}

export default ChessOverview
