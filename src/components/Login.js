import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);// To store any errors


  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Store token for future requests
        navigate('/agenda', {
          replace: true,
          state: {
            logged: true,
            // Assuming you have user data in the response
            // Adjust this according to your actual response structure
            email: response.data.user?.email,
          },
        });
      } else {
        setError(response.data.message); // Set error message from backend
      }
    } catch (error) {
      console.error(error);
      setError('Error al iniciar sesión');
    }
  };


  return (
    <div className='wrapper'>
      <form onSubmit={onLogin}>
        <h1>Iniciar Sesion</h1>

        <div className="input-group">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />
          <label htmlFor='password'>Contraseña:</label>
        </div>

        {error && <p className="error">{error}</p>} {/* Display error message if any */}
        <button>Iniciar Sesion</button>
      </form>
    </div>
  );
};