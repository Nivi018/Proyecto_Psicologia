import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputField } from './common/ InputField';
import { ErrorMessage } from './common/ErrorMessage';
import { jwtDecode } from 'jwt-decode';
import inicio from '../assets/inicio.png';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState('user'); // Nuevo estado para el tipo de usuario

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

  // Manejar el cambio en el tipo de usuario
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { email, password } = formData;
      const url = userType === 'admin'
        ? 'http://localhost:3000/api/admin/loginAdmin'
        : 'http://localhost:3000/api/users/login';

      const response = await axios.post(url, { email, password });
      console.log('Respuesta de la API:', response.data); // Mostrar respuesta completa

      if (response.data?.success) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        // Decodificar el token para obtener el rol del usuario
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken?.rol; // Asegúrate de que `rol` esté en el token
        const userEmail = decodedToken?.email; // Asegúrate de que `email` esté en el token

        if (userRole) {
          localStorage.setItem('role', userRole);
          console.log('Rol del usuario:', userRole); // Ahora debería mostrar el rol correctamente
        } else {
          console.warn('Rol no encontrado en el token');
        }

        navigate('/agenda', {
          replace: true,
          state: {
            logged: true,
            email: userEmail || 'No disponible',
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
    <div className="formsign">
      <div className='imagesign'>
        <div>
          <img src={inicio} alt="" />
        </div>

      </div>
      <form className='signform signform2' onSubmit={onLogin}>
        <hr />
        <h1>Iniciar Sesión</h1>

        {/* Selección del tipo de usuario */}
        <div className='signformsel'>
          <label>
            <input
              type="radio"
              value="user"
              checked={userType === 'user'}
              onChange={handleUserTypeChange}
            />
            Usuario
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={userType === 'admin'}
              onChange={handleUserTypeChange}
            />
            Administrador
          </label>
        </div>

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
        <div className='gridbutton'>
        <button className="full-width" type="submit">Iniciar Sesión</button>
        </div>
        <hr />
      </form>
    </div>
  );
};