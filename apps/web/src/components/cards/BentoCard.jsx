import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@kolkrabbi/kol-component'
import { Link } from 'react-router-dom'
import { useBentoTilt } from '../../hooks/useBentoTilt'
import { useBentoTiltMotion } from '../../hooks/useBentoTiltMotion'
import { useIsTouchDevice } from '../../hooks/useIsTouchDevice'
import HlsVideo from '../media/HlsVideo'

const BentoCard = ({
  src,
  poster,
  title,
  subtitle,
  description,
  titleClassName = 'kol-sans-heading-02 text-light-fixed uppercase',
  contentClassName = 'max-w-[384px]',
  imageClassName = 'object-cover object-center',
  href,
  overlayOpacity = 60,
  alignRight = false,
  className = '',
  useMotion = false,
  enableTilt = true,
  buttonLabel = 'View Project',
  contentStackClassName = 'relative z-20 h-full flex flex-col justify-start items-start gap-4 p-6 md:p-8',
  bodyContent = null,
  ...rest
}) => {
  const isTouchDevice = useIsTouchDevice()
  const tiltPropsCss = useBentoTilt()
  const tiltPropsMotion = useBentoTiltMotion()
  const tiltProps = useMotion ? tiltPropsMotion : tiltPropsCss
  const { style: tiltStyle = {}, ...tiltRest } = tiltProps || {}
  const shouldTilt = enableTilt && !isTouchDevice
  const Component = useMotion ? motion.div : 'div'
  const videoRef = useRef(null)
  const isVideo = src && /\.(mov|mp4|webm)$/i.test(src)
  const isHls = src && /\.m3u8$/i.test(src)

  return (
    <Component
      className={`relative group ${alignRight ? 'ms-auto' : 'size-full'} ${className}`}
      {...(shouldTilt ? tiltRest : {})}
      {...rest}
      style={{
        ...(shouldTilt ? tiltStyle : {}),
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {isHls ? (
        <HlsVideo
          src={src}
          poster={poster}
          className={`absolute left-0 top-0 size-full rounded overflow-hidden ${imageClassName} ${isTouchDevice ? 'pointer-events-none' : ''}`}
        />
      ) : isVideo ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute left-0 top-0 size-full rounded overflow-hidden ${imageClassName} ${isTouchDevice ? 'pointer-events-none' : ''}`}
        />
      ) : src ? (
        <img
          src={src}
          alt=""
          className={`absolute left-0 top-0 size-full rounded overflow-hidden ${imageClassName} ${isTouchDevice ? 'pointer-events-none' : ''}`}
        />
      ) : (
        <div className="absolute left-0 top-0 size-full rounded bg-surface-secondary" />
      )}
      <div className="relative z-10 flex size-full h-full flex-col justify-start items-start text-auto">
        <div className={`relative z-10 ${contentClassName} w-full h-full self-stretch`}>
          {overlayOpacity > 0 && (
            <div
              className={`absolute -inset-1 rounded ${isTouchDevice ? 'opacity-60' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 pointer-events-none`}
              style={{
                backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
              }}
            />
          )}
          <div className={contentStackClassName}>
            {title && (
              <h1 className={titleClassName}>{title}</h1>
            )}
            {subtitle && (
              <p className={`kol-mono-14 text-light-fixed ${isTouchDevice ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>{subtitle}</p>
            )}
            {description && (
              <p className={`kol-mono-10 text-light-fixed pb-6 ${isTouchDevice ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>{description}</p>
            )}
            {bodyContent}
            {href && (
              <div className={`${isTouchDevice ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                {href.startsWith('http') || href.startsWith('mailto') ? (
                  <Button href={href} variant="primary" size="sm">
                    {buttonLabel}
                  </Button>
                ) : (
                  <Link to={href}>
                    <Button variant="primary" size="sm">
                      {buttonLabel}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Component>
  )
}

export default BentoCard
