import React, { useState, useEffect } from 'react';
import '../themes/FormExpediente.css'

export const Expediente = () => {
  const initialFormData = {
    numeroControl: '',
    nombre: '',
    sexo: '',
    edad: '',
    estadoCivil: '',
    direccion: '',
    telefono: '',
    ingenieria: '',
    modalidad: '',
    semestre: '',
    fechaRegistro: '',
    motivoConsulta: '',
    desencadenantesMotivo: '',
    planOrientacion: '',
    seguimiento: '',
    numeroSesiones: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  // Función para obtener los datos del usuario
  const fetchUserData = async (noControl) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expediente/expedientes/${noControl}`, {
        cache: 'no-store',
      });
  
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
  
      const userData = await response.json();
      const user = userData.usuario;
  
      if (!user) {
        throw new Error('Datos del usuario no disponibles');
      }

       // Formatear fechaRegistro al formato "yyyy-MM-dd"
    const formattedDate = user.fecha_registro
    ? new Date(user.fecha_registro).toISOString().split('T')[0] // Convertir a formato "yyyy-MM-dd"
    : '';
  
      setFormData((prevData) => ({
        ...prevData,
        nombre: user.nombre || '',
        sexo: user.sexo || '',
        edad: user.edad || '',
        estadoCivil: user.estado_civil || '',
        direccion: user.direccion || '',
        telefono: user.telefono || '',
        ingenieria: user.ingenieria || '',
        modalidad: user.modalidad || '',
        semestre: user.semestre || '',
        fechaRegistro: formattedDate,
      }));
  
      console.log("Datos de respuesta:", userData);
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error.message);
    }
  };

  // Usar useEffect para detectar cambios en numeroControl
  useEffect(() => {
    if (formData.numeroControl) {
      fetchUserData(formData.numeroControl);
    }
  }, [formData.numeroControl]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expedienteData = {
      no_control: formData.numeroControl,
      motivo_consulta: formData.motivoConsulta,
      desencadenantes_motivo: formData.desencadenantesMotivo,
      plan_orientacion: formData.planOrientacion,
      seguimiento: formData.seguimiento,
      numero_sesiones: Number(formData.numeroSesiones),
    };

    try {
      const response = await fetch('http://localhost:3000/api/expediente/expedientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expedienteData),
      });

      if (!response.ok) {
        throw new Error('Error en la creación del expediente');
      }

      const data = await response.json();
      console.log('Expediente creado:', data);

      // Limpiar el formulario después de guardar los datos
      setFormData(initialFormData); // Esto resetea los campos del formulario

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const {
    numeroControl,
    nombre,
    sexo,
    edad,
    estadoCivil,
    direccion,
    telefono,
    ingenieria,
    modalidad,
    semestre,
    fechaRegistro,
    motivoConsulta,
    desencadenantesMotivo,
    planOrientacion,
    seguimiento,
    numeroSesiones,
  } = formData;

  console.log("datos", formData);

  return (
    <div className='form-expediente'>
      <h1>Expediente Psicológico</h1>
      <form onSubmit={handleSubmit}>
        <h2>Datos Generales</h2>
        <label>Número de control:</label>
        <input type="text" name="numeroControl" value={numeroControl} onChange={handleChange} required />

        <label>Nombre y apellidos:</label>
        <input type="text" name="nombre" value={nombre} onChange={handleChange} readOnly required />

        <label>Sexo:</label>
        <input type="text" name="sexo" value={sexo} onChange={handleChange} readOnly required />

        <label>Edad:</label>
        <input type="number" name="edad" value={edad} onChange={handleChange} readOnly required />

        <label>Estado Civil:</label>
        <input type="text" name="estadoCivil" value={estadoCivil} onChange={handleChange} readOnly required />

        <label>Dirección:</label>
        <input type="text" name="direccion" value={direccion} onChange={handleChange} readOnly required />

        <label>Teléfono:</label>
        <input type="tel" name="telefono" value={telefono} onChange={handleChange} readOnly required />

        <label>Ingeniería:</label>
        <input type="text" name="ingenieria" value={ingenieria} onChange={handleChange} readOnly required />

        <label>Modalidad:</label>
        <input type="text" name="modalidad" value={modalidad} onChange={handleChange} readOnly required />

        <label>Semestre:</label>
        <input type="number" name="semestre" value={semestre} onChange={handleChange} readOnly required />

        <label>Fecha de Registro:</label>
        <input type="date" name="fechaRegistro" value={fechaRegistro} onChange={handleChange} readOnly required />

        <label>Motivo de Consulta:</label>
        <input type="text" name="motivoConsulta" value={motivoConsulta} onChange={handleChange} required />

        <label>Desencadenantes del Motivo:</label>
        <input type="text" name="desencadenantesMotivo" value={desencadenantesMotivo} onChange={handleChange} required />

        <label>Plan de Orientación:</label>
        <input type="text" name="planOrientacion" value={planOrientacion} onChange={handleChange} required />

        <label>Seguimiento:</label>
        <input type="text" name="seguimiento" value={seguimiento} onChange={handleChange} required />

        <label>Número de sesiones:</label>
        <input type="number" name="numeroSesiones" value={numeroSesiones} onChange={handleChange} required min="0" />

        <input type="submit" value="Generar Expediente" />
      </form>
    </div>
  );
};