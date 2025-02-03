import React from 'react'
import { Link } from 'react-router-dom'
import { ListadoTrabajos } from './ListadoTrabajos'

export const Inicio = () => {
  return (
    
    <div className='home'>

      <h1>Hola, somos el <strong> Departamento de Psicología</strong> del Tecnológico de Libres
        y ofrecemos los servicios de <strong>psicología </strong> y canalización a los estudiantes.
      </h1>

      <h2 className='title'>
        Te ayudamos con alguna situación o problema que quieras tratar. <Link to="/contacto"> Contactanos</Link>
      </h2>
      

      <section className="last-works">
        <h2 className="heading">Algunos Servicios</h2>
        <p>Estos son algunas de los servicios que puedes realizar en la página.</p>


        <ListadoTrabajos limite="2"/>
      </section>
    </div>
  )
}
