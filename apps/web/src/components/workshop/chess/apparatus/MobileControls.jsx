import { Icon } from '@kol/ui'
import { useChessControls } from '../context/ChessControlsContext'

const MobileControls = ({ onSwapView }) => {
  const { selectedGame } = useChessControls()

  return (
    <div className="w-full bg-opacity-hex-02 rounded p-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded bg-opacity-hex-04 px-3 py-3 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="kol-mono-xs text-fg-80 uppercase tracking-[0.2em]">
              {selectedGame?.player?.username || 'Player'} vs {selectedGame?.opponent?.username || 'Opponent'}
            </span>
          </div>
          {selectedGame?.opening?.name && (
            <span className="kol-mono-xxs text-fg-64">
              {selectedGame.opening.name}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onSwapView}
          className="flex-shrink-0 w-12 h-12 rounded bg-opacity-hex-04 border border-fg-08 text-fg-80 flex items-center justify-center hover:bg-opacity-hex-08 transition-colors"
          aria-label="Toggle game search"
        >
          <Icon name="search" size={18} className="text-fg-80" />
        </button>
      </div>
    </div>
  )
}

export default MobileControls
