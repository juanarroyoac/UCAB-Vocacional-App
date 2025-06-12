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
              {/* Using a placeholder that reflects the style of the reference image */}
              <img 
                src="https://placehold.co/500x500/E8F5E9/003366?text=Talento+UCAB" 
                alt="Estudiante descubriendo su vocación" 
                className="main-image"
              />
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
