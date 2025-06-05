import React from 'react';


const recommendations = [
  {
    title: 'Ingeniería Informática',
    description: 'Ideal para quienes disfrutan resolver problemas, trabajar con tecnología y crear soluciones innovadoras. Esta carrera te permitirá desarrollar software, analizar datos y liderar proyectos tecnológicos.',
    link: 'https://www.ucab.edu.ve/carreras/ingenieria-informatica/',
    icon: '💻'
  },
  {
    title: 'Comunicación Social',
    description: 'Perfecta para personas creativas, con habilidades para la expresión oral y escrita, y que disfrutan trabajar en equipo. Podrás desarrollarte en medios, relaciones públicas y producción de contenido.',
    link: 'https://www.ucab.edu.ve/carreras/comunicacion-social/',
    icon: '📰'
  },
  {
    title: 'Psicología',
    description: 'Recomendada para quienes tienen interés en comprender el comportamiento humano, ayudar a otros y trabajar en contextos sociales o clínicos.',
    link: 'https://www.ucab.edu.ve/carreras/psicologia/',
    icon: '🧠'
  }
];


const ResultsScreen = () => (
  <div className="results-screen">
    <h1 className="main-title animate-fadein">Tus Resultados Vocacionales</h1>
    <p className="description animate-fadein" style={{animationDelay: '0.2s'}}>¡Gracias por completar la prueba! Según tus respuestas, estas carreras podrían ser adecuadas para ti:</p>
    <div className="recommendations-list horizontal-list">
      {recommendations.map((rec, i) => (
        <div key={i} className="recommendation-card horizontal-card animate-popin" style={{animationDelay: `${0.3 + i * 0.15}s`}}>
          <div className="rec-icon" aria-hidden>{rec.icon}</div>
          <div className="rec-content">
            <h2>{rec.title}</h2>
            <p>{rec.description}</p>
            <a className="rec-link" href={rec.link} target="_blank" rel="noopener noreferrer">
              Leer más sobre {rec.title}
            </a>
          </div>
        </div>
      ))}
    </div>
    <div className="thanks-message animate-fadein" style={{animationDelay: '0.7s'}}>
      <strong>¡Te deseamos mucho éxito en tu futuro profesional!</strong>
    </div>
  </div>
);

export default ResultsScreen;
