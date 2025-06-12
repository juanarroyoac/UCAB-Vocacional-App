// src/components/WelcomeScreen.jsx
// Pantalla de bienvenida que usa el modo full-screen



import { useEffect, useState } from 'react';
import ucabLogo from '../assets/ucab-logo.png';
import { useNavigate } from 'react-router-dom';
import DataCaptureForm from './DataCaptureForm';



function WelcomeScreen({ onStart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [studentData, setStudentData] = useState(null);
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.classList.add('full-screen');
      appElement.classList.remove('quiz-mode');
    }
    return () => {
      if (appElement) {
        appElement.classList.remove('full-screen');
      }
    };
  }, []);

  const steps = [
    {
      title: '¡Bienvenido/a!',
      content: (
        <>
          <p>Esta es la prueba vocacional inteligente de la UCAB.</p>
          <p>Descubre las carreras más afines a tus intereses y aptitudes.</p>
        </>
      ),
    },
    {
      title: '¿Cómo funciona?',
      content: (
        <>
          <p>Responde una serie de preguntas sobre tus intereses, habilidades y preferencias.</p>
          <p>La prueba dura aproximadamente 12 minutos y es 100% confidencial.</p>
        </>
      ),
    },
    {
      title: '¿Qué obtendrás?',
      content: (
        <>
          <p>Al finalizar, recibirás un perfil vocacional personalizado y recomendaciones de carreras.</p>
          <p>¡Tu futuro comienza aquí!</p>
        </>
      ),
    },
    {
      title: 'Antes de comenzar',
      content: (
        <DataCaptureForm onContinue={(data) => {
          setStudentData(data);
          setFormComplete(true);
          setStep(steps.length - 1); // Avanza automáticamente al último paso
        }} />
      ),
    },
  ];





  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleStart = () => {
    if (onStart) onStart(studentData);
    navigate('/test');
  };

  return (
    <div className="screen" style={{maxWidth: 420, margin: '0 auto', width: '100%'}}>
      {/* <img src={ucabLogo} alt="Logo UCAB" className="logo" style={{marginBottom: 24}} /> */}
      <h1 style={{marginBottom: 8}}>{steps[step].title}</h1>
      <div style={{marginBottom: 24}}>{steps[step].content}</div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 340, margin: '0 auto'}}>
        {step > 0 && (
          <button className="primary-btn" style={{background: '#e9ecef', color: '#0033A0'}} onClick={handlePrev}>
            Atrás
          </button>
        )}
        <div style={{flex: 1}} />
        {step < steps.length - 1 && (
          <button className="primary-btn" onClick={handleNext}>
            Siguiente
          </button>
        )}
        {step === steps.length - 1 && formComplete && (
          <button className="primary-btn" style={{marginLeft: 8}} onClick={handleStart}>
            Comenzar Test
          </button>
        )}
      </div>
      <div style={{marginTop: 18, textAlign: 'center', color: '#888', fontSize: 14}}>
        Paso {step + 1} de {steps.length}
      </div>
    </div>
  );
}

export default WelcomeScreen;