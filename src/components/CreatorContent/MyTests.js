import React, { Fragment, useState } from 'react';
import SideBarTags from '../common/SideBarTags';
import { FCEPart2, FCEPart3, CAEPart2, CAEPart3 } from 'APIHandlers/firebaseConsts';
import TestSearchResults from 'components/CreatorContent/TestSearchResults';
import FCEPart2TestPreviewContent from 'components/FCEPart2/FCEPart2TestPreviewContent';
import Part3TestPreviewContent from 'components/Part3Common/Part3TestPreviewContent';
import CAEPart2TestPreviewContent from 'components/CAEPart2/CAEPart2TestPreviewContent';
// import CAEPart3TestPreviewContent from 'components/CAEPart3/CAEPart3TestPreviewContent';
import VerticallyExpandingTestsContainer from './VerticallyExpandingTestsContainer';
import useComponentVisible from 'hooks/useComponentVisible';
import FilterInput from 'components/common/FilterInput';

//icons
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import CancelIcon from '@material-ui/icons/Cancel';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const MyTests = ({ creatorId }) => {
  //state
  const [sortBy, setSortBy] = useState(null);
  const [tagFilterTerm, setTagFilterTerm] = useState(null);
  const [questionFilterTerm, setQuestionFilterTerm] = useState('');

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
    setQuestionFilterTerm('');
    itemThree.setIsComponentVisible(false);
  };

  const toggleFilterMenuVisible = () => {
    setFilterMenuVisible((prevState) => !prevState);
  };

  const handleSortRadioChange = (e) => {
    setSortBy(e.currentTarget.value);
  };

  return (
    <Fragment>
      <div className={`filter-menu ${filterMenuVisible ? 'isVisible' : 'isHidden'}`}>
        {/* overlay filter menu for small screens - hidden by default and opens on click*/}
        <div className='close-nav-mobile-btn' onClick={toggleFilterMenuVisible}>
          <CloseIcon fontSize='large' />
        </div>
        <h1>FILTERS</h1>
        {/*filter by topic*/}
        <div className='filter-mobile-row'>
          <p>Select Topic</p>
          <SideBarTags tags={tagFilterTerm} handleSetTags={handleSetTags}></SideBarTags>
        </div>
        {/*sort by date created*/}

        <div className='filter-mobile-row'>
          <p>Sorty by</p>
          <div>
            <input
              type='radio'
              id='newest'
              name='sortBy'
              value='newest'
              checked={sortBy === 'newest'}
              onChange={handleSortRadioChange}
            />
            <label htmlFor='newest'>newest</label>
          </div>
          <div>
            <input
              type='radio'
              id='oldest'
              name='sortyBy'
              value='oldest'
              checked={sortBy === 'oldest'}
              onChange={handleSortRadioChange}
            />
            <label htmlFor='oldest'>oldest</label>
          </div>
        </div>

        {/*filter by question*/}

        <div className='filter-mobile-row'>
          <p>Search by question</p>
          <input
            id='question'
            type='text'
            value={questionFilterTerm}
            onChange={handleSetQuestionFilterTerm}
          />
        </div>

        {/* buttons */}
        <div className='filter-mobile-button-row'>
          <button className='btn get-started-btn' onClick={handleResetFilters}>
            <span className='icon-container'></span>
            reset filters
          </button>
          <button className='btn get-started-btn' onClick={toggleFilterMenuVisible}>
            apply filters
          </button>
        </div>
      </div>

      {/* filter menu for large screens. visible only for large screens*/}
      <div className='search-terms-container'>
        <div
          className='filter-bar-item filter-bar-item-clickable see-filters-mobile-btn'
          onClick={toggleFilterMenuVisible}
        >
          <FilterListIcon />
          <div>FILTERS</div>
        </div>
        <div className='filter-bar '>
          {/*unclickable filter icon*/}
          <div className='filter-bar-item'>
            <FilterListIcon />
          </div>

          {/*filter by topic*/}
          <div
            className={`filter-bar-item filter-bar-item-clickable ${
              tagFilterTerm ? 'filter-selected' : ''
            }`}
            onClick={(e) => {
              itemOne.setIsComponentVisible((prevState) => !prevState);
            }}
          >
            {tagFilterTerm ? tagFilterTerm : 'topic'}
            <ArrowDropDownIcon />
          </div>

          {/*sort by date created*/}
          <div
            className={`filter-bar-item filter-bar-item-clickable ${
              sortBy ? 'filter-selected' : ''
            }`}
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
            className={`filter-bar-item filter-bar-item-clickable ${
              questionFilterTerm !== '' ? 'filter-selected' : ''
            }`}
          >
            <SearchIcon />

            <FilterInput
              placeholder={'search by question'}
              handleSetFilterTerm={handleSetQuestionFilterTerm}
              value={questionFilterTerm}
            />
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
            <SideBarTags tags={tagFilterTerm} handleSetTags={handleSetTags}></SideBarTags>
            <div
              className='close-dropdown-container-button'
              onClick={(e) => {
                itemOne.setIsComponentVisible((prevState) => !prevState);
              }}
            >
              <CancelIcon />
            </div>
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
