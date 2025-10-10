import ColorLoader from '../loaders/ColorLoader'
import { CursorProvider } from '../../context/CursorContext'

export default function LoaderOverlay({ children, message = 'Loading', onEnter }) {
  return (
    <CursorProvider>
      <div className="fixed inset-0 flex flex-col items-center justify-center z-[100] bg-black">
        {children || <ColorLoader message={message} onEnter={onEnter} />}
      </div>
    </CursorProvider>
  )
}
