import React, { useState } from 'react';
import { fetchExpedienteData } from '../helpers/DataFetchExpediente';
import { ListarExpediente } from './ListarExpediente';
import { CircleAnimation } from './UI/CircleAnimation';

export const MostrarExpediente = ({ }) => {
  const [numeroControl, setNumeroControl] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleEditExpediente = (updatedExpediente) => {
    setResultado((prevResultado) => ({
      ...prevResultado,
      expedientes: prevResultado.expedientes.map((expediente) =>
        expediente.id === updatedExpediente.id ? updatedExpediente : expediente
      ),
    }));
  };

  const handleDeleteExpediente = (id) => {
    setResultado((prevResultado) => ({
      ...prevResultado,
      expedientes: prevResultado.expedientes.filter((expediente) => expediente.id !== id),
    }));
  };

  const handleSearch = async () => {
    if (numeroControl) {
      setLoading(true);
      setIsSearching(true);
      setError('');

      try {
        const data = await fetchExpedienteData(numeroControl);

        setTimeout(() => {
          setResultado(data);
          setLoading(false);
          setIsSearching(false);
        }, 2000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setIsSearching(false);
      }
    } else {
      setError('Por favor ingrese un número de control');
    }
  };

  const ordenadosExpedientes = resultado?.expedientes?.sort((a, b) => a.numero_sesiones - b.numero_sesiones);

  return (
    <div className="layout-expediente">
      <div className="search-container formhablemos formhablemos2 ">
        <input
          type="text"
          placeholder="Número de Control"
          value={numeroControl}
          onChange={(e) => setNumeroControl(e.target.value)}
        />
        <button onClick={handleSearch}  disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {loading && <CircleAnimation />}
      {error && <p className="error-message">{error}</p>}

      {resultado && (
        <div className='result-search'>
          <div className="result-container">
            <h3>Resultado:</h3>
            <p><strong>Número de Control:</strong> {resultado.numeroControl}</p>
            <p><strong>Nombre:</strong> {resultado.nombre}</p>
            <p><strong>Carrera:</strong> {resultado.carrera}</p>
          </div>
          <div className="expedientes-list">
            {ordenadosExpedientes && ordenadosExpedientes.map((expediente, index) => (
              <ListarExpediente
                key={index}
                expediente={expediente}
                paciente={resultado}
                onEdit={handleEditExpediente}
                onDelete={handleDeleteExpediente}
              />
            ))}
          </div>

        </div>
      )}
    </div>
  );
};