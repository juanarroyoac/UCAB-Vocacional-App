// src/components/ResultsScreen.jsx
// Muestra las carreras más afines al estudiante en un formato de "stories" similar a Spotify Wrapped.

import './ResultsScreen.css';
import React, { useState, useEffect } from 'react';
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


// --- COMPONENTE PRINCIPAL DE RESULTADOS ---
function ResultsScreen({ results, isLoading, onRestart, user }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Helper para normalizar nombres de carrera para URLs
  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Asegura que careers sea siempre un array
  const safeCareers = Array.isArray(results?.careers) ? results.careers : [];

  // Generamos los slides dinámicamente a partir de los resultados
  const slides = [
    // 1. Slide de Bienvenida
    {
      type: 'intro',
      content: {
        supertitle: `¡Hola, ${user?.name || 'futuro ucabista'}!`,
        title: 'Hemos analizado tus resultados.',
        description: 'Prepárate para descubrir tu vocación.'
      }
    },
    // 2. Slide de Arquetipo
    {
      type: 'archetype',
      content: {
        supertitle: 'Tu Perfil Vocacional',
        title: results?.personality,
        description: results?.description
      }
    },
    // 3. Slides de Carreras (Top 3)
    ...safeCareers.slice(0, 3).map((career, index) => ({
      type: 'career',
      content: {
        supertitle: `Tu Opción #${index + 1}`,
        title: career.name,
        details: `${career.faculty} • ${career.score}% de Afinidad`,
        reason: career.reason,
        url: `https://www.ucab.edu.ve/carreras/${slugify(career.name)}`
      }
    })),
    // 4. Slide de Resumen y Gráfico
    {
        type: 'summary_chart',
        content: {
            supertitle: 'Tu Afinidad en Detalle',
            title: 'Tus 3 carreras principales',
            chartData: {
                labels: safeCareers.slice(0, 3).map(c => c.name),
                datasets: [{
                    label: 'Puntaje de Afinidad',
                    data: safeCareers.slice(0, 3).map(c => c.score),
                    backgroundColor: ['#DFAF3F', '#a9d6e5', '#f8f9fa'],
                    borderColor: '#034078',
                    borderWidth: 2,
                }]
            }
        }
    },
    // 5. Slide Final (Podio y Reinicio)
    {
      type: 'summary_podium',
      content: {
        title: 'Explora tu Futuro',
        careers: safeCareers.slice(0, 3).map(c => ({
            ...c,
            url: `https://www.ucab.edu.ve/carreras/${slugify(c.name)}`
        }))
      }
    }
  ];

  // --- MANEJO DE LA INTERACTIVIDAD ---
  const totalSlides = slides.length;

  const handleInteraction = (e) => {
    // Evitar que el click en un link avance el slide
    if (e.target.tagName === 'A') return;
    
    setAnimationKey(prev => prev + 1); // Reinicia la animación de la barra
    setActiveSlide(prev => (prev + 1) % totalSlides);
  };
  
  // Detener el avance automático cuando se llega al final
  useEffect(() => {
    if (activeSlide === totalSlides -1) return;

    const timer = setTimeout(() => {
         setAnimationKey(prev => prev + 1);
         setActiveSlide(prev => prev + 1);
    }, 5000); // Avance automático cada 5 segundos
    return () => clearTimeout(timer);
  }, [activeSlide, totalSlides]);


  // --- RENDERIZADO ---
  if (isLoading || !results) {
    return <LoadingSpinner />;
  }

  return (
    <div className="results-story-container" onClick={handleInteraction}>
      <img src="https://ucab.edu.ve/wp-content/uploads/2019/07/logo-ucab-blanco-600x583.png" alt="UCAB Logo" className="logo" />

      {/* Barra de Progreso */}
      <div className="progress-bar">
        {slides.map((_, index) => (
          <div key={index} className="progress-segment">
            <div
              className={`progress-fill ${index < activeSlide ? 'visited' : ''} ${index === activeSlide ? 'active' : ''}`}
              key={animationKey} // Clave para forzar el reinicio de la animación
            ></div>
          </div>
        ))}
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div key={index} className={`slide ${index === activeSlide ? 'active' : ''}`}>
          <div className="slide-content">
            {/* Renderizado condicional según el tipo de slide */}

            {/* INTRO Y ARQUETIPO */}
            {(slide.type === 'intro' || slide.type === 'archetype') && (
              <>
                <p className="slide-supertitle animate-fade-in">{slide.content.supertitle}</p>
                <h1 className="slide-title animate-pop-in">{slide.content.title}</h1>
                <p className="slide-description animate-fade-in-delay-1">{slide.content.description}</p>
              </>
            )}

            {/* CARRERAS */}
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

            {/* RESUMEN CON GRÁFICO */}
            {slide.type === 'summary_chart' && (
                 <>
                    <p className="slide-supertitle animate-fade-in">{slide.content.supertitle}</p>
                    <h1 className="slide-title animate-pop-in">{slide.content.title}</h1>
                    <div className="summary-chart-container animate-fade-in-delay-1">
                         <Bar
                            data={slide.content.chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                indexAxis: 'y', // Gráfico de barras horizontales
                                scales: {
                                    x: { ticks: { color: 'white', font: { weight: 'bold' } }, grid: { color: 'rgba(255,255,255,0.2)' }, suggestedMax: 100 },
                                    y: { ticks: { color: 'white', font: { weight: 'bold', size: 12 } }, grid: { color: 'rgba(255,255,255,0.2)' } }
                                },
                                plugins: { legend: { display: false } }
                            }}
                        />
                    </div>
                 </>
            )}

            {/* PODIO FINAL */}
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
                            <span>{c.faculty}</span>
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