// Home.jsx - Migrated from _nav-ref/kolkrabbi-home
import HeroSection from '../components/sections/home/HeroSection'
import About from '../components/sections/home/About'
import Features from '../components/sections/home/Features'
import Story from '../components/sections/home/Story'
import WorkCard from '../components/sections/home/WorkCard'
import CtaHome from '../components/sections/cta/CtaHome'
import CmsCard from '../components/sections/blog/CmsCard'

const Home = ({ onVideoStart }) => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white">
        <HeroSection onVideoStart={onVideoStart} />
        <About />
      </div>
      <Features />
      <Story />
      <WorkCard />
      <CtaHome />
      <CmsCard />
    </main>
  )
}

export default Home
