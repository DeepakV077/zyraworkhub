import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Webinars from './pages/Webinars';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import SpeakerApplication from './pages/SpeakerApplication';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileSetup from './pages/ProfileSetup';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/speakers/apply" element={<SpeakerApplication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
