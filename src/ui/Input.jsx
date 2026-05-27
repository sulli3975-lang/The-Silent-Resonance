import React from 'react';

export function Input({ value, onChange, placeholder, ...props }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'var(--sans)',
      }}
      {...props}
    />
  );
}