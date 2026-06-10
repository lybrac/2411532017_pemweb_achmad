import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{
    background: 'var(--footer-bg)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid var(--border)',
    position: 'relative', zIndex: 1,
    padding: '20px 0',
  }}>
    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
      <div>
        <h6 className="mb-1" style={{ color: 'var(--accent)', letterSpacing: '0.05em' }}>
          Achmad Abidy Rahmadhany
        </h6>
        <small style={{ color: 'var(--text-muted)' }}>
          Web Dev · Mahasiswa Informatika UNAND
        </small>
      </div>
      <div className="d-flex gap-4">
        {[
          { href: 'https://github.com/lybrac',                  icon: 'bi-github'    },
          { href: 'https://www.instagram.com/keandra_alfi/',    icon: 'bi-instagram' },
        ].map(({ href, icon }) => (
          <a key={icon} href={href} target="_blank" rel="noreferrer" className="social-link">
            <i className={`bi ${icon}`}></i>
          </a>
        ))}
      </div>
      <small style={{ color: 'var(--text-muted)' }}>
        © 2025 Achmad Abidy – All Rights Reserved
      </small>
    </div>
  </footer>
);

export default Footer;
