import { useState } from 'react';
import BounceCards from './BounceCards';
import './LaprakSection.css';

const laprakData = [
  {
    id: 1, number: '01',
     title: 'Instalasi Laravel',
      subtitle: 'Framework Web',
    desc: ' Instalasi, Routing & Pengenalan MVC laravel.',
    href: 'laprak1.html', icon: 'bi-diagram-2', tags: ['PHP', 'Laravel', 'MVC'],
  },
  {
    id: 2, number: '02', title: 'Migration,Seeding,Routing', subtitle: 'Algoritma & Struktur',
    desc: 'Migration, Seeding, Routing, Model, Controller.',
    href: 'laprak2.html', icon: 'bi-database', tags: ['C++', 'Algorithm', 'Data Structure'],
  },
  {
    id: 3, number: '03', title: 'Laravel Relationship', subtitle: 'Database Relasional',
    desc: 'Relationship dalam Laravel.',
    href: 'laprak3.html', icon: 'bi-share', tags: ['Eloquent', 'MySQL', 'ORM'],
  },
  {
    id: 4, number: '04', title: 'Algoritma', subtitle: 'Problem Solving',
    desc: 'Implementasi sorting, searching, dan optimasi algoritma pada berbagai kasus pemrograman.',
    href: 'laprak4.html', icon: 'bi-cpu', tags: ['Java', 'Sorting', 'Searching'],
  },
  {
    id: 5, number: '05', title: 'Laravel API', subtitle: 'RESTful API',
    desc: 'Membangun RESTful API menggunakan Laravel dengan autentikasi dan dokumentasi lengkap.',
    href: 'prak5.html', icon: 'bi-plug', tags: ['API', 'REST', 'Laravel'],
  },
  {
    id: 6, number: '06', title: 'Algoritma Lanjutan', subtitle: 'Advanced Algorithm',
    desc: 'Eksplorasi algoritma lanjutan seperti dynamic programming, graph, dan greedy algorithm.',
    href: 'prak6.html', icon: 'bi-diagram-2', tags: ['Java', 'Graph', 'DP'],
  },
];

// Konten tiap kartu BounceCards
const cardNodes = laprakData.map(item => (
  <div key={item.id} className="bc-card-content">
    <span className="bc-card-num">{item.number}</span>
    <i className={`bi ${item.icon} bc-card-icon`} />
    <span className="bc-card-label">{item.title}</span>
  </div>
));

const transformStyles = [
  'rotate(10deg) translate(-250px)',
  'rotate(5deg)  translate(-145px)',
  'rotate(-3deg) translate(-42px)',
  'rotate(-8deg) translate( 62px)',
  'rotate( 4deg) translate(165px)',
  'rotate(-6deg) translate(270px)',
];

const LaprakSection = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const handleCardClick = (idx) => {
    setActiveIdx(prev => (prev === idx ? null : idx));
  };

  const active = activeIdx !== null ? laprakData[activeIdx] : null;

  return (
    <section id="laprak" className="lp-section">
      <div className="lp-ambient" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div className="lp-heading-wrap" data-aos="fade-up">
          <span className="lp-eyebrow">✦ &nbsp; Academic Work</span>
          <h3 className="lp-title">
            <i className="bi bi-files" style={{ marginRight: '10px' }}></i>
            Laporan Praktikum
          </h3>
          <div className="lp-title-line" />
          <p className="lp-hint">Klik kartu untuk melihat detail</p>
        </div>

        {/* BounceCards */}
        <div className="lp-cards-wrap" data-aos="fade-up" data-aos-delay="100">
          <BounceCards
            images={cardNodes}
            containerWidth={1400}
            containerHeight={330}
            animationDelay={0.6}
            animationStagger={0.1}
            easeType="elastic.out(1, 0.55)"
            transformStyles={transformStyles}
            enableHover
            onCardClick={handleCardClick}
            activeIndex={activeIdx}
          />
        </div>

        {/* Detail Panel */}
        <div className={`lp-detail ${active ? 'lp-detail-open' : ''}`}>
          {active && (
            <div className="lp-detail-inner">
              <button className="lp-detail-close" onClick={() => setActiveIdx(null)}>
                <i className="bi bi-x-lg"></i>
              </button>

              <div className="lp-detail-left">
                <div className="lp-detail-icon-ring">
                  <i className={`bi ${active.icon} lp-detail-icon`} />
                </div>
                <span className="lp-detail-big-num">{active.number}</span>
              </div>

              <div className="lp-detail-right">
                <span className="lp-detail-subtitle">{active.subtitle}</span>
                <h4 className="lp-detail-title">
                  Laprak {active.number} — {active.title}
                </h4>
                <p className="lp-detail-desc">{active.desc}</p>
                <div className="lp-detail-tags">
                  {active.tags.map(t => <span key={t} className="lp-tag">{t}</span>)}
                </div>
                <a href={active.href} target="_blank" rel="noreferrer" className="lp-detail-btn">
                  <i className="bi bi-box-arrow-up-right"></i>
                  Buka Laporan
                  <i className="bi bi-arrow-right lp-btn-arrow"></i>
                </a>
              </div>

              <span className="lp-d-corner lp-d-corner-tl" />
              <span className="lp-d-corner lp-d-corner-br" />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default LaprakSection;