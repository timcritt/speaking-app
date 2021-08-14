import React from 'react';

const FilterInput = ({ placeholder, handleSetFilterTerm, value }) => {
  console.log(value);
  return (
    <input
      className='filter-input'
      placeholder={placeholder}
      onChange={handleSetFilterTerm}
      value={value}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default FilterInput;
