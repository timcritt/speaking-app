import React from 'react';

const TestPreview = ({ question, children }) => {
  return (
    <div className='test-preview-container fade-in'>
      <div className='test-preview-question-container dont-break-out'>
        <span>{question}</span>
      </div>
      {children}
    </div>
  );
};

export default TestPreview;
