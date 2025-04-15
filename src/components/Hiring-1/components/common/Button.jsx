import React from 'react';
import '../styles/components.css';

const Button = ({ children, onClick, type = 'primary', disabled = false, className = '' }) => {
  return (
    <button
      className={`btn btn-${type} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;