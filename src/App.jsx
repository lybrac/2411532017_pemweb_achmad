import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import CarouselSection from './components/CarouselSection';
import LaprakSection from './components/LaprakSection';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import './components/components.css';

const HomePage = () => (
  <>
    <HeroSection />
    <ServicesSection />
    <CarouselSection />
    <LaprakSection />
  </>
);

function App() {
  const [theme, setTheme]     = useState(() => localStorage.getItem('theme') || 'dark');
  const [showTop, setShowTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: 'ease-out', offset: 80 });
    AOS.refresh();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {loading && (
        <div style={{
          position: 'fixed', inset: 0, background: '#0a192f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div className="spinner-border" style={{ color: '#c5a572', width: '2.5rem', height: '2.5rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/contact"   element={<ContactPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>

      <Footer />

      {showTop && (
        <button className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke atas">
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

export default App;
