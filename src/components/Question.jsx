// src/App.jsx
// Componente principal de la aplicación que maneja el estado y la lógica del cuestionario.


import React, { useState } from "react";
import Question from "./components/Question";

const questionsData = [
  {
    text: "¿Te sientes satisfecho con tu vida en general?",
    type: "likert"
  },
  {
    text: "¿Has tenido pensamientos de hacerte daño?",
    type: "binary"
  },
  {
    text: "¿Sientes que tienes suficiente apoyo emocional?",
    type: "likert"
  },
  {
    text: "¿Te resulta fácil manejar el estrés?",
    type: "likert"
  },
  {
    text: "¿Tienes metas claras para el futuro?",
    type: "binary"
  }
];

function App() {
  const [questions] = useState(questionsData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (val) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = val;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handleBack = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    alert("Cuestionario completado. Tus respuestas: " + JSON.stringify(answers));
  };

  const question = questions[currentQuestion];
  const isLast = currentQuestion === questions.length - 1;

  return (
    <div className="app">
      <Question
        question={question}
        index={currentQuestion}
        total={questions.length}
        onAnswer={handleAnswer}
        onBack={handleBack}
        answer={answers[currentQuestion]}
        onFinish={handleFinish}
        isLast={isLast}
      />
    </div>
  );
}

export default App;