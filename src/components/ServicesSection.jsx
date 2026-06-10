import './components.css';

const services = [
  {
    icon: 'bi-palette',
    title: 'Desain Canva',
    desc: 'Kreatif, modern, sesuai brand & kebutuhan.',
    delay: 100,
  },
  {
    icon: 'bi-cpu',
    title: 'Rakit PC',
    desc: 'Rakitan optimal sesuai budget & performa.',
    delay: 200,
  },
  {
    icon: 'bi-code-slash',
    title: 'Kursus Coding',
    desc: 'Java • C++ • Dasar pemrograman interaktif.',
    delay: 300,
  },
];

const ServicesSection = () => (
  <section id="features" className="py-5" style={{ position: 'relative', zIndex: 1 }}>
    <div className="container">
      <h3
        className="mb-5 text-center fw-bold"
        data-aos="fade-up"
        style={{ color: '#c5a572', letterSpacing: '0.08em' }}
      >
        <i className="bi bi-lightning-charge me-2"></i>Layanan Saya
      </h3>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="col"
            data-aos="zoom-in"
            data-aos-delay={s.delay}
          >
            <div className="gold-card h-100 text-center p-4">
              <i
                className={`bi ${s.icon}`}
                style={{
                  fontSize: '3rem',
                  color: '#c5a572',
                  display: 'block',
                  marginBottom: '16px',
                }}
              />
              <h5 className="fw-bold mb-2" style={{ color: '#e5e4e2' }}>
                {s.title}
              </h5>
              <p style={{ color: '#e5e4e2', opacity: 0.7, fontSize: '0.9rem', margin: 0 }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
