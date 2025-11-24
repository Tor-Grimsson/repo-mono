import ColorLoader from '../loaders/ColorLoader'
import { CursorProvider } from '../../context/CursorContext'

export default function LoaderOverlay({ children, onEnter }) {
  return (
    <CursorProvider>
      <div className="fixed inset-0 flex flex-col items-center justify-center z-[100]">
        {children || <ColorLoader onEnter={onEnter} />}
      </div>
    </CursorProvider>
  )
}
