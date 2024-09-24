import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    setError(null); // Limpiar errores previos

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
      // Verificar si hay errores del cliente o del servidor
      if (err.response) {
        // Errores del servidor
        setError(err.response.data?.message || 'Error en el servidor.');
      } else {
        // Errores de red o cliente
        setError('Error de red. Verifique su conexión.');
      }
      console.error(err);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={onLogin}>
        <h1>Iniciar Sesión</h1>

        <div className="input-group">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="off"
            aria-label="Email"
          />
          <label htmlFor="email">Email:</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="off"
            aria-label="Contraseña"
          />
          <label htmlFor="password">Contraseña:</label>
        </div>

        {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error */}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};
