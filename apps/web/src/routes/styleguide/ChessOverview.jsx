import DesPage from '../../components/styleguide/molecules/DesPage'
import ChessHero from '../../components/styleguide/chess/dashboards/ChessHero'
import '../../components/styleguide/chess/chess.css'

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
