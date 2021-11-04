import React, { Fragment, useState, useEffect, cloneElement } from 'react';
import { useParams } from 'react-router-dom';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import getFilteredTests from 'APIHandlers/getFilteredTests';
import LinearProgress from '@material-ui/core/LinearProgress';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const VerticallyExpandingTestsContainer = ({
  creatorId,
  testType,
  buttonLabel,
  tagFilterTerm,
  sortBy,
  questionFilterTerm,
  children,
}) => {
  const [testContainerExpanded, setTestContainerExpanded] = useState(false);
  const [tests, setTests] = useState(null);
  const [filteredTests, setFilteredTests] = useState(null);
  const [fetching, setFetching] = useState(false);

  const toggleExpandContainer = () => {
    //only makes API call on first time container is expanded
    if (!tests) {
      const fetchTests = async () => {
        setFetching(true);
        let userTests = await getFilteredTests(creatorId, null, testType);
        //stores a copy of ALL tests to allow for all tests to be displayed after removing filters without another API call
        setTests(userTests);
        //stores the tests to be displayed
        setFilteredTests(userTests);
        setFetching(false);
        setTestContainerExpanded(true);
      };

      fetchTests();
    } else {
      setTestContainerExpanded((prevState) => !prevState);
    }
  };

  //get user id from params
  const params = useParams();

  //get tests and apply search filters
  useEffect(() => {
    var isMounted = true;

    if (params && tests) {
      const filterTests = async () => {
        if (isMounted) {
          var userTests = await JSON.parse(JSON.stringify(tests));

          //filter by topic tag
          if (tagFilterTerm) {
            userTests = await userTests.filter((doc) => doc.tags.includes(tagFilterTerm));
          }

          //sort by date created
          if (sortBy === 'oldest') {
            userTests = await userTests.sort((a, b) => {
              return a.createdAt.seconds - b.createdAt.seconds;
            });
          } else if (sortBy === 'newest') {
            userTests = await userTests.sort((a, b) => {
              return b.createdAt.seconds - a.createdAt.seconds;
            });
          }
          console.log('sorted', userTests);
          //filter by question text
          if (userTests.length > 0 && questionFilterTerm && questionFilterTerm.length > 0) {
            userTests = await userTests.filter((test) =>
              test.questionOne.toUpperCase().includes(questionFilterTerm.toUpperCase())
            );
          }
          setFilteredTests(userTests);
        }
      };
      filterTests();
    }
    return () => {
      isMounted = false;
    };
  }, [questionFilterTerm, tagFilterTerm, sortBy, params, tests]);

  return (
    <Fragment>
      <div
        className={`tests-container-header ${
          testContainerExpanded ? 'test-container-header-expanded' : ''
        } `}
      >
        <div className='tests-container-heading' onClick={(e) => toggleExpandContainer(e)}>
          <h2>{buttonLabel}</h2>
          <div className='tests-container-button'>
            {testContainerExpanded ? <RemoveRoundedIcon /> : <ArrowDropDownIcon />}
          </div>
        </div>
        <div
          className={
            'user-tests-container ' + (testContainerExpanded ? 'user-tests-container-expanded' : '')
          }
        >
          {cloneElement(children, { tests: filteredTests })}
          {filteredTests && filteredTests.length === 0 && <div>no tests</div>}
        </div>
      </div>
      {fetching && <LinearProgress />}
    </Fragment>
  );
};

export default VerticallyExpandingTestsContainer;
