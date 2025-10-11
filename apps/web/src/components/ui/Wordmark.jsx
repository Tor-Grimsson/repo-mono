const Wordmark = ({ className = '', title = 'Kolkrabbi wordmark' }) => {
  return (
    <img
      src="/svg/wordmark.svg"
      alt={title}
      className={className ? `wordmarkBrand ${className}` : "wordmarkBrand"}
      aria-hidden={title ? undefined : true}
    />
  )
}

export default Wordmark
