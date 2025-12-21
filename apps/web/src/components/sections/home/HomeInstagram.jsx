import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion'

// Single ASCII layer with configurable size and speed - loops left continuously
const AsciiLayer = ({ scale = 1, duration = 25, opacity = 0.3, fields = [], startOffset = 0, zIndex = 0, topOffset = 0 }) => {
  const driftX = useMotionValue(startOffset)

  useEffect(() => {
    // Animate from offset to offset - 100vw, then snap back (pattern repeats so it's seamless)
    const controls = animate(driftX, [startOffset, startOffset - window.innerWidth], {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop'
    })
    return () => controls.stop()
  }, [driftX, duration, startOffset])

  // Density characters from light to heavy
  const chars = [' ', '·', '∙', '░', '▒', '▓', '█']

  // Scale affects density - double cols for seamless repeat
  const cols = Math.round(400 * scale)
  const rows = Math.round(40 * scale)

  const getCharAt = (col, row, totalCols) => {
    // Wrap x position for seamless tiling
    const x = (col % (totalCols / 2)) / (totalCols / 2) * 2
    const y = row / rows

    let density = 0
    for (const field of fields) {
      const dx = x - field.x
      const dy = (y - field.y) * 2
      const dist = Math.sqrt(dx * dx + dy * dy)
      const fieldDensity = Math.max(0, 1 - dist / field.r) * field.intensity
      density = Math.max(density, fieldDensity)
    }

    const charIndex = Math.min(chars.length - 1, Math.floor(density * chars.length))
    return chars[charIndex]
  }

  // Double the pattern for seamless looping
  const doubleCols = cols * 2
  const pattern = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: doubleCols }, (_, col) => getCharAt(col, row, doubleCols)).join('')
  )

  // Font size scales inversely (bigger pattern = smaller chars to fill same space)
  const fontSize = 12 / scale

  return (
    <motion.div
      style={{ x: driftX, zIndex, top: `calc(55% - 144px - ${topOffset}px)` }}
      className="absolute left-0 w-[400vw] h-[45%] pointer-events-none overflow-hidden select-none"
    >
      <pre
        className="font-mono leading-[1.2]"
        style={{
          color: 'var(--kol-surface-on-primary)',
          opacity,
          fontSize: `${fontSize}px`
        }}
      >
        {pattern.map((row, i) => (
          <div key={i}>{row}</div>
        ))}
      </pre>
    </motion.div>
  )
}

// ASCII Firework component
const AsciiFirework = ({ x, delay = 0 }) => {
  const [phase, setPhase] = useState('waiting') // waiting, rising, exploding, sparkling, done
  const [frame, setFrame] = useState(0)

  // Trail characters (rising)
  const trail = ['·', '│', '│', '│', '╵']

  // Explosion frames
  const explosionFrames = [
    // Frame 0 - initial burst
    [
      '    *    ',
      '   /|\\   ',
      '  * ─ *  ',
      '   \\|/   ',
      '    *    ',
    ],
    // Frame 1 - expanding
    [
      '  · * ·  ',
      ' \'  |  \' ',
      '· ─ * ─ ·',
      ' \'  |  \' ',
      '  · * ·  ',
    ],
    // Frame 2 - sparkles
    [
      ' ·     · ',
      '   \' \'   ',
      '·   *   ·',
      '   \' \'   ',
      ' ·     · ',
    ],
    // Frame 3 - fading
    [
      '  ·   ·  ',
      '    ·    ',
      ' ·     · ',
      '    ·    ',
      '  ·   ·  ',
    ],
    // Frame 4 - almost gone
    [
      '         ',
      '    ·    ',
      '  ·   ·  ',
      '    ·    ',
      '         ',
    ],
  ]

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setPhase('rising')
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (phase === 'rising') {
      const interval = setInterval(() => {
        setFrame(f => {
          if (f >= trail.length - 1) {
            setPhase('exploding')
            return 0
          }
          return f + 1
        })
      }, 100)
      return () => clearInterval(interval)
    }

    if (phase === 'exploding') {
      const interval = setInterval(() => {
        setFrame(f => {
          if (f >= explosionFrames.length - 1) {
            setPhase('done')
            // Restart after a pause
            setTimeout(() => {
              setPhase('rising')
              setFrame(0)
            }, 2000 + Math.random() * 3000)
            return f
          }
          return f + 1
        })
      }, 150)
      return () => clearInterval(interval)
    }
  }, [phase])

  if (phase === 'waiting' || phase === 'done') return null

  return (
    <div
      className="absolute font-mono text-[14px] leading-none pointer-events-none select-none"
      style={{
        left: x,
        bottom: phase === 'rising' ? `${frame * 15}%` : '60%',
        color: 'var(--kol-surface-on-primary)',
        opacity: phase === 'exploding' ? Math.max(0.2, 1 - frame * 0.2) : 0.6,
        transform: 'translateX(-50%)',
        whiteSpace: 'pre',
        textAlign: 'center',
      }}
    >
      {phase === 'rising' && trail[frame]}
      {phase === 'exploding' && explosionFrames[frame]?.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  )
}

