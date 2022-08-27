import React, { Fragment, useState, useEffect, useCallback } from 'react';

import useGetDocsInfiniteScroll from 'hooks/useGetDocsInfiniteScroll';
import pagination from 'APIHandlers/pagination.js';
import Tests from 'components/ExploreContent/Tests/Tests.js';
import FilterMenuDesktop from 'components/CreatorContent/FilterMenuDesktop';
import useComponentVisible from 'hooks/useComponentVisible';
import FilterMenuMobile from 'components/CreatorContent/FilterMenuMobile';
import ExamTypeMenuItems from 'components/ExploreContent/ExamTypeMenuItems';

const SearchTests = () => {
  const [sortBy, setSortBy] = useState(null);
  const [tagFilterTerm, setTagFilterTerm] = useState(null);
  const [questionFilterTerm, setQuestionFilterTerm] = useState('');

  const [testType, setTestType] = useState('Part2');
  // const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  // const [hasFetched, setHasFetched] = useState(false);
  const [exam, setExam] = useState('FCE');
  const filterBy = 'userName';
  const [searchTerm, setSearchTerm] = useState('');
  const [docs, setDocs] = useState([]);

  const [direction, setDirection] = useState('desc');

  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const itemOne = useComponentVisible(false);
  const itemTwo = useComponentVisible(false);
  const itemThree = useComponentVisible(false);
  const itemFour = useComponentVisible(false);
  const itemFive = useComponentVisible(false);

  const { fetchMorePosts, nextDocs_loading, setLastKey, lastKey } = useGetDocsInfiniteScroll(
    setDocs,
    exam + testType,
    tagFilterTerm,
    direction
  );

  const handleClickSearch = useCallback(async () => {
    const { results, lastKey } = await pagination.postsFirstBatch(
      exam + testType,
      tagFilterTerm,
      direction
    );
    setLastKey(() => lastKey);
    setDocs(() => results);
  }, [direction, exam, setLastKey, tagFilterTerm, testType]);

  const toggleFilterMenuVisible = () => {
    setFilterMenuVisible((prevState) => !prevState);
  };
  const handleSetQuestionFilterTerm = (e) => {
    setQuestionFilterTerm(e.currentTarget.value);
  };
  const handleSetRecent = (e, label) => {
    e.stopPropagation();
    setSortBy(label);
    setDirection(() => 'asc');
    console.log('handleSetRecent: ', label, direction);
    itemTwo.setIsComponentVisible(false);
  };

  const handleSetOld = (e, label) => {
    e.stopPropagation();
    setSortBy(label);
    setDirection(() => 'desc');
    console.log('handleSetOld: ', label, direction);
    itemTwo.setIsComponentVisible(false);
  };

  const handleSetTags = (tag, selected) => {
    if (!selected) {
      //adds tag to the state
      setTagFilterTerm(tag);
    } else {
      //removes the tag from the state
      setTagFilterTerm('');
    }
  };

  const handleResetFilters = () => {
    setSortBy(null);
    setTagFilterTerm(null);
    setQuestionFilterTerm('');
    itemThree.setIsComponentVisible(false);
  };

  const handleChangeTestType = (e, testType) => {
    itemFive.setIsComponentVisible(false);
    e.stopPropagation();
    setTestType(testType);
  };

  const handleChangeExam = (e, exam) => {
    itemFour.setIsComponentVisible(false);
    e.stopPropagation();
    setExam(exam);
  };

  useEffect(() => {
    handleClickSearch();
  }, [handleClickSearch]);

  return (
    <Fragment>
      {/* filter menu for large screens. visible only for large screens*/}
      <div className='search-terms-container'>
        <FilterMenuDesktop
          toggleFilterMenuVisible={toggleFilterMenuVisible}
          tagFilterTerm={tagFilterTerm}
          itemOne={itemOne}
          itemTwo={itemTwo}
          sortBy={sortBy}
          handleSetRecent={handleSetRecent}
          handleSetOld={handleSetOld}
          questionFilterTerm={questionFilterTerm}
          handleSetQuestionFilterTerm={handleSetQuestionFilterTerm}
          handleResetFilters={handleResetFilters}
          handleSetTags={handleSetTags}
        >
          <ExamTypeMenuItems
            itemFour={itemFour}
            itemFive={itemFive}
            testType={testType}
            exam={exam}
            handleChangeTestType={handleChangeTestType}
            handleChangeExam={handleChangeExam}
          />
        </FilterMenuDesktop>
      </div>
      <Tests testType={exam + testType} results={docs} />

      {nextDocs_loading && 'loading'}
      {lastKey && <button onClick={fetchMorePosts}>get more posts</button>}
    </Fragment>
  );
};

export default SearchTests;
