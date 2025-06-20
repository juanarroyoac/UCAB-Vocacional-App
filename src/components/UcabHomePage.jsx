"use client"

import { useEffect } from "react"
import "./Footer.css"

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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
        
        .ucab-home-page-wrapper {
          width: 100%;
          min-height: 100vh;
          /* Gradient: azul 40B4E5, azul fuerte a la derecha, azul claro intermedio, luego blanco */
          background: linear-gradient(320deg, #40B4E5 10%, #0090c5 65%, #b6e3f7 85%, #ffffff 110%);
          display: flex;
          flex-direction: column;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
          position: relative;
        }
        .ucab-home-page-wrapper::before {
          content: none;
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
          display: none;
        }
        .ucab-header-logo {
          height: 44px;
          width: auto;
          margin-left: 8px;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.85));
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
          max-width: 540px;
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
          font-size: 3.9rem !important;
          line-height: 1.05;
          font-family: 'Poppins', 'Arial', sans-serif !important;
          font-weight: 700 !important;
          color: #fff !important;
          margin: 0 0 10px 0;
          letter-spacing: 0.1px !important;
          position: relative;
          top: 0;
          text-shadow: 2px 2px 8px rgba(30, 60, 120, 0.35), 0 2px 16px rgba(0,0,0,0.18);
        }
        
        .subtitle {
          font-size: 1.125rem;
          color: #fff;
          line-height: 1.5;
          margin-bottom: 24px;
          max-width: 550px;
          position: relative;
          top: -14px;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }
        
        .main-cta-button {
          background: linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.25) 100%);
          color: #fff;
          border: 2px solid #fff;
          align-self: flex-start;
          font-size: 18px;
          padding: 14px 40px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          position: relative;
          top: -8px;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
          box-shadow: 0 2px 12px rgba(33,147,176,0.10);
        }
        
        .main-cta-button:hover {
          background: linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 51, 102, 0.10);
        }

        /* Modern sections styling */
        .modern-section {
          padding: 4px 0 72px 0;
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
          background: #fff !important;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          padding: 27px 0 100px 0; /* Increased bottom padding */
        }
        .steps-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        .step-inline {
          display: flex;
          align-items: flex-start;
          background: transparent;
          box-shadow: none;
          border: none;
          padding: 0;
          margin: 0;
          min-width: 0;
          max-width: 320px;
          flex: 1 1 200px;
        }
        .step-inline-icon {
          font-size: 2.2rem;
          height: 2.2rem;
          width: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          color: #1a6bb8;
        }
        .step-inline-content {
          display: flex;
          flex-direction: column;
        }
        .step-inline-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #343434;
          font-family: 'Poppins', Arial, sans-serif !important;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .step-inline-desc {
          font-size: 1.01rem;
          color: #343434;
          line-height: 1.5;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
          font-weight: 400;
        }
        @media (max-width: 992px) {
          .steps-row {
            flex-direction: column;
            gap: 0px;
            margin-top: 18px;
          }
          .step-inline {
            max-width: 100%;
          }
          .left-panel .main-image { max-width: 440px; }
        }

        /* Testimonials section */
        .testimonials-section {
          background: #f7f7f7 !important;
          backdrop-filter: none;
          padding-bottom: 24px;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-top: 40px;
        }

        .testimonial-card {
          background: transparent;
          backdrop-filter: none;
          border: none;
          border-radius: 24px;
          padding: 40px;
          position: relative;
          transition: none;
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
          transform: none;
          box-shadow: none;
        }

        .testimonial-text {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #343434;
          margin-bottom: 24px;
          font-style: italic;
          position: relative;
          z-index: 1;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        .testimonial-author {
          font-weight: 700;
          color: #343434;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border-radius: 8px;
          padding: 2px 10px;
          font-family: 'Poppins', 'Arial', sans-serif !important;
          text-transform: uppercase;
        }

        .testimonial-author::before {
          content: '';
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #343434, transparent);
        }

        /* Contact section */
        .contact-section {
          background: #fff !important;
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
          border-top: 5px solid #40B4E5;
          background: #d0d0d0 !important;
          font-family: 'Open Sans', Arial, sans-serif;
          padding: 24px 0 8px 0;
          text-align: center;
          margin-top: 0;
        }

        .footer-links-new {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-links-new a {
          color: #003366;
          text-decoration: none;
          font-size: 11.2px;
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
          gap: 18px;
          margin-bottom: 12px;
          margin-top: 28px;
        }

        .footer-social-new a {
          background: none !important;
          border-radius: 0 !important;
          width: auto !important;
          height: auto !important;
          box-shadow: none !important;
          padding: 0 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        .footer-social-new a:hover {
          background: none !important;
        }

        .footer-social-new a svg {
          stroke: #40b4e5;
          width: 16px;
          height: 16px;
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
          
          .steps-row {
            flex-direction: column;
            gap: 12px;
            margin-top: 18px;
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .ucab-home-page { padding: 0 24px; }
          .section-container { padding: 0 12px; }
          .modern-section { padding: 8px 0; }
          .how-it-works-section { padding-bottom: 80px !important; } /* Increased bottom padding for mobile */
          .steps-row {
            display: block !important;
            gap: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .step-inline {
            display: flex !important;
            align-items: flex-start !important;
            margin: 0 !important;
            padding: 0 0 34px 0 !important;
            max-width: 100% !important;
            width: 100% !important;
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

          .ucab-home-page-wrapper {
            /* Mobile-specific gradient: strong blue to light blue to white for better vertical visibility */
            background: linear-gradient(180deg, #40B4E5 0%, #b6e3f7 70%, #ffffff 100%);
          }
        }

        @media (max-width: 600px) {
          .right-panel h1 {
            font-size: 3.6rem !important;
            line-height: 1.08;
            letter-spacing: 0.3px !important;
          }
          .ucab-header-logo {
            display: block;
            margin-left: auto;
            margin-right: auto;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.95));
          }
          .right-panel {
            align-items: center !important;
            text-align: center;
            justify-content: center !important;
          }
        }

        /* Body text: Open Sans and #343434 */
        .modern-section, .step-inline-desc, .testimonial-text, .contact-text, .contact-link, .step-inline, .testimonial-card, .contact-content, .section-container, .right-panel, .left-panel, .ucab-home-page {
          font-family: 'Open Sans', 'Arial', sans-serif !important;
          color: #343434;
        }

        .testimonials-section, .contact-section, .how-it-works-section {
          /* Remove background here to avoid override */
        }

        .banner-full-width-section {
          width: 100%;
          background: transparent;
          margin: 0;
          padding: 0;
        }
        .banner-full-width {
          width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
          max-width: 100vw;
        }

        .canales-contacto-section {
          background: #fafbfc;
          padding: 72px 0 72px 0; /* Ensure consistent top and bottom padding */
        }
        .canales-contacto-section .section-title {
          margin-top: 0;
          margin-bottom: 60px;
        }
        .canales-contacto-desc {
          text-align: center;
          color: #555;
          font-size: 0.98rem;
          margin-bottom: 28px;
          font-family: 'Open Sans', Arial, sans-serif !important;
          font-weight: 400;
        }
        .canales-contacto-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          justify-content: center;
        }
        .canal-card {
          background: transparent;
          border-radius: 12px;
          box-shadow: none;
          padding: 18px 18px 24px 18px;
          max-width: 320px;
          min-width: 260px;
          width: 100%;
          text-align: center;
          flex: 1 1 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .canal-card-img {
          width: 100%;
          height: 110px;
          object-fit: cover;
          border-radius: 0 !important;
          margin-bottom: 12px;
        }
        .canal-card-title {
          font-size: 1.02rem;
          font-family: 'Poppins', Arial, sans-serif !important;
          font-weight: 700;
          margin-bottom: 7px;
          color: #222;
          text-transform: uppercase;
          letter-spacing: 0.01em;
        }
        .canal-card-desc {
          font-size: 0.97rem;
          color: #444;
          margin-bottom: 12px;
          font-family: 'Open Sans', Arial, sans-serif !important;
          font-weight: 400;
        }
        .canal-card-btn {
          background: #19b6f7;
          color: #fff;
          font-family: 'Poppins', Arial, sans-serif !important;
          font-weight: 700;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
          text-decoration: none;
          font-size: 1.01rem;
          transition: background 0.2s;
          margin-top: auto;
          display: inline-block;
        }
        .canal-card-btn:hover {
          background: #007dc1;
        }
        @media (max-width: 900px) {
          .canales-contacto-grid {
            flex-direction: column;
            align-items: center;
          }
          .canal-card {
            max-width: 400px;
            min-width: 0;
            width: 100%;
          }
        }

        .ucab-hero-title {
          font-family: 'Poppins', 'Arial', sans-serif !important;
          font-weight: 600 !important;
          text-transform: uppercase;
          font-size: 1.1rem;
          line-height: 1.1;
          color: #fff;
          letter-spacing: 8px;
          margin-bottom: 16px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.18);
        }

        .ver-carreras-btn {
          background: #f6fafd;
          border: 1px solid #e5e7eb;
          color: #003366;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 50px;
          font-weight: 700;
          font-family: 'Poppins', 'Arial', sans-serif !important;
          font-size: 1rem;
          margin-left: 18px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 8px #f9b23322;
        }
        .ver-carreras-btn:hover {
          background: #eaf6fb;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        @media (max-width: 992px) {
          .ver-carreras-btn {
            display: none !important;
          }
        }

        .scroll-down-indicator-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          margin-top: -18px;
          z-index: 10;
          pointer-events: none;
        }
        .scroll-down-indicator {
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
          pointer-events: auto;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .scroll-down-indicator:hover {
          transform: translateY(4px) scale(1.08);
        }
        .arrow-down-svg svg {
          display: block;
        }
        @media (max-width: 992px) {
          .scroll-down-indicator-wrapper {
            display: none !important;
          }
        }
      `}</style>

      <div className="ucab-home-page-wrapper" style={{ position: "relative" }}>
        <div className="ucab-home-page" style={{ position: "relative", zIndex: 2 }}>
          <header className="ucab-header">
            <img src="/OrientaUcab.png" alt="Orienta UCAB Logo" className="ucab-header-logo" />
            <a
              href="https://www.ucab.edu.ve/oferta-academica/pregrado/"
              className="ver-carreras-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver carreras UCAB
            </a>
          </header>

          <main className="ucab-main-content">
            <div className="left-panel">
              <div className="main-image-container">
                <img
                  src="/HeroSection.png"
                  alt="Estudiante descubriendo su vocación"
                  className="main-image"
                />
              </div>
            </div>
            <div className="right-panel">
              <h1 className="ucab-hero-title">EL PRIMER PASO HACIA TU FUTURO UCABISTA</h1>
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

        <div className="scroll-down-indicator-wrapper">
          <button
            className="scroll-down-indicator"
            aria-label="Bajar a la sección ¿Cómo funciona?"
            onClick={() => {
              const section = document.getElementById('como-funciona-section');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="arrow-down-svg" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#40B4E5" strokeWidth="2" fill="#fff" />
                <path d="M9 13l5 5 5-5" stroke="#40B4E5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>

        {/* Modern How it works section */}
        <section id="como-funciona-section" className="modern-section how-it-works-section">
          <div className="section-container">
            <h2 className="section-title">¿CÓMO FUNCIONA?</h2>
            <div className="steps-row">
              <div className="step-inline">
                <span className="step-inline-icon" role="img" aria-label="Completa tus datos">
                  📝
                </span>
                <div className="step-inline-content">
                  <span className="step-inline-title">COMPLETA TUS DATOS</span>
                  <span className="step-inline-desc">
                    Ingresa tu información básica para personalizar tu experiencia
                  </span>
                </div>
              </div>
              <div className="step-inline">
                <span className="step-inline-icon" role="img" aria-label="Responde las preguntas">
                  ❓
                </span>
                <div className="step-inline-content">
                  <span className="step-inline-title">RESPONDE LAS PREGUNTAS</span>
                  <span className="step-inline-desc">Contesta honestamente sobre tus intereses y habilidades</span>
                </div>
              </div>
              <div className="step-inline">
                <span className="step-inline-icon" role="img" aria-label="Recibe tu recomendación">
                  💡
                </span>
                <div className="step-inline-content">
                  <span className="step-inline-title">RECIBE TU RECOMENDACIÓN</span>
                  <span className="step-inline-desc">Obtén un análisis detallado de tu perfil vocacional</span>
                </div>
              </div>
              <div className="step-inline">
                <span className="step-inline-icon" role="img" aria-label="Explora las carreras">
                  🎓
                </span>
                <div className="step-inline-content">
                  <span className="step-inline-title">EXPLORA LAS CARRERAS</span>
                  <span className="step-inline-desc">Descubre las opciones académicas que mejor se adaptan a ti</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <div className="banner-full-width-section">
          <a href="https://www.ucab.edu.ve/pregrado/" target="_blank" rel="noopener noreferrer">
            <img
              src="/banner_catedras_libres_ucab.png"
              alt="Banner Cátedras Libres UCAB"
              className="banner-full-width"
              style={{ width: "100%", height: "auto", display: "block", margin: "0 auto", maxWidth: "100%" }}
            />
          </a>
        </div>

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
        <section className="modern-section canales-contacto-section">
          <div className="section-container">
            <h2 className="section-title">CANALES DE CONTACTO</h2>
            <p className="canales-contacto-desc">
              Aquí encontrarás los datos de las Escuelas, Unidades de Apoyo y dependencias administrativas de la UCAB.
            </p>
            <div className="canales-contacto-grid">
              {/* Card 1 */}
              <div className="canal-card">
                <img
                  src="https://dstvqyil45ir9.cloudfront.net/wp-content/uploads/2021/08/ucab-asistencia-academico-administrativa.png"
                  alt="Asistencia Académico-Administrativa"
                  className="canal-card-img"
                />
                <h3 className="canal-card-title">ASISTENCIA ACADÉMICO–ADMINISTRATIVA</h3>
                <p className="canal-card-desc">Conecta con las distintas dependencias de la UCAB.</p>
                <a
                  href="https://www.ucab.edu.ve/asistencia-academico-administrativa/"
                  className="canal-card-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  COMUNÍCATE AQUÍ
                </a>
              </div>
              {/* Card 2 */}
              <div className="canal-card">
                <img
                  src="https://dstvqyil45ir9.cloudfront.net/wp-content/uploads/2021/10/Secretaria-enlinea.jpg"
                  alt="Asistencia Técnica"
                  className="canal-card-img"
                />
                <h3 className="canal-card-title">ASISTENCIA TÉCNICA</h3>
                <p className="canal-card-desc">
                  ¿Necesitas soporte técnico en las plataformas de la UCAB? Encuentra aquí la ayuda que buscas.
                </p>
                <a
                  href="https://www.ucab.edu.ve/asistencia-tecnica/"
                  className="canal-card-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  COMUNÍCATE AQUÍ
                </a>
              </div>
              {/* Card 3 */}
              <div className="canal-card">
                <img
                  src="https://dstvqyil45ir9.cloudfront.net/wp-content/uploads/2021/10/asesoramiento-psicologico.jpg"
                  alt="Asesoramiento Psicológico"
                  className="canal-card-img"
                />
                <h3 className="canal-card-title">ASESORAMIENTO PSICOLÓGICO</h3>
                <p className="canal-card-desc">
                  Te brindamos apoyo y guía para que te adaptes a la vida universitaria.
                </p>
                <a
                  href="https://www.ucab.edu.ve/informacion-institucional/unidades-de-apoyo/cadh/"
                  className="canal-card-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  COMUNÍCATE AQUÍ
                </a>
              </div>
              {/* Card 4 */}
              <div className="canal-card">
                <img
                  src="https://dstvqyil45ir9.cloudfront.net/wp-content/uploads/2023/05/Canal-ucab.jpg"
                  alt="Reclamos y Sugerencias"
                  className="canal-card-img"
                />
                <h3 className="canal-card-title">RECLAMOS Y SUGERENCIAS</h3>
                <p className="canal-card-desc">
                  Queremos saber su opinión. Envíenos sus ideas, reclamos y/o propuestas.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSef0yJVBD0Peh5OAY1cRF462qyvDF_oizl50TnLeaMUi5aqEQ/viewform"
                  className="canal-card-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  COMUNÍCATE AQUÍ
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Footer */}
        <footer className="ucab-footer-new">
          <div className="footer-links-new">
            <a href="https://extensionesocial.ucab.edu.ve" target="_blank" rel="noopener noreferrer">
              Extensión Social
            </a>
            <a href="https://fundacionandresbello.org" target="_blank" rel="noopener noreferrer">
              Fundación Andrés Bello
            </a>
            <a href="https://donaciones.ucab.edu.ve" target="_blank" rel="noopener noreferrer">
              Donaciones
            </a>
            <a href="https://proyectoencovi.com" target="_blank" rel="noopener noreferrer">
              Proyecto ENCOVI
            </a>
            <a href="https://unai.ucab.edu.ve" target="_blank" rel="noopener noreferrer">
              UNAI
            </a>
            <a href="https://jesuitas.org.ve" target="_blank" rel="noopener noreferrer">
              Compañía de Jesús
            </a>
            <a href="https://ausjal.org" target="_blank" rel="noopener noreferrer">
              AUSJAL
            </a>
            <a href="https://empleo.ucab.edu.ve" target="_blank" rel="noopener noreferrer">
              Ofertas de empleo
            </a>
            <a href="https://libreriadigital.ucab.edu.ve" target="_blank" rel="noopener noreferrer">
              Librería Digital
            </a>
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
                <path
                  d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7v3h3v7h3v-7h2.5l.5-3H13V7a1.5 1.5 0 0 1 1.5-1.5H17v-3z"
                  strokeWidth="2"
                />
              </svg>
            </a>
            <a href="https://twitter.com/ucabve" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6 1A4.11 4.11 0 0 0 12 8.09c0 .32.04.64.1.94A11.65 11.65 0 0 1 3 4.89a4.07 4.07 0 0 0-.56 2.07c0 1.43.73 2.69 1.85 3.43a4.07 4.07 0 0 1-1.86-.51v.05c0 2 1.42 3.66 3.3 4.04a4.1 4.1 0 0 1-1.85.07c.52 1.62 2.03 2.8 3.82 2.83A8.24 8.24 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 5.92z"
                  strokeWidth="2"
                />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default UcabHomePage
