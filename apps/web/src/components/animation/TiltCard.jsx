import { motion } from 'framer-motion'
import { useBentoTiltMotion } from '../../hooks/useBentoTiltMotion'

/**
 * TiltCard
 *
 * Self-contained card with Motion spring-based 3D tilt effect
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string} className - Additional classes for the container
 * @param {ReactNode} children - Optional overlay content
 */
export default function TiltCard({ src, alt = '', className = '', children }) {
  const tiltProps = useBentoTiltMotion()

  return (
    <motion.div
      className={`relative ${className}`}
      {...tiltProps}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </motion.div>
  )
}
