import React from 'react';

const TestPreview = ({ questionOne, children, testId, testType }) => {
  return (
    <div className='test-preview-link' key={testId}>
      <div className='test-preview-container fade-in'>
        {React.cloneElement(children, { testId: testId, testType: testType })}
      </div>
      <div className='test-preview-question-container dont-break-out'>
        <span className='test-preview-question-text'>{questionOne}</span>
      </div>
    </div>
  );
};

export default TestPreview;
