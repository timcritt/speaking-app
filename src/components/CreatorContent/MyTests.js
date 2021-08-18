import React, { Fragment, useState } from 'react';
import SideBarTags from '../common/SideBarTags';
import { FCEPart2, FCEPart3, CAEPart2, CAEPart3 } from 'APIHandlers/firebaseConsts';
import TestSearchResults from 'components/CreatorContent/TestSearchResults';
import FCEPart2TestPreviewContent from 'components/FCEPart2/FCEPart2TestPreviewContent';
import FCEPart3TestPreviewContent from 'components/FCEPart3/FCEPart3TestPreviewContent';
import CAEPart2TestPreviewContent from 'components/CAEPart2/CAEPart2TestPreviewContent';
import CAEPart3TestPreviewContent from 'components/CAEPart3/CAEPart3TestPreviewContent';
import VerticallyExpandingTestsContainer from './VerticallyExpandingTestsContainer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useComponentVisible from 'hooks/useComponentVisible';
import FilterListIcon from '@material-ui/icons/FilterList';
import CancelIcon from '@material-ui/icons/Cancel';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import FilterInput from 'components/common/FilterInput';

const MyTests = ({ creatorId }) => {
  //state
  const [sortBy, setSortBy] = useState(null);
  const [tagFilterTerm, setTagFilterTerm] = useState(null);
  const [questionFilterTerm, setQuestionFilterTerm] = useState(null);

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

  const Option = ({ label, handleClickOption }) => {
    return (
      <div className='dropdown-option' onClick={(e) => handleClickOption(e, label)}>
        {label}
      </div>
    );
  };

  const handleResetFilters = () => {
    setSortBy(null);
    setTagFilterTerm(null);
    setQuestionFilterTerm(null);
    itemThree.setIsComponentVisible(false);
  };

  return (
    <Fragment>
      <div className='search-terms-container'>
        <div className='filter-bar'>
          {/*unclickable filter icon*/}
          <div className='filter-bar-item'>
            <FilterListIcon />
          </div>
          <div className='filter-bar-item'>Filter By</div>

          {/*filter by topic*/}
          <div
            className='filter-bar-item filter-bar-item-clickable'
            onClick={(e) => {
              itemOne.setIsComponentVisible((prevState) => !prevState);
            }}
          >
            {tagFilterTerm ? tagFilterTerm : 'topic'}
            <ArrowDropDownIcon />
          </div>

          {/*sort by date created*/}
          <div
            className='filter-bar-item filter-bar-item-clickable'
            onClick={() => {
              itemTwo.setIsComponentVisible(true);
              console.log('button clicked');
            }}
          >
            <div>{sortBy ? sortBy : 'sort by'}</div>
            <ArrowDropDownIcon />

            {itemTwo.isComponentVisible && (
              <div ref={itemTwo.ref} className='dropdown-small-visible'>
                <Option label={'newest'} handleClickOption={handleSetRecent} />
                <Option label={'oldest'} handleClickOption={handleSetOld} />
              </div>
            )}
          </div>

          {/*filter by question*/}
          <div
            className='filter-bar-item filter-bar-item-clickable'
            onClick={() => {
              if (questionFilterTerm.length === 0)
                itemThree.setIsComponentVisible((prevState) => !prevState);
            }}
          >
            <div className='icon-container'>
              <SearchIcon />
            </div>
            question
            {itemThree.isComponentVisible && (
              <FilterInput
                placeholder={'filter by folder name'}
                handleSetFilterTerm={handleSetQuestionFilterTerm}
                value={questionFilterTerm}
              />
            )}
          </div>

          {/* clear filters  */}
          {(sortBy || tagFilterTerm || (questionFilterTerm && questionFilterTerm.length > 0)) && (
            <div
              className='filter-bar-item filter-bar-item-clickable reset-filters-button-container'
              onClick={handleResetFilters}
            >
              <span className='icon-container'>
                <RotateLeftIcon />
              </span>
              reset filters
            </div>
          )}
        </div>

        {/*filter by tag drop down container*/}
        {itemOne.isComponentVisible && (
          <div ref={itemOne.ref} className='tags-drop-down-visible'>
            <Fragment>
              <SideBarTags tags={tagFilterTerm} handleSetTags={handleSetTags}></SideBarTags>
              <div
                className='close-dropdown-container-button'
                onClick={(e) => {
                  itemOne.setIsComponentVisible((prevState) => !prevState);
                }}
              >
                <CancelIcon />
              </div>
            </Fragment>
          </div>
        )}
      </div>

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
          <FCEPart3TestPreviewContent />
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
          <CAEPart3TestPreviewContent />
        </TestSearchResults>
      </VerticallyExpandingTestsContainer>
    </Fragment>
  );
};

export default MyTests;
