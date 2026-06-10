import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './components.css';

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'About',     to: '/about' },
  { label: 'Contact',   to: '/contact' },
  { label: 'Portfolio', to: '/portfolio' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (to) => location.pathname === to;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '8px 0' : '18px 0',
      background: scrolled ? 'var(--bg-nav)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.15)' : 'none',
      transition: 'padding 0.4s ease, background 0.4s ease, box-shadow 0.4s ease',
    }}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">

          {/* Brand */}
          <Link to="/" style={{
            fontSize: '1.55rem', fontWeight: 700,
            color: 'var(--text-nav)', textDecoration: 'none', letterSpacing: '0.04em',
          }}>
            Achmad<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          {/* Desktop pill */}
          <div className="d-none d-lg-flex align-items-center gap-1" style={{
            background: 'var(--bg-nav-pill)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid var(--border)', borderRadius: '50px', padding: '5px 10px',
          }}>
            {navLinks.map(link => (
              <Link key={link.label} to={link.to} className="nav-pill-link"
                style={{ color: isActive(link.to) ? 'var(--accent)' : 'var(--text-nav)',
                         fontWeight: isActive(link.to) ? 600 : 500 }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="d-flex align-items-center gap-3">
            <button className="nav-theme-btn" onClick={toggleTheme}>
              <i className={`bi ${theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
              <span className="d-none d-sm-inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
            <button className="d-lg-none" onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'transparent', border: 'none',
                       color: 'var(--text-nav)', fontSize: '1.6rem', cursor: 'pointer', lineHeight: 1 }}>
              <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '300px' : '0',
          transition: 'max-height 0.4s cubic-bezier(0.25,0.8,0.25,1)',
        }}>
          <div style={{
            marginTop: '10px', padding: '10px',
            background: 'var(--bg-nav)', backdropFilter: 'blur(20px)',
            borderRadius: '16px', border: '1px solid var(--border)',
          }}>
            {navLinks.map(link => (
              <Link key={link.label} to={link.to} className="nav-mobile-link"
                style={{ color: isActive(link.to) ? 'var(--accent)' : 'var(--text-nav)',
                         fontWeight: isActive(link.to) ? 600 : 500 }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
