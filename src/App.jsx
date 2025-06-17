"use client"

import { useState, useEffect, useMemo } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom"
import DataCaptureForm from "./components/DataCaptureForm"
import AboutTest from "./components/AboutTest"
import SectionIntro from "./components/SectionIntro"
import LightParticles from "./components/LightParticles"
import DetailedResults from "./components/DetailedResults"

// ===================================================================================
//  COMPONENT DEFINITIONS
//  All components are now in this single file to resolve import errors.
// ===================================================================================

const UcabHomePage = ({ onStartTest }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Impact&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
        .ucab-home-page-wrapper {
          width: 100%;
          min-height: 100vh;
          /* Softer gradient: more white in the bottom left, blue to top right */
          background: 
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.8) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59,167,212,0.3) 0%, transparent 50%),
            linear-gradient(120deg, #ffffff 0%, #b6e3f7 35%, #3ba7d4 80%, #1e7ebc 100%);
          display: flex;
          flex-direction: column;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        .ucab-home-page {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        .ucab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 31.2px 0; /* 24px * 1.3 = 31.2px */
          border-bottom: none;
          background: transparent !important;
          box-shadow: none;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        .logo-ucab { height: 52px; } /* 40px * 1.3 = 52px */
        .logo-text-ucab {
          font-weight: 700;
          font-size: 26px; /* 20px * 1.3 = 26px */
          color: var(--dark-blue);
          letter-spacing: -0.5px;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        .header-actions { display: flex; align-items: center; gap: 31.2px; font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important; }
        .career-link {
          font-size: 20.8px; /* 16px * 1.3 = 20.8px */
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease-in-out;
          background: none !important;
          box-shadow: none !important;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        .career-link:hover { color: var(--dark-blue); }
        .test-button {
          background: linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%);
          color: #fff;
          border: 2px solid #fff;
          padding: 10.4px 31.2px; /* 8px * 1.3, 24px * 1.3 */
          font-size: 19.5px; /* 15px * 1.3 */
          font-weight: 700;
          cursor: pointer;
          border-radius: 10.4px; /* 8px * 1.3 */
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease-in-out;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
          box-shadow: 0 2px 12px rgba(33,147,176,0.10);
        }
        .test-button:hover { background: linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%); color: #003366; }
        .ucab-main-content {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          gap: 64px;
          padding: 0 0 1px 0; /* Remove top padding, keep bottom for spacing */
          flex-grow: 1;
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        .left-panel .main-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 16px;
          object-fit: cover;
        }
        .right-panel { display: flex; flex-direction: column; font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important; }
        .right-panel h1 {
          font-size: clamp(3.575rem, 7.15vw, 5.005rem);
          font-family: 'Impact', 'Arial Black', sans-serif !important;
          font-weight: normal;
          color: #fff !important;
          margin: 0 0 10px 0;
          line-height: 1.05;
          letter-spacing: -1.5px;
          background: none !important;
          box-shadow: none !important;
          position: relative;
          top: -48px; /* move upwards */
          text-shadow: 2px 2px 8px rgba(30, 60, 120, 0.35), 0 2px 16px rgba(0,0,0,0.18);
        }
        .subtitle {
          font-size: 1.125rem;
          color: #fff;
          line-height: 1.5;
          margin-bottom: 24px;
          max-width: 550px;
          position: relative;
          top: -42px; /* move upwards */
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
        .main-cta-button {
           background: linear-gradient(90deg, #f6fbff 0%, #ffffff 100%);
           color: #003366;
           border: 2px solid #fff;
           align-self: flex-start;
           font-size: 18px;
           padding: 14px 40px;
           border-radius: 8px;
           cursor: pointer;
           font-weight: 500;
           transition: all 0.2s ease-in-out;
           position: relative;
           top: -36px;
           font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
           box-shadow: 0 2px 12px rgba(33,147,176,0.10);
        }
        .main-cta-button:hover {
            background: linear-gradient(90deg, #ffffff 0%, #eaf6fb 100%);
            color: #003366;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 51, 102, 0.10);
        }
        @media (max-width: 992px) {
          .ucab-main-content { grid-template-columns: 1fr; gap: 48px; padding: 32px 0; text-align: center; }
          .left-panel { order: 2; display: flex; justify-content: center; }
          .left-panel .main-image { max-width: 400px; }
          .right-panel { order: 1; align-items: center; }
          .main-cta-button { align-self: center; }
        }
        @media (max-width: 768px) {
          .ucab-home-page { padding: 0 24px; }
          .header-actions { gap: 15.6px; }
          .career-link { display: none; }
        }
        body, html, * {
          font-family: 'Inter', 'Helvetica', 'Arimo', 'Arial', sans-serif !important;
        }
      `}</style>
      <div className="ucab-home-page-wrapper" style={{ position: "relative" }}>
        <div className="ucab-home-page" style={{ position: "relative", zIndex: 2 }}>
          <header className="ucab-header">
            <span className="logo-text-ucab logo-text-enhanced">Portal Vocacional</span>
          </header>
          <main className="ucab-main-content">
            <div className="left-panel">
              <div className="main-image-container">
                <img
                  src="https://placehold.co/500x500/E8F5E9/003366?text=Talento+UCAB"
                  alt="Estudiante descubriendo su vocación"
                  className="main-image main-image-enhanced"
                />
              </div>
            </div>
            <div className="right-panel">
              <h1>TU PRIMER PASO A LLEGAR LEJOS.</h1>
              <p className="subtitle">
                Responde unas preguntas y recibe una recomendación personalizada de carreras afines a tu perfil.
                ¡Empieza tu futuro en la UCAB hoy!
              </p>
              <button className="main-cta-button" onClick={onStartTest}>
                Comenzar mi prueba vocacional
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

const Question = ({ question, onAnswer, questionNumber, totalQuestions, onBack, sectionName }) => {
  const handleLikertClick = (value) => onAnswer(question.id, value)
  const handleYesNoClick = (value) => onAnswer(question.id, value)
  const progressPercent = Math.max(0, Math.min(100, ((questionNumber - 1) / totalQuestions) * 100))
  const gradient = sectionGradients[sectionName] || "linear-gradient(120deg, #f4f6f8 0%, #a9d6e5 100%)"
  return (
    <>
      <style>{`
        .question-screen-wrapper { width: 100%; min-height: 100vh; background: ${gradient}; display: flex; justify-content: center; align-items: center; padding: 24px; transition: background 0.6s; }
        .question-card { width: 100%; max-width: 480px; background-color: var(--white); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,0.05); display: flex; flex-direction: column; overflow: hidden; }
        .question-card-header { padding: 16px 24px; text-align: center; border-bottom: 1px solid var(--border-color); }
        .question-card-header img { height: 32px; }
        .question-main-content { padding: 32px 24px; text-align: center; flex-grow: 1; }
        .question-text { font-size: clamp(1.25rem, 4vw, 1.5rem); font-weight: 700; color: var(--text-primary); line-height: 1.4; min-height: 100px; display: flex; align-items: center; justify-content: center; margin: 0 0 32px 0; }
        .options-container { display: flex; flex-direction: column; gap: 12px; }
        .likert-scale, .yes-no-options { display: flex; justify-content: center; gap: 10px; }
        .likert-scale button, .yes-no-options button { border: 1px solid var(--border-color); background-color: var(--white); color: var(--text-primary); border-radius: 8px; padding: 12px 0; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; flex-grow: 1; }
        .likert-scale button:hover, .yes-no-options button:hover { background-color: var(--light-green); border-color: var(--accent-green); color: var(--dark-blue); }
        .likert-labels { display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary); padding: 4px 8px 0 8px; }
        .question-card-footer { padding: 16px 24px; display: flex; align-items: center; gap: 16px; border-top: 1px solid var(--border-color); }
        .back-button { background: none; border: none; cursor: pointer; padding: 8px; color: var(--text-secondary); font-size: 24px; line-height: 1; }
        .back-button:disabled { opacity: 0.3; cursor: not-allowed; }
        .back-button:hover:not(:disabled) { color: var(--dark-blue); }
        .progress-bar-container { flex-grow: 1; height: 8px; background-color: var(--neutral-bg); border-radius: 4px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--light-blue) 0%, var(--accent-green) 100%); border-radius: 4px; transition: width 0.4s ease-in-out; }
      `}</style>
      <div className="question-screen-wrapper">
        <div className="question-card">
          <header className="question-card-header">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png"
              alt="UCAB Logo"
            />
          </header>
          <main className="question-main-content">
            <h2 className="question-text">{question.text}</h2>
            <div className="options-container">
              {question.type === "likert" && (
                <>
                  <div className="likert-scale">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button key={value} onClick={() => handleLikertClick(value)}>
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="likert-labels">
                    <span>En desacuerdo</span>
                    <span>De acuerdo</span>
                  </div>
                </>
              )}
              {question.type === "yes-no" && (
                <div className="yes-no-options">
                  <button onClick={() => handleYesNoClick(1)}>Sí</button>
                  <button onClick={() => handleYesNoClick(0)}>No</button>
                </div>
              )}
            </div>
          </main>
          <footer className="question-card-footer">
            <button
              className="back-button"
              onClick={onBack}
              disabled={questionNumber <= 1}
              aria-label="Pregunta anterior"
            >
              ‹
            </button>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

import ResultsScreen from "./components/ResultsScreen"

// ===================================================================================
//  MOCK DATA & API
// ===================================================================================

import { closedQuestions as officialClosedQuestions } from "./questions.js"
// Integramos algunas preguntas yes-no del mock original
const yesNoQuestions = [
  { id: "q3", text: "¿Se te da bien crear una historia a partir de una idea?", type: "yes-no" },
  { id: "q5", text: "¿Disfrutas resolviendo acertijos lógicos y matemáticos?", type: "yes-no" },
  { id: "q8", text: "¿Te atrae el mundo de las finanzas y las inversiones?", type: "yes-no" },
]
// Mezclamos las yes-no con las oficiales (puedes ajustar la posición si lo deseas)
const closedQuestions = [
  ...officialClosedQuestions.slice(0, 5),
  yesNoQuestions[0],
  ...officialClosedQuestions.slice(5, 10),
  yesNoQuestions[1],
  ...officialClosedQuestions.slice(10, 20),
  yesNoQuestions[2],
  ...officialClosedQuestions.slice(20),
]

import { runAiInteraction } from "./gemini.js"
import { generateAnalysisPrompt } from "./scoring.js"
import careers from "./ucab_carreras.json"

// Llama a Gemini API y espera un JSON válido como respuesta
const analyzeWithGemini = async (prompt) => {
  try {
    const responseText = await runAiInteraction(prompt)

    // Remove markdown code block if present
    let cleaned = responseText.trim()
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim()
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim()
    }

    try {
      return JSON.parse(cleaned)
    } catch (jsonError) {
      // Not JSON, return the text as result
      return { text: responseText }
    }
  } catch (error) {
    console.error("Error al analizar con Gemini:", error)
    // Devuelve un error estructurado para mostrar al usuario
    return { error: "No se pudo analizar la respuesta de la IA. Intenta de nuevo." }
  }
}

// ===================================================================================
//  APP STRUCTURE
// ===================================================================================

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
    :root {
      --dark-blue: #003366; --medium-blue: #005A9C; --light-blue: #A9D6E5; --accent-green: #2ECC71; --light-green: #E8F5E9;
      --accent-yellow: #FFC72C; --neutral-bg: #F8F9FA; --white: #FFFFFF; --text-primary: #212529; --text-secondary: #6C757D;
      --border-color: #DEE2E6; --error-red: #E74C3C;
    }
    *, *::before, *::after { box-sizing: border-box; }
    html, body, #root { margin: 0; padding: 0; width: 100%; min-height: 100%; }
    body { font-family: 'Inter', sans-serif; background-color: var(--neutral-bg); color: var(--text-primary); overflow-x: hidden; }
    .app-container { width: 100%; min-height: 100vh; }
  `}</style>
)

