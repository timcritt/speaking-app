import React from 'react';

const ExamImageContainer = ({ imageSrc }) => {
  return (
    <div className='exam-image-container'>
      <img src={imageSrc} className='part2-image' />
    </div>
  );
};

export default ExamImageContainer;
