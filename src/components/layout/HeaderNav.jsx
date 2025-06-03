import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/ITSL_WHITE.png';

export const HeaderNav = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login', { replace: true });
    };

    return (
        <header className="header">
            <div className='barnavtext'>
                <img src={logo} alt="Logo" className='ITSL_WHITE' />
                <NavLink to="/inicio" className={({ isActive }) => (isActive ? 'active' : '')}>INICIO</NavLink>
                <NavLink to="/Info" className={({ isActive }) => (isActive ? 'active' : '')}>CONÓCENOS</NavLink>
                <NavLink to="/Info#Preguntas" className={({ isActive }) => (isActive ? 'active' : '')}>PREGUNTAS FRECUENTES</NavLink>
                <NavLink to="/Servicios" className={({ isActive }) => (isActive ? 'active' : '')}>SERVICIOS</NavLink>
                <NavLink to="/Servicios#Contacto" className={({ isActive }) => (isActive ? 'active' : '')}>CONTACTO</NavLink>
               
                {token && (
                    <NavLink to="/agenda" className={({ isActive }) => (isActive ? 'active' : '')}>AGENDA</NavLink>
                )}

                {token && role === 'admin' && (
                    <>
                        <NavLink to="/agenda#Expediente" className={({ isActive }) => (isActive ? 'active' : '')}>EXPEDIENTE</NavLink>
                        <NavLink to="/agenda#MostrarExpediente" className={({ isActive }) => (isActive ? 'active' : '')}>VER EXPEDIENTE</NavLink>
                    </>
                )}


            </div>

            <div className='boton'>
                {!token ? (
                    <>
                        <NavLink id='btn-1' to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Iniciar Sesión</NavLink>
                        <NavLink id='btn-2' to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>Crear Cuenta</NavLink>
                    </>
                ) : (
                    <button onClick={onLogout}>Cerrar sesión</button>
                )}
            </div>
        </header>
    );
};
