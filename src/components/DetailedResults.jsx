"use client"
import "./DetailedResults.css"
import ucabCareers from "../ucab_carreras.json"
import { useState, useEffect } from "react"

function DetailedResults({ results, user, onBack, onRestart }) {
  // Add animation hooks
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Helper to enrich careers with URL and faculty
  const enrichCareer = (career) => {
    const found = ucabCareers.find((c) => c.carrera === career.name)
    return found ? { ...career, url: found.url, facultad: found.facultad } : { ...career }
  }

  const enrichedCareers = results?.careers?.slice(0, 3).map(enrichCareer) || []

  // Share function (placeholder)
  const handleShare = () => {
    alert("¡Función de compartir próximamente!")
  }

  if (!results) {
    return (
      <div className="detailed-results-container">
        <div className="error-message">
          <h2>No hay resultados disponibles</h2>
          <button onClick={onBack} className="back-button">
            Volver
          </button>
        </div>
      </div>
    )
  }

  // Enhanced career cards with scores
  const renderCareerCard = (career, index) => (
    <div
      key={index}
      className={`career-card ${isVisible[`career-${index}`] ? "animate-in" : ""}`}
      id={`career-${index}`}
      data-animate
      style={{ "--delay": `${index * 0.1}s` }}
    >
      <div className="career-rank">#{career.rank}</div>
      <h3>{career.name}</h3>
      <div className="career-faculty">{career.facultad}</div>
      <div className="career-story">{career.story}</div>

      {/* Add compatibility score */}
      <div className="career-score">
        <div className="score-label">Compatibilidad</div>
        <div className="score-bar">
          <div className="score-fill" style={{ "--score-percentage": `${career.compatibility || 85}%` }} />
        </div>
        <div className="score-text">{career.compatibility || 85}%</div>
      </div>

      {career.url && (
        <a href={career.url} target="_blank" rel="noopener noreferrer" className="career-link">
          Ver carrera en UCAB
        </a>
      )}
    </div>
  )

  return (
    <div className="detailed-results-container">
      {/* Header */}
      <header className="detailed-header">
        <button onClick={onBack} className="back-button">
          ← Volver a resultados
        </button>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png"
          alt="UCAB Logo"
          className="header-logo"
        />
      </header>

      {/* Main Content */}
      <main className="detailed-content">
        <div className="results-hero">
          <h1>¡Hola {user?.name || "Estudiante"}!</h1>
          <p>Aquí tienes el análisis completo de tu perfil vocacional</p>
        </div>

        {/* Personality Section */}
        {results.personality && (
          <section className="personality-section">
            <div className="section-header">
              <h2>Tu Arquetipo Vocacional</h2>
            </div>
            <div className="personality-card">
              <h3>{results.personality.name}</h3>
              <p>{results.personality.description}</p>
            </div>
          </section>
        )}

        {/* Qualities Section */}
        {results.qualities && (
          <section className="qualities-section">
            <div className="section-header">
              <h2>Tus 5 Cualidades Destacadas</h2>
            </div>
            <div className="qualities-grid">
              {results.qualities.map((quality, i) => (
                <div key={i} className="quality-card">
                  <div className="quality-number">{i + 1}</div>
                  <p>{quality}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Careers Section */}
        <section className="careers-section">
          <div className="section-header">
            <h2>Tus Carreras Recomendadas</h2>
          </div>
          <div className="careers-grid">{enrichedCareers.map((career, i) => renderCareerCard(career, i))}</div>
        </section>

        {/* Actions Section */}
        <section className="actions-section">
          <button onClick={handleShare} className="share-button">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
            Compartir mis resultados
          </button>
          <button onClick={onRestart} className="restart-button">
            Hacer test de nuevo
          </button>
        </section>
      </main>
    </div>
  )
}

export default DetailedResults
