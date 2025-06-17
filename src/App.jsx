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
        .ucab-home-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(45deg, #ffffff 0%, #A9D6E5 100%);
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
        }
        .ucab-home-page {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .ucab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .logo-ucab { height: 40px; }
        .logo-text-ucab {
          font-weight: 700;
          font-size: 20px;
          color: var(--dark-blue);
          letter-spacing: -0.5px;
        }
        .header-actions { display: flex; align-items: center; gap: 24px; }
        .career-link {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease-in-out;
        }
        .career-link:hover { color: var(--dark-blue); }
        .test-button {
          background-color: transparent;
          color: var(--dark-blue);
          border: 2px solid var(--dark-blue);
          padding: 8px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border-radius: 8px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease-in-out;
        }
        .test-button:hover { background-color: var(--dark-blue); color: var(--white); }
        .ucab-main-content {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          gap: 64px;
          padding: 1px 0; /* was 80px 0, reduced for less space */
          flex-grow: 1;
        }
        .left-panel .main-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 16px;
          object-fit: cover;
        }
        .right-panel { display: flex; flex-direction: column; }
        .right-panel h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-weight: normal;
          color: var(--dark-blue);
          margin: 0 0 16px 0;
          line-height: 1.2;
          letter-spacing: -1.5px;
        }
        .subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 550px;
        }
        .main-cta-button {
           background-color: var(--dark-blue);
           color: var(--white);
           align-self: flex-start;
           font-size: 18px;
           padding: 14px 40px;
           border: none;
           border-radius: 8px;
           cursor: pointer;
           font-weight: 700;
           transition: all 0.2s ease-in-out;
        }
        .main-cta-button:hover {
            background-color: var(--medium-blue);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 51, 102, 0.2);
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
          .header-actions { gap: 12px; }
          .career-link { display: none; }
        }
    `}</style>
      <div className="ucab-home-page-wrapper">
        <div className="ucab-home-page">
          <header className="ucab-header">
            <a href="/" className="logo-container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png"
                alt="UCAB Logo"
                className="logo-ucab"
              />
              <span className="logo-text-ucab">Portal Vocacional</span>
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
              <a href="/acerca" className="career-link">
                Acerca del test
              </a>
              <button className="test-button" onClick={onStartTest}>
                Haz el test
              </button>
            </div>
          </header>
          <main className="ucab-main-content">
            <div className="left-panel">
              <img
                src="https://placehold.co/500x500/E8F5E9/003366?text=Talento+UCAB"
                alt="Estudiante descubriendo su vocación"
                className="main-image"
              />
            </div>
            <div className="right-panel">
              <h1>TU PRIMER PASO A LLEGAR LEJOS.</h1>
              <p className="subtitle">
                Completa nuestro test vocacional para descubrir qué profesión de futuro encaja mejor contigo y recibir
                orientación formativa. ¡Elige tu futuro en la UCAB!
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

const Question = ({ question, onAnswer, questionNumber, totalQuestions, onBack }) => {
  const handleLikertClick = (value) => onAnswer(question.id, value)
  const handleYesNoClick = (value) => onAnswer(question.id, value)
  const progressPercent = Math.max(0, Math.min(100, ((questionNumber - 1) / totalQuestions) * 100))
  return (
    <>
      <style>{`
        .question-screen-wrapper { width: 100%; min-height: 100vh; background-color: var(--neutral-bg); display: flex; justify-content: center; align-items: center; padding: 24px; }
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
    // Genera el prompt con preguntas, carreras y nombre del usuario
    const prompt = generateAnalysisPrompt(finalAnswers, closedQuestions, careers, userData?.name)
    const parsedResults = await analyzeWithGemini(prompt)
    console.log("Gemini raw response:", parsedResults)
    setResults(parsedResults)
    setIsLoading(false)
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
