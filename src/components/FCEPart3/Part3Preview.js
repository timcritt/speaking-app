import React from 'react';
import { Link } from 'react-router-dom';

const Part3Preview = ({ test }) => {
  return (
    <Link
      className='test-preview-link fade-in'
      to={`/FCEPart3/${test.id}`}
      key={test.id}
    >
      <div className='part3-test-preview-container'>
        <div className='part3-test-preview-question-container dont-break-out'>
          <span>{test.question}</span>
        </div>
        <div className='part3-test-preview-options-container' key={test.id}>
          <div>
            <span>{test.topLeft}</span>
          </div>
          <div>
            <span>{test.topRight}</span>
          </div>
          <div>
            <span>{test.bottomLeft}</span>
          </div>
          <div>
            <span>{test.bottomRight}</span>
          </div>
          <span>{test.bottomCentre}</span>
        </div>
      </div>
    </Link>
  );
};

export default Part3Preview;
