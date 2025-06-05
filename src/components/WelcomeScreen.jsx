

import ucabLogo from '../assets/ucab-logo.png';

const WelcomeScreen = ({ onStart }) => (
  <div className="welcome-screen">
    <img
      src={ucabLogo}
      alt="Logo UCAB"
      style={{ width: 80, height: 80, marginBottom: 18, marginTop: 8, borderRadius: 0, boxShadow: 'none', background: 'none' }}
      draggable={false}
    />
    <h1 className="main-title">Prueba Vocacional UCAB</h1>
    <p className="description">
      Elige tu camino con propósito. Responde preguntas clave y descubre carreras que conectan con tu perfil y tus intereses. ¡Explora tu futuro hoy!
    </p>
    <button className="primary-btn" onClick={onStart}>
      Comenzar
    </button>
  </div>
);

export default WelcomeScreen;
