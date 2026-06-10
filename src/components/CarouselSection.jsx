import { useState, useEffect, useCallback } from 'react';
import './components.css';

const slides = [
  {
    img: 'https://picsum.photos/id/0/1200/500',
    alt: 'Rakit PC',
    title: 'Rakit PC',
    desc: 'Perakitan PC gaming high-end.',
  },
  {
    img: 'https://picsum.photos/id/26/1200/500',
    alt: 'Kursus',
    title: 'Kursus Pemrograman',
    desc: 'Mentoring siswa SMK dan mahasiswa.',
  },
  {
    img: 'https://picsum.photos/id/20/1200/500',
    alt: 'Canva',
    title: 'Desain Canva',
    desc: 'Poster & konten sosial media.',
  },
];

const CarouselSection = () => {
  const [active,  setActive]  = useState(0);
  const [fading,  setFading]  = useState(false);

  const goTo = useCallback((idx) => {
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 320);
  }, []);

  const prev = useCallback(() => {
    goTo((active - 1 + slides.length) % slides.length);
  }, [active, goTo]);

  const next = useCallback(() => {
    goTo((active + 1) % slides.length);
  }, [active, goTo]);

  /* Auto-play */
  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[active];

  return (
    <section
      className="py-5"
      style={{ background: 'rgba(0,0,0,0.22)', position: 'relative', zIndex: 1 }}
    >
      <div className="container">
        <h3
          className="mb-4 text-center fw-bold"
          data-aos="fade-up"
          style={{ color: '#c5a572', letterSpacing: '0.08em' }}
        >
          <i className="bi bi-camera me-2"></i>Proyek Terkini
        </h3>

        {/* ── Wrapper ── */}
        <div
          data-aos="fade-up"
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(197,165,114,0.22)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* ── Image ── */}
          <img
            src={slide.img}
            alt={slide.alt}
            style={{
              width: '100%',
              height: 'clamp(260px, 40vw, 420px)',
              objectFit: 'cover',
              display: 'block',
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.32s ease',
              willChange: 'opacity',
            }}
          />

          {/* ── Gradient overlay ── */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,25,47,0.88) 0%, transparent 55%)',
            pointerEvents: 'none',
          }} />

          {/* ── Caption ── */}
          <div style={{
            position: 'absolute',
            bottom: '56px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '100%',
            padding: '0 24px',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.32s ease',
            willChange: 'opacity',
          }}>
            <h5 style={{
              color: '#c5a572', fontWeight: 700,
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              marginBottom: '6px', letterSpacing: '0.05em',
            }}>
              {slide.title}
            </h5>
            <p style={{ color: '#e5e4e2', opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>
              {slide.desc}
            </p>
          </div>

          {/* ── Dot indicators ── */}
          <div style={{
            position: 'absolute', bottom: '18px',
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '8px', alignItems: 'center',
          }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`carousel-dot ${i === active ? 'active' : 'inactive'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* ── Prev ── */}
          <button onClick={prev} className="carousel-nav-btn prev" aria-label="Sebelumnya">
            <i className="bi bi-chevron-left"></i>
          </button>

          {/* ── Next ── */}
          <button onClick={next} className="carousel-nav-btn next" aria-label="Berikutnya">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
