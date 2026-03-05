import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import SEO from '../../components/layout/SEO'

gsap.registerPlugin(ScrollTrigger)

/**
 * Architectural Walkthrough — "The Vault"
 *
 * A duotone red + cream fake-3D journey through architectural spaces.
 * No images. Pure CSS shapes + GSAP ScrollTrigger + perspective transforms.
 *
 * Route: /prints-xx (unlisted)
 *
 * Rooms:
 * 1. The Corridor — walk forward through a red hallway
 * 2. The Turn — scene rotates, new passage
 * 3. The Staircase — ascend steps
 * 4. The Vault — large room with print names on walls
 * 5. The Exit — collapse to vanishing point
 */

const RED = '#b91c1c'
const RED_DARK = '#7f1d1d'
const RED_DEEP = '#450a0a'
const CREAM = '#f5ebe0'
const CREAM_DARK = '#e8d5c4'
const BLACK = '#0a0a0a'

// Print names for the vault room
const PRINT_NAMES = [
  'Blokk', 'Skovia', 'Midnight', 'Midday', 'fvv', 'Weissensee',
  'Tangents', 'Faust', 'Tími I', 'Tími II', 'Tími III', 'Tími IV',
  'Mýtar', 'Borg', 'Traum', 'Ubu Roi', 'Skinnalón', 'Hornhimna',
  'Himnuhorn', 'Himbrak', 'Trölla', 'Myrkvi', 'Frank', 'Launráð'
]

