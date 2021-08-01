import React, { Fragment, useState, useEffect } from 'react';
import Tests from '../common/Tests';
import InputSort from '../common/InputSort';
import SideBarTags from '../common/SideBarTags';
import getFilteredTests from '../../APIHandlers/getFilteredTests';
import { FCEPart2 } from 'APIHandlers/firebaseConsts';
import { FCEPart3 } from 'APIHandlers/firebaseConsts';
import LinearProgress from '@material-ui/core/LinearProgress';

const AllTests = ({ creatorId }) => {
  //state
  const [filterTerm, setFilterTerm] = useState(null);
  const [results, setResults] = useState(null);
  const [sortType, setSortType] = useState('Date');
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [testType, setTestType] = useState(FCEPart2);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [exam, setExam] = useState('FCE');

  const handleChangeSort = (e) => {
    setSortType(e.currentTarget.value);
  };

  useEffect(() => {
    if (searchButtonClicked) {
      handleSearchClick();
    }
  }, [testType, filterTerm, sortType]);

  const handleChangeTestType = (e) => {
    setTestType(e.currentTarget.value);
  };

  const handleChangeExam = (e) => {
    setExam(e.currentTarget.value);
  };

  function handleSetTags(tag, selected) {
    if (!selected) {
      //adds tag to the state
      setTagSearchTerm(tag);
    } else {
      //removes the tag from the state
      setTagSearchTerm('');
    }
  }

  const handleSearchClick = async () => {
    setHasFetched(false);
    setSearchButtonClicked(true);

    await getFilteredTests(creatorId, filterTerm, testType).then((data) => {
      var filteredDocs = JSON.parse(JSON.stringify(data));

      //filter by topic tag
      if (tagSearchTerm) {
        filteredDocs = filteredDocs.filter((doc) =>
          doc.tags.includes(tagSearchTerm)
        );
      }

      //sort alphabetically by question
      if (sortType === 'Question') {
        filteredDocs = filteredDocs.sort((a, b) => {
          var titleA = a.question.toUpperCase();
          var titleB = b.question.toUpperCase();

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
      }
      setResults(filteredDocs);
      setHasFetched(true);
    });
  };

  return (
    <Fragment>
      <div className='filter-input-container'>
        <InputSort
          selectValue={sortType}
          handleChange={handleChangeSort}
          values={['Most recent', 'Question']}
        />
        <InputSort
          selectValue={exam}
          handleChange={handleChangeExam}
          values={['FCE', 'CAE']}
        />
        <InputSort
          selectVale={testType}
          handleChange={handleChangeTestType}
          values={[FCEPart2, FCEPart3, 'CAEPart2']}
        />

        <button onClick={() => handleSearchClick()}>Search</button>
      </div>
      <SideBarTags tags={tagSearchTerm} handleSetTags={handleSetTags} />
      {!hasFetched && searchButtonClicked && <LinearProgress />}
      {hasFetched && (
        <Tests
          testType={testType}
          userId={creatorId}
          filterTerm={filterTerm}
          results={results}
          setResults={setResults}
          tagSearchTerm={tagSearchTerm}
        />
      )}
    </Fragment>
  );
};

export default AllTests;
