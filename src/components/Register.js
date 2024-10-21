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
    edad: '',
    carrera: '',
    semestre: '',
    email: '',
    password: '',
    rol: 'user', 
  });

  const { 
    no_control,
    nombre,
    apellido,
    edad,
    carrera,
    semestre,
    email,
    password,
    rol
  } = formValues;

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      console.log(formValues)
      const response = await axios.post('http://localhost:3000/api/users/create', formValues); // Send all formValues

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
            name="nombre"  
            id="nombre" 
            value={nombre} 
            onChange={onInputChange}
            required 
            autoComplete="off"
          />
          <label htmlFor='nombre'>Nombre:</label>
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

        {/* Campo adicional para el rol */}
        <div className="input-group">
          <select 
            name="rol" 
            id="rol" 
            value={rol} 
            onChange={onInputChange} 
            required
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <label htmlFor='rol'>Rol:</label>
        </div>

        <button>Registrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};