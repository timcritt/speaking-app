import React from 'react';
import placeholder from 'img/placeholder-landscape.jpg';

const ExamPicture = ({ image, children }) => {
  return (
    <div className='exam-image-container upload-image-container fade-in'>
      <img src={image ? image : placeholder} className='part2-image' />
      {children}
    </div>
  );
};

export default ExamPicture;
