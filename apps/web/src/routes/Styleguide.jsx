import { Routes, Route, Navigate } from 'react-router-dom'
import StyleguideLayout from '../components/styleguide/layout/StyleguideLayout'
import Introduction from './styleguide/Introduction'
import Logo from './styleguide/Logo'
import Colors from './styleguide/Colors'
import Typography from './styleguide/Typography'
import Icons from './styleguide/Icons'
import TypeReport from './styleguide/TypeReport'
import Components from './styleguide/Components'
import ComponentsAtoms from './styleguide/ComponentsAtoms'
import ComponentsMolecules from './styleguide/ComponentsMolecules'
import ComponentsOrganisms from './styleguide/ComponentsOrganisms'
import Animations from './styleguide/Animations'
import Spacing from './styleguide/Spacing'
import Prose from './styleguide/Prose'
import ApparatusWavyCircle from './styleguide/ApparatusWavyCircle'

const Styleguide = () => {
  return (
    <Routes>
      <Route element={<StyleguideLayout />}>
        <Route index element={<Introduction />} />
        <Route path="logo" element={<Logo />} />
        <Route path="colors" element={<Colors />} />
        <Route path="typography" element={<Typography />} />
        <Route path="prose" element={<Prose />} />
        <Route path="apparatus/wavy-circle" element={<ApparatusWavyCircle />} />
        <Route path="apparatus" element={<Navigate to="apparatus/wavy-circle" replace />} />
        <Route path="icons" element={<Icons />} />
        <Route path="type-report" element={<TypeReport />} />
        <Route path="components/atoms" element={<ComponentsAtoms />} />
        <Route path="components/molecules" element={<ComponentsMolecules />} />
        <Route path="components/organisms" element={<ComponentsOrganisms />} />
        <Route path="components" element={<Navigate to="components/atoms" replace />} />
        <Route path="animations" element={<Animations />} />
        <Route path="spacing" element={<Spacing />} />
      </Route>
    </Routes>
  )
}

export default Styleguide
