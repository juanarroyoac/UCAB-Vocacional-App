// src/components/OpenQuestion.jsx
// Componente para mostrar la pregunta generada por la IA y capturar la respuesta del usuario.

import { useState } from 'react';

function OpenQuestion({ question, onSubmit, questionNumber }) {
  const [textAnswer, setTextAnswer] = useState('');

  const handleSubmit = () => {
    if (textAnswer.trim()) {
      onSubmit(questionNumber, textAnswer);
    }
  };

  return (
    <>
      <div className="card-content-wrapper fixed-card">
        <h2 className="question-text">{question}</h2>
        <textarea
          className="textarea-answer"
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          placeholder="Escribe tu respuesta aquí (1-2 oraciones)..."
          rows="4"
        />
      </div>
      <div className="fixed-bottom-btn">
        <button onClick={handleSubmit} disabled={!textAnswer.trim()}>
          Siguiente
        </button>
      </div>
    </>
  );
}

export default OpenQuestion;