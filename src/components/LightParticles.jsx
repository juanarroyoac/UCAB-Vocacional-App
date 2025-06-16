import React from "react";
import Particles from "react-tsparticles";

const LightParticles = () => (
  <Particles
    options={{
      fullScreen: { enable: false },
      background: { color: "#fff", opacity: 0 },
      particles: {
        number: { value: 40 },
        color: { value: "#b0b0b0" },
        opacity: { value: 0.35 },
        size: { value: 3 },
        move: { enable: true, speed: 0.5 },
        links: { enable: false },
      },
      detectRetina: true,
    }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      pointerEvents: "none",
    }}
  />
);

export default LightParticles;