// Dynamically generate sections from closedQuestions
function getSectionsFromQuestions(questions) {
  const sectionMap = new Map()
  questions.forEach((q, idx) => {
    if (!q.section) return
    if (!sectionMap.has(q.section)) {
      sectionMap.set(q.section, { title: q.section, start: idx, end: idx })
    } else {
      sectionMap.get(q.section).end = idx
    }
  })
  // Add descriptions for each section (customize as needed)
  const descriptions = {
    Intereses: "Estas preguntas exploran tus intereses generales.",
    Habilidades: "Ahora vamos a conocer tus habilidades.",
    Valores: "Reflexiona sobre los valores que guían tus decisiones.",
    Contextos: "¿En qué contextos te gustaría desarrollarte profesionalmente?",
    Motivaciones: "¿Qué te impulsa y motiva en tu vida académica y profesional?",
    Transversales: "Competencias y actitudes clave para cualquier área.",
  }
  return Array.from(sectionMap.values()).map((sec) => ({
    ...sec,
    description: descriptions[sec.title] || "",
  }))
}

// UCAB section gradients for backgrounds (much lighter, more subtle)
const sectionGradients = {
  Intereses: "linear-gradient(120deg, #fafdff 0%, #eaf6fb 100%)", // azul muy pálido
  Habilidades: "linear-gradient(120deg, #f7fcf9 0%, #eafaf1 100%)", // verde muy pálido
  Valores: "linear-gradient(120deg, #fffeef 0%, #fffbe6 100%)", // amarillo muy pálido
  Contextos: "linear-gradient(120deg, #f6fcfd 0%, #eaf6fa 100%)", // celeste muy pálido
  Motivaciones: "linear-gradient(120deg, #fffaf3 0%, #fff4e6 100%)", // naranja muy pálido
  Transversales: "linear-gradient(120deg, #f7fafd 0%, #eef3f6 100%)", // gris azulado muy pálido
}

