    import React from 'react';

    export const ExpedienteForm = ({ label, type, name, value, onChange, required, options, ...rest }) => {
    return (
        <div>
        <label>
            {label}:
            {type === 'select' ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                {...rest}
            >
                {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
            ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                {...rest}
            />
            )}
        </label>
        <br />
        </div>
    );
    };


