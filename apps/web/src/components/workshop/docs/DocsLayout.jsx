const join = (...classes) => classes.filter(Boolean).join(' ')

export const DocsLayout = ({ children }) => <>{children}</>

export const DocsNavColumn = ({ children, sticky = false, className }) => {
  return (
    <aside className={join('flex-shrink-0', className)}>
      <div className="py-8 pr-8">{children}</div>
    </aside>
  )
}

export const DocsMainColumn = ({ children, className }) => (
  <main className={join('', className)}>
    <div className="py-8">
      {children}
    </div>
  </main>
)

export const DocsTocColumn = ({ children, className }) => (
  <aside className={join('flex-shrink-0', className)}>
    <div className="py-8 pl-8">{children}</div>
  </aside>
)

export default DocsLayout
