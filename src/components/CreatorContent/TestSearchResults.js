import React, { cloneElement } from 'react';
import TestPreview from '../common/TestPreview';

const TestSearchResults = ({ tests, testType, children }) => {
  return (
    <div className='all-tests-container'>
      {tests &&
        tests.map((test) => {
          return (
            <TestPreview
              key={test.id}
              testId={test.id}
              questionOne={test.questionOne}
              testType={testType}
            >
              {cloneElement(children, { test: test })}
            </TestPreview>
          );
        })}
    </div>
  );
};

export default TestSearchResults;
