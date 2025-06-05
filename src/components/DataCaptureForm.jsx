import React, { useState } from 'react';

const DataCaptureForm = ({ onContinue }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      onContinue({ name, email });
    }
  };

  return (
    <form className="data-capture-form" onSubmit={handleSubmit}>
      <h2>Datos Iniciales</h2>
      <label>
        Nombre completo
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Correo electrónico
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <div className="disclaimer">
        <small>
          Al ingresar tu correo aceptas que podrías recibir información sobre materiales promocionales, eventos o novedades de orientación vocacional. Tus datos no serán compartidos con terceros.
        </small>
      </div>
      <button className="primary-btn" type="submit">Continuar</button>
    </form>
  );
};

export default DataCaptureForm;
