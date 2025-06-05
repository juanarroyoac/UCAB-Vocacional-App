import React, { useState } from 'react';
import './App.css';
import { WelcomeScreen, DataCaptureForm, Question, ResultsScreen } from './components';
import { questions } from './questions';

function App() {
  const [step, setStep] = useState(0); // 0: welcome, 1: datos, 2: preguntas, 3: resultados
  const [userData, setUserData] = useState({});
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStart = () => setStep(1);
  const handleDataContinue = (data) => {
    setUserData(data);
    setStep(2);
  };
  const handleAnswerChange = (value) => {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  };
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep(3);
    }
  };
  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };
  React.useEffect(() => {
    if (step !== 2) setCurrentQuestion(0);
  }, [step]);

  // Cambia la clase de la tarjeta principal según el paso
  let mainContentClass = 'main-content';
  if (step === 0) mainContentClass += ' welcome-content';
  else if (step === 3) mainContentClass += ' report-content';

  return (
    <div className="app-root">
      <div className={mainContentClass}>
        {step === 0 && <WelcomeScreen onStart={handleStart} />}
        {step === 1 && <DataCaptureForm onContinue={handleDataContinue} />}
        {step === 2 && (
          <Question
            question={questions[currentQuestion]}
            index={currentQuestion}
            total={questions.length}
            value={answers[currentQuestion]}
            onChange={handleAnswerChange}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentQuestion === 0}
            isLast={currentQuestion === questions.length - 1}
          />
        )}
        {step === 3 && <ResultsScreen />}
      </div>
    </div>
  );
}

export default App;
