import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Webinars from './pages/Webinars';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import SpeakerApplication from './pages/SpeakerApplication';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/speakers/apply" element={<SpeakerApplication />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
