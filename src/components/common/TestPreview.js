import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const TestPreview = ({ questionOne, children, testId, testType }) => {
  return (
    <div className='test-preview-link' key={testId}>
      <div className='test-preview-container fade-in'>
        <div className='test-preview-question-container dont-break-out'>
          <span className='test-preview-question-text'>{questionOne}</span>
        </div>

        {React.cloneElement(children, { testId: testId, testType: testType })}
      </div>
    </div>
  );
};

export default TestPreview;
