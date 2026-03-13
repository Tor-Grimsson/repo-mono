import { motion, useTransform, useSpring } from 'framer-motion'
import { useBentoTiltMotion } from '../../hooks/useBentoTiltMotion'

/**
 * TiltCard
 *
 * Self-contained card with Motion spring-based 3D tilt effect
 *
 * Variants:
 * - default: center-pivot tilt
 * - grounded: bottom-anchored, top tilts toward viewer on hover
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string} className - Additional classes for the container
 * @param {string} variant - 'default' | 'grounded'
 * @param {ReactNode} children - Optional overlay content
 */
export default function TiltCard({ src, alt = '', className = '', variant = 'default', children }) {
  const tiltProps = useBentoTiltMotion()
  const isGrounded = variant === 'grounded'

  // Zone-based tilt: snap target to 3 positions, lazy spring catches up slowly
  const zones = 3
  const snap = (v) => Math.round(v * zones) / zones
  const lazySpring = { stiffness: 250, damping: 25, mass: 0.6 }

  const targetX = useTransform(tiltProps.style.rotateX, (v) => isGrounded ? Math.min(0, snap(-v / 4) * 2.5) : v)
  const targetY = useTransform(tiltProps.style.rotateY, (v) => isGrounded ? snap(v / 4) * 2.5 : v)

  const lazyRotateX = useSpring(targetX, lazySpring)
  const lazyRotateY = useSpring(targetY, lazySpring)

  const style = isGrounded
    ? { ...tiltProps.style, rotateX: lazyRotateX, rotateY: lazyRotateY, transformOrigin: 'center bottom' }
    : tiltProps.style

  return (
    <motion.div
      className={`relative ${className}`}
      {...tiltProps}
      style={style}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {children}
    </motion.div>
  )
}
