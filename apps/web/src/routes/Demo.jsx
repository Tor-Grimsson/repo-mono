import ButtonSidebarDemo from '../components/demo/ButtonSidebarDemo.jsx'
import FlexSidebar from '../components/demo/FlexSidebar.jsx'
import ListSidebarDemo from '../components/demo/ListSidebarDemo.jsx'

const Demo = () => {
  return (
    <div className="min-h-screen bg-surface-primary text-auto">
      <main className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16">
        <header className="space-y-3">
          <h1 className="kol-heading-section">Sidebar Patterns Sandbox</h1>
          <p className="kol-mono-sm-fine text-fg-64">
            Quick comparison of three navigation approaches before we replace the production
            sidebar. Each card renders live against the styleguide data.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <ButtonSidebarDemo />
          <ListSidebarDemo />
          <FlexSidebar />
        </section>
      </main>
    </div>
  )
}

export default Demo
