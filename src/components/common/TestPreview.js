import React from 'react';
import { Link } from 'react-router-dom';

const TestPreview = ({ test }) => {
  return (
    <Link
      className='test-preview-link fade-in'
      to={`/FCEPart2/${test.id}`}
      key={test.id}
    >
      <div className='test-preview-container'>
        <div className='test-preview-question-container dont-break-out'>
          <span>{test.question}</span>
        </div>
        <div className='img-wrap' key={test.id}>
          <img className='thumbnail' src={test.imageOneUrl}></img>
          <img className='thumbnail' src={test.imageTwoUrl}></img>
        </div>
      </div>
    </Link>
  );
};

export default TestPreview;
