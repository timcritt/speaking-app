import React, { Fragment, useState } from 'react';
//constants
import { FCEPart2, FCEPart3, CAEPart2, CAEPart3 } from 'APIHandlers/firebaseConsts';
//custom components
import FilterMenuMobile from 'components/CreatorContent/FilterMenuMobile';
import FilterMenuDesktop from 'components/CreatorContent/FilterMenuDesktop';
import TestSearchResults from 'components/CreatorContent/TestSearchResults';
import FCEPart2TestPreviewContent from 'components/FCEPart2/FCEPart2TestPreviewContent';
import Part3TestPreviewContent from 'components/Part3Common/Part3TestPreviewContent';
import CAEPart2TestPreviewContent from 'components/CAEPart2/CAEPart2TestPreviewContent';
import VerticallyExpandingTestsContainer from './VerticallyExpandingTestsContainer';

//custom hooks
import useComponentVisible from 'hooks/useComponentVisible';

const MyTests = ({ creatorId }) => {
  //state
  const [sortBy, setSortBy] = useState(null);
  const [tagFilterTerm, setTagFilterTerm] = useState(null);
  const [questionFilterTerm, setQuestionFilterTerm] = useState('');

  //controls visibilty of fulscreen filter menu for mobile and small screens
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

  const itemOne = useComponentVisible(false);
  const itemTwo = useComponentVisible(false);
  const itemThree = useComponentVisible(false);

  const handleSetRecent = (e, label) => {
    e.stopPropagation();
    setSortBy(label);
    itemTwo.setIsComponentVisible(false);
  };

  const handleSetOld = (e, label) => {
    e.stopPropagation();
    setSortBy(label);
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

  const handleSetQuestionFilterTerm = (e) => {
    setQuestionFilterTerm(e.currentTarget.value);
  };

  const handleResetFilters = () => {
    setSortBy(null);
    setTagFilterTerm(null);
    setQuestionFilterTerm('');
    itemThree.setIsComponentVisible(false);
  };

  //reglar function needed instead of arrow
  function toggleFilterMenuVisible() {
    setFilterMenuVisible((prevState) => !prevState);
  }

  const handleSortRadioChange = (e) => {
    setSortBy(e.currentTarget.value);
  };

  return (
    <Fragment>
      {/* overlay filter menu for small screens - hidden by default and opens on click*/}
      <FilterMenuMobile
        filterMenuVisible={filterMenuVisible}
        toggleFilterMenuVisible={toggleFilterMenuVisible}
        tagFilterTerm={tagFilterTerm}
        handleSetTags={handleSetTags}
        sortBy={sortBy}
        handleSortRadioChange={handleSortRadioChange}
        questionFilterTerm={questionFilterTerm}
        handleSetQuestionFilterTerm={handleSetQuestionFilterTerm}
        handleResetFilters={handleResetFilters}
      />

      {/* filter menu for large screens. visible only for large screens*/}
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
      />

      <VerticallyExpandingTestsContainer
        buttonLabel={'FCE Part 2'}
        testType={FCEPart2}
        creatorId={creatorId}
        tagFilterTerm={tagFilterTerm}
        sortBy={sortBy}
        questionFilterTerm={questionFilterTerm}
      >
        <TestSearchResults testType={FCEPart2} creatorId={creatorId}>
          <FCEPart2TestPreviewContent />
        </TestSearchResults>
      </VerticallyExpandingTestsContainer>

      <VerticallyExpandingTestsContainer
        buttonLabel={'FCE Part 3'}
        testType={FCEPart3}
        creatorId={creatorId}
        tagFilterTerm={tagFilterTerm}
        sortBy={sortBy}
        questionFilterTerm={questionFilterTerm}
      >
        <TestSearchResults testType={FCEPart3} creatorId={creatorId}>
          <Part3TestPreviewContent bottomLabel={'FCE Part 3'} />
        </TestSearchResults>
      </VerticallyExpandingTestsContainer>

      <VerticallyExpandingTestsContainer
        buttonLabel={'CAE Part 2'}
        testType={CAEPart2}
        creatorId={creatorId}
        tagFilterTerm={tagFilterTerm}
        sortBy={sortBy}
        questionFilterTerm={questionFilterTerm}
      >
        <TestSearchResults testType={CAEPart2} creatorId={creatorId}>
          <CAEPart2TestPreviewContent />
        </TestSearchResults>
      </VerticallyExpandingTestsContainer>

      <VerticallyExpandingTestsContainer
        buttonLabel={'CAE Part 3'}
        testType={CAEPart3}
        creatorId={creatorId}
        tagFilterTerm={tagFilterTerm}
        sortBy={sortBy}
        questionFilterTerm={questionFilterTerm}
      >
        <TestSearchResults testType={CAEPart3} creatorId={creatorId}>
          <Part3TestPreviewContent bottomLabel={'CAE Part 3'} />
        </TestSearchResults>
      </VerticallyExpandingTestsContainer>
    </Fragment>
  );
};

export default MyTests;
