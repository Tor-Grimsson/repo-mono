import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(Draggable, InertiaPlugin)

const DialRotation = ({ projects = [] }) => {
  const circleRef = useRef(null)
  const spinRef = useRef(null)
  const navigate = useNavigate()

  // Place items around the circle - Animate divs, not buttons
  const placeItems = (itemURLs) => {
    const circle = circleRef.current
    if (!circle) return []

    const angleIncrement = Math.PI * 2 / itemURLs.length
    const radius = circle.offsetWidth / 2
    const items = []

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
      button.style.backgroundColor = 'var(--surface-inverse)'
      button.style.color = 'var(--foreground-inverse)'
      button.style.padding = '8px 16px'
      button.style.borderRadius = '9999px'
      button.style.border = '1px solid white'
      button.style.whiteSpace = 'nowrap'

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

    // Create spin timeline - EXACT CodePen logic
    spinRef.current = gsap.timeline({
      repeat: -1,
      defaults: { duration: 50, ease: "none" }
    })
      .to(circleRef.current, { rotation: 360 })
      .to(items, { rotation: -360 }, 0)

    // Create draggable with dragClickables to allow throwing from buttons
    let lastRotation = 0
    const draggable = Draggable.create(circleRef.current, {
      type: 'rotation',
      inertia: true,
      dragClickables: true, // Allow dragging even when starting on buttons
      onClick: function(e) {
        // Prevent navigation on drag, allow on click
        if (this.isDragging || Math.abs(this.deltaX) > 3 || Math.abs(this.deltaY) > 3) {
          e.stopPropagation()
          e.preventDefault()
        }
      },
      onPressInit: function() {
        spinRef.current.pause()
        lastRotation = this.rotation
      },
      onDrag: function() {
        const angle = (this.rotation + 360 * 100000) % 360
        spinRef.current.progress(angle / 360)
        lastRotation = this.rotation
      },
      onThrowUpdate: function() {
        const angle = (this.rotation + 360 * 100000) % 360
        spinRef.current.progress(angle / 360)
      },
      onThrowComplete: function() {
        // Determine direction from final rotation vs last rotation
        const direction = this.rotation > lastRotation ? 1 : -1
        spinRef.current.resume()
        // Ease from 0 to base speed like CodePen
        gsap.fromTo(spinRef.current,
          { timeScale: 0 },
          {
            duration: 1,
            timeScale: direction,
            ease: "power1.in"
          }
        )
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
      />
    </div>
  )
}

export default DialRotation
