import React, { useState, useEffect } from 'react';

export const Expediente = () => {
  const [formData, setFormData] = useState({
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
  });

  // Función para obtener los datos del usuario
  const fetchUserData = async (noControl) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expediente/getExpediente/${noControl}`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const userData = await response.json();
      console.log(userData);
      setFormData((prevData) => ({
        ...prevData,
        nombre: userData.nombre || '',
        sexo: userData.sexo || '',
        edad: userData.edad || '',
        estadoCivil: userData.estado_civil || '',
        direccion: userData.direccion || '',
        telefono: userData.telefono || '',
        ingenieria: userData.ingenieria || '',
        modalidad: userData.modalidad || '',
        semestre: userData.semestre || '',
        fechaRegistro: userData.fecha_registro || '',
      }));
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
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

    // Enviar solo los datos específicos del expediente
    const expedienteData = {
      no_control: formData.numeroControl,
      motivo_consulta: formData.motivoConsulta,
      desencadenantes_motivo: formData.desencadenantesMotivo,
      plan_orientacion: formData.planOrientacion,
      seguimiento: formData.seguimiento,
      numero_sesiones: Number(formData.numeroSesiones),
    };

    try {
      const response = await fetch('http://localhost:3000/api/expediente/crearExpediente', {
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='page'>
      <h1>Expediente Psicológico</h1>
      <form onSubmit={handleSubmit}>
        <h2>Datos Generales</h2>
        <label>Número de control:</label>
        <input type="text" name="numeroControl" value={formData.numeroControl} onChange={handleChange} required />

        <label>Nombre y apellidos:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} readOnly required />

        <label>Sexo:</label>
        <input type="text" name="sexo" value={formData.sexo} onChange={handleChange} readOnly required />

        <label>Edad:</label>
        <input type="number" name="edad" value={formData.edad} onChange={handleChange} readOnly required />

        <label>Estado Civil:</label>
        <input type="text" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} readOnly required />

        <label>Dirección:</label>
        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} readOnly required />

        <label>Teléfono:</label>
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} readOnly required />

        <label>Ingeniería:</label>
        <input type="text" name="ingenieria" value={formData.ingenieria} onChange={handleChange} readOnly required />

        <label>Modalidad:</label>
        <input type="text" name="modalidad" value={formData.modalidad} onChange={handleChange} readOnly required />

        <label>Semestre:</label>
        <input type="number" name="semestre" value={formData.semestre} onChange={handleChange} readOnly required />

        <label>Fecha de Registro:</label>
        <input type="date" name="fechaRegistro" value={formData.fechaRegistro} onChange={handleChange} readOnly required />

        <label>Motivo de Consulta:</label>
        <input type="text" name="motivoConsulta" value={formData.motivoConsulta} onChange={handleChange} required />

        <label>Desencadenantes del Motivo:</label>
        <input type="text" name="desencadenantesMotivo" value={formData.desencadenantesMotivo} onChange={handleChange} required />

        <label>Plan de Orientación:</label>
        <input type="text" name="planOrientacion" value={formData.planOrientacion} onChange={handleChange} required />

        <label>Seguimiento:</label>
        <input type="text" name="seguimiento" value={formData.seguimiento} onChange={handleChange} required />

        <label>Número de sesiones:</label>
        <input type="number" name="numeroSesiones" value={formData.numeroSesiones} onChange={handleChange} required min="0" />

        <input type="submit" value="Generar Expediente" />
      </form>
    </div>
  );
};
