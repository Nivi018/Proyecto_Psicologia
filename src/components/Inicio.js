import React from 'react'
import { Link } from 'react-router-dom'
import { ListadoTrabajos } from './ListadoTrabajos'

export const Inicio = () => {
  return (
    
    <div className='home'>

      <h1>Hola, somos el <strong> Departamento de Psicologia</strong> del Tecnologico de Libres
        y ofrecemos los servicios de <strong>psicologia </strong> y canalizacion a los estudintes.
      </h1>

      <h2 className='title'>
        Te ayudamos con alguna situacion o problema que quieras tratar. <Link to="/contacto"> Contactanos</Link>
      </h2>
      

      <section className="last-works">
        <h2 className="heading">Algunos Servicios</h2>
        <p>Estos son algunas de los servicios que puedes realizar en la pagina.</p>


        <ListadoTrabajos limite="2"/>
      </section>
    </div>
  )
}
