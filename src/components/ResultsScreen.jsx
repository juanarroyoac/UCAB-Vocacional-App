"use client"
import "./ResultsScreen.css"
import { useState, useEffect, useMemo, useRef } from "react"
import ucabCareers from "../ucab_carreras.json"

const AUTO_ADVANCE_MS = 8000 // Slower slides - 8 seconds

// --- LOADING SPINNER ---
const LoadingSpinner = () => (
  <div className="results-story-container loading">
    <div className="loading-content">
      <div className="spinner"></div>
      <div className="loader-text">ANALIZANDO TU VOCACIÓN...</div>
    </div>
  </div>
)

// --- ERROR DISPLAY ---
const ErrorDisplay = ({ onRestart }) => (
  <div className="results-story-container error">
    <div className="slide-content">
      <h1 className="slide-title">ERROR EN LOS RESULTADOS</h1>
      <p className="slide-description">
        No se pudieron generar las diapositivas porque los datos recibidos estaban incompletos.
        <br />
        Por favor, asegúrate de que el análisis vocacional se completó correctamente.
      </p>
      <button className="restart-button" onClick={onRestart}>
        VOLVER A EMPEZAR
      </button>
    </div>
  </div>
)

// --- MAIN RESULTS SCREEN ---
function ResultsScreen({ results, isLoading, onRestart, user }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef()

  // Helper to enrich careers with URL and faculty
  const enrichCareer = (career) => {
    const found = ucabCareers.find((c) => c.carrera === career.name)
    return found ? { ...career, url: found.url, facultad: found.facultad } : { ...career }
  }

  // Build slides array from results
  const slides = useMemo(() => {
    if (!results) return []
    const arr = []

    // Welcome slide
    arr.push({
      type: "welcome",
      content: { name: user?.name || "Estudiante" },
    })

    // Personality slide
    if (results.personality) {
      arr.push({
        type: "personality",
        content: results.personality,
      })
    }

    // Qualities slide
    if (Array.isArray(results.qualities)) {
      arr.push({
        type: "qualities",
        content: results.qualities,
      })
    }

    // Individual career slides (simplified)
    if (Array.isArray(results.careers)) {
      for (let i = 0; i < Math.min(3, results.careers.length); i++) {
        arr.push({
          type: "career",
          content: enrichCareer(results.careers[i]),
        })
      }

      // Final ranking slide
      arr.push({
        type: "ranking",
        content: results.careers.slice(0, 3).map(enrichCareer),
      })
    }

    return arr
  }, [results, user])

  // Auto-advance logic with smooth transitions
  useEffect(() => {
    if (isPaused || activeSlide === slides.length - 1 || isTransitioning) return

    timerRef.current = setTimeout(() => {
      goToNextSlide()
    }, AUTO_ADVANCE_MS)

    return () => clearTimeout(timerRef.current)
  }, [activeSlide, isPaused, slides.length, isTransitioning])

  // Navigation functions
  const goToNextSlide = () => {
    if (activeSlide >= slides.length - 1 || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSlide((prev) => prev + 1)
      setIsTransitioning(false)
    }, 600)
  }

  const goToPrevSlide = () => {
    if (activeSlide <= 0 || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSlide((prev) => prev - 1)
      setIsTransitioning(false)
    }, 600)
  }

  // Handle click/tap navigation
  const handleInteraction = (e) => {
    if (e.target.closest("a,button,.pause-button")) return
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    if (x < bounds.left + bounds.width / 2) {
      goToPrevSlide()
    } else {
      goToNextSlide()
    }
  }

  // Toggle pause
  const togglePause = (e) => {
    e.stopPropagation()
    setIsPaused((p) => !p)
  }

  // Share function (placeholder)
  const handleShare = (e) => {
    e.stopPropagation()
    // Placeholder for share functionality
    alert("¡Función de compartir próximamente!")
  }

  // Loading or error states
  if (isLoading) return <LoadingSpinner />
  if (!results || slides.length === 0) return <ErrorDisplay onRestart={onRestart} />

  // Progress bar segments
  const progressSegments = slides.map((_, idx) => (
    <div key={idx} className="progress-segment">
      <div
        className={`progress-fill ${idx < activeSlide ? "visited" : ""} ${
          idx === activeSlide && !isPaused && !isTransitioning ? "active" : ""
        }`}
        style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
      />
    </div>
  ))

  // Render individual slides
  const renderSlide = (slide, idx) => {
    const slideClass = `slide slide-${slide.type} ${idx === activeSlide ? "active" : ""} ${
      isTransitioning ? "transitioning" : ""
    }`

    switch (slide.type) {
      case "welcome":
        return (
          <div className={slideClass} style={{ background: "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)" }}>
            <div className="slide-content">
              <div className="fun-shape shape-1"></div>
              <div className="fun-shape shape-2"></div>
              <h1 className="slide-title">¡HOLA {slide.content.name.toUpperCase()}!</h1>
              <p className="slide-description">
                Tu test vocacional está listo. Descubre qué carrera es perfecta para ti.
              </p>
            </div>
          </div>
        )

      case "personality":
        return (
          <div className={slideClass} style={{ background: "linear-gradient(135deg, #003366 0%, #0056b3 100%)" }}>
            <div className="slide-content">
              <div className="fun-shape shape-3"></div>
              <div className="fun-shape shape-4"></div>
              <p className="slide-supertitle">TU ARQUETIPO VOCACIONAL</p>
              <h1 className="slide-title">{slide.content.name.toUpperCase()}</h1>
              <p className="slide-description">{slide.content.description}</p>
            </div>
          </div>
        )

      case "qualities":
        return (
          <div className={slideClass} style={{ background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)" }}>
            <div className="slide-content">
              <div className="fun-shape shape-5"></div>
              <div className="fun-shape shape-6"></div>
              <p className="slide-supertitle">TUS 5 CUALIDADES DESTACADAS</p>
              <div className="qualities-list">
                {slide.content.map((quality, i) => (
                  <div key={i} className="quality-item">
                    {quality}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "career":
        const gradients = [
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        ]
        return (
          <div className={slideClass} style={{ background: gradients[(slide.content.rank - 1) % 3] }}>
            <div className="slide-content">
              <div className="fun-shape shape-7"></div>
              <div className="fun-shape shape-8"></div>
              <p className="slide-supertitle">RECOMENDACIÓN #{slide.content.rank}</p>
              <h1 className="slide-title">{slide.content.name.toUpperCase()}</h1>
              <div className="career-story">{slide.content.story}</div>
              {slide.content.facultad && <div className="career-faculty">Facultad: {slide.content.facultad}</div>}
            </div>
          </div>
        )

      case "ranking":
        return (
          <div className={slideClass} style={{ background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" }}>
            <div className="slide-content">
              <div className="fun-shape shape-9"></div>
              <div className="fun-shape shape-10"></div>
              <h1 className="slide-title">TU RANKING PERSONALIZADO</h1>
              <div className="ranking-podium">
                {slide.content.map((career, i) => (
                  <div key={i} className="podium-item">
                    <div className="podium-rank">#{career.rank}</div>
                    <div className="podium-info">
                      <h3>{career.name}</h3>
                      <p className="podium-faculty">{career.facultad}</p>
                      {career.url && (
                        <a href={career.url} target="_blank" rel="noopener noreferrer" className="podium-link">
                          VER CARRERA
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="ranking-buttons">
                <button className="restart-button" onClick={onRestart}>
                  HACER TEST DE NUEVO
                </button>
                <button className="share-button" onClick={handleShare} aria-label="Compartir resultados">
                  {shareIcon}
                  <span>COMPARTIR MIS RESULTADOS</span>
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Icons
  const pauseIcon = (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="4" width="4" height="16" rx="2" />
      <rect x="14" y="4" width="4" height="16" rx="2" />
    </svg>
  )
  const playIcon = (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
  const shareIcon = (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  )

  return (
    <div className="results-story-container" onClick={handleInteraction}>
      {/* UCAB Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png"
        alt="UCAB Logo"
        className="ucab-logo"
      />

      {/* Progress Bar */}
      <div className="progress-bar">{progressSegments}</div>

      {/* Pause Button */}
      <button className="pause-button" onClick={togglePause} aria-label={isPaused ? "Reanudar" : "Pausar"}>
        {isPaused ? playIcon : pauseIcon}
      </button>

      {/* Slides */}
      {slides.map((slide, idx) => renderSlide(slide, idx))}
    </div>
  )
}

export default ResultsScreen
