import StackHero from './StackHero'

const StackHeroTall = ({
  containerClassName = 'relative px-8 lg:px-14 pb-32 sm:pb-40 lg:pb-48 xl:pb-56 flex items-end lg:justify-center min-h-[90vh] overflow-hidden kol-full-bleed',
  contentClassName,
  ...rest
}) => {
  return (
    <StackHero
      {...rest}
      containerClassName={containerClassName}
      contentClassName={contentClassName}
    />
  )
}

export default StackHeroTall
