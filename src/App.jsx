// src/App.jsx - Versión 4 sin preguntas abiertas

import { useState } from 'react';
import { closedQuestions } from './questions.js';
import { calculateResults } from './scoring.js';
import careersData from './ucab_carreras.json';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import WelcomeScreen from './components/WelcomeScreen';
import HomePage from './components/HomePage';
import UcabHomePage from './components/UcabHomePage';
import Question from './components/Question';
import ResultsScreen from './components/ResultsScreen';

import './App.css';


function AppRoutes() {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const handleStartTest = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResults(null);
    navigate('/test');
  };

  const handleAnswer = async (questionId, answerValue) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerValue }));
    if (currentQuestionIndex + 1 < closedQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question answered
      const calculatedResults = await calculateResults({ ...answers, [questionId]: answerValue }, careersData);
      setResults(calculatedResults);
      navigate('/results');
    }
  };

  const handleBack = () => {
    setCurrentQuestionIndex(idx => Math.max(0, idx - 1));
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResults(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<UcabHomePage />} />
      <Route path="/intro" element={<WelcomeScreen onStart={handleStartTest} />} />
      <Route path="/test" element={
        <div className="question-screen">
          <div className="question-card">
            {closedQuestions[currentQuestionIndex] && (
              <Question
                question={closedQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={closedQuestions.length}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      } />
      <Route path="/results" element={<ResultsScreen results={results} answers={answers} onRestart={handleRestart} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;