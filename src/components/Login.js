import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {InputField} from './common/ InputField';
import {ErrorMessage} from './common/ErrorMessage';

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  // Verifica si el usuario ya está autenticado al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/agenda', { replace: true });
    }
  }, [navigate]);

  // Manejar el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const { email, password } = formData;
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });

      if (response.data?.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/expediente', {
          replace: true,
          state: {
            logged: true,
            email: response.data.user?.email,
          },
        });
      } else {
        setError(response.data?.message || 'Error en el servidor.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Error en el servidor.');
      } else {
        setError('Error de red. Verifique su conexión.');
      }
      console.error(err);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={onLogin}>
        <h1>Iniciar Sesión</h1>

        {/* Input de Email */}
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        {/* Input de Contraseña */}
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        {/* Mostrar mensaje de error */}
        <ErrorMessage message={error} />

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};