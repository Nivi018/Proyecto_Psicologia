import React from 'react';

export const CircleAnimation = () => {
  return (
    <div className="animation-container"> {/* Contenedor centrado */}
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>

      <style jsx>{`
        .animation-container {
          position: fixed;  /* Fijo en la pantalla */
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;  /* Centrado horizontal */
          align-items: center;      /* Centrado vertical */
          background-color: rgba(0, 0, 0, 0.4); /* Fondo oscuro con opacidad */
          z-index: 1000;  /* Asegura que esté por encima de otros elementos */
        }

        .wrapper {
          width: 200px;
          height: 60px;
          position: relative;
          z-index: 1;
        }

        .circle {
          width: 20px;
          height: 20px;
          position: absolute;
          border-radius: 50%;
          background-color: #28a745;  /* Color verde */
          left: 15%;
          transform-origin: 50%;
          animation: circle7124 0.5s alternate infinite ease;
        }

        @keyframes circle7124 {
          0% {
            top: 60px;
            height: 5px;
            border-radius: 50px 50px 25px 25px;
            transform: scaleX(1.7);
          }

          40% {
            height: 20px;
            border-radius: 50%;
            transform: scaleX(1);
          }

          100% {
            top: 0%;
          }
        }

        .circle:nth-child(2) {
          left: 45%;
          animation-delay: 0.2s;
        }

        .circle:nth-child(3) {
          left: auto;
          right: 15%;
          animation-delay: 0.3s;
        }

        .shadow {
          width: 20px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(0, 100, 0, 0.5); /* Sombra verde translúcida */
          position: absolute;
          top: 62px;
          transform-origin: 50%;
          z-index: -1;
          left: 15%;
          filter: blur(1px);
          animation: shadow046 0.5s alternate infinite ease;
        }

        @keyframes shadow046 {
          0% {
            transform: scaleX(1.5);
          }

          40% {
            transform: scaleX(1);
            opacity: 0.7;
          }

          100% {
            transform: scaleX(0.2);
            opacity: 0.4;
          }
        }

        .shadow:nth-child(4) {
          left: 45%;
          animation-delay: 0.2s;
        }

        .shadow:nth-child(5) {
          left: auto;
          right: 15%;
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};