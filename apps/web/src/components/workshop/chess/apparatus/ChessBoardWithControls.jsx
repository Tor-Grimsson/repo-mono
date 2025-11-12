import { useChessControls, ChessControlsProvider } from '../context/ChessControlsContext'
import ChessBoard from './ChessBoard'
import AlternativeControlsMock from './AlternativeControlsMock'
import PlaybackControls from './PlaybackControls'
import '@kol/ui/css/chess.css'

const ChessBoardView = () => {
  const { snapshots, moveIndex, orientation, lastMove, pieceSet, boardTheme } = useChessControls()
  return (
    <ChessBoard
      fen={snapshots[moveIndex]?.fen}
      size="desktop"
      orientation={orientation}
      lastMove={lastMove}
      pieceSet={pieceSet}
      boardTheme={boardTheme}
    />
  )
}

const ChessBoardWithControlsContent = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="flex-shrink-0">
        <ChessBoardView />
      </div>
      <div className="flex-shrink-0 w-full lg:w-[440px]">
        <AlternativeControlsMock />
      </div>
    </div>
  )
}

const ChessBoardWithControls = ({ externalGame = null }) => {
  console.log('[ChessBoardWithControls] Rendering with externalGame:', externalGame?.id, externalGame)
  return (
    <ChessControlsProvider externalGame={externalGame}>
      <ChessBoardWithControlsContent />
    </ChessControlsProvider>
  )
}

export default ChessBoardWithControls
