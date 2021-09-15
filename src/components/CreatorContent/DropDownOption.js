import React from 'react';

const DropDownOption = ({ label, handleClickOption }) => {
  return (
    <div className='dropdown-option' onClick={(e) => handleClickOption(e, label)}>
      {label}
    </div>
  );
};

export default DropDownOption;
