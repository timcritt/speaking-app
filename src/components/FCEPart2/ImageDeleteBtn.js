import React, { Fragment } from 'react';

const ImageDeleteBtn = ({ handleClick }) => {
  return (
    <Fragment>
      <button
        className='image-centre-btn delete-btn'
        onClick={() => handleClick()}
      >
        Delete
      </button>
    </Fragment>
  );
};

export default ImageDeleteBtn;
