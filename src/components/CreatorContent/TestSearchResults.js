import React, { cloneElement } from 'react';
import TestPreview from '../common/TestPreview';
import { Link } from 'react-router-dom';

const TestSearchResults = ({ tests, testType, children }) => {
  return (
    <div className='all-tests-container'>
      {tests &&
        tests.map((test) => {
          return (
            <div
              className='test-preview-link'
              to={`/${testType}/${test.id}`}
              key={`testType` + test.id}
            >
              <TestPreview
                key={test.id}
                testId={test.id}
                question={test.question ? test.question : test.questionOne}
              >
                {cloneElement(children, { test: test })}
              </TestPreview>
            </div>
          );
        })}
    </div>
  );
};

export default TestSearchResults;
