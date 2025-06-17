"use client"
import { useState } from "react"

const SectionIntro = ({ title, description, onContinue }) => {
  const [fadeOut, setFadeOut] = useState(false)

  const handleContinue = () => {
    setFadeOut(true)
    setTimeout(() => {
      onContinue()
    }, 700) // Duration matches fadeOut animation
  }

  return (
    <div className={`section-intro-fade${fadeOut ? " fade-out" : ""}`}>
      <div className="section-intro-content">
        <div className="section-intro-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={handleContinue}>Continuar</button>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
        
        .section-intro-fade {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(45deg, #ffffff 0%, #A9D6E5 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 1s;
          opacity: 1;
          transition: opacity 0.7s;
          font-family: 'Inter', sans-serif;
        }
        
        .section-intro-fade.fade-out {
          opacity: 0;
          animation: fadeOut 0.7s forwards;
        }
        
        .section-intro-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 48px 40px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 51, 102, 0.15);
          border: 1px solid rgba(169, 214, 229, 0.3);
          max-width: 500px;
          width: 90%;
          transform: translateY(0);
          animation: slideUp 1s ease-out;
        }
        
        .section-intro-icon {
          color: #003366;
          margin-bottom: 24px;
          opacity: 0.8;
        }
        
        .section-intro-fade h2 {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 5vw, 2.5rem);
          color: #003366;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        
        .section-intro-fade p {
          color: #334155;
          font-size: 1.125rem;
          line-height: 1.6;
          margin: 0 0 32px 0;
          font-weight: 400;
        }
        
        .section-intro-fade button {
          background: #003366;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 16px 40px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 51, 102, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .section-intro-fade button:hover {
          background: #005A9C;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 51, 102, 0.3);
        }
        
        .section-intro-fade button:active {
          transform: translateY(0);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .section-intro-content {
            padding: 32px 24px;
            margin: 20px;
          }
          
          .section-intro-fade h2 {
            font-size: 1.75rem;
          }
          
          .section-intro-fade p {
            font-size: 1rem;
          }
          
          .section-intro-fade button {
            padding: 14px 32px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default SectionIntro
