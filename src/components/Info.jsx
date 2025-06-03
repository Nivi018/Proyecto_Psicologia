import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import sandra from '../assets/sandra.png';
import sandra2 from '../assets/sandra2.png';
import fuente from '../assets/fuente.png';

export const Info = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);
    return (
        <>
            <section id="contenedor2">
                <div id="contenedor2-1">
                    <div id="textosecundario">
                        <h1>Tratamiento profesional a cargo de la Psicóloga Sandra Luz Rugerio Rojas</h1>
                        <p id="parrafo2">
                            "Hola, soy Sandra Luz Rugerio Rojas, una psicóloga con especialización en asesoramiento estudiantil y desarrollo personal. Durante mi carrera, he tenido el privilegio de trabajar estrechamente con estudiantes universitarios, brindando orientación y apoyo en áreas como la gestión del estrés, la resolución de conflictos y el desarrollo de habilidades de afrontamiento. Mi enfoque se centra en crear un ambiente de confianza y empatía, donde los estudiantes se sientan seguros para explorar sus preocupaciones y alcanzar su máximo potencial académico y personal. Estoy comprometida a ayudar a los estudiantes a superar los desafíos que enfrentan durante su experiencia universitaria y a fomentar su bienestar emocional y éxito académico."
                        </p>
                        <h2 >
                            Experiencia
                        </h2>
                        <h3>Instituto Tecnológico Superior de Libres, Puebla <br />
                            Enero 2021 - Actualidad</h3>
                        <p>
                            Como parte del Departamento de Psicología del Instituto Tecnológico Superior de Libres, hemos brindado apoyo integral a la comunidad estudiantil a través de diversos servicios especializados. Nuestro enfoque se basa en la empatía, la orientación profesional y el acompañamiento continuo para mejorar el bienestar emocional y académico de los estudiantes.
                        </p>
                        <h2>Servicios ofrecidos</h2>
                        <ul>
                            <li>
                                <strong>Terapia individual y grupal:</strong> Para abordar problemáticas personales y fortalecer el bienestar emocional.
                            </li>
                            <li>
                                <strong>Talleres especializados:</strong> Dirigidos a estudiantes de ingeniería, abordando temas como:
                                <ul>
                                    <li>Relaciones interpersonales y de pareja</li>
                                    <li>Prevención de la violencia de género</li>
                                    <li>Salud mental y autocuidado</li>
                                    <li>Habilidades de comunicación efectiva</li>
                                    <li>Estrategias para mejorar los hábitos de estudio</li>
                                    <li>Manejo del estrés y la ansiedad</li>
                                    <li>Prevención del suicidio y autolesiones</li>
                                    <li>Control de la ira y gestión emocional</li>
                                </ul>
                            </li>
                        </ul>

                        <h2>Áreas de atención psicológica</h2>
                        <ul>
                            <li>Ansiedad</li>
                            <li>Duelo</li>
                            <li>Depresión (en adultos y adolescentes)</li>
                            <li>Estrés y manejo de la presión académica</li>
                            <li>Codependencia en relaciones interpersonales</li>
                            <li>Trastornos de conducta</li>
                            <li>Estrés postraumático</li>
                            <li>Acoso escolar (<i>bullying</i>)</li>
                        </ul>
                    </div>
                    <div id="imagensecundaria">
                        <div><img src={sandra} alt="" />
                        <img src={sandra2} alt="" /></div>
                        
                    </div>
                </div>
            </section>

            <hr id="Preguntas" />
            <section id="contenedor3">
                <div id="contenedor3-1">
                    <div id="preguntasfrecuentes">
                        <h1>Preguntas frecuentes</h1>
                        <h2>¿Qué servicios ofrece el departamento de psicología de la universidad?</h2>
                        <b>
                            El departamento de psicología de la universidad ofrece una variedad de servicios para apoyar el bienestar emocional y mental de los estudiantes. Esto incluye asesoramiento individual, terapia de grupo, talleres de habilidades, evaluaciones psicológicas y consultas de crisis.
                        </b>
                        <h2>¿Cómo puedo acceder a servicios de asesoramiento psicológico?</h2>
                        <b>
                            Para acceder a servicios de asesoramiento psicológico, puedes programar una cita a través de nuestro sistema en línea, llamar al departamento de psicología o visitar nuestra oficina en el campus para obtener más información y programar una cita en persona.
                        </b>
                        <h2>¿Cuál es el proceso para programar una cita con un consejero?</h2>
                        <b>
                            El proceso para programar una cita con un consejero varía según la disponibilidad y preferencias del estudiante. Puedes programar una cita en línea a través de nuestro portal de servicios estudiantiles o contactar directamente con el departamento de psicología para hablar con un miembro del equipo y programar una cita que se ajuste a tu horario.
                        </b>
                        <h2>¿Qué tipo de terapias o enfoques se utilizan en el departamento de psicología?</h2>
                        <b>
                            Nuestro departamento de psicología utiliza una variedad de enfoques terapéuticos, incluyendo terapia cognitivo-conductual, terapia centrada en la persona, terapia de aceptación y compromiso, y enfoques basados en la evidencia para abordar una amplia gama de preocupaciones y problemas emocionales.
                        </b>
                    </div>
                    <div id="imagenpreguntasfrecuentes">
                        <img src={fuente} alt="" />
                    </div>
                </div>
            </section>
        </>
    );
}
