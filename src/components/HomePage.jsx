// src/components/HomePage.jsx
// Standalone empty homepage for now



import { useNavigate } from 'react-router-dom';
import ucabLogo from '../assets/ucab-logo.png';


function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f5f7fa', fontFamily: 'Poppins, Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 3vw 1.5rem 3vw', borderBottom: '1.5px solid #f0f0f0', background: '#fff', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src={ucabLogo} alt="Logo UCAB" style={{ height: 44, marginRight: 10 }} />
          <div style={{ fontWeight: 900, fontSize: 28, color: '#0033A0', letterSpacing: 0.5, lineHeight: 1 }}>
            <span style={{ color: '#0033A0' }}>SMART</span>
            <span style={{ color: '#DFAF3F', marginLeft: 4 }}>TALENT</span>
            <span style={{ display: 'block', fontWeight: 700, fontSize: 16, color: '#222', letterSpacing: 2, marginTop: -2 }}>SCANNER</span>
          </div>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#areas" style={navLinkStyle}>Áreas Profesionales</a>
          <a href="#acerca" style={navLinkStyle}>Acerca del test</a>
          <a href="#populares" style={navLinkStyle}>Profesiones populares</a>
          <button onClick={() => navigate('/intro')} style={ctaBtnStyle}>Haz el test</button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2vw 0', position: 'relative', background: 'transparent' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 1200, margin: '0 auto', gap: 32 }}>
          {/* Illustration */}
          <div style={{ flex: '1 1 340px', minWidth: 320, maxWidth: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Abstract illustration with grid and colored lines */}
            <div style={{ position: 'relative', width: 320, height: 320, background: 'linear-gradient(135deg, #f8fafc 60%, #fff 100%)', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,51,160,0.07)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Grid */}
              <div style={{ position: 'absolute', left: 24, top: 24, width: 180, height: 180, border: '1.5px solid #e9ecef', background: 'repeating-linear-gradient(0deg, #e9ecef, #e9ecef 1px, transparent 1px, transparent 36px), repeating-linear-gradient(90deg, #e9ecef, #e9ecef 1px, transparent 1px, transparent 36px)' }} />
              {/* Abstract colored lines */}
              <div style={{ position: 'absolute', left: 210, top: 60, width: 80, height: 3, background: '#0033A0', borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: 210, top: 90, width: 60, height: 3, background: '#DFAF3F', borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: 210, top: 120, width: 40, height: 3, background: '#4ECDC4', borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: 210, top: 150, width: 20, height: 3, background: '#FF6B6B', borderRadius: 2 }} />
              {/* Abstract rectangles */}
              <div style={{ position: 'absolute', left: 60, top: 10, width: 48, height: 28, background: '#fff', border: '1.5px solid #e9ecef', borderRadius: 6 }} />
              <div style={{ position: 'absolute', left: 10, top: 120, width: 38, height: 28, background: '#fff', border: '1.5px solid #e9ecef', borderRadius: 6 }} />
              <div style={{ position: 'absolute', left: 120, top: 220, width: 38, height: 28, background: '#fff', border: '1.5px solid #e9ecef', borderRadius: 6 }} />
              {/* Person illustration placeholder */}
              <div style={{ position: 'absolute', left: 90, top: 80, width: 100, height: 160, background: 'linear-gradient(120deg, #e9ecef 60%, #fff 100%)', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} />
            </div>
          </div>
          {/* Text Content */}
          <div style={{ flex: '1 1 340px', minWidth: 320, maxWidth: 520, padding: '0 2vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#0033A0', letterSpacing: 1, marginBottom: 12 }}>........</div>
            <h1 style={{ fontWeight: 900, fontSize: 38, lineHeight: 1.13, color: '#222', margin: 0, marginBottom: 18 }}>
              Smart Talent Scanner: test<br />de orientación vocacional<br />para saber qué estudiar.
            </h1>
            <p style={{ fontSize: 18, color: '#222', marginBottom: 18, maxWidth: 420 }}>
              Completa nuestro test vocacional para descubrir qué profesión de futuro encaja mejor contigo y recibir orientación formativa. ¡Ponte en modo Smart!
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#0033A0' }}>¡Haz el test aquí!</span>
              <button onClick={() => navigate('/intro')} style={{ ...ctaBtnStyle, fontSize: 18, padding: '8px 22px', marginLeft: 8 }}>Haz el test</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const navLinkStyle = {
  color: '#222',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: 16,
  padding: '6px 0',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s',
};

const ctaBtnStyle = {
  background: '#fff',
  color: '#0033A0',
  border: '2px solid #0033A0',
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 16,
  padding: '8px 18px',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s, border 0.2s',
  boxShadow: '0 2px 8px rgba(0,51,160,0.07)',
};

export default HomePage;
