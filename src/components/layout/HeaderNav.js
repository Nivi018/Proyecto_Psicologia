import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/LogoTec.png';

export const HeaderNav = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Obtener el rol del localStorage
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // Limpiar el rol al cerrar sesión
        navigate('/login', { replace: true });
    };

    return (
        <header className="header">
            <div className="logo" aria-label="Logo del Departamento de Psicología">
            <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }}/>
                {/*<span aria-hidden="true">Ψ</span>*/}
                <h3>Departamento de Psicología</h3>
            </div>

            {token ? (
                <div className="user">
                    <nav>
                        <ul>
                            {/* Rutas comunes para todos los usuarios logueados */}
                            {role === 'admin' && (
                                <>






                                    {/*qui puedes colocar los NacLink para las rutas de los demas modulos de administrador */}
                                </>
                            )}


                            <li>
                                <NavLink
                                    to="/inicio"
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/portafolio"
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Servicios
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/curriculum"
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Conócenos
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/expediente"
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Expediente
                                </NavLink>
                            </li>


                            <li>
                                <NavLink
                                    to="/agenda"
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Agenda
                                </NavLink>
                            </li>

                            <button className="btn-logout" onClick={onLogout}>
                                Cerrar sesión
                            </button>

                            {/*aqui colocas las rutas de navLink de las rutas para usuario */}
                        </ul>
                    </nav>

                </div>
            ) : (
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/inicio"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/portafolio"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Servicios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/curriculum"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Conócenos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contacto"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Contacto
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Iniciar sesión
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/register"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Registrarse
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};