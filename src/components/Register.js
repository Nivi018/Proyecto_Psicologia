import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/useForm'; 
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { formValues, onInputChange, resetForm } = useForm({
    no_control: '',
    nombre: '',
    apellido: '',
    sexo: '',
    edad: '',
    estado_civil: '',
    direccion: '',
    telefono: '',
    ingenieria: '',
    modalidad: '',
    semestre: '',
    fecha_registro: '',
    email: '',
    password: '',
    rol: 'usuario', 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/create', formValues);
      if (response.data.success) {
        navigate('/agenda', {
          replace: true,
          state: {
            logged: true,
            name: formValues.nombre,
          },
        });
        resetForm();
      } else {
        setError(response.data.error || 'Error al registrar el usuario. Por favor, intenta de nuevo más tarde.');
      }
    } catch (error) {
      setError('Error al registrar el usuario. Por favor, intenta de nuevo más tarde.');
    }
  };

  const formFields = [
    { label: 'No. Control', type: 'text', name: 'no_control', required: true },
    { label: 'Nombre', type: 'text', name: 'nombre', required: true },
    { label: 'Apellido', type: 'text', name: 'apellido', required: true },
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
    { label: 'Edad', type: 'number', name: 'edad', required: true, min: 0 },
    {
      label: 'Estado Civil',
      type: 'select',
      name: 'estado_civil',
      options: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'soltero', label: 'Soltero' },
        { value: 'casado', label: 'Casado' },
      ],
      required: true,
    },
    { label: 'Dirección', type: 'text', name: 'direccion', required: true },
    {
      label: 'Teléfono',
      type: 'tel',
      name: 'telefono',
      required: true,
      pattern: '[0-9]{10}',
      title: 'El número debe contener exactamente 10 dígitos.',
    },
    {
      label: 'Ingeniería',
      type: 'select',
      name: 'ingenieria',
      options: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'isc', label: 'ISC' },
        { value: 'iem', label: 'IEM' },
        { value: 'id', label: ' ID' },
        { value: 'iia', label: 'IIA' },
        { value: 'isa', label: 'ISA' },
        { value: 'iias', label: 'IIAS' },
        { value: 'ige', label: 'IGE' },
      ],
      required: true,
    },
    {
      label: 'Modalidad',
      type: 'select',
      name: 'modalidad',
      options: [
        { value: '', label: 'Selecciona una opción' },
        { value: 'escolarizado', label: 'Escolarizado' },
        { value: 'sabatino', label: 'Sabatino' },
      ],
      required: true,
    },
    { label: 'Semestre', type: 'number', name: 'semestre', required: true, min: 1, max: 12 },
    { label: 'Fecha de Registro', type: 'date', name: 'fecha_registro', required: true },
    { label: 'Email', type: 'email', name: 'email', required: true },
    { label: 'Contraseña', type: 'password', name: 'password', required: true },
  ];

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Regístrate</h1>
        {formFields.map((field) => (
          <div className="input-group" key={field.name}>
            {field.type !== 'select' ? (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={formValues[field.name]}
                onChange={onInputChange}
                required={field.required}
                min={field.min}
                max={field.max}
                pattern={field.pattern}
                title={field.title}
                autoComplete="off"
              />
            ) : (
              <select
                name={field.name}
                id={field.name}
                value={formValues[field.name]}
                onChange={onInputChange}
                required={field.required}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            <label htmlFor={field.name}>{field.label}:</label>
          </div>
        ))}
        <button type="submit">Registrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};
