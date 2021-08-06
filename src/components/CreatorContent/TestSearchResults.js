import React, { useEffect, useState, cloneElement } from 'react';
import { useParams } from 'react-router-dom';
import TestPreview from '../common/TestPreview';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import getFilteredTests from 'APIHandlers/getFilteredTests';

const TestSearchResults = ({ creatorId, testType, children }) => {
  const [tests, setTests] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  //get folder id from params
  const params = useParams();

  useEffect(() => {
    var isMounted = true;
    if (params) {
      const fetchTests = async () => {
        const userTests = await getFilteredTests(creatorId, null, testType);
        if (isMounted) {
          setTests(userTests);
          setHasFetched(true);
        }
      };
      fetchTests();
    }
    return () => {
      isMounted = false;
    };
  }, [params]);
  if (hasFetched) {
    return (
      <div className='all-tests-container'>
        {tests &&
          tests.map((test) => {
            return (
              <Link
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
              </Link>
            );
          })}
      </div>
    );
  } else {
    return (
      <div className={'full-width'}>
        <LinearProgress />
      </div>
    );
  }
};

export default TestSearchResults;
