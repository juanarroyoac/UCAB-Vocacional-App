// src/components/Question.jsx
// Componente dinámico para mostrar una pregunta y sus opciones de respuesta.


import React from "react";

const likertLabels = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Neutral",
  "De acuerdo",
  "Totalmente de acuerdo"
];

function Question({ question, index, total, onAnswer, onBack, answer, onFinish, isLast }) {
  const handleAnswer = (val) => {
    onAnswer(val);
    if (isLast) onFinish && onFinish();
  };

  return (
    <div className="quiz-bg">
      <div className="quiz-card">
        <div className="quiz-header">
          <button className="back-btn" onClick={onBack} aria-label="Atrás">
            ←
          </button>
          <span className="progress-text">
            Pregunta {index + 1} de {total}
          </span>
        </div>
        <h2 className="question-title">{question.text}</h2>
        <div className="answers">
          {question.type === "likert" ? (
            likertLabels.map((label, i) => (
              <button
                key={i}
                className={`answer-btn${answer === i + 1 ? " selected" : ""}`}
                onClick={() => handleAnswer(i + 1)}
                tabIndex={0}
              >
                {label}
              </button>
            ))
          ) : (
            ["Sí", "No"].map((label, i) => (
              <button
                key={label}
                className={`answer-btn${answer === (i === 0 ? 1 : 0) ? " selected" : ""}`}
                onClick={() => handleAnswer(i === 0 ? 1 : 0)}
                tabIndex={0}
              >
                {label}
              </button>
            ))
          )}
        </div>
        <div className="progress-bar-wrap">
          <div
            className="progress-bar"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>
      <style>{`
        .quiz-bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg);
        }
        .quiz-card {
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 4px 32px 0 rgba(0,90,156,0.08);
          padding: 2.2rem 1.5rem 2.5rem 1.5rem;
          max-width: 420px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .quiz-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }
        .back-btn {
          background: var(--color-primary-light);
          color: var(--color-primary-dark);
          border: none;
          border-radius: 50%;
          width: 2.2rem;
          height: 2.2rem;
          font-size: 1.3rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .back-btn:hover {
          background: var(--color-primary);
          color: #fff;
        }
        .progress-text {
          font-size: 1rem;
          color: var(--color-primary);
          font-weight: 500;
        }
        .question-title {
          font-size: 1.3rem;
          color: var(--color-primary-dark);
          margin: 0 0 1.5rem 0;
          text-align: center;
        }
        .answers {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.2rem;
        }
        .answer-btn {
          background: var(--color-primary-light);
          color: var(--color-primary-dark);
          border: none;
          border-radius: 1.2rem;
          padding: 1rem 0.5rem;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          outline: none;
        }
        .answer-btn.selected, .answer-btn:focus {
          background: var(--color-accent);
          color: #fff;
        }
        .answer-btn:hover {
          background: var(--color-primary);
          color: #fff;
        }
        .progress-bar-wrap {
          width: 100%;
          height: 8px;
          background: var(--color-neutral);
          border-radius: 4px;
          margin-top: 1.2rem;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary) 80%, #FFE066 100%);
          border-radius: 4px;
          transition: width 0.3s;
        }
        @media (max-width: 500px) {
          .quiz-card {
            padding: 1.2rem 0.5rem 1.5rem 0.5rem;
            max-width: 98vw;
          }
        }
      `}</style>
    </div>
  );
}

export default Question;