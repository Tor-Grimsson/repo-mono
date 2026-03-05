import { useEffect, useRef, useState } from 'react'

const getFiber = (node) => {
  const key = Object.keys(node).find((k) => k.startsWith('__reactFiber$'))
  return key ? node[key] : null
}

const getComponentName = (node) => {
  const fiber = getFiber(node)
  if (!fiber) return null

  let current = fiber
  while (current) {
    const name = current.type?.name || current.type?.displayName
    if (name && /^[A-Z]/.test(name)) return name
    current = current.return
  }
  return null
}

const WorkshopDevTooltip = () => {
  const [info, setInfo] = useState(null)
  const altDown = useRef(false)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Alt') altDown.current = true
    }
    const onKeyUp = (e) => {
      if (e.key === 'Alt') {
        altDown.current = false
        setInfo(null)
      }
    }
    const onMove = (e) => {
      if (!altDown.current) return
      let el = e.target
      while (el) {
        const name = getComponentName(el)
        if (name) {
          setInfo({ name, x: e.clientX, y: e.clientY })
          return
        }
        el = el.parentElement
      }
      setInfo(null)
    }
    const onBlur = () => {
      altDown.current = false
      setInfo(null)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  if (!info) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: info.x + 12,
        top: info.y - 28,
        padding: '3px 8px',
        background: 'rgba(0,0,0,0.82)',
        color: '#e0e0e0',
        fontSize: '11px',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '4px',
        pointerEvents: 'none',
        zIndex: 99999,
        whiteSpace: 'nowrap'
      }}
    >
      {info.name}
    </div>
  )
}

export default WorkshopDevTooltip
