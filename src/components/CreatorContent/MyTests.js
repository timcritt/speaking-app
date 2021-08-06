import React, { Fragment, useState, useEffect } from 'react';
import FilterInput from '../common/FilterInput';
import InputSort from '../common/InputSort';
import SideBarTags from '../common/SideBarTags';
import { FCEPart2, CAEPart2 } from 'APIHandlers/firebaseConsts';
import TestSearchResults from 'components/CreatorContent/TestSearchResults';
import FCEPart2TestPreviewContent from 'components/common/FCEPart2TestPreviewContent';
import FCEPart3TestPreviewContent from 'components/FCEPart3/FCEPart3TestPreviewContent';
import CAEPart2TestPreviewContent from 'components/CAEPart2/CAEPart2TestPreviewContent';
import VerticallyExpandingTestsContainer from './VerticallyExpandingTestsContainer';

const MyTests = ({ creatorId }) => {
  //state
  const [filterTerm, setFilterTerm] = useState('');
  const [results, setResults] = useState(null);
  const [sortType, setSortType] = useState('Date');
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [testContainerExpanded, setTestContainerExpanded] = useState(false);
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

  // useEffect(() => {
  //   var isMounted = true;

  //   getFilteredTests(creatorId, null, FCEPart2).then((docs) => {
  //     var filteredDocs = JSON.parse(JSON.stringify(docs));

  //     //filter by topic tag
  //     if (tagSearchTerm) {
  //       filteredDocs = filteredDocs.filter((doc) =>
  //         doc.tags.includes(tagSearchTerm)
  //       );
  //     }
  //     //filter by question and user-entered term
  //     if (filterTerm) {
  //       filteredDocs = filteredDocs.filter((doc) =>
  //         doc.question.toUpperCase().includes(filterTerm.toUpperCase())
  //       );
  //     }
  //     //sort alphabetically by question
  //     if (sortType === 'Question') {
  //       filteredDocs = filteredDocs.sort((a, b) => {
  //         var titleA = a.question.toUpperCase();
  //         var titleB = b.question.toUpperCase();

  //         if (titleA < titleB) {
  //           return -1;
  //         }
  //         if (titleA > titleB) {
  //           return 1;
  //         }
  //         return 0;
  //       });
  //     }
  //     if (isMounted) {
  //       setResults(filteredDocs);
  //     }
  //   });

  //   return () => (isMounted = false);
  // }, [creatorId, filterTerm, sortType, tagSearchTerm]);

  const toggleExpandContainer = () => {
    setTestContainerExpanded((prevState) => !prevState);
  };

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
      <h1>FCE</h1>

      <h2>PART 2</h2>
      <hr />
      <VerticallyExpandingTestsContainer buttonLabel={'part 2'}>
        <TestSearchResults testType={FCEPart2} creatorId={creatorId}>
          <FCEPart2TestPreviewContent />
        </TestSearchResults>
      </VerticallyExpandingTestsContainer>

      <h2>Part 3</h2>
      <VerticallyExpandingTestsContainer buttonLabel={'part 3'}>
        <TestSearchResults testType={'Part3'} creatorId={creatorId}>
          <FCEPart3TestPreviewContent />
        </TestSearchResults>
      </VerticallyExpandingTestsContainer>

      <h1>CAE</h1>
      <h2>Part 2</h2>
      <VerticallyExpandingTestsContainer buttonLabel={'part 2'}>
        <TestSearchResults testType={CAEPart2} creatorId={creatorId}>
          <CAEPart2TestPreviewContent />
        </TestSearchResults>
      </VerticallyExpandingTestsContainer>
      <h2>Part 3</h2>
    </Fragment>
  );
};

export default MyTests;
