import React, { cloneElement, Fragment } from 'react';
import { Link } from 'react-router-dom';
import TestPreview from '../common/TestPreview';

const TestSearchResults = ({ tests, testType, children }) => {
  return (
    <div className='all-tests-container'>
      {tests && tests.length === 0 && (
        <div>
          no tests! <Link to={`/Edit${testType}/new`}>create one</Link>
        </div>
      )}
      {tests &&
        tests.map((test) => {
          return (
            <Fragment>
              <TestPreview
                key={test.id}
                testId={test.id}
                questionOne={test.questionOne}
                testType={testType}
              >
                {cloneElement(children, { test: test })}
              </TestPreview>
            </Fragment>
          );
        })}
    </div>
  );
};

export default TestSearchResults;
