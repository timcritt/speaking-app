import React, { Fragment } from 'react';

const ImageDeleteBtn = ({ setImageUrl, setImageRef }) => {
  const handleClick = () => {
    setImageUrl(null);
    setImageRef(null);
  };

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
