const join = (...classes) => classes.filter(Boolean).join(' ')

export const DocsLayout = ({ children, className }) => (
  <div
    className={join(
      'grid gap-8 lg:grid-cols-[256px_minmax(0,1fr)] xl:grid-cols-[256px_minmax(0,1fr)_256px]',
      className
    )}
  >
    {children}
  </div>
)

export const DocsNavColumn = ({ children, className }) => {
  return (
    <aside className={join('flex-shrink-0 pt-8 pr-8', className)}>
      {children}
    </aside>
  )
}

export const DocsMainColumn = ({ children, className }) => (
  <main className={join('', className)}>
    <div className="pt-12 pb-8">
      {children}
    </div>
  </main>
)

export const DocsTocColumn = ({ children, className }) => (
  <aside className={join('flex-shrink-0 pt-8 pl-8', className)}>
    {children}
  </aside>
)

export default DocsLayout
