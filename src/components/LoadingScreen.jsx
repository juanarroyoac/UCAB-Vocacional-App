import React, { useState, useEffect } from 'react'
import './LoadingScreen.css'

const CIRCLE_RADIUS = 90
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS
const ANIMATION_DURATION = 10000 // 10 segundos

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let start = null
    let animationFrame
    function animate(timestamp) {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const percent = Math.min((elapsed / ANIMATION_DURATION) * 100, 100)
      setProgress(percent)
      if (percent < 100) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="loading-screen">
      <div className="loading-centered-block">
        <h1 className="loading-title loading-title-large">Evaluando habilidades</h1>
        <div className="progress-section">
          <div className="progress-ring progress-ring-large">
            <svg className="progress-svg" viewBox="0 0 200 200">
              <circle
                className="progress-bg"
                cx="100"
                cy="100"
                r={CIRCLE_RADIUS}
                strokeWidth="16"
              />
              <circle
                className="progress-fill"
                cx="100"
                cy="100"
                r={CIRCLE_RADIUS}
                strokeWidth="16"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeDashoffset={CIRCLE_CIRCUMFERENCE * (1 - progress / 100)}
                style={{ transition: 'stroke-dashoffset 0.2s linear' }}
              />
              <circle
                className="progress-inner-fill"
                cx="100"
                cy="100"
                r={CIRCLE_RADIUS - 16}
                fill="rgba(255,255,255,0.10)"
                stroke="none"
              />
            </svg>
            <div className="progress-text">
              <span className="progress-percentage">{Math.round(progress)}%</span>
              <span className="progress-label">Completado</span>
            </div>
          </div>
        </div>
        <p className="loading-subtitle loading-subtitle-below">Identificando tus fortalezas y competencias destacadas</p>
      </div>
    </div>
  )
}

export default LoadingScreen