import { useState, useRef, useCallback } from 'react';
import Aurora from '../components/Aurora';
import './ContactPage.css';

const socials = [
  { icon: 'bi-instagram', label: 'Instagram', value: '@keandra_alfi',   href: 'https://instagram.com/keandra_alfi' },
  { icon: 'bi-github',    label: 'GitHub',    value: 'lybrac',          href: 'https://github.com/lybrac' },
  { icon: 'bi-whatsapp',  label: 'WhatsApp',  value: '+62 819 3040 8073', href: 'https://wa.me/6281930408073' },
  { icon: 'bi-envelope',  label: 'Email',     value: 'kean.keandra.779@gmail.com', href: 'mailto:kean.keandra.779@gmail.com' },
];

/* ── SpotlightCard (ReactBits-inspired) ── */
const SpotlightCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <div
      ref={ref}
      className={`ct-spotlight-card ${className}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ct-spotlight" style={{
        opacity: hovered ? 1 : 0,
        background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px,
          rgba(197,165,114,0.11) 0%,
          rgba(197,165,114,0.04) 45%,
          transparent 70%)`,
      }} />
      <span className="ct-corner ct-corner-tl" />
      <span className="ct-corner ct-corner-br" />
      {children}
    </div>
  );
};

const ContactPage = () => {
  const [form,     setForm]     = useState({ name: '', email: '', message: '' });
  const [status,   setStatus]   = useState(null); // 'success' | 'error' | null
  const [sending,  setSending]  = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3500);
    }, 1200);
  };

  return (
    <div className="ct-page">
      {/* ── Aurora hero strip ── */}
      <section className="ct-hero">
        <Aurora />
        <div className="ct-hero-overlay" />
        <div className="container ct-hero-content">
          <span className="ct-eyebrow">✦ &nbsp; Get In Touch</span>
          <h1 className="ct-hero-title">Hubungi <span className="ct-gold">Saya</span></h1>
          <p className="ct-hero-sub">Terbuka untuk kolaborasi, proyek, atau sekadar ngobrol.</p>
          <div className="ct-title-line" />
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="ct-main">
        <div className="container">
          <div className="row g-5 align-items-start">

            {/* ── LEFT: Form ── */}
            <div className="col-lg-7" data-aos="fade-right">
              <SpotlightCard>
                <h3 className="ct-card-title">
                  <i className="bi bi-envelope-paper me-2" style={{ color: '#c5a572' }}></i>
                  Kirim Pesan
                </h3>
                <p className="ct-card-sub">Isi form di bawah dan saya akan membalas secepatnya.</p>

                <div className="ct-form">
                  {/* Name */}
                  <div className="ct-field-group">
                    <label className="ct-label">Nama</label>
                    <div className="ct-input-wrap">
                      <i className="bi bi-person ct-input-icon" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="ct-input"
                        placeholder="Nama lengkap kamu"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="ct-field-group">
                    <label className="ct-label">Email</label>
                    <div className="ct-input-wrap">
                      <i className="bi bi-envelope ct-input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="ct-input"
                        placeholder="email@kamu.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="ct-field-group">
                    <label className="ct-label">Pesan</label>
                    <div className="ct-input-wrap">
                      <i className="bi bi-chat-text ct-input-icon ct-input-icon-top" />
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="ct-input ct-textarea"
                        placeholder="Tulis pesanmu di sini..."
                        rows={5}
                        required
                      />
                    </div>
                  </div>

                  {/* Feedback */}
                  {status === 'success' && (
                    <div className="ct-alert ct-alert-success">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Pesan terkirim! Saya akan membalas via email.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="ct-alert ct-alert-error">
                      <i className="bi bi-exclamation-circle-fill me-2"></i>
                      Semua field harus diisi!
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    className={`ct-submit-btn ${sending ? 'ct-sending' : ''}`}
                    onClick={handleSubmit}
                    disabled={sending}
                  >
                    {sending ? (
                      <><span className="ct-spinner" /> Mengirim...</>
                    ) : (
                      <><i className="bi bi-send me-2"></i> Kirim Pesan</>
                    )}
                  </button>
                </div>
              </SpotlightCard>
            </div>

            {/* ── RIGHT: Info + Map ── */}
            <div className="col-lg-5" data-aos="fade-left">

              {/* Social links */}
              <SpotlightCard className="ct-info-card">
                <h3 className="ct-card-title">
                  <i className="bi bi-phone me-2" style={{ color: '#c5a572' }}></i>
                  Kontak Lainnya
                </h3>
                <div className="ct-socials">
                  {socials.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="ct-social-item">
                      <div className="ct-social-icon-wrap">
                        <i className={`bi ${s.icon}`} />
                      </div>
                      <div>
                        <span className="ct-social-label">{s.label}</span>
                        <span className="ct-social-value">{s.value}</span>
                      </div>
                      <i className="bi bi-arrow-up-right ct-social-arrow" />
                    </a>
                  ))}
                </div>
              </SpotlightCard>

              {/* Map */}
              <div className="ct-map-wrap" data-aos="fade-up" data-aos-delay="150">
                <div className="ct-map-header">
                  <i className="bi bi-geo-alt-fill" style={{ color: '#c5a572' }}></i>
                  <span>Universitas Andalas, Padang</span>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.200217775525!2d100.4575!3d-0.9087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cd94bcb6f7b3f5%3A0x22d87b0df9c18bae!2sUniversitas%20Andalas!5e0!3m2!1sen!2sid!4v1702270000000"
                  className="ct-map"
                  allowFullScreen
                  loading="lazy"
                  title="Universitas Andalas"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
