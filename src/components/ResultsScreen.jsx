// src/components/ResultsScreen.jsx
// Muestra las carreras más afines al estudiante en un formato de "stories" similar a Spotify Wrapped.

import './ResultsScreen.css';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ucabCareers from '../ucab_carreras.json';
import ucabLogo from '../assets/Logo_UCAB_blanco_3.png';

const AUTO_ADVANCE_MS = 5000;

// --- COMPONENTE SPINNER DE CARGA ---
const LoadingSpinner = () => (
  <div className="results-story-container loading">
    <div className="spinner"></div>
    <div className="loader-text">Analizando tu vocación...</div>
  </div>
);

// --- COMPONENTE DE ERROR ---
// Este componente se mostrará si los resultados no se cargan correctamente.
const ErrorDisplay = ({ onRestart }) => (
  <div className="results-story-container loading">
    <div className="slide-content" style={{ textAlign: 'center', color: 'white' }}>
      <h1 className="slide-title">Error en los Resultados</h1>
      <p className="slide-description" style={{ margin: '1rem 0' }}>
        No se pudieron generar las diapositivas porque los datos recibidos estaban incompletos.<br />
        Por favor, asegúrate de que el análisis vocacional se completó y proporcionó un perfil y una lista de carreras.
      </p>
      <button className="restart-button" onClick={onRestart} style={{ marginTop: '2rem' }}>
        Volver a Empezar
      </button>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL DE RESULTADOS ---
function ResultsScreen({ results, isLoading, onRestart, user }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animState, setAnimState] = useState('in');
  const timerRef = useRef();

  // Helper para enriquecer las carreras con URL y facultad
  const enrichCareer = (career) => {
    const found = ucabCareers.find(c => c.carrera === career.name);
    return found ? { ...career, url: found.url, facultad: found.facultad } : { ...career };
  };

  // Construir el array de slides a partir de los resultados
  const slides = useMemo(() => {
    if (!results) return [];
    const arr = [];
    if (results.personality) {
      arr.push({
        type: 'personality',
        content: results.personality
      });
    }
    if (Array.isArray(results.qualities)) {
      arr.push({
        type: 'qualities',
        content: results.qualities
      });
    }
    if (Array.isArray(results.careers)) {
      for (let i = 0; i < 3; i++) {
        if (results.careers[i]) {
          arr.push({
            type: 'career',
            content: enrichCareer(results.careers[i])
          });
        }
      }
      // Slide de resumen
      arr.push({
        type: 'summary',
        content: results.careers.slice(0, 3).map(enrichCareer)
      });
    }
    return arr;
  }, [results]);

  // Lógica de auto-avanze
  useEffect(() => {
    if (isPaused || activeSlide === slides.length - 1) return;
    timerRef.current = setTimeout(() => {
      setAnimState('out');
      setTimeout(() => {
        setActiveSlide(s => Math.min(s + 1, slides.length - 1));
        setAnimState('in');
      }, 400);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timerRef.current);
  }, [activeSlide, isPaused, slides.length]);

  // Navegación
  const goToSlide = (dir) => {
    setAnimState('out');
    setTimeout(() => {
      setActiveSlide(s => {
        if (dir === 'next') return Math.min(s + 1, slides.length - 1);
        if (dir === 'prev') return Math.max(s - 1, 0);
        return s;
      });
      setAnimState('in');
    }, 400);
  };

  // Navegación por clic/tap
  const handleInteraction = (e) => {
    if (e.target.closest('a,button')) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    if (x < bounds.left + bounds.width / 2) {
      goToSlide('prev');
    } else {
      goToSlide('next');
    }
  };

  // Pausar/reanudar
  const togglePause = (e) => {
    e.stopPropagation();
    setIsPaused(p => !p);
  };

  // Cargando o error
  if (isLoading) return <LoadingSpinner />;
  if (!results || slides.length === 0) return <ErrorDisplay onRestart={onRestart} />;

  // Barra de progreso
  const progressSegments = slides.map((_, idx) => (
    <div key={idx} className="progress-segment">
      <div
        className={`progress-fill${idx < activeSlide ? ' visited' : ''}${idx === activeSlide && !isPaused ? ' active' : ''}`}
        style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
      ></div>
    </div>
  ));

  // Renderizado de slides
  const renderSlide = (slide, idx) => {
    if (slide.type === 'personality') {
      return (
        <div className="slide-content anim-in">
          <p className="slide-supertitle">Tu arquetipo vocacional</p>
          <h1 className="slide-title">{slide.content.name}</h1>
          <p className="slide-description">{slide.content.description}</p>
        </div>
      );
    }
    if (slide.type === 'qualities') {
      return (
        <div className="slide-content anim-in">
          <p className="slide-supertitle">Tus 5 cualidades destacadas</p>
          <ul className="qualities-list">
            {slide.content.map((q, i) => (
              <li key={i} className="quality-pill">{q}</li>
            ))}
          </ul>
        </div>
      );
    }
    if (slide.type === 'career') {
      return (
        <div className="slide-content anim-in">
          <p className="slide-supertitle">Recomendación #{slide.content.rank}</p>
          <h1 className="slide-title-career">{slide.content.name}</h1>
          <div className="career-story">{slide.content.story}</div>
          <div className="career-reasoning">{slide.content.reasoning}</div>
          {slide.content.facultad && <div className="career-faculty">Facultad: {slide.content.facultad}</div>}
          {slide.content.url && (
            <a className="career-link-button" href={slide.content.url} target="_blank" rel="noopener noreferrer">Ver carrera en UCAB</a>
          )}
        </div>
      );
    }
    if (slide.type === 'summary') {
      return (
        <div className="slide-content anim-in">
          <h2 className="summary-title">Tu ranking personalizado</h2>
          <div className="summary-ranking">
            {slide.content.map((c, i) => (
              <a className="rank-item" href={c.url} target="_blank" rel="noopener noreferrer" key={i}>
                <span className="rank-number">{c.rank}</span>
                <span className="rank-info">
                  <strong>{c.name}</strong>
                  <span>{c.facultad}</span>
                </span>
                <span className="rank-arrow">→</span>
              </a>
            ))}
          </div>
          <button className="restart-button" onClick={e => { e.stopPropagation(); onRestart(); }}>Volver a empezar</button>
        </div>
      );
    }
    return null;
  };

  // Iconos de pausa/reproducción
  const pauseIcon = (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="5" width="4" height="14" rx="2"/><rect x="14" y="5" width="4" height="14" rx="2"/></svg>
  );
  const playIcon = (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="6,4 20,12 6,20"/></svg>
  );

  return (
    <div className="results-story-container" onClick={handleInteraction}>
      <img src={ucabLogo} alt="UCAB Logo" className="logo" />
      <div className="story-header">
        <div className="progress-bar">{progressSegments}</div>
        <button className="pause-button" onClick={togglePause} aria-label={isPaused ? 'Reanudar' : 'Pausar'}>
          {isPaused ? playIcon : pauseIcon}
        </button>
      </div>
      {slides.map((slide, idx) => (
        <div key={idx} className={`slide${idx === activeSlide ? ' active' : ''} anim-${animState}`}
          style={{ zIndex: idx === activeSlide ? 2 : 1 }}>
          {idx === activeSlide && renderSlide(slide, idx)}
        </div>
      ))}
    </div>
  );
}

export default ResultsScreen;