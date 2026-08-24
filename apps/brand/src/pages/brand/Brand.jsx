import usePageTitle from '../../components/hooks/usePageTitle'
import Overview from './Overview'
import About from './About'
import Tone from './Tone'
import Look from './Look'
import Logo from './Logo'
import Lockups from './Lockups'
import Color from './Color'
import Typography from './Typography'

/* ONE scrolling page (user ruling 2026-08-24). The sidebar's Brand rows are
 * SECTIONS of this page — `/brand#about` etc., scroll-spied in BrandLayout —
 * not routes. The section files stay one-per-file; this only stacks them. */
export default function Brand() {
  usePageTitle('Brand') // parent effect runs last, so it wins over the sections' own titles

  return (
    <>
      <Overview />
      <About />
      <Tone />
      <Look />
      <Logo />
      <Lockups />
      <Color />
      <Typography />
    </>
  )
}
