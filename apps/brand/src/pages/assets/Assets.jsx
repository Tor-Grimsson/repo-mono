import usePageTitle from '../../components/hooks/usePageTitle'
import Overview from './Overview'
import Logos from './Logos'
import Graphics from './Graphics'
import Patterns from './Patterns'
import Branded from './Branded'
import Stationery from './Stationery'
import Labels from './Labels'
import Bags from './Bags'
import Packaging from './Packaging'
import Social from './Social'
import Profile from './Profile'

/* ONE scrolling page (user ruling 2026-08-24) — see pages/brand/Brand.jsx. */
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
      <Labels />
      <Bags />
      <Packaging />
      <Social />
      <Profile />
    </>
  )
}
