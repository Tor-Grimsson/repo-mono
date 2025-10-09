import React from 'react'

const CursorContext = React.createContext({
  position: { x: 0, y: 0 },
  visible: false,
  setVisible: () => {}
})

export function CursorProvider({ children }) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    function handleMove(event) {
      setPosition({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const value = React.useMemo(() => ({ position, visible, setVisible }), [position, visible])
  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

export function useCursor() {
  return React.useContext(CursorContext)
}
