import React, { useState } from 'react';

export const Expediente = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    sexo: '',
    edad: '',
    estadoCivil: '',
    direccion: '',
    telefono: '',
    ingenieria: '',
    modalidad: '',
    semestre: '',
    numeroControl: '',
    fechaRegistro: '',
    numeroSesiones: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expediente:', formData);
    // Aquí podrías enviar los datos a un backend o procesarlos como necesites
  };

  return (
    <div className='page'>
      <h1>Expediente Psicológico</h1>
      <form onSubmit={handleSubmit}>
        <h2>Datos Generales</h2>

        <input
          type="text"
          placeholder="Nombre y apellidos"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        /> <br/>

        Sexo:
        <select
          
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select><br/>
        <input
          type="number"
          placeholder="Edad"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          required
          min="0"
          max="100"
        /><br/>
        Estado Civil:
        <select
          name="estadoCivil"
          value={formData.estadoCivil}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="soltero">Soltero</option>
          <option value="casado">Casado</option>
          <option value="divorciado">Divorciado</option>
          <option value="viudo">Viudo</option>
        </select>
        <input
          type="text"
          placeholder="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
        />
        <input
          type="text"
          placeholder="Ingeniería"
          name="ingenieria"
          value={formData.ingenieria}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Modalidad"
          name="modalidad"
          value={formData.modalidad}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Semestre"
          name="semestre"
          value={formData.semestre}
          onChange={handleChange}
          required
          min="1"
          max="12"
        />
        <input
          type="text"
          placeholder="Número de control"
          name="numeroControl"
          value={formData.numeroControl}
          onChange={handleChange}
          required
        /><br/>
        fecha de Registro:
        <input
          type="date"
          name="fechaRegistro"
          value={formData.fechaRegistro}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="number"
          placeholder="Número de sesiones"
          name="numeroSesiones"
          value={formData.numeroSesiones}
          onChange={handleChange}
          required
          min="0"
        /><br/>
        <input type="submit" value="Generar Expediente" />
      </form>
    </div>
  );
};

