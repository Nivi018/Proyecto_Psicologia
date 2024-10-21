import { Navigate, Outlet } from 'react-router-dom';

export const RutasPrivadas = () => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};