import { useState, useEffect, useMemo } from 'react';
import Threads from './Threads';
import ProfileCard from './ProfileCard';
import './components.css';

const WORDS = ['Abidy', 'Rahmadhany', 'Developer', 'Mahasiswa'];

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [wordIdx,   setWordIdx]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const word  = WORDS[wordIdx];
    const delay = deleting ? 75 : 115;
    const t = setTimeout(() => {
      if (!deleting) {
        setTypedText(word.slice(0, charIdx + 1));
        if (charIdx + 1 === word.length) setTimeout(() => setDeleting(true), 1400);
        else setCharIdx(c => c + 1);
      } else {
        setTypedText(word.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(w => (w+1)%WORDS.length); setCharIdx(0); }
        else setCharIdx(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx]);

  const threadsEl = useMemo(() => (
    <Threads amplitude={1.5} distance={0.3} enableMouseInteraction={true} color={[0.77, 0.65, 0.45]} />
  ), []);

  return (
    <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:'var(--bg-page)' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>{threadsEl}</div>
      <div style={{ position:'absolute', inset:0, zIndex:1, background:'var(--bg-hero-overlay)', pointerEvents:'none' }} />
      <div className="container" style={{ position:'relative', zIndex:2, paddingTop:'90px', paddingBottom:'40px' }}>
        <div className="row align-items-center gy-5">
          <div className="col-lg-6" data-aos="fade-right">
            <p style={{ color:'var(--accent)', letterSpacing:'0.3em', fontSize:'0.75rem', textTransform:'uppercase', marginBottom:'10px', opacity:0.85 }}>
              ✦ &nbsp; Welcome to my Portfolio
            </p>
            <h1 style={{ fontSize:'clamp(2.8rem,6vw,4.5rem)', fontWeight:800, color:'var(--accent)', fontFamily:'Georgia, serif', lineHeight:1.05, margin:0 }}>
              Portofolio
            </h1>
            <h2 style={{ fontSize:'clamp(1.6rem,3.5vw,2.6rem)', fontWeight:600, color:'var(--text-primary)', marginTop:'10px', lineHeight:1.2 }}>
              Achmad{' '}
              <span style={{ color:'var(--accent)' }}>
                {typedText}<span className="typing-cursor" />
              </span>
            </h2>
            <p style={{ color:'var(--text-secondary)', lineHeight:1.85, marginTop:'20px', fontSize:'1rem', maxWidth:'480px' }}>
              Mahasiswa Informatika dengan semangat eksplorasi teknologi modern, desain web, dan pengembangan aplikasi.
            </p>
            <div className="mt-4 d-flex gap-3 flex-wrap">
              <a href="/about"   className="gold-btn"><i className="bi bi-person"></i> Tentang Saya</a>
              <a href="/contact" className="gold-btn"><i className="bi bi-envelope"></i> Hubungi</a>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center" data-aos="fade-left">
            <ProfileCard
              name="Achmad Abidy"
              title="Mahasiswa Informatika"
              handle="abidyrahmadhany"
              status="Online"
              contactText="Hubungi Saya"
              avatarUrl="/images/bwfto.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => { window.location.href = '/contact'; }}
              behindGlowColor="rgba(197,165,114,0.4)"
              innerGradient="linear-gradient(145deg, rgba(10,25,47,0.9) 0%, rgba(197,165,114,0.22) 100%)"
              behindGlowEnabled
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