function AppRoutes() {
  // Move sections to the top so it is available to all hooks and helpers
  const sections = useMemo(() => getSectionsFromQuestions(closedQuestions), [closedQuestions])
  const [answers, setAnswers] = useState({})
  const [userData, setUserData] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResumePrompt, setShowResumePrompt] = useState(false)
  const [resumeTarget, setResumeTarget] = useState(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [showSectionIntro, setShowSectionIntro] = useState(true)
  const [showDetailedResults, setShowDetailedResults] = useState(false)
  const navigate = useNavigate()
  const handleStartTest = () => {
    const saved = localStorage.getItem("vocacional-progress")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && (parsed.userData || Object.keys(parsed.answers || {}).length > 0)) {
          setShowResumePrompt(true)
          setResumeTarget(parsed)
          return
        }
      } catch (e) {
        /* ignore */
      }
    }
    navigate("/intro")
  }
  const handleResume = () => {
    setShowResumePrompt(false)
    if (resumeTarget && resumeTarget.userData) {
      setUserData(resumeTarget.userData)
      setAnswers(resumeTarget.answers || {})
      setCurrentQuestionIndex(resumeTarget.currentQuestionIndex || 0)
      navigate("/test")
    } else {
      navigate("/intro")
    }
  }
  const handleForceRestart = () => {
    setShowResumePrompt(false)
    setAnswers({})
    setCurrentQuestionIndex(0)
    setResults(null)
    setIsLoading(false)
    setUserData(null)
    localStorage.removeItem("vocacional-progress")
    navigate("/intro")
  }
  const handleOnboardingComplete = (formData) => {
    setUserData(formData)
    setAnswers({})
    setCurrentQuestionIndex(0)
    setResults(null)
    setIsLoading(false)
    // Clear previous progress
    localStorage.removeItem("vocacional-progress")
    navigate("/test")
  }
  const handleSubmitForAnalysis = async (finalAnswers) => {
    setIsLoading(true)
    navigate("/results")
    
    try {
      const prompt = generateAnalysisPrompt(finalAnswers, closedQuestions, careers, userData?.name)
      const parsedResults = await analyzeWithGemini(prompt)
      console.log("Gemini raw response:", parsedResults)
      setResults(parsedResults)
    } catch (error) {
      console.error("Error analyzing results:", error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }
  const handleAnswer = (questionId, answerValue) => {
    const newAnswers = { ...answers, [questionId]: answerValue }
    setAnswers(newAnswers)
    if (currentQuestionIndex < closedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleSubmitForAnalysis(newAnswers)
    }
  }
  const handleBack = () => setCurrentQuestionIndex((idx) => Math.max(0, idx - 1))
  const handleRestart = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setResults(null)
    setIsLoading(false)
    setUserData(null)
    localStorage.removeItem("vocacional-progress")
    navigate("/")
  }

  const handleShowDetailedResults = () => setShowDetailedResults(true)
  const handleBackToStory = () => setShowDetailedResults(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("vocacional-progress")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed) {
          if (parsed.answers) setAnswers(parsed.answers)
          if (parsed.userData) setUserData(parsed.userData)
          if (typeof parsed.currentQuestionIndex === "number") setCurrentQuestionIndex(parsed.currentQuestionIndex)
        }
      } catch (e) {
        /* ignore */
      }
    }
  }, [])

  // Save progress to localStorage whenever relevant state changes
  useEffect(() => {
    localStorage.setItem(
      "vocacional-progress",
      JSON.stringify({
        answers,
        userData,
        currentQuestionIndex,
      }),
    )
  }, [answers, userData, currentQuestionIndex])

  // Helper to get section for current question
  const getSectionForQuestion = (qIdx) => {
    return sections.findIndex((section) => qIdx >= section.start && qIdx <= section.end)
  }

  // When question index changes, show intro if at section start
  useEffect(() => {
    const sectionIdx = getSectionForQuestion(currentQuestionIndex)
    if (sectionIdx !== -1 && currentQuestionIndex === sections[sectionIdx].start) {
      setCurrentSection(sectionIdx)
      setShowSectionIntro(true)
    }
  }, [currentQuestionIndex, sections])

  return (
    <>
      {showResumePrompt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowResumePrompt(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 12,
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              maxWidth: 350,
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>¿Continuar tu test?</h2>
            <p>Ya tienes un test iniciado. ¿Quieres continuar donde lo dejaste o empezar de nuevo?</p>
            <button
              style={{
                margin: "12px 0",
                padding: "10px 24px",
                fontWeight: 700,
                background: "#003366",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={handleResume}
            >
              Continuar donde lo dejé
            </button>
            <br />
            <button
              style={{
                padding: "8px 20px",
                background: "none",
                color: "#003366",
                border: "1px solid #003366",
                borderRadius: 6,
                cursor: "pointer",
              }}
              onClick={handleForceRestart}
            >
              Empezar de nuevo
            </button>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<UcabHomePage onStartTest={handleStartTest} />} />
        <Route path="/intro" element={<DataCaptureForm onOnboardingComplete={handleOnboardingComplete} />} />
        <Route
          path="/test"
          element={
            userData ? (
              showSectionIntro ? (
                <SectionIntro
                  title={sections[currentSection]?.title}
                  description={sections[currentSection]?.description}
                  onContinue={() => {
                    setShowSectionIntro(false)
                  }}
                />
              ) : closedQuestions[currentQuestionIndex] ? (
                <Question
                  question={closedQuestions[currentQuestionIndex]}
                  sectionName={sections[currentSection]?.title}
                  onAnswer={(qid, val) => {
                    // Solo avanza la sección, no muestres intro aquí
                    if (currentQuestionIndex === sections[currentSection]?.end) {
                      handleAnswer(qid, val)
                      setCurrentSection((cs) => cs + 1)
                      // NO setShowSectionIntro(true) aquí
                    } else {
                      handleAnswer(qid, val)
                    }
                  }}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={closedQuestions.length}
                  onBack={handleBack}
                />
              ) : (
                <div>Cargando...</div>
              )
            ) : (
              <Navigate to="/intro" replace />
            )
          }
        />
        <Route
          path="/results"
          element={
            results && userData ? (
              showDetailedResults ? (
                <DetailedResults
                  results={results}
                  user={userData}
                  onBack={handleBackToStory}
                  onRestart={handleRestart}
                />
              ) : (
                <ResultsScreen
                  results={results}
                  isLoading={isLoading}
                  onRestart={handleRestart}
                  user={userData}
                  onShowDetailed={handleShowDetailedResults}
                />
              )
            ) : (
              <Navigate to={userData ? "/test" : "/intro"} replace />
            )
          }
        />
        <Route path="/acerca" element={<AboutTest />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="app-container" style={{ position: "relative", overflow: "hidden" }}>
        <LightParticles />
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
