import React from 'react';

const ExamImageContainer = ({ image }) => {
  return (
    <div className='exam-image-container'>
      <img src={image} className='part2-image' />
    </div>
  );
};

export default ExamImageContainer;
