import { useMemo } from 'react';
import Aurora from '../components/Aurora';
import './AboutPage.css';

/* ── Data ── */
const skills = [
  { icon: 'bi-filetype-html', label: 'HTML/CSS',       level: 88 },
  { icon: 'bi-filetype-js',   label: 'JavaScript',     level: 75 },
  { icon: 'bi-bootstrap',     label: 'Bootstrap 5',    level: 85 },
  { icon: 'bi-filetype-java', label: 'Java / C++',     level: 70 },
  { icon: 'bi-braces',        label: 'React',          level: 60 },
  { icon: 'bi-palette2',      label: 'UI/UX Canva',    level: 90 },
  { icon: 'bi-server',        label: 'Laravel',        level: 72 },
  { icon: 'bi-git',           label: 'Git',            level: 68 },
];

const timeline = [
  {
    year: '2020–2023',
    icon: 'bi-mortarboard',
    title: 'SMAN 2 Payakumbuh',
    desc: 'Pendidikan menengah atas dengan fokus sains.',
    type: 'edu',
  },
  {
    year: '2022',
    icon: 'bi-trophy',
    title: 'Juara 3 KSN Informatika',
    desc: 'KSN Informatika tingkat Kota Payakumbuh.',
    type: 'award',
  },
  {
    year: '2022',
    icon: 'bi-award',
    title: 'Juara 3 Olimpiade Komputer',
    desc: 'Lustrum UNAND 2022.',
    type: 'award',
  },
  {
    year: '2022',
    icon: 'bi-person-workspace',
    title: 'Pengajar KSN Informatika',
    desc: 'Mengajar siswa sekolah persiapan KSN Informatika.',
    type: 'exp',
  },
  {
    year: '2024',
    icon: 'bi-building',
    title: 'Universitas Andalas',
    desc: 'Mahasiswa aktif Teknik Informatika.',
    type: 'edu',
  },
  {
    year: '2024',
    icon: 'bi-laptop',
    title: 'Memodelkan beberapa model AI',
    desc: 'Membangun dan memodelkan beberapa model AI untuk tugas klasifikasi dan prediksi.',
    type: 'exp',
  },
];

/* ── Skill Badge ── */
const SkillBadge = ({ icon, label, level }) => (
  <div className="ab-skill-badge">
    <div className="ab-skill-icon-wrap">
      <i className={`bi ${icon} ab-skill-icon`} />
    </div>
    <span className="ab-skill-label">{label}</span>
    <div className="ab-skill-bar-wrap">
      <div className="ab-skill-bar" style={{ '--skill-w': `${level}%` }} />
    </div>
    <span className="ab-skill-pct">{level}%</span>
  </div>
);

/* ── Timeline Item ── */
const typeColor = { edu: '#c5a572', award: '#ffd700', exp: '#7ec8e3' };
const TimelineItem = ({ item, idx }) => (
  <div className={`ab-tl-item ${idx % 2 === 0 ? 'ab-tl-left' : 'ab-tl-right'}`} data-aos="fade-up" data-aos-delay={idx * 80}>
    <div className="ab-tl-card">
      <div className="ab-tl-card-glow" />
      <div className="ab-tl-top">
        <div className="ab-tl-icon-wrap" style={{ borderColor: typeColor[item.type] }}>
          <i className={`bi ${item.icon}`} style={{ color: typeColor[item.type] }} />
        </div>
        <span className="ab-tl-year">{item.year}</span>
      </div>
      <h6 className="ab-tl-title">{item.title}</h6>
      <p className="ab-tl-desc">{item.desc}</p>
      <span className="ab-tl-corner-tl" />
      <span className="ab-tl-corner-br" />
    </div>
    <div className="ab-tl-dot" style={{ background: typeColor[item.type], boxShadow: `0 0 12px ${typeColor[item.type]}` }} />
  </div>
);

