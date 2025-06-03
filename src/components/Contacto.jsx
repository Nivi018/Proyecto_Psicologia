import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_f6z1g4a'; 
const TEMPLATE_ID = 'template_w693e79';
const PUBLIC_KEY = 'Vt3rqdPUsUyf--3Lj';

export const Contacto = () => {
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

  const sendEmail = (form, data)  => {
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
    <div className="page">
      <h1 className="heading">Contactanos</h1>
      <form className="contact" ref={formRef} onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre Completo" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Semestre" value={semester} onChange={(e) => setSemester(e.target.value)} />
        <input type="text" placeholder="Carrera" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <textarea placeholder="Motivos de contacto" value={message} onChange={(e) => setMessage(e.target.value)} />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