export default function PrintsArchitectural() {
  const mainRef = useRef(null)

  // Room refs
  const corridorRef = useRef(null)
  const corridorWorldRef = useRef(null)
  const turnRef = useRef(null)
  const turnWorldRef = useRef(null)
  const stairsRef = useRef(null)
  const stairsWorldRef = useRef(null)
  const vaultRef = useRef(null)
  const vaultWorldRef = useRef(null)
  const exitRef = useRef(null)
  const exitWorldRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ===== ROOM 1: THE CORRIDOR =====
      // Walk forward — translateZ on the world container
      gsap.to(corridorWorldRef.current, {
        z: 1800,
        ease: 'none',
        scrollTrigger: {
          trigger: corridorRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      })

      // Corridor lights flicker
      const corridorLights = corridorRef.current?.querySelectorAll('[data-light]')
      corridorLights?.forEach((light, i) => {
        gsap.to(light, {
          opacity: 0.3,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          delay: i * 0.7,
          repeatDelay: 2 + (i * 0.5),
        })
      })

      // ===== ROOM 2: THE TURN =====
      // Rotate the world 90 degrees
      const turnTl = gsap.timeline({
        scrollTrigger: {
          trigger: turnRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      })
      turnTl.to(turnWorldRef.current, { rotateY: -90, z: 400, duration: 1, ease: 'power2.inOut' })
      turnTl.to(turnWorldRef.current, { rotateY: -90, z: 1200, duration: 1, ease: 'none' })

      // ===== ROOM 3: THE STAIRCASE =====
      const stairsTl = gsap.timeline({
        scrollTrigger: {
          trigger: stairsRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      })
      stairsTl.to(stairsWorldRef.current, { y: -600, rotateX: -15, duration: 1, ease: 'none' })
      stairsTl.to(stairsWorldRef.current, { y: -1200, rotateX: -25, duration: 1, ease: 'none' })

      // Steps reveal
      const steps = stairsRef.current?.querySelectorAll('[data-step]')
      steps?.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          scrollTrigger: {
            trigger: stairsRef.current,
            start: `top+=${i * 60} top`,
            end: `top+=${i * 60 + 120} top`,
            scrub: 1,
          }
        })
      })

      // ===== ROOM 4: THE VAULT =====
      const vaultTl = gsap.timeline({
        scrollTrigger: {
          trigger: vaultRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      })
      // Camera pulls back to reveal the room
      vaultTl.from(vaultWorldRef.current, { z: 600, scale: 1.5, duration: 0.4, ease: 'power2.out' })
      // Then slowly drift forward
      vaultTl.to(vaultWorldRef.current, { z: 200, duration: 0.6, ease: 'none' })

      // Print names fade in sequentially
      const nameEls = vaultRef.current?.querySelectorAll('[data-vault-name]')
      nameEls?.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          scrollTrigger: {
            trigger: vaultRef.current,
            start: `top+=${100 + i * 40} top`,
            end: `top+=${200 + i * 40} top`,
            scrub: 1,
          }
        })
      })

      // ===== ROOM 5: THE EXIT =====
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: exitRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      })
      exitTl.to(exitWorldRef.current, { scale: 0.01, opacity: 0, duration: 1, ease: 'power3.in' })

    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title="Prints — The Vault"
        description="An architectural journey through prints."
        ogUrl="https://kolkrabbi.io/prints-xx"
        canonical="https://kolkrabbi.io/prints-xx"
      />

      <div ref={mainRef} className="w-full overflow-x-hidden" style={{ background: BLACK }}>

        {/* ========== ROOM 1: THE CORRIDOR ========== */}
        <section
          ref={corridorRef}
          className="relative h-[300vh] w-full"
        >
          <div
            className="w-full h-screen overflow-hidden"
            style={{ perspective: '800px', perspectiveOrigin: '50% 50%' }}
          >
            <div
              ref={corridorWorldRef}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0px)' }}
            >
              {/* Floor */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: '55%',
                  height: '3000px',
                  background: `linear-gradient(to bottom, ${RED_DARK}, ${RED_DEEP})`,
                  transform: 'rotateX(60deg)',
                  transformOrigin: 'center top',
                }}
              >
                {/* Floor lines */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={`floor-${i}`}
                    className="absolute left-0 right-0"
                    style={{
                      top: `${i * 150}px`,
                      height: '1px',
                      background: RED,
                      opacity: 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Ceiling */}
              <div
                className="absolute left-0 right-0"
                style={{
                  bottom: '55%',
                  height: '3000px',
                  background: `linear-gradient(to top, ${RED_DEEP}, ${BLACK})`,
                  transform: 'rotateX(-60deg)',
                  transformOrigin: 'center bottom',
                }}
              />

              {/* Left wall */}
              <div
                className="absolute top-0 bottom-0"
                style={{
                  left: '5%',
                  width: '3000px',
                  background: `linear-gradient(to right, ${RED}, ${RED_DARK})`,
                  transform: 'rotateY(-60deg)',
                  transformOrigin: 'left center',
                }}
              >
                {/* Wall panels */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={`lpanel-${i}`}
                    className="absolute top-[10%] bottom-[10%]"
                    style={{
                      left: `${i * 240}px`,
                      width: '1px',
                      background: CREAM,
                      opacity: 0.08,
                    }}
                  />
                ))}
              </div>

              {/* Right wall */}
              <div
                className="absolute top-0 bottom-0"
                style={{
                  right: '5%',
                  width: '3000px',
                  background: `linear-gradient(to left, ${RED}, ${RED_DARK})`,
                  transform: 'rotateY(60deg)',
                  transformOrigin: 'right center',
                }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={`rpanel-${i}`}
                    className="absolute top-[10%] bottom-[10%]"
                    style={{
                      right: `${i * 240}px`,
                      width: '1px',
                      background: CREAM,
                      opacity: 0.08,
                    }}
                  />
                ))}
              </div>

              {/* Ceiling lights */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`light-${i}`}
                  data-light
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    top: '20%',
                    width: '40px',
                    height: '4px',
                    background: CREAM,
                    opacity: 0.6,
                    boxShadow: `0 0 60px 20px ${CREAM}40`,
                    transform: `translateZ(${-i * 400}px)`,
                  }}
                />
              ))}

              {/* Vanishing point marker */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '4px',
                  height: '120px',
                  background: CREAM,
                  opacity: 0.15,
                  transform: 'translateZ(-2000px)',
                }}
              />
            </div>

            {/* HUD text */}
            <div className="absolute bottom-12 left-12 z-10">
              <p style={{ color: CREAM, opacity: 0.3, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase' }}>
                Room 1 — The Corridor
              </p>
            </div>
          </div>
        </section>

        {/* ========== ROOM 2: THE TURN ========== */}
        <section
          ref={turnRef}
          className="relative h-[250vh] w-full"
        >
          <div
            className="w-full h-screen overflow-hidden"
            style={{ perspective: '800px', perspectiveOrigin: '50% 45%' }}
          >
            <div
              ref={turnWorldRef}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0px) rotateY(0deg)' }}
            >
              {/* Floor — cream now */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: '55%',
                  height: '3000px',
                  background: `linear-gradient(to bottom, ${CREAM_DARK}, ${CREAM})`,
                  transform: 'rotateX(60deg)',
                  transformOrigin: 'center top',
                }}
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={`tf-${i}`} className="absolute left-0 right-0" style={{ top: `${i * 180}px`, height: '1px', background: RED, opacity: 0.12 }} />
                ))}
              </div>

              {/* Ceiling — dark */}
              <div
                className="absolute left-0 right-0"
                style={{
                  bottom: '55%',
                  height: '3000px',
                  background: RED_DEEP,
                  transform: 'rotateX(-60deg)',
                  transformOrigin: 'center bottom',
                }}
              />

              {/* Walls — inverted: cream walls */}
              <div
                className="absolute top-0 bottom-0"
                style={{
                  left: '8%', width: '3000px',
                  background: `linear-gradient(to right, ${CREAM}, ${CREAM_DARK})`,
                  transform: 'rotateY(-55deg)', transformOrigin: 'left center',
                }}
              >
                {/* Red stripe accents */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`ts-${i}`} className="absolute" style={{ left: `${i * 350}px`, top: '40%', width: '200px', height: '3px', background: RED, opacity: 0.6 }} />
                ))}
              </div>

              <div
                className="absolute top-0 bottom-0"
                style={{
                  right: '8%', width: '3000px',
                  background: `linear-gradient(to left, ${CREAM}, ${CREAM_DARK})`,
                  transform: 'rotateY(55deg)', transformOrigin: 'right center',
                }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`ts2-${i}`} className="absolute" style={{ right: `${i * 350}px`, top: '40%', width: '200px', height: '3px', background: RED, opacity: 0.6 }} />
                ))}
              </div>

              {/* Corner marker — tall red pillar */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: '15%', bottom: '15%', width: '8px',
                  background: RED,
                  transform: 'translateZ(-600px)',
                  boxShadow: `0 0 40px 10px ${RED}30`,
                }}
              />
            </div>

            <div className="absolute bottom-12 left-12 z-10">
              <p style={{ color: CREAM, opacity: 0.3, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase' }}>
                Room 2 — The Turn
              </p>
            </div>
          </div>
        </section>

        {/* ========== ROOM 3: THE STAIRCASE ========== */}
        <section
          ref={stairsRef}
          className="relative h-[300vh] w-full"
        >
          <div
            className="w-full h-screen overflow-hidden"
            style={{ perspective: '1000px', perspectiveOrigin: '50% 60%' }}
          >
            <div
              ref={stairsWorldRef}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Stair steps */}
              {Array.from({ length: 24 }).map((_, i) => {
                const isEven = i % 2 === 0
                return (
                  <div
                    key={`step-${i}`}
                    data-step
                    className="absolute left-[15%] right-[15%]"
                    style={{
                      top: `${50 + i * 80}px`,
                      height: '60px',
                      background: isEven ? RED : RED_DARK,
                      borderTop: `2px solid ${CREAM}15`,
                      borderLeft: `1px solid ${CREAM}10`,
                      borderRight: `1px solid ${CREAM}10`,
                      transform: `translateZ(${-i * 30}px) rotateX(-5deg)`,
                      transformOrigin: 'center top',
                    }}
                  >
                    {/* Step number */}
                    <span
                      style={{
                        position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                        color: CREAM, opacity: 0.12, fontFamily: 'monospace', fontSize: '48px', fontWeight: 700,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )
              })}

              {/* Left railing */}
              <div
                className="absolute"
                style={{
                  left: '15%', top: 0, bottom: 0, width: '2px',
                  background: `linear-gradient(to bottom, ${CREAM}40, ${CREAM}05)`,
                }}
              />
              {/* Right railing */}
              <div
                className="absolute"
                style={{
                  right: '15%', top: 0, bottom: 0, width: '2px',
                  background: `linear-gradient(to bottom, ${CREAM}40, ${CREAM}05)`,
                }}
              />
            </div>

            <div className="absolute bottom-12 left-12 z-10">
              <p style={{ color: CREAM, opacity: 0.3, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase' }}>
                Room 3 — The Staircase
              </p>
            </div>

            {/* Ascending indicator */}
            <div className="absolute top-12 right-12 z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
                <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke={CREAM} strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </section>

        {/* ========== ROOM 4: THE VAULT ========== */}
        <section
          ref={vaultRef}
          className="relative h-[400vh] w-full"
        >
          <div
            className="w-full h-screen overflow-hidden"
            style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
          >
            <div
              ref={vaultWorldRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Room shell — back wall */}
              <div
                className="absolute"
                style={{
                  width: '160vw', height: '160vh',
                  left: '-30vw', top: '-30vh',
                  background: `radial-gradient(ellipse at center, ${RED_DARK}, ${RED_DEEP})`,
                  transform: 'translateZ(-800px)',
                }}
              />

              {/* Floor plane */}
              <div
                className="absolute"
                style={{
                  width: '200vw', height: '1200px',
                  left: '-50vw', top: '52%',
                  background: `linear-gradient(to bottom, ${RED_DEEP}, ${BLACK})`,
                  transform: 'rotateX(70deg)',
                  transformOrigin: 'center top',
                }}
              />

              {/* Print names on the walls — left column */}
              <div
                className="absolute"
                style={{
                  left: '8%', top: '15%', bottom: '25%',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {PRINT_NAMES.slice(0, 12).map((name, i) => (
                  <div
                    key={name}
                    data-vault-name
                    style={{
                      color: i % 3 === 0 ? CREAM : RED,
                      fontFamily: 'monospace',
                      fontSize: i % 4 === 0 ? '32px' : i % 3 === 0 ? '18px' : '14px',
                      fontWeight: i % 4 === 0 ? 700 : 400,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      opacity: i % 4 === 0 ? 0.9 : 0.4,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>

              {/* Print names — right column */}
              <div
                className="absolute"
                style={{
                  right: '8%', top: '15%', bottom: '25%',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                {PRINT_NAMES.slice(12).map((name, i) => (
                  <div
                    key={name}
                    data-vault-name
                    style={{
                      color: i % 3 === 1 ? CREAM : RED,
                      fontFamily: 'monospace',
                      fontSize: i % 4 === 1 ? '32px' : i % 3 === 0 ? '18px' : '14px',
                      fontWeight: i % 4 === 1 ? 700 : 400,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      opacity: i % 4 === 1 ? 0.9 : 0.4,
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>

              {/* Central floating frame — the "featured" piece */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: 'translate(-50%, -50%) translateZ(-200px)' }}
              >
                <div
                  style={{
                    width: '280px', height: '380px',
                    border: `2px solid ${CREAM}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Inner red rectangle */}
                  <div style={{ width: '240px', height: '340px', background: RED, opacity: 0.8 }} />
                  {/* Label */}
                  <span
                    style={{
                      position: 'absolute', bottom: '-32px', left: '50%', transform: 'translateX(-50%)',
                      color: CREAM, fontFamily: 'monospace', fontSize: '10px', letterSpacing: '6px',
                      textTransform: 'uppercase', opacity: 0.5, whiteSpace: 'nowrap',
                    }}
                  >
                    24 Original Prints
                  </span>
                </div>
              </div>

              {/* Hanging frames — small red rectangles scattered */}
              {[
                { x: '25%', y: '25%', w: 80, h: 110, z: -300 },
                { x: '70%', y: '20%', w: 100, h: 140, z: -400 },
                { x: '20%', y: '65%', w: 70, h: 95, z: -250 },
                { x: '75%', y: '60%', w: 90, h: 120, z: -350 },
                { x: '40%', y: '18%', w: 60, h: 80, z: -500 },
                { x: '60%', y: '70%', w: 75, h: 100, z: -450 },
              ].map((frame, i) => (
                <div
                  key={`frame-${i}`}
                  className="absolute"
                  style={{
                    left: frame.x, top: frame.y,
                    width: `${frame.w}px`, height: `${frame.h}px`,
                    border: `1px solid ${CREAM}15`,
                    background: `${RED}${i % 2 === 0 ? '60' : '30'}`,
                    transform: `translateZ(${frame.z}px)`,
                  }}
                />
              ))}
            </div>

            <div className="absolute bottom-12 left-12 z-10">
              <p style={{ color: CREAM, opacity: 0.3, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase' }}>
                Room 4 — The Vault
              </p>
            </div>
          </div>
        </section>

        {/* ========== ROOM 5: THE EXIT ========== */}
        <section
          ref={exitRef}
          className="relative h-[200vh] w-full"
        >
          <div className="w-full h-screen overflow-hidden flex items-center justify-center" style={{ background: BLACK }}>
            <div
              ref={exitWorldRef}
              className="flex flex-col items-center gap-8"
            >
              {/* Concentric red rectangles */}
              {[240, 180, 120, 60].map((size, i) => (
                <div
                  key={`exit-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: `${size}px`,
                    height: `${size * 1.35}px`,
                    border: `1px solid ${i === 0 ? CREAM : RED}`,
                    opacity: 0.2 + (i * 0.15),
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Center dot */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: '6px', height: '6px', background: RED }}
              />
            </div>

            <div className="absolute bottom-12 left-12 z-10">
              <p style={{ color: CREAM, opacity: 0.3, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase' }}>
                Room 5 — The Exit
              </p>
            </div>
          </div>
        </section>

        {/* ========== END CARD ========== */}
        <div className="h-screen flex items-center justify-center" style={{ background: BLACK }}>
          <div className="text-center space-y-6">
            <p
              style={{
                color: RED, fontFamily: 'monospace', fontSize: '11px',
                letterSpacing: '8px', textTransform: 'uppercase',
              }}
            >
              Kolkrabbi
            </p>
            <h1
              style={{
                color: CREAM, fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1,
              }}
            >
              Prints
            </h1>
            <p
              style={{
                color: CREAM, opacity: 0.3, fontFamily: 'monospace',
                fontSize: '12px', letterSpacing: '3px',
              }}
            >
              24 originals on archival cotton rag
            </p>
            <div className="pt-8">
              <a
                href="/prints"
                style={{
                  display: 'inline-block', padding: '12px 32px',
                  border: `1px solid ${RED}`,
                  color: CREAM, fontFamily: 'monospace', fontSize: '11px',
                  letterSpacing: '4px', textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.target.style.background = RED; e.target.style.color = CREAM }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = CREAM }}
              >
                Browse Collection
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
