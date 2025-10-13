import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(Draggable, InertiaPlugin)

const ProjectDial = ({ projects = [] }) => {
  const containerRef = useRef(null)
  const itemsRef = useRef([])
  const rotationRef = useRef(0)
  const autoRotationRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const navigate = useNavigate()

  // Responsive radius based on viewport
  const getRadius = () => {
    if (typeof window === 'undefined') return 220
    const vw = window.innerWidth
    if (vw < 768) return Math.min(vw * 0.35, 150)
    if (vw < 1024) return Math.min(vw * 0.25, 180)
    return 220
  }

  const [radius, setRadius] = useState(getRadius())
  const angleStep = projects.length > 0 ? 360 / projects.length : 0

  // Update radius on window resize
  useEffect(() => {
    const handleResize = () => setRadius(getRadius())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Position items IMMEDIATELY before paint
  useLayoutEffect(() => {
    if (projects.length === 0) return

    itemsRef.current.forEach((item, index) => {
      if (!item) return
      const angle = (index * angleStep) * (Math.PI / 180)
      const x = radius + Math.cos(angle) * radius
      const y = radius + Math.sin(angle) * radius

      // Set ALL positioning via GSAP immediately
      gsap.set(item, {
        position: "absolute",
        top: 0,
        left: 0,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        x: x,
        y: y,
        rotation: 0,
        opacity: 1  // Show after positioning
      })
    })
  }, [projects.length, radius, angleStep])

  // Auto-rotation effect - NO intro animation
  useEffect(() => {
    if (projects.length === 0 || !containerRef.current) return

    const items = itemsRef.current.filter(Boolean)

    // Set initial rotation to 0 immediately (no animation)
    gsap.set(containerRef.current, { rotation: 0 })
    gsap.set(items, { rotation: 0 })

    // Create infinite rotation timeline from 0 to 360
    autoRotationRef.current = gsap.timeline({
      repeat: -1,
      defaults: { duration: 90, ease: "none" }
    })
      .to(containerRef.current, { rotation: 360 })
      .to(items, { rotation: -360 }, 0)

    return () => {
      if (autoRotationRef.current) {
        autoRotationRef.current.kill()
      }
    }
  }, [projects.length])

  // Drag interaction - EXACT CodePen implementation
  useEffect(() => {
    if (!containerRef.current || projects.length === 0 || !autoRotationRef.current) return

    const draggable = Draggable.create(containerRef.current, {
      type: 'rotation',
      inertia: true,
      onPressInit: () => {
        // CodePen line 41: pause timeline when GRABBING starts
        autoRotationRef.current.pause()
        setIsDragging(true)
      },
      onDrag: function() {
        // CodePen line 43-45: sync timeline progress to rotation during drag
        const angle = (this.rotation + 360 * 100000) % 360
        autoRotationRef.current.progress(angle / 360)
      },
      onThrowUpdate: function() {
        // CodePen line 47-49: sync timeline progress during throw momentum
        const angle = (this.rotation + 360 * 100000) % 360
        autoRotationRef.current.progress(angle / 360)
      },
      onThrowComplete: () => {
        // CodePen line 51-54: resume timeline and ease timeScale from 0 to 1
        autoRotationRef.current.resume()
        gsap.fromTo(autoRotationRef.current, { timeScale: 0 }, { duration: 1, timeScale: 1, ease: "power1.in" })
        setIsDragging(false)
      }
    })

    return () => {
      if (draggable[0]) {
        draggable[0].kill()
      }
    }
  }, [projects.length, autoRotationRef.current])

  const handleProjectClick = (e, slug) => {
    // Only navigate if we're not dragging
    if (isDragging) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    if (slug?.current) {
      navigate(`/work/${slug.current}`)
    }
  }

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
        ref={containerRef}
        className="relative cursor-grab active:cursor-grabbing rounded-full border"
        style={{
          width: radius * 2,
          height: radius * 2,
          borderColor: 'var(--foreground)',
          margin: '0 auto'
        }}
      >

        {/* Project items - hidden until positioned by GSAP */}
        {projects.map((project, index) => (
          <button
            key={project._id || index}
            ref={(el) => (itemsRef.current[index] = el)}
            onClick={(e) => handleProjectClick(e, project.slug)}
            className="flex items-center justify-center px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{
              opacity: 0,  // Hidden until useLayoutEffect positions it
              whiteSpace: 'nowrap',
              backgroundColor: 'var(--surface-inverse)',
              color: 'var(--foreground-inverse)',
              pointerEvents: 'auto'
            }}
          >
            <span className="kol-h4 uppercase">
              {project.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProjectDial
