const LogoLockup = ({ className = '', title = 'Kolkrabbi logo lockup' }) => {
  return (
    <img
      src="/svg/logo-full.svg"
      alt={title}
      className={className ? `wordmarkBrand ${className}` : "wordmarkBrand"}
      aria-hidden={title ? undefined : true}
    />
  )
}

export default LogoLockup
