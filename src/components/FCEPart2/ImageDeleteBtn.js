import React, { Fragment } from 'react';

const ImageDeleteBtn = ({ setImageUrl, setImageRef }) => {
  const handleDelete = () => {
    setImageUrl(null);
    setImageRef(null);
  };

  return (
    <Fragment>
      <button className='image-centre-btn delete-btn' onClick={() => handleDelete()}>
        Delete
      </button>
    </Fragment>
  );
};

export default ImageDeleteBtn;
