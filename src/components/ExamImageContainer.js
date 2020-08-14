import React from 'react';
import EasyCrop from './EasyCrop';
import { requirePropFactory } from '@material-ui/core';

const ExamImageContainer = ({ imageSrc }) => {
  return (
    <div className='exam-image-container'>
      <img src={imageSrc} className='part2-image' />
    </div>
  );
};

export default ExamImageContainer;
