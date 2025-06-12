import React, { useState, useMemo } from 'react';

const DataCaptureForm = ({ onOnboardingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Configuration for each step of the onboarding process
  const stepsConfig = useMemo(() => [
    {
      title: '¡Bienvenido/a!',
      content: <p className="step-description">Esta es la prueba vocacional inteligente de la UCAB. Descubre las carreras más afines a tus intereses y aptitudes.</p>
    },
    {
      title: '¿Cómo funciona?',
      content: <p className="step-description">Responderás una serie de preguntas sobre tus intereses y habilidades. La prueba dura aproximadamente 10 minutos y es 100% confidencial.</p>
    },
    {
      title: '¿Qué obtendrás?',
      content: <p className="step-description">Al finalizar, recibirás un perfil vocacional personalizado con recomendaciones de carreras y áreas de estudio. ¡Tu futuro profesional comienza aquí!</p>
    },
    {
      title: 'Antes de comenzar',
      isForm: true,
      content: (
        <div className="form-field">
          <label htmlFor="name">Nombre completo</label>
          <input id="name" name="name" value={formData.name} onChange={handleInputChange} autoFocus maxLength={50} placeholder="Escribe tu nombre" />
        </div>
      ),
      validationField: 'name',
    },
    {
      title: 'Un último dato',
      isForm: true,
      content: (
        <>
            <div className="form-field">
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} autoFocus maxLength={50} placeholder="tu.correo@ejemplo.com"/>
            </div>
             <p className="disclaimer">
            Al continuar, aceptas que podríamos enviarte información sobre eventos y novedades de orientación vocacional.
          </p>
        </>
      ),
      validationField: 'email',
    },
  ], [formData.name, formData.email]); // Dependency array ensures content is memoized correctly

  const handleNext = () => {
    const isFinalStep = currentStep === stepsConfig.length - 1;
    if (isFinalStep) {
        if (typeof onOnboardingComplete === 'function') {
            // Pass the collected data upon completion
            onOnboardingComplete(formData);
        }
        return;
    }
    setCurrentStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepConfig = stepsConfig[currentStep];
  // Basic email validation for enabling the next button
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isNextDisabled = currentStepConfig.isForm && 
    (currentStepConfig.validationField === 'email' ? !isEmailValid : !formData[currentStepConfig.validationField]);

  return (
    <>
      <style>{`
        /*
          Component: DataCaptureForm
          Design: Clean, minimalist, multi-step onboarding flow.
          All colors are hardcoded for self-contained styling.
        */
        .onboarding-wrapper {
          width: 100vw;
          min-height: 100vh;
          background-color: #f6f8fa;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px;
        }

        .onboarding-container {
          width: 100%;
          max-width: 450px;
          background-color: #fff;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }

        .onboarding-header h1 {
          font-size: clamp(1.75rem, 5vw, 2.25rem);
          color: #003366;
          font-weight: 800;
          margin: 0 0 16px 0;
        }

        .step-description, .form-field {
          margin: 24px 0;
        }

        .step-description {
            font-size: 1.125rem;
            line-height: 1.6;
            color: #222b45;
        }

        .form-field {
            text-align: left;
        }
        
        .form-field label {
          font-size: 1rem;
          font-weight: 500;
          color: #222b45;
          display: block;
          margin-bottom: 8px;
        }

        .form-field input {
          width: 100%;
          padding: 12px 16px;
          font-size: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #f9fafb;
        }

        .form-field input:focus {
          outline: none;
          border-color: #003366;
          box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.15);
        }
        
        .disclaimer {
          font-size: 0.8rem;
          color: #6b7280;
          margin-top: 1rem;
          line-height: 1.5;
        }

        .onboarding-nav {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .nav-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .onboarding-nav button {
          flex-grow: 1;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-primary {
          background-color: #003366;
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          background-color: #2563eb;
        }
        .btn-primary:disabled {
          background-color: #A9D6E5;
          cursor: not-allowed;
        }
        
        .btn-secondary {
          background-color: transparent;
          color: #6b7280;
          border: 1px solid #d1d5db;
        }
        .btn-secondary:hover {
          background-color: #f6f8fa;
          color: #222b45;
        }

        .progress-indicator {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }

        .progress-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #d1d5db;
          transition: background-color 0.3s;
        }

        .progress-dot.active {
          background-color: #003366;
        }
      `}</style>
      <div className="onboarding-wrapper">
        <div className="onboarding-container">
          <header className="onboarding-header">
            <h1>{currentStepConfig.title}</h1>
          </header>

          <main>
            {currentStepConfig.content}
          </main>

          <footer className="onboarding-nav">
            <div className="nav-buttons">
              {currentStep > 0 && (
                <button onClick={handleBack} className="btn-secondary">Atrás</button>
              )}
              <button onClick={handleNext} disabled={isNextDisabled} className="btn-primary">
                {currentStep === stepsConfig.length - 1 ? 'Comenzar Test' : 'Siguiente'}
              </button>
            </div>
            <div className="progress-indicator">
              {stepsConfig.map((_, index) => (
                <div key={index} className={`progress-dot ${currentStep === index ? 'active' : ''}`} />
              ))}
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DataCaptureForm;