"use client"
import "./DetailedResults.css"
import ucabCareers from "../ucab_carreras.json"
import { useState, useEffect } from "react"

function DetailedResults({ results, user, onBack, onRestart }) {
  const [activeSection, setActiveSection] = useState('personality')
  const [isVisible, setIsVisible] = useState({})
  const [selectedCareer, setSelectedCareer] = useState(null)

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

  // Share function
  const handleShare = async () => {
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

  return (
    <div className="detailed-results-container">
      {/* Navigation */}
      <nav className="detailed-nav">
        <div className="nav-bar-left">
          <button onClick={onBack} className="nav-back-arrow" aria-label="Volver">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 24L10 16L18 8" stroke="#343434" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="nav-container">
          {[
            { id: 'personality', label: 'Arquetipo', icon: '🌟' },
            { id: 'qualities', label: 'Cualidades', icon: '💎' },
            { id: 'careers', label: 'Carreras', icon: '🎓' },
          ].map((section) => (
            <button
              key={section.id}
              className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-label">{section.label}</span>
            </button>
          ))}
        </div>
        <div className="nav-bar-right">
          <img
            src="/OrientaUcab.png"
            alt="OrientaUCAB Logo"
            className="header-logo"
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="detailed-main">
        {/* Overview Section */}
        {/* Removed overview section as requested */}
        {/* Personality Section */}
        {activeSection === 'personality' && (
          <section className="content-section personality-section" id="personality" data-animate>
            <div className="section-header">
              <h2>Tu Arquetipo Vocacional</h2>
              <p>Descubre el patrón único que define tu perfil profesional</p>
            </div>

            <div className="personality-content">
              <div className="personality-hero">
                <h3 className="personality-main-title">{results.personality?.name}</h3>
                <p className="personality-description">{results.personality?.description}</p>
              </div>

              <div className="personality-details">
                <div className="detail-item">
                  <h4>¿Qué significa este arquetipo?</h4>
                  <p>{results.personality?.meaning}</p>
                </div>
                
                <div className="detail-item">
                  <h4>Características principales</h4>
                  <ul>
                    {results.personality?.characteristics?.map((char, index) => (
                      <li key={index}>{char}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Qualities Section */}
        {activeSection === 'qualities' && (
          <section className="content-section qualities-section" id="qualities" data-animate>
            <div className="section-header">
              <h2>Tus Cualidades Destacadas</h2>
              <p>Las fortalezas que te hacen único en el mundo profesional</p>
            </div>

            <div className="qualities-content">
              <div className="qualities-grid">
                {results.qualities?.map((quality, index) => (
                  <div key={index} className="quality-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="quality-number">{index + 1}</div>
                    <div className="quality-content">
                      <h4>{quality.name}</h4>
                      <p>{quality.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="qualities-summary" style={{ marginTop: '64px' }}>
                <h3>¿Por qué estas cualidades son importantes?</h3>
                <p>Estas cualidades fueron identificadas a partir de tus respuestas en el test vocacional. Representan las fortalezas que te distinguen y que serán fundamentales para tu éxito en las carreras recomendadas.</p>
              </div>
            </div>
          </section>
        )}

        {/* Careers Section */}
        {activeSection === 'careers' && (
          <section className="content-section careers-section" id="careers" data-animate>
            <div className="section-header">
              <h2>Tus Carreras Recomendadas</h2>
              <p>Las mejores opciones académicas alineadas con tu perfil</p>
            </div>

            <div className="careers-content">
              <div className="careers-grid">
                {enrichedCareers.map((career, index) => (
                  <div 
                    key={index} 
                    className={`career-item ${selectedCareer === index ? 'selected' : ''}`}
                    onClick={() => setSelectedCareer(selectedCareer === index ? null : index)}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="career-header">
                      <div className="career-rank">#{index + 1}</div>
                      <div className="career-info">
                        <h3>{career.name}</h3>
                        <span className="career-faculty">{career.facultad}</span>
                      </div>
                    </div>
                    
                    <div className="career-body">
                      <p className="career-explanation">{career.explanation}</p>
                      
                      {selectedCareer === index && (
                        <div className="career-details">
                          <a href={career.url} target="_blank" rel="noopener noreferrer" className="career-link">
                            Ver Pénsum
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="careers-summary">
                <h3>¿Cómo se seleccionaron estas carreras?</h3>
                <p>Las carreras recomendadas se basan en un análisis de tus respuestas, alineando tus intereses y aptitudes con los perfiles profesionales de la oferta académica de la UCAB.</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Actions */}
      {/* Footer removed as requested */}
    </div>
  )
}

export default DetailedResults