// Fireworks container - scroll triggered
const AsciiFireworks = ({ scrollYProgress }) => {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // Trigger at ~60% scroll (second to last card)
      if (v > 0.60 && !triggered) {
        setTriggered(true)
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, triggered])

  if (!triggered) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
      <AsciiFirework x="20%" delay={0} />
      <AsciiFirework x="50%" delay={400} />
      <AsciiFirework x="75%" delay={800} />
    </div>
  )
}

// Space Invader ASCII sprite
const spaceInvaderSprite = [
  '    ████████    ',
  '  ████████████  ',
  '████████████████',
  '████  ████  ████',
  '████████████████',
  '████████████████',
  '  ████    ████  ',
  '  ██        ██  ',
  '████        ████',
]

// Space Invader bullet
const SpaceInvaderBullet = ({ startX, startY, delay }) => {
  const y = useMotionValue(startY)

  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(y, startY + 300, {
        duration: 0.5,
        ease: 'linear',
      })
    }, delay)
    return () => clearTimeout(timeout)
  }, [y, startY, delay])

  return (
    <motion.div
      style={{ x: startX, y }}
      className="absolute font-mono text-[4px] pointer-events-none select-none"
    >
      <div style={{ color: 'var(--kol-surface-on-primary)' }}>│</div>
    </motion.div>
  )
}

// Animated Space Invader - triggered by scroll
const SpaceInvader = ({ scrollYProgress }) => {
  const [bullets, setBullets] = useState([])
  const [hasTriggered, setHasTriggered] = useState(false)
  const x = useMotionValue(window.innerWidth / 2 - 20)
  const y = useMotionValue(-50)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // Trigger at ~70% scroll (near the end)
      if (v > 0.65 && !hasTriggered) {
        setHasTriggered(true)

        // Quick entry from top
        animate(y, 60, {
          duration: 0.4,
          ease: 'easeOut',
        })

        // Shoot 3 bullets quickly
        const shot1 = setTimeout(() => {
          setBullets(prev => [...prev, { id: 1, x: x.get() + 15 }])
        }, 300)
        const shot2 = setTimeout(() => {
          setBullets(prev => [...prev, { id: 2, x: x.get() + 15 }])
        }, 500)
        const shot3 = setTimeout(() => {
          setBullets(prev => [...prev, { id: 3, x: x.get() + 15 }])
        }, 700)

        // Quick exit to the right
        const exitX = setTimeout(() => {
          animate(x, window.innerWidth + 100, {
            duration: 0.8,
            ease: 'easeIn',
          })
        }, 900)

        return () => {
          clearTimeout(shot1)
          clearTimeout(shot2)
          clearTimeout(shot3)
          clearTimeout(exitX)
        }
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, hasTriggered, x, y])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      <motion.div
        style={{ x, y }}
        className="absolute font-mono text-[3px] leading-none pointer-events-none select-none whitespace-pre"
      >
        <pre style={{ color: 'var(--kol-surface-on-primary)', opacity: 0.6 }}>
          {spaceInvaderSprite.join('\n')}
        </pre>
      </motion.div>
      {bullets.map(bullet => (
        <SpaceInvaderBullet
          key={bullet.id}
          startX={bullet.x}
          startY={y.get() + 20}
          delay={0}
        />
      ))}
    </div>
  )
}

