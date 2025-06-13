import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// ===================================================================================
//  COMPONENT DEFINITIONS
//  All components are now in this single file to resolve import errors.
// ===================================================================================

const UcabHomePage = ({ onStartTest }) => {
  return (
    <>
      <style>{`
        .ucab-home-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background-color: var(--white);
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
          padding: 80px 0;
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
          font-weight: 800;
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
          .ucab-main-content { grid-template-columns: 1fr; gap: 48px; padding: 60px 0; text-align: center; }
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png" alt="UCAB Logo" className="logo-ucab"/>
              <span className="logo-text-ucab">Portal Vocacional</span>
            </a>
            <div className="header-actions">
              <a href="https://www.ucab.edu.ve/pregrado/" className="career-link" target="_blank" rel="noopener noreferrer">Áreas Profesionales</a>
              <a href="https://www.ucab.edu.ve/pregrado/" className="career-link" target="_blank" rel="noopener noreferrer">Acerca del test</a>
              <button className="test-button" onClick={onStartTest}>Haz el test</button>
            </div>
          </header>
          <main className="ucab-main-content">
            <div className="left-panel">
              <img src="https://placehold.co/500x500/E8F5E9/003366?text=Talento+UCAB" alt="Estudiante descubriendo su vocación" className="main-image"/>
            </div>
            <div className="right-panel">
              <h1>Test de Orientación Vocacional Inteligente</h1>
              <p className="subtitle">Completa nuestro test vocacional para descubrir qué profesión de futuro encaja mejor contigo y recibir orientación formativa. ¡Elige tu futuro en la UCAB!</p>
              <button className="main-cta-button" onClick={onStartTest}>Comenzar ahora</button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const DataCaptureForm = ({ onOnboardingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const stepsConfig = useMemo(() => [
    { title: '¡Bienvenido/a!', content: <p className="step-description">Esta es la prueba vocacional inteligente de la UCAB. Descubre las carreras más afines a tus intereses y aptitudes.</p> },
    { title: '¿Cómo funciona?', content: <p className="step-description">Responderás una serie de preguntas sobre tus intereses y habilidades. La prueba dura aproximadamente 10 minutos y es 100% confidencial.</p> },
    { title: 'Antes de comenzar', isForm: true, content: <div className="form-field"><label htmlFor="name">Nombre completo</label><input id="name" name="name" value={formData.name} onChange={handleInputChange} autoFocus maxLength={50} placeholder="Escribe tu nombre" /></div>, validationField: 'name' },
    { title: 'Un último dato', isForm: true, content: <><div className="form-field"><label htmlFor="email">Correo electrónico</label><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} autoFocus maxLength={50} placeholder="tu.correo@ejemplo.com"/></div><p className="disclaimer">Al continuar, aceptas que podríamos enviarte información sobre eventos y novedades de orientación vocacional.</p></>, validationField: 'email' },
  ], [formData.name, formData.email]);
  const handleNext = () => {
    if (currentStep === stepsConfig.length - 1) {
      if (typeof onOnboardingComplete === 'function') onOnboardingComplete(formData);
      return;
    }
    setCurrentStep(prev => prev + 1);
  };
  const handleBack = () => { if (currentStep > 0) setCurrentStep(prev => prev - 1) };
  const currentStepConfig = stepsConfig[currentStep];
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isNextDisabled = currentStepConfig.isForm && (currentStepConfig.validationField === 'email' ? !isEmailValid : !formData[currentStepConfig.validationField]);
  return (
    <>
      <style>{`
        .onboarding-wrapper { width: 100%; min-height: 100vh; background-color: var(--neutral-bg); display: flex; justify-content: center; align-items: center; padding: 24px; }
        .onboarding-container { width: 100%; max-width: 450px; min-height: 480px; background-color: var(--white); border-radius: 16px; padding: 32px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); display: flex; flex-direction: column; text-align: center; }
        .onboarding-header { flex: 0 0 auto; }
        .onboarding-header h1 { font-size: clamp(1.75rem, 5vw, 2.25rem); color: var(--dark-blue); font-weight: 800; margin: 0 0 16px 0; }
        .onboarding-main { flex: 1 1 auto; display: flex; flex-direction: column; justify-content: center; }
        .step-description, .form-field { margin: 16px 0; }
        .step-description { font-size: 1.125rem; line-height: 1.6; color: var(--text-secondary); }
        .form-field { text-align: left; }
        .form-field label { font-size: 1rem; font-weight: 500; color: var(--text-primary); display: block; margin-bottom: 8px; }
        .form-field input { width: 100%; padding: 12px 16px; font-size: 1rem; border: 1px solid var(--border-color); border-radius: 8px; transition: border-color 0.2s, box-shadow 0.2s; }
        .form-field input:focus { outline: none; border-color: var(--dark-blue); box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.15); }
        .disclaimer { font-size: 0.8rem; color: var(--text-secondary); margin-top: 1rem; line-height: 1.5; }
        .onboarding-footer { flex: 0 0 auto; display: flex; flex-direction: column; gap: 16px; padding-top: 24px; }
        .nav-buttons { display: flex; justify-content: center; gap: 12px; }
        .onboarding-footer button { flex-grow: 1; border: none; border-radius: 8px; padding: 12px 24px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; }
        .btn-primary { background-color: var(--dark-blue); color: white; }
        .btn-primary:hover:not(:disabled) { background-color: var(--medium-blue); }
        .btn-primary:disabled { background-color: #A9D6E5; cursor: not-allowed; }
        .btn-secondary { background-color: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); }
        .btn-secondary:hover { background-color: var(--neutral-bg); color: var(--text-primary); }
        .progress-indicator { display: flex; justify-content: center; gap: 8px; }
        .progress-dot { width: 10px; height: 10px; border-radius: 50%; background-color: var(--border-color); transition: background-color 0.3s; }
        .progress-dot.active { background-color: var(--dark-blue); }
      `}</style>
      <div className="onboarding-wrapper">
        <div className="onboarding-container">
          <header className="onboarding-header"><h1>{currentStepConfig.title}</h1></header>
          <div className="onboarding-main">{currentStepConfig.content}</div>
          <footer className="onboarding-footer">
            <div className="nav-buttons">
              {currentStep > 0 && (<button onClick={handleBack} className="btn-secondary">Atrás</button>)}
              <button onClick={handleNext} disabled={isNextDisabled} className="btn-primary">{currentStep === stepsConfig.length - 1 ? 'Comenzar Test' : 'Siguiente'}</button>
            </div>
            <div className="progress-indicator">{stepsConfig.map((_, index) => (<div key={index} className={`progress-dot ${currentStep === index ? 'active' : ''}`} />))}</div>
          </footer>
        </div>
      </div>
    </>
  );
};

const Question = ({ question, onAnswer, questionNumber, totalQuestions, onBack }) => {
  const handleLikertClick = (value) => onAnswer(question.id, value);
  const handleYesNoClick = (value) => onAnswer(question.id, value);
  const progressPercent = Math.max(0, Math.min(100, ((questionNumber -1) / totalQuestions) * 100));
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
          <header className="question-card-header"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_ucab_original.svg/1200px-Logo_ucab_original.svg.png" alt="UCAB Logo" /></header>
          <main className="question-main-content">
            <h2 className="question-text">{question.text}</h2>
            <div className="options-container">
              {question.type === 'likert' && (
                <>
                  <div className="likert-scale">{[1, 2, 3, 4, 5].map(value => (<button key={value} onClick={() => handleLikertClick(value)}>{value}</button>))}</div>
                  <div className="likert-labels"><span>En desacuerdo</span><span>De acuerdo</span></div>
                </>
              )}
              {question.type === 'yes-no' && (<div className="yes-no-options"><button onClick={() => handleYesNoClick(1)}>Sí</button><button onClick={() => handleYesNoClick(0)}>No</button></div>)}
            </div>
          </main>
          <footer className="question-card-footer">
            <button className="back-button" onClick={onBack} disabled={questionNumber <= 1} aria-label="Pregunta anterior">‹</button>
            <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} /></div>
          </footer>
        </div>
      </div>
    </>
  );
};


import ResultsScreen from './components/ResultsScreen';

// ===================================================================================
//  MOCK DATA & API
// ===================================================================================

import { closedQuestions as officialClosedQuestions } from './questions.js';
// Integramos algunas preguntas yes-no del mock original
const yesNoQuestions = [
  { id: 'q3', text: '¿Se te da bien crear una historia a partir de una idea?', type: 'yes-no' },
  { id: 'q5', text: '¿Disfrutas resolviendo acertijos lógicos y matemáticos?', type: 'yes-no' },
  { id: 'q8', text: '¿Te atrae el mundo de las finanzas y las inversiones?', type: 'yes-no' }
];
// Mezclamos las yes-no con las oficiales (puedes ajustar la posición si lo deseas)
const closedQuestions = [
  ...officialClosedQuestions.slice(0, 5),
  yesNoQuestions[0],
  ...officialClosedQuestions.slice(5, 10),
  yesNoQuestions[1],
  ...officialClosedQuestions.slice(10, 20),
  yesNoQuestions[2],
  ...officialClosedQuestions.slice(20)
];


import { runAiInteraction } from './gemini.js';
import { generateAnalysisPrompt } from './scoring.js';
import careers from './ucab_carreras.json';


// Llama a Gemini API y espera un JSON válido como respuesta
const analyzeWithGemini = async (prompt) => {
  try {
    const responseText = await runAiInteraction(prompt);

    // Remove markdown code block if present
    let cleaned = responseText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
    }

    try {
      return JSON.parse(cleaned);
    } catch (jsonError) {
      // Not JSON, return the text as result
      return { text: responseText };
    }
  } catch (error) {
    console.error('Error al analizar con Gemini:', error);
    // Devuelve un error estructurado para mostrar al usuario
    return { error: 'No se pudo analizar la respuesta de la IA. Intenta de nuevo.' };
  }
};

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
);

function AppRoutes() {
  const [answers, setAnswers] = useState({});
  const [userData, setUserData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleStartTest = () => navigate('/intro');
  const handleOnboardingComplete = (formData) => {
    setUserData(formData);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResults(null);
    setIsLoading(false);
    navigate('/test');
  };
  const handleSubmitForAnalysis = async (finalAnswers) => {
    setIsLoading(true);
    navigate('/results');
    // Genera el prompt con preguntas, carreras y nombre del usuario
    const prompt = generateAnalysisPrompt(finalAnswers, closedQuestions, careers, userData?.name);
    const parsedResults = await analyzeWithGemini(prompt);
    console.log('Gemini raw response:', parsedResults);
    setResults(parsedResults);
    setIsLoading(false);
  };
  const handleAnswer = (questionId, answerValue) => {
    const newAnswers = { ...answers, [questionId]: answerValue };
    setAnswers(newAnswers);
    if (currentQuestionIndex < closedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitForAnalysis(newAnswers);
    }
  };
  const handleBack = () => setCurrentQuestionIndex(idx => Math.max(0, idx - 1));
  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResults(null);
    setIsLoading(false);
    setUserData(null);
    navigate('/');
  };
  return (
    <Routes>
      <Route path="/" element={<UcabHomePage onStartTest={handleStartTest} />} />
      <Route path="/intro" element={<DataCaptureForm onOnboardingComplete={handleOnboardingComplete} />} />
      <Route path="/test" element={ closedQuestions[currentQuestionIndex] ? <Question question={closedQuestions[currentQuestionIndex]} onAnswer={handleAnswer} questionNumber={currentQuestionIndex + 1} totalQuestions={closedQuestions.length} onBack={handleBack}/> : <div>Cargando...</div> } />
      <Route path="/results" element={ <ResultsScreen results={results} isLoading={isLoading} onRestart={handleRestart} user={userData} /> }/>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="app-container">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
