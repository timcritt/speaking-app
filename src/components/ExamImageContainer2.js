import React from 'react';
import placeholder from '../img/placeholder-landscape.jpg';
import SimpleModal from './SimpleModal';

const ExamImageContainer2 = ({ image }) => {
  return (
    <div className='exam-image-container upload-image-container'>
      <img src={image ? image : placeholder} className='part2-image' />
    </div>
  );
};

export default ExamImageContainer2;
