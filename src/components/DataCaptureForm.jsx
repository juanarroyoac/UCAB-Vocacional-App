import React, { useState, useMemo } from 'react';
import './Onboarding.css';
import './ModernSelect.css';

const VENEZUELAN_STATES = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo',
  'Cojedes', 'Delta Amacuro', 'Distrito Capital', 'Falcón', 'Guárico', 'Lara',
  'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre',
  'Táchira', 'Trujillo', 'La Guaira', 'Yaracuy', 'Zulia'
];

const GENDERS = [
  'Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'
];

const HEARD_ABOUT_US = [
  'Redes Sociales', 'Colegio', 'Amigo/a', 'Otro'
];

const DataCaptureForm = ({ onOnboardingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    city: '',
    state: '',
    school: '',
    heardAbout: '',
  });
  const [textTransition, setTextTransition] = useState(false);

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
          <input id="name" name="name" value={formData.name} onChange={handleInputChange} autoFocus maxLength={50} placeholder="Escribe tu nombre" autocomplete="name" />
        </div>
      ),
      validationField: 'name',
    },
    {
      title: 'Tu correo electrónico',
      isForm: true,
      content: (
        <div className="form-field center-field">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} maxLength={50} placeholder="tu.correo@ejemplo.com"/>
        </div>
      ),
      validationField: 'email',
    },
    {
      title: 'Ciudad y estado',
      isForm: true,
      content: (
        <div className="form-field center-field">
          <label htmlFor="city">Ciudad</label>
          <input id="city" name="city" value={formData.city} onChange={handleInputChange} maxLength={50} placeholder="Ej: Caracas" />
          <label htmlFor="state" style={{marginTop: 16}}>Estado</label>
          <select id="state" name="state" value={formData.state} onChange={handleInputChange} className="modern-select">
            <option value="">Selecciona tu estado</option>
            {VENEZUELAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      ),
      validationField: ['city', 'state'],
    },
    {
      title: 'Género',
      isForm: true,
      content: (
        <div className="form-field">
          <label htmlFor="gender">Género</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="modern-select">
            <option value="">Selecciona una opción</option>
            {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      ),
      validationField: 'gender',
    },
    {
      title: 'Colegio',
      isForm: true,
      content: (
        <div className="form-field">
          <label htmlFor="school">Nombre del colegio</label>
          <input id="school" name="school" value={formData.school} onChange={handleInputChange} maxLength={50} placeholder="Nombre del colegio" autocomplete="off" />
        </div>
      ),
      validationField: 'school',
    },
    {
      title: '¿Cómo supiste de nosotros?',
      isForm: true,
      content: (
        <div className="form-field">
          <label htmlFor="heardAbout">Selecciona una opción:</label>
          <select id="heardAbout" name="heardAbout" value={formData.heardAbout} onChange={handleInputChange} className="modern-select">
            <option value="">Selecciona una opción</option>
            {HEARD_ABOUT_US.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      ),
      validationField: 'heardAbout',
    },
  ], [formData, textTransition]);

  const handleNext = () => {
    setTextTransition(true);
    setTimeout(() => {
      setTextTransition(false);
      const isFinalStep = currentStep === stepsConfig.length - 1;
      if (isFinalStep) {
        if (typeof onOnboardingComplete === 'function') {
          onOnboardingComplete(formData);
        }
        return;
      }
      setCurrentStep(prev => prev + 1);
    }, 250);
  };

  const handleBack = () => {
    setTextTransition(true);
    setTimeout(() => {
      setTextTransition(false);
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      }
    }, 250);
  };

  const currentStepConfig = stepsConfig[currentStep];
  if (!currentStepConfig) {
    // If step is out of bounds, show a fallback error message
    return (
      <div className="onboarding-wrapper">
        <div className="onboarding-container">
          <h2>Ocurrió un error. Por favor, recarga la página.</h2>
        </div>
      </div>
    );
  }

  // Basic email validation for enabling the next button
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  let isNextDisabled = false;
  if (currentStepConfig.isForm) {
    if (Array.isArray(currentStepConfig.validationField)) {
      isNextDisabled = !currentStepConfig.validationField.every(f => formData[f]);
    } else if (currentStepConfig.validationField === 'email') {
      isNextDisabled = !isEmailValid;
    } else {
      isNextDisabled = !formData[currentStepConfig.validationField];
    }
  }

  return (
    <>
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