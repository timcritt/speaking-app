import React from 'react';
import placeholder from '../img/placeholder-landscape.jpg';
import SimpleModal from './SimpleModal';

const ExamImageContainer = ({ image, handleSetImage }) => {
  return (
    <div className='exam-image-container upload-image-container'>
      <img src={image ? image : placeholder} className='part2-image' />
      {image && (
        <button
          className='image-centre-btn delete-btn'
          onClick={() => handleSetImage()}
        >
          Delete
        </button>
      )}
      {!image && <SimpleModal modalButtonText={'upload'} />}
    </div>
  );
};

export default ExamImageContainer;
