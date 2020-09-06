import React from 'react';

const FilterInput = ({ placeholder, handleSetFilterTerm }) => {
  return (
    <input
      className='filter-input'
      placeholder={placeholder}
      onChange={(e) => handleSetFilterTerm(e)}
    ></input>
  );
};

export default FilterInput;
