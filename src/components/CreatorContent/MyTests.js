import React, { Fragment, useState, useEffect } from 'react';
import Tests from '../common/Tests';
import FilterInput from '../common/FilterInput';
import InputSort from '../common/InputSort';
import SideBarTags from '../common/SideBarTags';
import getFilteredTests from '../../APIHandlers/getFilteredTests';
import { FCEPart2 } from 'APIHandlers/firebaseConsts';

const MyTests = ({ creatorId }) => {
  //state
  const [filterTerm, setFilterTerm] = useState('');
  const [results, setResults] = useState(null);
  const [sortType, setSortType] = useState('Date');
  const [tagSearchTerm, setTagSearchTerm] = useState('');

  const handleSetFilterTerm = (e) => {
    setFilterTerm(e.currentTarget.value);
  };

  const handleChangeSort = (e) => {
    setSortType(e.currentTarget.value);
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

  useEffect(() => {
    var isMounted = true;

    getFilteredTests(creatorId, null, FCEPart2).then((docs) => {
      var filteredDocs = JSON.parse(JSON.stringify(docs));

      //filter by topic tag
      if (tagSearchTerm) {
        filteredDocs = filteredDocs.filter((doc) =>
          doc.tags.includes(tagSearchTerm)
        );
      }
      //filter by question and user-entered term
      if (filterTerm) {
        filteredDocs = filteredDocs.filter((doc) =>
          doc.question.toUpperCase().includes(filterTerm.toUpperCase())
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
      if (isMounted) {
        setResults(filteredDocs);
      }
    });

    return () => (isMounted = false);
  }, [creatorId, filterTerm, sortType, tagSearchTerm]);

  return (
    <Fragment>
      <div className='filter-input-container'>
        <InputSort
          selectValue={sortType}
          handleChange={handleChangeSort}
          values={['Most recent', 'Question']}
        />
        <FilterInput
          placeholder={'filter by question'}
          handleSetFilterTerm={handleSetFilterTerm}
        />
      </div>
      <SideBarTags
        tags={tagSearchTerm}
        handleSetTags={handleSetTags}
      ></SideBarTags>
      <Tests
        userId={creatorId}
        filterTerm={filterTerm}
        results={results}
        setResults={setResults}
        tagSearchTerm={tagSearchTerm}
      />
    </Fragment>
  );
};

export default MyTests;
