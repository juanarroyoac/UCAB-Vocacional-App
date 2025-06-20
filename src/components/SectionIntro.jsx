"use client"
import { useState } from "react"
import { 
  HeartIcon, 
  AcademicCapIcon, 
  StarIcon, 
  BuildingOfficeIcon, 
  RocketLaunchIcon, 
  PuzzlePieceIcon 
} from '@heroicons/react/24/outline'

const SectionIntro = ({ title, description, onContinue }) => {
  const [fadeOut, setFadeOut] = useState(false)

  const handleContinue = () => {
    setFadeOut(true)
    setTimeout(() => {
      onContinue()
    }, 700) // Duration matches fadeOut animation
  }

  // Icon mapping for each section
  const getSectionIcon = (sectionTitle) => {
    const iconMap = {
      'Intereses': HeartIcon,
      'Habilidades': AcademicCapIcon,
      'Valores': StarIcon,
      'Contextos': BuildingOfficeIcon,
      'Motivaciones': RocketLaunchIcon,
      'Transversales': PuzzlePieceIcon
    }
    return iconMap[sectionTitle] || HeartIcon
  }

  const IconComponent = getSectionIcon(title)

  return (
    <div className={`section-intro-fade${fadeOut ? " fade-out" : ""}`}>
      <div className="section-intro-content">
        <div className="section-intro-icon">
          <IconComponent width="40" height="40" />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={handleContinue}>Continuar</button>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
        
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
          color: #fff;
          margin-bottom: 24px;
          opacity: 1;
          background: #40b4e5;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          box-shadow: 0 8px 32px rgba(64, 180, 229, 0.3);
        }
        
        .section-intro-fade h2 {
          font-family: 'Poppins', 'Arial', sans-serif !important;
          font-weight: 700 !important;
          font-size: clamp(2rem, 5vw, 2.5rem);
          color: #343434 !important;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
          text-transform: uppercase !important;
        }
        
        .section-intro-fade p {
          font-family: 'Open Sans', 'Arial', sans-serif !important;
          color: #343434 !important;
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 32px 0;
          font-weight: 400;
        }
        
        .section-intro-fade button {
          background: #40b4e5 !important;
          color: #fff !important;
          border: none;
          border-radius: 12px;
          padding: 16px 40px;
          font-size: 1.1rem;
          font-family: 'Poppins', 'Arial', sans-serif !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 51, 102, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .section-intro-fade button:hover {
          background: #199fd9 !important;
          color: #fff !important;
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
