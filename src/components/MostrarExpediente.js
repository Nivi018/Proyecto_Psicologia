import React, { useState } from 'react';
import { fetchExpedienteData } from '../helpers/DataFetchExpediente';
import { ListarExpediente } from './ListarExpediente';
import { CircleAnimation } from '../components/UI/CircleAnimation';
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ExpedientePDF } from './pdf/ExpedientePDF'

export const MostrarExpediente = ({}) => {
  const [numeroControl, setNumeroControl] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Función onEdit para manejar los cambios en los expedientes
  const handleEditExpediente = (updatedExpediente) => {
    setResultado((prevResultado) => ({
      ...prevResultado,
      expedientes: prevResultado.expedientes.map((expediente) =>
        expediente.id === updatedExpediente.id ? updatedExpediente : expediente
      ),
    }));
  };

  // Función onDelete para manejar la eliminación del expediente
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

        // Esperamos 2 segundos antes de actualizar el estado
        setTimeout(() => {
          setResultado(data);
          setLoading(false);
          setIsSearching(false);
        }, 2000); // Espera de 2 segundos
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
      <h2 className="heading">Buscar Expediente</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Número de Control"
          value={numeroControl}
          onChange={(e) => setNumeroControl(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {loading && <CircleAnimation />} {/* Mostrar la animación mientras se busca */}

      {error && <p className="error-message">{error}</p>}

      {resultado && (
        <div className="result-container">
          <h3>Resultado:</h3>
          <p><strong>Número de Control:</strong> {resultado.numeroControl}</p>
          <p><strong>Nombre:</strong> {resultado.nombre}</p>
          <p><strong>Carrera:</strong> {resultado.carrera}</p>

          <div className="expedientes-list">
            {ordenadosExpedientes && ordenadosExpedientes.map((expediente, index) => (
              <ListarExpediente
                key={index}
                expediente={expediente}
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