import React from 'react';

export function Button({ children, onClick, disabled, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: 'var(--accent)',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: '5px',
        fontFamily: 'var(--sans)',
      }}
      {...props}
    >
      {children}
    </button>
  );
}