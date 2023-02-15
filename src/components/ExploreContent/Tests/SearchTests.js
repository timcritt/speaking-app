import React, { Fragment, useState } from 'react';

import useGetDocsInfiniteScroll from 'hooks/useGetDocsInfiniteScroll';
import Tests from 'components/ExploreContent/Tests/Tests.js';
import FilterMenuDesktop from 'components/CreatorContent/FilterMenuDesktop';
import useComponentVisible from 'hooks/useComponentVisible';
//import FilterMenuMobile from 'components/CreatorContent/FilterMenuMobile';
import ExamTypeMenuItems from 'components/ExploreContent/ExamTypeMenuItems';

const SearchTests = () => {
  const [sortBy, setSortBy] = useState(null);
  const [tagFilterTerm, setTagFilterTerm] = useState(null);
  const [questionFilterTerm, setQuestionFilterTerm] = useState('');

  const [testType, setTestType] = useState('Part2');
  //const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  //const [hasFetched, setHasFetched] = useState(true);
  const [exam, setExam] = useState('FCE');
  const [docs, setDocs] = useState([]);
  const [direction, setDirection] = useState('desc');

  //constants
  const orderBy = 'createdAt';

  //custom hooks for controlling behaviour of menus
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const itemOne = useComponentVisible(false);
  const itemTwo = useComponentVisible(false);
  const itemThree = useComponentVisible(false);
  const itemFour = useComponentVisible(false);
  const itemFive = useComponentVisible(false);

  const { nextDocs_loading, containerRef } = useGetDocsInfiniteScroll(
    setDocs,
    exam + testType,
    tagFilterTerm,
    direction,
    orderBy
  );

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

    itemTwo.setIsComponentVisible(false);
  };

  const handleSetOld = (e, label) => {
    e.stopPropagation();
    setSortBy(label);
    setDirection(() => 'desc');

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
      {nextDocs_loading && <div>'loading'</div>}
      {/*the ref in the bottom div is observed by intersectionObsever. When the div is scrolled to and on screen, it triggers more images to load*/}
      <div ref={containerRef}>.</div>
    </Fragment>
  );
};

export default SearchTests;
