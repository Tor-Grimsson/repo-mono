import usePageTitle from '../../components/hooks/usePageTitle'
import Overview from './Overview'
import Logos from './Logos'
import Graphics from './Graphics'
import Patterns from './Patterns'
import Branded from './Branded'
import Stationery from './Stationery'
import Social from './Social'
import Profile from './Profile'

/* ONE scrolling page (user ruling 2026-08-24) — see pages/brand/Brand.jsx.
 * Labels · Bags · Packaging are OFF the live site (brand pass 2026-10-14): fashion-only Another
 * Creation mocks (care labels, hangtags, dress bags, gift boxes) with nothing of Kolkrabbi's to
 * show. Files in `_tmp/2026-10-14-brand-fashion-sections/`. */
export default function Assets() {
  usePageTitle('Assets')

  return (
    <>
      <Overview />
      <Logos />
      <Graphics />
      <Patterns />
      <Branded />
      <Stationery />
      <Social />
      <Profile />
    </>
  )
}
