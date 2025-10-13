import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useNavigate } from 'react-router-dom'
import Logomark from '../../ui/Logomark'

gsap.registerPlugin(Draggable, InertiaPlugin)

const DialRotation = ({ projects = [] }) => {
  const circleRef = useRef(null)
  const spinRef = useRef(null)
  const centerContentRef = useRef(null)
  const svgCacheRef = useRef({})
  const navigate = useNavigate()

  // Place items around the circle - Animate divs, not buttons
  const placeItems = (itemURLs) => {
    const circle = circleRef.current
    if (!circle) return []

    const angleIncrement = Math.PI * 2 / itemURLs.length
    const radius = circle.offsetWidth / 2
    const items = []

    // Preload and cache all SVGs
    itemURLs.forEach(async (item) => {
      if (item.svg?.url && !svgCacheRef.current[item.svg.url]) {
        try {
          const response = await fetch(item.svg.url)
          const svgText = await response.text()
          // Cache the themed SVG
          svgCacheRef.current[item.svg.url] = svgText
            .replace(/fill="[^"]*"/g, 'fill="currentColor"')
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
        } catch (error) {
          console.error('Failed to preload SVG:', error)
        }
      }
    })

    itemURLs.forEach((item, i) => {
      // Wrapper div - this gets animated by GSAP
      const wrapper = document.createElement('div')
      wrapper.className = 'dial-item-wrapper'

      // Button with styling - stays static inside wrapper
      const button = document.createElement('button')
      button.className = 'dial-item'
      button.style.display = 'flex'
      button.style.alignItems = 'center'
      button.style.justifyContent = 'center'
      button.style.backgroundColor = 'var(--surface-primary)'
      button.style.color = 'var(--foreground)'
      button.style.padding = '8px 16px'
      button.style.borderRadius = '9999px'
      button.style.border = '1px solid var(--foreground)'
      button.style.whiteSpace = 'nowrap'
      button.style.transition = 'background-color 0.2s, color 0.2s'

      // Hover state - change button colors and show project SVG
      button.addEventListener('mouseenter', async () => {
        button.style.backgroundColor = 'var(--surface-inverse)'
        button.style.color = 'var(--foreground-inverse)'

        const svgPreview = circle.querySelector('.svg-preview')
        const svgContainer = circle.querySelector('.svg-container')

        if (svgPreview && item.svg?.url) {
          // Check cache first, otherwise fetch
          let themedSvg = svgCacheRef.current[item.svg.url]

          if (!themedSvg) {
            try {
              const response = await fetch(item.svg.url)
              const svgText = await response.text()
              themedSvg = svgText
                .replace(/fill="[^"]*"/g, 'fill="currentColor"')
                .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
              svgCacheRef.current[item.svg.url] = themedSvg
            } catch (error) {
              console.error('Failed to load SVG:', error)
              return
            }
          }

          svgPreview.innerHTML = themedSvg
          svgPreview.style.color = 'var(--foreground)'
          svgPreview.style.display = 'flex'
          svgPreview.style.alignItems = 'center'
          svgPreview.style.justifyContent = 'center'
        }

        if (svgContainer) {
          svgContainer.style.opacity = '1'
        }
      })
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'var(--surface-primary)'
        button.style.color = 'var(--foreground)'

        const svgContainer = circle.querySelector('.svg-container')
        if (svgContainer) {
          svgContainer.style.opacity = '0'
        }
      })

      const textDiv = document.createElement('div')
      textDiv.textContent = item.title.toUpperCase()
      textDiv.style.fontFamily = 'RightGroteskTight, sans-serif'
      textDiv.style.fontSize = '24px'
      textDiv.style.lineHeight = '1'

      button.appendChild(textDiv)
      button.onclick = () => {
        if (item.slug?.current) {
          navigate(`/work/${item.slug.current}`)
        }
      }

      wrapper.appendChild(button)
      items.push(wrapper)
      circle.appendChild(wrapper)

      const angle = angleIncrement * i
      gsap.set(wrapper, {
        position: "absolute",
        top: 0,
        left: 0,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        x: radius + Math.cos(angle) * radius,
        y: radius + Math.sin(angle) * radius
      })
    })

    return items
  }

  useEffect(() => {
    if (projects.length === 0 || !circleRef.current) return

    // Place items around circle
    const items = placeItems(projects)

    // Create spin timeline - circle rotates, items and center content counter-rotate
    spinRef.current = gsap.timeline({
      repeat: -1,
      defaults: { duration: 50, ease: "none" }
    })
      .to(circleRef.current, { rotation: 360 })
      .to(items, { rotation: -360 }, 0)
      .to(centerContentRef.current, { rotation: -360 }, 0) // Counter-rotate center content (logo + thumbnail)

    // Create draggable - EXACT CodePen logic
    const draggable = Draggable.create(circleRef.current, {
      type: 'rotation',
      inertia: true,
      dragClickables: true,
      onClick: function(e) {
        if (this.isDragging || Math.abs(this.deltaX) > 3 || Math.abs(this.deltaY) > 3) {
          e.stopPropagation()
          e.preventDefault()
        }
      },
      onPressInit: () => spinRef.current.pause(),
      onDrag: function() {
        const angle = (this.rotation + 360 * 100000) % 360
        spinRef.current.progress(angle / 360)
      },
      onThrowUpdate: function() {
        const angle = (this.rotation + 360 * 100000) % 360
        spinRef.current.progress(angle / 360)
      },
      onThrowComplete: () => {
        spinRef.current.resume()
        gsap.fromTo(spinRef.current, { timeScale: 0 }, { duration: 1, timeScale: 1, ease: "power1.in" })
      }
    })

    return () => {
      if (draggable[0]) draggable[0].kill()
      if (spinRef.current) spinRef.current.kill()
      // Clean up DOM
      items.forEach(item => item.remove())
    }
  }, [projects, navigate])

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="kol-mono-body opacity-50">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12 w-full">
      <div
        ref={circleRef}
        className="main-circle"
        style={{
          width: '400px',
          height: '400px',
          border: 'solid 2px var(--foreground)',
          borderRadius: '50%',
          position: 'relative',
          cursor: 'grab'
        }}
      >
        {/* Center content wrapper - counter-rotates to keep logo and thumbnail upright */}
        <div ref={centerContentRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ pointerEvents: 'none' }}>
          {/* Hidden logo */}
          <div className="logo-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 hidden" style={{ width: '40px', height: '40px' }}>
            <Logomark className="w-full h-full" />
          </div>

          {/* SVG container - handles show/hide */}
          <div className="svg-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300" style={{ width: '64px', height: '64px' }}>
            <div className="svg-preview" style={{ width: '64px', height: '64px' }}>
              {/* SVG will be injected here on hover */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialRotation
