const join = (...classes) => classes.filter(Boolean).join(' ')

export const DocsLayout = ({ children, className }) => (
  <div className={join('docs-layout', className)}>{children}</div>
)

export const DocsNavColumn = ({ children, sticky = false, className }) => {
  const content = sticky ? (
    <div className="docs-column-navSticky">{children}</div>
  ) : (
    children
  )

  return <aside className={join('docs-column-nav', className)}>{content}</aside>
}

export const DocsMainColumn = ({ children, className }) => (
  <main className={join('docs-column-main', className)}>{children}</main>
)

export const DocsTocColumn = ({ children, className }) => (
  <aside className={join('docs-column-toc', className)}>{children}</aside>
)

export default DocsLayout
