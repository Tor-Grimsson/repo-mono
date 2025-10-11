import React from 'react';

const Chip = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      className={`chip${active ? ' active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Chip;
