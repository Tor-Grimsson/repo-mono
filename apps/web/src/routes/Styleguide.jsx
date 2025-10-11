import { Routes, Route } from 'react-router-dom'
import StyleguideLayout from '../components/styleguide/layout/StyleguideLayout'
import Introduction from './styleguide/Introduction'
import Logo from './styleguide/Logo'
import Colors from './styleguide/Colors'
import Typography from './styleguide/Typography'
import Components from './styleguide/Components'
import Spacing from './styleguide/Spacing'

const Styleguide = () => {
  return (
    <Routes>
      <Route element={<StyleguideLayout />}>
        <Route index element={<Introduction />} />
        <Route path="logo" element={<Logo />} />
        <Route path="colors" element={<Colors />} />
        <Route path="typography" element={<Typography />} />
        <Route path="components" element={<Components />} />
        <Route path="spacing" element={<Spacing />} />
      </Route>
    </Routes>
  )
}

export default Styleguide
