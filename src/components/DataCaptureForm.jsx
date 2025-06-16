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
    phone: '',
    dob: '',
    gender: '',
    state: '',
    city: '',
    school: '',
    gradYear: '',
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
          <input id="name" name="name" value={formData.name} onChange={handleInputChange} autoFocus maxLength={50} placeholder="Escribe tu nombre" />
        </div>
      ),
      validationField: 'name',
    },
    {
      title: 'Tu correo electrónico y teléfono',
      isForm: true,
      content: (
        <>
          <div className="form-field center-field">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} maxLength={50} placeholder="tu.correo@ejemplo.com"/>
          </div>
          <div className="form-field center-field">
            <label htmlFor="phone">Teléfono (opcional)</label>
            <input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} maxLength={20} placeholder="Ej: 0412-1234567" pattern="[0-9\-\+\s]*" inputMode="numeric" />
          </div>
          <p className="disclaimer">Al continuar, aceptas que podríamos enviarte información sobre eventos y novedades de orientación vocacional.</p>
        </>
      ),
      validationField: 'email',
    },
    {
      title: 'Fecha de nacimiento',
      isForm: true,
      content: (
        <div className="form-field">
          <label htmlFor="dob">Fecha de nacimiento</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} />
        </div>
      ),
      validationField: 'dob',
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
      title: 'Estado y ciudad',
      isForm: true,
      content: (
        <div className="form-field center-field">
          <label htmlFor="state">Estado</label>
          <select id="state" name="state" value={formData.state} onChange={handleInputChange} className="modern-select">
            <option value="">Selecciona tu estado</option>
            {VENEZUELAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <label htmlFor="city" style={{marginTop: 16}}>Ciudad</label>
          <input id="city" name="city" value={formData.city} onChange={handleInputChange} maxLength={50} placeholder="Ej: Caracas" />
        </div>
      ),
      validationField: ['state', 'city'],
    },
    {
      title: 'Colegio y año de graduación',
      isForm: true,
      content: (
        <>
          <div className="form-field">
            <label htmlFor="school">Nombre del colegio</label>
            <input id="school" name="school" value={formData.school} onChange={handleInputChange} maxLength={50} placeholder="Nombre del colegio" />
          </div>
          <div className="form-field" style={{marginTop: 8}}>
            <label htmlFor="gradYear">Año de graduación</label>
            <input id="gradYear" name="gradYear" value={formData.gradYear} onChange={handleInputChange} maxLength={4} placeholder="Ej: 2025" />
          </div>
        </>
      ),
      validationField: ['school', 'gradYear'],
    },
    {
      title: '¿Cómo supiste de nosotros?',
      isForm: true,
      content: (
        <div className="form-field">
          <label htmlFor="heardAbout">¿Cómo supiste de nosotros?</label>
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
  // Phone validation: allow empty or valid Venezuelan phone number (7-15 digits, optional +, -, spaces)
  const isPhoneValid = !formData.phone || /^[0-9\-\+\s]{7,15}$/.test(formData.phone);
  let isNextDisabled = false;
  if (currentStepConfig.isForm) {
    if (Array.isArray(currentStepConfig.validationField)) {
      isNextDisabled = !currentStepConfig.validationField.every(f => formData[f]);
    } else if (currentStepConfig.validationField === 'email') {
      isNextDisabled = !isEmailValid || !isPhoneValid;
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