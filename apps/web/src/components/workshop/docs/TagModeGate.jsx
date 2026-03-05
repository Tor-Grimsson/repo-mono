import { Outlet } from 'react-router-dom'
import { useTagMode } from './TagModeContext'
import TagModeOverlay from './TagModeOverlay'

const TagModeGate = () => {
  const { isOpen } = useTagMode()
  return (
    <>
      <div style={isOpen ? { display: 'none' } : undefined}>
        <Outlet />
      </div>
      {isOpen && <TagModeOverlay />}
    </>
  )
}

export default TagModeGate
