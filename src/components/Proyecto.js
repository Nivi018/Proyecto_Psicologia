import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trabajos } from '../data/trabajos';

export const Proyecto = () => {
    const [proyecto, setProyecto] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let proyecto = trabajos.filter(trabajo => trabajo.id === params.id);
        setProyecto(proyecto[0]);
    }, [params.id]);

    const handleNavigate = () => {
        navigate('/login');
    };

    return (
        <div className='page page-work'>
            <h1 className='heading'>{proyecto.nombre}</h1>
            <div className='mask'>
                <img src={"/images/"+ proyecto.id+".jpg"} alt={proyecto.nombre} />
            </div>
            <p>{proyecto.tecnologias}</p>
            <hr />
            <p>{proyecto.descripcion}</p>
            {/* Aquí se corrige la forma en que se pasa la función al onClick */}
            <button className='btn-logout' onClick={handleNavigate}>Hazlo</button>
        </div>
    );
};
