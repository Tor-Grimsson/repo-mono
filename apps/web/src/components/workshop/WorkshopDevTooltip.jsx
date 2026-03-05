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

const classifyClass = (cls) => {
  // Tailwind-generated classes typically have patterns like: px-4, text-fg-64, bg-surface-primary, etc.
  // Custom classes: shell-*, docs-*, kol-*, dash-*, tag-*, etc.
  if (/^(shell|docs|kol|dash|tag|chess|inline-tag)[-]/.test(cls)) return 'custom'
  return 'tailwind'
}

const resolveColor = (el) => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = getComputedStyle(el).color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

const WorkshopDevTooltip = () => {
  const [info, setInfo] = useState(null)
  const keysDown = useRef({ alt: false, shift: false, meta: false })

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Alt') keysDown.current.alt = true
      if (e.key === 'Shift') keysDown.current.shift = true
      if (e.key === 'Meta') keysDown.current.meta = true
    }
    const onKeyUp = (e) => {
      if (e.key === 'Alt') {
        keysDown.current.alt = false
        setInfo(null)
      }
      if (e.key === 'Shift') {
        keysDown.current.shift = false
        setInfo(null)
      }
      if (e.key === 'Meta') {
        keysDown.current.meta = false
        setInfo(null)
      }
    }
    const onMove = (e) => {
      const { alt, shift, meta } = keysDown.current
      if (!alt) return

      const el = e.target

      if (shift && meta) {
        // Shift+Alt+Cmd: show computed font-size and color
        const fontSize = getComputedStyle(el).fontSize
        const hex = resolveColor(el)
        setInfo({ mode: 'style', fontSize, hex, x: e.clientX, y: e.clientY })
        return
      }

      if (shift) {
        // Shift+Alt: show classNames
        const classes = el.className
        if (typeof classes === 'string' && classes.trim()) {
          setInfo({ mode: 'class', classes: classes.trim(), x: e.clientX, y: e.clientY })
        } else {
          setInfo(null)
        }
        return
      }

      // Alt only: show component name
      let node = el
      while (node) {
        const name = getComponentName(node)
        if (name) {
          setInfo({ mode: 'component', name, x: e.clientX, y: e.clientY })
          return
        }
        node = node.parentElement
      }
      setInfo(null)
    }
    const onBlur = () => {
      keysDown.current = { alt: false, shift: false, meta: false }
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

  const tooltipStyle = {
    position: 'fixed',
    left: info.x + 12,
    top: info.y - 28,
    padding: '4px 8px',
    background: 'rgba(0,0,0,0.88)',
    color: '#e0e0e0',
    fontSize: '11px',
    fontFamily: 'JetBrains Mono, monospace',
    borderRadius: '4px',
    pointerEvents: 'none',
    zIndex: 99999,
    maxWidth: '400px',
    lineHeight: 1.5
  }

  if (info.mode === 'component') {
    return (
      <div style={tooltipStyle}>
        {info.name}
      </div>
    )
  }

  if (info.mode === 'style') {
    return (
      <div style={tooltipStyle}>
        <span style={{ color: '#999' }}>{info.fontSize}</span>
        {' '}
        <span style={{ color: info.hex }}>{info.hex}</span>
      </div>
    )
  }

  // Class mode: color-code custom vs tailwind
  const classList = info.classes.split(/\s+/)
  return (
    <div style={tooltipStyle}>
      {classList.map((cls, i) => {
        const type = classifyClass(cls)
        return (
          <span key={i}>
            <span style={{ color: type === 'custom' ? '#ffe32e' : '#999' }}>{cls}</span>
            {i < classList.length - 1 && ' '}
          </span>
        )
      })}
    </div>
  )
}

export default WorkshopDevTooltip
