import React, { useState } from 'react';
import { ExpedienteForm } from './common/ExpedienteFom';

export const Expediente = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    sexo: '',
    edad: '',
    estadoCivil: '',
    direccion: '',
    telefono: '',
    ingenieria: '',
    modalidad: '',
    semestre: '',
    numeroControl: '',
    fechaRegistro: '',
    numeroSesiones: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar el objeto JSON para enviar
    const expedienteData = {
      no_control: formData.numeroControl,
      sexo: formData.sexo,
      edad: Number(formData.edad),
      estado_civil: formData.estadoCivil,
      direccion: formData.direccion,
      telefono: formData.telefono,
      ingenieria: formData.ingenieria,
      modalidad: formData.modalidad,
      semestre: Number(formData.semestre),
      fecha_registro: formData.fechaRegistro,
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
      // Aquí podrías manejar el éxito, por ejemplo, redirigir al usuario o mostrar un mensaje

    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías manejar el error, como mostrar un mensaje al usuario
    }
  };

  const formFields = [
    { label: 'Número de control', type: 'text', name: 'numeroControl', required: true },
    { label: 'Nombre y apellidos', type: 'text', name: 'nombre', required: true },
    {
      label: 'Sexo',
      type: 'select',
      name: 'sexo',
      options: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
        { value: 'otro', label: 'Otro' },
      ],
      required: true,
    },
    { label: 'Edad', type: 'number', name: 'edad', required: true, min: 0, max: 100 },
    {
      label: 'Estado Civil',
      type: 'select',
      name: 'estadoCivil',
      options: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'soltero', label: 'Soltero' },
        { value: 'casado', label: 'Casado' },
        { value: 'divorciado', label: 'Divorciado' },
        { value: 'viudo', label: 'Viudo' },
      ],
      required: true,
    },
    { label: 'Dirección', type: 'text', name: 'direccion', required: true },
    {
      label: 'Teléfono (10 dígitos)',
      type: 'tel',
      name: 'telefono',
      required: true,
      pattern: '[0-9]{10}',
      title: 'El número debe contener exactamente 10 dígitos.',
    },
    { label: 'Ingeniería', type: 'text', name: 'ingenieria', required: true },
    { label: 'Modalidad', type: 'text', name: 'modalidad', required: true },
    { label: 'Semestre', type: 'number', name: 'semestre', required: true, min: 1, max: 12 },
   
    { label: 'Fecha de Registro', type: 'date', name: 'fechaRegistro', required: true },
    { label: 'Número de sesiones', type: 'number', name: 'numeroSesiones', required: true, min: 0 },
  ];

  return (
    <div className='page'>
      <h1>Expediente Psicológico</h1>
      <form onSubmit={handleSubmit}>
        <h2>Datos Generales</h2>
        {formFields.map((field) => (
          <ExpedienteForm
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            options={field.options}
            min={field.min}
            max={field.max}
            pattern={field.pattern}
            title={field.title}
          />
        ))}
        <input type="submit" value="Generar Expediente" />
      </form>
    </div>
  );
};