// Sparkling star - cycles through characters
const SparklingStar = ({ x, y, delay }) => {
  const [char, setChar] = useState('·')
  const chars = ['·', '+', '*', '+', '·', '-', '·']

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        index = (index + 1) % chars.length
        setChar(chars[index])
      }, 400)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <motion.div
      className="absolute font-mono text-[10px]"
      style={{
        left: x,
        top: y,
        color: 'var(--kol-surface-on-primary)',
      }}
      animate={{
        opacity: [0.1, 0.35, 0.1],
      }}
      transition={{
        duration: 2.5,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {char}
    </motion.div>
  )
}

// Sparkling stars container
const SparklingStars = () => {
  const stars = [
    { x: '12%', y: '25%', delay: 0 },
    { x: '28%', y: '18%', delay: 1.2 },
    { x: '45%', y: '30%', delay: 2.5 },
    { x: '62%', y: '15%', delay: 0.8 },
    { x: '78%', y: '28%', delay: 1.8 },
    { x: '88%', y: '22%', delay: 3.2 },
    { x: '35%', y: '12%', delay: 2.1 },
    { x: '55%', y: '8%', delay: 0.4 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-1">
      {stars.map((star, i) => (
        <SparklingStar key={i} x={star.x} y={star.y} delay={star.delay} />
      ))}
    </div>
  )
}

// Back layer fields - left side and center (smaller clouds for depth)
const backFields = [
  { x: 0.1, y: 0.5, r: 0.17, intensity: 1 },
  { x: 0.5, y: 0.4, r: 0.15, intensity: 0.85 },
  { x: 1.0, y: 0.6, r: 0.18, intensity: 0.8 },
  { x: 1.5, y: 0.35, r: 0.16, intensity: 0.9 },
]

// Front layer fields - offset from back, slight overlap in middle
const frontFields = [
  { x: 0.3, y: 0.65, r: 0.22, intensity: 0.9 },
  { x: 0.75, y: 0.3, r: 0.24, intensity: 1 },
  { x: 1.25, y: 0.55, r: 0.28, intensity: 0.85 },
  { x: 1.75, y: 0.45, r: 0.25, intensity: 0.8 },
]

// Back ASCII layer (behind images)
const AsciiPatternBack = () => (
  <AsciiLayer scale={1.4} duration={80} opacity={0.2} fields={backFields} startOffset={-300} topOffset={-80} />
)

// Front ASCII layer (above images)
const AsciiPatternFront = () => (
  <AsciiLayer scale={1} duration={50} opacity={0.35} fields={frontFields} startOffset={0} zIndex={20} topOffset={-80} />
)

const FEED_URL = 'https://feeds.behold.so/EChkujxRiyLZeLNrVo1Y'

// Wave function for y-position - same as magnetic lines
const getWaveY = (xPercent) => {
  const wave1 = Math.sin(xPercent * Math.PI * 12) * 0.15
  const wave2 = Math.sin(xPercent * Math.PI * 6 + 1) * 0.1
  return (wave1 + wave2) * 150 // Scale to pixels
}

// Individual image card with wave-following y motion
const WaveImage = ({ post, index, scrollYProgress }) => {
  // Calculate where this card is in the 0-1 range as it moves across screen
  // Card starts at position index/6, moves to (index+1)/6 as it exits
  const y = useTransform(scrollYProgress, (progress) => {
    // Map scroll progress to where this card currently is in the 600vw space
    // At progress 0, cards are at their starting positions
    // At progress 1, cards have scrolled fully left
    const cardBasePosition = index / 6 // 0, 0.166, 0.333, etc.
    const scrollOffset = progress * 1.2 // How much we've scrolled through
    const effectivePosition = cardBasePosition + scrollOffset

    // Wrap to keep in 0-1 range for wave calculation
    const wavePosition = effectivePosition % 1
    return getWaveY(wavePosition)
  })

  return (
    <motion.div
      style={{ y }}
      className="h-full aspect-[4/5] overflow-hidden rounded"
    >
      <a
        href={post.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <img
          src={post.sizes?.large?.mediaUrl || post.mediaUrl}
          alt={post.prunedCaption || 'Instagram post'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </a>
    </motion.div>
  )
}

// Inner component with motion hooks - only renders when posts are loaded
const InstagramScroller = ({ posts }) => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]  // Track from enter to exit of viewport
  })

  // 9 points: enter, 6 cards, right edge center, exit off-screen
  const xRaw = useTransform(
    scrollYProgress,
    [0, 0.12, 0.24, 0.36, 0.48, 0.60, 0.72, 0.85, 1],
    [
      "150vw",      // enter: off-screen right
      "50vw",       // card 1 left edge at center (sticky starts)
      "-50vw",      // card 2 left edge at center
      "-150vw",     // card 3 left edge at center
      "-250vw",     // card 4 left edge at center
      "-350vw",     // card 5 left edge at center
      "-450vw",     // card 6 left edge at center
      "-550vw",     // card 6 right edge at center (sticky ends here)
      "-700vw"      // exit: continues off-screen after sticky releases
    ]
  )

  // Raw scroll-linked (no spring smoothing)
  const x = xRaw

  return (
    <section ref={containerRef} className="relative h-[1000vh]">
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-20"
      >
        {/* Swirly wave - hidden, replaced by magnetic lines */}
        {/* <motion.svg
          style={{ x: lineX }}
          className="absolute top-[55%] left-0 w-[600vw] h-[45%] pointer-events-none"
          viewBox="0 0 6000 450"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50
               C200 50, 300 0, 500 25
               S800 80, 1000 50
               S1300 0, 1500 25
               S1800 100, 2000 50
               S2300 0, 2500 25
               S2800 80, 3000 50
               S3300 0, 3500 25
               S3800 100, 4000 50
               S4300 0, 4500 25
               S4800 80, 5000 50
               S5300 0, 5500 25
               S5800 80, 6000 50
               L6000 450
               L0 450
               Z"
            fill="color-mix(in srgb, var(--kol-surface-on-primary) 4%, transparent)"
          />
        </motion.svg> */}

        {/* Sparkling stars */}
        <SparklingStars />

        {/* ASCII fireworks - triggered at next to last image */}
        <AsciiFireworks scrollYProgress={scrollYProgress} />

        {/* Space Invader - triggered near the end */}
        <SpaceInvader scrollYProgress={scrollYProgress} />

        {/* ASCII pattern - back layer */}
        <AsciiPatternBack />

        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-8 relative z-10 -mt-32">
          <p className="kol-mono-xs text-fg-48 uppercase tracking-widest mb-2">instagram</p>
          <a href="https://www.instagram.com/kolkrabbi_/" target="_blank" rel="noopener noreferrer" className="kol-helper-md hover:underline" style={{ fontSize: '28px' }}>@kolkrabbi_</a>
        </div>

        <div className="w-full relative z-10 mt-16">
          <motion.div
            style={{ x }}
            className="flex gap-0"
          >
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="relative flex-shrink-0 w-screen h-[calc(60vh-168px)] rounded flex items-center justify-center"
              >
                <WaveImage
                  post={post}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ASCII pattern - front layer (above images) */}
        <AsciiPatternFront />
      </div>
    </section>
  )
}

const HomeInstagram = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(FEED_URL)
      .then(res => res.json())
      .then(data => {
        setPosts((data.posts || []).slice(0, 6))
      })
      .catch(() => {})
  }, [])

  if (posts.length === 0) {
    return (
      <section className="py-16 px-6 md:px-8">
        <div className="w-full max-w-[1400px] mx-auto">
          <p className="kol-mono-xs text-fg-48 uppercase tracking-widest mb-2">Follow</p>
          <h2 className="kol-heading-lg">Instagram</h2>
          <p className="kol-mono-text text-fg-48 mt-4">Loading...</p>
        </div>
      </section>
    )
  }

  return <InstagramScroller posts={posts} />
}

export default HomeInstagram
