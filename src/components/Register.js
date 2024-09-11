import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/useForm'; // Assuming useForm hook handles form state
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { formValues, onInputChange, resetForm } = useForm({
    no_control: '',
    name: '',
    apellido: '',
    edad: '',
    carrera: '',
    semestre: '',
    email: '',
    password: '',
  });

  const {
    no_control,
    name,
    apellido,
    edad,
    carrera,
    semestre,
    email,
    password
  } = formValues;

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/create', formValues); // Send all formValues

      if (response.data.success) { // Assuming backend response indicates success
        navigate('/agenda', {
          replace: true,
          state: {
            logged: true,
            name: formValues.name, // Use appropriate key from formValues
          },
        });
        resetForm(); // Clear form data after successful registration
      } else {
        setError(response.data.error || 'Error al registrar el usuario. Por favor, intenta de nuevo más tarde.'); // Handle specific error message from backend if available
      }
    } catch (error) {
      setError('Error al registrar el usuario. Por favor, intenta de nuevo más tarde.');
    }
    console.log(formValues);
  };

  return (
    <div className='wrapper'>
      <form onSubmit={onRegister}>
        <h1>Regístrate</h1>
        <div className="input-group">
          <input 
            type="text" 
            name="no_control" 
            id="no_control" 
            value={no_control} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='no_control'>No. Control:</label>
        </div>

        <div className="input-group">
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={name} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='name'>Nombre:</label>
        </div>

        <div className="input-group">
          <input 
            type="text" 
            name="apellido" 
            id="apellido" 
            value={apellido} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='apellido'>Apellido:</label>
        </div>

        <div className="input-group">
          <input 
            type="text" 
            name="edad" 
            id="edad" 
            value={edad} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='edad'>Edad:</label>
        </div>

        <div className="input-group">
          <input 
            type="text" 
            name="carrera" 
            id="carrera" 
            value={carrera} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='carrera'>Carrera:</label>
        </div>

        <div className="input-group">
          <input 
            type="text" 
            name="semestre" 
            id="semestre" 
            value={semestre} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='semestre'>Semestre:</label>
        </div>

        <div className="input-group">
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='email'>Email:</label>
        </div>

        <div className="input-group">
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={password} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='password'>Contraseña:</label>
        </div>
        <button>Registrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};
