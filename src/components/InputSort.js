import React, { Fragment } from 'react';

const InputSort = ({ selectValue, handleChange, values = [] }) => {
  return (
    <Fragment>
      <select
        className='select-order-by'
        id='sort'
        name='sort'
        value={selectValue}
        onChange={(e) => handleChange(e)}
      >
        {values.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </Fragment>
  );
};

export default InputSort;
