import React from 'react';

const Question = ({
  question,
  index,
  total,
  value,
  onChange,
  onNext,
  onPrev,
  isFirst,
  isLast
}) => {
  return (
    <div className="question-container">
      <div className="progress-indicator">
        Pregunta {index + 1} / {total}
      </div>
      <h2 className="question-title">{question.text}</h2>
      <div className="question-body">
        {question.type === 'closed' ? (
          <div className="options-list">
            {question.options.map((opt, i) => (
              <label key={i} className="option-label">
                <input
                  type={question.multiple ? 'checkbox' : 'radio'}
                  name={`q${index}`}
                  value={opt}
                  checked={question.multiple ? value?.includes(opt) : value === opt}
                  onChange={e => {
                    if (question.multiple) {
                      if (e.target.checked) {
                        onChange([...(value || []), opt]);
                      } else {
                        onChange((value || []).filter(v => v !== opt));
                      }
                    } else {
                      onChange(opt);
                    }
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        ) : (
          <textarea
            className="open-answer"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            rows={4}
            placeholder="Escribe tu respuesta aquí..."
          />
        )}
      </div>
      <div className="question-nav">
        {!isFirst && (
          <button className="secondary-btn" onClick={onPrev}>
            Anterior
          </button>
        )}
        {!isLast ? (
          <button className="primary-btn" onClick={onNext} disabled={question.type === 'closed' ? !value || (Array.isArray(value) && value.length === 0) : !value}>
            Siguiente
          </button>
        ) : (
          <button className="primary-btn" onClick={onNext} disabled={question.type === 'closed' ? !value || (Array.isArray(value) && value.length === 0) : !value}>
            Finalizar Prueba
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
