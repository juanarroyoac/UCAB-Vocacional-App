// src/components/ResultsScreen.jsx
// Muestra las carreras más afines al estudiante en un formato de "stories" similar a Spotify Wrapped.

import './ResultsScreen.css';
import React, { useState, useEffect, useRef } from 'react';
import careersData from '../ucab_carreras.json';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
            <p className="slide-description" style={{margin: '1rem 0'}}>
                No se pudieron generar las diapositivas porque los datos recibidos estaban incompletos.
                <br/>
                Por favor, asegúrate de que el análisis vocacional se completó y proporcionó un perfil, intereses y una lista de carreras.
            </p>
            <button className="restart-button" onClick={onRestart} style={{marginTop: '2rem'}}>
                Volver a Empezar
            </button>
        </div>
    </div>
);


// --- COMPONENTE PRINCIPAL DE RESULTADOS ---
function ResultsScreen({ results, isLoading, onRestart, user }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Helper para normalizar nombres de carrera para URLs
  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Asegura que careers sea siempre un array
  const safeCareers = Array.isArray(results?.careers) ? results.careers : [];

  // Helper para buscar datos originales de la carrera
  const getCareerData = (careerName) => careersData.find(c => c.carrera === careerName) || {};

  // Generamos los slides dinámicamente a partir de los resultados
  const slides = [
    results?.main_interests && {
      type: 'interests',
      content: {
        supertitle: `¡Hola, ${user?.name || 'futuro ucabista'}!`,
        title: 'Tus intereses principales',
        description: results.main_interests
      }
    },
    results?.personality_profile && {
      type: 'profile',
      content: {
        supertitle: 'Tu Perfil de Personalidad',
        title: 'Así eres tú',
        description: results.personality_profile
      }
    },
    safeCareers[2] && {
      type: 'career',
      content: {
        supertitle: 'Tu Opción #3',
        title: safeCareers[2].name,
        details: `${getCareerData(safeCareers[2].name).facultad || ''}`,
        reason: safeCareers[2].fun_overview || getCareerData(safeCareers[2].name).fun_overview || '',
        url: safeCareers[2].url || getCareerData(safeCareers[2].name).url || `https://www.ucab.edu.ve/carreras/${slugify(safeCareers[2].name)}`
      }
    },
    safeCareers[1] && {
      type: 'career',
      content: {
        supertitle: 'Tu Opción #2',
        title: safeCareers[1].name,
        details: `${getCareerData(safeCareers[1].name).facultad || ''}`,
        reason: safeCareers[1].fun_overview || getCareerData(safeCareers[1].name).fun_overview || '',
        url: safeCareers[1].url || getCareerData(safeCareers[1].name).url || `https://www.ucab.edu.ve/carreras/${slugify(safeCareers[1].name)}`
      }
    },
    safeCareers[0] && {
      type: 'career',
      content: {
        supertitle: 'Tu Opción #1',
        title: safeCareers[0].name,
        details: `${getCareerData(safeCareers[0].name).facultad || ''}`,
        reason: safeCareers[0].fun_overview || getCareerData(safeCareers[0].name).fun_overview || '',
        url: safeCareers[0].url || getCareerData(safeCareers[0].name).url || `https://www.ucab.edu.ve/carreras/${slugify(safeCareers[0].name)}`
      }
    },
    // El podio final solo se añade si hay carreras que mostrar
    safeCareers.length > 0 && {
      type: 'summary_podium',
      content: {
        title: 'Explora tu Futuro',
        careers: safeCareers.slice(0, 3).map((c) => {
          const original = getCareerData(c.name);
          return {
            ...c,
            facultad: original.facultad,
            url: c.url || original.url || `https://www.ucab.edu.ve/carreras/${slugify(c.name)}`
          };
        })
      }
    }
  ].filter(Boolean);

  // --- MANEJO DE LA INTERACTIVIDAD ---
  const totalSlides = slides.length;
  const autoAdvanceTimeout = useRef(null);
  const [slideAnim, setSlideAnim] = useState('in');

  const handleInteraction = (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
      e.stopPropagation();
      return;
    }
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const isLeft = x < bounds.left + bounds.width / 2;
    
    clearTimeout(autoAdvanceTimeout.current);

    setSlideAnim('out');
    setTimeout(() => {
      setAnimationKey(prev => prev + 1);
      setActiveSlide(prev => {
        if (isLeft) {
          return prev === 0 ? 0 : prev - 1;
        } else {
          return prev === totalSlides - 1 ? prev : prev + 1;
        }
      });
      setSlideAnim('in');
    }, 500);
  };
  
  useEffect(() => {
    if (activeSlide >= totalSlides - 1) {
      clearTimeout(autoAdvanceTimeout.current);
      return;
    }
    autoAdvanceTimeout.current = setTimeout(() => {
      setSlideAnim('out');
      setTimeout(() => {
        setAnimationKey(prev => prev + 1);
        setActiveSlide(prev => prev + 1);
        setSlideAnim('in');
      }, 500);
    }, 5000); 

    return () => clearTimeout(autoAdvanceTimeout.current);
  }, [activeSlide, totalSlides]);

  // --- RENDERIZADO ---
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // *** FIX IMPLEMENTED HERE ***
  // Si después de filtrar, no hay slides, significa que el prop 'results' llegó vacío o incompleto.
  // En lugar de renderizar un componente roto, mostramos un error claro.
  if (!results || totalSlides === 0) {
    return <ErrorDisplay onRestart={onRestart} />;
  }

  return (
    <div className="results-story-container" onClick={handleInteraction}>
      <img src="https://ucab.edu.ve/wp-content/uploads/2019/07/logo-ucab-blanco-600x583.png" alt="UCAB Logo" className="logo" />

      <div className="progress-bar">
        {slides.map((_, index) => (
          <div key={index} className="progress-segment">
            <div
              className={`progress-fill ${index < activeSlide ? 'visited' : ''} ${index === activeSlide ? 'active' : ''}`}
              key={animationKey}
              style={{ animationDuration: '5s' }}
            ></div>
          </div>
        ))}
      </div>

      {slides.map((slide, index) => (
        <div key={index} className={`slide ${index === activeSlide ? 'active' : ''}`}>
          <div className={`slide-content slide-content-anim${index === activeSlide ? ' ' + slideAnim : ''}`}> 
            
            {(slide.type === 'interests' || slide.type === 'profile') && (
              <>
                <p className="slide-supertitle animate-fade-in">{slide.content.supertitle}</p>
                <h1 className="slide-title animate-pop-in">{slide.content.title}</h1>
                <p className="slide-description animate-fade-in-delay-1">{slide.content.description}</p>
              </>
            )}

            {slide.type === 'career' && (
              <>
                <p className="slide-supertitle animate-fade-in">{slide.content.supertitle}</p>
                <h1 className="slide-title-career animate-pop-in">{slide.content.title}</h1>
                <div className="career-details animate-fade-in-delay-1">
                  <strong>{slide.content.details}</strong>
                  <p>{slide.content.reason}</p>
                </div>
                <a href={slide.content.url} target="_blank" rel="noopener noreferrer" className="career-link-button animate-fade-in-delay-1">Conoce más</a>
              </>
            )}

            {slide.type === 'summary_podium' && (
              <div className="summary-card animate-pop-in">
                <h2 className="summary-title">{slide.content.title}</h2>
                <ol className="summary-list">
                  {(Array.isArray(slide.content.careers) ? slide.content.careers : []).map((c, i) => (
                    <li key={i}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer">
                        <span className="podium-rank">{i + 1}</span>
                        <div className="podium-career-info">
                            <strong>{c.name}</strong>
                            <span>{c.facultad}</span>
                        </div>
                        <span className="podium-arrow">›</span>
                      </a>
                    </li>
                  ))}
                </ol>
                <button className="restart-button" onClick={(e) => { e.stopPropagation(); onRestart(); }}>
                    Volver a empezar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsScreen;