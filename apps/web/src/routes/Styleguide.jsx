import { Routes, Route, Navigate } from 'react-router-dom'
import StyleguideLayout from '../components/styleguide/layout/StyleguideLayout'
import Home from './styleguide/Home'
import Introduction from './styleguide/Introduction'
import Logo from './styleguide/Logo'
import Colors from './styleguide/Colors'
import Typography from './styleguide/Typography'
import Icons from './styleguide/Icons'
import TypeReport from './styleguide/TypeReport'
import Foundations from './styleguide/Foundations'
import Components from './styleguide/Components'
import ComponentsAtoms from './styleguide/ComponentsAtoms'
import ComponentsMolecules from './styleguide/ComponentsMolecules'
import ComponentsOrganisms from './styleguide/ComponentsOrganisms'
import Animations from './styleguide/Animations'
import Spacing from './styleguide/Spacing'
import Prose from './styleguide/Prose'
import HomeApparat from './styleguide/HomeApparat'
import ApparatusCircleGenerator from './styleguide/ApparatusCircleGenerator'
import ApparatusFrequencyModulator from './styleguide/ApparatusFrequencyModulator'
import Documentations from './styleguide/Documentations'

const Styleguide = () => {
  return (
    <Routes>
      <Route element={<StyleguideLayout />}>
        <Route index element={<Home />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="logo" element={<Logo />} />
        <Route path="colors" element={<Colors />} />
        <Route path="foundations" element={<Foundations />} />
        <Route path="typography" element={<Typography />} />
        <Route path="prose" element={<Prose />} />
        <Route path="apparatus" element={<HomeApparat />} />
        <Route path="apparatus/circle-generator" element={<ApparatusCircleGenerator />} />
        <Route path="apparatus/frequency-modulator" element={<ApparatusFrequencyModulator />} />
        <Route path="apparatus/wavy-circle" element={<Navigate to="apparatus/circle-generator" replace />} />
        <Route path="icons" element={<Icons />} />
        <Route path="type-report" element={<TypeReport />} />
        <Route path="components/atoms" element={<ComponentsAtoms />} />
        <Route path="components/molecules" element={<ComponentsMolecules />} />
        <Route path="components/organisms" element={<ComponentsOrganisms />} />
        <Route path="components" element={<Components />} />
        <Route path="animations" element={<Animations />} />
        <Route path="spacing" element={<Spacing />} />
        <Route path="docs" element={<Documentations />} />
      </Route>
    </Routes>
  )
}

export default Styleguide
