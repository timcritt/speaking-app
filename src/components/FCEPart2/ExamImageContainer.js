import React from 'react';
import placeholder from '../img/placeholder-landscape.jpg';
import SimpleModal from '../common/SimpleModal';
import placeHolder from 'img/placeholder-landscape.jpg';

const ExamImageContainer = ({ image, handleSetImage }) => {
  return (
    <div className='exam-image-container upload-image-container fade-in'>
      <img src={image ? image : placeholder} className='part2-image' alt='' />
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
