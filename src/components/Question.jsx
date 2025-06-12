// src/components/Question.jsx
// Componente dinámico para mostrar una pregunta y sus opciones de respuesta.

function Question({ question, onAnswer, questionNumber, totalQuestions, onBack }) {

  const handleLikertClick = (value) => {
    onAnswer(question.id, value);
  };

  const handleYesNoClick = (value) => {
    // Usaremos 1 para "Sí" y 0 para "No"
    onAnswer(question.id, value);
  };

  // Calcular el porcentaje de progreso
  const progressPercent = Math.max(0, Math.min(100, (questionNumber / totalQuestions) * 100));

  return (
    <div className="screen" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '80px' }}>
        <div className="question-main-content" style={{ marginBottom: '0', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="question-text" style={{ marginBottom: '16px' }}>{question.text}</h2>
          <div className="options-container">
            {question.type === 'likert' && (
              <>
                <div className="likert-scale">
                  <button onClick={() => handleLikertClick(1)}>1</button>
                  <button onClick={() => handleLikertClick(2)}>2</button>
                  <button onClick={() => handleLikertClick(3)}>3</button>
                  <button onClick={() => handleLikertClick(4)}>4</button>
                  <button onClick={() => handleLikertClick(5)}>5</button>
                </div>
                <div className="likert-scale-label">
                  <span>
                    Totalmente en<br />desacuerdo
                  </span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>
                    Totalmente de<br />acuerdo
                  </span>
                </div>
              </>
            )}
            {question.type === 'yes-no' && (
              <div className="yes-no-scale">
                <button onClick={() => handleYesNoClick(1)}>Sí</button>
                <button onClick={() => handleYesNoClick(0)}>No</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="progress-bar-container">
        <button
          className="back-arrow"
          onClick={onBack}
          disabled={questionNumber <= 1}
          aria-label="Pregunta anterior"
        >
          <span style={{fontWeight: 'bold', fontSize: '1.4rem', lineHeight: 1}}>&laquo;</span>
        </button>
        <div className="progress-bar-gradient">
          <div
            className="progress-bar-gradient-inner"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Question;