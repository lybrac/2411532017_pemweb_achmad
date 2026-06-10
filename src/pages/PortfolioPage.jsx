import { useState, useRef, useCallback } from 'react';
import Aurora from '../components/Aurora';
import './PortfolioPage.css';

const categories = [
  { key: 'all', label: 'Semua',      icon: 'bi-grid' },
  { key: 'web', label: 'Web Design', icon: 'bi-code-slash' },
  { key: 'game',label: 'Game',       icon: 'bi-controller' },
  { key: 'other',label: 'Lainnya',   icon: 'bi-box' },
];

const projects = [
  {
    title: 'Landing Page Modern',
    category: 'web',
    img: 'https://picsum.photos/id/13/600/400',
    desc: 'UI/UX responsif dengan animasi scroll dan desain modern.',
    tags: ['HTML', 'CSS', 'JS'],
    icon: 'bi-window',
  },
  {
    title: 'Game RPG Sederhana',
    category: 'game',
    img: 'https://picsum.photos/id/96/600/400',
    desc: 'Turn-based combat dengan JavaScript murni.',
    tags: ['JavaScript', 'Canvas'],
    icon: 'bi-joystick',
  },
  {
    title: 'Remastering Ubuntu',
    category: 'other',
    img: 'https://picsum.photos/id/2/600/400',
    desc: 'Kustomisasi ISO Linux untuk keperluan edukasi.',
    tags: ['Linux', 'Shell'],
    icon: 'bi-terminal',
  },
  {
    title: 'Progressive Web App',
    category: 'web',
    img: 'https://picsum.photos/id/26/600/400',
    desc: 'PWA dengan offline support dan push notification.',
    tags: ['React', 'PWA', 'SW'],
    icon: 'bi-phone',
  },
  {
    title: 'Game Hackathon 2024',
    category: 'game',
    img: 'https://picsum.photos/id/155/600/400',
    desc: 'Game 2D platformer dibuat dalam 24 jam hackathon.',
    tags: ['Unity', 'C#'],
    icon: 'bi-trophy',
  },
  {
    title: 'Aplikasi Manajemen Tugas',
    category: 'other',
    img: 'https://picsum.photos/id/0/600/400',
    desc: 'Java GUI + database MySQL untuk manajemen tugas (PBO).',
    tags: ['Java', 'MySQL', 'Swing'],
    icon: 'bi-kanban',
  },
];

/* ── Portfolio Card with Spotlight ── */
const PortfolioCard = ({ project, onClick, visible }) => {
  const cardRef = useRef(null);
  const [pos,     setPos]     = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`pf-card ${visible ? 'pf-card-visible' : ''}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Spotlight */}
      <div className="pf-spotlight" style={{
        opacity: hovered ? 1 : 0,
        background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px,
          rgba(197,165,114,0.13) 0%, rgba(197,165,114,0.04) 45%, transparent 70%)`,
      }} />

      {/* Image */}
      <div className="pf-img-wrap">
        <img src={project.img} alt={project.title} className="pf-img" />
        <div className="pf-img-overlay" />
        {/* Category icon */}
        <div className="pf-icon-badge">
          <i className={`bi ${project.icon}`} />
        </div>
      </div>

      {/* Content */}
      <div className="pf-content">
        <h5 className="pf-title">{project.title}</h5>
        <p className="pf-desc">{project.desc}</p>
        <div className="pf-tags">
          {project.tags.map(t => <span key={t} className="pf-tag">{t}</span>)}
        </div>
        <div className="pf-footer">
          <span className="pf-detail-link">
            Lihat Detail <i className="bi bi-arrow-right pf-arrow" />
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <span className="pf-corner pf-corner-tl" />
      <span className="pf-corner pf-corner-br" />

      {/* Bottom reveal line */}
      <div className="pf-bottom-line" />
    </div>
  );
};

/* ── Modal ── */
const DetailModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="pf-modal-backdrop" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <button className="pf-modal-close" onClick={onClose}>
          <i className="bi bi-x-lg" />
        </button>

        <img src={project.img} alt={project.title} className="pf-modal-img" />
        <div className="pf-modal-overlay" />

        <div className="pf-modal-body">
          <div className="pf-modal-icon">
            <i className={`bi ${project.icon}`} />
          </div>
          <h3 className="pf-modal-title">{project.title}</h3>
          <p className="pf-modal-desc">{project.desc}</p>
          <div className="pf-modal-tags">
            {project.tags.map(t => <span key={t} className="pf-tag">{t}</span>)}
          </div>
        </div>

        <span className="pf-corner pf-corner-tl" />
        <span className="pf-corner pf-corner-br" />
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selected,     setSelected]     = useState(null);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="pf-page">

      {/* ── Hero ── */}
      <section className="pf-hero">
        <Aurora />
        <div className="pf-hero-overlay" />
        <div className="container pf-hero-content">
          <span className="pf-eyebrow">✦ &nbsp; My Work</span>
          <h1 className="pf-hero-title">
            Portfolio <span className="pf-gold">Saya</span>
          </h1>
          <p className="pf-hero-sub">Koleksi proyek yang telah saya kerjakan.</p>
          <div className="pf-title-line" />
        </div>
      </section>

      {/* ── Main ── */}
      <section className="pf-main">
        <div className="container">

          {/* Filter buttons */}
          <div className="pf-filter-wrap" data-aos="fade-up">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`pf-filter-btn ${activeFilter === cat.key ? 'pf-filter-active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                <i className={`bi ${cat.icon}`} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="pf-grid">
            {filtered.map((p, i) => (
              <div key={p.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <PortfolioCard
                  project={p}
                  onClick={setSelected}
                  visible={true}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      <DetailModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default PortfolioPage;
