import React from 'react';

export const InputField = ({ label, type, name, value, onChange, required }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};