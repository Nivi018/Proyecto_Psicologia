import React from 'react';
import { Link } from 'react-router-dom';
import { ListadoTrabajos } from './ListadoTrabajos';

export const Portafolio = () => {
  return (
    <div className='page'>
      <h1 className='heading'>Servicios</h1>

      <ListadoTrabajos/>

      
    </div>
  )
}
