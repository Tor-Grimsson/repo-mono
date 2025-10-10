import { useBentoTilt } from '../../../hooks/useBentoTilt'

const ComingSoonCard = ({ className = '', ...rest }) => {
  // Call the hook to get the tilt props
  const tiltProps = useBentoTilt()

  return (
    // Spread the props onto the div
    <div
      {...tiltProps}
      className={`bentoItem col-span-1 row-span-1 flex size-full flex-col justify-between p-5 rounded-md overflow-hidden ${className}`}
      style={{ ...tiltProps.style, backgroundColor: 'var(--color-brand-yellow)' }}
      {...rest}
    >
      <h1 className="bentoTitle max-w-64 text-black">
        M<b>o</b>re coming soon!
      </h1>
      <img src="/svg/logo.svg" alt="" className="w-16 h-16 self-end" />
    </div>
  )
}

export default ComingSoonCard
