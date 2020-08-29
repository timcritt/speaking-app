import React from 'react';
import placeholder from '../img/placeholder-landscape.jpg';

const ExamImageContainer2 = ({ image }) => {
  return (
    <div className='exam-image-container upload-image-container fade-in'>
      <img src={image ? image : placeholder} className='part2-image' />
    </div>
  );
};

export default ExamImageContainer2;