/* ── Page ── */
const AboutPage = () => {
  const aurora = useMemo(() => (
    <Aurora
      colorStops={['#1a0a2e', '#0a192f', '#c5a572']}
      amplitude={1.1}
      blend={0.55}
      speed={0.35}
    />
  ), []);

  return (
    <div className="ab-page">

      {/* ══ HERO ══ */}
      <section className="ab-hero">
        {aurora}
        <div className="ab-hero-overlay" />

        <div className="container ab-hero-content">
          <div className="row align-items-center gy-5">

            {/* Photo */}
            <div className="col-lg-4 text-center" data-aos="zoom-in">
              <div className="ab-photo-wrap">
                <div className="ab-photo-ring ab-ring-1" />
                <div className="ab-photo-ring ab-ring-2" />
                <img
                  src="/images/bwfto.jpg"
                  alt="Achmad Abidy"
                  className="ab-photo"
                />
                {/* Online badge */}
                <span className="ab-online-badge">
                  <span className="ab-online-dot" /> Online
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="col-lg-8" data-aos="fade-left">
              <p className="ab-eyebrow">✦ &nbsp; About Me</p>
              <h1 className="ab-hero-name">
                Achmad <span className="ab-gold">Abidy</span> Rahmadhany
              </h1>
              <p className="ab-hero-tagline">
                Mahasiswa Informatika &nbsp;·&nbsp; Web Enthusiast &nbsp;·&nbsp; Tech Explorer
              </p>
              <p className="ab-hero-bio">
                Saya memiliki ketertarikan pada pengembangan full-stack, sistem embedded,
                dan desain UI/UX. Saat ini fokus mendalami framework modern serta membangun
                proyek kolaboratif yang berdampak nyata.
              </p>

              {/* Contact info */}
              <ul className="ab-info-list">
                <li>
                  <i className="bi bi-envelope-fill" style={{ color: '#c5a572' }} />
                  kean.keandra.779@gmail.com
                </li>
                <li>
                  <i className="bi bi-geo-alt-fill" style={{ color: '#c5a572' }} />
                  Padang, Indonesia
                </li>
                <li>
                  <i className="bi bi-calendar-week" style={{ color: '#c5a572' }} />
                  21 Tahun &nbsp;·&nbsp; Mahasiswa Aktif
                </li>
              </ul>

              {/* CTA buttons */}
              <div className="d-flex gap-3 flex-wrap mt-4">
                <a href="/contact" className="ab-btn-primary">
                  <i className="bi bi-envelope" /> Hubungi Saya
                </a>
                <a href="/portfolio" className="ab-btn-outline">
                  <i className="bi bi-grid" /> Lihat Portfolio
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section className="ab-skills-section">
        <div className="ab-skills-ambient" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ab-section-head" data-aos="fade-up">
            <span className="ab-eyebrow">✦ &nbsp; Tech Stack</span>
            <h2 className="ab-section-title">
              <i className="bi bi-tools me-2" />Technical Skills
            </h2>
            <div className="ab-section-line" />
          </div>

          <div className="ab-skills-grid" data-aos="fade-up" data-aos-delay="100">
            {skills.map(s => <SkillBadge key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="ab-timeline-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ab-section-head" data-aos="fade-up">
            <span className="ab-eyebrow">✦ &nbsp; Journey</span>
            <h2 className="ab-section-title">
              <i className="bi bi-calendar-event me-2" />Timeline & Prestasi
            </h2>
            <div className="ab-section-line" />

            {/* Legend */}
            <div className="ab-tl-legend">
              <span><span className="ab-legend-dot" style={{ background: '#c5a572' }} /> Pendidikan</span>
              <span><span className="ab-legend-dot" style={{ background: '#ffd700' }} /> Prestasi</span>
              <span><span className="ab-legend-dot" style={{ background: '#7ec8e3' }} /> Pengalaman</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="ab-tl-wrap">
            <div className="ab-tl-spine" />
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} idx={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
