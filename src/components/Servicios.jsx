import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { trabajos } from '../data/trabajos';
import emailjs from '@emailjs/browser';
import servicios1 from '../assets/servicios1.png';
import servicios2 from '../assets/servicios2.jpg';

export const Servicios = () => {
    const SERVICE_ID = 'service_f6z1g4a';
    const TEMPLATE_ID = 'template_w693e79';
    const PUBLIC_KEY = 'Vt3rqdPUsUyf--3Lj';
    const location = useLocation()
    const [proyecto, setProyecto] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1))
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
        let proyecto = trabajos.filter(trabajo => trabajo.id === params.id)
        setProyecto(proyecto[0]);
    }, [location]);

    const handleNavigate = () => {
        navigate('/login');
    };

    const formRef = useRef(null);
    // const formRef = useRef(null);

    const [name, setName] = useState('');
    const [semester, setSemester] = useState('');
    const [carrera, setCarrera] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name,
            semester: semester,
            carrera: carrera,
            email: email,
            message: message,
        };

        // Enviar el correo electrónico
        sendEmail(formRef.current, data);
    };

    const sendEmail = (form, data) => {
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
            .then((response) => {
                console.log('Correo electrónico enviado con éxito:', response.status, response.text);
                alert('Correo electrónico enviado con éxito!');
            })
            .catch((error) => {
                console.error('Error al enviar el correo electrónico:', error);
                alert('Error al enviar el correo electrónico. Intente más tarde.');
            });
    };


    return (
        <>
            <div className="contserv">
                <section>
                    <h1>
                        Servicios
                    </h1>
                    <div className="contcuadros">
                        <div className="cuadroz">
                            <div className="agendaxd">
                                <img src={servicios2} alt="" />
                                <h3>Agendar citas</h3>
                                <hr />
                                <p>¿Necesitas apoyo emocional o asesoramiento psicológico? Nuestro sistema de agendamiento te permite reservar una cita de manera sencilla y segura. Selecciona la fecha y el horario que mejor se adapte a ti, y recibe el acompañamiento de un profesional que te ayudará a encontrar bienestar y equilibrio emocional. Da el primer paso hacia tu bienestar con solo unos clics.</p>
                            </div>
                            <div className="consultaxd">
                                <img src={servicios1} alt="" />
                                <h3>Consultar citas</h3>
                                <hr />
                                <p>Mantén un seguimiento organizado de tus citas pendientes con nuestro sistema de consulta. Aquí podrás verificar fácilmente la fecha, hora y detalles de tus sesiones programadas, asegurando que siempre estés al tanto de tus compromisos. Nuestro sistema te permite gestionar tus citas de manera rápida y eficiente, brindándote la tranquilidad de contar con el apoyo adecuado cuando lo necesites.</p>
                            </div>
                        </div>
                        <div className='botonxd'>
                            <a onClick={handleNavigate}>  Da el primer paso hacia tu bienestar</a>
                        </div></div>
                </section>


                <hr id="Contacto" />
                <section>
                    <header>
                        <h2 >¡Hablemos!</h2>
                        <p>Estamos aquí para ayudarte. Completa el formulario o elige uno de los canales de contacto.</p>
                    </header>

                    <div className='conthablemos '>
                        <div className='formhablemos'>
                            <form className="contact" ref={formRef} onSubmit={handleSubmit}>
                                <label>Nombre completo</label>
                                <input className="input-group" type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
                                <label>Semestre</label>
                                <input className="input-group" type="text" placeholder="Semestre" value={semester} onChange={(e) => setSemester(e.target.value)} />
                                <label>Carrera</label>
                                <input className="input-group" type="text" placeholder="Carrera" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
                                <label>Correo electrónico</label>
                                <input className="input-group" type="email" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label>Mensaje / Asunto</label>
                                <textarea className="input-group" placeholder="¿En qué podemos ayudarte?" value={message} onChange={(e) => setMessage(e.target.value)} />
                                <div className='enviarhabl'>
                                    <button type="submit" value=""> Enviar</button>
                                </div>
                            </form>
                        </div>

                        <div className='infohablemos'>
                            <p>¡Contáctanos!</p>
                            <hr />
                            <div className='infohablemos1'>
                                <div>
                                    <div>
                                        <span>📞</span>
                                        <span><strong>Teléfono:</strong> +52 123 456 7890</span>
                                    </div>
                                    <div>
                                        <span>✉️</span>
                                        <span><strong>Email:</strong> psicologia@libres.edu.mx</span>
                                    </div>
                                    <div>
                                        <span>📍</span>
                                        <span><strong>Oficinas:</strong> Av. Tecnológico s/n, Libres, Puebla</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <strong>Horarios de atención:</strong> <br />
                                        <a>· Lunes a viernes: 9:00 – 17:00</a> <br />
                                        <a>· Sábados: 9:00 – 13:00</a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <iframe
                                    title="Ubicación"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d940.4752685637853!2d-97.67440746512298!3d19.459831529300917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85daac6a30b61faf%3A0xaf178a6ea8d20c26!2sInstituto%20Tecnol%C3%B3gico%20Superior%20de%20Libres!5e0!3m2!1ses-419!2smx!4v1745436362160!5m2!1ses-419!2smx"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>


    );
}