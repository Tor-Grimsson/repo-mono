import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

// The component accepts two properties (props):
const AnimatedTitle = ({ title, containerClass, style, lineClass }) => {
  const containerRef = useRef(null)

  // This section sets up and controls the animation (GSAP).
  // gsap timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current.querySelectorAll('.animatedWord')

      // Set initial state
      gsap.set(words, {
        opacity: 0,
        x: '150vw',
        y: 50,
        rotateY: -45,
        rotateX: 15,
      })

      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        },
      })

      //  The .to() Animation:
      titleAnimation.to(
        words,
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          ease: 'power2.inOut',
          stagger: 0.02,
        },
        0
      )
    }, containerRef)

    return () => ctx.revert()
  }, [title])

  // Content Section Parameters
  return (
    <div ref={containerRef} className={`animatedTitle ${containerClass}`} style={style}>
      {title.split('<br />').map((line, index) => (
        <div
          key={index}
          className={`flexCenter flex-wrap gap-2 md:gap-3 ${lineClass || ''}`}
        >
          {line.split(' ').map((word, i) => (
            <span
              key={i}
              className="animatedWord"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default AnimatedTitle
