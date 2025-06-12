import React, { useState } from 'react';

const DataCaptureForm = ({ onContinue }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (step === 0 && !name) return;
    if (step === 1 && !email) return;
    if (step === 2 && !school) return;
    setStep(step + 1);
    if (step === 2) {
      onContinue({ name, email, school });
    }
  };

  const handleBack = (e) => {
    if (e) e.preventDefault();
    if (step > 0) setStep(step - 1);
  };

  return (
    <form className="data-capture-form" onSubmit={handleNext} style={{maxWidth: 320, padding: '1.2rem 1rem 1rem 1rem', minWidth: 0}}>
      <h2 style={{fontSize: '1.1rem', marginBottom: 12}}>Datos Iniciales</h2>
      {step === 0 && (
        <label style={{fontSize: '0.98rem', marginBottom: 6}}>
          Nombre completo
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
            style={{fontSize: '0.98rem', padding: '0.5rem 0.7rem', height: 32, minWidth: 0}}
            maxLength={40}
          />
        </label>
      )}
      {step === 1 && (
        <label style={{fontSize: '0.98rem', marginBottom: 6}}>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
            style={{fontSize: '0.98rem', padding: '0.5rem 0.7rem', height: 32, minWidth: 0}}
            maxLength={40}
          />
        </label>
      )}
      {step === 2 && (
        <label style={{fontSize: '0.98rem', marginBottom: 6}}>
          Colegio de procedencia
          <input
            type="text"
            value={school}
            onChange={e => setSchool(e.target.value)}
            required
            autoFocus
            style={{fontSize: '0.98rem', padding: '0.5rem 0.7rem', height: 32, minWidth: 0}}
            maxLength={40}
          />
        </label>
      )}
      <div className="disclaimer" style={{fontSize: '0.85rem', marginTop: 2, marginBottom: 6, lineHeight: 1.2}}>
        <small>
          Al ingresar tu correo aceptas que podrías recibir información sobre materiales promocionales, eventos o novedades de orientación vocacional. Tus datos no serán compartidos con terceros.
        </small>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 8}}>
        {step > 0 && (
          <button className="primary-btn" type="button" onClick={handleBack} style={{background: '#e9ecef', color: '#0033A0', fontSize: '0.98rem', padding: '6px 16px'}}>
            Atrás
          </button>
        )}
        <div style={{flex: 1}} />
        <button className="primary-btn" type="submit" style={{fontSize: '0.98rem', padding: '6px 16px'}}>
          {step < 2 ? 'Siguiente' : 'Finalizar'}
        </button>
      </div>
    </form>
  );
};

export default DataCaptureForm;
