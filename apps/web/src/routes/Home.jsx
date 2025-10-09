// Home.jsx - Migrated from _nav-ref/kolkrabbi-home
import HeroSection from '../components/sections/home/HeroSection'
import About from '../components/sections/home/About'
import Features from '../components/sections/home/Features'
import Story from '../components/sections/home/Story'
import CtaHome from '../components/sections/cta/CtaHome'
import CmsCard from '../components/sections/blog/CmsCard'

const Home = ({ onVideoStart }) => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSection onVideoStart={onVideoStart} />
      <About />
      <Features />
      <Story />
      <CtaHome />
      <CmsCard />
    </main>
  )
}

export default Home
