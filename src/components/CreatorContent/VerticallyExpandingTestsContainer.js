import React, { Fragment, useState, useEffect, cloneElement } from 'react';
import { useParams } from 'react-router-dom';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
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
  children,
}) => {
  const [testContainerExpanded, setTestContainerExpanded] = useState(false);
  const [tests, setTests] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const toggleExpandContainer = () => {
    setTestContainerExpanded((prevState) => !prevState);
  };

  //get user id from params
  const params = useParams();

  //get tests and apply search filters
  useEffect(() => {
    var isMounted = true;
    if (params) {
      const fetchTests = async () => {
        let userTests = await getFilteredTests(creatorId, null, testType);
        if (isMounted) {
          var filteredTests = await JSON.parse(JSON.stringify(userTests));

          //filter by topic tag
          if (tagFilterTerm) {
            userTests = filteredTests.filter((doc) =>
              doc.tags.includes(tagFilterTerm)
            );
          }

          if (sortBy === 'Oldest') {
            userTests = userTests.sort((a, b) => {
              if (a.created >= b.created) {
                return 1;
              } else {
                return -1;
              }
            });
          } else if (sortBy === 'Most recent') {
            userTests = userTests.sort((a, b) => {
              if (a.created > b.created) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          setTests(userTests);
          setHasFetched(true);
        }
      };
      fetchTests();
    }
    return () => {
      isMounted = false;
    };
  }, [params, tagFilterTerm, creatorId, testType, sortBy]);

  if (hasFetched) {
    return (
      tests.length > 0 && (
        <Fragment>
          <div
            className='tests-container-header'
            onClick={(e) => toggleExpandContainer(e)}
          >
            <div className='tests-container-heading'>
              <h2>
                {buttonLabel}{' '}
                <span className='number-of-tests'>{`(${tests.length})`}</span>
              </h2>
            </div>

            <div className='tests-container-button'>
              {testContainerExpanded ? (
                <RemoveRoundedIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </div>
          </div>
          <div className='user-tests-container-outer'>
            <div
              className={
                'user-tests-container ' +
                (testContainerExpanded ? 'user-tests-container-expanded' : '')
              }
            >
              {cloneElement(children, { tests: tests })}
            </div>
          </div>
        </Fragment>
      )
    );
  } else {
    return (
      <div className={'full-width'}>
        <LinearProgress />
      </div>
    );
  }
};

export default VerticallyExpandingTestsContainer;
