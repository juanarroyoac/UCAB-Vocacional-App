import React from "react";
import "./AboutTest.css";

const AboutTest = () => {
  return (
    <div className="about-test-container">
      {/* UCAB Header (copied from homepage) */}
      <header className="ucab-header">
        <a href="/" className="logo-container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png" alt="UCAB Logo" className="logo-ucab" />
          <span className="logo-text-ucab">Portal Vocacional</span>
        </a>
        <div className="header-actions">
          <a href="https://www.ucab.edu.ve/pregrado/" className="career-link" target="_blank" rel="noopener noreferrer">Áreas Profesionales</a>
          <a href="/acerca" className="career-link">Acerca del test</a>
          <a href="/" className="test-button">Haz el test</a>
        </div>
      </header>
      {/* End UCAB Header */}
      <div className="about-hero">
        <svg width="100%" height="180" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="about-hero-svg">
          <defs>
            <linearGradient id="aboutGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path fill="url(#aboutGradient)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
        <h1 className="about-title">¿Qué es el Test Vocacional UCAB?</h1>
      </div>
      <section className="about-content">
        <div className="about-card">
          <h2>Propósito del Test</h2>
          <p>
            El Test Vocacional UCAB es una herramienta interactiva diseñada para ayudarte a descubrir tus intereses, habilidades y valores profesionales. A través de preguntas cuidadosamente seleccionadas, podrás identificar áreas de estudio y carreras que se alinean con tu perfil personal.
          </p>
        </div>
        <div className="about-card about-card-row">
          <div className="about-card-shape about-card-shape-1"></div>
          <div>
            <h2>¿Cómo funciona?</h2>
            <ul>
              <li>Responde preguntas sobre tus intereses y preferencias.</li>
              <li>Recibe recomendaciones personalizadas de áreas profesionales.</li>
              <li>Explora carreras afines y recursos adicionales.</li>
            </ul>
          </div>
        </div>
        <div className="about-card about-card-row">
          <div>
            <h2>¿Por qué es importante?</h2>
            <p>
              Elegir una carrera es una de las decisiones más importantes de tu vida. Este test te brinda una guía moderna y confiable para tomar decisiones informadas sobre tu futuro académico y profesional.
            </p>
          </div>
          <div className="about-card-shape about-card-shape-2"></div>
        </div>
        <div className="about-card about-card-highlight about-card-buttons no-bg-card">
          <div className="about-buttons-container">
            <a href="https://www.ucab.edu.ve/oferta-academica/carreras/" target="_blank" rel="noopener noreferrer" className="about-btn about-btn-careers">Ver carreras UCAB</a>
            <button className="about-btn about-btn-test" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Tomar el test ahora</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutTest;
