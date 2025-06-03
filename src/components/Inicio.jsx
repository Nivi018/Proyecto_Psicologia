import React from 'react'
import { Link } from 'react-router-dom'
import { ListadoTrabajos } from './ListadoTrabajos'
import inicio1 from '../assets/inicio1.png';
import inicio2 from '../assets/inicio2.png';
import inicio3 from '../assets/inicio3.png';
import beneficiosterapia from '../assets/beneficiosterapia.png';

export const Inicio= () => {
  
  return (
    <div className='home'>

      <div className='pinicio'>

        <div className='bloque1'>
          <div className='mosaico'>
            <div className='img1'>
              <img src={inicio1} alt="inicio1" />
            </div>
            <div className='img2'>
              <div><img src={inicio2} alt="inicio2" />
                <img src={inicio3} alt="inicio3" /></div>

            </div>
          </div>
        </div>

        <div className='bloque2'>
          <div className='textoprimario'>
            <h1 >Departamento de psicología</h1>

            <p >Cuidar tu mente es tan importante como<br />
              cuidar tu cuerpo, te ofrecemos un espacio<br />
              seguro para crecer y sentirte mejor.<br />
              ¡Cuenta con nosotros!</p>

            <div className='boton'>
              <a id='btn-1'> <Link to="/Servicios#Contacto"> Contactanos</Link></a>
            </div>
          </div>
        </div>

      </div>
      <hr />

      <>
      <section id="contenedor4">
        <div id="contenedor4-1">
          <h1>Beneficios de la Terapia Psicológica en el Contexto Universitario:</h1>
          <div id="beneficios">
            <div id="imagenbeneficiosterapia">
              <img src={beneficiosterapia} alt="" />
            </div>
            <div id="beneficiosterapia">
              <h2>Apoyo especializado para estudiantes:</h2>
              <b>
                Al recibir terapia psicológica en el contexto universitario, los estudiantes tienen acceso a profesionales que comprenden los desafíos específicos que enfrentan, como el estrés académico, la presión social y la transición a la vida universitaria.
              </b>
              <h2>Integración con servicios estudiantiles:</h2>
              <b>
                Nuestro departamento de psicología trabaja en colaboración con otros servicios estudiantiles, como asesoramiento académico, servicios de salud y bienestar, y programas de apoyo a la diversidad, para proporcionar un enfoque integral de atención al estudiante.
              </b>
              <h2>Promoción del bienestar integral:</h2>
              <b>
                La terapia psicológica en el campus no solo se centra en abordar problemas específicos, sino que también promueve el bienestar integral de los estudiantes, ayudándolos a desarrollar habilidades de afrontamiento, mejorar la resiliencia y fomentar un estilo de vida saludable y equilibrado.
              </b>
            </div>
          </div>
        </div>
      </section>
    </>

      {/* <section className="last-works">
        <h2 className="heading">Algunos Servicios</h2>
        <p>Estos son algunas de los servicios que puedes realizar en la página.</p>


        <ListadoTrabajos limite="2" />
      </section> */}
    </div>
  )
}
