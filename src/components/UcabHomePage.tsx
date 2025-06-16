"use client"

import React from "react"
import { useEffect, useRef } from "react"

interface UcabHomePageProps {
  onStartTest: () => void
}

const UcabHomePage: React.FC<UcabHomePageProps> = ({ onStartTest }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle effect for buttons
  const createParticles = (button: HTMLElement, color: string) => {
    const rect = button.getBoundingClientRect()
    const particles: HTMLElement[] = []

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        opacity: 1;
        transform: translate(-50%, -50%);
      `

      document.body.appendChild(particle)
      particles.push(particle)

      // Animate particle
      const angle = (i / 12) * Math.PI * 2
      const velocity = 50 + Math.random() * 30
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity

      let x = 0,
        y = 0,
        opacity = 1

      const animate = () => {
        x += vx * 0.02
        y += vy * 0.02
        opacity -= 0.03

        particle.style.transform = `translate(${x - 2}px, ${y - 2}px)`
        particle.style.opacity = opacity.toString()

        if (opacity > 0) {
          requestAnimationFrame(animate)
        } else {
          document.body.removeChild(particle)
        }
      }

      requestAnimationFrame(animate)
    }
  }

  // Background animation canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Floating geometric shapes
    const shapes: Array<{
      x: number
      y: number
      size: number
      speed: number
      angle: number
      type: "circle" | "triangle" | "square"
      opacity: number
    }> = []

    // Create shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        type: ["circle", "triangle", "square"][Math.floor(Math.random() * 3)] as "circle" | "triangle" | "square",
        opacity: Math.random() * 0.1 + 0.02,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        ctx.save()
        ctx.globalAlpha = shape.opacity
        ctx.fillStyle = "#0033A0" // UCAB blue

        // Move shape
        shape.y -= shape.speed
        shape.angle += 0.01

        // Reset position if off screen
        if (shape.y < -shape.size) {
          shape.y = canvas.height + shape.size
          shape.x = Math.random() * canvas.width
        }

        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.angle)

        // Draw shape
        switch (shape.type) {
          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
            ctx.fill()
            break
          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.closePath()
            ctx.fill()
            break
          case "square":
            ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
            break
        }

        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <>
      <style>{`
        .ucab-home-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .background-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .ucab-home-page {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        .ucab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid #dee2e6;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-ucab {
          height: 40px;
          transition: transform 0.3s ease;
        }

        .logo-container:hover .logo-ucab {
          transform: scale(1.05);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .career-link {
          font-size: 16px;
          font-weight: 500;
          color: #6c757d;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .career-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #0033A0;
          transition: width 0.3s ease;
        }

        .career-link:hover {
          color: #0033A0;
        }

        .career-link:hover::after {
          width: 100%;
        }

        .test-button {
          background-color: transparent;
          color: #0033A0;
          border: 2px solid #0033A0;
          padding: 8px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border-radius: 8px;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .test-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(0,51,160,0.1) 0%, transparent 70%);
          transition: all 0.4s ease;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }

        .test-button:hover::before {
          width: 200px;
          height: 200px;
        }

        .test-button:hover {
          background-color: #0033A0;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,51,160,0.3);
        }

        .ucab-main-content {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          gap: 64px;
          padding: 80px 0;
          flex-grow: 1;
        }

        .left-panel .main-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 16px;
          object-fit: cover;
          transition: transform 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .left-panel .main-image:hover {
          transform: scale(1.02);
        }

        .right-panel {
          display: flex;
          flex-direction: column;
        }

        .right-panel h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #0033A0;
          margin: 0 0 16px 0;
          line-height: 1.2;
          letter-spacing: -1.5px;
          background: linear-gradient(135deg, #0033A0 0%, #005A9C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.125rem;
          color: #6c757d;
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 550px;
        }

        .main-cta-button {
          background: linear-gradient(135deg, #0033A0 0%, #005A9C 100%);
          color: white;
          align-self: flex-start;
          font-size: 18px;
          padding: 14px 40px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,51,160,0.2);
        }

        .main-cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(223,175,63,0.3) 0%, transparent 70%);
          transition: all 0.5s ease;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }

        .main-cta-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .main-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,51,160,0.4);
        }

        .main-cta-button:active {
          transform: translateY(-1px);
        }

        /* Floating elements */
        .floating-element {
          position: absolute;
          opacity: 0.05;
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        .floating-element:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-element:nth-child(2) {
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .floating-element:nth-child(3) {
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .ucab-main-content {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 60px 0;
            text-align: center;
          }
          .left-panel {
            order: 2;
            display: flex;
            justify-content: center;
          }
          .left-panel .main-image {
            max-width: 400px;
          }
          .right-panel {
            order: 1;
            align-items: center;
          }
          .main-cta-button {
            align-self: center;
          }
        }

        @media (max-width: 768px) {
          .ucab-home-page {
            padding: 0 24px;
          }
          .header-actions {
            gap: 12px;
          }
          .career-link {
            display: none;
          }
        }
      `}</style>

      <div className="ucab-home-page-wrapper">
        <canvas ref={canvasRef} className="background-canvas" />

        {/* Floating decorative elements */}
        <div className="floating-element" style={{ fontSize: "60px", color: "#DFAF3F" }}>
          ⭐
        </div>
        <div className="floating-element" style={{ fontSize: "40px", color: "#0033A0" }}>
          🎓
        </div>
        <div className="floating-element" style={{ fontSize: "50px", color: "#DFAF3F" }}>
          💡
        </div>

        <div className="ucab-home-page">
          <header className="ucab-header">
            <a href="/" className="logo-container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png"
                alt="UCAB Logo"
                className="logo-ucab"
              />
            </a>
            <div className="header-actions">
              <a
                href="https://www.ucab.edu.ve/pregrado/"
                className="career-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Áreas Profesionales
              </a>
              <a href="#" className="career-link">
                Acerca del test
              </a>
              <button
                className="test-button"
                onClick={(e) => {
                  createParticles(e.currentTarget, "#0033A0")
                  onStartTest()
                }}
              >
                Haz el test
              </button>
            </div>
          </header>

          <main className="ucab-main-content">
            <div className="left-panel">
              <img
                src="https://placehold.co/500x500/E8F5E9/003366?text=Talento+UCAB"
                alt="Talento UCAB - Espacio reservado para ilustración"
                className="main-image"
              />
            </div>
            <div className="right-panel">
              <h1>Test de Orientación Vocacional Inteligente</h1>
              <p className="subtitle">
                Completa nuestro test vocacional para descubrir qué profesión de futuro encaja mejor contigo y recibir
                orientación formativa. ¡Elige tu futuro en la UCAB!
              </p>
              <button
                className="main-cta-button"
                onClick={(e) => {
                  createParticles(e.currentTarget, "#DFAF3F")
                  onStartTest()
                }}
              >
                Comenzar ahora
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default UcabHomePage
