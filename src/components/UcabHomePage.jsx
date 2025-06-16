import React from 'react';

const UcabHomePage = ({ onStartTest }) => {
  // The useNavigate hook has been removed to fix the router context error.
  // Navigation is handled by the onStartTest prop passed from the parent component.

  return (
    <>
      <style>{`
        /*
          Component: UcabHomePage
          Design: Directly inspired by the "Smart Talent Scanner" reference image.
          Colors: Adheres to the user-specified palette (dark blue, light blue, green).
          Responsiveness: Fully responsive with no horizontal scroll.
        */
        .ucab-home-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background-color: var(--white); /* Clean white background as per reference */
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
        }

        .ucab-home-page {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        /* --- Header Styling (Matches reference) --- */
        .ucab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-ucab {
          height: 40px; /* Adjusted for better balance */
        }
        
        .logo-text-ucab {
          font-weight: 700;
          font-size: 20px;
          color: var(--dark-blue);
          letter-spacing: -0.5px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .career-link {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease-in-out;
        }

        .career-link:hover {
          color: var(--dark-blue);
        }

        .test-button {
          background-color: transparent;
          color: var(--dark-blue);
          border: 2px solid var(--dark-blue);
          padding: 8px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border-radius: 8px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease-in-out;
        }

        .test-button:hover {
          background-color: var(--dark-blue);
          color: var(--white);
        }

        /* --- Main Content Styling (Matches reference) --- */
        .ucab-main-content {
          display: grid;
          grid-template-columns: 1fr 1.1fr; /* Image takes less space */
          align-items: center;
          gap: 64px;
          padding: 80px 0;
          flex-grow: 1;
        }

        .left-panel .main-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 16px;
          object-fit: cover;
        }

        .right-panel {
          display: flex;
          flex-direction: column;
        }

        .right-panel h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: var(--dark-blue);
          margin: 0 0 16px 0;
          line-height: 1.2;
          letter-spacing: -1.5px;
        }

        .subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 550px;
        }
        
        /* This button is a replacement for the "QR code" in the reference image */
        .main-cta-button {
           background-color: var(--dark-blue);
           color: var(--white);
           align-self: flex-start;
           font-size: 18px;
           padding: 14px 40px;
           border: none;
           border-radius: 8px;
           cursor: pointer;
           font-weight: 700;
           transition: all 0.2s ease-in-out;
        }

        .main-cta-button:hover {
            background-color: var(--medium-blue);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 51, 102, 0.2);
        }

        /* --- Responsive Design --- */
        @media (max-width: 992px) {
          .ucab-main-content {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 60px 0;
            text-align: center;
          }
          .left-panel {
            order: 2;
            display: flex;
            justify-content: center;
          }
          .left-panel .main-image {
            max-width: 400px;
          }
           .right-panel {
            order: 1;
            align-items: center;
          }
          .main-cta-button {
            align-self: center;
          }
        }
        
        @media (max-width: 768px) {
          .ucab-home-page {
              padding: 0 24px;
          }
          .header-actions {
            gap: 12px;
          }
          .career-link {
            display: none; /* Hide text links on smaller screens */
          }
        }
    `}</style>
      <div className="ucab-home-page-wrapper">
        <div className="ucab-home-page">
          {/* Header Section */}
          <header className="ucab-header">
            <a href="/" className="logo-container">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png" 
                alt="UCAB Logo" 
                className="logo-ucab"
              />
              <span className="logo-text-ucab">
                Portal Vocacional
              </span>
            </a>
            <div className="header-actions">
              <a
                href="https://www.ucab.edu.ve/pregrado/"
                className="career-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Áreas Profesionales
              </a>
              <a
                href="/acerca"
                className="career-link"
              >
                Acerca del test
              </a>
              <button
                className="test-button"
                onClick={onStartTest}
              >
                Haz el test
              </button>
            </div>
          </header>

          {/* Main Content Section */}
          <main className="ucab-main-content">
            <div className="left-panel">
              {/* SVG design replacing the placeholder image */}
              <svg width="420" height="350" viewBox="0 0 900 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{maxWidth: '100%', height: 'auto'}}>
                {/* Central area for student picture */}
                <rect x="320" y="100" width="260" height="320" fill="#fff" stroke="#ccc" strokeWidth="2"/>
                {/* Grid overlay for picture area */}
                <g opacity="0.2">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#888" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect x="320" y="100" width="260" height="320" fill="url(#grid)" />
                </g>
                {/* Top boxes */}
                <rect x="120" y="40" width="120" height="60" fill="#fff" stroke="#222" strokeWidth="2"/>
                <rect x="390" y="20" width="120" height="60" fill="#fff" stroke="#222" strokeWidth="2"/>
                <rect x="660" y="40" width="120" height="60" fill="#fff" stroke="#222" strokeWidth="2"/>
                {/* Red lines in boxes */}
                <g>
                  <rect x="135" y="55" width="90" height="8" fill="#D32F2F"/>
                  <rect x="135" y="70" width="90" height="8" fill="#D32F2F"/>
                  <rect x="135" y="85" width="90" height="8" fill="#D32F2F"/>
                </g>
                <g>
                  <rect x="405" y="35" width="90" height="8" fill="#D32F2F"/>
                  <rect x="405" y="50" width="90" height="8" fill="#D32F2F"/>
                  <rect x="405" y="65" width="90" height="8" fill="#D32F2F"/>
                </g>
                <g>
                  <rect x="675" y="55" width="90" height="8" fill="#D32F2F"/>
                  <rect x="675" y="70" width="90" height="8" fill="#D32F2F"/>
                  <rect x="675" y="85" width="90" height="8" fill="#D32F2F"/>
                </g>
                {/* Labels above boxes */}
                <text x="180" y="35" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#222">CAPACIDADES</text>
                <text x="450" y="15" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#222">APTITUDES</text>
                <text x="720" y="35" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#222">CONOCIMIENTOS</text>
                {/* Connecting lines */}
                <line x1="180" y1="100" x2="180" y2="180" stroke="#222" strokeWidth="2"/>
                <line x1="450" y1="80" x2="450" y2="100" stroke="#222" strokeWidth="2"/>
                <line x1="720" y1="100" x2="720" y2="180" stroke="#222" strokeWidth="2"/>
                <line x1="180" y1="180" x2="320" y2="180" stroke="#222" strokeWidth="2"/>
                <line x1="720" y1="180" x2="580" y2="180" stroke="#222" strokeWidth="2"/>
                {/* Mini bar chart (bottom left) */}
                <rect x="140" y="400" width="10" height="30" fill="#8E24AA"/>
                <rect x="155" y="410" width="10" height="20" fill="#43A047"/>
                <rect x="170" y="420" width="10" height="10" fill="#FBC02D"/>
                {/* Legend (right) */}
                <g>
                  <rect x="670" y="200" width="30" height="8" fill="#8E24AA"/>
                  <text x="710" y="208" fontSize="13" fontFamily="sans-serif" fill="#222" alignmentBaseline="middle">TECH & DATA</text>
                  <rect x="670" y="225" width="30" height="8" fill="#43A047"/>
                  <text x="710" y="233" fontSize="13" fontFamily="sans-serif" fill="#222" alignmentBaseline="middle">MKT & COMMS</text>
                  <rect x="670" y="250" width="30" height="8" fill="#00897B"/>
                  <text x="710" y="258" fontSize="13" fontFamily="sans-serif" fill="#222" alignmentBaseline="middle">HR & ADMIN</text>
                  <rect x="670" y="275" width="30" height="8" fill="#FBC02D"/>
                  <text x="710" y="283" fontSize="13" fontFamily="sans-serif" fill="#222" alignmentBaseline="middle">VISUAL DESIGN, ART & CREATIVITY</text>
                  <rect x="670" y="300" width="30" height="8" fill="#1976D2"/>
                  <text x="710" y="308" fontSize="13" fontFamily="sans-serif" fill="#222" alignmentBaseline="middle">ECONOMICS & FINANCE</text>
                </g>
                {/* Legend lines */}
                <line x1="750" y1="204" x2="800" y2="204" stroke="#8E24AA" strokeWidth="3"/>
                <line x1="750" y1="229" x2="800" y2="229" stroke="#43A047" strokeWidth="3"/>
                <line x1="750" y1="254" x2="800" y2="254" stroke="#00897B" strokeWidth="3"/>
                <line x1="750" y1="279" x2="800" y2="279" stroke="#FBC02D" strokeWidth="3"/>
                <line x1="750" y1="304" x2="800" y2="304" stroke="#1976D2" strokeWidth="3"/>
              </svg>
            </div>
            <div className="right-panel">
              <h1>Test de Orientación Vocacional Inteligente</h1>
              <p className="subtitle">
                Completa nuestro test vocacional para descubrir qué profesión de futuro encaja mejor contigo y recibir orientación formativa. ¡Elige tu futuro en la UCAB!
              </p>
               <button
                className="main-cta-button"
                onClick={onStartTest}
              >
                Comenzar ahora
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UcabHomePage;
