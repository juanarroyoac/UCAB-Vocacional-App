"use client"
import "./ResultsScreen.css"
import { useState, useEffect, useMemo, useRef } from "react"
import ucabCareers from "../ucab_carreras.json"

// Enhanced Loading Component
const EnhancedLoading = () => (
  <div className="enhanced-loading">
    <div className="loading-animation">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <div className="loading-text">
        <h2>Preparando tu experiencia personalizada</h2>
        <p>Analizando tu perfil vocacional único...</p>
      </div>
    </div>
  </div>
)

// Error Display Component
const ErrorDisplay = ({ onRestart }) => (
  <div className="error-display">
    <div className="error-content">
      <div className="error-icon">⚠️</div>
      <h1>Algo salió mal</h1>
      <p>No pudimos procesar tu análisis vocacional. Vamos a intentarlo de nuevo.</p>
      <button className="error-button" onClick={onRestart}>
        Reintentar Análisis
      </button>
    </div>
  </div>
)

// Main Results Screen Component
function ResultsScreen({ results, isLoading, onRestart, user, onShowDetailed }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef()

  // Enrich career data with UCAB info
  const enrichCareer = (career) => {
    const found = ucabCareers.find((c) => c.carrera === career.name)
    return found ? { ...career, url: found.url, facultad: found.facultad } : { ...career }
  }

  // Helper function to get first name
  const getFirstName = (fullName) => {
    return fullName ? fullName.split(' ')[0] : "Estudiante"
  }

  const enrichedCareers = useMemo(() => {
    return results?.careers?.slice(0, 3).map(enrichCareer) || []
  }, [results])

  // Build slides array
  const slides = useMemo(() => {
    if (!results) return []
    const arr = []

    // Welcome slide
    arr.push({
      type: 'welcome',
      content: { name: getFirstName(user?.name) }
    })

    // Personality slide
    if (results.personality) {
      arr.push({
        type: 'personality',
        content: results.personality
      })
    }

    // Qualities slide
    if (Array.isArray(results.qualities)) {
      arr.push({
        type: 'qualities',
        content: results.qualities
      })
    }

    // Individual career slides
    if (Array.isArray(results.careers)) {
      for (let i = 0; i < Math.min(3, results.careers.length); i++) {
        arr.push({
          type: 'career',
          content: enrichCareer(results.careers[i])
        })
      }

      // Final summary slide
      arr.push({
        type: 'summary',
        content: enrichedCareers
      })
    }

    return arr
  }, [results, user, enrichedCareers])

  const getSlideDuration = (slideType) => {
    switch (slideType) {
      case "personality":
        return 15000 // 15 seconds
      case "qualities":
        return 20000 // 20 seconds
      case "career":
        return 15000 // 15 seconds
      default:
        return 5000 // 5 seconds for welcome and others
    }
  }

  // Auto-advance logic
  useEffect(() => {
    if (isPaused || currentSlide === slides.length - 1 || isTransitioning) return

    const duration = getSlideDuration(slides[currentSlide].type)

    timerRef.current = setTimeout(() => {
      goToNextSlide()
    }, duration) // dynamic duration

    return () => clearTimeout(timerRef.current)
  }, [currentSlide, isPaused, slides.length, isTransitioning])

  // Navigation functions
  const goToNextSlide = () => {
    if (currentSlide >= slides.length - 1 || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(prev => prev + 1)
      setIsTransitioning(false)
    }, 300)
  }

  const goToPrevSlide = () => {
    if (currentSlide <= 0 || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(prev => prev - 1)
      setIsTransitioning(false)
    }, 300)
  }

  // Handle screen clicks for navigation
  const handleScreenClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('button, a, .career-card, .quality-card')) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const clickPosition = x / rect.width

    if (clickPosition < 0.3) {
      goToPrevSlide()
    } else if (clickPosition > 0.7) {
      goToNextSlide()
    }
  }

  // Toggle pause
  const togglePause = (e) => {
    e.stopPropagation()
    setIsPaused(prev => !prev)
  }

  // Share functionality
  const handleShare = async (e) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mi Perfil Vocacional UCAB 2024",
          text: `🎓 ¡Descubrí mi arquetipo vocacional! Soy: ${results.personality?.name}. ¿Cuál será el tuyo?`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("¡Enlace copiado! Compártelo con tus amigos 🎉")
    }
  }

  // Loading and error states
  if (isLoading) return <EnhancedLoading />
  if (!results) return <ErrorDisplay onRestart={onRestart} />

  const currentSlideData = slides[currentSlide]

  return (
    <div className="results-story-container" onClick={handleScreenClick}>
      {/* UCAB Logo */}
      <img
        src="/Logo_UCAB_blanco_.png"
        alt="UCAB Logo"
        className="ucab-logo"
      />

      {/* Progress Bar */}
      <div className="progress-bar">
        {slides.map((_, index) => (
          <div key={index} className="progress-segment">
            <div
              className={`progress-fill ${index < currentSlide ? 'completed' : ''} ${
                index === currentSlide && !isPaused ? 'active' : ''
              }`}
            />
          </div>
        ))}
      </div>

      {/* Pause Button */}
      <button className="pause-button" onClick={togglePause}>
        {/* White pause/play icon using SVG */}
        {isPaused ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="6,4 20,12 6,20" fill="white" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" fill="white"/>
            <rect x="14" y="4" width="4" height="16" fill="white"/>
          </svg>
        )}
      </button>

      {/* Main Content */}
      <div className="slide-container">
        {currentSlideData && (
          <div className={`slide ${isTransitioning ? 'transitioning' : ''}`}>
            {renderSlide(currentSlideData)}
          </div>
        )}
      </div>

      {/* Navigation Hints */}
      <div className="navigation-hints">
        <div className="hint left-hint">← Anterior</div>
        <div className="hint right-hint">Siguiente →</div>
      </div>
    </div>
  )

  // Render individual slides
  function renderSlide(slide) {
    switch (slide.type) {
      case 'welcome':
        return (
          <div className="slide-content welcome-slide">
            <div className="welcome-icon">🎓</div>
            <h1>¡Hola {slide.content.name}!</h1>
            <p>Tu análisis vocacional está listo. Prepárate para descubrir tu futuro profesional.</p>
          </div>
        )

      case 'personality':
        return (
          <div className="slide-content personality-slide">
            <div className="personality-header">
              <h2>Tu Arquetipo Vocacional</h2>
            </div>
            <div className="personality-card">
              <h3>{slide.content.name}</h3>
              <p>{slide.content.description}</p>
            </div>
          </div>
        )

      case 'qualities':
        return (
          <div className="slide-content qualities-slide">
            <h2>Tus Cualidades Destacadas</h2>
            <div className="qualities-grid">
              {slide.content.map((quality, index) => (
                <div key={index} className="quality-card" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="quality-number">{index + 1}</div>
                  <p>{quality.description}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'career':
        return (
          <div className="slide-content career-slide">
            <div className="career-header">
              <h2>Tu Recomendación #{slide.content.rank}</h2>
            </div>
            <div className="career-card">
              <div className="career-rank">#{slide.content.rank}</div>
              <h3 style={{ textTransform: 'uppercase' }}>{slide.content.name}</h3>
              <p className="career-explanation" style={{ color: '#fff' }}>{slide.content.explanation}</p>
              {slide.content.url && (
                <a href={slide.content.url} target="_blank" rel="noopener noreferrer" className="career-link">
                  Ver más información
                </a>
              )}
            </div>
          </div>
        )

      case 'summary':
        return (
          <div className="slide-content summary-slide">
            <h2 className="summary-heading">¡TU FUTURO TE ESPERA!</h2>
            <p className="summary-subtitle">Has completado tu análisis vocacional personalizado</p>
            <div className="summary-cards">
              {slide.content.map((career, index) => (
                <div key={index} className="summary-card">
                  <div className="summary-rank">#{index + 1}</div>
                  <h3 className="summary-career-title">{career.name}</h3>
                </div>
              ))}
            </div>
            <div className="summary-actions">
              <button className="summary-cta-button summary-details-button" onClick={onShowDetailed}>
                <span>📊</span>
                <span>VER ANÁLISIS COMPLETO</span>
              </button>
              <button className="summary-cta-button summary-restart-button" onClick={onRestart}>
                <span>🔄</span>
                <span>HACER TEST NUEVAMENTE</span>
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }
}

export default ResultsScreen
