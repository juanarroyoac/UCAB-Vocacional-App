// src/components/ResultsScreen.jsx
// Muestra las carreras más afines al estudiante en un formato de "stories" similar a Spotify Wrapped.

import { useEffect, useState, useMemo } from 'react';
import { runAiInteraction } from '../gemini.js';
import ucabLogo from '../assets/ucab-logo.png';
import './ResultsScreen.css'; // Make sure to create and use this new CSS file

// Import Chart.js components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


import { useNavigate } from 'react-router-dom';

function ResultsScreen({ results, answers, onRestart }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aiInsight, setAiInsight] = useState('');
  const [aiCareerOverviews, setAiCareerOverviews] = useState({});
  const [loading, setLoading] = useState(true);

  // Memoize topResults to prevent re-calculations and stabilize dependencies
  const topResults = useMemo(() => results?.slice(0, 3) || [], [results]);

  useEffect(() => {
    // Add full-screen class to App container
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.classList.add('full-screen-story');
    }
    
    // Cleanup when component unmounts
    return () => {
      if (appElement) {
        appElement.classList.remove('full-screen-story');
      }
    };
  }, []);

  // Effect to fetch all AI-generated content at the beginning
  useEffect(() => {
    if (topResults.length === 0) return;

    let cancelled = false;
    
    async function fetchAllAiContent() {
      setLoading(true);

      // 1. Fetch the main "Vocational Personality"
      const personalityPrompt = `Basado en estas respuestas de un test vocacional: ${JSON.stringify(answers)}. Describe la personalidad vocacional del estudiante en una frase corta y pegadiza (ej: 'El Arquitecto de Ideas' o 'El Comunicador Empático'). Luego, escribe 2-3 frases explicando esta personalidad en un tono motivador y perspicaz. Formato: Frase Pegadiza|Explicación.`;
      
      const insightPromise = runAiInteraction(personalityPrompt).catch(e => 'Error|No pudimos generar tu perfil. ¡Pero tus resultados son excelentes!');

      // 2. Fetch overviews for each top career
      const careerOverviewsPromises = Promise.all(
        topResults.map(async (career) => {
          const overviewPrompt = `En 2-3 frases, explica por qué la carrera de ${career.carrera} es una excelente opción para alguien con esta personalidad y respuestas: ${JSON.stringify(answers)}. Usa un tono inspirador y directo.`;
          try {
            const overview = await runAiInteraction(overviewPrompt);
            return { carrera: career.carrera, overview };
          } catch (e) {
            return { carrera: career.carrera, overview: `Explora cómo tus habilidades pueden brillar en ${career.carrera}.` };
          }
        })
      );

      const [insightResult, careerResults] = await Promise.all([insightPromise, careerOverviewsPromises]);

      if (!cancelled) {
        setAiInsight(insightResult || 'Tu Perfil Vocacional|Hemos analizado tus respuestas para encontrar las mejores carreras para ti.');
        
        const overviewsMap = careerResults.reduce((acc, item) => {
          acc[item.carrera] = item.overview;
          return acc;
        }, {});
        setAiCareerOverviews(overviewsMap);

        setLoading(false);
      }
    }

    fetchAllAiContent();

    return () => { cancelled = true; };
  }, [topResults, answers]);


  const handleNext = () => {
    // Total slides: 1 (Intro) + 1 (Personality) + 3 (Careers) + 1 (Summary) = 6
    if (currentSlide < 5) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const [personalityTitle, personalityDesc] = aiInsight.split('|');

  const chartData = {
    labels: topResults.map((career) => career.carrera),
    datasets: [
      {
        label: 'Compatibilidad',
        data: topResults.map((career) => career.compatibilidad),
        backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Tu Top 3 de Carreras',
        color: '#FFFFFF',
        font: {
            size: 18,
            family: "'Inter', sans-serif"
        }
      },
    },
    scales: {
      x: {
        ticks: { color: '#FFFFFF' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' }
      },
      y: {
        ticks: { color: '#FFFFFF' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' }
      }
    }
  };


  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="results-story-container loading">
        <img src={ucabLogo} alt="Logo UCAB" className="logo" />
        <div className="loader-text">Analizando tus pasiones...</div>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="results-story-container" onClick={handleNext}>

      {/* Slide 0: Welcome */}
      <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
        <div className="slide-content">
          <img src={ucabLogo} alt="Logo UCAB" className="logo-intro" />
          <h1 className="animate-fade-in">Tus resultados están listos.</h1>
          <p className="animate-fade-in-delay-1">Toca para continuar</p>
        </div>
      </div>

      {/* Slide 1: AI Personality */}
      <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
        <div className="slide-content">
          <p className="slide-supertitle animate-fade-in">Basado en tus respuestas, tu perfil vocacional es...</p>
          <h1 className="animate-pop-in">{personalityTitle}</h1>
          <p className="slide-description animate-fade-in-delay-1">{personalityDesc}</p>
        </div>
      </div>

      {/* Slides 2, 3, 4: Career Reveals */}
      {[2, 1, 0].map((careerIndex, slideIndex) => (
        <div className={`slide slide-career ${currentSlide === slideIndex + 2 ? 'active' : ''}`} key={careerIndex}>
          <div className="slide-content">
            <p className="slide-supertitle animate-fade-in">En la posición #{3 - slideIndex}</p>
            <h1 className="animate-pop-in">{topResults[careerIndex]?.carrera}</h1>
            <p className="slide-description animate-fade-in-delay-1">
              {aiCareerOverviews[topResults[careerIndex]?.carrera] || "Cargando descripción..."}
            </p>
            <div className="career-details animate-fade-in-delay-2">
              <strong>Facultad:</strong> {topResults[careerIndex]?.facultad} <br/>
              <strong>Áreas Clave:</strong> {topResults[careerIndex]?.palabras_clave_intereses?.slice(0, 3).join(', ')}
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide 5: Summary */}
      <div className={`slide slide-summary ${currentSlide === 5 ? 'active' : ''}`}>
        <div className="slide-content full-width">
          <h1 className="animate-fade-in">Tu Resumen Vocacional</h1>
          <div className="summary-chart-container animate-fade-in-delay-1">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <p className="animate-fade-in-delay-2">¡Felicitaciones por completar el test!</p>
          <button onClick={(e) => { e.stopPropagation(); if (onRestart) onRestart(); navigate('/'); }} className="restart-button animate-fade-in-delay-2">
            Hacer el test de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsScreen;