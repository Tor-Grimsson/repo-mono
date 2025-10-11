import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Post from './pages/Post';
import About from './pages/About';
import Styles from './pages/Styles';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post" element={<Post />} />
          <Route path="about" element={<About />} />
          <Route path="styles" element={<Styles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
