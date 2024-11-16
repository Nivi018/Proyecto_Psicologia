import React from 'react';
import '../../themes/FormEditarExpediente.css';
export const EditarExpediente = ({ expediente, onChange, onSave, onCancel }) => {
  return (
    <>
      <h3 className="expediente-card-title">Editar Expediente</h3>
      <form className="expediente-edit-form">
        <label>
          Motivo de consulta:
          <input
            type="text"
            name="motivo_consulta"
            value={expediente.motivo_consulta}
            onChange={onChange}
          />
        </label>
        <label>
          Número de sesiones:
          <input
            type="number"
            name="numero_sesiones"
            value={expediente.numero_sesiones}
            onChange={onChange}
          />
        </label>
        <label>
          Plan de orientación:
          <input
            type="text"
            name="plan_orientacion"
            value={expediente.plan_orientacion}
            onChange={onChange}
          />
        </label>
        <label>
          Seguimiento:
          <input
            type="text"
            name="seguimiento"
            value={expediente.seguimiento}
            onChange={onChange}
          />
        </label>
        <label>
          Motivo desencadenante:
          <input
            type="text"
            name="desencadenantes_motivo"
            value={expediente.desencadenantes_motivo}
            onChange={onChange}
          />
        </label>
      </form>
      <div className="expediente-card-buttons">
        <button className="btn-save" onClick={onSave}>Guardar</button>
        <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </>
  );
};