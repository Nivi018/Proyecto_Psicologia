import React from 'react'
import { NavLink, useLocation, useNavigate} from 'react-router-dom'

export const HeaderNav = () => {

    const {state}= useLocation();
    const navigate = useNavigate()

    
    console.log(state);

    const onLogout = () => {
        localStorage.removeItem('token'); // Eliminar token del localStorage
        navigate('/login', { replace: true }); // Redirigir a la pantalla de login
      };


  return (
    <header className='header'>
        <div className="logo">
            <span>Ψ</span>
            <h3>Depatamento de Psicologia</h3>

        </div>

        {
            state?.logged ? (
        <div className='user'>
            
            <nav>
                <ul>
                <li>
                    <NavLink to="/agenda" className={({isActive})=> isActive ? "active": ""}>Agenda</NavLink>
                </li>
                <li>
                    <NavLink to="/expediente" className={({isActive})=> isActive ? "active": ""}>Expediente</NavLink>
                </li>        
                <button className='btn-logout' onClick={onLogout}>Cerrar sesion</button>
                    
                </ul>
            </nav>
        </div>
            ) : (
        <nav>
            <ul>
                <li>
                    <NavLink to="/inicio" className={({isActive})=> isActive ? "active": ""}>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/portafolio" className={({isActive})=> isActive ? "active": ""}>Servicios</NavLink>
                </li>
                <li>
                    <NavLink to="/curriculum" className={({isActive})=> isActive ? "active": ""}>Conocenos</NavLink>
                </li>
                <li>
                    <NavLink to="/contacto" className={({isActive})=> isActive ? "active": ""}>Contacto</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={({isActive})=> isActive ? "active": ""}>Iniciar sesion</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive})=> isActive ? "active": ""}>Registrarse</NavLink>
                </li>
                <li>
                    <NavLink to="/agenda" className={({isActive})=> isActive ? "active": ""}>Agenda</NavLink>
                </li> 
                
                
            </ul>
        </nav>
            )
        }
       
    </header>
  );
};
