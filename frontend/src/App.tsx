import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Webinars from './pages/Webinars';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import SpeakerApplication from './pages/SpeakerApplication';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import DesignStudio from './pages/Design-studio';
import Marketing from './pages/Marketing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/design-studio" element={<DesignStudio />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/speakers/apply" element={<SpeakerApplication />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
