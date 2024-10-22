import { Navigate, Outlet } from 'react-router-dom';

// Componente para las rutas privadas
export const RutasPrivadas = () => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token');
  
  // Si no está autenticado, redirigir a la página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};