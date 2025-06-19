"use client"

import { useEffect } from "react"
import './Footer.css';

const UcabHomePage = ({ onStartTest }) => {
  useEffect(() => {
    const handleMove = (e) => {
      const wrapper = document.querySelector(".ucab-home-page-wrapper")
      if (wrapper) {
        wrapper.style.setProperty("--cursor-x", e.clientX + "px")
        wrapper.style.setProperty("--cursor-y", e.clientY + "px")
      }
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Impact&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
        
        .ucab-home-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(20deg, #ffffff 0%, #b6e3f7 40%, #1a6bb8 100%);
          display: flex;
          flex-direction: column;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
          position: relative;
        }
        
        .ucab-home-page-wrapper::after {
          content: '';
          position: fixed;
          pointer-events: none;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
          box-shadow: 0 0 32px 16px rgba(255,255,255,0.55);
          transform: translate(calc(var(--cursor-x, 0px)), calc(var(--cursor-y, 0px)));
          z-index: 9999;
          opacity: 1;
        }
        
        .ucab-home-page {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        
        .ucab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 31.2px 0;
          border-bottom: none;
          background: transparent !important;
          box-shadow: none;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        
        .logo-text-ucab {
          font-weight: 700;
          font-size: 26px;
          color: #003366;
          letter-spacing: -0.5px;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        
        .ucab-main-content {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          gap: 64px;
          padding: 0 0 80px 0;
          flex-grow: 1;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        
        .left-panel .main-image {
          width: 100%;
          max-width: 320px;
          height: auto;
          border-radius: 16px;
          object-fit: cover;
        }
        
        .right-panel { 
          display: flex; 
          flex-direction: column; 
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important; 
        }
        
        .right-panel h1 {
          font-size: clamp(3.575rem, 7.15vw, 5.005rem);
          font-family: 'Impact', 'Arial Black', sans-serif !important;
          font-weight: normal;
          color: #fff !important;
          margin: 0 0 10px 0;
          line-height: 1.05;
          letter-spacing: -1.5px;
          position: relative;
          top: -48px;
          text-shadow: 2px 2px 8px rgba(30, 60, 120, 0.35), 0 2px 16px rgba(0,0,0,0.18);
        }
        
        .subtitle {
          font-size: 1.125rem;
          color: #fff;
          line-height: 1.5;
          margin-bottom: 24px;
          max-width: 550px;
          position: relative;
          top: -42px;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        
        .main-cta-button {
          background: linear-gradient(90deg, #003366 0%, #1a6bb8 100%);
          color: #fff;
          border: 2px solid #003366;
          align-self: flex-start;
          font-size: 18px;
          padding: 14px 40px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          position: relative;
          top: -36px;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
          box-shadow: 0 2px 12px rgba(33,147,176,0.10);
        }
        
        .main-cta-button:hover {
          background: linear-gradient(90deg, #1a6bb8 0%, #003366 100%);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 51, 102, 0.10);
        }

        /* Modern sections styling */
        .modern-section {
          padding: 32px 0;
          position: relative;
          background: #fff;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.1rem);
          font-family: 'Poppins', 'Arial', sans-serif !important;
          font-weight: 700;
          text-align: center;
          margin-bottom: 60px;
          color: #343434;
          letter-spacing: 0.01em;
          text-shadow: none;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 8px;
          border-bottom: 4px solid #40B4E5;
        }

        /* How it works section */
        .how-it-works-section {
          background: #fff;
          backdrop-filter: none;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-top: 40px;
        }

        .step-card {
          background: #40B4E5;
          color: #fff;
          backdrop-filter: none;
          border: 1px solid #40B4E5;
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .step-card .step-icon,
        .step-card .step-title,
        .step-card .step-description {
          color: #fff !important;
        }

        .step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .step-card:hover::before {
          opacity: 1;
        }

        .step-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .step-icon {
          font-size: 3.2rem;
          margin-bottom: 20px;
          display: block;
          filter: drop-shadow(0 2px 4px #b6e3f7);
          color: #1a6bb8;
        }

        .step-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #003366;
          margin-bottom: 12px;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 8px #f9b23333;
        }

        .step-description {
          font-size: 1rem;
          color: #1a6bb8;
          line-height: 1.5;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        /* Testimonials section */
        .testimonials-section {
          background: #fff;
          backdrop-filter: none;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-top: 40px;
        }

        .testimonial-card {
          background: #f6fafd;
          backdrop-filter: none;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          padding: 40px;
          position: relative;
          transition: all 0.3s ease;
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 30px;
          font-size: 6rem;
          color: rgba(0, 51, 102, 0.1);
          font-family: serif;
          line-height: 1;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .testimonial-text {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #003366;
          margin-bottom: 24px;
          font-style: italic;
          position: relative;
          z-index: 1;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        .testimonial-author {
          font-weight: 700;
          color: #003366;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(90deg, #f9b23322 0%, #fff 100%);
          border-radius: 8px;
          padding: 2px 10px;
        }

        .testimonial-author::before {
          content: '';
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #1a6bb8, transparent);
        }

        /* Contact section */
        .contact-section {
          background: #fff;
          backdrop-filter: none;
          border-top: 1px solid #e5e7eb;
        }

        .contact-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-text {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #003366;
          margin-bottom: 30px;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        .contact-links {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .contact-link {
          background: #f6fafd;
          backdrop-filter: none;
          border: 1px solid #e5e7eb;
          color: #003366;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 8px #f9b23322;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        .contact-link:hover {
          background: #eaf6fb;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        /* Footer */
        .ucab-footer-new {
          border-top: 4px solid #40B4E5;
          background: #fff !important;
          font-family: 'Open Sans', Arial, sans-serif;
          padding: 32px 0 16px 0;
          text-align: center;
          margin-top: 0;
        }

        .footer-links-new {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .footer-links-new a {
          color: #003366;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s;
          font-weight: 500;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        .footer-links-new a:hover { 
          color: #1a6bb8; 
        }

        .footer-social-new {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 16px;
        }

        .footer-social-new a {
          background: #f6fafd;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        .footer-social-new a:hover {
          background: #eaf6fb;
          transform: translateY(-2px);
        }

        .footer-social-new a svg {
          stroke: #003366;
        }

        .footer-social-new a:hover svg {
          stroke: #1a6bb8;
        }

        .footer-copyright-new {
          text-align: center;
          font-size: 0.95rem;
          color: #003366;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        /* Responsive design */
        @media (max-width: 992px) {
          .ucab-main-content { 
            grid-template-columns: 1fr; 
            gap: 48px; 
            padding: 32px 0 60px 0; 
            text-align: center; 
          }
          .left-panel { order: 2; display: flex; justify-content: center; }
          .left-panel .main-image { max-width: 400px; }
          .right-panel { order: 1; align-items: center; }
          .main-cta-button { align-self: center; }
          
          .steps-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .ucab-home-page { padding: 0 24px; }
          .section-container { padding: 0 12px; }
          
          .modern-section {
            padding: 8px 0;
          }
          
          .step-card {
            padding: 30px 20px;
          }
          
          .testimonial-card {
            padding: 30px;
          }
          
          .contact-links {
            flex-direction: column;
            align-items: center;
          }
          
          .footer-links-new {
            gap: 20px;
          }
        }

        /* Body text: Open Sans and #343434 */
        .modern-section, .step-description, .testimonial-text, .contact-text, .contact-link, .step-card, .testimonial-card, .contact-content, .section-container, .right-panel, .left-panel, .ucab-home-page {
          font-family: 'Open Sans', 'Arial', sans-serif !important;
          color: #343434;
        }

        .testimonials-section, .contact-section, .how-it-works-section {
          background: #f8f9fa;
        }
      `}</style>

      <div className="ucab-home-page-wrapper" style={{ position: "relative" }}>
        <div className="ucab-home-page" style={{ position: "relative", zIndex: 2 }}>
          <header className="ucab-header">
            <span className="logo-text-ucab">Portal Vocacional</span>
          </header>

          <main className="ucab-main-content">
            <div className="left-panel">
              <div className="main-image-container">
                <img
                  src="https://placehold.co/500x500/E8F5E9/003366?text=Talento+UCAB"
                  alt="Estudiante descubriendo su vocación"
                  className="main-image"
                />
              </div>
            </div>
            <div className="right-panel">
              <h1>TU PRIMER PASO A LLEGAR LEJOS.</h1>
              <p className="subtitle">
                Responde unas preguntas y recibe una recomendación personalizada de carreras afines a tu perfil.
                ¡Empieza tu futuro en la UCAB hoy!
              </p>
              <button className="main-cta-button" onClick={onStartTest}>
                Comenzar mi prueba vocacional
              </button>
            </div>
          </main>
        </div>

        {/* Modern How it works section */}
        <section className="modern-section how-it-works-section">
          <div className="section-container">
            <h2 className="section-title">¿CÓMO FUNCIONA?</h2>
            <div className="steps-grid">
              <div className="step-card">
                <span className="step-icon">📝</span>
                <h3 className="step-title">Completa tus datos</h3>
                <p className="step-description">Ingresa tu información básica para personalizar tu experiencia</p>
              </div>
              <div className="step-card">
                <span className="step-icon">❓</span>
                <h3 className="step-title">Responde las preguntas</h3>
                <p className="step-description">Contesta honestamente sobre tus intereses y habilidades</p>
              </div>
              <div className="step-card">
                <span className="step-icon">💡</span>
                <h3 className="step-title">Recibe tu recomendación</h3>
                <p className="step-description">Obtén un análisis detallado de tu perfil vocacional</p>
              </div>
              <div className="step-card">
                <span className="step-icon">🎓</span>
                <h3 className="step-title">Explora las carreras</h3>
                <p className="step-description">Descubre las opciones académicas que mejor se adaptan a ti</p>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Testimonials section */}
        <section className="modern-section testimonials-section">
          <div className="section-container">
            <h2 className="section-title">TESTIMONIOS</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-text">
                  Gracias a la prueba vocacional de la UCAB, descubrí mi verdadera pasión y ahora estudio la carrera
                  perfecta para mí. El proceso fue muy intuitivo y los resultados fueron sorprendentemente precisos.
                </p>
                <div className="testimonial-author">María G., Estudiante de Psicología</div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">
                  La orientación que recibí fue clave para tomar una decisión informada sobre mi futuro académico. Me
                  ayudó a entender mejor mis fortalezas y el camino que quería seguir.
                </p>
                <div className="testimonial-author">Carlos R., Estudiante de Ingeniería</div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Contact section */}
        <section className="modern-section contact-section">
          <div className="section-container">
            <h2 className="section-title">¿NECESITAS AYUDA?</h2>
            <div className="contact-content">
              <p className="contact-text">
                Nuestro equipo está aquí para apoyarte en tu proceso de decisión vocacional
              </p>
              <div className="contact-links">
                <a href="mailto:admision@ucab.edu.ve" className="contact-link">
                  <span>📧</span>
                  admision@ucab.edu.ve
                </a>
                <a href="https://wa.me/584241234567" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span>📱</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Footer */}
        <footer
          className="ucab-footer-new"
          style={{ background: '#bcbcbc', borderTop: '4px solid #40B4E5' }}
        >
          <div className="footer-links-new">
            <a href="https://extensionesocial.ucab.edu.ve" target="_blank" rel="noopener noreferrer">Extensión Social</a>
            <a href="https://fundacionandresbello.org" target="_blank" rel="noopener noreferrer">Fundación Andrés Bello</a>
            <a href="https://donaciones.ucab.edu.ve" target="_blank" rel="noopener noreferrer">Donaciones</a>
            <a href="https://proyectoencovi.com" target="_blank" rel="noopener noreferrer">Proyecto ENCOVI</a>
            <a href="https://unai.ucab.edu.ve" target="_blank" rel="noopener noreferrer">UNAI</a>
            <a href="https://jesuitas.org.ve" target="_blank" rel="noopener noreferrer">Compañía de Jesús</a>
            <a href="https://ausjal.org" target="_blank" rel="noopener noreferrer">AUSJAL</a>
            <a href="https://empleo.ucab.edu.ve" target="_blank" rel="noopener noreferrer">Ofertas de empleo</a>
            <a href="https://libreriadigital.ucab.edu.ve" target="_blank" rel="noopener noreferrer">Librería Digital</a>
          </div>
          <div className="footer-social-new">
            <a href="https://instagram.com/ucabve" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="https://facebook.com/ucabve" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7v3h3v7h3v-7h2.5l.5-3H13V7a1.5 1.5 0 0 1 1.5-1.5H17v-3z" strokeWidth="2" />
              </svg>
            </a>
            <a href="https://twitter.com/ucabve" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6 1A4.11 4.11 0 0 0 12 8.09c0 .32.04.64.1.94A11.65 11.65 0 0 1 3 4.89a4.07 4.07 0 0 0-.56 2.07c0 1.43.73 2.69 1.85 3.43a4.07 4.07 0 0 1-1.86-.51v.05c0 2 1.42 3.66 3.3 4.04a4.1 4.1 0 0 1-1.85.07c.52 1.62 2.03 2.8 3.82 2.83A8.24 8.24 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 5.92z" strokeWidth="2" />
              </svg>
            </a>
          </div>
          <div className="footer-copyright-new">
            © {new Date().getFullYear()} Universidad Católica Andrés Bello. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </>
  )
}

export default UcabHomePage
