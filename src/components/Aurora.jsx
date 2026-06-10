import './Aurora.css';

const Aurora = () => (
  <div className="aurora-root">
    <div className="aurora-blob aurora-blob-1"
      style={{ background: 'radial-gradient(ellipse, rgba(126, 255, 245, 0.75) 60%, rgba(0, 184, 212, 0.35) 45%, rgba(0, 184, 212, 0) 40%)' }} />

    <div className="aurora-blob aurora-blob-2"
      style={{ background: 'radial-gradient(ellipse, rgba(0, 150, 255, 0.65) 40%, rgba(0, 75, 160, 0.4) 55%, rgba(0, 40, 90, 0.1) 85%)' }} />

    <div className="aurora-blob aurora-blob-3"
      style={{ background: 'radial-gradient(ellipse, rgba(0, 255, 200, 0.22) 0%, rgba(0, 120, 120, 0.12) 50%, rgba(0, 0, 0, 0) 80%)' }} />

    <div className="aurora-blob aurora-blob-4"
      style={{ background: 'radial-gradient(ellipse, rgba(220, 255, 255, 0.28) 0%, rgba(140, 255, 255, 0.08) 40%, transparent 75%)' }} />
  </div>
);

export default Aurora;