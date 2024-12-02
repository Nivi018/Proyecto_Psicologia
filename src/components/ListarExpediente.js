import React, { useState } from 'react';
import { updateExpediente } from '../helpers/UpdateExpediente'; 
import { deleteExpediente } from '../helpers/DeleteExpediente'; 
import '../themes/CardExpediente.css';
import { EditarExpediente } from './common/EditarExpediente';
import {PDFDownloadLink} from '@react-pdf/renderer'
import {ExpedientePDF} from './pdf/ExpedientePDF'

export const ListarExpediente = ({ expediente, onEdit, onDelete}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpediente, setEditedExpediente] = useState(expediente);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExpediente({ ...editedExpediente, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updatedExpediente = await updateExpediente(expediente.id, editedExpediente);
      onEdit(updatedExpediente); 
      setIsEditing(false); 
    } catch (error) {
      console.error('Error al guardar los cambios del expediente:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExpediente(expediente.id); 
      onDelete(expediente.id);
    } catch (error) {
      console.error('Error al eliminar el expediente:', error);
    }
  };

  return (
    <div className="expediente-card">
      {isEditing ? (
        <EditarExpediente
          expediente={editedExpediente}
          onChange={handleInputChange}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h3 className="expediente-card-title">Expediente</h3>
          <p><strong>Motivo de consulta:</strong> {expediente.motivo_consulta}</p>
          <p><strong>Número de sesiones:</strong> {expediente.numero_sesiones}</p>
          <p><strong>Plan de orientación:</strong> {expediente.plan_orientacion}</p>
          <p><strong>Seguimiento:</strong> {expediente.seguimiento}</p>
          <p><strong>Motivo desencadenante:</strong> {expediente.desencadenantes_motivo}</p>

          <div className="expediente-card-buttons">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="btn-delete" onClick={handleDelete}>Eliminar</button> 
           
            <PDFDownloadLink
              document={<ExpedientePDF expediente={expediente} />}
              fileName={`Expediente_${expediente.id}.pdf`}
              className="btn-download-pdf"
            >
              {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
            </PDFDownloadLink>

          </div>
        </>
      )}
    </div>
  );
};