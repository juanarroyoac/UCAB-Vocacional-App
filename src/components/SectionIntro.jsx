import React, { useState } from "react";

const SectionIntro = ({ title, description, onContinue }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(() => {
      onContinue();
    }, 700); // Duration matches fadeOut animation
  };

  return (
    <div className={`section-intro-fade${fadeOut ? ' fade-out' : ''}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={handleContinue}>Continuar</button>
      <style>{`
        .section-intro-fade {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: var(--neutral-bg, #F8F9FA);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 2000;
          animation: fadeIn 1s;
          opacity: 1;
          transition: opacity 0.7s;
        }
        .section-intro-fade.fade-out {
          opacity: 0;
          animation: fadeOut 0.7s forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .section-intro-fade h2 {
          font-size: 2rem;
          color: var(--dark-blue, #003366);
          margin-bottom: 1rem;
        }
        .section-intro-fade p {
          color: var(--text-secondary, #6C757D);
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 500px;
          text-align: center;
        }
        .section-intro-fade button {
          background: var(--dark-blue, #003366);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 32px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .section-intro-fade button:hover {
          background: var(--medium-blue, #005A9C);
        }
      `}</style>
    </div>
  );
};

export default SectionIntro;
